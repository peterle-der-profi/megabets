(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/getConnection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** https://wagmi.sh/core/api/actions/getConnection */ __turbopack_context__.s([
    "getConnection",
    ()=>getConnection
]);
function getConnection(config) {
    const uid = config.state.current;
    const connection = config.state.connections.get(uid);
    const addresses = connection?.accounts;
    const address = addresses?.[0];
    const chain = config.chains.find((chain)=>chain.id === connection?.chainId);
    const status = config.state.status;
    switch(status){
        case 'connected':
            return {
                address: address,
                addresses: addresses,
                chain,
                chainId: connection?.chainId,
                connector: connection?.connector,
                isConnected: true,
                isConnecting: false,
                isDisconnected: false,
                isReconnecting: false,
                status
            };
        case 'reconnecting':
            return {
                address,
                addresses,
                chain,
                chainId: connection?.chainId,
                connector: connection?.connector,
                isConnected: !!address,
                isConnecting: false,
                isDisconnected: false,
                isReconnecting: true,
                status
            };
        case 'connecting':
            return {
                address,
                addresses,
                chain,
                chainId: connection?.chainId,
                connector: connection?.connector,
                isConnected: false,
                isConnecting: true,
                isDisconnected: false,
                isReconnecting: false,
                status
            };
        case 'disconnected':
            return {
                address: undefined,
                addresses: undefined,
                chain: undefined,
                chainId: undefined,
                connector: undefined,
                isConnected: false,
                isConnecting: false,
                isDisconnected: true,
                isReconnecting: false,
                status
            };
    }
} //# sourceMappingURL=getConnection.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/utils/deepEqual.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Forked from https://github.com/epoberezkin/fast-deep-equal */ __turbopack_context__.s([
    "deepEqual",
    ()=>deepEqual
]);
function deepEqual(a, b) {
    if (a === b) return true;
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        if (a.constructor !== b.constructor) return false;
        let length;
        let i;
        if (Array.isArray(a) && Array.isArray(b)) {
            length = a.length;
            if (length !== b.length) return false;
            for(i = length; i-- !== 0;)if (!deepEqual(a[i], b[i])) return false;
            return true;
        }
        if (typeof a.valueOf === 'function' && a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (typeof a.toString === 'function' && a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        const keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for(i = length; i-- !== 0;)if (!Object.hasOwn(b, keys[i])) return false;
        for(i = length; i-- !== 0;){
            const key = keys[i];
            if (key && !deepEqual(a[key], b[key])) return false;
        }
        return true;
    }
    // true if both NaN, false otherwise
    // biome-ignore lint/suspicious/noSelfCompare: using
    return a !== a && b !== b;
} //# sourceMappingURL=deepEqual.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/watchConnection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "watchConnection",
    ()=>watchConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$deepEqual$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/utils/deepEqual.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/getConnection.js [app-client] (ecmascript)");
;
;
function watchConnection(config, parameters) {
    const { onChange } = parameters;
    return config.subscribe(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConnection"])(config), onChange, {
        equalityFn (a, b) {
            const { connector: aConnector, ...aRest } = a;
            const { connector: bConnector, ...bRest } = b;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$deepEqual$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(aRest, bRest) && // check connector separately
            aConnector?.id === bConnector?.id && aConnector?.uid === bConnector?.uid;
        }
    });
} //# sourceMappingURL=watchConnection.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/utils/getAction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Retrieves and returns an action from the client (if exists), and falls
 * back to the tree-shakable action.
 *
 * Useful for extracting overridden actions from a client (ie. if a consumer
 * wants to override the `sendTransaction` implementation).
 */ __turbopack_context__.s([
    "getAction",
    ()=>getAction
]);
function getAction(client, actionFn, // Some minifiers drop `Function.prototype.name`, or replace it with short letters,
// meaning that `actionFn.name` will not always work. For that case, the consumer
// needs to pass the name explicitly.
name) {
    const action_implicit = client[actionFn.name];
    if (typeof action_implicit === 'function') return action_implicit;
    const action_explicit = client[name];
    if (typeof action_explicit === 'function') return action_explicit;
    return (params)=>actionFn(client, params);
} //# sourceMappingURL=getAction.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/readContract.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readContract",
    ()=>readContract
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$45$2e$3_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$9$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$readContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/viem@2.45.3_bufferutil@4.1.0_typescript@5.9.3_utf-8-validate@5.0.10_zod@3.25.76/node_modules/viem/_esm/actions/public/readContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$getAction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/utils/getAction.js [app-client] (ecmascript)");
;
;
function readContract(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({
        chainId
    });
    const action = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$getAction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAction"])(client, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$45$2e$3_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$9$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$readContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContract"], 'readContract');
    return action(rest);
} //# sourceMappingURL=readContract.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/query/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterQueryOptions",
    ()=>filterQueryOptions,
    "hashFn",
    ()=>hashFn,
    "structuralSharing",
    ()=>structuralSharing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
;
function structuralSharing(oldData, newData) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceEqualDeep"])(oldData, newData);
}
function hashFn(queryKey) {
    return JSON.stringify(queryKey, (_, value)=>{
        if (isPlainObject(value)) return Object.keys(value).sort().reduce((result, key)=>{
            result[key] = value[key];
            return result;
        }, {});
        if (typeof value === 'bigint') return value.toString();
        return value;
    });
}
// biome-ignore lint/complexity/noBannedTypes: using
function isPlainObject(value) {
    if (!hasObjectPrototype(value)) {
        return false;
    }
    // If has modified constructor
    const ctor = value.constructor;
    if (typeof ctor === 'undefined') return true;
    // If has modified prototype
    const prot = ctor.prototype;
    if (!hasObjectPrototype(prot)) return false;
    // If constructor does not have an Object-specific method
    // biome-ignore lint/suspicious/noPrototypeBuiltins: using
    if (!prot.hasOwnProperty('isPrototypeOf')) return false;
    // Most likely a plain Object
    return true;
}
function hasObjectPrototype(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}
function filterQueryOptions(options) {
    // destructuring is super fast
    // biome-ignore format: no formatting
    const { // import('@tanstack/query-core').QueryOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    _defaulted, behavior, gcTime, initialData, initialDataUpdatedAt, maxPages, meta, networkMode, queryFn, queryHash, queryKey, queryKeyHashFn, retry, retryDelay, structuralSharing, // import('@tanstack/query-core').InfiniteQueryObserverOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    getPreviousPageParam, getNextPageParam, initialPageParam, // import('@tanstack/react-query').UseQueryOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    _optimisticResults, enabled, notifyOnChangeProps, placeholderData, refetchInterval, refetchIntervalInBackground, refetchOnMount, refetchOnReconnect, refetchOnWindowFocus, retryOnMount, select, staleTime, suspense, throwOnError, ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // wagmi
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    abi, config, connector, query, watch, ...rest } = options;
    if (connector) return {
        connectorUid: connector?.uid,
        ...rest
    };
    return rest;
} //# sourceMappingURL=utils.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/query/readContract.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readContractQueryKey",
    ()=>readContractQueryKey,
    "readContractQueryOptions",
    ()=>readContractQueryOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$readContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/readContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$query$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/query/utils.js [app-client] (ecmascript)");
