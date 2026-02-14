import { megaethTestnet, ADDRESSES } from "./config";

export interface PriceUpdate {
  btc: number;
  eth: number;
  blockNumber: bigint;
  timestamp: number;
}

type PriceListener = (update: PriceUpdate) => void;

const MAX_HISTORY = 600; // ~2 min at 5/s

export class PriceFeed {
  private listeners = new Set<PriceListener>();
  private history: { btc: number[]; eth: number[] } = { btc: [], eth: [] };
  private lastPrices: PriceUpdate = { btc: 0, eth: 0, blockNumber: 0n, timestamp: 0 };
  private wsConnected = false;
  private fastTimer: ReturnType<typeof setInterval> | null = null;
  private fallbackTimer: ReturnType<typeof setInterval> | null = null;
  private latestBlockNumber: bigint = 0n;
  private fetching = false;

  async start() {
    // Initial fetch
    await this.fetchPrices();

    // WSS just for block number tracking (not triggering reads)
    this.connectWS();

    // Fast polling: 200ms interval = 5 reads/s (decoupled from blocks)
    this.fastTimer = setInterval(() => this.fetchPrices(), 200);

    // Fallback: slower poll if everything breaks
    this.fallbackTimer = setInterval(() => {
      if (!this.wsConnected && !this.fastTimer) {
        this.fetchPrices();
      }
    }, 3000);

    console.log("[PriceFeed] Started (5 updates/s)");
  }

  private connectWS() {
    try {
      const ws = new WebSocket(megaethTestnet.rpcUrls.default.webSocket![0]);

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
          const msg = JSON.parse(event.data as string);
          if (msg.id === 1 && msg.result) {
            this.wsConnected = true;
            console.log("[PriceFeed] WSS block subscription active");
          }
          if (msg.method === "eth_subscription" && msg.params?.result) {
            this.latestBlockNumber = BigInt(msg.params.result.number || "0");
          }
        } catch { /* ignore */ }
      };

      // Keep-alive: MegaETH closes idle WSS after 30s
      const keepAlive = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ jsonrpc: "2.0", id: 99, method: "eth_chainId", params: [] }));
        }
      }, 25000);

      ws.onerror = () => ws.close();
      ws.onclose = () => {
        clearInterval(keepAlive);
        this.wsConnected = false;
        console.log("[PriceFeed] WSS disconnected, reconnecting in 3s...");
        setTimeout(() => this.connectWS(), 3000);
      };
    } catch (e) {
      console.error("[PriceFeed] WSS error:", e);
    }
  }

  private async fetchPrices() {
    if (this.fetching) return; // skip if previous fetch still in-flight
    this.fetching = true;
    try {
      // JSON-RPC batch: 2 eth_call in one HTTP request
      const encode = (oracle: string) => ({
        jsonrpc: "2.0",
        id: oracle,
        method: "eth_call",
        params: [{ to: oracle, data: "0xfeaf968c" }, "latest"],
      });

      const res = await fetch(megaethTestnet.rpcUrls.default.http[0], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          encode(ADDRESSES.btcOracle),
          encode(ADDRESSES.ethOracle),
        ]),
      });

      const results = (await res.json()) as Array<{ id: string; result?: string }>;
      let btc = this.lastPrices.btc;
      let eth = this.lastPrices.eth;

      for (const r of results) {
        if (!r.result || r.result === "0x") continue;
        const answerHex = "0x" + r.result.slice(66, 130);
        const price = Number(BigInt(answerHex)) / 1e8;
        if (price <= 0) continue;

        if (r.id === ADDRESSES.btcOracle) btc = price;
        else if (r.id === ADDRESSES.ethOracle) eth = price;
      }

      // Only push to history if price actually changed
      if (btc > 0 && btc !== this.lastPrices.btc) {
        this.history.btc.push(btc);
        if (this.history.btc.length > MAX_HISTORY) this.history.btc.shift();
      }
      if (eth > 0 && eth !== this.lastPrices.eth) {
        this.history.eth.push(eth);
        if (this.history.eth.length > MAX_HISTORY) this.history.eth.shift();
      }

      const blockNumber = this.latestBlockNumber;
      this.lastPrices = { btc, eth, blockNumber, timestamp: Date.now() };

      // Always notify (even same price — so chart lerp keeps running)
      for (const fn of this.listeners) {
        try { fn(this.lastPrices); } catch { /* ignore */ }
      }
    } catch {
      // Silent — will retry next interval
    } finally {
      this.fetching = false;
    }
  }

  onPrice(fn: PriceListener) {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  getHistory() {
    return { btc: [...this.history.btc], eth: [...this.history.eth] };
  }

  getLatest(): PriceUpdate {
    return this.lastPrices;
  }

  stop() {
    if (this.fastTimer) clearInterval(this.fastTimer);
    if (this.fallbackTimer) clearInterval(this.fallbackTimer);
    this.listeners.clear();
  }
}
