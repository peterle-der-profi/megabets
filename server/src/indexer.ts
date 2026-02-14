import { Database } from "bun:sqlite";
import { createPublicClient, http, decodeEventLog, type Log } from "viem";
import { megaethTestnet, ADDRESSES, MEGABETS_ABI } from "./config";

const CONTRACT = ADDRESSES.megaBets;
const RPC_URL = megaethTestnet.rpcUrls.default.http[0];
const DEPLOY_BLOCK = 11354000n;
const CHUNK_SIZE = 10000n;
const POLL_INTERVAL = 10_000;

// Feed ID mapping (bytes32 hex → human name)
const FEED_NAMES: Record<string, string> = {
  "0x425443314d000000000000000000000000000000000000000000000000000000": "BTC1M",
  "0x425443354d000000000000000000000000000000000000000000000000000000": "BTC5M",
  "0x42544331304d0000000000000000000000000000000000000000000000000000": "BTC10M",
  "0x42544331354d0000000000000000000000000000000000000000000000000000": "BTC15M",
  "0x455448314d000000000000000000000000000000000000000000000000000000": "ETH1M",
  "0x455448354d000000000000000000000000000000000000000000000000000000": "ETH5M",
  "0x45544831304d0000000000000000000000000000000000000000000000000000": "ETH10M",
  "0x45544831354d0000000000000000000000000000000000000000000000000000": "ETH15M",
};

// Topic hashes
const TOPICS = {
  RoundOpened: "0xa7929bf79c2208d3ada518ae8898222c91c0169ac1d60c20a47229855eb13ed8",
  BetPlaced: "0xa32473b1d48a8ddc7cb06c2b9273cce9cf4a097b64e96cf9125b15b410eec44a",
  RoundLocked: "0xed3d5364266a40b08be3572a189b162355beff1b143e03774e5cd7c94f224035",
  RoundResolved: "0xf397e29e1d932c620e381cf2173fe3ebf49aace1de890c40fd2faeb37588a58c",
  RoundCancelled: "0xbf7aeff89cf7a4c3d0145879e39aa6a19e8e64ed585090ef86bf31f4d2ae57bf",
  Claimed: "0x4ec90e965519d92681267467f775ada5bd214aa92c0dc93d90a5e880ce9ed026",
} as const;

export class Indexer {
  private db: Database;
  private client;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private lastScannedBlock: bigint = DEPLOY_BLOCK;

  constructor() {
    this.db = new Database("data/megabets.db", { create: true });
    this.db.exec("PRAGMA journal_mode = WAL");
    this.db.exec("PRAGMA synchronous = NORMAL");
    this.initTables();

    this.client = createPublicClient({
      chain: megaethTestnet,
      transport: http(RPC_URL),
    });
  }

