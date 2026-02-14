module.exports=[328173,a=>{"use strict";var b=a.i(352844),c=a.i(126520),d=a.i(382795),e=a.i(194712),f=a.i(30960),g=a.i(184869),h=a.i(42783),i=a.i(847920);let j=({label:a,children:c,valueStyles:d})=>(0,b.jsxs)(k,{children:[(0,b.jsx)("div",{children:a}),(0,b.jsx)(l,{style:{...d},children:c})]}),k=c.styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > :first-child {
    color: var(--privy-color-foreground-3);
    text-align: left;
  }

  > :last-child {
    color: var(--privy-color-foreground-2);
    text-align: right;
  }
`,l=c.styled.div`
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--privy-border-radius-full);
  background-color: var(--privy-color-background-2);
  padding: 4px 8px;
`,m=({gas:a,tokenPrice:c,tokenSymbol:g})=>(0,b.jsxs)(f.F,{style:{paddingBottom:"12px"},children:[(0,b.jsxs)(o,{children:[(0,b.jsx)(q,{children:"Est. Fees"}),(0,b.jsx)("div",{children:(0,b.jsx)(d.P,{weiQuantities:[BigInt(a)],tokenPrice:c,tokenSymbol:g})})]}),c&&(0,b.jsx)(p,{children:`${(0,e.g)(BigInt(a),g)}`})]}),n=({value:a,gas:c,tokenPrice:g,tokenSymbol:h})=>{let i=BigInt(a??0)+BigInt(c);return(0,b.jsxs)(f.F,{children:[(0,b.jsxs)(o,{children:[(0,b.jsx)(q,{children:"Total (including fees)"}),(0,b.jsx)("div",{children:(0,b.jsx)(d.P,{weiQuantities:[BigInt(a||0),BigInt(c)],tokenPrice:g,tokenSymbol:h})})]}),g&&(0,b.jsx)(p,{children:(0,e.g)(i,h)})]})},o=c.styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 4px;
`,p=c.styled.div`
  display: flex;
  flex-direction: row;
  height: 12px;

  font-size: 12px;
  line-height: 12px;
  color: var(--privy-color-foreground-3);
  font-weight: 400;
`,q=c.styled.div`
  font-size: 14px;
  line-height: 22.4px;
  font-weight: 400;
`,r=(0,h.createContext)(void 0),s=(0,h.createContext)(void 0),t=({defaultValue:a,children:c})=>{let[d,e]=(0,h.useState)(a||null);return(0,b.jsx)(r.Provider,{value:{activePanel:d,togglePanel:a=>{e(d===a?null:a)}},children:(0,b.jsx)(y,{children:c})})},u=({value:a,children:c})=>{let{activePanel:d,togglePanel:e}=(0,h.useContext)(r),f=d===a;return(0,b.jsx)(s.Provider,{value:{onToggle:()=>e(a),value:a},children:(0,b.jsx)(C,{isActive:f?"true":"false","data-open":String(f),children:c})})},v=({children:a})=>{let{activePanel:c}=(0,h.useContext)(r),{onToggle:d,value:e}=(0,h.useContext)(s),f=c===e;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(z,{onClick:d,"data-open":String(f),children:[(0,b.jsx)(B,{children:a}),(0,b.jsx)(F,{isactive:f?"true":"false",children:(0,b.jsx)(g.default,{height:"16px",width:"16px",strokeWidth:"2"})})]}),(0,b.jsx)(A,{})]})},w=({children:a})=>{let{activePanel:c}=(0,h.useContext)(r),{value:d}=(0,h.useContext)(s);return(0,b.jsx)(D,{"data-open":String(c===d),children:(0,b.jsx)(E,{children:a})})},x=({children:a})=>{let{activePanel:c}=(0,h.useContext)(r),{value:d}=(0,h.useContext)(s);return(0,b.jsx)(E,{children:"function"==typeof a?a({isActive:c===d}):a})},y=c.styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`,z=c.styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding-bottom: 8px;
`,A=c.styled.div`
  width: 100%;

  && {
    border-top: 1px solid;
    border-color: var(--privy-color-foreground-4);
  }
  padding-bottom: 12px;
`,B=c.styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 19.6px;
  width: 100%;
  padding-right: 8px;
`,C=c.styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  padding: 12px;

  && {
    border: 1px solid;
    border-color: var(--privy-color-foreground-4);
    border-radius: var(--privy-border-radius-md);
  }
`,D=c.styled.div`
  position: relative;
  overflow: hidden;
  transition: max-height 25ms ease-out;

  &[data-open='true'] {
    max-height: 700px;
  }

  &[data-open='false'] {
    max-height: 0;
  }
`,E=c.styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 auto;
  min-height: 1px;
`,F=c.styled.div`
  transform: ${a=>"true"===a.isactive?"rotate(180deg)":"rotate(0deg)"};