;
;
function readContractQueryOptions(config, options = {}) {
    return {
        ...options.query,
        enabled: Boolean(Boolean(options.address || 'code' in options && options.code) && options.abi && options.functionName && (options.query?.enabled ?? true)),
        // TODO: Support `signal` once Viem actions allow passthrough
        // https://tkdodo.eu/blog/why-you-want-react-query#bonus-cancellation
        queryFn: async (context)=>{
            if (!options.abi) throw new Error('abi is required');
            const [, { scopeKey: _, ...parameters }] = context.queryKey;
            if (!parameters.functionName) throw new Error('functionName is required');
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$readContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContract"])(config, {
                ...parameters,
                abi: options.abi,
                address: parameters.address,
                code: 'code' in parameters && parameters.code ? parameters.code : undefined,
                functionName: parameters.functionName
            });
            return result;
        },
        queryKey: readContractQueryKey(options),
        structuralSharing: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$query$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["structuralSharing"]
    };
}
function readContractQueryKey(options = {}) {
    return [
        'readContract',
        (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$query$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterQueryOptions"])(options)
    ];
} //# sourceMappingURL=readContract.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/getChainId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** https://wagmi.sh/core/api/actions/getChainId */ __turbopack_context__.s([
    "getChainId",
    ()=>getChainId
]);
function getChainId(config) {
    return config.state.chainId;
} //# sourceMappingURL=getChainId.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/watchChainId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** https://wagmi.sh/core/api/actions/watchChainId */ __turbopack_context__.s([
    "watchChainId",
    ()=>watchChainId
]);
function watchChainId(config, parameters) {
    const { onChange } = parameters;
    return config.subscribe((state)=>state.chainId, onChange);
} //# sourceMappingURL=watchChainId.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/use-sync-external-store@1.4.0_react@19.2.4/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
            var cachedValue = getSnapshot();
            objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
        }
        cachedValue = useState({
            inst: {
                value: value,
                getSnapshot: getSnapshot
            }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect({
            "useSyncExternalStore$2.useLayoutEffect": function() {
                inst.value = value;
                inst.getSnapshot = getSnapshot;
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
            }
        }["useSyncExternalStore$2.useLayoutEffect"], [
            subscribe,
            value,
            getSnapshot
        ]);
        useEffect({
            "useSyncExternalStore$2.useEffect": function() {
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
                return subscribe({
                    "useSyncExternalStore$2.useEffect": function() {
                        checkIfSnapshotChanged(inst) && forceUpdate({
                            inst: inst
                        });
                    }
                }["useSyncExternalStore$2.useEffect"]);
            }
        }["useSyncExternalStore$2.useEffect"], [
            subscribe
        ]);
        useDebugValue(value);
        return value;
    }
    function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
            var nextValue = latestGetSnapshot();
            return !objectIs(inst, nextValue);
        } catch (error) {
            return !0;
        }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/use-sync-external-store@1.4.0_react@19.2.4/node_modules/use-sync-external-store/shim/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/use-sync-external-store@1.4.0_react@19.2.4/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js [app-client] (ecmascript)");
}
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/use-sync-external-store@1.4.0_react@19.2.4/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), shim = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/use-sync-external-store@1.4.0_react@19.2.4/node_modules/use-sync-external-store/shim/index.js [app-client] (ecmascript)"), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef(null);
        if (null === instRef.current) {
            var inst = {
                hasValue: !1,
                value: null
            };
            instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo(function() {
            function memoizedSelector(nextSnapshot) {
                if (!hasMemo) {
                    hasMemo = !0;
                    memoizedSnapshot = nextSnapshot;
                    nextSnapshot = selector(nextSnapshot);
                    if (void 0 !== isEqual && inst.hasValue) {
                        var currentSelection = inst.value;
                        if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
                    }
                    return memoizedSelection = nextSnapshot;
                }
                currentSelection = memoizedSelection;
                if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
                var nextSelection = selector(nextSnapshot);
                if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
                memoizedSnapshot = nextSnapshot;
                return memoizedSelection = nextSelection;
            }
            var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
                function() {
                    return memoizedSelector(getSnapshot());
                },
                null === maybeGetServerSnapshot ? void 0 : function() {
                    return memoizedSelector(maybeGetServerSnapshot());
                }
            ];
        }, [
            getSnapshot,
            getServerSnapshot,
            selector,
            isEqual
        ]);
        var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
        useEffect(function() {
            inst.hasValue = !0;
            inst.value = value;
        }, [
            value
        ]);
        useDebugValue(value);
        return value;
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/use-sync-external-store@1.4.0_react@19.2.4/node_modules/use-sync-external-store/shim/with-selector.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/use-sync-external-store@1.4.0_react@19.2.4/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js [app-client] (ecmascript)");
}
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useSyncExternalStoreWithTracked.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSyncExternalStoreWithTracked",
    ()=>useSyncExternalStoreWithTracked
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$deepEqual$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/utils/deepEqual.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$use$2d$sync$2d$external$2d$store$40$1$2e$4$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$shim$2f$with$2d$selector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/use-sync-external-store@1.4.0_react@19.2.4/node_modules/use-sync-external-store/shim/with-selector.js [app-client] (ecmascript)");
'use client';
;
;
;
const isPlainObject = (obj)=>typeof obj === 'object' && !Array.isArray(obj);
function useSyncExternalStoreWithTracked(subscribe, getSnapshot, getServerSnapshot = getSnapshot, isEqual = __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$deepEqual$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"]) {
    const trackedKeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$use$2d$sync$2d$external$2d$store$40$1$2e$4$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$shim$2f$with$2d$selector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStoreWithSelector"])(subscribe, getSnapshot, getServerSnapshot, {
        "useSyncExternalStoreWithTracked.useSyncExternalStoreWithSelector[result]": (x)=>x
    }["useSyncExternalStoreWithTracked.useSyncExternalStoreWithSelector[result]"], {
        "useSyncExternalStoreWithTracked.useSyncExternalStoreWithSelector[result]": (a, b)=>{
            if (isPlainObject(a) && isPlainObject(b) && trackedKeys.current.length) {
                for (const key of trackedKeys.current){
                    const equal = isEqual(a[key], b[key]);
                    if (!equal) return false;
                }
                return true;
            }
            return isEqual(a, b);
        }
    }["useSyncExternalStoreWithTracked.useSyncExternalStoreWithSelector[result]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useSyncExternalStoreWithTracked.useMemo": ()=>{
            if (isPlainObject(result)) {
                const trackedResult = {
                    ...result
                };
                let properties = {};
                for (const [key, value] of Object.entries(trackedResult)){
                    properties = {
                        ...properties,
                        [key]: {
                            configurable: false,
                            enumerable: true,
                            get: ({
                                "useSyncExternalStoreWithTracked.useMemo": ()=>{
                                    if (!trackedKeys.current.includes(key)) {
                                        trackedKeys.current.push(key);
                                    }
                                    return value;
                                }
                            })["useSyncExternalStoreWithTracked.useMemo"]
                        }
                    };
                }
                Object.defineProperties(trackedResult, properties);
                return trackedResult;
            }
            return result;
        }
    }["useSyncExternalStoreWithTracked.useMemo"], [
        result
    ]);
} //# sourceMappingURL=useSyncExternalStoreWithTracked.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConnection",
    ()=>useConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/getConnection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/watchConnection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSyncExternalStoreWithTracked$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useSyncExternalStoreWithTracked.js [app-client] (ecmascript)");
