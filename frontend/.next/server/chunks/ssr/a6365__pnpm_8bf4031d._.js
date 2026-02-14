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
`;a.s(["N",()=>d])},855672,a=>{"use strict";var b=a.i(352844),c=a.i(42783),d=a.i(126520),e=a.i(400863),f=a.i(463080),g=a.i(452475);let h=d.styled.div`
  /* spacing tokens */
  --screen-space: 16px; /* base 1x = 16 */
  --screen-space-lg: calc(var(--screen-space) * 1.5); /* 24px */

  position: relative;
  overflow: hidden;
  margin: 0 calc(-1 * var(--screen-space)); /* extends over modal padding */
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,i=d.styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) * 1.5);
  width: 100%;
  background: var(--privy-color-background);
  padding: 0 var(--screen-space-lg) var(--screen-space);
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,j=d.styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,k=(0,d.styled)(f.M)`
  margin: 0 -8px;
`,l=d.styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  /* Enable scrolling */
  overflow-y: auto;

  /* Hide scrollbar but keep functionality when scrollable */
  /* Add padding for focus outline space, offset with negative margin */
  padding: 3px;
  margin: -3px;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-gutter: stable both-edges;
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* Gradient effect for scroll indication */
  ${({$colorScheme:a})=>"light"===a?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;":"dark"===a?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;":void 0}

  background-repeat: no-repeat;
  background-size:
    100% 32px,
    100% 16px;
  background-attachment: local, scroll;
`,m=d.styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--screen-space-lg);
`,n=d.styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--screen-space);
`,o=d.styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,p=d.styled.h3`
  && {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: var(--privy-color-foreground);
    margin: 0;
  }
`,q=d.styled.p`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: var(--privy-color-foreground);
  }
`,r=d.styled.div`
  background: ${({$variant:a})=>{switch(a){case"success":return"var(--privy-color-success-bg, #EAFCEF)";case"warning":return"var(--privy-color-warn, #FEF3C7)";case"error":return"var(--privy-color-error-bg, #FEE2E2)";case"loading":case"logo":return"transparent";default:return"var(--privy-color-background-2)"}}};

  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`,s=d.styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    max-height: 90px;
    max-width: 180px;
  }
`,t=d.styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 82px;

  > div {
    position: relative;
  }

  > div > :first-child {
    position: relative;
  }

  > div > :last-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`,u=({children:a,...c})=>(0,b.jsx)(h,{children:(0,b.jsx)(i,{...c,children:a})}),v=d.styled.div`
  position: absolute;
  top: 0;
  left: calc(-1 * var(--screen-space-lg));
  width: calc(100% + calc(var(--screen-space-lg) * 2));
  height: 4px;
  background: var(--privy-color-background-2);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