  private initTables() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS rounds (
        id INTEGER PRIMARY KEY,
        feed_id TEXT,
        start_time INTEGER,
        lock_time INTEGER,
        resolve_time INTEGER,
        lock_price TEXT,
        close_price TEXT,
        total_up TEXT,
        total_down TEXT,
        reward_pool TEXT,
        rake_amount TEXT,
        status INTEGER
      );
      CREATE TABLE IF NOT EXISTS bets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        round_id INTEGER,
        user TEXT,
        direction INTEGER,
        amount TEXT,
        claimed INTEGER DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT,
        round_id INTEGER,
        user TEXT,
        data TEXT,
        block_number INTEGER,
        tx_hash TEXT,
        log_index INTEGER,
        UNIQUE(tx_hash, log_index)
      );
      CREATE INDEX IF NOT EXISTS idx_bets_user ON bets(user);
      CREATE INDEX IF NOT EXISTS idx_bets_round ON bets(round_id);
      CREATE INDEX IF NOT EXISTS idx_rounds_feed ON rounds(feed_id);
      CREATE INDEX IF NOT EXISTS idx_events_block ON events(block_number);
    `);

    // Recover last scanned block
    const row = this.db.query("SELECT MAX(block_number) as max_block FROM events").get() as any;
    if (row?.max_block) {
      this.lastScannedBlock = BigInt(row.max_block);
    }
  }

  async start() {
    console.log("[Indexer] Starting historical scan from block", this.lastScannedBlock.toString());
    await this.scanHistorical();
    console.log("[Indexer] Historical scan complete. Polling every 10s...");
    this.pollTimer = setInterval(() => this.poll(), POLL_INTERVAL);
  }

  stop() {
    if (this.pollTimer) clearInterval(this.pollTimer);
  }

  private async scanHistorical() {
    const latestBlock = await this.client.getBlockNumber();
    let from = this.lastScannedBlock;

    while (from <= latestBlock) {
      const to = from + CHUNK_SIZE - 1n > latestBlock ? latestBlock : from + CHUNK_SIZE - 1n;
      try {
        await this.fetchAndProcessLogs(from, to);
      } catch (e: any) {
        console.error(`[Indexer] Error scanning ${from}-${to}:`, e.message);
        // Retry with smaller chunk
        if (CHUNK_SIZE > 1000n) {
          const smallChunk = 1000n;
          let sf = from;
          while (sf <= to) {
            const st = sf + smallChunk - 1n > to ? to : sf + smallChunk - 1n;
            try { await this.fetchAndProcessLogs(sf, st); } catch (e2: any) {
              console.error(`[Indexer] Error scanning ${sf}-${st}:`, e2.message);
            }
            sf = st + 1n;
          }
        }
      }
      from = to + 1n;
    }
    this.lastScannedBlock = latestBlock;
  }

  private async poll() {
    try {
      const latestBlock = await this.client.getBlockNumber();
      if (latestBlock <= this.lastScannedBlock) return;
      await this.fetchAndProcessLogs(this.lastScannedBlock + 1n, latestBlock);
      this.lastScannedBlock = latestBlock;
    } catch (e: any) {
      console.error("[Indexer] Poll error:", e.message);
    }
  }

  private async fetchAndProcessLogs(fromBlock: bigint, toBlock: bigint) {
    const logs = await this.client.request({
      method: "eth_getLogs",
      params: [{
        address: CONTRACT,
        fromBlock: `0x${fromBlock.toString(16)}`,
        toBlock: `0x${toBlock.toString(16)}`,
        topics: [[
          TOPICS.RoundOpened, TOPICS.BetPlaced, TOPICS.RoundLocked,
          TOPICS.RoundResolved, TOPICS.RoundCancelled, TOPICS.Claimed,
        ]],
      }],
    }) as any[];

    if (!logs || logs.length === 0) return;

    const insertEvent = this.db.prepare(
      "INSERT OR IGNORE INTO events (event_type, round_id, user, data, block_number, tx_hash, log_index) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    const roundIdsToFetch = new Set<bigint>();

    const txn = this.db.transaction(() => {
      for (const log of logs) {
        try {
          const decoded = decodeEventLog({
            abi: MEGABETS_ABI,
            data: log.data,
            topics: log.topics,
          });

          const blockNum = Number(BigInt(log.blockNumber));
          const txHash = log.transactionHash;
          const logIndex = Number(BigInt(log.logIndex));
          const eventName = decoded.eventName;
          const args = decoded.args as any;

          let roundId: bigint;
          let user: string | null = null;

          switch (eventName) {
            case "RoundOpened": {
              roundId = args.roundId;
              const feedHex = args.feedId as string;
              const feedName = FEED_NAMES[feedHex.toLowerCase()] || FEED_NAMES[feedHex] || feedHex;
              this.db.prepare(
                "INSERT OR REPLACE INTO rounds (id, feed_id, lock_time, resolve_time, status) VALUES (?, ?, ?, ?, 1)"
              ).run(Number(roundId), feedName, Number(args.lockTime), Number(args.resolveTime));
              insertEvent.run(eventName, Number(roundId), null, JSON.stringify({ feedId: feedHex }), blockNum, txHash, logIndex);
              break;
            }
            case "BetPlaced": {
              roundId = args.roundId;
              user = (args.user as string).toLowerCase();
              const amount = args.amount.toString();
              const direction = Number(args.direction);
              // Insert bet (check if exists)
              const existing = this.db.prepare("SELECT id FROM bets WHERE round_id = ? AND user = ?").get(Number(roundId), user) as any;
              if (!existing) {
                this.db.prepare("INSERT INTO bets (round_id, user, direction, amount) VALUES (?, ?, ?, ?)").run(
                  Number(roundId), user, direction, amount
                );
              }
              insertEvent.run(eventName, Number(roundId), user, JSON.stringify({ direction, amount }), blockNum, txHash, logIndex);
              break;
            }
            case "RoundLocked": {
              roundId = args.roundId;
              this.db.prepare("UPDATE rounds SET lock_price = ?, status = 2 WHERE id = ?").run(
                args.lockPrice.toString(), Number(roundId)
              );
              insertEvent.run(eventName, Number(roundId), null, JSON.stringify({ lockPrice: args.lockPrice.toString() }), blockNum, txHash, logIndex);
              break;
            }
            case "RoundResolved": {
              roundId = args.roundId;
              this.db.prepare("UPDATE rounds SET close_price = ?, status = 3 WHERE id = ?").run(
                args.closePrice.toString(), Number(roundId)
              );
              roundIdsToFetch.add(roundId);
              insertEvent.run(eventName, Number(roundId), null, JSON.stringify({ closePrice: args.closePrice.toString(), winningDirection: Number(args.winningDirection) }), blockNum, txHash, logIndex);
              break;
            }
            case "RoundCancelled": {
              roundId = args.roundId;
              this.db.prepare("UPDATE rounds SET status = 4 WHERE id = ?").run(Number(roundId));
              roundIdsToFetch.add(roundId);
              insertEvent.run(eventName, Number(roundId), null, null, blockNum, txHash, logIndex);
              break;
            }
            case "Claimed": {
              roundId = args.roundId;
              user = (args.user as string).toLowerCase();
              this.db.prepare("UPDATE bets SET claimed = 1 WHERE round_id = ? AND user = ?").run(Number(roundId), user);
              insertEvent.run(eventName, Number(roundId), user, JSON.stringify({ payout: args.payout.toString() }), blockNum, txHash, logIndex);
              break;
            }
          }
        } catch (e: any) {
          // Skip unparseable logs
        }
      }
    });
    txn();

    // Fetch full round data for resolved/cancelled rounds
    for (const rid of roundIdsToFetch) {
      try {
        await this.fetchRoundData(rid);
      } catch (e: any) {
        console.error(`[Indexer] Error fetching round ${rid}:`, e.message);
      }
    }
  }

  private async fetchRoundData(roundId: bigint) {
    const round = await this.client.readContract({
      address: CONTRACT,
      abi: MEGABETS_ABI,
      functionName: "getRound",
      args: [roundId],
    }) as any;

    const feedHex = round.feedId as string;
    const feedName = FEED_NAMES[feedHex.toLowerCase()] || FEED_NAMES[feedHex] || feedHex;

    this.db.prepare(`
      INSERT OR REPLACE INTO rounds (id, feed_id, start_time, lock_time, resolve_time, lock_price, close_price, total_up, total_down, reward_pool, rake_amount, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      Number(roundId),
      feedName,
      Number(round.startTime),
      Number(round.lockTime),
      Number(round.resolveTime),
      round.lockPrice.toString(),
      round.closePrice.toString(),
      round.totalUp.toString(),
      round.totalDown.toString(),
      round.rewardPool.toString(),
      round.rakeAmount.toString(),
      Number(round.status),
    );
  }

  // API methods
  getHistoryForUser(user: string) {
    return this.db.prepare(`
      SELECT b.*, r.feed_id, r.lock_time, r.resolve_time, r.lock_price, r.close_price,
             r.total_up, r.total_down, r.reward_pool, r.rake_amount, r.status as round_status
      FROM bets b
      JOIN rounds r ON b.round_id = r.id
      WHERE LOWER(b.user) = LOWER(?)
      ORDER BY b.round_id DESC
    `).all(user.toLowerCase());
  }

  getRounds(feedId?: string, limit: number = 20) {
    if (feedId) {
      return this.db.prepare("SELECT * FROM rounds WHERE feed_id = ? ORDER BY id DESC LIMIT ?").all(feedId, limit);
    }
    return this.db.prepare("SELECT * FROM rounds ORDER BY id DESC LIMIT ?").all(limit);
  }

  getRound(id: number) {
    const round = this.db.prepare("SELECT * FROM rounds WHERE id = ?").get(id);
    const bets = this.db.prepare("SELECT * FROM bets WHERE round_id = ?").all(id);
    return { round, bets };
  }

  getClaimable(user: string) {
    // Claimable = user has bet, not claimed, AND either:
    //   - round cancelled (status=4) → everyone gets refund
    //   - round resolved (status=3) AND user bet on winning side
    //     winning side: close_price > lock_price → UP (direction=0), close_price < lock_price → DOWN (direction=1)
    return this.db.prepare(`
      SELECT b.*, r.feed_id, r.lock_time, r.resolve_time, r.lock_price, r.close_price,
             r.total_up, r.total_down, r.reward_pool, r.rake_amount, r.status as round_status
      FROM bets b
      JOIN rounds r ON b.round_id = r.id
      WHERE LOWER(b.user) = LOWER(?)
        AND b.claimed = 0
        AND (
          r.status = 4
          OR (r.status = 3 AND (
            (b.direction = 0 AND CAST(r.close_price AS INTEGER) > CAST(r.lock_price AS INTEGER))
            OR (b.direction = 1 AND CAST(r.close_price AS INTEGER) < CAST(r.lock_price AS INTEGER))
          ))
        )
      ORDER BY b.round_id DESC
    `).all(user.toLowerCase());
  }
}