'use client';
;
;
;
function useConnection(parameters = {}) {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfig"])(parameters);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSyncExternalStoreWithTracked$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStoreWithTracked"])({
        "useConnection.useSyncExternalStoreWithTracked": (onChange)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchConnection"])(config, {
                onChange
            })
    }["useConnection.useSyncExternalStoreWithTracked"], {
        "useConnection.useSyncExternalStoreWithTracked": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConnection"])(config)
    }["useConnection.useSyncExternalStoreWithTracked"]);
} //# sourceMappingURL=useConnection.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-client] (ecmascript) <export useConnection as useAccount>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAccount",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnection"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-client] (ecmascript)");
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/utils/query.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInfiniteQuery",
    ()=>useInfiniteQuery,
    "useQuery",
    ()=>useQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$query$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/query/utils.js [app-client] (ecmascript)");
;
;
;
function useQuery(parameters) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        ...parameters,
        queryKeyHashFn: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$query$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashFn"]
    });
    result.queryKey = parameters.queryKey;
    return result;
}
function useInfiniteQuery(parameters) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"])({
        ...parameters,
        queryKeyHashFn: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$query$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashFn"]
    });
    result.queryKey = parameters.queryKey;
    return result;
} //# sourceMappingURL=query.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useChainId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChainId",
    ()=>useChainId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/getChainId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/actions/watchChainId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useConfig.js [app-client] (ecmascript)");
