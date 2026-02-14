module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/.openclaw/workspace/megabets/frontend/src/hooks/useRound.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRoundStatusLabel",
    ()=>getRoundStatusLabel,
    "useBet",
    ()=>useBet,
    "useCalcPayout",
    ()=>useCalcPayout,
    "useCurrentRoundId",
    ()=>useCurrentRoundId,
    "useRound",
    ()=>useRound
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/src/lib/contract.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useCurrentRoundId(feedKey) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].megaBets,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MEGABETS_ABI"],
        functionName: "currentRound",
        args: [
            __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FEED_IDS"][feedKey]
        ],
        query: {
            refetchInterval: 5000
        }
    });
}
function useRound(roundId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].megaBets,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MEGABETS_ABI"],
        functionName: "getRound",
        args: roundId ? [
            roundId
        ] : undefined,
        query: {
            enabled: !!roundId && roundId > 0n,
            refetchInterval: 5000
        }
    });
}
function useBet(roundId, user) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].megaBets,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MEGABETS_ABI"],
        functionName: "getBet",
        args: roundId && user ? [
            roundId,
            user
        ] : undefined,
        query: {
            enabled: !!roundId && roundId > 0n && !!user,
            refetchInterval: 3000
        }
    });
}
function useCalcPayout(roundId, user) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].megaBets,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MEGABETS_ABI"],
        functionName: "calcPayout",
        args: roundId && user ? [
            roundId,
            user
        ] : undefined,
        query: {
            enabled: !!roundId && roundId > 0n && !!user,
            refetchInterval: 5000
        }
    });
}
function getRoundStatusLabel(status) {
    switch(status){
        case __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].OPEN:
            return "LIVE";
        case __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].LOCKED:
            return "LOCKED";
        case __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].RESOLVED:
            return "RESOLVED";
        case __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].CANCELLED:
            return "CANCELLED";
        default:
            return "—";
    }
}
}),
"[project]/.openclaw/workspace/megabets/frontend/src/hooks/usePrice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePrice",
    ()=>usePrice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
