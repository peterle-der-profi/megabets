import 'dotenv/config';
import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
  getContract,
  type Abi,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const megaethTestnet = defineChain({
  id: 6343,
  name: 'MegaETH Testnet',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: [process.env.RPC_URL!] } },
});

const account = privateKeyToAccount(process.env.PRIVATE_KEY! as `0x${string}`);

const publicClient = createPublicClient({
  chain: megaethTestnet,
  transport: http(),
});

const walletClient = createWalletClient({
  account,
  chain: megaethTestnet,
  transport: http(),
});

const CONTRACT = '0x0F60d55De565e6634668cd53952831578fcb423F' as const;

const abi = [
  {
    name: 'nextRoundId',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'rounds',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'uint256' }],
    outputs: [
      { name: 'feedId', type: 'bytes32' },
      { name: 'startTime', type: 'uint64' },
      { name: 'lockTime', type: 'uint64' },
      { name: 'resolveTime', type: 'uint64' },
      { name: 'lockPrice', type: 'int256' },
      { name: 'closePrice', type: 'int256' },
      { name: 'totalUp', type: 'uint256' },
      { name: 'totalDown', type: 'uint256' },
      { name: 'rewardPool', type: 'uint256' },
      { name: 'rakeAmount', type: 'uint256' },
      { name: 'status', type: 'uint8' },
    ],
  },
  {
    name: 'lockRound',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'resolveRound',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'cancelRound',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ type: 'uint256' }],
    outputs: [],
  },
] as const satisfies Abi;

const GRACE_PERIOD = 300n; // seconds
const POLL_INTERVAL = 5000; // ms

enum Status {
  None = 0,
  OPEN = 1,
  LOCKED = 2,
  RESOLVED = 3,
  CANCELLED = 4,
}

function log(msg: string) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

async function processRounds() {
  const nextId = await publicClient.readContract({
    address: CONTRACT,
    abi,
    functionName: 'nextRoundId',
  });

  const now = BigInt(Math.floor(Date.now() / 1000));

  for (let id = 1n; id < nextId; id++) {
    try {
      const round = await publicClient.readContract({
        address: CONTRACT,
        abi,
        functionName: 'rounds',
        args: [id],
      });

      const [, , lockTime, resolveTime, , , , , , , status] = round;
      const st = Number(status) as Status;

      if (st === Status.OPEN) {
        if (now >= BigInt(lockTime)) {
          if (now >= BigInt(lockTime) + GRACE_PERIOD) {
            log(`Round ${id}: OPEN past grace period → cancelRound`);
            const hash = await walletClient.writeContract({
              address: CONTRACT,
              abi,
              functionName: 'cancelRound',
              args: [id],
            });
            log(`Round ${id}: cancelRound tx ${hash}`);
          } else {
            log(`Round ${id}: lockTime passed → lockRound`);
            const hash = await walletClient.writeContract({
              address: CONTRACT,
              abi,
              functionName: 'lockRound',
              args: [id],
            });
            log(`Round ${id}: lockRound tx ${hash}`);
          }
        }
      } else if (st === Status.LOCKED) {
        if (now >= BigInt(resolveTime)) {
          if (now >= BigInt(resolveTime) + GRACE_PERIOD) {
            log(`Round ${id}: LOCKED past grace period → cancelRound`);
            const hash = await walletClient.writeContract({
              address: CONTRACT,
              abi,
              functionName: 'cancelRound',
              args: [id],
            });
            log(`Round ${id}: cancelRound tx ${hash}`);
          } else {
            log(`Round ${id}: resolveTime passed → resolveRound`);
            const hash = await walletClient.writeContract({
              address: CONTRACT,
              abi,
              functionName: 'resolveRound',
              args: [id],
            });
            log(`Round ${id}: resolveRound tx ${hash}`);
          }
        }
      }
      // Status RESOLVED, CANCELLED, None → skip
    } catch (err: any) {
      log(`Round ${id}: error — ${err.message?.slice(0, 200)}`);
    }
  }
}

async function main() {
  log(`MegaBets Resolution Bot started`);
  log(`Wallet: ${account.address}`);
  log(`Contract: ${CONTRACT}`);
  log(`Polling every ${POLL_INTERVAL}ms`);

  while (true) {
    try {
      await processRounds();
    } catch (err: any) {
      log(`Poll error: ${err.message?.slice(0, 200)}`);
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }
}

main();