'use client';
;
;
;
function useChainId(parameters = {}) {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfig"])(parameters);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])({
        "useChainId.useSyncExternalStore": (onChange)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchChainId"])(config, {
                onChange
            })
    }["useChainId.useSyncExternalStore"], {
        "useChainId.useSyncExternalStore": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChainId"])(config)
    }["useChainId.useSyncExternalStore"], {
        "useChainId.useSyncExternalStore": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChainId"])(config)
    }["useChainId.useSyncExternalStore"]);
} //# sourceMappingURL=useChainId.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useReadContract",
    ()=>useReadContract
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$query$2f$readContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@wagmi+core@3.3.3_@tanstack+query-core@5.90.20_@types+react@19.2.14_ox@0.12.1_typescrip_140d8536898d2f9d55f466b903fe429e/node_modules/@wagmi/core/dist/esm/query/readContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$utils$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/utils/query.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useChainId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/wagmi@3.4.3_@coinbase+wallet-sdk@4.3.6_@types+react@19.2.14_bufferutil@4.1.0_react@19.2_9889e1aac6af932b623b272f8f2f6f98/node_modules/wagmi/dist/esm/hooks/useConfig.js [app-client] (ecmascript)");
'use client';
;
;
;
;
function useReadContract(parameters = {}) {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfig"])(parameters);
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainId"])({
        config
    });
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$3$2e$3$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20_$40$types$2b$react$40$19$2e$2$2e$14_ox$40$0$2e$12$2e$1_typescrip_140d8536898d2f9d55f466b903fe429e$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$query$2f$readContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContractQueryOptions"])(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$wagmi$40$3$2e$4$2e$3_$40$coinbase$2b$wallet$2d$sdk$40$4$2e$3$2e$6_$40$types$2b$react$40$19$2e$2$2e$14_bufferutil$40$4$2e$1$2e$0_react$40$19$2e$2_9889e1aac6af932b623b272f8f2f6f98$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$utils$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useQuery"])(options);
} //# sourceMappingURL=useReadContract.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryObserver",
    ()=>QueryObserver
]);
// src/queryObserver.ts
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/focusManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/query.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/subscribable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/thenable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/timeoutManager.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
var QueryObserver = class extends __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subscribable"] {
    constructor(client, options){
        super();
        this.options = options;
        this.#client = client;
        this.#selectError = null;
        this.#currentThenable = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
        this.bindMethods();
        this.setOptions(options);
    }
    #client;
    #currentQuery = void 0;
    #currentQueryInitialState = void 0;
    #currentResult = void 0;
    #currentResultState;
    #currentResultOptions;
    #currentThenable;
    #selectError;
    #selectFn;
    #selectResult;
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    #lastQueryWithDefinedData;
    #staleTimeoutId;
    #refetchIntervalId;
    #currentRefetchInterval;
    #trackedProps = /* @__PURE__ */ new Set();
    bindMethods() {
        this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
        if (this.listeners.size === 1) {
            this.#currentQuery.addObserver(this);
            if (shouldFetchOnMount(this.#currentQuery, this.options)) {
                this.#executeFetch();
            } else {
                this.updateResult();
            }
            this.#updateTimers();
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.destroy();
        }
    }
    shouldFetchOnReconnect() {
        return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnReconnect);
    }
    shouldFetchOnWindowFocus() {
        return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnWindowFocus);
    }
    destroy() {
        this.listeners = /* @__PURE__ */ new Set();
        this.#clearStaleTimeout();
        this.#clearRefetchInterval();
        this.#currentQuery.removeObserver(this);
    }
    setOptions(options) {
        const prevOptions = this.options;
        const prevQuery = this.#currentQuery;
        this.options = this.#client.defaultQueryOptions(options);
        if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) !== "boolean") {
            throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
        }
        this.#updateQuery();
        this.#currentQuery.setOptions(this.options);
        if (prevOptions._defaulted && !(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(this.options, prevOptions)) {
            this.#client.getQueryCache().notify({
                type: "observerOptionsUpdated",
                query: this.#currentQuery,
                observer: this
            });
        }
        const mounted = this.hasListeners();
        if (mounted && shouldFetchOptionally(this.#currentQuery, prevQuery, this.options, prevOptions)) {
            this.#executeFetch();
        }
        this.updateResult();
        if (mounted && (this.#currentQuery !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(prevOptions.enabled, this.#currentQuery) || (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(this.options.staleTime, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(prevOptions.staleTime, this.#currentQuery))) {
            this.#updateStaleTimeout();
        }
        const nextRefetchInterval = this.#computeRefetchInterval();
        if (mounted && (this.#currentQuery !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) {
            this.#updateRefetchInterval(nextRefetchInterval);
        }
    }
    getOptimisticResult(options) {
        const query = this.#client.getQueryCache().build(this.#client, options);
        const result = this.createResult(query, options);
        if (shouldAssignObserverCurrentProperties(this, result)) {
            this.#currentResult = result;
            this.#currentResultOptions = this.options;
            this.#currentResultState = this.#currentQuery.state;
        }
        return result;
    }
    getCurrentResult() {
        return this.#currentResult;
    }
    trackResult(result, onPropTracked) {
        return new Proxy(result, {
            get: (target, key)=>{
                this.trackProp(key);
                onPropTracked?.(key);
                if (key === "promise") {
                    this.trackProp("data");
                    if (!this.options.experimental_prefetchInRender && this.#currentThenable.status === "pending") {
                        this.#currentThenable.reject(new Error("experimental_prefetchInRender feature flag is not enabled"));
                    }
                }
                return Reflect.get(target, key);
            }
        });
    }
    trackProp(key) {
        this.#trackedProps.add(key);
    }
    getCurrentQuery() {
        return this.#currentQuery;
    }
    refetch({ ...options } = {}) {
        return this.fetch({
            ...options
        });
    }
    fetchOptimistic(options) {
        const defaultedOptions = this.#client.defaultQueryOptions(options);
        const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
        return query.fetch().then(()=>this.createResult(query, defaultedOptions));
    }
    fetch(fetchOptions) {
        return this.#executeFetch({
            ...fetchOptions,
            cancelRefetch: fetchOptions.cancelRefetch ?? true
        }).then(()=>{
            this.updateResult();
            return this.#currentResult;
        });
    }
    #executeFetch(fetchOptions) {
        this.#updateQuery();
        let promise = this.#currentQuery.fetch(this.options, fetchOptions);
        if (!fetchOptions?.throwOnError) {
            promise = promise.catch(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]);
        }
        return promise;
    }
    #updateStaleTimeout() {
        this.#clearStaleTimeout();
        const staleTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(this.options.staleTime, this.#currentQuery);
        if (__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServer"] || this.#currentResult.isStale || !(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(staleTime)) {
            return;
        }
        const time = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeUntilStale"])(this.#currentResult.dataUpdatedAt, staleTime);
        const timeout = time + 1;
        this.#staleTimeoutId = __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].setTimeout(()=>{
            if (!this.#currentResult.isStale) {
                this.updateResult();
            }
        }, timeout);
    }
    #computeRefetchInterval() {
        return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
    }
    #updateRefetchInterval(nextInterval) {
        this.#clearRefetchInterval();
        this.#currentRefetchInterval = nextInterval;
        if (__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServer"] || (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) === false || !(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
            return;
        }
        this.#refetchIntervalId = __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].setInterval(()=>{
            if (this.options.refetchIntervalInBackground || __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusManager"].isFocused()) {
                this.#executeFetch();
            }
        }, this.#currentRefetchInterval);
    }
    #updateTimers() {
        this.#updateStaleTimeout();
        this.#updateRefetchInterval(this.#computeRefetchInterval());
    }
    #clearStaleTimeout() {
        if (this.#staleTimeoutId) {
            __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].clearTimeout(this.#staleTimeoutId);
            this.#staleTimeoutId = void 0;
        }
    }
    #clearRefetchInterval() {
        if (this.#refetchIntervalId) {
            __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].clearInterval(this.#refetchIntervalId);
            this.#refetchIntervalId = void 0;
        }
    }
    createResult(query, options) {
        const prevQuery = this.#currentQuery;
        const prevOptions = this.options;
        const prevResult = this.#currentResult;
        const prevResultState = this.#currentResultState;
        const prevResultOptions = this.#currentResultOptions;
        const queryChange = query !== prevQuery;
        const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
        const { state } = query;
        let newState = {
            ...state
        };
        let isPlaceholderData = false;
        let data;
        if (options._optimisticResults) {
            const mounted = this.hasListeners();
            const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
            const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
            if (fetchOnMount || fetchOptionally) {
                newState = {
                    ...newState,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchState"])(state.data, query.options)
                };
            }
            if (options._optimisticResults === "isRestoring") {
                newState.fetchStatus = "idle";
            }
        }
        let { error, errorUpdatedAt, status } = newState;
        data = newState.data;
        let skipSelect = false;
        if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
            let placeholderData;
            if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
                placeholderData = prevResult.data;
                skipSelect = true;
            } else {
                placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(this.#lastQueryWithDefinedData?.state.data, this.#lastQueryWithDefinedData) : options.placeholderData;
            }
            if (placeholderData !== void 0) {
                status = "success";
                data = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceData"])(prevResult?.data, placeholderData, options);
                isPlaceholderData = true;
            }
        }
        if (options.select && data !== void 0 && !skipSelect) {
            if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) {
                data = this.#selectResult;
            } else {
                try {
                    this.#selectFn = options.select;
                    data = options.select(data);
                    data = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceData"])(prevResult?.data, data, options);
                    this.#selectResult = data;
                    this.#selectError = null;
                } catch (selectError) {
                    this.#selectError = selectError;
                }
            }
        }
        if (this.#selectError) {
            error = this.#selectError;
            data = this.#selectResult;
            errorUpdatedAt = Date.now();
            status = "error";
        }
        const isFetching = newState.fetchStatus === "fetching";
        const isPending = status === "pending";
        const isError = status === "error";
        const isLoading = isPending && isFetching;
        const hasData = data !== void 0;
        const result = {
            status,
            fetchStatus: newState.fetchStatus,
            isPending,
            isSuccess: status === "success",
            isError,
            isInitialLoading: isLoading,
            isLoading,
            data,
            dataUpdatedAt: newState.dataUpdatedAt,
            error,
            errorUpdatedAt,
            failureCount: newState.fetchFailureCount,
            failureReason: newState.fetchFailureReason,
            errorUpdateCount: newState.errorUpdateCount,
            isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
            isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
            isFetching,
            isRefetching: isFetching && !isPending,
            isLoadingError: isError && !hasData,
            isPaused: newState.fetchStatus === "paused",
            isPlaceholderData,
            isRefetchError: isError && hasData,
            isStale: isStale(query, options),
            refetch: this.refetch,
            promise: this.#currentThenable,
            isEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false
        };
        const nextResult = result;
        if (this.options.experimental_prefetchInRender) {
            const hasResultData = nextResult.data !== void 0;
            const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
            const finalizeThenableIfPossible = (thenable)=>{
                if (isErrorWithoutData) {
                    thenable.reject(nextResult.error);
                } else if (hasResultData) {
                    thenable.resolve(nextResult.data);
                }
            };
            const recreateThenable = ()=>{
                const pending = this.#currentThenable = nextResult.promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
                finalizeThenableIfPossible(pending);
            };
            const prevThenable = this.#currentThenable;
            switch(prevThenable.status){
                case "pending":
                    if (query.queryHash === prevQuery.queryHash) {
                        finalizeThenableIfPossible(prevThenable);
                    }
                    break;
                case "fulfilled":
                    if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
                        recreateThenable();
                    }
                    break;
                case "rejected":
                    if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
                        recreateThenable();
                    }
                    break;
            }
        }
        return nextResult;
    }
    updateResult() {
        const prevResult = this.#currentResult;
        const nextResult = this.createResult(this.#currentQuery, this.options);
        this.#currentResultState = this.#currentQuery.state;
        this.#currentResultOptions = this.options;
        if (this.#currentResultState.data !== void 0) {
            this.#lastQueryWithDefinedData = this.#currentQuery;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(nextResult, prevResult)) {
            return;
        }
        this.#currentResult = nextResult;
        const shouldNotifyListeners = ()=>{
            if (!prevResult) {
                return true;
            }
            const { notifyOnChangeProps } = this.options;
            const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
            if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
                return true;
            }
            const includedProps = new Set(notifyOnChangePropsValue ?? this.#trackedProps);
            if (this.options.throwOnError) {
                includedProps.add("error");
            }
            return Object.keys(this.#currentResult).some((key)=>{
                const typedKey = key;
                const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
                return changed && includedProps.has(typedKey);
            });
        };
        this.#notify({
            listeners: shouldNotifyListeners()
        });
    }
    #updateQuery() {
        const query = this.#client.getQueryCache().build(this.#client, this.options);
        if (query === this.#currentQuery) {
            return;
        }
        const prevQuery = this.#currentQuery;
        this.#currentQuery = query;
        this.#currentQueryInitialState = query.state;
        if (this.hasListeners()) {
            prevQuery?.removeObserver(this);
            query.addObserver(this);
        }
    }
    onQueryUpdate() {
        this.updateResult();
        if (this.hasListeners()) {
            this.#updateTimers();
        }
    }
    #notify(notifyOptions) {
        __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
            if (notifyOptions.listeners) {
                this.listeners.forEach((listener)=>{
                    listener(this.#currentResult);
                });
            }
            this.#client.getQueryCache().notify({
                query: this.#currentQuery,
                type: "observerResultsUpdated"
            });
        });
    }
};
function shouldLoadOnMount(query, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
    return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false && (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(options.staleTime, query) !== "static") {
        const value = typeof field === "function" ? field(query) : field;
        return value === "always" || value !== false && isStale(query, options);
    }
    return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
    return (query !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false && query.isStaleByTime((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(observer.getCurrentResult(), optimisticResult)) {
        return true;
    }
    return false;
}
;
 //# sourceMappingURL=queryObserver.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/infiniteQueryObserver.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InfiniteQueryObserver",
    ()=>InfiniteQueryObserver
]);
// src/infiniteQueryObserver.ts
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$infiniteQueryBehavior$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js [app-client] (ecmascript)");
;
;
var InfiniteQueryObserver = class extends __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryObserver"] {
    constructor(client, options){
        super(client, options);
    }
    bindMethods() {
        super.bindMethods();
        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
    }
    setOptions(options) {
        super.setOptions({
            ...options,
            behavior: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$infiniteQueryBehavior$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["infiniteQueryBehavior"])()
        });
    }
    getOptimisticResult(options) {
        options.behavior = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$infiniteQueryBehavior$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["infiniteQueryBehavior"])();
        return super.getOptimisticResult(options);
    }
    fetchNextPage(options) {
        return this.fetch({
            ...options,
            meta: {
                fetchMore: {
                    direction: "forward"
                }
            }
        });
    }
    fetchPreviousPage(options) {
        return this.fetch({
            ...options,
            meta: {
                fetchMore: {
                    direction: "backward"
                }
            }
        });
    }
    createResult(query, options) {
        const { state } = query;
        const parentResult = super.createResult(query, options);
        const { isFetching, isRefetching, isError, isRefetchError } = parentResult;
        const fetchDirection = state.fetchMeta?.fetchMore?.direction;
        const isFetchNextPageError = isError && fetchDirection === "forward";
        const isFetchingNextPage = isFetching && fetchDirection === "forward";
        const isFetchPreviousPageError = isError && fetchDirection === "backward";
        const isFetchingPreviousPage = isFetching && fetchDirection === "backward";
        const result = {
            ...parentResult,
            fetchNextPage: this.fetchNextPage,
            fetchPreviousPage: this.fetchPreviousPage,
            hasNextPage: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$infiniteQueryBehavior$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasNextPage"])(options, state.data),
            hasPreviousPage: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$infiniteQueryBehavior$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPreviousPage"])(options, state.data),
            isFetchNextPageError,
            isFetchingNextPage,
            isFetchPreviousPageError,
            isFetchingPreviousPage,
            isRefetchError: isRefetchError && !isFetchNextPageError && !isFetchPreviousPageError,
            isRefetching: isRefetching && !isFetchingNextPage && !isFetchingPreviousPage
        };
        return result;
    }
};
;
 //# sourceMappingURL=infiniteQueryObserver.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryErrorResetBoundary",
    ()=>QueryErrorResetBoundary,
    "useQueryErrorResetBoundary",
    ()=>useQueryErrorResetBoundary
]);
// src/QueryErrorResetBoundary.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function createValue() {
    let isReset = false;
    return {
        clearReset: ()=>{
            isReset = false;
        },
        reset: ()=>{
            isReset = true;
        },
        isReset: ()=>{
            return isReset;
        }
    };
}
var QueryErrorResetBoundaryContext = __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](createValue());
var useQueryErrorResetBoundary = ()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](QueryErrorResetBoundaryContext);
var QueryErrorResetBoundary = ({ children })=>{
    const [value] = __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "QueryErrorResetBoundary.useState": ()=>createValue()
    }["QueryErrorResetBoundary.useState"]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(QueryErrorResetBoundaryContext.Provider, {
        value,
        children: typeof children === "function" ? children(value) : children
    });
};
;
 //# sourceMappingURL=QueryErrorResetBoundary.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensurePreventErrorBoundaryRetry",
    ()=>ensurePreventErrorBoundaryRetry,
    "getHasError",
    ()=>getHasError,
    "useClearResetErrorBoundary",
    ()=>useClearResetErrorBoundary
]);
// src/errorBoundaryUtils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
"use client";
;
;
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query)=>{
    const throwOnError = query?.state.error && typeof options.throwOnError === "function" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldThrowError"])(options.throwOnError, [
        query.state.error,
        query
    ]) : options.throwOnError;
    if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
        if (!errorResetBoundary.isReset()) {
            options.retryOnMount = false;
        }
    }
};
var useClearResetErrorBoundary = (errorResetBoundary)=>{
    __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useClearResetErrorBoundary.useEffect": ()=>{
            errorResetBoundary.clearReset();
        }
    }["useClearResetErrorBoundary.useEffect"], [
        errorResetBoundary
    ]);
};
var getHasError = ({ result, errorResetBoundary, throwOnError, query, suspense })=>{
    return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldThrowError"])(throwOnError, [
        result.error,
        query
    ]));
};
;
 //# sourceMappingURL=errorBoundaryUtils.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IsRestoringProvider",
    ()=>IsRestoringProvider,
    "useIsRestoring",
    ()=>useIsRestoring
]);
// src/IsRestoringProvider.ts
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
var IsRestoringContext = __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](false);
var useIsRestoring = ()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](IsRestoringContext);
var IsRestoringProvider = IsRestoringContext.Provider;
;
 //# sourceMappingURL=IsRestoringProvider.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/suspense.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultThrowOnError",
    ()=>defaultThrowOnError,
    "ensureSuspenseTimers",
    ()=>ensureSuspenseTimers,
    "fetchOptimistic",
    ()=>fetchOptimistic,
    "shouldSuspend",
    ()=>shouldSuspend,
    "willFetch",
    ()=>willFetch
]);
// src/suspense.ts
var defaultThrowOnError = (_error, query)=>query.state.data === void 0;
var ensureSuspenseTimers = (defaultedOptions)=>{
    if (defaultedOptions.suspense) {
        const MIN_SUSPENSE_TIME_MS = 1e3;
        const clamp = (value)=>value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
        const originalStaleTime = defaultedOptions.staleTime;
        defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args)=>clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
        if (typeof defaultedOptions.gcTime === "number") {
            defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, MIN_SUSPENSE_TIME_MS);
        }
    }
};
var willFetch = (result, isRestoring)=>result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result)=>defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary)=>observer.fetchOptimistic(defaultedOptions).catch(()=>{
        errorResetBoundary.clearReset();
    });
