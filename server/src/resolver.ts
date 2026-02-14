import { createPublicClient, createWalletClient, http, type PublicClient, type WalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { megaethTestnet, ADDRESSES, MEGABETS_ABI } from "./config";

const CANCEL_GRACE = 300; // 5 minutes

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
  private timer: ReturnType<typeof setInterval> | null = null;
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
    this.timer = setInterval(() => this.poll(), 5000);
    this.poll(); // immediate first run
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

          // OPEN → lock it
          if (status === RoundStatus.OPEN && now >= lockTime) {
            console.log(`[Resolver] Locking round ${id}`);
            try {
              const hash = await this.wallet.writeContract({
                address: ADDRESSES.megaBets,
                abi: MEGABETS_ABI,
                functionName: "lockRound",
                args: [id],
                gas: 500_000n,
              });
              console.log(`[Resolver] Round ${id} locked: ${hash}`);
            } catch (e: any) {
              console.error(`[Resolver] Lock ${id} failed:`, e.message?.slice(0, 100));
            }
          }

          // LOCKED → resolve it
          if (status === RoundStatus.LOCKED && now >= resolveTime) {
            console.log(`[Resolver] Resolving round ${id}`);
            try {
              const hash = await this.wallet.writeContract({
                address: ADDRESSES.megaBets,
                abi: MEGABETS_ABI,
                functionName: "resolveRound",
                args: [id],
                gas: 500_000n,
              });
              console.log(`[Resolver] Round ${id} resolved: ${hash}`);
            } catch (e: any) {
              console.error(`[Resolver] Resolve ${id} failed:`, e.message?.slice(0, 100));
            }
          }

          // OPEN past grace → cancel
          if (status === RoundStatus.OPEN && now >= lockTime + CANCEL_GRACE) {
            console.log(`[Resolver] Cancelling stale OPEN round ${id}`);
            try {
              const hash = await this.wallet.writeContract({
                address: ADDRESSES.megaBets,
                abi: MEGABETS_ABI,
                functionName: "cancelRound",
                args: [id],
                gas: 500_000n,
              });
              console.log(`[Resolver] Round ${id} cancelled: ${hash}`);
            } catch (e: any) {
              console.error(`[Resolver] Cancel ${id} failed:`, e.message?.slice(0, 100));
            }
          }

          // LOCKED past grace → cancel
          if (status === RoundStatus.LOCKED && now >= resolveTime + CANCEL_GRACE) {
            console.log(`[Resolver] Cancelling stale LOCKED round ${id}`);
            try {
              const hash = await this.wallet.writeContract({
                address: ADDRESSES.megaBets,
                abi: MEGABETS_ABI,
                functionName: "cancelRound",
                args: [id],
                gas: 500_000n,
              });
              console.log(`[Resolver] Round ${id} cancelled: ${hash}`);
            } catch (e: any) {
              console.error(`[Resolver] Cancel ${id} failed:`, e.message?.slice(0, 100));
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
    if (this.timer) clearInterval(this.timer);
  }
}