`,w=(0,d.styled)(f.B)`
  padding: 0;
  && a {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,x=d.styled.div`
  height: 100%;
  width: ${({pct:a})=>a}%;
  background: var(--privy-color-foreground-3);
  border-radius: 2px;
  transition: width 300ms ease-in-out;
`,y=({step:a})=>a?(0,b.jsx)(v,{children:(0,b.jsx)(x,{pct:Math.min(100,a.current/a.total*100)})}):null;u.Header=({title:a,subtitle:c,icon:d,iconVariant:e,iconLoadingStatus:f,showBack:g,onBack:h,showInfo:i,onInfo:l,showClose:m,onClose:r,step:s,...t})=>(0,b.jsxs)(j,{...t,children:[(0,b.jsx)(k,{backFn:g?h:void 0,infoFn:i?l:void 0,onClose:m?r:void 0,closeable:m}),(d||e||a||c)&&(0,b.jsxs)(n,{children:[d||e?(0,b.jsx)(u.Icon,{icon:d,variant:e,loadingStatus:f}):null,!(!a&&!c)&&(0,b.jsxs)(o,{children:[a&&(0,b.jsx)(p,{children:a}),c&&(0,b.jsx)(q,{children:c})]})]}),s&&(0,b.jsx)(y,{step:s})]}),(u.Body=c.default.forwardRef(({children:a,...c},d)=>(0,b.jsx)(l,{ref:d,...c,children:a}))).displayName="Screen.Body",u.Footer=({children:a,...c})=>(0,b.jsx)(m,{id:"privy-content-footer-container",...c,children:a}),u.Actions=({children:a,...c})=>(0,b.jsx)(z,{...c,children:a}),u.HelpText=({children:a,...c})=>(0,b.jsx)(A,{...c,children:a}),u.Watermark=()=>(0,b.jsx)(w,{}),u.Icon=({icon:a,variant:d="subtle",loadingStatus:f})=>"logo"===d&&a?(0,b.jsx)(s,"string"==typeof a?{children:(0,b.jsx)("img",{src:a,alt:""})}:c.default.isValidElement(a)?{children:a}:{children:c.default.createElement(a)}):"loading"===d?a?(0,b.jsx)(t,{children:(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,b.jsx)(e.a4,{success:f?.success,fail:f?.fail}),"string"==typeof a?(0,b.jsx)("span",{style:{background:`url('${a}') 0 0 / contain`,height:"38px",width:"38px",borderRadius:"6px",margin:"auto",backgroundSize:"contain"}}):c.default.isValidElement(a)?c.default.cloneElement(a,{style:{width:"38px",height:"38px"}}):c.default.createElement(a,{style:{width:"38px",height:"38px"}})]})}):(0,b.jsx)(r,{$variant:d,children:(0,b.jsx)(g.N,{size:"64px"})}):(0,b.jsx)(r,{$variant:d,children:a&&("string"==typeof a?(0,b.jsx)("img",{src:a,alt:"",style:{width:"32px",height:"32px",borderRadius:"6px"}}):c.default.isValidElement(a)?a:c.default.createElement(a,{width:32,height:32,stroke:(()=>{switch(d){case"success":return"var(--privy-color-icon-success)";case"warning":return"var(--privy-color-icon-warning)";case"error":return"var(--privy-color-icon-error)";default:return"var(--privy-color-icon-muted)"}})(),strokeWidth:2}))});let z=d.styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,A=d.styled.div`
  && {
    margin: 0;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-3);
    font-size: 14px;
    line-height: 22px;

    & a {
      color: var(--privy-color-accent);
    }
  }
`;a.s(["S",()=>u])},977538,a=>{"use strict";var b=a.i(352844),c=a.i(463080),d=a.i(855672);let e=({primaryCta:a,secondaryCta:e,helpText:f,watermark:g=!0,children:h,...i})=>{let j=a||e?(0,b.jsxs)(b.Fragment,{children:[a&&(()=>{let{label:d,...e}=a,f=e.variant||"primary";return(0,b.jsx)(c.a,{...e,variant:f,style:{width:"100%",...e.style},children:d})})(),e&&(()=>{let{label:a,...d}=e,f=d.variant||"secondary";return(0,b.jsx)(c.a,{...d,variant:f,style:{width:"100%",...d.style},children:a})})()]}):null;return(0,b.jsxs)(d.S,{id:i.id,className:i.className,children:[(0,b.jsx)(d.S.Header,{...i}),h?(0,b.jsx)(d.S.Body,{children:h}):null,f||j||g?(0,b.jsxs)(d.S.Footer,{children:[f?(0,b.jsx)(d.S.HelpText,{children:f}):null,j?(0,b.jsx)(d.S.Actions,{children:j}):null,g?(0,b.jsx)(d.S.Watermark,{}):null]}):null]})};a.s(["S",()=>e])},489252,a=>{"use strict";var b=a.i(42783);let c=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},d=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var e={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let f=(0,b.forwardRef)(({color:a="currentColor",size:c=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...e,width:c,height:c,stroke:a,strokeWidth:g?24*Number(f)/Number(c):f,className:d("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),g=(a,e)=>{let g=(0,b.forwardRef)(({className:g,...h},i)=>(0,b.createElement)(f,{ref:i,iconNode:e,className:d(`lucide-${c(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,g),...h}));return g.displayName=c(a),g};a.s(["default",()=>g],489252)},373351,a=>{"use strict";let b=(0,a.i(489252).default)("circle-x",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);a.s(["XCircle",()=>b],373351)},259560,a=>{"use strict";var b=a.i(352844),c=a.i(373351),d=a.i(42783);async function e(a,b){let c=`${a}-auto-${"ethereum"===b?"eth":"sol"}`,d=(new TextEncoder).encode(c);return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",d))).map(a=>a.toString(16).padStart(2,"0")).join("")}var f=a.i(847920),g=a.i(228720),h=a.i(375761),i=a.i(487536),j=a.i(977538);a.i(721594),a.i(147775),a.i(534286),a.i(158638),a.i(463893);let k=({errorMessage:a,onClose:d})=>(0,b.jsx)(j.S,a?{title:"Something went wrong",subtitle:a,icon:c.XCircle,iconVariant:"error",primaryCta:{label:"Close",onClick:d},watermark:!0}:{title:"Creating your wallet",subtitle:"Please wait...",iconVariant:"loading",watermark:!1}),l={component:()=>{let{setModalData:a,navigate:c,data:j,onUserCloseViaDialogOrKeybindRef:l}=(0,i.a)(),m=(0,f.u)(),[n,o]=(0,d.useState)(""),{embeddedWallets:p}=(0,f.u)(),{authenticated:q,user:r}=(0,i.u)(),{closePrivyModal:s,walletProxy:t,client:u}=(0,h.u)(),{onSuccess:v,onFailure:w,callAuthOnSuccessOnClose:x,shouldCreateEth:y,shouldCreateSol:z}=j.createWallet,A="legacy-embedded-wallets-only"===m.embeddedWallets.mode&&!0===m?.embeddedWallets.requireUserOwnedRecoveryOnCreate,[B,C]=(0,d.useState)(null),{create:D}=(0,g.v)(),E=y??(!!r&&(0,g.s)(r,m.embeddedWallets.ethereum.createOnLogin)),F=z??(!!r&&(0,g.k)(r,m.embeddedWallets.solana.createOnLogin)),G=new g.R(async()=>{let a=await u.getAccessToken();if(r&&a&&t)try{let a,b=await e(r.id,"ethereum"),d=await e(r.id,"solana");if(E&&F)a=await D({chainType:"ethereum",walletIndex:0,latestUser:r,idempotencyKey:b}),a=await D({chainType:"solana",walletIndex:0,latestUser:a.user,idempotencyKey:d});else if(F)a=await D({chainType:"solana",walletIndex:0,latestUser:r,idempotencyKey:d});else{if(!E)return void s({shouldCallAuthOnSuccess:x});a=await D({chainType:"ethereum",walletIndex:0,latestUser:r,idempotencyKey:b})}C(a),c("EmbeddedWalletCreatedScreen")}catch(a){o(a.message)}});return(0,d.useEffect)(()=>q&&r?A?(a({...j,createWallet:{...j.createWallet,shouldCreateEth:E,shouldCreateSol:F},recoverySelection:{...j?.recoverySelection,isInAccountCreateFlow:!0,shouldCreateEth:E,shouldCreateSol:F}}),c((0,g.F)({walletAction:"create",showAutomaticRecovery:!1,availableRecoveryMethods:p.userOwnedRecoveryOptions,legacySetWalletPasswordFlow:!1,isResettingPassword:!1}))):void G.execute():(c("LandingScreen"),void w(Error("User must be authenticated before creating a Privy wallet"))),[A,q]),l.current=()=>null,(0,b.jsx)(k,{errorMessage:n||void 0,onClose:()=>{B?(v(B),s({shouldCallAuthOnSuccess:x})):(w(new h.m("User wallet creation failed")),s({shouldCallAuthOnSuccess:!1}))}})}};a.s(["EmbeddedWalletOnAccountCreateScreen",()=>l,"EmbeddedWalletOnAccountCreateView",()=>k,"default",()=>l],259560)}];

//# sourceMappingURL=a6365__pnpm_8bf4031d._.js.map