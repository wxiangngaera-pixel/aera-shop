/* Customers always stay on aeramealprep.net : a customer page opened on my.chatbees.io ( an old
   email, a bookmark, a link we missed ) moves itself across straight away, keeping everything after
   the address. Not inside the Chatbees editor preview, and not with ?stay=1 ( for testing ). */
(function(){try{
 if(!/(^|\.)my\.chatbees\.io$/i.test(location.hostname))return;
 if(window.top!==window)return;
 var q=location.search||'';
 if(/[?&]stay=1(&|$)/.test(q)){try{sessionStorage.setItem('aera.stay','1')}catch(e){}return}
 try{if(sessionStorage.getItem('aera.stay')==='1')return}catch(e){}
 var M={"ZQr9fS2jA9":"/","xR3Dfd9n":"/fridge","D2pz8bZ":"/checkout","dtTMaV":"/account","SrQzC5m2":"/meal-plan","DSBcJ9bN4":"/bring-your-own-plan","8s4Xd6h":"/track","VMrvEw":"/merchandise","TVRk6bqam":"/corporate","G7mXL4RMz2":"/terms","xXH4dXALg":"/privacy","B2WjrKhnz":"/contact","DiB2ZadptP":"/thank-you","HkKJuxBS":"/referrer-portal","H9H32i9ShW":"/referrer-signup","ZmQYknnnM":"/points-checkout","8kZjg8U5XD":"/home-sourced-meals","vP2uvq":"/coach-plan-builder"};
 var m=location.pathname.match(/\/p\/([A-Za-z0-9]+)\/?$/);if(!m)return;
 var t=M[m[1]];if(!t)return;
 location.replace('https://aeramealprep.net'+(t==='/'?'/':t+'/')+q+(location.hash||''));
}catch(e){}})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* On a phone the whole order panel sits behind the Cart button, so every control the
   walkthrough points at is off screen until it is opened. Open it first. */
function tourPrep(){
 try{var side=document.getElementById('side');
  if(side&&getComputedStyle(side).display==='none'&&typeof openCart==='function')openCart()}
 catch(e){}}

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* ---- the little pictures ----
   One loop each, drawn here in plain SVG so nothing is fetched and nothing can go missing.
   Canvas is 64 x 40, the ink is the card's own, the accent is AERA yellow. */
var ART={
 map:'<path class="a-tr" d="M6 31C14 31 15 12 26 12s12 16 22 16"/><circle class="a-dot" r="3.4" cx="0" cy="0"><animateMotion dur="3.4s" repeatCount="indefinite" path="M6 31C14 31 15 12 26 12s12 16 22 16"/></circle><circle class="a-pin" cx="52" cy="28" r="2.2"/>',
 steps:'<g class="a-steps"><rect x="4" y="17" width="9" height="7" rx="2.2"/><rect x="16" y="17" width="9" height="7" rx="2.2"/><rect x="28" y="17" width="9" height="7" rx="2.2"/><rect x="40" y="17" width="9" height="7" rx="2.2"/><rect x="52" y="17" width="8" height="7" rx="2.2"/></g>',
 list:'<g class="a-rows"><rect x="8" y="8" width="48" height="5" rx="2.5"/><rect x="8" y="18" width="40" height="5" rx="2.5"/><rect x="8" y="28" width="46" height="5" rx="2.5"/></g>',
 tick:'<rect x="9" y="12" width="17" height="17" rx="4.5"/><path class="a-check" d="M13 21l4 4 6-8"/><rect class="a-ghost" x="32" y="14" width="23" height="4.5" rx="2.2"/><rect class="a-ghost" x="32" y="23" width="16" height="4.5" rx="2.2"/>',
 cal:'<rect x="7" y="9" width="32" height="26" rx="4"/><path d="M7 17h32M15 6v6M31 6v6"/><rect class="a-day" x="20" y="22" width="8" height="7" rx="2"/><circle cx="50" cy="26" r="8"/><path class="a-hand" d="M50 26v-5"/>',
 box:'<path class="a-lid" d="M12 16h40l-4-7H16z"/><path d="M12 16h40v18a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z"/><path class="a-band" d="M32 16v20"/>',
 cook:'<path d="M12 20h40v10a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z"/><path d="M8 24h4M52 24h4"/><path class="a-steam" d="M26 14c0-3 3-3 3-6"/><path class="a-steam a-s2" d="M34 14c0-3 3-3 3-6"/>',
 van:'<g class="a-van"><path d="M6 27V14h24v13z"/><path d="M30 19h9l6 8v0H30z"/><circle cx="15" cy="30" r="3.2"/><circle cx="38" cy="30" r="3.2"/></g><path class="a-road" d="M2 35h60"/>',
 fridge:'<rect x="14" y="6" width="26" height="30" rx="4"/><path class="a-door" d="M27 6h13a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H27z"/><circle class="a-cool" cx="50" cy="20" r="2.4"/><circle class="a-cool a-c2" cx="50" cy="28" r="1.6"/>',
 user:'<circle cx="20" cy="15" r="6"/><path d="M9 34c1.5-6 6-9 11-9s9.5 3 11 9"/><g class="a-menu"><rect x="40" y="13" width="18" height="4" rx="2"/><rect x="40" y="21" width="18" height="4" rx="2"/><rect x="40" y="29" width="12" height="4" rx="2"/></g>',
 bell:'<g class="a-bell"><path d="M32 8a9 9 0 0 1 9 9v7l3 4H20l3-4v-7a9 9 0 0 1 9-9z"/><path d="M28 32a4 4 0 0 0 8 0"/></g><circle class="a-ping" cx="44" cy="11" r="3"/>',
 doc:'<path d="M14 6h24l8 8v22a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2z"/><path d="M38 6v8h8"/><g class="a-lines"><rect x="20" y="20" width="20" height="3.4" rx="1.7"/><rect x="20" y="26" width="16" height="3.4" rx="1.7"/><rect x="20" y="32" width="12" height="3.4" rx="1.7"/></g>',
 macro:'<g class="a-bars"><rect x="12" y="8" width="8" height="28" rx="3"/><rect x="28" y="8" width="8" height="28" rx="3"/><rect x="44" y="8" width="8" height="28" rx="3"/></g><path class="a-base" d="M6 36h52"/>',
 coin:'<g class="a-coin"><circle cx="24" cy="21" r="11"/><path d="M20 17h8M20 25h8M24 14v14"/></g><circle class="a-coin2" cx="42" cy="21" r="8"/>',
 ticket:'<path class="a-tick2" d="M10 12h44v18H10a5 5 0 0 0 0-18z"/><path d="M42 12v18" stroke-dasharray="3 3"/><rect class="a-off" x="16" y="19" width="18" height="4" rx="2"/>',
 card:'<g class="a-card"><rect x="8" y="12" width="36" height="22" rx="4"/><path d="M8 20h36"/><rect x="13" y="25" width="11" height="4" rx="2"/></g><path class="a-check" d="M44 26l5 5 8-11"/>',
 star:'<path class="a-star" d="M32 8l6 12 13 2-9.5 9 2.3 13L32 38l-11.8 6 2.3-13L13 22l13-2z"/>',
 no:'<circle class="a-no" cx="32" cy="21" r="13"/><path class="a-no" d="M23 12l18 18"/>',
 scale:'<path d="M32 8v26M22 34h20"/><g class="a-beam"><path d="M14 14h36"/><path d="M14 14l-5 8h10zM50 14l-5 8h10z"/></g>',
 shaker:'<g class="a-shake"><path d="M24 16h16v18a2 2 0 0 1-2 2H26a2 2 0 0 1-2-2z"/><path d="M26 16l2-6h8l2 6"/><circle cx="30" cy="12" r="1"/><circle cx="34" cy="13" r="1"/></g><circle class="a-grain" cx="46" cy="14" r="1.4"/><circle class="a-grain a-g2" cx="50" cy="18" r="1.4"/>',
 spark:'<path class="a-sp" d="M20 20l3-8 3 8 8 3-8 3-3 8-3-8-8-3z"/><path class="a-sp a-sp2" d="M44 13l1.6-4 1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6z"/><path class="a-sp a-sp3" d="M45 30l1.2-3 1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2z"/>',
 cart:'<g class="a-cart"><path d="M8 11h5l5 17h22l5-13H16"/><circle cx="21" cy="33" r="3"/><circle cx="38" cy="33" r="3"/></g><path class="a-drop" d="M44 6v7"/>',
 plate:'<circle cx="32" cy="21" r="13"/><path class="a-slice" d="M32 21V8a13 13 0 0 1 11.3 6.5z"/><circle cx="32" cy="21" r="5.5"/>',
 door:'<rect x="12" y="6" width="28" height="30" rx="3"/><path class="a-door" d="M40 6a14 14 0 0 1 0 30z"/><circle cx="35" cy="21" r="1.6"/>',
 receipt:'<path d="M16 6h32v28l-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3z"/><g class="a-lines"><rect x="22" y="13" width="20" height="3" rx="1.5"/><rect x="22" y="19" width="14" height="3" rx="1.5"/><rect x="22" y="25" width="17" height="3" rx="1.5"/></g>',
 tag:'<g class="a-tagw"><path d="M10 22l14-14h16v16L26 38a3 3 0 0 1-4 0L10 26a3 3 0 0 1 0-4z"/><circle cx="34" cy="14" r="2.6"/></g>',
 mail:'<rect x="10" y="11" width="40" height="22" rx="4"/><path class="a-flap" d="M10 14l20 12 20-12"/>',
 pack:'<g class="a-swap"><rect x="8" y="14" width="22" height="16" rx="3"/><path d="M8 20h22"/></g><g class="a-swap a-sw2"><path d="M36 14h20v16H36z"/><path d="M40 14v16M48 14v16"/></g>'
};
var ART_CSS='@keyframes a-pulse{0%,100%{opacity:.25}50%{opacity:1}}'+
 '@keyframes a-draw{0%{stroke-dashoffset:26}45%,100%{stroke-dashoffset:0}}'+
 '@keyframes a-rowhi{0%,100%{opacity:.22}25%{opacity:1}}'+
 '@keyframes a-grow{0%{transform:scaleY(.18)}55%,100%{transform:scaleY(1)}}'+
 '@keyframes a-spin{to{transform:rotate(360deg)}}'+
 '@keyframes a-ride{0%{transform:translateX(-6px)}100%{transform:translateX(10px)}}'+
 '@keyframes a-lid{0%,100%{transform:translateY(-5px)}55%{transform:translateY(0)}}'+
 '@keyframes a-steam{0%{opacity:0;transform:translateY(3px)}40%{opacity:1}100%{opacity:0;transform:translateY(-5px)}}'+
 '@keyframes a-swing{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(9deg)}}'+
 '@keyframes a-ping{0%{opacity:0;transform:scale(.4)}60%{opacity:1}100%{opacity:0;transform:scale(1.5)}}'+
 '@keyframes a-openz{0%,100%{transform:rotateY(0)}50%{transform:rotateY(-58deg)}}'+
 '@keyframes a-flip{0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}}'+
 '@keyframes a-slidein{0%{transform:translateX(-9px);opacity:0}45%,100%{transform:none;opacity:1}}'+
 '@keyframes a-fall{0%{transform:translate(0,0);opacity:0}30%{opacity:1}100%{transform:translate(-13px,14px);opacity:0}}'+
 '@keyframes a-shake{0%,100%{transform:rotate(16deg)}50%{transform:rotate(30deg)}}'+
 '@keyframes a-tip{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}'+
 '@keyframes a-pop{0%{transform:scale(.6);opacity:.2}60%{transform:scale(1);opacity:1}100%{transform:scale(1);opacity:1}}'+
 '@keyframes a-swapo{0%,45%{opacity:1}55%,100%{opacity:.2}}'+
 '@keyframes a-swapi{0%,45%{opacity:.2}55%,100%{opacity:1}}'+
 '@keyframes a-motion{0%{opacity:.2;transform:translateX(0)}50%{opacity:1}100%{opacity:.2;transform:translateX(5px)}}'+
 '.at-art{display:block;width:100%;height:46px;margin:2px 0 11px}'+
 '.at-art svg{display:block;height:46px;width:74px;overflow:visible}'+
 '.at-art path,.at-art rect,.at-art circle{fill:none;stroke:#14181F;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round}'+
 '.at-art .a-tr{stroke:#C9CFD8;stroke-dasharray:4 4}.at-art .a-dot{fill:#F0B429;stroke:none}.at-art .a-pin{fill:#14181F}'+
 '.at-art .a-steps rect{fill:#EDF0F5;stroke:none;animation:a-rowhi 2.6s ease-in-out infinite}'+
 '.at-art .a-steps rect:nth-child(2){animation-delay:.28s}.at-art .a-steps rect:nth-child(3){animation-delay:.56s}'+
 '.at-art .a-steps rect:nth-child(4){animation-delay:.84s}.at-art .a-steps rect:nth-child(5){animation-delay:1.12s}'+
 '.at-art .a-rows rect,.at-art .a-lines rect{fill:#14181F;stroke:none}'+
 '.at-art .a-rows rect{animation:a-rowhi 2.4s ease-in-out infinite}'+
 '.at-art .a-rows rect:nth-child(2){animation-delay:.3s}.at-art .a-rows rect:nth-child(3){animation-delay:.6s}'+
 '.at-art .a-lines rect{animation:a-slidein 2.6s ease-out infinite}'+
 '.at-art .a-lines rect:nth-child(2){animation-delay:.22s}.at-art .a-lines rect:nth-child(3){animation-delay:.44s}'+
 '.at-art .a-check{stroke:#F0B429;stroke-width:2.6;stroke-dasharray:26;animation:a-draw 2.4s ease-in-out infinite}'+
 '.at-art .a-ghost{fill:#DFE4EC;stroke:none}'+
 '.at-art .a-day{fill:#F0B429;stroke:none;animation:a-pop 2.4s ease-in-out infinite}'+
 '.at-art .a-hand{transform-origin:50px 26px;animation:a-spin 3.4s linear infinite}'+
 '.at-art .a-lid{animation:a-lid 2.6s ease-in-out infinite}.at-art .a-band{stroke:#F0B429}'+
 '.at-art .a-steam{stroke:#F0B429;animation:a-steam 2.4s ease-out infinite}.at-art .a-s2{animation-delay:.7s}'+
 '.at-art .a-van{animation:a-ride 2.2s ease-in-out infinite alternate}.at-art .a-road{stroke:#DFE4EC;stroke-dasharray:6 5}'+
 '.at-art .a-door{transform-origin:27px 21px;animation:a-openz 3s ease-in-out infinite;transform-style:preserve-3d}'+
 '.at-art .a-cool{fill:#9CC7E8;stroke:none;animation:a-pulse 2s ease-in-out infinite}.at-art .a-c2{animation-delay:.5s}'+
 '.at-art .a-menu rect{fill:#DFE4EC;stroke:none;animation:a-rowhi 2.4s ease-in-out infinite}'+
 '.at-art .a-menu rect:nth-child(2){animation-delay:.3s}.at-art .a-menu rect:nth-child(3){animation-delay:.6s}'+
 '.at-art .a-bell{transform-origin:32px 10px;animation:a-swing 1.9s ease-in-out infinite}'+
 '.at-art .a-ping{fill:#F0B429;stroke:none;animation:a-ping 1.9s ease-out infinite}'+
 '.at-art .a-bars rect{fill:#EDF0F5;stroke:#14181F;transform-origin:center bottom;animation:a-grow 2.6s ease-out infinite}'+
 '.at-art .a-bars rect:nth-child(2){animation-delay:.2s}.at-art .a-bars rect:nth-child(3){animation-delay:.4s}'+
 '.at-art .a-base{stroke:#DFE4EC}'+
 '.at-art .a-coin{transform-origin:24px 21px;animation:a-flip 3.2s ease-in-out infinite;transform-style:preserve-3d}'+
 '.at-art .a-coin2{stroke:#F0B429;animation:a-pulse 2.2s ease-in-out infinite}'+
 '.at-art .a-tick2{fill:#FFF8E8;stroke:#14181F}.at-art .a-off{fill:#F0B429;stroke:none;animation:a-pop 2.4s ease-in-out infinite}'+
 '.at-art .a-card{animation:a-slidein 2.8s ease-out infinite}'+
 '.at-art .a-star{fill:#F0B429;stroke:#14181F;animation:a-pop 2.6s ease-in-out infinite}'+
 '.at-art .a-no{stroke:#D94E4E;animation:a-pulse 2.2s ease-in-out infinite}'+
 '.at-art .a-beam{transform-origin:32px 14px;animation:a-tip 2.8s ease-in-out infinite}'+
 '.at-art .a-shake{transform-origin:32px 36px;animation:a-shake 1.3s ease-in-out infinite}'+
 '.at-art .a-grain{fill:#F0B429;stroke:none;animation:a-fall 1.6s ease-in infinite}.at-art .a-g2{animation-delay:.5s}'+
 '.at-art .a-sp{fill:#F0B429;stroke:none;animation:a-pulse 2s ease-in-out infinite}'+
 '.at-art .a-sp2{animation-delay:.4s}.at-art .a-sp3{animation-delay:.8s}'+
 '.at-art .a-cart{animation:a-ride 2.4s ease-in-out infinite alternate}'+
 '.at-art .a-drop{stroke:#F0B429;animation:a-motion 1.8s ease-in-out infinite}'+
 '.at-art .a-slice{fill:#F0B429;stroke:#14181F;transform-origin:32px 21px;animation:a-pop 2.6s ease-in-out infinite}'+
 '.at-art .a-flap{stroke:#F0B429;stroke-dasharray:60;animation:a-draw 2.8s ease-in-out infinite}'+
 '.at-art .a-swap{animation:a-swapo 3.2s ease-in-out infinite}.at-art .a-sw2{animation:a-swapi 3.2s ease-in-out infinite}'+
 '.at-art .a-tagw{animation:a-slidein 2.8s ease-out infinite}'+
 '@media(prefers-reduced-motion:reduce){.at-art *{animation:none!important}}';