`,G=({from:a,to:c,txn:e,transactionInfo:f,tokenPrice:g,gas:h,tokenSymbol:k})=>{let l=BigInt(e?.value||0);return(0,b.jsx)(t,{...(0,i.u)().render.standalone?{defaultValue:"details"}:{},children:(0,b.jsxs)(u,{value:"details",children:[(0,b.jsx)(v,{children:(0,b.jsxs)(H,{children:[(0,b.jsx)("div",{children:f?.title||"Details"}),(0,b.jsx)(I,{children:(0,b.jsx)(d.H,{weiQuantities:[l],tokenPrice:g,tokenSymbol:k})})]})}),(0,b.jsxs)(w,{children:[(0,b.jsx)(j,{label:"From",children:(0,b.jsx)(d.W,{walletAddress:a,chainId:e.chainId||i.s,chainType:"ethereum"})}),(0,b.jsx)(j,{label:"To",children:(0,b.jsx)(d.W,{walletAddress:c,chainId:e.chainId||i.s,chainType:"ethereum"})}),f&&f.action&&(0,b.jsx)(j,{label:"Action",children:f.action}),h&&(0,b.jsx)(m,{value:e.value,gas:h,tokenPrice:g,tokenSymbol:k})]}),(0,b.jsx)(x,{children:({isActive:a})=>(0,b.jsx)(n,{value:e.value,displayFee:a,gas:h||"0x0",tokenPrice:g,tokenSymbol:k})})]})})},H=c.styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,I=c.styled.div`
  flex-shrink: 0;
  padding-left: 8px;
`;a.s(["T",()=>G])},382795,a=>{"use strict";var b=a.i(352844),c=a.i(126520),d=a.i(926936),e=a.i(194712),f=a.i(398962),g=a.i(825709),h=a.i(400863);let i=({weiQuantities:a,tokenPrice:c,tokenSymbol:d})=>{let f=(0,e.s)(a),g=c?(0,e.a)(f,c):void 0,h=(0,e.g)(f,d);return(0,b.jsx)(l,{children:g||h})},j=({weiQuantities:a,tokenPrice:c,tokenSymbol:d})=>{let f=(0,e.s)(a),g=c?(0,e.a)(f,c):void 0,h=(0,e.g)(f,d);return(0,b.jsx)(l,{children:g?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(m,{children:"USD"}),"<$0.01"===g?(0,b.jsxs)(o,{children:[(0,b.jsx)(n,{children:"<"}),"$0.01"]}):g]}):h})},k=({quantities:a,tokenPrice:c,tokenSymbol:e="SOL",tokenDecimals:h=9})=>{let i=a.reduce((a,b)=>a+b,0n),j=c&&"SOL"===e&&9===h?(0,f.g)(i,c):void 0,k="SOL"===e&&9===h?(0,g.g)(i):`${(0,d.formatUnits)(i,h)} ${e}`;return(0,b.jsx)(l,{children:j?(0,b.jsx)(b.Fragment,{children:"<$0.01"===j?(0,b.jsxs)(o,{children:[(0,b.jsx)(n,{children:"<"}),"$0.01"]}):j}):k})},l=c.styled.span`
  font-size: 14px;
  line-height: 140%;
  display: flex;
  gap: 4px;
  align-items: center;
`,m=c.styled.span`
  font-size: 12px;
  line-height: 12px;
  color: var(--privy-color-foreground-3);
`,n=c.styled.span`
  font-size: 10px;
`,o=c.styled.span`
  display: flex;
  align-items: center;
`,p=a=>{var c,d;return(0,b.jsx)(q,{href:"ethereum"===a.chainType?(0,e.b)(a.chainId,a.walletAddress):(c=a.walletAddress,d=a.chainId,`https://explorer.solana.com/account/${c}?chain=${d}`),target:"_blank",children:(0,h.D)(a.walletAddress)})},q=c.styled.a`
  &:hover {
    text-decoration: underline;
  }
