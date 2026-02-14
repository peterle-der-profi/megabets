import { useEffect, useState, useSyncExternalStore } from "react";

interface PriceData {
  price: number;
  prevPrice: number;
  timestamp: number;
}

// Shared singleton — ONE WebSocket for all components
const priceCache: Record<string, PriceData> = {
  BTC: { price: 0, prevPrice: 0, timestamp: 0 },
  ETH: { price: 0, prevPrice: 0, timestamp: 0 },
};

// Price history arrays — seeded from server on connect
export const priceHistory: Record<string, number[]> = {
  BTC: [],
  ETH: [],
};
const MAX_HISTORY = 300;

const listeners = new Set<() => void>();
let started = false;

// Throttle React updates to max ~10/s
let lastNotify = 0;
let notifyPending = false;

function notifyListeners() {
  const now = Date.now();
  const elapsed = now - lastNotify;
  if (elapsed < 50) {
    if (!notifyPending) {
      notifyPending = true;
      setTimeout(() => {
        notifyPending = false;
        lastNotify = Date.now();
        listeners.forEach((fn) => fn());
      }, 50 - elapsed);
    }
    return;
  }
  lastNotify = now;
  listeners.forEach((fn) => fn());
}

function pushPrice(feed: string, price: number) {
  if (price <= 0) return;
  const h = priceHistory[feed];
  h.push(price);
  if (h.length > MAX_HISTORY) h.shift();
}

function startPriceFeed() {
  if (started) return;
  started = true;

  let reconnectDelay = 1000;

  function connect() {
    // In production/static builds, connect directly to the API server
    const apiHost = import.meta.env.VITE_API_HOST || window.location.host;
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${apiHost}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("[PriceFeed] WebSocket connected");
      reconnectDelay = 1000;
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        // Server sends full history on connect
        if (msg.type === "init") {
          if (msg.history?.btc?.length) {
            priceHistory.BTC = msg.history.btc.slice(-MAX_HISTORY);
          }
          if (msg.history?.eth?.length) {
            priceHistory.ETH = msg.history.eth.slice(-MAX_HISTORY);
          }
          if (msg.latest) {
            const now = Date.now();
            if (msg.latest.btc > 0) {
              priceCache.BTC = { price: msg.latest.btc, prevPrice: msg.latest.btc, timestamp: now };
            }
            if (msg.latest.eth > 0) {
              priceCache.ETH = { price: msg.latest.eth, prevPrice: msg.latest.eth, timestamp: now };
            }
          }
          notifyListeners();
          return;
        }

        if (msg.type === "prices") {
          const now = Date.now();
          if (msg.btc && msg.btc > 0) {
            priceCache.BTC = {
              price: msg.btc,
              prevPrice: priceCache.BTC.price || msg.btc,
              timestamp: now,
            };
            pushPrice("BTC", msg.btc);
          }
          if (msg.eth && msg.eth > 0) {
            priceCache.ETH = {
              price: msg.eth,
              prevPrice: priceCache.ETH.price || msg.eth,
              timestamp: now,
            };
            pushPrice("ETH", msg.eth);
          }
          notifyListeners();
        }
      } catch {
        // ignore parse errors
      }
    };

    ws.onclose = () => {
      console.log(`[PriceFeed] WebSocket disconnected, reconnecting in ${reconnectDelay}ms`);
      setTimeout(connect, reconnectDelay);
      reconnectDelay = Math.min(reconnectDelay * 2, 30000);
    };

    ws.onerror = () => {
      ws.close();
    };
  }

  connect();
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

/** Returns the full price history array for a feed (seeded from server, updated live) */
export function usePriceHistory(feed: "BTC" | "ETH"): number[] {
  const [, setTick] = useState(0);

  useEffect(() => {
    startPriceFeed();
    const update = () => setTick((t) => t + 1);
    listeners.add(update);
    return () => { listeners.delete(update); };
  }, [feed]);

  return priceHistory[feed];
}
