"use client";

import { useEffect, useState } from "react";

interface PriceData {
  price: number;
  prevPrice: number;
  timestamp: number;
}

// Shared singleton — ONE WebSocket + fetcher for all components
const priceCache: Record<string, PriceData> = {
  BTC: { price: 0, prevPrice: 0, timestamp: 0 },
  ETH: { price: 0, prevPrice: 0, timestamp: 0 },
};
const listeners = new Set<() => void>();
let started = false;

// Throttle React updates to max ~10/s (every 100ms)
let lastNotify = 0;
let notifyPending = false;

function notifyListeners() {
  const now = Date.now();
  const elapsed = now - lastNotify;
  if (elapsed < 100) {
    if (!notifyPending) {
      notifyPending = true;
      setTimeout(() => {
        notifyPending = false;
        lastNotify = Date.now();
        listeners.forEach((fn) => fn());
      }, 100 - elapsed);
    }
    return;
  }
  lastNotify = now;
  listeners.forEach((fn) => fn());
}

// Fetch prices via HTTP RPC (2 calls batched as JSON-RPC batch)
async function fetchPrices() {
  try {
    // JSON-RPC batch: 2 eth_call in one HTTP request
    const encode = (oracle: string) => ({
      jsonrpc: "2.0",
      id: oracle,
      method: "eth_call",
      params: [
        {
          to: oracle,
          // latestRoundData() selector = 0xfeaf968c
          data: "0xfeaf968c",
        },
        "latest",
      ],
    });

    const res = await fetch("https://carrot.megaeth.com/rpc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        encode("0x4bE899cF15a212fd6123E4A0E6e1B4925f493B96"),
        encode("0x9674Dbe42f9996e1470F8eC15a6D0aebA4a93AEb"),
      ]),
    });

    const results = await res.json();

    const feeds = [
      { id: "0x4bE899cF15a212fd6123E4A0E6e1B4925f493B96", feed: "BTC" as const },
      { id: "0x9674Dbe42f9996e1470F8eC15a6D0aebA4a93AEb", feed: "ETH" as const },
    ];

    for (const { id, feed } of feeds) {
      const r = results.find((x: { id: string }) => x.id === id);
      if (r?.result && r.result !== "0x") {
        // Decode: skip roundId (32 bytes), read answer (next 32 bytes)
        // Result is: roundId(uint80 padded to 32) + answer(int256) + startedAt + updatedAt + answeredInRound
        const hex = r.result as string;
        // answer is at offset 32 bytes = 64 hex chars (+ 2 for 0x prefix = position 66)
        const answerHex = "0x" + hex.slice(66, 130);
        const price = Number(BigInt(answerHex)) / 1e8;

        if (price > 0) {
          priceCache[feed] = {
            price,
            prevPrice: priceCache[feed].price || price,
            timestamp: Date.now(),
          };
        }
      }
    }

    notifyListeners();
  } catch {
    // silent
  }
}

function startPriceFeed() {
  if (started) return;
  started = true;

  // Initial fetch
  fetchPrices();

  // Try WSS block subscription to trigger fetches on new blocks
  let wsActive = false;

  try {
    const ws = new WebSocket("wss://carrot.megaeth.com/ws");

    ws.onopen = () => {
      ws.send(JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_subscribe",
        params: ["newHeads"],
      }));
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id === 1 && msg.result) {
          wsActive = true;
          console.log("[PriceFeed] WSS connected, block-driven updates");
        }
        if (msg.method === "eth_subscription") {
          fetchPrices();
        }
      } catch { /* ignore */ }
    };

    ws.onclose = () => {
      wsActive = false;
      console.log("[PriceFeed] WSS disconnected, falling back to polling");
    };

    ws.onerror = () => {
      ws.close();
    };
  } catch {
    // WSS not available in SSR
  }

  // Fallback polling: if WSS fails or in SSR, poll every 3s
  setInterval(() => {
    if (!wsActive) fetchPrices();
  }, 3000);
}

export function usePrice(feed: "BTC" | "ETH"): PriceData {
  const [data, setData] = useState<PriceData>(priceCache[feed]);

  useEffect(() => {
    startPriceFeed();
    const update = () => setData({ ...priceCache[feed] });
    listeners.add(update);
    return () => { listeners.delete(update); };
  }, [feed]);

  return data;
}