`;a.s(["H",()=>i,"P",()=>j,"S",()=>k,"W",()=>p])},459177,703295,a=>{"use strict";var b=a.i(42783),c=a.i(144505);function d(a){let b=a.filter(a=>!c.DEFAULT_SUPPORTED_CHAIN_IDS.has(a.id));return c.DEFAULT_SUPPORTED_CHAINS.concat(b)}a.s(["addToDefaultChains",()=>d],703295);var e=a.i(847920),f=a.i(375761),g=a.i(689722);function h(a){let{tokenPrice:c,isTokenPriceLoading:h,tokenPriceError:i}=(a=>{let{showFiatPrices:c,getUsdTokenPrice:g,chains:h}=(0,f.u)(),[i,j]=(0,b.useState)(!0),[k,l]=(0,b.useState)(void 0),[m,n]=(0,b.useState)(void 0);return(0,b.useEffect)(()=>{a||=e.s;let b=d(h).find(b=>b.id===Number(a));(async()=>{if(c){if(!b)return j(!1),l(Error(`Unable to fetch token price on chain id ${a}`));try{j(!0);let a=await g(b);a?n(a):l(Error(`Unable to fetch token price on chain id ${b.id}`))}catch(a){l(a)}finally{j(!1)}}else j(!1)})()},[a]),{tokenPrice:m,isTokenPriceLoading:i,tokenPriceError:k}})("solana"===a?-1:a),{solPrice:j,isSolPriceLoading:k,solPriceError:l}=(0,g.u)({enabled:"solana"===a});return"solana"===a?{tokenPrice:j,isTokenPriceLoading:k,tokenPriceError:l}:{tokenPrice:c,isTokenPriceLoading:h,tokenPriceError:i}}a.s(["u",()=>h],459177)},30960,a=>{"use strict";var b=a.i(126520);let c=b.styled.div`
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
`,a.s(["B",()=>c,"C",()=>f,"F",()=>h,"H",()=>e,"R",()=>l,"S",()=>j,"a",()=>i,"b",()=>k,"c",()=>g,"d",()=>m,"e",()=>d])},689722,a=>{"use strict";var b=a.i(42783),c=a.i(375761);let d=({enabled:a=!0}={})=>{let{showFiatPrices:d,getUsdPriceForSol:e}=(0,c.u)(),[f,g]=(0,b.useState)(!0),[h,i]=(0,b.useState)(void 0),[j,k]=(0,b.useState)(void 0);return(0,b.useEffect)(()=>{(async()=>{if(d&&a)try{g(!0);let a=await e();a?k(a):i(Error("Unable to fetch SOL price"))}catch(a){i(a)}finally{g(!1)}else g(!1)})()},[]),{solPrice:j,isSolPriceLoading:f,solPriceError:h}};a.s(["u",()=>d])},194712,a=>{"use strict";var b=a.i(112168),c=a.i(375761),d=a.i(400863);let e=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2}),f=(a,b)=>{let c,d=(c=b*parseFloat(a),e.format(c));return"$0.00"!==d?d:"<$0.01"},g=(a,c)=>{let d,f=(d=c*parseFloat((0,b.formatEther)(a)),e.format(d));return"$0.00"===f?"<$0.01":f},h=(a,b,c=6,d=!1)=>`${i(a,c,d)} ${b}`,i=(a,c=6,d=!1)=>{let e=parseFloat((0,b.formatEther)(a)).toFixed(c).replace(/0+$/,"").replace(/\.$/,"");return d?e:`${"0"===e?"<0.001":e}`},j=a=>a.reduce((a,b)=>a+b,0n),k=(a,b)=>{let{chains:e}=(0,c.u)(),f=`https://etherscan.io/address/${b}`,g=`${(0,d.a5)(a,e)}/address/${b}`;try{new URL(g)}catch{return f}return g};a.s(["a",()=>g,"b",()=>k,"c",()=>f,"g",()=>h,"p",()=>i,"s",()=>j])},184869,a=>{"use strict";var b=a.i(42783);let c=b.forwardRef(function({title:a,titleId:c,...d},e){return b.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":c},d),a?b.createElement("title",{id:c},a):null,b.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"}))});a.s(["default",0,c])},398962,a=>{"use strict";let b=["CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C","CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"],c=["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"],d={"solana:mainnet":{EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:{symbol:"USDC",decimals:6,address:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB:{symbol:"USDT",decimals:6,address:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:devnet":{"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU":{symbol:"USDC",decimals:6,address:"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"},EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS:{symbol:"USDT",decimals:6,address:"EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:testnet":{}};function e(a,b){let c=parseFloat(a.toString())/1e9,d=f.format(b*c);return"$0.00"===d?"<$0.01":d}let f=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2});a.s(["A",()=>"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL","D",()=>d,"J",()=>c,"L",()=>1e9,"R",()=>b,"S",()=>"11111111111111111111111111111111","T",()=>"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA","a",()=>"TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb","g",()=>e])},825709,a=>{"use strict";var b=a.i(398962);function c(a,b=6,d=!1,e=!1){let f=(parseFloat(a.toString())/1e9).toFixed(b).replace(/0+$/,"").replace(/\.$/,""),g=e?"":" SOL";return d?`${f}${g}`:`${"0"===f?"<0.001":f}${g}`}function d({amount:a,fee:d,tokenPrice:e,isUsdc:f}){let g=BigInt(Math.floor(parseFloat(a)*10**(f?6:9))),h=f?g:g+d;return{fundingAmountInBaseUnit:g,fundingAmountInUsd:e?(0,b.g)(g,e):void 0,totalPriceInUsd:e?(0,b.g)(h,e):void 0,totalPriceInNativeCurrency:c(h),feePriceInNativeCurrency:c(d),feePriceInUsd:e?(0,b.g)(d,e):void 0}}a.s(["a",()=>d,"g",()=>c])}];

//# sourceMappingURL=a6365__pnpm_e049c235._.js.map