;
 //# sourceMappingURL=suspense.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseQuery",
    ()=>useBaseQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/useBaseQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/suspense.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function useBaseQuery(options, Observer, queryClient) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (typeof options !== "object" || Array.isArray(options)) {
            throw new Error('Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object');
        }
    }
    const isRestoring = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsRestoring"])();
    const errorResetBoundary = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryErrorResetBoundary"])();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])(queryClient);
    const defaultedOptions = client.defaultQueryOptions(options);
    client.getDefaultOptions().queries?._experimental_beforeQuery?.(defaultedOptions);
    const query = client.getQueryCache().get(defaultedOptions.queryHash);
    if ("TURBOPACK compile-time truthy", 1) {
        if (!defaultedOptions.queryFn) {
            console.error(`[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`);
        }
    }
    defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureSuspenseTimers"])(defaultedOptions);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensurePreventErrorBoundaryRetry"])(defaultedOptions, errorResetBoundary, query);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearResetErrorBoundary"])(errorResetBoundary);
    const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
    const [observer] = __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "useBaseQuery.useState": ()=>new Observer(client, defaultedOptions)
    }["useBaseQuery.useState"]);
    const result = observer.getOptimisticResult(defaultedOptions);
    const shouldSubscribe = !isRestoring && options.subscribed !== false;
    __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"](__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useBaseQuery.useSyncExternalStore.useCallback": (onStoreChange)=>{
            const unsubscribe = shouldSubscribe ? observer.subscribe(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batchCalls(onStoreChange)) : __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
            observer.updateResult();
            return unsubscribe;
        }
    }["useBaseQuery.useSyncExternalStore.useCallback"], [
        observer,
        shouldSubscribe
    ]), {
        "useBaseQuery.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useBaseQuery.useSyncExternalStore"], {
        "useBaseQuery.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useBaseQuery.useSyncExternalStore"]);
    __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useBaseQuery.useEffect": ()=>{
            observer.setOptions(defaultedOptions);
        }
    }["useBaseQuery.useEffect"], [
        defaultedOptions,
        observer
    ]);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldSuspend"])(defaultedOptions, result)) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(defaultedOptions, observer, errorResetBoundary);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHasError"])({
        result,
        errorResetBoundary,
        throwOnError: defaultedOptions.throwOnError,
        query,
        suspense: defaultedOptions.suspense
    })) {
        throw result.error;
    }
    ;
    client.getDefaultOptions().queries?._experimental_afterQuery?.(defaultedOptions, result);
    if (defaultedOptions.experimental_prefetchInRender && !__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServer"] && (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["willFetch"])(result, isRestoring)) {
        const promise = isNewCacheEntry ? // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
        (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(defaultedOptions, observer, errorResetBoundary) : // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
        query?.promise;
        promise?.catch(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]).finally(()=>{
            observer.updateResult();
        });
    }
    return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
