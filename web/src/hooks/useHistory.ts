import { useState, useEffect, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_HOST
  ? `${window.location.protocol}//${import.meta.env.VITE_API_HOST}`
  : "";

export interface BetRecord {
  id: number;
  round_id: number;
  user: string;
  direction: number;
  amount: string;
  claimed: number;
  feed_id: string;
  lock_time: number;
  resolve_time: number;
  lock_price: string;
  close_price: string;
  total_up: string;
  total_down: string;
  reward_pool: string;
  rake_amount: string;
  round_status: number;
}

export function useHistory(address: string | undefined) {
  const [bets, setBets] = useState<BetRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!address) { setBets([]); setLoading(false); return; }
    try {
      const res = await fetch(`${API_BASE}/api/history?user=${address}`);
      const data = await res.json();
      setBets(Array.isArray(data) ? data : []);
    } catch { /* ignore */ }
    setLoading(false);
  }, [address]);

  useEffect(() => {
    refetch();
    const id = setInterval(refetch, 10_000);
    return () => clearInterval(id);
  }, [refetch]);

  return { bets, loading, refetch };
}

export function useClaimable(address: string | undefined) {
  const [claimable, setClaimable] = useState<BetRecord[]>([]);

  const refetch = useCallback(async () => {
    if (!address) { setClaimable([]); return; }
    try {
      const res = await fetch(`${API_BASE}/api/claimable?user=${address}`);
      const data = await res.json();
      setClaimable(Array.isArray(data) ? data : []);
    } catch { /* ignore */ }
  }, [address]);

  useEffect(() => {
    refetch();
    const id = setInterval(refetch, 10_000);
    return () => clearInterval(id);
  }, [refetch]);

  return { claimable, refetch };
}

export interface RoundBet {
  id: number;
  round_id: number;
  user: string;
  direction: number;
  amount: string;
  claimed: number;
}

export function useRoundBets(roundId: number | undefined) {
  const [bets, setBets] = useState<RoundBet[]>([]);

  const refetch = useCallback(async () => {
    if (roundId === undefined) { setBets([]); return; }
    try {
      const res = await fetch(`${API_BASE}/api/round/${roundId}`);
      const data = await res.json();
      setBets(Array.isArray(data?.bets) ? data.bets : []);
    } catch { /* ignore */ }
  }, [roundId]);

  useEffect(() => {
    refetch();
    const id = setInterval(refetch, 5_000);
    return () => clearInterval(id);
  }, [refetch]);

  return { bets, refetch };
}
