import { useReadContract } from "wagmi";
import { ADDRESSES, MEGABETS_ABI, FEED_IDS, RoundStatus, FeedKey } from "@/lib/contract";

export interface RoundData {
  feedId: `0x${string}`;
  startTime: bigint;
  lockTime: bigint;
  resolveTime: bigint;
  lockPrice: bigint;
  closePrice: bigint;
  totalUp: bigint;
  totalDown: bigint;
  rewardPool: bigint;
  rakeAmount: bigint;
  status: number;
}

export function useCurrentRoundId(feedKey: FeedKey) {
  return useReadContract({
    address: ADDRESSES.megaBets,
    abi: MEGABETS_ABI,
    functionName: "currentRound",
    args: [FEED_IDS[feedKey]],
    query: { refetchInterval: 5000 },
  });
}

export function useRound(roundId: bigint | undefined) {
  return useReadContract({
    address: ADDRESSES.megaBets,
    abi: MEGABETS_ABI,
    functionName: "getRound",
    args: roundId ? [roundId] : undefined,
    query: {
      enabled: !!roundId && roundId > 0n,
      refetchInterval: 5000,
    },
  });
}

export function useBet(roundId: bigint | undefined, user: `0x${string}` | undefined) {
  return useReadContract({
    address: ADDRESSES.megaBets,
    abi: MEGABETS_ABI,
    functionName: "getBet",
    args: roundId && user ? [roundId, user] : undefined,
    query: {
      enabled: !!roundId && roundId > 0n && !!user,
      refetchInterval: 3000,
    },
  });
}

export function useCalcPayout(roundId: bigint | undefined, user: `0x${string}` | undefined) {
  return useReadContract({
    address: ADDRESSES.megaBets,
    abi: MEGABETS_ABI,
    functionName: "calcPayout",
    args: roundId && user ? [roundId, user] : undefined,
    query: {
      enabled: !!roundId && roundId > 0n && !!user,
      refetchInterval: 5000,
    },
  });
}

export function getRoundStatusLabel(status: number): string {
  switch (status) {
    case RoundStatus.OPEN: return "LIVE";
    case RoundStatus.LOCKED: return "LOCKED";
    case RoundStatus.RESOLVED: return "RESOLVED";
    case RoundStatus.CANCELLED: return "CANCELLED";
    default: return "—";
  }
}
