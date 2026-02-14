import { createPublicClient, createWalletClient, http, type PublicClient, type WalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { megaethTestnet, ADDRESSES, MEGABETS_ABI } from "./config";

const CANCEL_GRACE = 300; // 5 minutes
const RESOLVE_WINDOW = 10; // contract enforces 10s window

enum RoundStatus {
  NONE = 0,
  OPEN = 1,
  LOCKED = 2,
  RESOLVED = 3,
  CANCELLED = 4,
}

export class Resolver {
  private client: PublicClient;
  private wallet: WalletClient;
  private account;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private scheduledTimers = new Map<string, ReturnType<typeof setTimeout>>(); // roundId → timer
  private processing = false;

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
    // Poll every 5s to discover rounds & schedule precise actions
    this.pollTimer = setInterval(() => this.poll(), 5000);
    this.poll();
  }

  /** Schedule a precise action at targetTime (unix seconds) */
  private scheduleAt(key: string, targetTime: number, action: () => Promise<void>) {
    if (this.scheduledTimers.has(key)) return; // already scheduled

    const delayMs = Math.max(0, (targetTime - Date.now() / 1000) * 1000);
    console.log(`[Resolver] Scheduling ${key} in ${(delayMs / 1000).toFixed(1)}s`);

    const timer = setTimeout(async () => {
      this.scheduledTimers.delete(key);
      try {
        await action();
      } catch (e: any) {
        console.error(`[Resolver] Scheduled ${key} failed:`, e.message?.slice(0, 120));
      }
    }, delayMs);

    this.scheduledTimers.set(key, timer);
  }

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
          console.error(`[Resolver] ${label} failed after ${retries + 1} attempts: ${msg}`);
        }
      }
    }
  }

  private async poll() {
    if (this.processing) return;
    this.processing = true;

    try {
      const nextId = await this.client.readContract({
        address: ADDRESSES.megaBets,
        abi: MEGABETS_ABI,
        functionName: "nextRoundId",
      }) as bigint;

      const now = Math.floor(Date.now() / 1000);

      for (let id = 1n; id < nextId; id++) {
        try {
          const round = await this.client.readContract({
            address: ADDRESSES.megaBets,
            abi: MEGABETS_ABI,
            functionName: "getRound",
            args: [id],
          }) as any;

          const status = Number(round.status);
          const lockTime = Number(round.lockTime);
          const resolveTime = Number(round.resolveTime);

          // OPEN → schedule lock at lockTime
          if (status === RoundStatus.OPEN) {
            if (now >= lockTime) {
              // Lock immediately
              await this.execTx("lockRound", id, `Lock round ${id}`);
            } else {
              // Schedule precise lock
              this.scheduleAt(`lock-${id}`, lockTime, () => this.execTx("lockRound", id, `Lock round ${id}`));
            }

            // Cancel if way past grace
            if (now >= lockTime + CANCEL_GRACE) {
              await this.execTx("cancelRound", id, `Cancel stale OPEN round ${id}`);
            }
          }

          // LOCKED → schedule resolve at resolveTime (within 10s window!)
          if (status === RoundStatus.LOCKED) {
            if (now >= resolveTime && now < resolveTime + RESOLVE_WINDOW) {
              // Inside window — resolve NOW
              await this.execTx("resolveRound", id, `Resolve round ${id}`);
            } else if (now < resolveTime) {
              // Schedule precise resolve at exactly resolveTime + 0.5s (tiny buffer for oracle freshness)
              this.scheduleAt(`resolve-${id}`, resolveTime + 0.5, () =>
                this.execTx("resolveRound", id, `Resolve round ${id}`)
              );
            } else if (now >= resolveTime + RESOLVE_WINDOW) {
              // Missed the window — cancel
              if (now >= resolveTime + CANCEL_GRACE) {
                await this.execTx("cancelRound", id, `Cancel missed LOCKED round ${id}`);
              } else {
                console.warn(`[Resolver] Round ${id} missed resolve window (${now - resolveTime}s late). Will cancel after grace.`);
              }
            }
          }
        } catch {
          // skip this round
        }
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
