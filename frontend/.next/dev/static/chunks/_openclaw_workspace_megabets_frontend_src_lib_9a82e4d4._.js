(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/.openclaw/workspace/megabets/frontend/src/lib/contract.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADDRESSES",
    ()=>ADDRESSES,
    "Direction",
    ()=>Direction,
    "ERC20_ABI",
    ()=>ERC20_ABI,
    "FEED_IDS",
    ()=>FEED_IDS,
    "MEGABETS_ABI",
    ()=>MEGABETS_ABI,
    "ORACLE_ABI",
    ()=>ORACLE_ABI,
    "RoundStatus",
    ()=>RoundStatus,
    "TIMEFRAMES",
    ()=>TIMEFRAMES,
    "feedKey",
    ()=>feedKey,
    "megaethTestnet",
    ()=>megaethTestnet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$45$2e$3_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$9$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/viem@2.45.3_bufferutil@4.1.0_typescript@5.9.3_utf-8-validate@5.0.10_zod@3.25.76/node_modules/viem/_esm/utils/chain/defineChain.js [app-client] (ecmascript)");
;
const megaethTestnet = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$45$2e$3_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$9$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: 6343,
    name: "MegaETH Testnet",
    nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
    },
    rpcUrls: {
        default: {
            http: [
                "https://carrot.megaeth.com/rpc"
            ],
            webSocket: [
                "wss://carrot.megaeth.com/ws"
            ]
        }
    },
    blockExplorers: {
        default: {
            name: "MegaETH Explorer",
            url: "https://megaexplorer.xyz"
        }
    },
    contracts: {
        multicall3: {
            address: "0xcA11bde05977b3631167028862bE2a173976CA11"
        }
    }
});
const ADDRESSES = {
    megaBets: "0x0F60d55De565e6634668cd53952831578fcb423F",
    usdm: "0x77252Dba16C234CA52674adBAC911538705FB31c",
    btcOracle: "0x4bE899cF15a212fd6123E4A0E6e1B4925f493B96",
    ethOracle: "0x9674Dbe42f9996e1470F8eC15a6D0aebA4a93AEb"
};
const FEED_IDS = {
    "BTC-1m": "0x425443314d000000000000000000000000000000000000000000000000000000",
    "BTC-5m": "0x425443354d000000000000000000000000000000000000000000000000000000",
    "BTC-10m": "0x42544331304d0000000000000000000000000000000000000000000000000000",
    "BTC-15m": "0x42544331354d0000000000000000000000000000000000000000000000000000",
    "ETH-1m": "0x455448314d000000000000000000000000000000000000000000000000000000",
    "ETH-5m": "0x455448354d000000000000000000000000000000000000000000000000000000",
    "ETH-10m": "0x45544831304d0000000000000000000000000000000000000000000000000000",
    "ETH-15m": "0x45544831354d0000000000000000000000000000000000000000000000000000"
};
const TIMEFRAMES = [
    "1m",
    "5m",
    "10m",
    "15m"
];
function feedKey(asset, tf) {
    return `${asset}-${tf}`;
}
const MEGABETS_ABI = [
    // Views
    {
        type: "function",
        name: "getRound",
        inputs: [
            {
                name: "roundId",
                type: "uint256"
            }
        ],
        outputs: [
            {
                name: "",
                type: "tuple",
                components: [
                    {
                        name: "feedId",
                        type: "bytes32"
                    },
                    {
                        name: "startTime",
                        type: "uint64"
                    },
                    {
                        name: "lockTime",
                        type: "uint64"
                    },
                    {
                        name: "resolveTime",
                        type: "uint64"
                    },
                    {
                        name: "lockPrice",
                        type: "int256"
                    },
                    {
                        name: "closePrice",
                        type: "int256"
                    },
                    {
                        name: "totalUp",
                        type: "uint256"
                    },
                    {
                        name: "totalDown",
                        type: "uint256"
                    },
                    {
                        name: "rewardPool",
                        type: "uint256"
                    },
                    {
                        name: "rakeAmount",
                        type: "uint256"
                    },
                    {
                        name: "status",
                        type: "uint8"
                    }
                ]
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "getBet",
        inputs: [
            {
                name: "roundId",
                type: "uint256"
            },
            {
                name: "user",
                type: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "tuple",
                components: [
                    {
                        name: "direction",
                        type: "uint8"
                    },
                    {
                        name: "amount",
                        type: "uint128"
                    },
                    {
                        name: "claimed",
                        type: "bool"
                    }
                ]
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "currentRound",
        inputs: [
            {
                name: "feedId",
                type: "bytes32"
            }
        ],
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "calcPayout",
        inputs: [
            {
                name: "roundId",
                type: "uint256"
            },
            {
                name: "user",
                type: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "referrers",
        inputs: [
            {
                name: "user",
                type: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "referralEarnings",
        inputs: [
            {
                name: "user",
                type: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "nextRoundId",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "bettingWindow",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint64"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "resolutionWindow",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint64"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "minBet",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint128"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "maxBet",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint128"
            }
        ],
        stateMutability: "view"
    },
    // Mutations
    {
        type: "function",
        name: "placeBet",
        inputs: [
            {
                name: "feedId",
                type: "bytes32"
            },
            {
                name: "direction",
                type: "uint8"
            },
            {
                name: "amount",
                type: "uint128"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "setReferrer",
        inputs: [
            {
                name: "referrer",
                type: "address"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "claimWinnings",
        inputs: [
            {
                name: "roundId",
                type: "uint256"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "withdrawReferralEarnings",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "lockRound",
        inputs: [
            {
                name: "roundId",
                type: "uint256"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "resolveRound",
        inputs: [
            {
                name: "roundId",
                type: "uint256"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    // Events
    {
        type: "event",
        name: "RoundOpened",
        inputs: [
            {
                name: "roundId",
                type: "uint256",
                indexed: true
            },
            {
                name: "feedId",
                type: "bytes32",
                indexed: true
            },
            {
                name: "lockTime",
                type: "uint64",
                indexed: false
            },
            {
                name: "resolveTime",
                type: "uint64",
                indexed: false
            }
        ]
    },
    {
        type: "event",
        name: "BetPlaced",
        inputs: [
            {
                name: "roundId",
                type: "uint256",
                indexed: true
            },
            {
                name: "user",
                type: "address",
                indexed: true
            },
            {
                name: "direction",
                type: "uint8",
                indexed: false
            },
            {
                name: "amount",
                type: "uint128",
                indexed: false
            }
        ]
    },
    {
        type: "event",
        name: "RoundLocked",
        inputs: [
            {
                name: "roundId",
                type: "uint256",
                indexed: true
            },
            {
                name: "lockPrice",
                type: "int256",
                indexed: false
            }
        ]
    },
    {
        type: "event",
        name: "RoundResolved",
        inputs: [
            {
                name: "roundId",
                type: "uint256",
                indexed: true
            },
            {
                name: "closePrice",
                type: "int256",
                indexed: false
            },
            {
                name: "winningDirection",
                type: "uint8",
                indexed: false
            }
        ]
    },
    {
        type: "event",
        name: "RoundCancelled",
        inputs: [
            {
                name: "roundId",
                type: "uint256",
                indexed: true
            }
        ]
    },
    {
        type: "event",
        name: "Claimed",
        inputs: [
            {
                name: "roundId",
                type: "uint256",
                indexed: true
            },
            {
                name: "user",
                type: "address",
                indexed: true
            },
            {
                name: "payout",
                type: "uint256",
                indexed: false
            }
        ]
    }
];
const ERC20_ABI = [
    {
        type: "function",
        name: "balanceOf",
        inputs: [
            {
                name: "account",
                type: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "allowance",
        inputs: [
            {
                name: "owner",
                type: "address"
            },
            {
                name: "spender",
                type: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "approve",
        inputs: [
            {
                name: "spender",
                type: "address"
            },
            {
                name: "amount",
                type: "uint256"
            }
        ],
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint8"
            }
        ],
        stateMutability: "view"
    }
];
const ORACLE_ABI = [
    {
        type: "function",
        name: "latestRoundData",
        inputs: [],
        outputs: [
            {
                name: "roundId",
                type: "uint80"
            },
            {
                name: "answer",
                type: "int256"
            },
            {
                name: "startedAt",
                type: "uint256"
            },
            {
                name: "updatedAt",
                type: "uint256"
            },
            {
                name: "answeredInRound",
                type: "uint80"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint8"
            }
        ],
        stateMutability: "view"
    }
];
var RoundStatus = /*#__PURE__*/ function(RoundStatus) {
    RoundStatus[RoundStatus["NONE"] = 0] = "NONE";
    RoundStatus[RoundStatus["OPEN"] = 1] = "OPEN";
    RoundStatus[RoundStatus["LOCKED"] = 2] = "LOCKED";
    RoundStatus[RoundStatus["RESOLVED"] = 3] = "RESOLVED";
    RoundStatus[RoundStatus["CANCELLED"] = 4] = "CANCELLED";
    return RoundStatus;
}({});
var Direction = /*#__PURE__*/ function(Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    return Direction;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.openclaw/workspace/megabets/frontend/src/lib/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers,
    "wagmiConfig",
    ()=>wagmiConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$react$2d$auth$40$3$2e$13$2e$1_$40$solana$2d$program$2b$system$40$0$2e$10$2e$0_$40$solana$2b$kit$40$5$2e$5$2e$1_bufferutil$40$_37db8a5bdcbfa3e5499d52b2609e853b$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$C47JxA4c$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__I__as__PrivyProvider$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@privy-io+react-auth@3.13.1_@solana-program+system@0.10.0_@solana+kit@5.5.1_bufferutil@_37db8a5bdcbfa3e5499d52b2609e853b/node_modules/@privy-io/react-auth/dist/esm/index-C47JxA4c.mjs [app-client] (ecmascript) <export I as PrivyProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$wagmi$40$4$2e$0$2e$1_$40$privy$2d$io$2b$react$2d$auth$40$3$2e$13$2e$1_$40$solana$2d$program$2b$system$40$0$2e$10$2e$0_$40$solana_908f62584d0df65758bcd18903ba5181$2f$node_modules$2f40$privy$2d$io$2f$wagmi$2f$dist$2f$esm$2f$WagmiProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@privy-io+wagmi@4.0.1_@privy-io+react-auth@3.13.1_@solana-program+system@0.10.0_@solana_908f62584d0df65758bcd18903ba5181/node_modules/@privy-io/wagmi/dist/esm/WagmiProvider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$wagmi$40$4$2e$0$2e$1_$40$privy$2d$io$2b$react$2d$auth$40$3$2e$13$2e$1_$40$solana$2d$program$2b$system$40$0$2e$10$2e$0_$40$solana_908f62584d0df65758bcd18903ba5181$2f$node_modules$2f40$privy$2d$io$2f$wagmi$2f$dist$2f$esm$2f$createConfig$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@privy-io+wagmi@4.0.1_@privy-io+react-auth@3.13.1_@solana-program+system@0.10.0_@solana_908f62584d0df65758bcd18903ba5181/node_modules/@privy-io/wagmi/dist/esm/createConfig.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$45$2e$3_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$9$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/viem@2.45.3_bufferutil@4.1.0_typescript@5.9.3_utf-8-validate@5.0.10_zod@3.25.76/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/src/lib/contract.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]();
const wagmiConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$wagmi$40$4$2e$0$2e$1_$40$privy$2d$io$2b$react$2d$auth$40$3$2e$13$2e$1_$40$solana$2d$program$2b$system$40$0$2e$10$2e$0_$40$solana_908f62584d0df65758bcd18903ba5181$2f$node_modules$2f40$privy$2d$io$2f$wagmi$2f$dist$2f$esm$2f$createConfig$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConfig"])({
    chains: [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["megaethTestnet"]
    ],
    transports: {
        [__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["megaethTestnet"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$45$2e$3_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$9$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["megaethTestnet"].rpcUrls.default.http[0])
    }
});
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$react$2d$auth$40$3$2e$13$2e$1_$40$solana$2d$program$2b$system$40$0$2e$10$2e$0_$40$solana$2b$kit$40$5$2e$5$2e$1_bufferutil$40$_37db8a5bdcbfa3e5499d52b2609e853b$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$C47JxA4c$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__I__as__PrivyProvider$3e$__["PrivyProvider"], {
        appId: ("TURBOPACK compile-time value", "cmlklgy4m00xt0cl4sg361fwu") || "cmlklgy4m00xt0cl4sg361fwu",
        config: {
            appearance: {
                theme: "dark",
                accentColor: "#7c4dff",
                logo: undefined
            },
            embeddedWallets: {
                ethereum: {
                    createOnLogin: "users-without-wallets"
                }
            },
            defaultChain: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["megaethTestnet"],
            supportedChains: [
                __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["megaethTestnet"]
            ]
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$wagmi$40$4$2e$0$2e$1_$40$privy$2d$io$2b$react$2d$auth$40$3$2e$13$2e$1_$40$solana$2d$program$2b$system$40$0$2e$10$2e$0_$40$solana_908f62584d0df65758bcd18903ba5181$2f$node_modules$2f40$privy$2d$io$2f$wagmi$2f$dist$2f$esm$2f$WagmiProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WagmiProvider"], {
                config: wagmiConfig,
                children: children
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/lib/providers.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/lib/providers.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/lib/providers.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_openclaw_workspace_megabets_frontend_src_lib_9a82e4d4._.js.map