(function(){
 var PAGE='checkout',VER='v1',TOURS={"main": [{"sel": null, "title": "Checkout, in plain steps", "text": "Nothing is charged until the last button.", "art": "doc"}, {"sel": "#optDelivery", "title": "How you want to receive your Meals?", "text": "Self Pick-Up ( FREE ) OR Delivery ( FEES APPLY )", "art": "van"}, {"sel": "#date", "title": "Schedule to receive Meals", "text": "Select your Date &amp; Time.", "art": "cal"}, {"sel": "#hoDoor", "title": "Door-to-Door Service", "text": "Additional fees applied.", "art": "door"}, {"sel": "#pkBento", "title": "Select your Packaging Method", "text": "MAP Bento Box with better Texture.<br>Vacuum Packed save spaces.<br>( P.S. Both go into Microwave, not recommended to store in Freezer. )", "art": "pack"}, {"sel": "#remember", "title": "Save yourself the typing", "text": "Leave this ticked and your details come back next time.", "art": "tick", "pad": 6}, {"sel": "#refCode", "title": "A code from a gym or coach?", "text": "Enter it and you earn extra AERA Points on this order.", "art": "tag"}, {"sel": "#apBox", "title": "Your points", "text": "5 points for every RM 1 you spend on meals.", "art": "coin"}, {"sel": "#vouchBox", "title": "Vouchers you own", "text": "Press Use Voucher and the rider fee comes off.", "art": "ticket"}, {"sel": "#payBtn", "title": "Pay", "text": "Card, FPX Online Banking OR GrabPay.", "art": "card"}]},HELP='How Checkout Works';
 function key(k){return 'aera.tour.'+PAGE+'.'+k+'.'+VER}
 function seen(k){try{return localStorage.getItem(key(k))==='1'}catch(e){return true}}
 function mark(k){try{localStorage.setItem(key(k),'1')}catch(e){}}
 var $=function(s){return document.querySelector(s)};
 var S={k:'',i:0,steps:[],anim:false,pct:0},mask,ring,card;
 function vis(e){if(!e)return false;var r=e.getBoundingClientRect();
  if(!r.width&&!r.height)return false;
  var cs=getComputedStyle(e);return cs.visibility!=='hidden'&&cs.display!=='none'}
 /* A step may name a list of targets -- the desktop control first, then the phone one it
    hides behind. The first that is actually on screen is the one we ring. */
 function stEl(st){
  if(!st||!st.sel)return null;
  var a=(typeof st.sel==='string')?[st.sel]:st.sel;
  for(var i=0;i<a.length;i++){var e=$(a[i]);if(vis(e))return e}
  return null}
 function build(){
  if(mask)return;
  /* the little pictures bring their own stylesheet */
  if(typeof ART_CSS==='string'&&!document.getElementById('atArtCss')){
   var ac=document.createElement('style');ac.id='atArtCss';ac.textContent=ART_CSS;
   (document.head||document.documentElement).appendChild(ac)}
  mask=document.createElement('div');mask.className='at-mask';
  ring=document.createElement('div');ring.className='at-ring';mask.appendChild(ring);
  card=document.createElement('div');card.className='at-card';
  document.body.appendChild(mask);document.body.appendChild(card);
  mask.addEventListener('click',function(e){if(e.target===mask)next()});
  document.addEventListener('keydown',function(e){
   if(!S.steps.length)return;
   if(e.key==='Escape'){e.preventDefault();stop(false)}
   else if(e.key==='ArrowRight'||e.key==='Enter'){e.preventDefault();next()}
   else if(e.key==='ArrowLeft'){e.preventDefault();back()}});
  addEventListener('resize',place);addEventListener('scroll',place,true)}
 function paint(){
  var st=S.steps[S.i],n=S.steps.length;if(!st)return;
  var pct=Math.round((S.i+1)/n*100);
  card.innerHTML='<div class="at-tip"></div>'+
   '<button class="at-x" type="button" aria-label="Close walkthrough">×</button>'+
   '<div class="at-prog"><i style="width:'+S.pct+'%"></i></div>'+
   '<div class="at-n">Step '+(S.i+1)+' of '+n+'</div>'+
   (st.art&&ART[st.art]?'<div class="at-art"><svg viewBox="0 0 64 40" aria-hidden="true">'+ART[st.art]+'</svg></div>':'')+
   '<div class="at-t">'+st.title+'</div><div class="at-b">'+st.text+'</div>'+
   '<div class="at-f">'+(S.i?'<button class="at-btn at-o" type="button" data-a="back">Back</button>'
     :'<button class="at-btn at-o" type="button" data-a="skip">Skip</button>')+
   '<button class="at-btn" type="button" data-a="next">'+(S.i===n-1?'Got It':'Next')+'</button></div>';
  var fill=card.querySelector('.at-prog i');
  requestAnimationFrame(function(){if(fill)fill.style.width=pct+'%'});
  S.pct=pct;
  card.querySelector('.at-x').onclick=function(){stop(false)};
  [].forEach.call(card.querySelectorAll('[data-a]'),function(b){
   b.onclick=function(){var a=b.getAttribute('data-a');a==='next'?next():a==='back'?back():stop(false)}})}
 function tipAt(x,where,cw){
  var t=card.querySelector('.at-tip');if(!t)return;
  if(!where){t.style.display='none';return}
  t.style.display='block';t.style.left=Math.min(Math.max(16,x),cw-30)+'px';
  t.style.top=where==='below'?'-7px':'';t.style.bottom=where==='above'?'-7px':''}
 function animate(){
  if(!S.anim)return;S.anim=false;
  card.classList.remove('at-anim');void card.offsetWidth;card.classList.add('at-anim')}
 function place(){
  if(!S.steps.length)return;
  var st=S.steps[S.i];if(!st)return;
  var t=stEl(st);
  if(!t){ring.style.display='none';mask.classList.add('at-dim');
   card.className='at-card on at-mid';tipAt(0,null,0);animate();return}
  ring.style.display='';mask.classList.remove('at-dim');
  var r=t.getBoundingClientRect(),pad=st.pad==null?10:st.pad;
  /* a section taller than the screen cannot be spotlit -- ring what is on screen */
  var y1=Math.max(6,r.top-pad),y2=Math.min(innerHeight-6,r.bottom+pad);
  var x1=Math.max(6,r.left-pad),x2=Math.min(innerWidth-6,r.right+pad);
  ring.style.left=x1+'px';ring.style.top=y1+'px';
  ring.style.width=Math.max(24,x2-x1)+'px';ring.style.height=Math.max(24,y2-y1)+'px';
  if(innerWidth<640){card.className='at-card on at-sheet';tipAt(0,null,0);animate();return}
  card.className='at-card on';
  var cw=Math.min(340,innerWidth-24);card.style.width=cw+'px';
  var ch=card.offsetHeight||190;
  var below=r.bottom+18,above=r.top-ch-18,where='below';
  var top=below;
  if(below+ch>innerHeight-10){if(above>10){top=above;where='above'}else{top=Math.max(10,(innerHeight-ch)/2);where=null}}
  top=Math.min(Math.max(10,top),Math.max(10,innerHeight-ch-10));
  var left=Math.min(Math.max(12,r.left+r.width/2-cw/2),innerWidth-cw-12);
  card.style.top=top+'px';card.style.left=left+'px';
  tipAt(r.left+r.width/2-left-7,where,cw);
  animate()}
 function show(){
  var st=S.steps[S.i];
  if(!st)return stop(true);
  var t=stEl(st);
  if(st.sel&&!t){S.i++;return show()}
  paint();S.anim=true;
  if(t){
   /* the shop sets scroll-behavior:smooth, so scroll by hand and instantly -- a tour that
      lands before the page finishes gliding points at the wrong thing */
   var r=t.getBoundingClientRect();
   if(r.top<90||r.bottom>innerHeight-90){
    var keep=Math.min(r.height,innerHeight*0.8);
    var y=(window.pageYOffset||0)+r.top-Math.max(20,(innerHeight-keep)/2);
    y=Math.max(0,y);
    try{window.scrollTo({top:y,behavior:'instant'})}catch(e){window.scrollTo(0,y)}}
   [40,200,520].forEach(function(ms){setTimeout(place,ms)})}
  place()}
 function next(){if(S.i>=S.steps.length-1)return stop(true);S.i++;show()}
 function back(){if(!S.i)return;S.i--;show()}
 function stop(done){
  S.steps=[];S.pct=0;mask.classList.remove('on');card.classList.remove('on');
  if(S.k)mark(S.k);S.k=''}
 function start(k,force){
  var t=TOURS[k];if(!t||!t.length)return;
  build();
  /* some pages keep the thing being explained behind a panel -- let the page open it first */
  if(typeof tourPrep==='function'){try{tourPrep(k,force)}catch(e){}}
  var steps=[],last=null;
  t.forEach(function(st){
   var e=stEl(st);
   if(st.sel&&!e)return;                 /* its control is not on this screen */
   if(e&&e===last)return;                /* the step before it rang the same control */
   last=e;steps.push(st)});
  if(!steps.length)return;
  /* a tour that comes down to its opening card alone teaches nothing : on a first visit stay
     out of the way and leave it for the Help button, which passes force */
  if(!force&&steps.length<2)return;
  S.k=k;S.i=0;S.steps=steps;S.pct=0;
  mask.classList.add('on');card.classList.add('on');
  show()}
 /* Ordering needs an Account, so the walkthrough waits : a signed-out visitor is shown the
   Sign Up panel first, and the instructions only run once they are signed in. */
function atSignedIn(){try{if(typeof signedIn==='function')return !!signedIn()}catch(e){}
 try{var a=JSON.parse(localStorage.getItem('aera.account')||'null');return !!(a&&a.email)}catch(e){}
 return false}
function auto(k){if(seen(k))return;
 if(!atSignedIn()){
  setTimeout(function(){ if(atSignedIn())return auto(k);
   try{if(typeof renderAuthGate==='function')renderAuthGate()}catch(e){}
   var g=document.getElementById('authGate');
   if(g&&!g.dataset.atShown){g.dataset.atShown='1';try{g.scrollIntoView({behavior:'smooth',block:'center'})}catch(e){}}
  },1200);
  return}
 setTimeout(function(){start(k)},900)}
 function which(){return (typeof tourWhich==='function'&&tourWhich())||Object.keys(TOURS)[0]}
 function helpBtn(){
  var help=document.createElement('button');help.type='button';help.className='at-help';help.id='atHelp';
  help.innerHTML='<i>?</i> '+HELP;
  help.onclick=function(){start(which(),true)};
  document.body.appendChild(help)}
 window.AERATOUR={start:start,auto:auto,seen:seen,stop:stop};
 function boot(){build();helpBtn();auto(which())}
 if(document.readyState==='loading')addEventListener('DOMContentLoaded',boot);else boot();
})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
window.AERA_I18N={};window.AERA_I18N_RE=[];
(function(){
 var KEY='aera_lang',lang='en';
 try{lang=localStorage.getItem(KEY)||'en'}catch(e){}
 window.aeraLang=function(){var n=(lang==='zh')?'en':'zh';try{localStorage.setItem(KEY,n)}catch(e){}location.reload()};
 if(lang!=='zh')return;
 document.documentElement.setAttribute('data-lang','zh');
 var D=window.AERA_I18N,R=window.AERA_I18N_RE,done=new WeakSet();
 function tr(s){var k=String(s).replace(/\s+/g,' ').trim();if(!k)return null;
  if(Object.prototype.hasOwnProperty.call(D,k))return D[k];
  for(var i=0;i<R.length;i++){if(R[i][0].test(k))return k.replace(R[i][0],R[i][1])}
  return null}
 var SKIP={SCRIPT:1,STYLE:1,NOSCRIPT:1,TEXTAREA:1};
 function node(n){if(done.has(n))return;var p=n.parentElement;if(!p||SKIP[p.tagName])return;if(p.closest('#langSw'))return;
  var t=tr(n.nodeValue);if(t===null)return;done.add(n);
  n.nodeValue=n.nodeValue.replace(/^(\s*)[\s\S]*?(\s*)$/,'$1'+t.replace(/\$/g,'$$')+'$2')}
 var ATTR=['placeholder','title','aria-label','alt','value'];
 function attrs(el){if(!el.getAttribute)return;if(el.closest&&el.closest('#langSw'))return;
  for(var i=0;i<ATTR.length;i++){var a=ATTR[i];if(!el.hasAttribute(a))continue;
   if(a==='value'&&!/^(button|submit|reset)$/i.test(el.type||''))continue;
   var t=tr(el.getAttribute(a));if(t!==null)el.setAttribute(a,t)}}
 function walk(root){if(root.nodeType===3){node(root);return}if(root.nodeType!==1)return;
  attrs(root);root.querySelectorAll('*').forEach(attrs);
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode())node(n)}
 var q=false;
 function run(){q=false;walk(document.body);var t=tr(document.title);if(t!==null)document.title=t}
 function queue(){if(q)return;q=true;requestAnimationFrame(run)}
 window.aeraRetranslate=queue;
 function boot(){run();new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){if(ms[i].addedNodes.length||ms[i].type==='characterData'){queue();return}}}).observe(document.body,{childList:true,subtree:true,characterData:true});setInterval(queue,1200)}
 if(document.readyState==='loading')addEventListener('DOMContentLoaded',boot);else boot();
})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{"Tap to use Your First Order Voucher":"点击使用首单优惠券","Tap the card again to save it for later.":"再点一次卡片，优惠券留到下次。","Pauses AERA Points, the Birthday Treat and Delivery Vouchers on this Order.":"使用后，这张订单的 AERA 积分、生日优惠和运费券会暂停。","Tap the card again to keep your points for next time.":"再点一次卡片，积分就留到下次。","Paused on this Order while the First Order Voucher is on. Tap here to use your AERA Points instead, and the Voucher is saved for later.":"使用首单优惠券时，这张订单的积分暂停。点这里改用 AERA 积分，优惠券会留到下次。","Use My Points Instead":"改用我的积分","Your Personalised Meal Plan":"您的个人定制餐单","Your Order":"您的订单","Edit Plan":"修改餐单","Add Other Meals":"加购其他餐点","← Back to My Meal Plan":"← 返回我的餐单","Loading your Meals…":"正在加载您的餐点…","Chef-built Meal":"主厨搭配餐","Remove":"移除","Edit plan":"修改餐单"});
AERA_I18N_RE.push([/^Using Your First Order Voucher · (RM [\d.]+) OFF$/,'正在使用首单优惠券 · 减 $1']);
AERA_I18N_RE.push([/^Using ([\d,]+ AP) · (RM [\d.]+) OFF$/,'正在使用 $1 · 减 $2'],[/^Tap to use ([\d,]+ AP) · (RM [\d.]+) OFF$/,'点击使用 $1 · 减 $2'],[/^The most this Order allows \( (\d+)% of it \)\.$/,'这张订单最多可用（订单的 $1%）。']);
AERA_I18N_RE.push([/^Day (\d+)$/,"第 $1 天"],[/^Meal (\d+)$/,"第 $1 餐"],[/^(\d+) Days · (\d+) Meals? a Day · (\d+) Meals$/,"$1 天 · 每天 $2 餐 · 共 $3 餐"],[/^Personalised Plan · (\d+) Days x (\d+) Meals$/,"个人定制餐单 · $1 天 × 每天 $2 餐"],[/^(\d+) Meals · Packaging included ·$/,"共 $1 餐 · 已含包装 ·"]);
Object.assign(window.AERA_I18N,{
"Return to Homepage":"返回首页","Home":"首页","Merchandise":"周边商品","My Account":"我的账户","Cart ·":"购物车 ·","AERA Meal Prep":"AERA Meal Prep",
"Order online":"线上订购","Everything is cooked to Order, weighed to the gram and MAP-Packed to stay fresh for 7 Days in the chiller. Choose Self Pick-Up or Rider Delivery ( Lalamove or Grab ) at Checkout.":"所有餐点都是接单后现做，称到克，并以 MAP 保鲜包装，冷藏可放 7 天。结账时可选自取或骑手配送（Lalamove 或 Grab）。",
"Meal Bundles":"一周套餐","Fat Loss Meals":"减脂餐","Mass Gain Meals":"增肌餐","All Meals":"全部餐点","À la Carte":"单点","Fat Loss Bundle":"减脂套餐","Mass Gain Bundle":"增肌套餐","7 Chef-Selected Fat Loss Meals":"7 道主厨挑选的减脂餐","7 Chef-Selected Mass Gain Meals":"7 道主厨挑选的增肌餐","May Contain":"可能含有","🦐 Prawn":"🦐 虾","🌶 Some Are Spicy":"🌶 部分偏辣","🥛 Dairy":"🥛 乳制品","🥜 Nuts":"🥜 坚果","Bigger Portions, Higher Carbs":"份量更大，碳水更高","Add":"加入","Most Popular":"最受欢迎","Lean Proteins, Oil-Free Vegetables":"低脂蛋白质，无油蔬菜","14 Different Fat Loss Meals — No Repeats":"14 道不重复的减脂餐","14 Different Mass Gain Meals — No Repeats":"14 道不重复的增肌餐","800 KCALs - 1,260 KCALs, 40 g - 60 g Protein each":"每餐 800 – 1,260 大卡，蛋白质 40 – 60 克","These are the 7 meals the kitchen packs for this bundle — one a day for seven days. Tell us in the kitchen notes at checkout if there is one you would rather not have and we will swap it.":"这是厨房为此套餐准备的 7 道餐点 — 七天，每天一份。若有不想要的，请在结账时的厨房备注中告诉我们，我们会替换。","These are the 14 meals the kitchen packs for this bundle — two a day for seven days, every one different. Tell us in the kitchen notes at checkout if there is one you would rather not have and we will swap it.":"这是厨房为此套餐准备的 14 道餐点 — 七天，每天两份，道道不同。若有不想要的，请在结账时的厨房备注中告诉我们，我们会替换。","Prices in Malaysian Ringgit, packaging included. Serving weights are Raw ( Before cooking ). That's how our Kitchen weighs every portion. Each Meal carries badges for Beef, Dairy, Nuts, Prawn and how Spicy it is. They cover our own Kitchen. Everything is cooked in one Kitchen, so we cannot promise a Meal is free of traces. If you have a serious Allergy, message us on WhatsApp before ordering.":"价格以马币计算，已含包装。标示的份量为生重（烹调前），这是我们厨房称重的方式。每道餐点都标有牛肉、乳制品、坚果、虾及辣度标签，这些仅涵盖我们自己的厨房。所有餐点在同一个厨房烹调，因此无法保证完全不含微量成分。若您有严重过敏，请在下单前用 WhatsApp 联系我们。",
"← Back to Menu":"← 返回菜单","Your Order":"您的订单","Packaging":"包装","· Choose 1":"· 选择 1 项","MAP Bento Box":"MAP 保鲜餐盒","Oxygen replaced with Nitrogen / CO₂, blend and Top-Sealed. Food is never compressed. Keep chilled, 7 Days Shelf Life.":"抽走氧气，换成氮气 / 二氧化碳混合气体后封膜。食物不受挤压。请冷藏，保质期 7 天。","Vacuum Packed":"真空包装","Same freshness, flatter pack. Takes far less fridge space, compresses the food slightly. Can be frozen, but not recommended.":"一样新鲜，包装更扁平。占用冰箱空间少得多，但食物会被稍微压实。可以冷冻，但不建议。","Fulfilment":"取餐方式","Self Pick-Up":"自取","35, Jalan Equine 9A, Taman Equine, 43300 Seri Kembangan · Daily 9 AM - 5 PM":"35, Jalan Equine 9A, Taman Equine, 43300 Seri Kembangan · 每天上午 9 点至下午 5 点","FREE":"免费","Rider Delivery":"骑手配送","Lalamove or Grab Rider brings your whole Order in one trip, anywhere in Klang Valley. Fee calculated from your address. Compare both Couriers below.":"Lalamove 或 Grab 骑手一趟把整份订单送到巴生谷任何地点。费用按您的地址计算，可在下方比较两家快递。","from RM":"起价 RM","Delivery Address":"配送地址","Unit / House No. *":"单位 / 门牌号 *","Address Line 1 *":"地址第 1 行 *","Address Line 2":"地址第 2 行","From your account":"来自您的账户","Filled in from your account — press Check Delivery Fee.":"已按您账户中的地址填写 — 请按「查询配送费」。","Unit / House No., Building, Street":"单位 / 门牌号、大厦、街道","Taman / Area ( optional )":"花园 / 地区（选填）","Pick your Address from the suggestions, then fill in Address Line 1 ( Unit / House No. ) and Postcode — both are required.":"从建议清单中选择地址，然后填写地址第 1 行（单位 / 门牌号）及邮编（两项必填）。","Please enter Address Line 1 ( Unit / House No. ).":"请填写地址第 1 行（单位 / 门牌号）。","Postcode *":"邮编 *","e.g. A-12-3 or No. 8":"例如 A-12-3 或 No. 8","e.g. 51200":"例如 51200","Pick your Address from the suggestions, then fill in your Unit / House No. and Postcode — both are required.":"从建议清单中选择地址，然后填写单位 / 门牌号及邮编（两项必填）。","Please enter your Unit / House No.":"请填写单位 / 门牌号。","Please enter your 5-digit Postcode.":"请填写 5 位数邮编。","Pick your Address from the suggestions, then add your Unit / Floor in the notes if needed.":"从建议清单中选择地址，如需要可在备注中补上单位 / 楼层。","Check Delivery Fee":"查询配送费","Courier":"快递","· Rates shown for Normal Delivery / Door-to-Door":"· 费率为普通配送 / 送到门","Normal from RM 6 · Door-to-Door from RM 11":"普通配送 RM 6 起 · 送到门 RM 11 起","Normal from RM 7 · Door-to-Door from RM 12":"普通配送 RM 7 起 · 送到门 RM 12 起","Delivery Service":"配送服务","Normal Delivery":"普通配送","Rider hands over at your lobby, guard house or a collection point you name in the notes.":"骑手会在大堂、警卫室，或您在备注中指定的取件点交货。","Door-to-Door Service":"送到门服务","Rider brings the order right to your door. Normal Delivery + RM 2.00 by motorcycle or + RM 5.00 by car — this order goes by car (+ RM 5.00).":"骑手直接送到您家门口。普通配送费 + RM 2.00（摩托）或 + RM 5.00（轿车）— 此订单以轿车配送（+ RM 5.00）。","Pick-Up Date":"自取日期","Time Slot":"时段","9 AM - 11 AM":"上午 9 点 - 11 点","11 AM - 1 PM":"上午 11 点 - 下午 1 点","1 PM - 3 PM":"下午 1 点 - 3 点","3 PM - 5 PM":"下午 3 点 - 5 点",
"Your Details":"您的资料","For your Receipt, Order Tracking and AERA Points. Your AERA Points appear below as you type.":"用于收据、订单查询与 AERA 积分。输入时下方会显示您的积分。","So the Kitchen can reach you about this Order.":"方便厨房就这笔订单联系您。","Remember my details on this device so I don't type them next time":"在这台设备记住我的资料，下次不必再输入","Referral Code":"推荐码","· Optional":"· 选填","Have a Code from a Gym, Studio or Coach? Enter it and you earn extra AERA Points on your Meals.":"有健身房、工作室或教练给的代码吗？输入后可为您的餐点赚取额外 AERA 积分。","AERA Points":"AERA 积分","First Order Voucher":"首单优惠券","10% OFF up to RM 50.00":"9 折，最高折抵 RM 50.00","Your First Order Voucher — 10% OFF, is applied to this Order.":"您的首单优惠券 — 9 折，已套用于此订单。","Save It For Later":"留待下次使用","Notes for the Kitchen / Rider":"给厨房 / 骑手的备注","Subtotal":"小计","First Order Voucher · 10% OFF":"首单优惠券 · 9 折","AERA Credit":"AERA 余额","Cost Price":"成本价","· code":"· 代码","at cost":"按成本","Payment Processing":"支付手续费","🎂 Birthday treat · 15% off meals (once a year)":"🎂 生日礼遇 · 餐点 85 折（每年一次）","Total":"总计","Corporate account":"企业账户","Order On Account":"挂账下单","Ordering on account charges nothing here — the kitchen gets the order and the invoice follows on your terms. Paying by card or FPX now is always an option too.":"挂账下单在此不会收取任何费用 — 厨房会收到订单，发票依您们的账期寄出。当然，现在用卡或 FPX 付款也可以。","Cost price code ( if you have one )":"成本价代码（如果您有）","Apply":"套用","Card, FPX Online Banking or GrabPay via Stripe. We never see your card details.":"通过 Stripe 以信用卡、FPX 网上银行或 GrabPay 付款。我们不会看到您的卡片资料。","Close":"关闭","View Order →":"查看订单 →","Terms & Conditions":"条款与细则","How Checkout Works":"结账流程说明",
"Start typing your address…":"开始输入您的地址…","Your Name":"您的姓名","Email":"电邮","Mobile":"手机号码","e.g. AERA-GYMNAME":"例如 AERA-GYMNAME","e.g. less spicy, leave at guard house, call on arrival":"例如：少辣、放在警卫室、抵达时来电","Enter code":"输入代码","Order — AERA Meal Prep":"订购 — AERA Meal Prep"
});
window.AERA_I18N_RE.push(
[/^(\d+) KCALs · (\d+) g P$/,"$1 大卡 · 蛋白质 $2 克"],[/^(\d+) kcal$/,"$1 大卡"],[/^(\d+) g protein$/,"蛋白质 $1 克"],[/^RM ([\d,.]+) per Meal$/,"每餐 RM $1"],[/^See the (\d+) Meals Inside$/,"查看内含的 $1 道餐点"],[/^7 Days x (\d+) Meals?$/,"7 天 × 每天 $1 餐"],[/^Fat Loss Bundle · 7 Days x (\d+) Meals?$/,"减脂套餐 · 7 天 × 每天 $1 餐"],[/^Mass Gain Bundle · 7 Days x (\d+) Meals?$/,"增肌套餐 · 7 天 × 每天 $1 餐"],[/^(.+) \( Fat Loss \)$/,"$1（减脂）"],[/^(.+) \( Mass Gain \)$/,"$1（增肌）"],[/^RM ([\d,.]+) × (\d+) · (\d+) boxes$/,"RM $1 × $2 · $3 盒"],[/^Packaging Fee · (.+) · (\d+) Boxes$/,"包装费 · $1 · $2 盒"],[/^AERA Points discount · ([\d,]+) AP$/,"AERA 积分折抵 · $1 AP"],[/^Pay RM ([\d,.]+) Securely$/,"安全支付 RM $1"],[/^(\d+) items?$/,"$1 件"],[/^My Account · (.+)$/,"我的账户 · $1"],[/^Cart · (\d+)$/,"购物车 · $1"],[/^· Signed in as (.+)$/,"· 已登录：$1"],[/^Order before 12:45 PM for the earliest slot 2 Days later\. Earliest available : (.+)$/,"中午 12:45 前下单，最早可选 2 天后的时段。最早可选：$1"],[/^No points yet for (.+) — this order earns ([\d,]+) AP, ready to use next time\.$/,"$1 目前还没有积分 — 这笔订单可获得 $2 AP，下次即可使用。"],[/^You earn ([\d,]+) AP with this Order \( 5 AP per RM 1 on Meals · 100 AP = RM 1\.00 OFF future Orders \)\.$/,"这笔订单可获得 $1 AP（餐点每 RM 1 得 5 AP · 100 AP = 下次订单折抵 RM 1.00）。"],[/^That is RM ([\d,.]+) OFF your Meals\. It stands on its own, so AERA Points, the Birthday Treat and Delivery Vouchers are paused while it is on\.$/,"相当于餐点折抵 RM $1。此优惠单独使用，启用期间 AERA 积分、生日礼遇与配送优惠券会暂停。"]
);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Skip":"略过","Next":"下一步","Back":"上一步","Done":"完成","Got it":"知道了","Got It":"知道了","GOT IT":"知道了","Finish":"完成",
"Checkout, in plain steps":"结账流程，一步一步来","Nothing is charged until the last button.":"在按下最后一个按钮之前，不会扣任何款。","How you want to receive your Meals?":"您想怎么拿到餐点？","Self Pick-Up ( FREE ) OR Delivery ( FEES APPLY )":"自取（免费）或配送（需付费）","Schedule to receive Meals":"安排收餐时间","Select your Date & Time.":"选择日期与时段。","Additional fees applied.":"需额外付费。","Select your Packaging Method":"选择您的包装方式","MAP Bento Box with better Texture.":"MAP 保鲜餐盒，口感更好。","Vacuum Packed save spaces.":"真空包装更省空间。","( P.S. Both go into Microwave, not recommended to store in Freezer. )":"（附注：两种都可微波加热，不建议冷冻保存。）","Save yourself the typing":"省去重复输入","Leave this ticked and your details come back next time.":"保持勾选，下次您的资料就会自动带出。","A code from a gym or coach?":"有健身房或教练给的代码？","Enter it and you earn extra AERA Points on this order.":"输入后，这笔订单可获得额外的 AERA 积分。","Your points":"您的积分","5 points for every RM 1 you spend on meals.":"餐点每消费 RM 1 可得 5 点积分。","Vouchers you own":"您拥有的优惠券","Press Use Voucher and the rider fee comes off.":"按「使用优惠券」，骑手配送费就会扣除。","Pay":"付款","Card, FPX Online Banking OR GrabPay.":"信用卡、FPX 网上银行或 GrabPay。"
});
window.AERA_I18N_RE.push([/^Step (\d+) of (\d+)$/i,"第 $1 步，共 $2 步"]);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Add at least one meal first.":"请先至少加入一餐。","Please sign in first.":"请先登录。","Please enter a contact name.":"请输入联络人姓名。","Please enter a valid email.":"请输入有效的电邮地址。","Please choose a date.":"请选择日期。","Please enter the delivery address.":"请输入配送地址。","Please enter your full address including postcode.":"请输入完整地址，包含邮区编号。","Address lookup failed — please try again.":"地址查询失败 — 请再试一次。","Please enter your name.":"请输入您的姓名。","Please enter a valid email for your receipt.":"请输入有效的电邮地址以接收收据。","Please enter your mobile number — the Rider needs it to reach you.":"请输入手机号码 — 骑手需要用它联系您。","Please enter your mobile number so the Kitchen can reach you about this Order.":"请输入手机号码，方便厨房就这笔订单联系您。","Please choose Lalamove or Grab.":"请选择 Lalamove 或 Grab。","Please choose normal delivery or door-to-door service.":"请选择普通配送或送到门服务。","Please sign in or create an account before you order — it is how we keep your order, your points and your addresses together.":"下单前请先登录或注册账户 — 这样才能把您的订单、积分与地址放在一起。","Ordering on account is not switched on for this page yet. Please WhatsApp us and we will raise it for you.":"这个页面尚未开启挂账下单。请用 WhatsApp 联系我们，我们会为您处理。","Priced at cost — food, packaging and the payment fee. Delivery is charged as normal. Points and credit do not apply on a cost price order.":"按成本计价 — 含食材、包装与支付手续费。配送费照常计算。成本价订单不适用积分与余额。","Checkout is not available right now. Please WhatsApp us to order.":"目前无法结账。请用 WhatsApp 联系我们下单。","Could not start payment. Please try again or WhatsApp us.":"无法启动付款。请再试一次，或用 WhatsApp 联系我们。","Payment was not completed — your order is still here whenever you are ready.":"付款尚未完成 — 您的订单还在，随时可以继续。","Loading the a la carte list…":"正在载入单点清单…","Nothing in this group yet.":"这个分类目前还没有内容。","Enter your address and press “Check Delivery Fee” first.":"请先输入地址并按「查询配送费」。","We couldn't find that address on the map. Try adding the area, postcode and city ( e.g. \"Bangsar South, 59200 Kuala Lumpur\" ).":"地图上找不到这个地址。请补上区域、邮区编号与城市（例如「Bangsar South, 59200 Kuala Lumpur」）。","Please enter your email address.":"请输入您的电邮地址。","No items in cart.":"购物车里没有项目。","An email address is required to complete checkout.":"完成结账需要电邮地址。"
});
window.AERA_I18N_RE.push(
[/^That address is about ([\d.]+) km from our kitchen — outside our delivery area\. Please choose self pick-up or WhatsApp us\.$/,"这个地址距离我们的厨房约 $1 公里 — 超出配送范围。请选择自取，或用 WhatsApp 联系我们。"],[/^Your saved address is about ([\d.]+) km from our kitchen — outside our delivery area\.$/,"您保存的地址距离我们的厨房约 $1 公里 — 超出配送范围。"],[/^Matched: (.+)$/,"已匹配：$1"]
);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
(function(){var D=window.AERA_I18N;var P=[
["Pan Seared Spicy Chicken Breast","香煎香辣鸡胸"],["Baked Spicy Chicken Breast","烤香辣鸡胸"],["Pan Seared Indian Curry Chicken Breast","香煎印度咖喱鸡胸"],["Baked Indian Curry Chicken Breast","烤印度咖喱鸡胸"],["Pan Seared Smoked Paprika Chicken Breast","香煎烟熏红椒粉鸡胸"],["Baked Smoked Paprika Chicken Breast","烤烟熏红椒粉鸡胸"],["Pan Seared Salt & Pepper Chicken Breast","香煎椒盐鸡胸"],["Baked Salt & Pepper Chicken Breast","烤椒盐鸡胸"],["Pan Seared Onion Garlic Chicken Breast","香煎蒜香洋葱鸡胸"],["Baked Onion Garlic Chicken Breast","烤蒜香洋葱鸡胸"],["Pan Seared Ginger Garlic Chicken Breast","香煎姜蒜鸡胸"],["Baked Ginger Garlic Chicken Breast","烤姜蒜鸡胸"],["Tandoori Chicken","印度烤鸡"],["Chicken Katsu","日式炸鸡扒"],["Grilled Teriyaki Chicken Breast","照烧烤鸡胸"],["Grilled Teriyaki Chicken Chop","照烧烤鸡扒"],["Grilled Chicken Chop","烤鸡扒"],["Chicken Breast Meatball","鸡胸肉丸"],
["Pan Seared Salmon","香煎三文鱼"],["Baked Salmon","烤三文鱼"],["Pan Seared Barramundi Fillet","香煎金目鲈鱼柳"],["Baked Barramundi Fillet","烤金目鲈鱼柳"],["Pan Seared Toman Fish Sliced","香煎多曼鱼片"],["Baked Toman Fish Sliced","烤多曼鱼片"],["Pan Seared Halibut","香煎比目鱼"],["Baked Halibut","烤比目鱼"],["Pan Seared Salmon Cubes","香煎三文鱼粒"],["Baked Salmon Cubes","烤三文鱼粒"],["Pan Seared Tiger Prawn","香煎大虎虾"],["Baked Tiger Prawn","烤大虎虾"],["Stir Fried Vannamei Prawn","炒白虾"],["Vannamei Prawn ( Oil-Free )","白虾（无油）"],["Sautéed Beef Sliced","煎炒牛肉片"],
["Stir Fried Ground Chicken Breast ( Plain )","炒鸡胸肉碎（原味）"],["Bolognese Chicken Breast","肉酱鸡胸肉碎"],["Stir Fried Ground Chicken Breast w/ Mushroom Gravy","炒鸡胸肉碎配蘑菇酱"],["Stir Fried Ground Chicken Breast w/ Black Pepper Sauce","炒鸡胸肉碎配黑胡椒酱"],["Stir Fried Kung Pao Chicken Breast","宫保鸡胸"],["Stir Fried Kung Pao Chicken Thigh","宫保鸡腿肉"],["Stir Fried Kung Pao Toman Fish Sliced","宫保多曼鱼片"],["Sweet & Sour Chicken Breast","咕佬鸡胸"],["Sweet & Sour Chicken Thigh","咕佬鸡腿肉"],["Gingered Spring Onion Chicken Sliced","姜葱鸡肉片"],["Gingered Spring Onion Toman Fish Sliced","姜葱多曼鱼片"],["Gingered Spring Onion Beef Sliced","姜葱牛肉片"],["Gam Hiong Chicken Breast","甘香鸡胸"],["Gam Hiong Chicken Thigh","甘香鸡腿肉"],["Curry Chicken Sliced","咖喱鸡肉片"],["Green Curry Chicken Sliced","青咖喱鸡肉片"],["Soy Garlic Chicken Sliced","蒜香酱油鸡肉片"],["Soy Garlic Beef Sliced","蒜香酱油牛肉片"],["Pad Krapow Chicken Breast","泰式九层塔鸡胸肉沫"],["Black Pepper Chicken Sliced","黑胡椒鸡肉片"],["Black Pepper Beef Sliced","黑胡椒牛肉片"],["Classic Meal Prep Chicken Sliced","经典备餐鸡肉片"],["Stir Fried Mushroom Chicken Casserole","冬菇焖鸡片"],["Imitation Salted Egg Yolk Chicken Breast","仿咸蛋黄鸡胸"],["Imitation Salted Egg Yolk Chicken Thigh","仿咸蛋黄鸡腿肉"],["Imitation Salted Egg Yolk Tiger Prawn","仿咸蛋黄大虎虾"],["Black Pepper Toman Fish Sliced","黑胡椒多曼鱼片"],
["Brown Rice","糙米饭"],["Basmati Long Rice","印度香米饭"],["Fragrant White Rice","香白米饭"],["Pearl Rice","珍珠米饭"],["Classic Meal Prep Brown Rice","经典备餐糙米饭"],["Spiced Long Rice","香料长米饭"],["Egg Fried Brown Rice","蛋炒糙米饭"],["Quinoa Fried Rice","藜麦炒饭"],["Cauliflower Fried Rice","花椰菜炒饭"],["Aglio Olio","蒜香橄榄油意面"],["Bolognese","番茄肉酱意面"],["Creamy Mushroom Pasta","蘑菇酱意面"],["Black Pepper Pasta","黑胡椒意面"],["Imitation Salted Egg Yolk Pasta","仿咸蛋黄意面"],["Carbonara","奶油培根意面"],["Pesto Fusilli","青酱螺旋面"],["Cajun Spiced Fusilli","卡真香料螺旋面"],["Assam Fettuccine","亚参宽面"],["Baked Potato","烤马铃薯"],["Baked Potato ( Oil-Free )","烤马铃薯（无油）"],["Baked Sweet Potato ( Orange )","烤黄心番薯"],["Baked Sweet Potato ( Orange ) [ Oil-Free ]","烤黄心番薯（无油）"],["Baked Sweet Potato ( Purple )","烤紫心番薯"],["Garlic Mashed Potato","蒜香薯泥"],["Garlic Toast","蒜香吐司"],
["Sweated Broccoli","清炒西兰花"],["Sweated Broccoli ( Oil-Free )","清炒西兰花（无油）"],["Sweated Cauliflower","清炒花椰菜"],["Sweated Cauliflower ( Oil-Free )","清炒花椰菜（无油）"],["Stir Fried Sweet Pea","炒甜豆"],["Stir Fried Sweet Pea ( Oil-Free )","炒甜豆（无油）"],["Stir Fried French Bean","炒四季豆"],["Stir Fried French Bean ( Oil-Free )","炒四季豆（无油）"],["Sweated Carrot","清炒胡萝卜"],["Sweated Carrot ( Oil-Free )","清炒胡萝卜（无油）"],["Baked Eggplant","烤茄子"],["Stir Fried Broccoli Stem","炒西兰花梗"],["Stir Fried Broccoli Stem ( Oil-Free )","炒西兰花梗（无油）"],["Asperges","芦笋"],["Asperges ( Oil-Free )","芦笋（无油）"],["Stir Fried Kangkung w/ Sambal Belacan","参巴峇拉煎炒空心菜"],["Stir Fried Kangkung w/ Garlic","蒜炒空心菜"],["Stir Fried Cabbage","炒包菜"],
["Baked Smoked Chicken Breast","烤烟熏鸡胸"],["Pan Seared King Mushroom","香煎杏鲍菇"],["Sweated Corn","清炒玉米粒"],["Peas & Corn","青豆玉米"],["Japanese Curry Garnishes","日式咖喱配菜"],["Baked Tofu","烤豆腐"],["Baked Tofu ( Oil-Free )","烤豆腐（无油）"],
["Brown Sauce","黑酱"],["Black Pepper Sauce","黑胡椒酱"],["Curry Gravy","咖喱酱"],["Green Curry Gravy","青咖喱酱"],["Japanese Curry Gravy","日式咖喱酱"],["Mushroom Gravy","蘑菇酱"],["Homemade Sambal","自制参巴"],["Gam Hiong Gravy","甘香酱"],["Sweet & Sour Sauce","酸甜酱"],["Gingered Spring Onion Gravy","姜葱酱"],["Pesto Sauce","青酱"],["Imitation Salted Egg Yolk Gravy","仿咸蛋黄酱"],["Assam Sauce","亚参酱"],["Cajun Spiced Gravy","卡真香料酱"],["Carbonara Sauce","奶油培根酱"],["Tomato Concasse","番茄肉酱"],
["Classic Meal Prep Chicken Sliced & Homemade Sambal","经典备餐鸡肉片配自制参巴"],["Garlic Mashed Potato with Grilled Chicken Chop & Brown Sauce","蒜香薯泥配烤鸡扒与黑酱"],["Grilled Teriyaki Chicken Breast & Sweet & Sour Sauce","照烧烤鸡胸配酸甜酱"],["Japanese Curry Chicken Katsu with Rice","日式咖喱炸鸡扒饭"],["Pan Seared Barramundi Fillet with Homemade Sambal","香煎金目鲈鱼柳配自制参巴"],["Pan Seared Salmon with Mushroom Gravy","香煎三文鱼配蘑菇酱"],["Pan Seared Smoked Paprika Chicken Breast & Tomato Concasse","香煎烟熏红椒粉鸡胸配番茄肉酱"],["Pan Seared Spicy Chicken Breast with Pesto Sauce","香煎香辣鸡胸配青酱"]
];
for(var i=0;i<P.length;i++){if(!Object.prototype.hasOwnProperty.call(D,P[i][0]))D[P[i][0]]=P[i][1]+'\n'+P[i][0]}
D['Peas & "Bacon"']='青豆与「培根」\nPeas & "Bacon"';
if(document.documentElement.getAttribute('data-lang')==='zh'){var st=document.createElement('style');st.textContent='.name,.line .n,.inside ol li span{white-space:pre-line}';(document.head||document.documentElement).appendChild(st)}
Object.assign(D,{
"Green Curry, Barramundi & Sambal, Soy Garlic Chicken, Pad Krapow, Bolognese, Cauliflower Fried Rice…":"青咖喱、金目鲈配参巴、蒜香酱油鸡、九层塔鸡、番茄肉酱意面、花椰菜炒饭…","Salmon & Mushroom Gravy, Teriyaki Chicken & Sweet Potato, Spicy Chicken & Pesto, Aglio Olio Prawn…":"三文鱼配蘑菇酱、照烧鸡配番薯、香辣鸡配青酱、蒜香橄榄油虾意面…","Black Pepper Chicken, Salted-Egg Chicken Thigh, Toman Fish, Katsu Curry, Gam Hiong Chicken…":"黑胡椒鸡、咸蛋黄鸡腿、多曼鱼、日式咖喱炸鸡扒、甘香鸡…","Creamy Mushroom Pasta, Assam Fettuccine Prawn, Quinoa Fried Rice, Kung Pao Chicken, Egg Fried Brown Rice…":"蘑菇酱意面、亚参宽面配虾、藜麦炒饭、宫保鸡、蛋炒糙米饭…"
});
if(window.aeraRetranslate)window.aeraRetranslate();
})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"✓ No Common Allergens":"✓ 无常见致敏原 No Common Allergens","No beef, dairy, nuts or prawn in any item":"任何一项都不含牛肉、乳制品、坚果或虾","Vacuum Packed":"真空包装"
});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Fat Loss":"减脂","Mass Gain":"增肌","KCALs":"大卡","KCAL":"大卡","Protein":"蛋白质","Carbs":"碳水","Fat":"脂肪","Baked Sweet Potato ( Orange ) ( Oil-Free )":"烤黄心番薯（无油） Baked Sweet Potato ( Orange ) ( Oil-Free )","Baked Sweet Potato ( Purple ) ( Oil-Free )":"烤紫心番薯（无油） Baked Sweet Potato ( Purple ) ( Oil-Free )"
});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Rice":"饭类","Pasta":"意面","Potato":"马铃薯","Toast":"吐司","Chicken":"鸡肉","Seafood":"海鲜","Beef":"牛肉","Stir Fried":"热炒","Vegetables":"蔬菜","Prawn":"虾","Fish":"鱼","Egg":"蛋","Tofu":"豆腐","Peanut & Nuts":"花生与坚果","Garnish":"配菜","Sauce":"酱汁","Sauces":"酱汁",
"Single portions to add to your Order, sized to the gram, priced by weight.":"可加进订单的单份餐点，称到克，按重量计价。","À la Carte is packed in a Vacuum Bag":"单点采用真空袋包装",", not a Bento Box, and carries RM 0.90 of Packaging per portion.":"，不是餐盒，每份包装费 RM 0.90。","per 100 g raw":"每 100 克生重","Small":"小份","Large":"大份"
});
window.AERA_I18N_RE.push([/^(\d+) g · ([\d,]+) KCALs$/,"$1 克 · $2 大卡"]);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-DATE-ZH : English dates -> Chinese, only when the page is in Chinese mode.
   Dates come out of toLocaleDateString('en-MY',...) at render time, so they arrive
   inside sentences the dictionary has already translated. This rewrites the date
   wherever it sits in a text node and leaves the rest of the node alone. */
