import { createPublicClient, createWalletClient, http, type PublicClient, type WalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { megaethTestnet, ADDRESSES, MEGABETS_ABI } from "./config";

const CANCEL_GRACE = 300;   // 5 minutes
const RESOLVE_WINDOW = 10;  // contract enforces 10s window

enum RoundStatus {
  NONE = 0,
  OPEN = 1,
  LOCKED = 2,
  RESOLVED = 3,
  CANCELLED = 4,
}

interface RoundInfo {
  id: bigint;
  status: RoundStatus;
  lockTime: number;
  resolveTime: number;
}

export class Resolver {
  private client: PublicClient;
  private wallet: WalletClient;
  private account;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private scheduledTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private processing = false;
  private lastKnownNextId = 1n;

  constructor() {
    this.client = createPublicClient({
      chain: megaethTestnet,
      transport: http(megaethTestnet.rpcUrls.default.http[0]),
    });

    const pk = process.env.PRIVATE_KEY as `0x${string}`;
    this.account = privateKeyToAccount(pk);

    this.wallet = createWalletClient({
      chain: megaethTestnet,
      transport: http(megaethTestnet.rpcUrls.default.http[0]),
      account: this.account,
    });
  }

  start() {
    console.log(`[Resolver] Started | wallet: ${this.account.address}`);
    this.pollTimer = setInterval(() => this.poll(), 5000);
    this.poll();
  }

  /* ─── Multicall: batch-read all active rounds in 1 RPC call ─── */
  private async fetchActiveRounds(): Promise<RoundInfo[]> {
    const nextId = await this.client.readContract({
      address: ADDRESSES.megaBets,
      abi: MEGABETS_ABI,
      functionName: "nextRoundId",
    }) as bigint;

    this.lastKnownNextId = nextId;
    if (nextId <= 1n) return [];

    // Only check rounds that could be active (skip old resolved/cancelled)
    // Start from max(1, nextId - 50) to avoid scanning thousands of old rounds
    const startId = nextId > 50n ? nextId - 50n : 1n;
    const ids: bigint[] = [];
    for (let i = startId; i < nextId; i++) ids.push(i);

    if (ids.length === 0) return [];

    // Multicall: batch all getRound calls into 1 RPC request
    const results = await this.client.multicall({
      contracts: ids.map(id => ({
        address: ADDRESSES.megaBets,
        abi: MEGABETS_ABI,
        functionName: "getRound" as const,
        args: [id],
      })),
      allowFailure: true,
    });

    const rounds: RoundInfo[] = [];
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      if (r.status !== "success" || !r.result) continue;

      const round = r.result as any;
      const status = Number(round.status);

      // Only care about OPEN or LOCKED
      if (status === RoundStatus.OPEN || status === RoundStatus.LOCKED) {
        rounds.push({
          id: ids[i],
          status,
          lockTime: Number(round.lockTime),
          resolveTime: Number(round.resolveTime),
        });
      }
    }

    return rounds;
  }

  /* ─── Schedule a precise action at targetTime ─── */
  private scheduleAt(key: string, targetTime: number, action: () => Promise<void>) {
    if (this.scheduledTimers.has(key)) return;

    const delayMs = Math.max(0, (targetTime - Date.now() / 1000) * 1000);
    console.log(`[Resolver] Scheduling ${key} in ${(delayMs / 1000).toFixed(1)}s`);

    const timer = setTimeout(async () => {
      this.scheduledTimers.delete(key);
      try { await action(); } catch (e: any) {
        console.error(`[Resolver] Scheduled ${key} failed:`, e.message?.slice(0, 120));
      }
    }, delayMs);

    this.scheduledTimers.set(key, timer);
  }

  /* ─── Fire-and-forget TX with retries ─── */
  private async execTx(fn: string, roundId: bigint, label: string, retries = 2): Promise<void> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const hash = await this.wallet.writeContract({
          address: ADDRESSES.megaBets,
          abi: MEGABETS_ABI,
          functionName: fn as any,
          args: [roundId],
          gas: 500_000n,
        });
        console.log(`[Resolver] ${label}: ${hash}`);
        return;
      } catch (e: any) {
        const msg = e.message?.slice(0, 120) || "unknown";
        if (attempt < retries) {
          console.warn(`[Resolver] ${label} attempt ${attempt + 1} failed: ${msg} — retrying in 500ms`);
          await new Promise(r => setTimeout(r, 500));
        } else {
          console.error(`[Resolver] ${label} FAILED after ${retries + 1} attempts: ${msg}`);
        }
      }
    }
  }

  /* ─── Main poll: discover rounds via multicall, schedule/execute actions ─── */
  private async poll() {
    if (this.processing) return;
    this.processing = true;

    try {
      const rounds = await this.fetchActiveRounds();
      const now = Math.floor(Date.now() / 1000);

      // Collect immediate actions to fire in parallel
      const immediateTxs: Array<{ fn: string; id: bigint; label: string }> = [];

      for (const round of rounds) {
        const { id, status, lockTime, resolveTime } = round;

        if (status === RoundStatus.OPEN) {
          if (now >= lockTime + CANCEL_GRACE) {
            immediateTxs.push({ fn: "cancelRound", id, label: `Cancel stale OPEN round ${id}` });
          } else if (now >= lockTime) {
            immediateTxs.push({ fn: "lockRound", id, label: `Lock round ${id}` });
          } else {
            this.scheduleAt(`lock-${id}`, lockTime, () => this.execTx("lockRound", id, `Lock round ${id}`));
          }
        }

        if (status === RoundStatus.LOCKED) {
          if (now >= resolveTime + CANCEL_GRACE) {
            immediateTxs.push({ fn: "cancelRound", id, label: `Cancel missed LOCKED round ${id}` });
          } else if (now >= resolveTime + RESOLVE_WINDOW) {
            console.warn(`[Resolver] Round ${id} missed resolve window (${now - resolveTime}s late). Will cancel after grace.`);
          } else if (now >= resolveTime) {
            immediateTxs.push({ fn: "resolveRound", id, label: `Resolve round ${id}` });
          } else {
            // Schedule precise resolve at resolveTime + 0.5s
            this.scheduleAt(`resolve-${id}`, resolveTime + 0.5, () =>
              this.execTx("resolveRound", id, `Resolve round ${id}`)
            );
          }
        }
      }

      // Fire all immediate TXs in parallel
      if (immediateTxs.length > 0) {
        console.log(`[Resolver] Firing ${immediateTxs.length} TXs in parallel`);
        await Promise.allSettled(
          immediateTxs.map(tx => this.execTx(tx.fn, tx.id, tx.label))
        );
      }
    } catch (e: any) {
      console.error("[Resolver] Poll error:", e.message?.slice(0, 100));
    } finally {
      this.processing = false;
    }
  }

  stop() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    for (const timer of this.scheduledTimers.values()) clearTimeout(timer);
    this.scheduledTimers.clear();
  }
}
