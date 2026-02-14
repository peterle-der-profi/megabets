import { useEffect, useCallback } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ADDRESSES, MEGABETS_ABI, megaethTestnet } from "@/lib/contract";
import { isAddress } from "viem";

const STORAGE_KEY = "megabets_ref";

/** Read ?ref= from URL on first load, persist to localStorage */
export function captureReferral() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref && isAddress(ref)) {
    localStorage.setItem(STORAGE_KEY, ref);
    // Clean URL
    params.delete("ref");
    const clean = params.toString();
    const url = window.location.pathname + (clean ? `?${clean}` : "") + window.location.hash;
    window.history.replaceState({}, "", url);
  }
}

/** Get stored referrer address (from URL param) */
export function getStoredReferrer(): `0x${string}` | null {
  if (typeof window === "undefined") return null;
  const ref = localStorage.getItem(STORAGE_KEY);
  return ref && isAddress(ref) ? (ref as `0x${string}`) : null;
}

/** Hook: auto-set referrer on-chain if needed */
export function useAutoReferrer() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Check if user already has a referrer on-chain
  const { data: onChainReferrer } = useReadContract({
    address: ADDRESSES.megaBets,
    abi: MEGABETS_ABI,
    functionName: "referrers",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const setReferrer = useCallback(async () => {
    if (!address) return false;
    const storedRef = getStoredReferrer();
    if (!storedRef) return false;
    if (storedRef.toLowerCase() === address.toLowerCase()) return false; // self-referral
    // Already set on-chain
    if (onChainReferrer && onChainReferrer !== "0x0000000000000000000000000000000000000000") return false;

    try {
      await writeContractAsync({
        address: ADDRESSES.megaBets,
        abi: MEGABETS_ABI,
        functionName: "setReferrer",
        args: [storedRef],
        chainId: megaethTestnet.id,
      });
      return true;
    } catch (e) {
      console.error("setReferrer failed:", e);
      return false;
    }
  }, [address, onChainReferrer, writeContractAsync]);

  return { setReferrer, storedRef: getStoredReferrer(), onChainReferrer };
}

/** Hook: referral earnings for connected wallet */
export function useReferralEarnings() {
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const { data: earnings, refetch } = useReadContract({
    address: ADDRESSES.megaBets,
    abi: MEGABETS_ABI,
    functionName: "referralEarnings",
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 10_000 },
  });

  const withdraw = useCallback(async () => {
    await writeContractAsync({
      address: ADDRESSES.megaBets,
      abi: MEGABETS_ABI,
      functionName: "withdrawReferralEarnings",
      args: [],
      chainId: megaethTestnet.id,
    });
    refetch();
  }, [writeContractAsync, refetch]);

  return {
    earnings: earnings ? Number(earnings) / 1e6 : 0,
    withdraw,
    isPending,
  };
}
