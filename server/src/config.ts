import { defineChain } from "viem";

export const megaethTestnet = defineChain({
  id: 6343,
  name: "MegaETH Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.RPC_URL || "https://carrot.megaeth.com/rpc"],
      webSocket: [process.env.WSS_URL || "wss://carrot.megaeth.com/ws"],
    },
  },
  contracts: {
    multicall3: { address: "0xcA11bde05977b3631167028862bE2a173976CA11" },
  },
});

export const ADDRESSES = {
  megaBets: (process.env.MEGABETS_ADDRESS || "0x0F60d55De565e6634668cd53952831578fcb423F") as `0x${string}`,
  usdm: "0x77252Dba16C234CA52674adBAC911538705FB31c" as `0x${string}`,
  btcOracle: "0x4bE899cF15a212fd6123E4A0E6e1B4925f493B96" as `0x${string}`,
  ethOracle: "0x9674Dbe42f9996e1470F8eC15a6D0aebA4a93AEb" as `0x${string}`,
} as const;

export const ORACLE_ABI = [
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

export const MEGABETS_ABI = [
  { type: "function", name: "nextRoundId", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getRound", inputs: [{ name: "roundId", type: "uint256" }], outputs: [{ name: "", type: "tuple", components: [{ name: "feedId", type: "bytes32" }, { name: "startTime", type: "uint64" }, { name: "lockTime", type: "uint64" }, { name: "resolveTime", type: "uint64" }, { name: "lockPrice", type: "int256" }, { name: "closePrice", type: "int256" }, { name: "totalUp", type: "uint256" }, { name: "totalDown", type: "uint256" }, { name: "rewardPool", type: "uint256" }, { name: "rakeAmount", type: "uint256" }, { name: "status", type: "uint8" }] }], stateMutability: "view" },
  { type: "function", name: "lockRound", inputs: [{ name: "roundId", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "resolveRound", inputs: [{ name: "roundId", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "cancelRound", inputs: [{ name: "roundId", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  // Events
  { type: "event", name: "RoundOpened", inputs: [{ name: "roundId", type: "uint256", indexed: true }, { name: "feedId", type: "bytes32", indexed: true }, { name: "lockTime", type: "uint64", indexed: false }, { name: "resolveTime", type: "uint64", indexed: false }] },
  { type: "event", name: "BetPlaced", inputs: [{ name: "roundId", type: "uint256", indexed: true }, { name: "user", type: "address", indexed: true }, { name: "direction", type: "uint8", indexed: false }, { name: "amount", type: "uint128", indexed: false }] },
  { type: "event", name: "RoundLocked", inputs: [{ name: "roundId", type: "uint256", indexed: true }, { name: "lockPrice", type: "int256", indexed: false }] },
  { type: "event", name: "RoundResolved", inputs: [{ name: "roundId", type: "uint256", indexed: true }, { name: "closePrice", type: "int256", indexed: false }, { name: "winningDirection", type: "uint8", indexed: false }] },
  { type: "event", name: "RoundCancelled", inputs: [{ name: "roundId", type: "uint256", indexed: true }] },
  { type: "event", name: "Claimed", inputs: [{ name: "roundId", type: "uint256", indexed: true }, { name: "user", type: "address", indexed: true }, { name: "payout", type: "uint256", indexed: false }] },
] as const;

export const PORT = parseInt(process.env.PORT || "4000");
