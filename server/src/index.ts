import { PriceFeed } from "./price-feed";
import { Resolver } from "./resolver";
import { Indexer } from "./indexer";
import { PORT } from "./config";

// Track connected WebSocket clients
const clients = new Set<{ ws: any; alive: boolean }>();

// Price feed
const priceFeed = new PriceFeed();

// Resolution bot
const resolver = new Resolver();

// Indexer
const indexer = new Indexer();

// CORS headers
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Broadcast to all connected clients
function broadcast(data: object) {
  const msg = JSON.stringify(data);
  for (const client of clients) {
    try {
      if (client.ws.readyState === 1) {
        client.ws.send(msg);
      }
    } catch { /* ignore dead sockets */ }
  }
}

// Forward price updates to all clients
priceFeed.onPrice((update) => {
  broadcast({
    type: "prices",
    btc: update.btc,
    eth: update.eth,
    blockNumber: update.blockNumber.toString(),
    timestamp: update.timestamp,
  });
});

// Bun HTTP + WebSocket server
const server = Bun.serve({
  port: PORT,

  fetch(req, server) {
    const url = new URL(req.url);

    // CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    // WebSocket upgrade
    if (url.pathname === "/ws") {
      if (server.upgrade(req)) return;
      return new Response("WebSocket upgrade failed", { status: 400 });
    }

    // REST: price history
    if (url.pathname === "/api/prices") {
      const latest = priceFeed.getLatest();
      return Response.json({
        ...priceFeed.getHistory(),
        latest: { ...latest, blockNumber: latest.blockNumber.toString() },
        timestamp: Date.now(),
      }, { headers: CORS });
    }

    // REST: health
    if (url.pathname === "/api/health") {
      const latest = priceFeed.getLatest();
      return Response.json({
        status: "ok",
        clients: clients.size,
        prices: { btc: latest.btc, eth: latest.eth },
        uptime: process.uptime(),
      }, { headers: CORS });
    }

    // REST: bet history for user
    if (url.pathname === "/api/history") {
      const user = url.searchParams.get("user");
      if (!user) return Response.json({ error: "user required" }, { status: 400, headers: CORS });
      return Response.json(indexer.getHistoryForUser(user), { headers: CORS });
    }

    // REST: rounds list
    if (url.pathname === "/api/rounds") {
      const feed = url.searchParams.get("feed") || undefined;
      const limit = parseInt(url.searchParams.get("limit") || "20");
      return Response.json(indexer.getRounds(feed, limit), { headers: CORS });
    }

    // REST: single round
    const roundMatch = url.pathname.match(/^\/api\/round\/(\d+)$/);
    if (roundMatch) {
      const id = parseInt(roundMatch[1]);
      return Response.json(indexer.getRound(id), { headers: CORS });
    }

    // REST: claimable for user
    if (url.pathname === "/api/claimable") {
      const user = url.searchParams.get("user");
      if (!user) return Response.json({ error: "user required" }, { status: 400, headers: CORS });
      return Response.json(indexer.getClaimable(user), { headers: CORS });
    }

    return new Response("Not Found", { status: 404 });
  },

  websocket: {
    open(ws) {
      const client = { ws, alive: true };
      clients.add(client);
      console.log(`[WS] Client connected (${clients.size} total)`);

      const history = priceFeed.getHistory();
      const latest = priceFeed.getLatest();
      ws.send(JSON.stringify({
        type: "init",
        history,
        latest: { btc: latest.btc, eth: latest.eth },
      }));
    },

    message(ws, message) {
      try {
        const msg = JSON.parse(message as string);
        if (msg.type === "ping") {
          ws.send(JSON.stringify({ type: "pong" }));
        }
      } catch { /* ignore */ }
    },

    close(ws) {
      for (const client of clients) {
        if (client.ws === ws) {
          clients.delete(client);
          break;
        }
      }
      console.log(`[WS] Client disconnected (${clients.size} total)`);
    },
  },
});

// Start services
await priceFeed.start();
resolver.start();
indexer.start();

console.log(`
╔══════════════════════════════════════╗
║       MegaBets Server v0.2.0        ║
╠══════════════════════════════════════╣
║  HTTP:  http://localhost:${PORT}        ║
║  WS:    ws://localhost:${PORT}/ws       ║
║  Price feed: block-driven (WSS)     ║
║  Resolver: polling every 5s         ║
║  Indexer: scanning + polling 10s    ║
╚══════════════════════════════════════╝
`);

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down...");
  priceFeed.stop();
  resolver.stop();
  indexer.stop();
  server.stop();
  process.exit(0);
});
