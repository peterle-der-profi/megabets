module.exports=[30960,a=>{"use strict";var b=a.i(126520);let c=b.styled.div`
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
`,a.s(["B",()=>c,"C",()=>f,"F",()=>h,"H",()=>e,"R",()=>l,"S",()=>j,"a",()=>i,"b",()=>k,"c",()=>g,"d",()=>m,"e",()=>d])},124649,a=>{"use strict";let b=(0,a.i(489252).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);a.s(["Copy",()=>b],124649)},374855,a=>{"use strict";var b=a.i(352844),c=a.i(337020),d=a.i(124649),e=a.i(42783),f=a.i(126520),g=a.i(400863),h=a.i(463080);let i=({address:a,showCopyIcon:f,url:i,className:m})=>{let[n,o]=(0,e.useState)(!1);function p(b){b.stopPropagation(),navigator.clipboard.writeText(a).then(()=>o(!0)).catch(console.error)}return(0,e.useEffect)(()=>{if(n){let a=setTimeout(()=>o(!1),3e3);return()=>clearTimeout(a)}},[n]),(0,b.jsxs)(j,i?{children:[(0,b.jsx)(l,{title:a,className:m,href:`${i}/address/${a}`,target:"_blank",children:(0,g.D)(a)}),f&&(0,b.jsx)(h.S,{onClick:p,size:"sm",style:{gap:"0.375rem"},children:(0,b.jsxs)(b.Fragment,n?{children:["Copied",(0,b.jsx)(c.Check,{size:16})]}:{children:["Copy",(0,b.jsx)(d.Copy,{size:16})]})})]}:{children:[(0,b.jsx)(k,{title:a,className:m,children:(0,g.D)(a)}),f&&(0,b.jsx)(h.S,{onClick:p,size:"sm",style:{gap:"0.375rem",fontSize:"14px"},children:(0,b.jsxs)(b.Fragment,n?{children:["Copied",(0,b.jsx)(c.Check,{size:14})]}:{children:["Copy",(0,b.jsx)(d.Copy,{size:14})]})})]})},j=f.styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`,k=f.styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,l=f.styled.a`
  font-size: 14px;
  color: var(--privy-color-foreground);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;a.s(["A",()=>i])},452475,a=>{"use strict";var b=a.i(352844),c=a.i(126520);let d=({size:a,centerIcon:c})=>(0,b.jsx)(e,{$size:a,children:(0,b.jsxs)(f,{children:[(0,b.jsx)(h,{}),(0,b.jsx)(i,{}),c?(0,b.jsx)(g,{children:c}):null]})}),e=c.styled.div`
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
`;a.s(["N",()=>d])},489252,a=>{"use strict";var b=a.i(42783);let c=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},d=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var e={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let f=(0,b.forwardRef)(({color:a="currentColor",size:c=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...e,width:c,height:c,stroke:a,strokeWidth:g?24*Number(f)/Number(c):f,className:d("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),g=(a,e)=>{let g=(0,b.forwardRef)(({className:g,...h},i)=>(0,b.createElement)(f,{ref:i,iconNode:e,className:d(`lucide-${c(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,g),...h}));return g.displayName=c(a),g};a.s(["default",()=>g],489252)},337020,a=>{"use strict";let b=(0,a.i(489252).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);a.s(["Check",()=>b],337020)},663281,a=>{"use strict";var b=a.i(126520);let c=b.keyframes`
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
`;a.s(["L",()=>d])},299776,a=>{"use strict";var b=a.i(42783),c=a.i(375761);let d="0x0000000000000000000000000000000000000000",e=({appId:a,originCurrency:b,destinationCurrency:c,...e})=>({tradeType:"EXPECTED_OUTPUT",originCurrency:b??d,destinationCurrency:c??d,referrer:`privy|${a}`,...e}),f="https://api.relay.link",g="https://api.testnets.relay.link",h=async({input:a,isTestnet:b})=>{let c=await fetch((b?g:f)+"/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),d=await c.json();if(!(c.ok||"string"==typeof d.message&&d.message.startsWith("Invalid address")))throw console.error("Relay error:",d),Error(d.message??"Error fetching quote from relay");return d},i=a=>{let b=a.steps[0]?.items?.[0];if(b)return{from:b.data.from,to:b.data.to,value:Number(b.data.value),chainId:Number(b.data.chainId),data:b.data.data}};async function j({transactionHash:a,isTestnet:b}){let c=await fetch((b?g:f)+"/requests/v2?hash="+a),d=await c.json();if(!c.ok){if("message"in d&&"string"==typeof d.message)throw Error(d.message);throw Error("Error fetching request from relay")}return d.requests.at(0)?.status??"pending"}function k({transactionHash:a,isTestnet:c,bridgingStatus:d,setBridgingStatus:e,onSuccess:f,onFailure:g}){(0,b.useEffect)(()=>{if(a&&d){if(["delayed","waiting","pending"].includes(d)){let b=setInterval(async()=>{try{let b=await j({transactionHash:a,isTestnet:c});e(b)}catch(a){console.error(a)}},1e3);return()=>clearInterval(b)}"success"===d?f({transactionHash:a}):["refund","failure"].includes(d)&&g({error:new l(a,c)})}},[d,a,c])}class l extends c.a{constructor(a,b){super("We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",void 0,c.b.TRANSACTION_FAILURE),this.relayLink=b?`https://testnets.relay.link/transaction/${a}`:`https://relay.link/transaction/${a}`}}a.s(["R",()=>l,"a",()=>"11111111111111111111111111111111","b",()=>0x2f3fb341,"c",()=>i,"d",()=>"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v","g",()=>h,"t",()=>e,"u",()=>k])},142093,475761,a=>{"use strict";var b=a.i(53043);class c extends b.BaseError{constructor({value:a}){super(`Number \`${a}\` is not a valid decimal number.`,{name:"InvalidDecimalNumberError"})}}function d(a,b){if(!/^(-?)([0-9]*)\.?([0-9]*)$/.test(a))throw new c({value:a});let[d,e="0"]=a.split("."),f=d.startsWith("-");if(f&&(d=d.slice(1)),e=e.replace(/(0+)$/,""),0===b)1===Math.round(Number(`.${e}`))&&(d=`${BigInt(d)+1n}`),e="";else if(e.length>b){let[a,c,f]=[e.slice(0,b-1),e.slice(b-1,b),e.slice(b)],g=Math.round(Number(`${c}.${f}`));(e=g>9?`${BigInt(a)+BigInt(1)}0`.padStart(a.length+1,"0"):`${a}${g}`).length>b&&(e=e.slice(1),d=`${BigInt(d)+1n}`),e=e.slice(0,b)}else e=e.padEnd(b,"0");return BigInt(`${f?"-":""}${d}${e}`)}a.s(["InvalidDecimalNumberError",()=>c],475761),a.s(["parseUnits",()=>d],142093)},573334,a=>{"use strict";var b=a.i(572497),c=a.i(142093);function d(a,e="wei"){return(0,c.parseUnits)(a,b.etherUnits[e])}a.s(["parseEther",()=>d])},588482,a=>{"use strict";var b=a.i(352844),c=a.i(273932),d=a.i(42783),e=a.i(573334),f=a.i(702831),g=a.i(30960),h=a.i(463080),i=a.i(3785),j=a.i(580254),k=a.i(452475),l=a.i(847920),m=a.i(375761),n=a.i(400863),o=a.i(487536),p=a.i(17963),q=a.i(299776),r=a.i(857937),s=a.i(528600),t=a.i(718963),u=a.i(789042);a.i(721594),a.i(534286),a.i(147775);let v={component:function(){let a=(0,l.u)(),{closePrivyModal:v,createAnalyticsEvent:w,connectors:x}=(0,m.u)(),{navigate:y,setModalData:z,data:A}=(0,o.a)(),B=(0,l.u)(),C=(0,d.useRef)(!1),D=(0,r.u)(),[E,F]=(0,d.useState)(!1),[G,H]=(0,d.useState)(!1),[I,J]=(0,d.useState)(null),[K,L]=(0,d.useState)(),[M,N]=(0,d.useState)();if(!A?.funding||"ethereum"!==A.funding.chainType)throw Error("Invalid funding data");let{amount:O,connectedWallet:P,chain:Q,solanaChain:R,isUSDC:S}=A.funding,T=A.funding.address,U=A.funding.erc20Address,V=A.funding.isUSDC?"USDC":Q.nativeCurrency.symbol,W=(0,d.useMemo)(()=>"solana"===P?.type?P.provider:function({connectors:a,connectedWalletAddress:b}){let c=a.find(a=>"solana"===a.chainType&&a.wallets.some(a=>a.address===b)),d=c?.wallet.accounts.find(a=>a.address===b);if(!c||!d)throw new m.a("Unable to find source wallet connector");return new f.ConnectedStandardSolanaWallet({wallet:c.wallet,account:d})}({connectors:x,connectedWalletAddress:P?.address||""}),[P,x]),X=(0,d.useMemo)(()=>{let b=D(s.S);if(!b)throw new m.a("Unable to load solana plugin");let c=a.solanaRpcs["solana:mainnet"];if(!c)throw new m.a("Unable to load mainnet RPC");return b.getSolanaRpcClient({rpc:c.rpc,rpcSubscriptions:c.rpcSubscriptions,chain:"solana:mainnet",blockExplorerUrl:c.blockExplorerUrl??"https://explorer.solana.com"})},[]),Y=(0,n.Q)((0,u.t)(W?.standardWallet.name||"unknown")),Z=Y?.name||"wallet";return(0,d.useEffect)(()=>{(async function(){if(!W||!Q||C.current)return;let a=D(s.S);if(!a)return void J(new m.a("Unable to solana plugin"));C.current=!0,Q?.testnet&&console.warn("Solana testnets are not supported for bridging");let b=S?1e6*parseFloat(O):(0,e.parseEther)(O),c=await (0,q.g)({isTestnet:!!Q.testnet,input:(0,q.t)({appId:B.id,amount:b.toString(),user:W.address,recipient:T,destinationChainId:Q.id,originChainId:q.b,originCurrency:S?q.d:q.a,destinationCurrency:S?U:void 0})}).catch(console.error);if(!c)return void J(new m.a(`Unable to fetch quotes for bridging. Wallet ${(0,n.a6)(W.address)} does not have enough funds.`,void 0,m.b.INSUFFICIENT_BALANCE));let d=await a.createTransactionFromRelayQuote({quote:c,source:W.address,solanaClient:X});if(d)try{F(!0);let b=await a.simulateTransaction({solanaClient:X,tx:d});if(b.hasError)return b.hasFunds?(console.error("Transaction failed:",b.error),void J(new m.a("Something went wrong",void 0,m.b.TRANSACTION_FAILURE))):void J(new m.a(`Wallet ${(0,n.a6)(W?.address)} does not have enough funds. ${c.details.currencyIn.amountFormatted} ${V} are needed to complete the transaction.`,void 0,m.b.INSUFFICIENT_BALANCE));let{signature:e}=await W.signAndSendTransaction({chain:"solana:mainnet",transaction:d}),f=a.getAddressFromBuffer(e);L(f),N("pending")}catch(a){if(console.error(a),/user rejected the request/gi.test(a.message||""))return void J(new m.a("Transaction was rejected by the user",void 0,m.b.TRANSACTION_FAILURE));J(new m.a("Something went wrong",void 0,m.b.TRANSACTION_FAILURE))}else J(new m.a(`Unable to select bridge option from quotes. Wallet ${(0,n.a6)(W.address)} does not have enough funds.`,void 0,m.b.INSUFFICIENT_BALANCE))})().catch(console.error)},[]),(0,q.u)({transactionHash:K,isTestnet:!1,bridgingStatus:M,setBridgingStatus:N,onSuccess({transactionHash:a}){F(!1),H(!0),w({eventName:p.O,payload:{provider:"external",status:"success",txHash:a,address:W.address,chainType:"solana",clusterName:R,token:"SOL",destinationAddress:T,destinationChainId:Q.id,destinationChainType:"ethereum",destinationValue:O,destinationToken:S?"USDC":"ETH"}})},onFailure({error:a}){F(!1),J(a)}}),(0,d.useEffect)(()=>{if(!G)return;let a=setTimeout(v,l.t);return()=>clearTimeout(a)},[G]),(0,d.useEffect)(()=>{I&&(z({funding:A?.funding,solanaFundingData:A?.solanaFundingData,sendTransaction:A?.sendTransaction,errorModalData:{error:I,previousScreen:"TransferFromWalletScreen"}}),y("ErrorScreen",!1))},[I]),G?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(j.t,{}),(0,b.jsx)(g.b,{}),(0,b.jsxs)(g.c,{children:[(0,b.jsx)(c.default,{color:"var(--privy-color-success)",width:"64px",height:"64px"}),(0,b.jsx)(i.C,{title:"Success!",description:`You’ve successfully added ${O} ${V} to your ${B.name} wallet. It may take a minute before the funds are available to use.`})]}),(0,b.jsx)(g.R,{}),(0,b.jsx)(h.B,{})]}):E&&W?(0,b.jsx)(t.T,{walletClientType:(0,u.t)(W?.standardWallet.name||"unknown"),displayName:Z,addressToFund:T,isBridging:E,isErc20Flow:!1,chainId:Q.id,chainName:Q.name,totalPriceInUsd:void 0,totalPriceInNativeCurrency:void 0,gasPriceInUsd:void 0,gasPriceInNativeCurrency:void 0}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(j.t,{}),(0,b.jsx)(k.N,{}),(0,b.jsx)("div",{style:{marginTop:"1rem"}}),(0,b.jsx)(h.B,{})]})}};a.s(["AwaitingSolToEvmBridgingScreen",()=>v,"default",()=>v])}];

//# sourceMappingURL=a6365__pnpm_282f21cc._.js.map