(function(){
 var M={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12,
  january:1,february:2,march:3,april:4,june:6,july:7,august:8,september:9,october:10,november:11,december:12};
 var W={sun:'周日',mon:'周一',tue:'周二',tues:'周二',wed:'周三',thu:'周四',thur:'周四',thurs:'周四',fri:'周五',sat:'周六',
  sunday:'星期日',monday:'星期一',tuesday:'星期二',wednesday:'星期三',thursday:'星期四',friday:'星期五',saturday:'星期六'};
 function m(x){return M[String(x).toLowerCase()]}
 function w(x){return W[String(x).toLowerCase()]}
 var R=[
  [/\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday), (\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})\b/g,
   function(_,a,d,mo,y){return y+'年'+m(mo)+'月'+d+'日 '+w(a)}],
  [/\b(Sun|Mon|Tues|Tue|Thurs|Thur|Thu|Wed|Fri|Sat), (\d{1,2}) (Sept|Sep|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Nov|Dec) (\d{4})\b/g,
   function(_,a,d,mo,y){return y+'年'+m(mo)+'月'+d+'日 '+w(a)}],
  [/\b(Sun|Mon|Tues|Tue|Thurs|Thur|Thu|Wed|Fri|Sat), (\d{1,2}) (Sept|Sep|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Nov|Dec)\b/g,
   function(_,a,d,mo){return m(mo)+'月'+d+'日 '+w(a)}],
  [/\b(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})\b/g,
   function(_,d,mo,y){return y+'年'+m(mo)+'月'+d+'日'}],
  [/\b(\d{1,2}) (Sept|Sep|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Nov|Dec) (\d{4})\b/g,
   function(_,d,mo,y){return y+'年'+m(mo)+'月'+d+'日'}],
  [/\b(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December)\b/g,
   function(_,d,mo){return m(mo)+'月'+d+'日'}],
  [/\b(\d{1,2}) (Sept|Sep|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Nov|Dec)\b/g,
   function(_,d,mo){return m(mo)+'月'+d+'日'}],
  [/\b(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})\b/g,
   function(_,mo,y){return y+'年'+m(mo)+'月'}]
 ];
 var MO={jan:'1月',feb:'2月',mar:'3月',apr:'4月',may:'5月',jun:'6月',jul:'7月',aug:'8月',sep:'9月',sept:'9月',oct:'10月',nov:'11月',dec:'12月',
  january:'1月',february:'2月',march:'3月',april:'4月',june:'6月',july:'7月',august:'8月',september:'9月',october:'10月',november:'11月',december:'12月'};
 function conv(s){var o=s;for(var i=0;i<R.length;i++)o=o.replace(R[i][0],R[i][1]);return o}
 window.__aeraDateZh=conv;
 if(document.documentElement.getAttribute('data-lang')!=='zh')return;
 var SKIP={SCRIPT:1,STYLE:1,NOSCRIPT:1,TEXTAREA:1},seen=new WeakMap();
 function pass(){
  var tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n;
  while(n=tw.nextNode()){
   var p=n.parentElement;if(!p||SKIP[p.tagName])continue;
   if(p.closest&&p.closest('#langSw'))continue;
   var v=n.nodeValue;if(seen.get(n)===v)continue;
   var k=v.trim(),z=k&&MO[k.toLowerCase()];
   if(z){if(z!==k)n.nodeValue=v.replace(k,z);seen.set(n,n.nodeValue);continue}
   if(!/\d/.test(v)){seen.set(n,v);continue}
   var t=conv(v);if(t!==v)n.nodeValue=t;
   seen.set(n,n.nodeValue)}}
 var q=false;
 function queue(){if(q)return;q=true;requestAnimationFrame(function(){q=false;pass()})}
 function boot(){pass();
  new MutationObserver(queue).observe(document.body,{childList:true,subtree:true,characterData:true});
  setInterval(queue,1200);
  var prev=window.aeraRetranslate;
  window.aeraRetranslate=function(){if(prev)prev();queue()}}
 if(document.readyState==='loading')addEventListener('DOMContentLoaded',boot);else boot();
})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-LEGAL-ZH */
Object.assign(window.AERA_I18N||{},{"By paying you agree to our":"付款即表示您同意我们的","Terms & Conditions":"条款与条件","and have read our":"，并已阅读我们的","Privacy Notice":"隐私声明"});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-POINTS-ZH */
(function(){var D=window.AERA_I18N||{},R=window.AERA_I18N_RE;
Object.assign(D,{"Use on this order":"本单使用","Don't use points":"不使用积分","Paused on this Order while the First Order Voucher is on. Your points stay in your account for next time.":"首单优惠券启用期间，本单暂停使用积分。积分会保留在您的账户，下次可用。","Paused on this Order while a Cost Price Code is applied. Your points stay in your account for next time.":"使用成本价代码期间，本单暂停使用积分。积分会保留在您的账户，下次可用。"});
if(R){var MO={JAN:1,FEB:2,MAR:3,APR:4,MAY:5,JUN:6,JUL:7,AUG:8,SEP:9,SEPT:9,OCT:10,NOV:11,DEC:12},WK={MON:'一',TUE:'二',WED:'三',THU:'四',FRI:'五',SAT:'六',SUN:'日'};
R.unshift(
 [/^Order before (.+?) for the earliest slot (\d+) Days? later\. Earliest available : (MON|TUE|WED|THU|FRI|SAT|SUN)[A-Z]*,? (\d{1,2})(?:st|nd|rd|th)? (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEPT|SEP|OCT|NOV|DEC)[A-Z]*\.?$/i,function(m,t,n,w,d,mo){var tt=/^12:45 PM$/i.test(t)?'中午 12:45':t;return tt+' 前下单，最早可选 '+n+' 天后的时段。最早可选：'+MO[mo.toUpperCase()]+'月'+(+d)+'日（周'+WK[w.toUpperCase()]+'）。'}],
 [/^Order before 1 PM for any Time Slot\. After 1 PM the earliest Day only has the 3 PM – 5 PM slot\. We need 3 days to Prep, not counting Sundays\. Earliest available : (.+)\.$/,'下午 1 点前下单可选任何时段。下午 1 点后下单，最早那天只剩下午 3 点 – 5 点时段。我们需要 3 天备餐（星期日不计）。最早可选：$1。'],
 [/^It is past 1 PM, so (.+) only has the 3 PM – 5 PM slot\. Pick a later Day for any Time Slot\. We need 3 days to Prep, not counting Sundays\. Earliest available : (.+)\.$/,'已过下午 1 点，$1 只剩下午 3 点 – 5 点时段。选择更晚的日期即可选任何时段。我们需要 3 天备餐（星期日不计）。最早可选：$2。'],
 [/^Worth RM ([\d.,]+)$/,'价值 RM $1'],
 [/^\( Max (\d+)% = RM ([\d.,]+) \)$/,'（最多 $1% = RM $2）'],
 [/^RM ([\d.,]+) off \( ([\d,]+) AP \)$/,'减 RM $1（$2 AP）'],
 [/^You need at least 100 AP to take RM 1\.00 off — this order adds (.+)\.$/,'满 100 AP 才能折抵 RM 1.00 — 这笔订单可获得 $1。']);}
if(window.aeraRetranslate)window.aeraRetranslate();})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-BRACKETS : house style is a space inside every bracket and a capital first word — "( Car )", "( Once a year )" */
function vehUp(){var v=String(vehicle()||'');return v.charAt(0).toUpperCase()+v.slice(1)}
(function(){var R=window.AERA_I18N_RE;if(!R)return;
 var VZ={Car:'轿车',Motorcycle:'摩托',car:'轿车',motorcycle:'摩托'};
 R.unshift(
  [/^Rider brings the order right to your door\. Normal Delivery \+ (RM [\d.,]+) by motorcycle or \+ (RM [\d.,]+) by car — this order goes by (car|motorcycle) \( \+ (RM [\d.,]+) \)\.$/,function(m,a,b,v,x){return '骑手直接送到您家门口。普通配送费 + '+a+'（摩托）或 + '+b+'（轿车）— 此订单以'+VZ[v]+'配送（+ '+x+'）。'}],
  [/^🎂 Birthday treat · (\d+)% off meals \( Once a year \)$/,function(m,p){var d=100-(+p);return '🎂 生日礼遇 · 餐点 '+(d%10===0?d/10:d)+' 折（每年一次）'}],
  [/Door-to-Door \( (Car|Motorcycle) \)/,function(m,v){return '送到门（'+VZ[v]+'）'}]);
 if(window.aeraRetranslate)window.aeraRetranslate()})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-COMPANY-NOSIGNIN : a company orders on its account by typing its company email — no login */