// Shared singleton — ONE WebSocket + fetcher for all components
const priceCache = {
    BTC: {
        price: 0,
        prevPrice: 0,
        timestamp: 0
    },
    ETH: {
        price: 0,
        prevPrice: 0,
        timestamp: 0
    }
};
const listeners = new Set();
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
            setTimeout(()=>{
                notifyPending = false;
                lastNotify = Date.now();
                listeners.forEach((fn)=>fn());
            }, 100 - elapsed);
        }
        return;
    }
    lastNotify = now;
    listeners.forEach((fn)=>fn());
}
// Fetch prices via HTTP RPC (2 calls batched as JSON-RPC batch)
async function fetchPrices() {
    try {
        // JSON-RPC batch: 2 eth_call in one HTTP request
        const encode = (oracle)=>({
                jsonrpc: "2.0",
                id: oracle,
                method: "eth_call",
                params: [
                    {
                        to: oracle,
                        // latestRoundData() selector = 0xfeaf968c
                        data: "0xfeaf968c"
                    },
                    "latest"
                ]
            });
        const res = await fetch("https://carrot.megaeth.com/rpc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([
                encode("0x4bE899cF15a212fd6123E4A0E6e1B4925f493B96"),
                encode("0x9674Dbe42f9996e1470F8eC15a6D0aebA4a93AEb")
            ])
        });
        const results = await res.json();
        const feeds = [
            {
                id: "0x4bE899cF15a212fd6123E4A0E6e1B4925f493B96",
                feed: "BTC"
            },
            {
                id: "0x9674Dbe42f9996e1470F8eC15a6D0aebA4a93AEb",
                feed: "ETH"
            }
        ];
        for (const { id, feed } of feeds){
            const r = results.find((x)=>x.id === id);
            if (r?.result && r.result !== "0x") {
                // Decode: skip roundId (32 bytes), read answer (next 32 bytes)
                // Result is: roundId(uint80 padded to 32) + answer(int256) + startedAt + updatedAt + answeredInRound
                const hex = r.result;
                // answer is at offset 32 bytes = 64 hex chars (+ 2 for 0x prefix = position 66)
                const answerHex = "0x" + hex.slice(66, 130);
                const price = Number(BigInt(answerHex)) / 1e8;
                if (price > 0) {
                    priceCache[feed] = {
                        price,
                        prevPrice: priceCache[feed].price || price,
                        timestamp: Date.now()
                    };
                }
            }
        }
        notifyListeners();
    } catch  {
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
        ws.onopen = ()=>{
            ws.send(JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "eth_subscribe",
                params: [
                    "newHeads"
                ]
            }));
        };
        ws.onmessage = (event)=>{
            try {
                const msg = JSON.parse(event.data);
                if (msg.id === 1 && msg.result) {
                    wsActive = true;
                    console.log("[PriceFeed] WSS connected, block-driven updates");
                }
                if (msg.method === "eth_subscription") {
                    fetchPrices();
                }
            } catch  {}
        };
        ws.onclose = ()=>{
            wsActive = false;
            console.log("[PriceFeed] WSS disconnected, falling back to polling");
        };
        ws.onerror = ()=>{
            ws.close();
        };
    } catch  {
    // WSS not available in SSR
    }
    // Fallback polling: if WSS fails or in SSR, poll every 3s
    setInterval(()=>{
        if (!wsActive) fetchPrices();
    }, 3000);
}
function usePrice(feed) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(priceCache[feed]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        startPriceFeed();
        const update = ()=>setData({
                ...priceCache[feed]
            });
        listeners.add(update);
        return ()=>{
            listeners.delete(update);
        };
    }, [
        feed
    ]);
    return data;
}
}),
"[project]/.openclaw/workspace/megabets/frontend/src/components/SmoothChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SmoothChart",
    ()=>SmoothChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function SmoothChart({ prices, lockPrice, height = 300 }) {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const targetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const renderedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const lastTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Keep target in sync
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        targetRef.current = [
            ...prices
        ];
        if (renderedRef.current.length === 0 && prices.length > 0) {
            renderedRef.current = [
                ...prices
            ];
        }
    }, [
        prices
    ]);
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((timestamp)=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // Lerp rendered toward target
        const target = targetRef.current;
        const rendered = renderedRef.current;
        const dt = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0.016;
        lastTimeRef.current = timestamp;
        const lerpFactor = Math.min(1, dt * 8); // smooth ~8fps lerp rate
        // Sync lengths
        while(rendered.length < target.length){
            rendered.push(target[rendered.length]);
        }
        if (rendered.length > target.length) {
            rendered.splice(0, rendered.length - target.length);
        }
        for(let i = 0; i < rendered.length; i++){
            rendered[i] += (target[i] - rendered[i]) * lerpFactor;
        }
        ctx.clearRect(0, 0, w, h);
        if (rendered.length < 2) {
            animRef.current = requestAnimationFrame(draw);
            return;
        }
        const padding = {
            top: 20,
            bottom: 20,
            left: 0,
            right: 60
        };
        const chartW = w - padding.left - padding.right;
        const chartH = h - padding.top - padding.bottom;
        let min = Math.min(...rendered);
        let max = Math.max(...rendered);
        if (lockPrice !== undefined) {
            min = Math.min(min, lockPrice);
            max = Math.max(max, lockPrice);
        }
        const range = max - min || 1;
        // Add 5% padding to range
        const padRange = range * 0.05;
        const effectiveMin = min - padRange;
        const effectiveMax = max + padRange;
        const effectiveRange = effectiveMax - effectiveMin;
        const toX = (i)=>padding.left + i / Math.max(rendered.length - 1, 1) * chartW;
        const toY = (v)=>padding.top + chartH - (v - effectiveMin) / effectiveRange * chartH;
        // Draw lock price dashed line (target price)
        if (lockPrice !== undefined && lockPrice > 0) {
            const ly = toY(lockPrice);
            ctx.save();
            ctx.setLineDash([
                6,
                4
            ]);
            ctx.strokeStyle = "rgba(124, 77, 255, 0.5)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(padding.left, ly);
            ctx.lineTo(w - padding.right, ly);
            ctx.stroke();
            ctx.restore();
            // Label
            ctx.fillStyle = "rgba(124, 77, 255, 0.8)";
            ctx.font = "11px 'JetBrains Mono', monospace";
            ctx.textAlign = "left";
            ctx.fillText(`Target $${lockPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`, w - padding.right + 4, ly + 4);
        }
        // Determine color
        const isUp = rendered[rendered.length - 1] >= rendered[0];
        const lineColor = isUp ? "#00e676" : "#ff1744";
        const glowColor = isUp ? "rgba(0, 230, 118, 0.3)" : "rgba(255, 23, 68, 0.3)";
        // Draw smooth line using quadratic curves
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.moveTo(toX(0), toY(rendered[0]));
        for(let i = 1; i < rendered.length; i++){
            const prevX = toX(i - 1);
            const prevY = toY(rendered[i - 1]);
            const currX = toX(i);
            const currY = toY(rendered[i]);
            const midX = (prevX + currX) / 2;
            const midY = (prevY + currY) / 2;
            ctx.quadraticCurveTo(prevX, prevY, midX, midY);
        }
        // Final segment
        ctx.lineTo(toX(rendered.length - 1), toY(rendered[rendered.length - 1]));
        ctx.stroke();
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
        gradient.addColorStop(0, isUp ? "rgba(0, 230, 118, 0.12)" : "rgba(255, 23, 68, 0.12)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.lineTo(toX(rendered.length - 1), h - padding.bottom);
        ctx.lineTo(toX(0), h - padding.bottom);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        // Glow dot at tip
        const tipX = toX(rendered.length - 1);
        const tipY = toY(rendered[rendered.length - 1]);
        // Outer glow
        ctx.beginPath();
        ctx.arc(tipX, tipY, 10, 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();
        // Inner dot
        ctx.beginPath();
        ctx.arc(tipX, tipY, 4, 0, Math.PI * 2);
        ctx.fillStyle = lineColor;
        ctx.fill();
        // Current price label at tip
        const currentPrice = rendered[rendered.length - 1];
        ctx.fillStyle = lineColor;
        ctx.font = "bold 12px 'JetBrains Mono', monospace";
        ctx.textAlign = "left";
        ctx.fillText(`$${currentPrice.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`, w - padding.right + 4, tipY + 4);
        // Y-axis labels (right side, a few price levels)
        ctx.fillStyle = "rgba(107, 107, 138, 0.6)";
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.textAlign = "right";
        const steps = 4;
        for(let i = 0; i <= steps; i++){
            const val = effectiveMin + effectiveRange * i / steps;
            const y = toY(val);
            ctx.fillText(`$${val.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })}`, w - 2, y + 3);
            // Subtle grid line
            ctx.save();
            ctx.strokeStyle = "rgba(30, 30, 46, 0.5)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(w - padding.right, y);
            ctx.stroke();
            ctx.restore();
        }
        animRef.current = requestAnimationFrame(draw);
    }, [
        lockPrice
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        animRef.current = requestAnimationFrame(draw);
        return ()=>cancelAnimationFrame(animRef.current);
    }, [
        draw
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "w-full",
        style: {
            height,
            display: "block"
        }
    }, void 0, false, {
        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/SmoothChart.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
}),
"[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$react$2d$auth$40$3$2e$13$2e$1_$40$solana$2d$program$2b$system$40$0$2e$10$2e$0_$40$solana$2b$kit$40$5$2e$5$2e$1_bufferutil$40$_37db8a5bdcbfa3e5499d52b2609e853b$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$D_kd_mMH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@privy-io+react-auth@3.13.1_@solana-program+system@0.10.0_@solana+kit@5.5.1_bufferutil@_37db8a5bdcbfa3e5499d52b2609e853b/node_modules/@privy-io/react-auth/dist/esm/usePrivy-D_kd_mMH.mjs [app-ssr] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-ssr] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/src/lib/contract.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$45$2e$3_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$9$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/viem@2.45.3_bufferutil@4.1.0_typescript@5.9.3_utf-8-validate@5.0.10_zod@3.25.76/node_modules/viem/_esm/utils/unit/formatUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/framer-motion@12.34.0_@emotion+is-prop-valid@1.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Header() {
    const { login, logout, authenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$react$2d$auth$40$3$2e$13$2e$1_$40$solana$2d$program$2b$system$40$0$2e$10$2e$0_$40$solana$2b$kit$40$5$2e$5$2e$1_bufferutil$40$_37db8a5bdcbfa3e5499d52b2609e853b$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$D_kd_mMH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const { data: usdmBalanceRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].usdm,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERC20_ABI"],
        functionName: "balanceOf",
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: !!address,
            refetchInterval: 5000
        }
    });
    const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
    const displayBalance = usdmBalanceRaw !== undefined ? `${Number((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$45$2e$3_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$9$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(usdmBalanceRaw, 6)).toFixed(2)} USDM` : "0.00 USDM";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bg/80 border-b border-border",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "text-2xl font-black tracking-tight",
                            initial: {
                                opacity: 0,
                                x: -20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-up",
                                    children: "MEGA"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-text-bright",
                                    children: "BETS"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-up-dim border border-up/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-1.5 h-1.5 rounded-full bg-up pulse-live"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-up",
                                    children: "LIVE"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: authenticated && address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card border border-border",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-mono font-semibold text-text-bright",
                                    children: displayBalance
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                                    lineNumber: 54,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: logout,
                                className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card border border-border hover:border-border-active transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full bg-up"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-mono text-text-dim",
                                        children: displayAddress
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: login,
                        className: "px-5 py-2 rounded-lg bg-accent text-white font-semibold text-sm hover:brightness-110 transition-all glow-accent",
                        whileHover: {
                            scale: 1.05
                        },
                        whileTap: {
                            scale: 0.95
                        },
                        children: "Connect"
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                        lineNumber: 68,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MarketPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/framer-motion@12.34.0_@emotion+is-prop-valid@1.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/framer-motion@12.34.0_@emotion+is-prop-valid@1.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-ssr] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$45$2e$3_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$9$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/viem@2.45.3_bufferutil@4.1.0_typescript@5.9.3_utf-8-validate@5.0.10_zod@3.25.76/node_modules/viem/_esm/utils/unit/parseUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$react$2d$auth$40$3$2e$13$2e$1_$40$solana$2d$program$2b$system$40$0$2e$10$2e$0_$40$solana$2b$kit$40$5$2e$5$2e$1_bufferutil$40$_37db8a5bdcbfa3e5499d52b2609e853b$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$D_kd_mMH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@privy-io+react-auth@3.13.1_@solana-program+system@0.10.0_@solana+kit@5.5.1_bufferutil@_37db8a5bdcbfa3e5499d52b2609e853b/node_modules/@privy-io/react-auth/dist/esm/usePrivy-D_kd_mMH.mjs [app-ssr] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/src/lib/contract.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$hooks$2f$useRound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/src/hooks/useRound.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$hooks$2f$usePrice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/src/hooks/usePrice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$components$2f$SmoothChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/src/components/SmoothChart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/src/components/Header.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const TIMEFRAME_LABELS = {
    "1m": "1 Min",
    "5m": "5 Min",
    "10m": "10 Min",
    "15m": "15 Min"
};
const QUICK_AMOUNTS = [
    10,
    50,
    100,
    500
];
function MarketPage({ params }) {
    const { feedId: rawFeedId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Parse feedId: "BTC-5m" → asset="BTC", timeframe="5m"
    const [assetPart, tfPart] = rawFeedId.split("-");
    const asset = assetPart === "ETH" ? "ETH" : "BTC";
    const [timeframe, setTimeframe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMEFRAMES"].includes(tfPart) ? tfPart : "1m");
    const fk = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["feedKey"])(asset, timeframe);
    const { price, prevPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$hooks$2f$usePrice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePrice"])(asset);
    const { login, authenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$react$2d$auth$40$3$2e$13$2e$1_$40$solana$2d$program$2b$system$40$0$2e$10$2e$0_$40$solana$2b$kit$40$5$2e$5$2e$1_bufferutil$40$_37db8a5bdcbfa3e5499d52b2609e853b$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$D_kd_mMH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const { writeContractAsync, isPending: isTxPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: roundId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$hooks$2f$useRound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrentRoundId"])(fk);
    const { data: round } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$hooks$2f$useRound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRound"])(roundId);
    const { data: userBet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$hooks$2f$useRound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBet"])(roundId, address);
    const [selectedDirection, setSelectedDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [txStatus, setTxStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [priceHistory, setPriceHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Collect price history
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (price <= 0) return;
        setPriceHistory((prev)=>{
            const next = [
                ...prev,
                price
            ];
            return next.length > 300 ? next.slice(-300) : next;
        });
    }, [
        price
    ]);
    // Load initial price history from server
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch("/api/prices").then((r)=>r.json()).then((data)=>{
            const history = data[asset];
            if (history && history.length > 0) {
                setPriceHistory(history);
            }
        }).catch(()=>{});
    }, [
        asset
    ]);
    const { data: allowance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].usdm,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERC20_ABI"],
        functionName: "allowance",
        args: address ? [
            address,
            __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].megaBets
        ] : undefined,
        query: {
            enabled: !!address,
            refetchInterval: 5000
        }
    });
    const { data: usdmBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].usdm,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERC20_ABI"],
        functionName: "balanceOf",
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: !!address,
            refetchInterval: 5000
        }
    });
    const status = round ? Number(round.status) : __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].NONE;
    const hasBet = userBet && Number(userBet.amount) > 0;
    const betAmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$45$2e$3_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$9$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(amount || "0", 6);
    const needsApproval = allowance !== undefined && betAmount > allowance;
    // Countdown
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!round) return;
        const targetTime = status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].OPEN ? Number(round.lockTime) : status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].LOCKED ? Number(round.resolveTime) : 0;
        if (!targetTime) {
            setCountdown(0);
            return;
        }
        const tick = ()=>setCountdown(Math.max(0, targetTime - Math.floor(Date.now() / 1000)));
        tick();
        const id = setInterval(tick, 100);
        return ()=>clearInterval(id);
    }, [
        round,
        status
    ]);
    const lockPrice = round && round.lockPrice > 0n ? Number(round.lockPrice) / 1e8 : undefined;
    const handleBet = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!authenticated) {
            login();
            return;
        }
        if (selectedDirection === null || !amount) return;
        try {
            if (needsApproval) {
                setTxStatus("approving");
                await writeContractAsync({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].usdm,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERC20_ABI"],
                    functionName: "approve",
                    args: [
                        __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].megaBets,
                        betAmount
                    ],
                    chainId: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["megaethTestnet"].id
                });
            }
            setTxStatus("betting");
            await writeContractAsync({
                address: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].megaBets,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MEGABETS_ABI"],
                functionName: "placeBet",
                args: [
                    __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FEED_IDS"][fk],
                    selectedDirection,
                    betAmount
                ],
                chainId: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["megaethTestnet"].id
            });
            setTxStatus("success");
            setAmount("");
            setSelectedDirection(null);
            setTimeout(()=>setTxStatus("idle"), 3000);
        } catch (e) {
            console.error("Bet error:", e);
            setTxStatus("error");
            setTimeout(()=>setTxStatus("idle"), 3000);
        }
    }, [
        authenticated,
        login,
        selectedDirection,
        amount,
        needsApproval,
        betAmount,
        writeContractAsync,
        fk
    ]);
    const handleClaim = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!roundId) return;
        try {
            setTxStatus("claiming");
            await writeContractAsync({
                address: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADDRESSES"].megaBets,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MEGABETS_ABI"],
                functionName: "claimWinnings",
                args: [
                    roundId
                ],
                chainId: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["megaethTestnet"].id
            });
            setTxStatus("success");
            setTimeout(()=>setTxStatus("idle"), 3000);
        } catch (e) {
            console.error("Claim error:", e);
            setTxStatus("error");
            setTimeout(()=>setTxStatus("idle"), 3000);
        }
    }, [
        roundId,
        writeContractAsync
    ]);
    // Navigate to new feed on timeframe change
    const handleTimeframeChange = (tf)=>{
        setTimeframe(tf);
        router.replace(`/market/${asset}-${tf}`, {
            scroll: false
        });
    };
    const icon = asset === "BTC" ? "₿" : "Ξ";
    const direction = price > prevPrice ? "up" : price < prevPrice ? "down" : "neutral";
    const priceDelta = lockPrice ? price - lockPrice : undefined;
    const totalUp = round ? Number(round.totalUp) / 1e6 : 0;
    const totalDown = round ? Number(round.totalDown) / 1e6 : 0;
    const totalPool = totalUp + totalDown;
    const upPct = totalPool > 0 ? totalUp / totalPool * 100 : 50;
    const downPct = totalPool > 0 ? totalDown / totalPool * 100 : 50;
    const mins = Math.floor(countdown / 60);
    const secs = countdown % 60;
    const isUrgent = countdown > 0 && countdown <= 10;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto px-4 pt-20 pb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/"),
                        className: "text-text-dim text-sm hover:text-text mb-4 flex items-center gap-1",
                        children: "← All Markets"
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center w-12 h-12 rounded-xl bg-bg-card border border-border text-xl",
                                                        children: icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                className: "text-xl font-bold text-text-bright",
                                                                children: [
                                                                    asset,
                                                                    " Up or Down — ",
                                                                    TIMEFRAME_LABELS[timeframe]
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                lineNumber: 210,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-text-dim",
                                                                children: lockPrice !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "Price to beat: ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-accent font-mono font-semibold",
                                                                            children: [
                                                                                "$",
                                                                                lockPrice.toLocaleString("en-US", {
                                                                                    minimumFractionDigits: 2
                                                                                })
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                            lineNumber: 215,
                                                                            columnNumber: 44
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                    lineNumber: 215,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                lineNumber: 213,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 15
                                            }, this),
                                            countdown > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `text-3xl font-mono font-bold ${isUrgent ? "text-down" : status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].OPEN ? "text-up" : "text-accent"}`,
                                                        children: [
                                                            String(mins).padStart(2, "0"),
                                                            ":",
                                                            String(secs).padStart(2, "0")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] uppercase tracking-widest text-text-dim",
                                                        children: status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].OPEN ? "MINS  SECS" : "RESOLVING"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline gap-4",
                                        children: [
                                            lockPrice !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] uppercase tracking-widest text-text-dim",
                                                        children: "Price to Beat"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-mono font-semibold text-text-dim",
                                                        children: [
                                                            "$",
                                                            lockPrice.toLocaleString("en-US", {
                                                                minimumFractionDigits: 2
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                lineNumber: 237,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] uppercase tracking-widest text-text-dim flex items-center gap-1",
                                                        children: [
                                                            "Current Price",
                                                            priceDelta !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `font-mono ${priceDelta >= 0 ? "text-up" : "text-down"}`,
                                                                children: [
                                                                    priceDelta >= 0 ? "▲" : "▼",
                                                                    " $",
                                                                    Math.abs(priceDelta).toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `text-2xl font-mono font-bold ${direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-text-bright"}`,
                                                        children: [
                                                            "$",
                                                            price > 0 ? price.toLocaleString("en-US", {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            }) : "—"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-border bg-bg-card overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$components$2f$SmoothChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SmoothChart"], {
                                            prices: priceHistory,
                                            lockPrice: lockPrice,
                                            height: 350
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 flex-wrap",
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMEFRAMES"].map((tf)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleTimeframeChange(tf),
                                                    className: `
                    px-4 py-2 rounded-lg text-sm font-semibold transition-all
                    ${timeframe === tf ? "bg-text-bright text-bg" : "bg-bg-card border border-border text-text-dim hover:text-text hover:border-border-active"}
                  `,
                                                    children: [
                                                        status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].OPEN && timeframe === tf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-block w-1.5 h-1.5 rounded-full bg-down mr-1.5 pulse-live"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 21
                                                        }, this),
                                                        TIMEFRAME_LABELS[tf]
                                                    ]
                                                }, tf, true, {
                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 17
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ml-auto flex items-center gap-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-center w-8 h-8 rounded-lg bg-bg-card border border-border text-text-dim text-sm",
                                                    children: icon
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                lineNumber: 288,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border border-border bg-bg-card overflow-hidden sticky top-20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between px-5 py-3 border-b border-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-text-bright",
                                                    children: "Trade"
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 17
                                                }, this),
                                                status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].OPEN && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 px-2 py-0.5 rounded-full bg-up/10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-1.5 h-1.5 rounded-full bg-up pulse-live"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-bold text-up",
                                                            children: "BETTING OPEN"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 19
                                                }, this),
                                                status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].LOCKED && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold text-accent",
                                                        children: "LOCKED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                            lineNumber: 300,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-5 space-y-4",
                                            children: [
                                                (status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].OPEN || status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].NONE) && !hasBet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-2 gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setSelectedDirection(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].UP),
                                                                    className: `
                          py-3.5 rounded-xl font-bold text-base transition-all
                          ${selectedDirection === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].UP ? "bg-up text-bg ring-2 ring-up ring-offset-2 ring-offset-bg-card" : "bg-up/10 text-up hover:bg-up/20 border border-up/20"}
                        `,
                                                                    children: [
                                                                        "Up ",
                                                                        totalPool > 0 ? `${Math.round(upPct)}¢` : ""
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                    lineNumber: 320,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setSelectedDirection(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].DOWN),
                                                                    className: `
                          py-3.5 rounded-xl font-bold text-base transition-all
                          ${selectedDirection === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].DOWN ? "bg-down text-white ring-2 ring-down ring-offset-2 ring-offset-bg-card" : "bg-down/10 text-down hover:bg-down/20 border border-down/20"}
                        `,
                                                                    children: [
                                                                        "Down ",
                                                                        totalPool > 0 ? `${Math.round(downPct)}¢` : ""
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                    lineNumber: 332,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                            children: selectedDirection !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                initial: {
                                                                    height: 0,
                                                                    opacity: 0
                                                                },
                                                                animate: {
                                                                    height: "auto",
                                                                    opacity: 1
                                                                },
                                                                exit: {
                                                                    height: 0,
                                                                    opacity: 0
                                                                },
                                                                className: "space-y-3 overflow-hidden",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-xs text-text-dim font-semibold mb-1 block",
                                                                                children: "Amount"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                                lineNumber: 356,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "relative",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "number",
                                                                                        value: amount,
                                                                                        onChange: (e)=>setAmount(e.target.value),
                                                                                        placeholder: "0",
                                                                                        className: "w-full px-4 py-3 pr-20 rounded-xl bg-bg border border-border focus:border-accent focus:outline-none font-mono text-lg text-text-bright placeholder-text-dim"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                                        lineNumber: 358,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-dim font-semibold",
                                                                                        children: "USDM"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                                        lineNumber: 365,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                                lineNumber: 357,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                        lineNumber: 355,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-2",
                                                                        children: QUICK_AMOUNTS.map((qa)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>setAmount(qa.toString()),
                                                                                className: `
                                  flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all
                                  ${amount === qa.toString() ? "bg-accent/20 text-accent border border-accent/40" : "bg-bg border border-border text-text-dim hover:text-text"}
                                `,
                                                                                children: [
                                                                                    "+",
                                                                                    qa
                                                                                ]
                                                                            }, qa, true, {
                                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                                lineNumber: 374,
                                                                                columnNumber: 31
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                        lineNumber: 372,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    Number(amount) > 0 && totalPool > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between text-sm",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-text-dim",
                                                                                children: "To win"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                                lineNumber: 393,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-up font-mono font-bold",
                                                                                children: (()=>{
                                                                                    const myAmount = Number(amount);
                                                                                    const side = selectedDirection === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].UP ? totalUp : totalDown;
                                                                                    const otherSide = selectedDirection === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].UP ? totalDown : totalUp;
                                                                                    if (side + myAmount === 0) return "$0";
                                                                                    const payout = myAmount / (side + myAmount) * (totalPool + myAmount) * 0.97;
                                                                                    return `≈ $${payout.toFixed(2)}`;
                                                                                })()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                                lineNumber: 394,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                        lineNumber: 392,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: handleBet,
                                                                        disabled: !amount || Number(amount) <= 0 || isTxPending,
                                                                        className: `
                              w-full py-3.5 rounded-xl font-bold text-base transition-all
                              disabled:opacity-40 disabled:cursor-not-allowed
                              ${selectedDirection === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].UP ? "bg-up text-bg hover:brightness-110" : "bg-down text-white hover:brightness-110"}
                            `,
                                                                        children: txStatus === "approving" ? "Approving..." : txStatus === "betting" ? "Placing bet..." : needsApproval ? "Approve & Trade" : "Trade"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                        lineNumber: 408,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                lineNumber: 349,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                            lineNumber: 347,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                hasBet && userBet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `p-4 rounded-xl border ${Number(userBet.direction) === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].UP ? "bg-up/5 border-up/30" : "bg-down/5 border-down/30"}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: Number(userBet.direction) === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].UP ? "text-up" : "text-down",
                                                                        children: Number(userBet.direction) === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].UP ? "▲" : "▼"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                        lineNumber: 440,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-text-bright",
                                                                        children: "Your Position"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                        lineNumber: 443,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                lineNumber: 439,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono font-bold text-text-bright",
                                                                children: [
                                                                    (Number(userBet.amount) / 1e6).toFixed(2),
                                                                    " USDM"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                lineNumber: 445,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                    lineNumber: 433,
                                                    columnNumber: 19
                                                }, this),
                                                (status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].RESOLVED || status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].CANCELLED) && hasBet && !userBet?.claimed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleClaim,
                                                    disabled: isTxPending,
                                                    className: `
                      w-full py-3.5 rounded-xl font-bold text-base transition-all disabled:opacity-40
                      ${status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].RESOLVED ? "bg-gold text-bg" : "bg-text-dim/20 text-text"}
                    `,
                                                    children: txStatus === "claiming" ? "Claiming..." : status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].RESOLVED ? "🎉 Claim Winnings" : "Claim Refund"
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                    children: (txStatus === "success" || txStatus === "error") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0
                                                        },
                                                        animate: {
                                                            opacity: 1
                                                        },
                                                        exit: {
                                                            opacity: 0
                                                        },
                                                        className: `text-center text-sm font-semibold py-2 rounded-lg ${txStatus === "success" ? "text-up bg-up/10" : "text-down bg-down/10"}`,
                                                        children: txStatus === "success" ? "✅ Confirmed!" : "❌ Failed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 17
                                                }, this),
                                                totalPool > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2 pt-2 border-t border-border",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-up font-semibold",
                                                                    children: [
                                                                        "▲ ",
                                                                        totalUp.toFixed(0),
                                                                        " USDM"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                    lineNumber: 488,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-down font-semibold",
                                                                    children: [
                                                                        totalDown.toFixed(0),
                                                                        " USDM ▼"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                    lineNumber: 489,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                            lineNumber: 487,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative h-2 rounded-full overflow-hidden bg-bg",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    className: "absolute inset-y-0 left-0 rounded-l-full bg-up",
                                                                    animate: {
                                                                        width: `${upPct}%`
                                                                    },
                                                                    transition: {
                                                                        duration: 0.5
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                    lineNumber: 492,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$0_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    className: "absolute inset-y-0 right-0 rounded-r-full bg-down",
                                                                    animate: {
                                                                        width: `${downPct}%`
                                                                    },
                                                                    transition: {
                                                                        duration: 0.5
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                    lineNumber: 497,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                            lineNumber: 491,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-[10px] text-text-dim",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "Payout: ",
                                                                        totalPool > 0 && totalUp > 0 ? (totalPool / totalUp * 0.97).toFixed(2) : "—",
                                                                        "×"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                    lineNumber: 504,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "Payout: ",
                                                                        totalPool > 0 && totalDown > 0 ? (totalPool / totalDown * 0.97).toFixed(2) : "—",
                                                                        "×"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                                    lineNumber: 505,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                            lineNumber: 503,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                    lineNumber: 486,
                                                    columnNumber: 19
                                                }, this),
                                                status === __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$src$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundStatus"].RESOLVED && round && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 rounded-xl bg-bg text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-lg font-bold ${round.closePrice > round.lockPrice ? "text-up" : "text-down"}`,
                                                            children: round.closePrice > round.lockPrice ? "▲ UP WINS" : "▼ DOWN WINS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                            lineNumber: 513,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-text-dim mt-1 font-mono",
                                                            children: [
                                                                "Close: $",
                                                                (Number(round.closePrice) / 1e8).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                            lineNumber: 518,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                                    lineNumber: 512,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                            lineNumber: 315,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                    lineNumber: 298,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                                lineNumber: 297,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.openclaw/workspace/megabets/frontend/src/app/market/[feedId]/page.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8d8e2c37._.js.map