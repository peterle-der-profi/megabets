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
`;a.s(["S",()=>u])},977538,a=>{"use strict";var b=a.i(352844),c=a.i(463080),d=a.i(855672);let e=({primaryCta:a,secondaryCta:e,helpText:f,watermark:g=!0,children:h,...i})=>{let j=a||e?(0,b.jsxs)(b.Fragment,{children:[a&&(()=>{let{label:d,...e}=a,f=e.variant||"primary";return(0,b.jsx)(c.a,{...e,variant:f,style:{width:"100%",...e.style},children:d})})(),e&&(()=>{let{label:a,...d}=e,f=d.variant||"secondary";return(0,b.jsx)(c.a,{...d,variant:f,style:{width:"100%",...d.style},children:a})})()]}):null;return(0,b.jsxs)(d.S,{id:i.id,className:i.className,children:[(0,b.jsx)(d.S.Header,{...i}),h?(0,b.jsx)(d.S.Body,{children:h}):null,f||j||g?(0,b.jsxs)(d.S.Footer,{children:[f?(0,b.jsx)(d.S.HelpText,{children:f}):null,j?(0,b.jsx)(d.S.Actions,{children:j}):null,g?(0,b.jsx)(d.S.Watermark,{}):null]}):null]})};a.s(["S",()=>e])},220950,a=>{"use strict";var b=a.i(228720);let c=(a,c)=>(0,b.s)(a,c.ethereum.createOnLogin)||(0,b.k)(a,c.solana.createOnLogin);a.s(["s",()=>c])},261550,a=>{"use strict";var b=a.i(352844),c=a.i(126520);let d=c.styled.a`
  && {
    color: ${({$variant:a})=>"underlined"===a?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))"};
    font-weight: 400;
    text-decoration: ${({$variant:a})=>"underlined"===a?"underline":"var(--privy-link-navigation-decoration, none)"};
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    cursor: ${({$disabled:a})=>a?"not-allowed":"pointer"};
    opacity: ${({$disabled:a})=>a?.5:1};

    font-size: ${({$size:a})=>{switch(a){case"xs":return"12px";case"sm":return"14px";default:return"16px"}}};

    line-height: ${({$size:a})=>{switch(a){case"xs":return"18px";case"sm":return"22px";default:return"24px"}}};

    transition:
      color 200ms ease,
      text-decoration-color 200ms ease,
      opacity 200ms ease;

    &:hover {
      color: ${({$variant:a,$disabled:b})=>"underlined"===a?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))"};
      text-decoration: ${({$disabled:a})=>a?"none":"underline"};
      text-underline-offset: 4px;
    }

    &:active {
      color: ${({$variant:a,$disabled:b})=>b?"underlined"===a?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))":"var(--privy-color-foreground)"};
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px #949df9;
      border-radius: 2px;
    }
  }
