module.exports=[452475,a=>{"use strict";var b=a.i(352844),c=a.i(126520);let d=({size:a,centerIcon:c})=>(0,b.jsx)(e,{$size:a,children:(0,b.jsxs)(f,{children:[(0,b.jsx)(h,{}),(0,b.jsx)(i,{}),c?(0,b.jsx)(g,{children:c}):null]})}),e=c.styled.div`
  --spinner-size: ${a=>a.$size?a.$size:"96px"};

  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media all and (display-mode: standalone) {
    margin-bottom: 30px;
  }
`,f=c.styled.div`
  position: relative;
  height: var(--spinner-size);
  width: var(--spinner-size);

  opacity: 1;
  animation: fadein 200ms ease;
`,g=c.styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  svg,
  img {
    width: calc(var(--spinner-size) * 0.4);
    height: calc(var(--spinner-size) * 0.4);
    border-radius: var(--privy-border-radius-full);
  }
`,h=c.styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: var(--spinner-size);
  height: var(--spinner-size);

  && {
    border: 4px solid var(--privy-color-border-default);
    border-radius: 50%;
  }
`,i=c.styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: var(--spinner-size);
  height: var(--spinner-size);
  animation: spin 1200ms linear infinite;

  && {
    border: 4px solid;
    border-color: var(--privy-color-icon-subtle) transparent transparent transparent;
    border-radius: 50%;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;a.s(["N",()=>d])},398962,a=>{"use strict";let b=["CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C","CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"],c=["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"],d={"solana:mainnet":{EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:{symbol:"USDC",decimals:6,address:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB:{symbol:"USDT",decimals:6,address:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:devnet":{"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU":{symbol:"USDC",decimals:6,address:"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"},EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS:{symbol:"USDT",decimals:6,address:"EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:testnet":{}};function e(a,b){let c=parseFloat(a.toString())/1e9,d=f.format(b*c);return"$0.00"===d?"<$0.01":d}let f=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2});a.s(["A",()=>"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL","D",()=>d,"J",()=>c,"L",()=>1e9,"R",()=>b,"S",()=>"11111111111111111111111111111111","T",()=>"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA","a",()=>"TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb","g",()=>e])},30960,a=>{"use strict";var b=a.i(126520);let c=b.styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: auto;
  gap: 16px;
  flex-grow: 100;
`,d=b.styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`,e=b.styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,f=(0,b.styled)(d)`
  padding: 20px 0;
`,g=(0,b.styled)(d)`
  gap: 16px;
`,h=b.styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,i=b.styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;b.styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;let j=b.styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  gap: 8px;
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
  background: var(--privy-color-background-2);
  border-radius: var(--privy-border-radius-md);
  && h4 {
    color: var(--privy-color-foreground-3);
    font-size: 14px;
    text-decoration: underline;
    font-weight: medium;
  }
  && p {
    color: var(--privy-color-foreground-3);
    font-size: 14px;
  }
`,k=b.styled.div`
  height: 16px;
`,l=b.styled.div`
  height: 12px;
`;b.styled.div`
  position: relative;
`;let m=b.styled.div`
  height: ${a=>a.height??"12"}px;
`;b.styled.div`
  background-color: var(--privy-color-accent);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-color: white;
  border-width: 2px !important;
`,a.s(["B",()=>c,"C",()=>f,"F",()=>h,"H",()=>e,"R",()=>l,"S",()=>j,"a",()=>i,"b",()=>k,"c",()=>g,"d",()=>m,"e",()=>d])},689722,a=>{"use strict";var b=a.i(42783),c=a.i(375761);let d=({enabled:a=!0}={})=>{let{showFiatPrices:d,getUsdPriceForSol:e}=(0,c.u)(),[f,g]=(0,b.useState)(!0),[h,i]=(0,b.useState)(void 0),[j,k]=(0,b.useState)(void 0);return(0,b.useEffect)(()=>{(async()=>{if(d&&a)try{g(!0);let a=await e();a?k(a):i(Error("Unable to fetch SOL price"))}catch(a){i(a)}finally{g(!1)}else g(!1)})()},[]),{solPrice:j,isSolPriceLoading:f,solPriceError:h}};a.s(["u",()=>d])},459177,703295,a=>{"use strict";var b=a.i(42783),c=a.i(144505);function d(a){let b=a.filter(a=>!c.DEFAULT_SUPPORTED_CHAIN_IDS.has(a.id));return c.DEFAULT_SUPPORTED_CHAINS.concat(b)}a.s(["addToDefaultChains",()=>d],703295);var e=a.i(847920),f=a.i(375761),g=a.i(689722);function h(a){let{tokenPrice:c,isTokenPriceLoading:h,tokenPriceError:i}=(a=>{let{showFiatPrices:c,getUsdTokenPrice:g,chains:h}=(0,f.u)(),[i,j]=(0,b.useState)(!0),[k,l]=(0,b.useState)(void 0),[m,n]=(0,b.useState)(void 0);return(0,b.useEffect)(()=>{a||=e.s;let b=d(h).find(b=>b.id===Number(a));(async()=>{if(c){if(!b)return j(!1),l(Error(`Unable to fetch token price on chain id ${a}`));try{j(!0);let a=await g(b);a?n(a):l(Error(`Unable to fetch token price on chain id ${b.id}`))}catch(a){l(a)}finally{j(!1)}}else j(!1)})()},[a]),{tokenPrice:m,isTokenPriceLoading:i,tokenPriceError:k}})("solana"===a?-1:a),{solPrice:j,isSolPriceLoading:k,solPriceError:l}=(0,g.u)({enabled:"solana"===a});return"solana"===a?{tokenPrice:j,isTokenPriceLoading:k,tokenPriceError:l}:{tokenPrice:c,isTokenPriceLoading:h,tokenPriceError:i}}a.s(["u",()=>h],459177)},663281,a=>{"use strict";var b=a.i(126520);let c=b.keyframes`
  from, to {
    background: var(--privy-color-foreground-4);
    color: var(--privy-color-foreground-4);
  }

  50% {
    background: var(--privy-color-foreground-accent);
    color: var(--privy-color-foreground-accent);
  }
`,d=b.css`
  ${a=>a.$isLoading?b.css`
          width: 35%;
          animation: ${c} 2s linear infinite;
          border-radius: var(--privy-border-radius-sm);
        `:""}
`;a.s(["L",()=>d])},273932,a=>{"use strict";var b=a.i(42783);let c=b.forwardRef(function({title:a,titleId:c,...d},e){return b.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":c},d),a?b.createElement("title",{id:c},a):null,b.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))});a.s(["default",0,c])},567087,a=>{"use strict";var b=a.i(112168),c=a.i(926936);function d(a){return a?`${a.slice(0,5)}…${a.slice(-4)}`:""}function e({wei:a,precision:c=3}){return parseFloat((0,b.formatEther)(a)).toFixed(c).replace(/0+$/,"").replace(/\.$/,"")}function f({amount:a,decimals:b}){return(0,c.formatUnits)(BigInt(a),b)}a.s(["formatTokenAmount",()=>f,"formatWalletAddress",()=>d,"formatWeiAmount",()=>e])},3785,a=>{"use strict";var b=a.i(352844),c=a.i(126520);let d=({title:a,description:c,children:d,...e})=>(0,b.jsx)(f,{...e,children:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("h3",{children:a}),"string"==typeof c?(0,b.jsx)("p",{children:c}):c,d]})});(0,c.styled)(d)`
  margin-bottom: 24px;
`;let e=({title:a,description:c,icon:d,children:e,...f})=>(0,b.jsxs)(g,{...f,children:[d||null,(0,b.jsx)("h3",{children:a}),c&&"string"==typeof c?(0,b.jsx)("p",{children:c}):c,e]}),f=c.styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;

  && h3 {
    font-size: 17px;
    color: var(--privy-color-foreground);
  }

  /* Sugar assuming children are paragraphs. Otherwise, handling styling on your own */
  && p {
    color: var(--privy-color-foreground-2);
    font-size: 14px;
  }
`,g=(0,c.styled)(f)`
  align-items: center;
  text-align: center;
  gap: 16px;

  h3 {
    margin-bottom: 24px;
  }
`;a.s(["C",()=>e,"S",()=>d])},813450,a=>{"use strict";var b=a.i(126520),c=a.i(663281);let d=b.styled.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */
`,e=(0,b.styled)(d)`
  color: var(--privy-color-accent);
`,f=b.styled.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.375rem; /* 157.143% */
  word-break: break-all;
  text-align: right;

  ${c.L}
`;a.s(["L",()=>d,"V",()=>f,"a",()=>e])},558449,a=>{"use strict";var b=a.i(126520);let c=b.styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
`,d=b.styled.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 0.5rem;
`;a.s(["R",()=>d,"a",()=>c])},702819,a=>{"use strict";function b(a){switch(a){case"solana:mainnet":return"Solana";case"solana:devnet":return"Devnet";case"solana:testnet":return"Testnet"}}a.s(["g",()=>b])},17963,a=>{"use strict";a.s(["O",()=>"sdk_fiat_on_ramp_completed_with_status"])},580254,a=>{"use strict";var b=a.i(352844),c=a.i(487536),d=a.i(463080);function e({title:a}){let{currentScreen:e,navigateBack:f,navigate:g,data:h,setModalData:i}=(0,c.a)();return(0,b.jsx)(d.M,{title:a,backFn:"ManualTransferScreen"===e?f:e===h?.funding?.methodScreen?h.funding.comingFromSendTransactionScreen?()=>g("SendTransactionScreen"):void 0:h?.funding?.methodScreen?()=>{let a=h.funding;a.usingDefaultFundingMethod&&(a.usingDefaultFundingMethod=!1),i({funding:a,solanaFundingData:h?.solanaFundingData}),g(a.methodScreen)}:void 0})}a.s(["t",()=>e])},842970,a=>{"use strict";var b=a.i(42783);let c=b.forwardRef(function({title:a,titleId:c,...d},e){return b.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":c},d),a?b.createElement("title",{id:c},a):null,b.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"}))});a.s(["default",0,c])},23400,a=>{"use strict";var b=a.i(352844),c=a.i(842970);let d=({icon:a,name:d})=>"string"==typeof a?(0,b.jsx)("img",{alt:`${d||"wallet"} logo`,src:a,style:{height:24,width:24,borderRadius:4}}):void 0===a?(0,b.jsx)(c.default,{style:{height:24,width:24}}):a?(0,b.jsx)(a,{style:{height:24,width:24}}):null;a.s(["I",()=>d])},597735,a=>{"use strict";var b=a.i(398962);function c(a){let[c]=Object.entries(b.D[a]).find(([a,b])=>"USDC"===b.symbol)??[];return c}a.s(["g",()=>c])},130710,a=>{"use strict";var b=a.i(832259),c=a.i(839435),d=a.i(42783),e=a.i(847920),f=a.i(375761);function g(a){return new Uint8Array((0,b.getTransactionDecoder)().decode(a).messageBytes)}async function h({solanaClient:a,tx:b}){let d=(0,c.getBase64Decoder)().decode(g(b)),{value:e}=await a.rpc.getFeeForMessage(d).send();return e??0n}async function i({solanaClient:a,tx:b,replaceRecentBlockhash:d}){let{value:e}=await a.rpc.simulateTransaction((0,c.getBase64Decoder)().decode(b),{commitment:"confirmed",encoding:"base64",sigVerify:!1,replaceRecentBlockhash:d}).send();if("BlockhashNotFound"===e.err&&d)throw Error("Simulation failed: Blockhash not found");return"BlockhashNotFound"===e.err?await i({solanaClient:a,tx:b,replaceRecentBlockhash:!0}):{logs:e.logs??[],error:e.err,hasError:!!e.err,hasFunds:e.logs?.every(a=>!/insufficient funds/gi.test(a)&&!/insufficient lamports/gi.test(a))??!0}}let j=(...a)=>{if("u"<typeof Buffer)throw new f.a("Buffer is not defined.",void 0,f.b.BUFFER_NOT_DEFINED);return Buffer.from(...a)};async function k({rpcSubscriptions:a,signature:b,timeout:c}){let d=new AbortController,e=await a.signatureNotifications(b,{commitment:"confirmed"}).subscribe({abortSignal:d.signal}),f=await Promise.race([new Promise(a=>{setTimeout(()=>{d.abort(),a(Error("Transaction confirmation timed out"))},c)}),new Promise(async a=>{for await(let b of e){if(d.abort(),b.value.err)return a(Error("Transaction confirmation failed"));a(void 0)}})]);if(f instanceof Error)throw f}function l(){let a=(0,e.u)(),b=(0,d.useMemo)(()=>Object.fromEntries(["solana:mainnet","solana:devnet","solana:testnet"].map(b=>[b,a.solanaRpcs[b]?function({rpc:a,rpcSubscriptions:b,chain:d,blockExplorerUrl:e}){let f=function({rpc:a,rpcSubscriptions:b}){return async d=>new Promise(async(e,f)=>{try{let f=await a.sendTransaction(j(d).toString("base64"),{preflightCommitment:"confirmed",encoding:"base64"}).send();await k({rpcSubscriptions:b,signature:f,timeout:1e4}),e({signature:new Uint8Array((0,c.getBase58Encoder)().encode(f))})}catch(a){f(a)}})}({rpc:a,rpcSubscriptions:b});return{rpc:a,rpcSubscriptions:b,chain:d,blockExplorerUrl:e,sendAndConfirmTransaction:f}}({chain:b,rpc:a.solanaRpcs[b].rpc,rpcSubscriptions:a.solanaRpcs[b].rpcSubscriptions,blockExplorerUrl:a.solanaRpcs[b].blockExplorerUrl??`https://explorer.solana.com?cluster=${b.replace("solana:","")}`}):null])),[a.solanaRpcs]);return(0,d.useCallback)(a=>{if(!b[a])throw Error(`No RPC configuration found for chain ${a}`);return b[a]},[b])}a.s(["a",()=>g,"b",()=>j,"f",()=>h,"s",()=>i,"u",()=>l,"w",()=>k])}];

//# sourceMappingURL=a6365__pnpm_563cdb68._.js.map