import { NextResponse } from "next/server";
import { createPublicClient, http } from "viem";

const ORACLE_ABI = [
  {
    type: "function",
    name: "latestRoundData",
    inputs: [],
    outputs: [
      { name: "roundId", type: "uint80" },
      { name: "answer", type: "int256" },
      { name: "startedAt", type: "uint256" },
      { name: "updatedAt", type: "uint256" },
      { name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
  },
] as const;

const BTC_ORACLE = "0x4bE899cF15a212fd6123E4A0E6e1B4925f493B96" as const;
const ETH_ORACLE = "0x9674Dbe42f9996e1470F8eC15a6D0aebA4a93AEb" as const;

const MAX_POINTS = 120;

const priceHistory: { BTC: number[]; ETH: number[] } = { BTC: [], ETH: [] };
let collectorRunning = false;

const client = createPublicClient({
  transport: http("https://carrot.megaeth.com/rpc"),
});

function startCollector() {
  if (collectorRunning) return;
  collectorRunning = true;

  const collect = async () => {
    try {
      // Single multicall instead of 2 separate calls
      const results = await client.multicall({
        contracts: [
          { address: BTC_ORACLE, abi: ORACLE_ABI, functionName: "latestRoundData" },
          { address: ETH_ORACLE, abi: ORACLE_ABI, functionName: "latestRoundData" },
        ],
      });

      for (const [i, feed] of (["BTC", "ETH"] as const).entries()) {
        const res = results[i];
        if (res.status === "success") {
          const [, answer] = res.result;
          const price = Number(answer) / 1e8;
          if (price > 0) {
            priceHistory[feed].push(price);
            if (priceHistory[feed].length > MAX_POINTS) priceHistory[feed].shift();
          }
        }
      }
    } catch {
      // silent
    }
  };

  collect();
  setInterval(collect, 3000); // Every 3s instead of 500ms
}

startCollector();

export async function GET() {
  return NextResponse.json({
    BTC: priceHistory.BTC,
    ETH: priceHistory.ETH,
    timestamp: Date.now(),
  });
}