`,e=({size:a="md",variant:c="navigation",disabled:e=!1,as:f,children:g,onClick:h,...i})=>(0,b.jsx)(d,{as:f,$size:a,$variant:c,$disabled:e,onClick:a=>{e?a.preventDefault():h?.(a)},...i,children:g});a.s(["L",()=>e])},412119,a=>{"use strict";var b=a.i(847920);let c={"connectionStatus.successfullyConnected":"Successfully connected with {walletName}","connectionStatus.errorTitle":"{errorMessage}","connectionStatus.connecting":"Connecting","connectionStatus.connectOneWallet":"For the best experience, connect only one wallet at a time.","connectionStatus.checkOtherWindows":"Don't see your wallet? Check your other browser windows.","connectionStatus.stillHere":"Still here?","connectionStatus.tryConnectingAgain":"Try connecting again","connectionStatus.or":"or","connectionStatus.useDifferentLink":"use this different link","connectWallet.connectYourWallet":"Connect a wallet","connectWallet.waitingForWallet":"Waiting for {walletName}","connectWallet.connectToAccount":"Connect a wallet to your {appName} account","connectWallet.installAndConnect":"To connect to {walletName}, install and open the app. Then confirm the connection when prompted.","connectWallet.tryConnectingAgain":"Please try connecting again.","connectWallet.openInApp":"Open in app","connectWallet.copyLink":"Copy link","connectWallet.retry":"Retry","connectWallet.searchPlaceholder":"Search through {count} wallets","connectWallet.noWalletsFound":"No wallets found. Try another search.","connectWallet.lastUsed":"Last used","connectWallet.selectYourWallet":"Select your wallet","connectWallet.selectNetwork":"Select network","connectWallet.goToWallet":"Go to {walletName} to continue","connectWallet.scanToConnect":"Scan code to connect to {walletName}","connectWallet.openOrInstall":"Open or install {walletName}"};function d(){let a=(0,b.u)();return{t:(b,d)=>{var e;let f;return e=a.intl.textLocalization,f=e?.[b]??c[b],d&&0!==Object.keys(d).length?f.replace(/\{(\w+)\}/g,(a,b)=>d[b]??a):f}}}a.s(["u",()=>d])},735971,a=>{"use strict";var b=a.i(352844),c=a.i(42783),d=a.i(534286),e=a.i(126520),f=a.i(228720),g=a.i(261550),h=a.i(847920),i=a.i(412119),j=a.i(789042),k=a.i(400863),l=a.i(104408),m=a.i(896874),n=a.i(375761),o=a.i(487536),p=a.i(220950),q=a.i(857937),r=a.i(528600),s=a.i(977538);a.i(147775),a.i(158638),a.i(463893),a.i(721594);let t=a=>{let b=localStorage.getItem("-walletlink:https://www.walletlink.org:Addresses")?.split(" ").filter(a=>(0,l.isHex)(a,{strict:!0})).map(a=>(0,m.getAddress)(a));return!!b?.length&&!!a?.linkedAccounts.filter(a=>"wallet"==a.type&&b.includes(a.address)).length},u=a=>a?.privyErrorCode===n.b.LINKED_TO_ANOTHER_USER?j.C.ERROR_USER_EXISTS:a instanceof j.P&&!a.details.default?a.details:a instanceof j.d?j.C.ERROR_TIMED_OUT:a?.privyErrorCode===n.b.CANNOT_LINK_MORE_OF_TYPE?j.C.ERROR_USER_LIMIT_REACHED:j.C.ERROR_WALLET_CONNECTION,v=({walletLogo:a,title:c,subtitle:d,signSuccess:e,errorMessage:f,connectSuccess:h,separateConnectAndSign:k,signing:l,walletConnectRedirectUri:m,walletConnectFallbackUniversalUri:n,hasTabbedAway:o,showCoinbaseWalletResetCta:p,numRetries:q,onBack:r,onSign:t,onRetry:u,onCoinbaseReset:v,onDifferentWallet:w})=>{let{t:y}=(0,i.u)(),z=p?{label:"Use a different wallet",onClick:v,disabled:e}:f===j.C.ERROR_USER_EXISTS&&r?{label:"Use a different wallet",onClick:w}:h&&!e&&k?{label:l?"Signing":"Sign with your wallet",onClick:t,disabled:l}:!e&&f?.retryable&&q<2?{label:"Retry",onClick:u,disabled:!1}:e||f?void 0:{label:y("connectionStatus.connecting"),onClick:()=>{},disabled:!0};return(0,b.jsx)(s.S,{title:c,subtitle:d,icon:a,iconVariant:"loading",iconLoadingStatus:{success:e,fail:!!f},primaryCta:z,onBack:r,watermark:!0,children:!h&&m&&!o&&(0,b.jsxs)(x,{children:[y("connectionStatus.stillHere")," ",(0,b.jsx)(g.L,{href:m,target:"_blank",variant:"underlined",size:"sm",children:y("connectionStatus.tryConnectingAgain")}),n&&(0,b.jsxs)(b.Fragment,{children:[" ",y("connectionStatus.or")," ",(0,b.jsx)(g.L,{href:n,target:"_blank",variant:"underlined",size:"sm",children:y("connectionStatus.useDifferentLink")})]})]})})},w={component:()=>{var a,e;let g,l,[m,s]=(0,c.useState)(!1),[w,x]=(0,c.useState)(!1),[y,z]=(0,c.useState)(void 0),{authenticated:A,logout:B}=(0,o.u)(),{navigate:C,navigateBack:D,lastScreen:E,currentScreen:F,setModalData:G,data:H}=(0,o.a)(),I=(0,h.u)(),{t:J}=(0,i.u)(),{getAuthFlow:K,walletConnectionStatus:L,closePrivyModal:M,initLoginWithWallet:N,loginWithWallet:O,updateWallets:P,createAnalyticsEvent:Q}=(0,n.u)(),{walletConnectors:R}=(0,o.u)(),[S,T]=(0,c.useState)(0),{user:U}=(0,o.u)(),V=(0,q.u)(),[W]=(0,c.useState)(U?.linkedAccounts.length||0),[X,Y]=(0,c.useState)(""),[Z,$]=(0,c.useState)(""),[_,aa]=(0,c.useState)(!1),{hasTabbedAway:ab}=function(){let[a,b]=(0,c.useState)(!1),d=(0,c.useCallback)(()=>{document.hidden&&b(!0)},[]);return(0,c.useEffect)(()=>(document.addEventListener("visibilitychange",d),()=>document.removeEventListener("visibilitychange",d)),[d]),{hasTabbedAway:a,reset:()=>b(!1)}}(),{enabled:ac,token:ad}=(0,f.a)(),ae=(0,k.Q)(L?.connector?.walletClientType||"unknown"),af=d.isMobile&&"wallet_connect_v2"===L?.connector?.connectorType||d.isMobile&&"coinbase_wallet"===L?.connector?.connectorType||d.isMobile&&"base_account"===L?.connector?.connectorType||d.isMobile&&"injected"===L?.connector?.connectorType&&"phantom"===L?.connector?.walletClientType||d.isMobile&&"solana_adapter"===L?.connector?.connectorType&&"mobile_wallet_adapter"===L.connector.walletClientType,ag="connected"===L?.status,ah="switching_to_supported_chain"===L?.status;(0,c.useEffect)(()=>{let a=K(),b=a instanceof f.b||a instanceof f.S?a:void 0;ag&&"solana"===L.connector?.chainType&&"phantom"===L.connector?.walletClientType&&V(r.e)&&void 0===H?.login?.isSigningInWithLedgerSolana?C("ConnectLedgerScreen",!1):(ag&&!b&&(!ac||ad||A?N(L.connectedWallet,ad,H?.login?.disableSignup,H?.login?.isSigningInWithLedgerSolana?"transaction":"plain").then(()=>{aa(!0)}):(G({captchaModalData:{callback:a=>N(L.connectedWallet,a,H?.login?.disableSignup,H?.login?.isSigningInWithLedgerSolana?"transaction":"plain").then(()=>{aa(!0)}),userIntentRequired:!1,onSuccessNavigateTo:"ConnectionStatusScreen",onErrorNavigateTo:"ErrorScreen"}}),C("CaptchaScreen",!1))),b instanceof f.S&&H?.login?.isSigningInWithLedgerSolana&&(b.messageType="transaction"),b&&af&&ag&&!b.preparedMessage?b.buildMessage():b&&!af&&ag&&(w||(async()=>{x(!0),z(void 0);try{"wallet_connect_v2"===L?.connector?.connectorType&&"metamask"===L?.connector?.walletClientType&&await (0,k.k)(2500),await aj()}catch(a){console.warn("Auto-prompted signature failed",a)}finally{x(!1)}})()))},[S,ag,_]),(0,c.useEffect)(()=>{if(U&&m){let a=h.q-500;if(I?.legal.requireUsersAcceptTerms&&!U.hasAcceptedTerms){let b=setTimeout(()=>{C("AffirmativeConsentScreen")},a);return()=>clearTimeout(b)}if((0,p.s)(U,I.embeddedWallets)){let b=setTimeout(()=>{G({createWallet:{onSuccess:()=>{},onFailure:a=>{console.error(a),Q({eventName:"embedded_wallet_creation_failure_logout",payload:{error:a,screen:"ConnectionStatusScreen"}}),B()},callAuthOnSuccessOnClose:!0}}),C("EmbeddedWalletOnAccountCreateScreen")},a);return()=>clearTimeout(b)}P();let b=setTimeout(()=>M({shouldCallAuthOnSuccess:!0,isSuccess:!0}),h.q);return()=>clearTimeout(b)}},[U,m]);let ai=a=>{if(a?.privyErrorCode!==n.b.ALLOWLIST_REJECTED){if(a?.privyErrorCode===n.b.USER_LIMIT_REACHED)return console.error(new n.k(a).toString()),void C("UserLimitReachedScreen");if(a?.privyErrorCode!==n.b.USER_DOES_NOT_EXIST)return a?.privyErrorCode===n.b.ACCOUNT_TRANSFER_REQUIRED&&a.data?.data?.nonce?(G({accountTransfer:{nonce:a.data?.data?.nonce,account:K()?.meta.address,displayName:a.data?.data?.account?.displayName,externalWalletMetadata:{walletClientType:K()?.meta.walletClientType,chainId:K()?.meta.chainId,connectorType:K()?.meta.connectorType},linkMethod:K()instanceof f.b?"siwe":"siws",embeddedWalletAddress:a.data?.data?.otherUser?.embeddedWalletAddress}}),void C("LinkConflictScreen")):void z(u(a));C("AccountNotFoundScreen")}else C("AllowlistRejectionScreen")};async function aj(){try{await O(),s(!0)}catch(a){ai(a)}finally{x(!1)}}(0,c.useEffect)(()=>{L?.connectError&&ai(L?.connectError)},[L]),a=()=>{let a="wallet_connect_v2"===ak&&L?.connector instanceof f.W?L.connector.redirectUri:void 0;a&&Y(a);let b="wallet_connect_v2"===ak&&L?.connector instanceof f.W?L.connector.fallbackUniversalRedirectUri:void 0;b&&$(b)},e=L?.connector instanceof f.W&&!X?500:null,g=(0,c.useRef)(()=>{}),(0,c.useEffect)(()=>{g.current=a}),(0,c.useEffect)(()=>{if(null!==e){let a=setInterval(()=>g.current(),e||0);return()=>clearInterval(a)}},[e]);let ak=L?.connector?.connectorType||"injected",al=L?.connector?.walletClientType||"unknown",am=ae?.metadata?.shortName||ae?.name||L?.connector?.walletBranding.name||"Browser Extension",an=ae?.image_url?.md||L?.connector?.walletBranding.icon||(a=>(0,b.jsx)(f.B,{...a})),ao="Browser Extension"===am?am.toLowerCase():am;l=m?J("connectionStatus.successfullyConnected",{walletName:ao}):y?J("connectionStatus.errorTitle",{errorMessage:y.message}):ah?"Switching networks":ag?w&&af?"Signing":"Sign to verify":`Waiting for ${ao}`;let ap=J("connectionStatus.checkOtherWindows");m?ap=W===(U?.linkedAccounts.length||0)?"Wallet was already linked.":"You're good to go!":S>=2&&y?ap="Unable to connect wallet":y?ap=y.detail:ah?ap="Switch your wallet to the requested network.":ag&&af?ap="Sign the message in your wallet to verify it belongs to you.":"metamask"===al&&d.isMobile?ap="Click continue to open and connect MetaMask.":"metamask"===al?ap="For the best experience, connect only one wallet at a time.":"wallet_connect"===ak?ap="Open your mobile wallet app to continue":"coinbase_wallet"===ak?(0,k.T)()||(ap=t(U)?"Continue with the Coinbase app. Not the right wallet? Reset your connection below.":"Confirm in the Coinbase app/popup to continue."):H?.login?.isSigningInWithLedgerSolana&&(ap="Ledger requires a transaction to verify your identity. You'll sign a transaction that performs no onchain action.");let aq=R?.walletConnectors?.find(a=>"coinbase_wallet"===a.walletClientType),ar="coinbase_wallet"===al&&(t(U)||y===j.C.ERROR_USER_EXISTS);return(0,b.jsx)(v,{walletLogo:an,title:l,subtitle:ap,signSuccess:m,errorMessage:y,connectSuccess:ag,separateConnectAndSign:af,signing:w,walletConnectRedirectUri:X,walletConnectFallbackUniversalUri:Z,hasTabbedAway:ab,showCoinbaseWalletResetCta:ar,numRetries:S,onBack:E&&F!==E?D:void 0,onSign:()=>{x(!0),aj()},onRetry:()=>{T(S+1),z(void 0),ag?(x(!0),aj()):L?.connectRetry()},onCoinbaseReset:()=>{aq&&aq?.disconnect()},onDifferentWallet:D})}},x=e.styled.p`
  text-align: center;
  color: var(--privy-color-foreground-2);
  font-size: 14px;
  line-height: 22px;
  margin: 16px 0;