;
 //# sourceMappingURL=useBaseQuery.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInfiniteQuery",
    ()=>useInfiniteQuery
]);
// src/useInfiniteQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$infiniteQueryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/infiniteQueryObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [app-client] (ecmascript)");
"use client";
;
;
function useInfiniteQuery(options, queryClient) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseQuery"])(options, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$infiniteQueryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InfiniteQueryObserver"], queryClient);
}
;
 //# sourceMappingURL=useInfiniteQuery.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useQuery",
    ()=>useQuery
]);
// src/useQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [app-client] (ecmascript)");
"use client";
;
;
function useQuery(options, queryClient) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$21_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseQuery"])(options, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$90$2e$20$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryObserver"], queryClient);
}
;
 //# sourceMappingURL=useQuery.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clamp",
    ()=>clamp
]);
const clamp = (min, max, v)=>{
    if (v > max) return max;
    if (v < min) return min;
    return v;
};
;
 //# sourceMappingURL=clamp.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/format-error-message.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatErrorMessage",
    ()=>formatErrorMessage
]);
function formatErrorMessage(message, errorCode) {
    return errorCode ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}` : message;
}
;
 //# sourceMappingURL=format-error-message.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "invariant",
    ()=>invariant,
    "warning",
    ()=>warning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$format$2d$error$2d$message$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/format-error-message.mjs [app-client] (ecmascript)");
;
let warning = ()=>{};
let invariant = ()=>{};
if (typeof __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && ("TURBOPACK compile-time value", "development") !== "production") {
    warning = (check, message, errorCode)=>{
        if (!check && typeof console !== "undefined") {
            console.warn((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$format$2d$error$2d$message$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatErrorMessage"])(message, errorCode));
        }
    };
    invariant = (check, message, errorCode)=>{
        if (!check) {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$format$2d$error$2d$message$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatErrorMessage"])(message, errorCode));
        }
    };
}
;
 //# sourceMappingURL=errors.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/is-numerical-string.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNumericalString",
    ()=>isNumericalString
]);
/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */ const isNumericalString = (v)=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
;
 //# sourceMappingURL=is-numerical-string.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "noop",
    ()=>noop
]);
/*#__NO_SIDE_EFFECTS__*/ const noop = (any)=>any;
;
 //# sourceMappingURL=noop.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionGlobalConfig",
    ()=>MotionGlobalConfig
]);
const MotionGlobalConfig = {};
;
 //# sourceMappingURL=global-config.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/is-zero-value-string.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isZeroValueString",
    ()=>isZeroValueString
]);
/**
 * Check if the value is a zero value string like "0px" or "0%"
 */ const isZeroValueString = (v)=>/^0[^.\s]+$/u.test(v);
;
 //# sourceMappingURL=is-zero-value-string.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/warn-once.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasWarned",
    ()=>hasWarned,
    "warnOnce",
    ()=>warnOnce
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$format$2d$error$2d$message$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/format-error-message.mjs [app-client] (ecmascript)");
;
const warned = new Set();
function hasWarned(message) {
    return warned.has(message);
}
function warnOnce(condition, message, errorCode) {
    if (condition || warned.has(message)) return;
    console.warn((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$format$2d$error$2d$message$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatErrorMessage"])(message, errorCode));
    warned.add(message);
}
;
 //# sourceMappingURL=warn-once.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "millisecondsToSeconds",
    ()=>millisecondsToSeconds,
    "secondsToMilliseconds",
    ()=>secondsToMilliseconds
]);
/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */ /*#__NO_SIDE_EFFECTS__*/ const secondsToMilliseconds = (seconds)=>seconds * 1000;
/*#__NO_SIDE_EFFECTS__*/ const millisecondsToSeconds = (milliseconds)=>milliseconds / 1000;
;
 //# sourceMappingURL=time-conversion.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/array.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addUniqueItem",
    ()=>addUniqueItem,
    "moveItem",
    ()=>moveItem,
    "removeItem",
    ()=>removeItem
]);
function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1) arr.push(item);
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1) arr.splice(index, 1);
}
// Adapted from array-move
function moveItem([...arr], fromIndex, toIndex) {
    const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
    if (startIndex >= 0 && startIndex < arr.length) {
        const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        const [item] = arr.splice(fromIndex, 1);
        arr.splice(endIndex, 0, item);
    }
    return arr;
}
;
 //# sourceMappingURL=array.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/subscription-manager.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubscriptionManager",
    ()=>SubscriptionManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/array.mjs [app-client] (ecmascript)");
;
class SubscriptionManager {
    constructor(){
        this.subscriptions = [];
    }
    add(handler) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addUniqueItem"])(this.subscriptions, handler);
        return ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeItem"])(this.subscriptions, handler);
    }
    notify(a, b, c) {
        const numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions) return;
        if (numSubscriptions === 1) {
            /**
             * If there's only a single handler we can just call it without invoking a loop.
             */ this.subscriptions[0](a, b, c);
        } else {
            for(let i = 0; i < numSubscriptions; i++){
                /**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */ const handler = this.subscriptions[i];
                handler && handler(a, b, c);
            }
        }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}
;
 //# sourceMappingURL=subscription-manager.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/memo.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "memo",
    ()=>memo
]);
/*#__NO_SIDE_EFFECTS__*/ function memo(callback) {
    let result;
    return ()=>{
        if (result === undefined) result = callback();
        return result;
    };
}
;
 //# sourceMappingURL=memo.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBezierDefinition",
    ()=>isBezierDefinition
]);
const isBezierDefinition = (easing)=>Array.isArray(easing) && typeof easing[0] === "number";
;
 //# sourceMappingURL=is-bezier-definition.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/velocity-per-second.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "velocityPerSecond",
    ()=>velocityPerSecond
]);
/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/ function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}
;
 //# sourceMappingURL=velocity-per-second.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/pipe.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pipe",
    ()=>pipe
]);
/**
 * Pipe
 * Compose other transformers to run linearily
 * pipe(min(20), max(40))
 * @param  {...functions} transformers
 * @return {function}
 */ const combineFunctions = (a, b)=>(v)=>b(a(v));
const pipe = (...transformers)=>transformers.reduce(combineFunctions);
;
 //# sourceMappingURL=pipe.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cubicBezier",
    ()=>cubicBezier
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)");
;
/*
  Bezier function generator
  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticeably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.
  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.
  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/ // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t, a1, a2)=>(((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t;
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
        currentT = lowerBound + (upperBound - lowerBound) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - x;
        if (currentX > 0.0) {
            upperBound = currentT;
        } else {
            lowerBound = currentT;
        }
    }while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations)
    return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
    // If this is a linear gradient, return linear easing
    if (mX1 === mY1 && mX2 === mY2) return __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
    const getTForX = (aX)=>binarySubdivide(aX, 0, 1, mX1, mX2);
    // If animation is at start/end, return t without easing
    return (t)=>t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
;
 //# sourceMappingURL=cubic-bezier.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/ease.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "easeIn",
    ()=>easeIn,
    "easeInOut",
    ()=>easeInOut,
    "easeOut",
    ()=>easeOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs [app-client] (ecmascript)");
;
const easeIn = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezier"])(0.42, 0, 1, 1);
const easeOut = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezier"])(0, 0, 0.58, 1);
const easeInOut = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezier"])(0.42, 0, 0.58, 1);
;
 //# sourceMappingURL=ease.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isEasingArray",
    ()=>isEasingArray
]);
const isEasingArray = (ease)=>{
    return Array.isArray(ease) && typeof ease[0] !== "number";
};
;
 //# sourceMappingURL=is-easing-array.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mirrorEasing",
    ()=>mirrorEasing
]);
// Accepts an easing function and returns a new one that outputs mirrored values for
// the second half of the animation. Turns easeIn into easeInOut.
const mirrorEasing = (easing)=>(p)=>p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
;
 //# sourceMappingURL=mirror.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reverseEasing",
    ()=>reverseEasing
]);
// Accepts an easing function and returns a new one that outputs reversed values.
// Turns easeIn into easeOut.
const reverseEasing = (easing)=>(p)=>1 - easing(1 - p);
;
 //# sourceMappingURL=reverse.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/back.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "backIn",
    ()=>backIn,
    "backInOut",
    ()=>backInOut,
    "backOut",
    ()=>backOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$modifiers$2f$mirror$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$modifiers$2f$reverse$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs [app-client] (ecmascript)");
;
;
;
const backOut = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezier"])(0.33, 1.53, 0.69, 0.99);
const backIn = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$modifiers$2f$reverse$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reverseEasing"])(backOut);
const backInOut = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$modifiers$2f$mirror$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mirrorEasing"])(backIn);
;
 //# sourceMappingURL=back.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/anticipate.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "anticipate",
    ()=>anticipate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/back.mjs [app-client] (ecmascript)");
;
const anticipate = (p)=>(p *= 2) < 1 ? 0.5 * (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["backIn"])(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
;
 //# sourceMappingURL=anticipate.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/circ.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "circIn",
    ()=>circIn,
    "circInOut",
    ()=>circInOut,
    "circOut",
    ()=>circOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$modifiers$2f$mirror$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$modifiers$2f$reverse$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs [app-client] (ecmascript)");
;
;
const circIn = (p)=>1 - Math.sin(Math.acos(p));
const circOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$modifiers$2f$reverse$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reverseEasing"])(circIn);
const circInOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$modifiers$2f$mirror$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mirrorEasing"])(circIn);
;
 //# sourceMappingURL=circ.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/utils/map.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "easingDefinitionToFunction",
    ()=>easingDefinitionToFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$anticipate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/anticipate.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/back.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/circ.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$ease$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/ease.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const easingLookup = {
    linear: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"],
    easeIn: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$ease$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeIn"],
    easeInOut: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$ease$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeInOut"],
    easeOut: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$ease$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeOut"],
    circIn: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["circIn"],
    circInOut: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["circInOut"],
    circOut: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["circOut"],
    backIn: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["backIn"],
    backInOut: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["backInOut"],
    backOut: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["backOut"],
    anticipate: __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$anticipate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anticipate"]
};
const isValidEasing = (easing)=>{
    return typeof easing === "string";
};
const easingDefinitionToFunction = (definition)=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBezierDefinition"])(definition)) {
        // If cubic bezier definition, create bezier curve
        (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
        const [x1, y1, x2, y2] = definition;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezier"])(x1, y1, x2, y2);
    } else if (isValidEasing(definition)) {
        // Else lookup from table
        (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(easingLookup[definition] !== undefined, `Invalid easing type '${definition}'`, "invalid-easing-type");
        return easingLookup[definition];
    }
    return definition;
};
;
 //# sourceMappingURL=map.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/progress.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "progress",
    ()=>progress
]);
/*
  Progress within given range

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.

  @param [number]: Lower limit
  @param [number]: Upper limit
  @param [number]: Value to find progress within given range
  @return [number]: Progress of value within range as expressed 0-1
*/ /*#__NO_SIDE_EFFECTS__*/ const progress = (from, to, value)=>{
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
;
 //# sourceMappingURL=progress.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/is-object.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isObject",
    ()=>isObject
]);
function isObject(value) {
    return typeof value === "object" && value !== null;
}
;
 //# sourceMappingURL=is-object.mjs.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$megabets$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/.openclaw/workspace/megabets/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
]);

//# sourceMappingURL=a6365__pnpm_c5acd2fd._.js.map