Object.assign(window.AERA_I18N||{},{"Ordering for a company with an AERA account? No login needed — just type your company email under Your Details.":"公司账户下单？无需登录 — 只要在“您的资料”输入公司邮箱即可。"});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-DATE-PRETTY : show the Delivery / Pick-Up date the way the rest of the shop does
   ( en-MY, e.g. "Wed, 23 Sept" ) instead of the browser own date box. The native input is
   kept exactly as it is, only hidden behind a button, so every other script that reads or
   sets its value keeps working. */
(function(){
  function boot(){
    var di=document.getElementById("date");
    if(!di||di.dataset.pretty)return;
    di.dataset.pretty="1";
    var wrap=document.createElement("span");
    wrap.style.cssText="position:relative;display:block";
    di.parentNode.insertBefore(wrap,di);
    wrap.appendChild(di);
    di.style.position="absolute";di.style.left="0";di.style.top="0";di.style.width="100%";di.style.height="100%";di.style.opacity="0";di.style.zIndex="-1";
    var btn=document.createElement("button");
    btn.type="button";
    btn.style.cssText="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:10px;font:inherit;background:#fff;color:inherit;text-align:left;cursor:pointer";
    wrap.appendChild(btn);
    function pretty(v){
      v=String(v||"").slice(0,10);
      if(!/^\d{4}-\d{2}-\d{2}$/.test(v))return "";
      var p=v.split("-"),d=new Date(+p[0],+p[1]-1,+p[2],12);
      try{return d.toLocaleDateString("en-MY",{weekday:"short",day:"numeric",month:"short"})}catch(e){return p[2]+"/"+p[1]+"/"+p[0]}
    }
    var last=null;
    function sync(){
      var v=di.value;
      if(v===last)return;
      last=v;
      var t=pretty(v);
      btn.textContent=t||"Choose a date";
      btn.style.color=t?"inherit":"var(--mute)";
    }
    /* Our own calendar: the browser date box behind the button does not open on some phones
       and on Safari for Mac, so customers could not pick any day after the earliest one.
       Every open day from the earliest to the last one we take is shown; Sundays and any day the
       kitchen is closed are greyed out. Picking a day sets the real date box and fires "change",
       so the slot rules and closure checks run exactly as before. */
    (function(){var st=document.createElement("style");st.textContent=
      ".dpop{position:absolute;left:0;top:calc(100% + 6px);z-index:50;background:#fff;border:1px solid var(--line,#DDE4EF);border-radius:14px;box-shadow:0 12px 32px rgba(11,27,54,.16);padding:12px;width:min(330px,calc(100vw - 40px))}"+
      ".dpop .dh{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;font-size:11px;font-weight:700;color:#6B7690;text-align:center;margin-bottom:4px}"+
      ".dpop .dg{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}"+
      ".dpop .dm{grid-column:1/-1;font-size:12px;font-weight:800;color:#16479E;letter-spacing:.06em;text-transform:uppercase;margin:6px 0 2px}"+
      ".dpop .dd{border:0;border-radius:9px;padding:8px 0;font:inherit;font-weight:700;font-size:14px;background:#EEF2F9;color:#0B1B36;cursor:pointer;font-variant-numeric:tabular-nums}"+
      ".dpop .dd:hover{background:#DCE6F7}.dpop .dd.on{background:#16479E;color:#fff}.dpop .dd[disabled]{background:transparent;color:#B7C0D3;cursor:not-allowed;text-decoration:line-through}"+
      ".dpop .dx{visibility:hidden}.dpop .dn{font-size:12px;color:#6B7690;margin:10px 2px 0;line-height:1.4}";document.head.appendChild(st)})();
    function isoD(d){return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}
    function parseD(v){var p=String(v||"").split("-");return p.length===3?new Date(+p[0],+p[1]-1,+p[2],12):null}
    function closePop(){var p=wrap.querySelector(".dpop");if(p)p.remove();document.removeEventListener("click",outside,true)}
    function outside(ev){if(!wrap.contains(ev.target))closePop()}
    function openPop(){closePop();if(di.disabled)return;
      var lo=parseD(di.min),hi=parseD(di.max);if(!lo){lo=new Date();lo.setHours(12,0,0,0)}if(!hi){hi=new Date(lo);hi.setDate(hi.getDate()+28)}
      var start=new Date(lo);start.setDate(start.getDate()-((start.getDay()+6)%7));
      var end=new Date(hi);end.setDate(end.getDate()+(6-((end.getDay()+6)%7)));
      var html='<div class="dh"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div class="dg">';
      var lastM=-1;
      for(var d=new Date(start);d<=end;d.setDate(d.getDate()+1)){
        if(d.getDay()===1&&d.getMonth()!==lastM&&d<=hi){var wk=new Date(d);var ms=[];for(var k=0;k<7;k++){if(ms.indexOf(wk.getMonth())<0)ms.push(wk.getMonth());wk.setDate(wk.getDate()+1)}
          if(lastM===-1||ms.indexOf(lastM)<0||ms.length>1){html+='<div class="dm">'+new Date(d.getFullYear(),ms[ms.length-1],1).toLocaleDateString("en-MY",{month:"long",year:"numeric"})+'</div>';lastM=ms[ms.length-1]}}
        var v=isoD(d),inR=d>=lo&&d<=hi;
        if(!inR){html+='<span class="dd dx"></span>';continue}
        var why="";try{why=(typeof cloWhy==="function"&&cloWhy(v))||""}catch(e){}if(!why&&d.getDay()===0)why="Closed on Sundays";
        html+='<button type="button" class="dd'+(v===di.value?' on':'')+'" data-v="'+v+'"'+(why?' disabled title="'+String(why).replace(/"/g,"")+'"':' title="'+d.toLocaleDateString("en-MY",{weekday:"long",day:"numeric",month:"long"})+'"')+'>'+d.getDate()+'</button>'}
      html+='</div><div class="dn">Greyed-out days are closed. Latest day you can book now : '+hi.toLocaleDateString("en-MY",{weekday:"short",day:"numeric",month:"short"})+'.</div>';
      var pop=document.createElement("div");pop.className="dpop";pop.setAttribute("role","dialog");pop.setAttribute("aria-label","Choose a date");pop.innerHTML=html;wrap.appendChild(pop);
      pop.addEventListener("click",function(ev){var t=ev.target.closest&&ev.target.closest("button[data-v]");if(!t||t.disabled)return;
        di.value=t.getAttribute("data-v");try{di.dispatchEvent(new Event("input",{bubbles:true}))}catch(e){}try{di.dispatchEvent(new Event("change",{bubbles:true}))}catch(e){}sync();closePop();btn.focus()});
      pop.addEventListener("keydown",function(ev){if(ev.key==="Escape"){closePop();btn.focus()}});
      setTimeout(function(){document.addEventListener("click",outside,true);var on=pop.querySelector(".dd.on")||pop.querySelector("button[data-v]:not([disabled])");if(on)on.focus()},0)}
    btn.setAttribute("aria-haspopup","dialog");
    btn.addEventListener("click",function(){if(wrap.querySelector(".dpop"))closePop();else openPop()});
    di.addEventListener("change",sync);
    di.addEventListener("input",sync);
    sync();
    setInterval(sync,400);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(boot,300)});
  else setTimeout(boot,300);
})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
(function(){
  if(window.__AERA_HOSTMAP) return; window.__AERA_HOSTMAP=1;
  if(/my\.chatbees\.io$/i.test(location.hostname)) return;
  var MAP={"ZQr9fS2jA9":"/","xR3Dfd9n":"/fridge","D2pz8bZ":"/checkout","dtTMaV":"/account","SrQzC5m2":"/meal-plan",
  "DSBcJ9bN4":"/bring-your-own-plan","8s4Xd6h":"/track","VMrvEw":"/merchandise","TVRk6bqam":"/corporate",
  "G7mXL4RMz2":"/terms","xXH4dXALg":"/privacy","B2WjrKhnz":"/contact","DiB2ZadptP":"/thank-you",
  "HkKJuxBS":"/referrer-portal","H9H32i9ShW":"/referrer-signup","ZmQYknnnM":"/points-checkout",
  "8kZjg8U5XD":"/home-sourced-meals","vP2uvq":"/coach-plan-builder"};
  function baseOf(){
    var p=location.pathname.replace(/\/+$/,"");
    for(var k in MAP){ var t=MAP[k];
      if(t!=="/" && p.length>=t.length && p.slice(-t.length)===t) return p.slice(0,p.length-t.length); }
    return p;
  }
  var BASE=baseOf();
  function conv(u){
    if(!u) return u;
    var m=String(u).match(/^(?:https?:\/\/my\.chatbees\.io)?\/p\/([A-Za-z0-9]+)\/?(\?[^#]*)?(#.*)?$/);
    if(!m) return u;
    var t=MAP[m[1]]; if(!t) return u;
    return location.origin+BASE+(t==="/"?"/":t+"/")+(m[2]||"")+(m[3]||"");
  }
  function fix(root){
    if(!root||!root.querySelectorAll) return;
    var a=root.querySelectorAll("a[href]");
    for(var i=0;i<a.length;i++){ var o=a[i].getAttribute("href"), n=conv(o); if(n!==o) a[i].setAttribute("href",n); }
  }
  document.addEventListener("click",function(e){
    var a=e.target&&e.target.closest?e.target.closest("a[href]"):null; if(!a) return;
    var o=a.getAttribute("href"), n=conv(o); if(n!==o) a.setAttribute("href",n);
  },true);
  try{ var _o=window.open; window.open=function(u){ var x=[].slice.call(arguments); x[0]=conv(u); return _o.apply(window,x) }; }catch(e){}
  try{ var la=Location.prototype.assign, lr=Location.prototype.replace;
    Location.prototype.assign=function(u){ return la.call(this,conv(u)) };
    Location.prototype.replace=function(u){ return lr.call(this,conv(u)) }; }catch(e){}
  /* Chrome and Safari ignore the two lines above ( location.replace / .href cannot be re-wired ), so : */
  window.aeraUrl=conv;
  /* 1. re-point the page's own address settings ( HOME_URL, SHOP_URL, NEXT … ) at this site */
  function sweep(){ try{ for(var k in window){ var v; try{ v=window[k] }catch(e){ continue }
      if(typeof v==="string"){ var n=conv(v); if(n!==v) try{ window[k]=n }catch(e){} }
      else if(v&&typeof v==="object"&&Object.getPrototypeOf(v)===Object.prototype){ for(var j in v){ if(typeof v[j]==="string"){ var n2=conv(v[j]); if(n2!==v[j]) try{ v[j]=n2 }catch(e){} } } } } }catch(e){} }
  sweep(); document.addEventListener("DOMContentLoaded",sweep); window.addEventListener("load",sweep);
  /* 2. last net : any jump to a my.chatbees.io page that has a home here lands here instead */
  try{ if(window.navigation) navigation.addEventListener("navigate",function(e){
      if(e.navigationType==="traverse"||!e.cancelable) return;
      var u=e.destination&&e.destination.url, n=conv(u); if(u&&n!==u){ e.preventDefault(); location.href=n } }); }catch(e){}
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",function(){fix(document)});
  else fix(document);
  try{ new MutationObserver(function(ms){ for(var i=0;i<ms.length;i++){ var n=ms[i].addedNodes; for(var j=0;j<n.length;j++) if(n[j].nodeType===1) fix(n[j]); } })
    .observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}
})();

/* AERA : every meal box and vacuum bag picture is shown on its own, without the studio backdrop it was shot on. */
(function(){if(window.__aeraCut)return;window.__aeraCut=1;
var SKIP='nav,footer,.ibgal,.smth,.iblbsc,.clogo,[data-nocut]',C={},W={},Q=[],busy=0;
function src(u){return /^https:\/\/my\.chatbees\.io\/objects\//.test(u)||/^data:image\/(webp|jpe?g|png)/.test(u)}
function cut(img){var W0=img.naturalWidth,H0=img.naturalHeight;if(W0<60||H0<60)return null;var sc=Math.min(1,800/Math.max(W0,H0)),w=Math.round(W0*sc),h=Math.round(H0*sc);
 var c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d');x.drawImage(img,0,0,w,h);
 var d=x.getImageData(0,0,w,h),p=d.data,N=w*h,R=[],G=[],B=[],i,k,E=[];
 for(i=0;i<w;i++){E.push(i,(h-1)*w+i)}for(i=0;i<h;i++){E.push(i*w,i*w+w-1)}
 E.forEach(function(q){R.push(p[q*4]);G.push(p[q*4+1]);B.push(p[q*4+2])});
 function med(a){a=a.slice().sort(function(m,n){return m-n});return a[a.length>>1]}
 var r0=med(R),g0=med(G),b0=med(B),L0=(r0+g0+b0)/3,ch0=Math.max(r0,g0,b0)-Math.min(r0,g0,b0),rg0=r0-g0,gb0=g0-b0;
 if(L0<170||ch0>40)return null;
 var near=0;for(i=0;i<R.length;i++)if(Math.max(Math.abs(R[i]-r0),Math.abs(G[i]-g0),Math.abs(B[i]-b0))<=22)near++;
 if(near<R.length*0.8)return null;
 function lum(q){return(p[q*4]+p[q*4+1]+p[q*4+2])/3}
 function chr(q){return Math.max(p[q*4],p[q*4+1],p[q*4+2])-Math.min(p[q*4],p[q*4+1],p[q*4+2])}
 function hueOk(q,t){var r=p[q*4],g=p[q*4+1],b=p[q*4+2],f=lum(q)/L0;return Math.abs((r-g)-rg0*f)<=t&&Math.abs((g-b)-gb0*f)<=t&&chr(q)<=ch0+12}
 function flood(ok){var m=new Uint8Array(N),S=new Int32Array(N),qh=0,qt=0;
  function seed(q){if(!m[q]&&ok(q)){m[q]=1;S[qt++]=q}}
  E.forEach(seed);
  while(qh<qt){k=S[qh++];var X=k%w,Y=(k/w)|0;if(X>0)seed(k-1);if(X<w-1)seed(k+1);if(Y>0)seed(k-w);if(Y<h-1)seed(k+w)}
  return{m:m,n:qt}}
 function peel(m,ok){var kill=[];for(i=0;i<N;i++){if(m[i])continue;var X=i%w,Y=(i/w)|0;
   if(!((X>0&&m[i-1])||(X<w-1&&m[i+1])||(Y>0&&m[i-w])||(Y<h-1&&m[i+w])))continue;if(ok(i))kill.push(i)}kill.forEach(function(q){m[q]=1})}
 /* the gentle cut : only the backdrop colour and its soft shadow */
 var A=flood(function(q){if(Math.max(Math.abs(p[q*4]-r0),Math.abs(p[q*4+1]-g0),Math.abs(p[q*4+2]-b0))<=22)return 1;var L=lum(q);return L<L0&&L>L0-100&&hueOk(q,8)});
 if(A.n>N*0.97)return null;
 /* the deep cut : anything pale and colourless from the edge in, up to a dark rim such as the bento tray's */
 var D=flood(function(q){return lum(q)>70&&chr(q)<50}),m=A.m;
 /* only a box with a dark rim is cut ; vacuum bags and anything else keep their backdrop */
 if((N-D.n)<(N-A.n)*0.6)return null;m=D.m;var rim=0,edge=0;for(i=0;i<N;i++){if(m[i])continue;var X=i%w,Y=(i/w)|0;if((X>0&&m[i-1])||(X<w-1&&m[i+1])||(Y>0&&m[i-w])||(Y<h-1&&m[i+w])){edge++;if(lum(i)<80&&chr(i)<60)rim++}}
 if(!edge||rim<edge*0.5)return null;peel(m,function(q){return lum(q)>85&&chr(q)<50});
 /* only the outline is returned : the page lays it over the original photo as a mask, so the food keeps every pixel */
 var mc=document.createElement('canvas');mc.width=w;mc.height=h;var mx=mc.getContext('2d'),md=mx.createImageData(w,h);
 for(i=0;i<N;i++)md.data[i*4+3]=m[i]?0:255;mx.putImageData(md,0,0);return mc}
function get(u,cb){if(u in C)return cb(C[u]);(W[u]=W[u]||[]).push(cb);if(W[u].length>1)return;
 Q.push(u);pump()}
function pump(){if(busy||!Q.length)return;busy=1;var u=Q.shift(),i=new Image();i.crossOrigin='anonymous';
 function done(v){C[u]=v;var L=W[u]||[];delete W[u];L.forEach(function(f){try{f(v)}catch(e){}});busy=0;setTimeout(pump,15)}
 i.onload=function(){var c=null;try{c=cut(i)}catch(e){}if(!c)return done(null);
  if(c.toBlob)c.toBlob(function(b){done(b?URL.createObjectURL(b):null)},'image/png');else done(c.toDataURL('image/png'))};
 i.onerror=function(){done(null)};i.src=u}
function fitSize(f){return f==='cover'||f==='contain'?f:f==='scale-down'?'contain':f==='none'?'auto':'100% 100%'}
function mask(el,v,size,pos){var s=el.style;s.webkitMaskImage=s.maskImage='url("'+v+'")';s.webkitMaskSize=s.maskSize=size;s.webkitMaskPosition=s.maskPosition=pos;s.webkitMaskRepeat=s.maskRepeat='no-repeat'}
function unmask(el){var s=el.style;s.webkitMaskImage=s.maskImage=''}
function doImg(el){if(el.dataset.cut||(el.closest&&el.closest(SKIP)))return;var u=el.getAttribute('src')||'';if(!src(u))return;
 el.dataset.cut=u;get(u,function(v){if(el.dataset.cut!==u)return;if(v){var cs=getComputedStyle(el);mask(el,v,fitSize(cs.objectFit),cs.objectPosition||'50% 50%');el.style.boxShadow='none'}})}
function doBg(el){var s=el.style&&el.style.backgroundImage;if(!s||s.indexOf('url(')<0||(el.closest&&el.closest(SKIP)))return;
 var mm=s.match(/url\(["']?([^"')]+)["']?\)/);if(!mm)return;var u=mm[1];if(!src(u)||el.dataset.cutbg===u)return;el.dataset.cutbg=u;
 get(u,function(v){if(el.dataset.cutbg!==u)return;if(v){var cs=getComputedStyle(el);mask(el,v,cs.backgroundSize||'auto',cs.backgroundPosition||'0% 0%')}})}
function img(el){if(el.complete&&el.naturalWidth)doImg(el);else el.addEventListener('load',function(){doImg(el)},{once:true})}
function walk(root){if(!root||root.nodeType!==1)return;
 if(root.tagName==='IMG')img(root);else if(root.style&&root.style.backgroundImage)doBg(root);
 root.querySelectorAll&&root.querySelectorAll('img,[style*="background"]').forEach(function(e){e.tagName==='IMG'?img(e):doBg(e)})}
function start(){walk(document.body);new MutationObserver(function(ms){ms.forEach(function(r){
  if(r.type==='childList')r.addedNodes.forEach(walk);
  else if(r.attributeName==='src'&&r.target.tagName==='IMG'){var t=r.target;if(t.dataset.cut&&t.dataset.cut!==t.getAttribute('src')){delete t.dataset.cut;unmask(t)}img(t)}
  else if(r.attributeName==='style'){var e=r.target,b=e.style.backgroundImage||'';if(e.dataset.cutbg&&b.indexOf(e.dataset.cutbg)<0){delete e.dataset.cutbg;unmask(e)}doBg(e)}})}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['src','style']})}
if(document.body)start();else document.addEventListener('DOMContentLoaded',start);
})();

(function(){if(window.__aeraTheme)return;window.__aeraTheme=1;
 var SEL='.btn,.at-btn';
 function rgb(s){var m=String(s).match(/rgba?\(([^)]+)\)/);if(!m)return null;var p=m[1].split(',').map(parseFloat);return{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}}
 /* what the button was before the theme touched it : yellow stays yellow, red and green keep their warning colours, everything else turns navy */
 function base(el){var c=el.className||'';
  if(el.closest('.noaera')||/\b(ghost|btn-line|btn-w)\b/.test(c))return'x';
  if(/\b(d|danger|del)\b/.test(c))return'x';
  var cs=getComputedStyle(el),b=rgb(cs.backgroundColor),tc=rgb(cs.color);
  if(tc&&tc.r>170&&tc.g<110&&tc.b<110)return'x';
  if(b&&b.a>0.2){
   if(b.r>230&&b.g>150&&b.g<215&&b.b<110)return'yb';
   if(b.r>170&&b.g<110&&b.b<110)return'x';
   if(b.g>150&&b.r<90&&b.b<140)return'x'}
  /* a navy button would vanish on a navy band, so there it is AERA yellow instead */
  for(var p=el.parentElement;p&&p!==document.documentElement;p=p.parentElement){var ps=getComputedStyle(p),pb=rgb(ps.backgroundColor);
   if(!(pb&&pb.a>0.5)&&/gradient/.test(ps.backgroundImage))pb=rgb(ps.backgroundImage);
   if(pb&&pb.a>0.5){if((0.299*pb.r+0.587*pb.g+0.114*pb.b)<110)return'yb';break}}
  return'nb'}
 function paint(){document.querySelectorAll(SEL).forEach(function(el){
  var k=el.getAttribute('data-aera');if(!k){k=base(el);el.setAttribute('data-aera',k)}
  if(k==='x')return;
  /* a picked option ( .on ) is shown the other way round, so the choice still stands out */
  var on=el.classList.contains('on')||el.classList.contains('active')||el.getAttribute('aria-pressed')==='true';
  var want=(k==='yb')!==on?'aera-yb':'aera-nb',drop=want==='aera-yb'?'aera-nb':'aera-yb';
  if(!el.classList.contains(want))el.classList.add(want);if(el.classList.contains(drop))el.classList.remove(drop)})}
 var busy=0;function later(){if(busy)return;busy=1;try{paint()}finally{busy=0}}
 function boot(){paint();new MutationObserver(later).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','aria-pressed']})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();