`;a.s(["ConnectionStatusScreen",()=>w,"ConnectionStatusView",()=>v,"default",()=>w,"getErrorDetails",()=>u])},158683,a=>{"use strict";var b=a.i(352844),c=a.i(42783),d=a.i(534286),e=a.i(789042),f=a.i(847920),g=a.i(400863),h=a.i(375761),i=a.i(487536),j=a.i(977538),k=a.i(228720),l=a.i(735971);a.i(147775),a.i(721594),a.i(158638),a.i(463893);let m=({walletLogo:a,success:c,errorMessage:d,title:f,subtitle:g,onRetry:h,onUseDifferentWallet:i,onBack:k,numRetries:l,maxRetries:m})=>(0,b.jsx)(j.S,{title:f,subtitle:g,icon:a,iconVariant:"loading",iconLoadingStatus:{success:c,fail:!!d},primaryCta:d===e.C.ERROR_USER_EXISTS?{label:"Use a different wallet",onClick:i}:!c&&d?.retryable&&l<m?{label:"Retry",onClick:h,disabled:!d?.retryable||l>=m}:!c&&d&&l>=m?{label:"Use a different wallet",onClick:i}:void 0,onBack:k,watermark:!0}),n={component:()=>{let a,{navigateBack:e,navigate:j,lastScreen:n,currentScreen:o,data:p,setModalData:q}=(0,i.a)(),{walletConnectionStatus:r,closePrivyModal:s}=(0,h.u)(),[t,u]=(0,c.useState)(void 0),[v,w]=(0,c.useState)(0),x=(0,g.Q)(r?.connector?.walletClientType||"unknown"),y="connected"===r?.status,z="switching_to_supported_chain"===r?.status;(0,c.useEffect)(()=>{if(y){let a;if(p?.externalConnectWallet?.onCompleteNavigateTo){let b=p.externalConnectWallet.onCompleteNavigateTo,c=r.connectedWallet?.address;a=setTimeout(()=>{if(p.funding&&r.connector){let a=r.connector.wallets.find(a=>a.address===c);q({...p,funding:{...p.funding,connectedWallet:a}})}j(b({address:c,walletClientType:r.connector?.walletClientType,walletChainType:r.connector?.chainType}))},f.q)}else a=setTimeout(s,f.q);return()=>clearTimeout(a)}},[y]),(0,c.useEffect)(()=>{var a;r?.connectError&&(a=r?.connectError,u((0,l.getErrorDetails)(a)))},[r]);let A=r?.connector?.connectorType||"injected",B=r?.connector?.walletClientType||"unknown",C=x?.metadata?.shortName||x?.name||r?.connector?.walletBranding.name||"Browser Extension",D=x?.image_url?.md||r?.connector?.walletBranding.icon||(a=>(0,b.jsx)(k.B,{...a})),E="Browser Extension"===C?C.toLowerCase():C;a=y?`Successfully connected with ${E}`:t?t.message:z?"Switching networks":`Waiting for ${E}`;let F="Don’t see your wallet? Check your other browser windows.";return y?F="You’re good to go!":v>=2&&t?F="Unable to connect wallet":t?F=t.detail:z?F="Switch your wallet to the requested network.":"metamask"===B&&d.isMobile?F="Click to continue to open and connect MetaMask.":"metamask"===B?F="For the best experience, connect only one wallet at a time.":"wallet_connect_v2"===A?F="Open your mobile wallet app to continue":"coinbase_wallet"===A&&(F="Confirm in the Coinbase app/popup to continue."),(0,b.jsx)(m,{walletName:C,walletLogo:D,success:y,errorMessage:t,title:a,subtitle:F,onRetry:()=>{w(v+1),u(void 0),r?.connectRetry()},onUseDifferentWallet:e,onBack:o===n?void 0:e,numRetries:v,maxRetries:2})}};a.s(["ConnectOnlyStatusScreen",()=>n,"ConnectOnlyStatusScreenView",()=>m,"default",()=>n])}];

//# sourceMappingURL=152a7_%40privy-io_react-auth_dist_esm_5a387fe3._.js.map