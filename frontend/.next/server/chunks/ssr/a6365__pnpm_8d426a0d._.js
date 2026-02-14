module.exports=[695273,a=>{"use strict";var b=a.i(42783);let c=b.forwardRef(function({title:a,titleId:c,...d},e){return b.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":c},d),a?b.createElement("title",{id:c},a):null,b.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"}))});a.s(["default",0,c])},122281,a=>{"use strict";var b=a.i(126520);let c=b.styled.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`;a.s(["T",()=>c])},70553,a=>{"use strict";var b=a.i(126520);let c=b.styled.span`
  margin-top: 4px;
  color: var(--privy-color-foreground);
  text-align: center;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */

  && a {
    color: var(--privy-color-accent);
  }
`;a.s(["S",()=>c])},631348,a=>{"use strict";var b=a.i(42783);let c=b.forwardRef(function({title:a,titleId:c,...d},e){return b.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":c},d),a?b.createElement("title",{id:c},a):null,b.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"}))});a.s(["default",0,c])},649302,a=>{"use strict";var b=a.i(352844),c=a.i(695273),d=a.i(631348),e=a.i(42783),f=a.i(487536),g=a.i(463080),h=a.i(126520),i=a.i(70553),j=a.i(122281),k=a.i(847920),l=a.i(375761),m=a.i(400863);a.i(721594),a.i(534286),a.i(147775);let n=h.styled.div`
  && {
    border-width: 4px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  aspect-ratio: 1;
  border-style: solid;
  border-color: ${a=>a.$color??"var(--privy-color-accent)"};
  border-radius: 50%;
`,o={component:()=>{let{user:a}=(0,f.u)(),{client:h,walletProxy:o,refreshSessionAndUser:p,closePrivyModal:q}=(0,l.u)(),r=(0,f.a)(),{entropyId:s,entropyIdVerifier:t}=r.data?.recoverWallet,[u,v]=(0,e.useState)(!1),[w,x]=(0,e.useState)(null),[y,z]=(0,e.useState)(null);function A(){if(!u){if(y)return r.data?.setWalletPassword?.onFailure(y),void q();if(!w)return r.data?.setWalletPassword?.onFailure(Error("User exited set recovery flow")),void q()}}return r.onUserCloseViaDialogOrKeybindRef.current=A,(0,b.jsxs)(b.Fragment,y?{children:[(0,b.jsx)(g.M,{onClose:A},"header"),(0,b.jsx)(n,{$color:"var(--privy-color-error)",style:{alignSelf:"center"},children:(0,b.jsx)(c.default,{height:38,width:38,stroke:"var(--privy-color-error)"})}),(0,b.jsx)(j.T,{style:{marginTop:"0.5rem"},children:"Something went wrong"}),(0,b.jsx)(m.Y,{style:{minHeight:"2rem"}}),(0,b.jsx)(g.c,{onClick:()=>z(null),children:"Try again"}),(0,b.jsx)(g.B,{})]}:{children:[(0,b.jsx)(g.M,{onClose:A},"header"),(0,b.jsx)(d.default,{style:{width:"3rem",height:"3rem",alignSelf:"center"}}),(0,b.jsx)(j.T,{style:{marginTop:"0.5rem"},children:"Automatically secure your account"}),(0,b.jsx)(i.S,{style:{marginTop:"1rem"},children:"When you log into a new device, you’ll only need to authenticate to access your account. Never get logged out if you forget your password."}),(0,b.jsx)(m.Y,{style:{minHeight:"2rem"}}),(0,b.jsx)(g.c,{loading:u,disabled:!(!u&&!w),onClick:()=>(async function(){v(!0);try{let b=await h.getAccessToken(),c=(0,f.h)(a,s);if(!b||!o||!c)return;if(!(await o.setRecovery({accessToken:b,entropyId:s,entropyIdVerifier:t,existingRecoveryMethod:c.recoveryMethod,recoveryMethod:"privy"})).entropyId)throw Error("Unable to set recovery on wallet");let d=await p();if(!d)throw Error("Unable to set recovery on wallet");let e=(0,f.h)(d,c.address);if(!e)throw Error("Unabled to set recovery on wallet");x(!!d),setTimeout(()=>{r.data?.setWalletPassword?.onSuccess(e),q()},k.q)}catch(a){z(a)}finally{v(!1)}})(),children:w?"Success":"Confirm"}),(0,b.jsx)(g.B,{})]})}};a.s(["SetAutomaticRecoveryScreen",()=>o,"default",()=>o])}];

//# sourceMappingURL=a6365__pnpm_8d426a0d._.js.map