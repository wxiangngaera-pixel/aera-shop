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

document.addEventListener("pointerdown",function(e){var b=e.target.closest&&e.target.closest(".planacts .btn");if(!b)return;b.classList.remove("pop");void b.offsetWidth;b.classList.add("pop");setTimeout(function(){b.classList.remove("pop")},360)});

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
function tourWhich(){var m={1:'intro',2:'week',3:'prefs',4:'plan',5:'order'};for(var i=1;i<=5;i++){var e=document.getElementById('s'+i);if(e&&getComputedStyle(e).display!=='none')return m[i]}return 'intro'}

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* ---- the little pictures ----
One loop each, drawn here in plain SVG so nothing is fetched and nothing can go missing.
Canvas is 64 x 40, the ink is the card's own, the accent is AERA yellow. */
var ART={map:'<path class="a-tr" d="M6 31C14 31 15 12 26 12s12 16 22 16"/><circle class="a-dot" r="3.4" cx="0" cy="0"><animateMotion dur="3.4s" repeatCount="indefinite" path="M6 31C14 31 15 12 26 12s12 16 22 16"/></circle><circle class="a-pin" cx="52" cy="28" r="2.2"/>',steps:'<g class="a-steps"><rect x="4" y="17" width="9" height="7" rx="2.2"/><rect x="16" y="17" width="9" height="7" rx="2.2"/><rect x="28" y="17" width="9" height="7" rx="2.2"/><rect x="40" y="17" width="9" height="7" rx="2.2"/><rect x="52" y="17" width="8" height="7" rx="2.2"/></g>',list:'<g class="a-rows"><rect x="8" y="8" width="48" height="5" rx="2.5"/><rect x="8" y="18" width="40" height="5" rx="2.5"/><rect x="8" y="28" width="46" height="5" rx="2.5"/></g>',tick:'<rect x="9" y="12" width="17" height="17" rx="4.5"/><path class="a-check" d="M13 21l4 4 6-8"/><rect class="a-ghost" x="32" y="14" width="23" height="4.5" rx="2.2"/><rect class="a-ghost" x="32" y="23" width="16" height="4.5" rx="2.2"/>',cal:'<rect x="7" y="9" width="32" height="26" rx="4"/><path d="M7 17h32M15 6v6M31 6v6"/><rect class="a-day" x="20" y="22" width="8" height="7" rx="2"/><circle cx="50" cy="26" r="8"/><path class="a-hand" d="M50 26v-5"/>',box:'<path class="a-lid" d="M12 16h40l-4-7H16z"/><path d="M12 16h40v18a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z"/><path class="a-band" d="M32 16v20"/>',cook:'<path d="M12 20h40v10a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z"/><path d="M8 24h4M52 24h4"/><path class="a-steam" d="M26 14c0-3 3-3 3-6"/><path class="a-steam a-s2" d="M34 14c0-3 3-3 3-6"/>',van:'<g class="a-van"><path d="M6 27V14h24v13z"/><path d="M30 19h9l6 8v0H30z"/><circle cx="15" cy="30" r="3.2"/><circle cx="38" cy="30" r="3.2"/></g><path class="a-road" d="M2 35h60"/>',fridge:'<rect x="14" y="6" width="26" height="30" rx="4"/><path class="a-door" d="M27 6h13a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H27z"/><circle class="a-cool" cx="50" cy="20" r="2.4"/><circle class="a-cool a-c2" cx="50" cy="28" r="1.6"/>',user:'<circle cx="20" cy="15" r="6"/><path d="M9 34c1.5-6 6-9 11-9s9.5 3 11 9"/><g class="a-menu"><rect x="40" y="13" width="18" height="4" rx="2"/><rect x="40" y="21" width="18" height="4" rx="2"/><rect x="40" y="29" width="12" height="4" rx="2"/></g>',bell:'<g class="a-bell"><path d="M32 8a9 9 0 0 1 9 9v7l3 4H20l3-4v-7a9 9 0 0 1 9-9z"/><path d="M28 32a4 4 0 0 0 8 0"/></g><circle class="a-ping" cx="44" cy="11" r="3"/>',doc:'<path d="M14 6h24l8 8v22a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2z"/><path d="M38 6v8h8"/><g class="a-lines"><rect x="20" y="20" width="20" height="3.4" rx="1.7"/><rect x="20" y="26" width="16" height="3.4" rx="1.7"/><rect x="20" y="32" width="12" height="3.4" rx="1.7"/></g>',macro:'<g class="a-bars"><rect x="12" y="8" width="8" height="28" rx="3"/><rect x="28" y="8" width="8" height="28" rx="3"/><rect x="44" y="8" width="8" height="28" rx="3"/></g><path class="a-base" d="M6 36h52"/>',coin:'<g class="a-coin"><circle cx="24" cy="21" r="11"/><path d="M20 17h8M20 25h8M24 14v14"/></g><circle class="a-coin2" cx="42" cy="21" r="8"/>',ticket:'<path class="a-tick2" d="M10 12h44v18H10a5 5 0 0 0 0-18z"/><path d="M42 12v18" stroke-dasharray="3 3"/><rect class="a-off" x="16" y="19" width="18" height="4" rx="2"/>',card:'<g class="a-card"><rect x="8" y="12" width="36" height="22" rx="4"/><path d="M8 20h36"/><rect x="13" y="25" width="11" height="4" rx="2"/></g><path class="a-check" d="M44 26l5 5 8-11"/>',star:'<path class="a-star" d="M32 8l6 12 13 2-9.5 9 2.3 13L32 38l-11.8 6 2.3-13L13 22l13-2z"/>',no:'<circle class="a-no" cx="32" cy="21" r="13"/><path class="a-no" d="M23 12l18 18"/>',scale:'<path d="M32 8v26M22 34h20"/><g class="a-beam"><path d="M14 14h36"/><path d="M14 14l-5 8h10zM50 14l-5 8h10z"/></g>',shaker:'<g class="a-shake"><path d="M24 16h16v18a2 2 0 0 1-2 2H26a2 2 0 0 1-2-2z"/><path d="M26 16l2-6h8l2 6"/><circle cx="30" cy="12" r="1"/><circle cx="34" cy="13" r="1"/></g><circle class="a-grain" cx="46" cy="14" r="1.4"/><circle class="a-grain a-g2" cx="50" cy="18" r="1.4"/>',spark:'<path class="a-sp" d="M20 20l3-8 3 8 8 3-8 3-3 8-3-8-8-3z"/><path class="a-sp a-sp2" d="M44 13l1.6-4 1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6z"/><path class="a-sp a-sp3" d="M45 30l1.2-3 1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2z"/>',cart:'<g class="a-cart"><path d="M8 11h5l5 17h22l5-13H16"/><circle cx="21" cy="33" r="3"/><circle cx="38" cy="33" r="3"/></g><path class="a-drop" d="M44 6v7"/>',plate:'<circle cx="32" cy="21" r="13"/><path class="a-slice" d="M32 21V8a13 13 0 0 1 11.3 6.5z"/><circle cx="32" cy="21" r="5.5"/>',door:'<rect x="12" y="6" width="28" height="30" rx="3"/><path class="a-door" d="M40 6a14 14 0 0 1 0 30z"/><circle cx="35" cy="21" r="1.6"/>',receipt:'<path d="M16 6h32v28l-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3z"/><g class="a-lines"><rect x="22" y="13" width="20" height="3" rx="1.5"/><rect x="22" y="19" width="14" height="3" rx="1.5"/><rect x="22" y="25" width="17" height="3" rx="1.5"/></g>',tag:'<g class="a-tagw"><path d="M10 22l14-14h16v16L26 38a3 3 0 0 1-4 0L10 26a3 3 0 0 1 0-4z"/><circle cx="34" cy="14" r="2.6"/></g>',mail:'<rect x="10" y="11" width="40" height="22" rx="4"/><path class="a-flap" d="M10 14l20 12 20-12"/>',pack:'<g class="a-swap"><rect x="8" y="14" width="22" height="16" rx="3"/><path d="M8 20h22"/></g><g class="a-swap a-sw2"><path d="M36 14h20v16H36z"/><path d="M40 14v16M48 14v16"/></g>'
};var ART_CSS='@keyframes a-pulse{0%,100%{opacity:.25}50%{opacity:1}}'+'@keyframes a-draw{0%{stroke-dashoffset:26}45%,100%{stroke-dashoffset:0}}'+'@keyframes a-rowhi{0%,100%{opacity:.22}25%{opacity:1}}'+'@keyframes a-grow{0%{transform:scaleY(.18)}55%,100%{transform:scaleY(1)}}'+'@keyframes a-spin{to{transform:rotate(360deg)}}'+'@keyframes a-ride{0%{transform:translateX(-6px)}100%{transform:translateX(10px)}}'+'@keyframes a-lid{0%,100%{transform:translateY(-5px)}55%{transform:translateY(0)}}'+'@keyframes a-steam{0%{opacity:0;transform:translateY(3px)}40%{opacity:1}100%{opacity:0;transform:translateY(-5px)}}'+'@keyframes a-swing{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(9deg)}}'+'@keyframes a-ping{0%{opacity:0;transform:scale(.4)}60%{opacity:1}100%{opacity:0;transform:scale(1.5)}}'+'@keyframes a-openz{0%,100%{transform:rotateY(0)}50%{transform:rotateY(-58deg)}}'+'@keyframes a-flip{0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}}'+'@keyframes a-slidein{0%{transform:translateX(-9px);opacity:0}45%,100%{transform:none;opacity:1}}'+'@keyframes a-fall{0%{transform:translate(0,0);opacity:0}30%{opacity:1}100%{transform:translate(-13px,14px);opacity:0}}'+'@keyframes a-shake{0%,100%{transform:rotate(16deg)}50%{transform:rotate(30deg)}}'+'@keyframes a-tip{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}'+'@keyframes a-pop{0%{transform:scale(.6);opacity:.2}60%{transform:scale(1);opacity:1}100%{transform:scale(1);opacity:1}}'+'@keyframes a-swapo{0%,45%{opacity:1}55%,100%{opacity:.2}}'+'@keyframes a-swapi{0%,45%{opacity:.2}55%,100%{opacity:1}}'+'@keyframes a-motion{0%{opacity:.2;transform:translateX(0)}50%{opacity:1}100%{opacity:.2;transform:translateX(5px)}}'+'.at-art{display:block;width:100%;height:46px;margin:2px 0 11px}'+'.at-art svg{display:block;height:46px;width:74px;overflow:visible}'+'.at-art path,.at-art rect,.at-art circle{fill:none;stroke:#14181F;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round}'+'.at-art .a-tr{stroke:#C9CFD8;stroke-dasharray:4 4}.at-art .a-dot{fill:#F0B429;stroke:none}.at-art .a-pin{fill:#14181F}'+'.at-art .a-steps rect{fill:#EDF0F5;stroke:none;animation:a-rowhi 2.6s ease-in-out infinite}'+'.at-art .a-steps rect:nth-child(2){animation-delay:.28s}.at-art .a-steps rect:nth-child(3){animation-delay:.56s}'+'.at-art .a-steps rect:nth-child(4){animation-delay:.84s}.at-art .a-steps rect:nth-child(5){animation-delay:1.12s}'+'.at-art .a-rows rect,.at-art .a-lines rect{fill:#14181F;stroke:none}'+'.at-art .a-rows rect{animation:a-rowhi 2.4s ease-in-out infinite}'+'.at-art .a-rows rect:nth-child(2){animation-delay:.3s}.at-art .a-rows rect:nth-child(3){animation-delay:.6s}'+'.at-art .a-lines rect{animation:a-slidein 2.6s ease-out infinite}'+'.at-art .a-lines rect:nth-child(2){animation-delay:.22s}.at-art .a-lines rect:nth-child(3){animation-delay:.44s}'+'.at-art .a-check{stroke:#F0B429;stroke-width:2.6;stroke-dasharray:26;animation:a-draw 2.4s ease-in-out infinite}'+'.at-art .a-ghost{fill:#DFE4EC;stroke:none}'+'.at-art .a-day{fill:#F0B429;stroke:none;animation:a-pop 2.4s ease-in-out infinite}'+'.at-art .a-hand{transform-origin:50px 26px;animation:a-spin 3.4s linear infinite}'+'.at-art .a-lid{animation:a-lid 2.6s ease-in-out infinite}.at-art .a-band{stroke:#F0B429}'+'.at-art .a-steam{stroke:#F0B429;animation:a-steam 2.4s ease-out infinite}.at-art .a-s2{animation-delay:.7s}'+'.at-art .a-van{animation:a-ride 2.2s ease-in-out infinite alternate}.at-art .a-road{stroke:#DFE4EC;stroke-dasharray:6 5}'+'.at-art .a-door{transform-origin:27px 21px;animation:a-openz 3s ease-in-out infinite;transform-style:preserve-3d}'+'.at-art .a-cool{fill:#9CC7E8;stroke:none;animation:a-pulse 2s ease-in-out infinite}.at-art .a-c2{animation-delay:.5s}'+'.at-art .a-menu rect{fill:#DFE4EC;stroke:none;animation:a-rowhi 2.4s ease-in-out infinite}'+'.at-art .a-menu rect:nth-child(2){animation-delay:.3s}.at-art .a-menu rect:nth-child(3){animation-delay:.6s}'+'.at-art .a-bell{transform-origin:32px 10px;animation:a-swing 1.9s ease-in-out infinite}'+'.at-art .a-ping{fill:#F0B429;stroke:none;animation:a-ping 1.9s ease-out infinite}'+'.at-art .a-bars rect{fill:#EDF0F5;stroke:#14181F;transform-origin:center bottom;animation:a-grow 2.6s ease-out infinite}'+'.at-art .a-bars rect:nth-child(2){animation-delay:.2s}.at-art .a-bars rect:nth-child(3){animation-delay:.4s}'+'.at-art .a-base{stroke:#DFE4EC}'+'.at-art .a-coin{transform-origin:24px 21px;animation:a-flip 3.2s ease-in-out infinite;transform-style:preserve-3d}'+'.at-art .a-coin2{stroke:#F0B429;animation:a-pulse 2.2s ease-in-out infinite}'+'.at-art .a-tick2{fill:#FFF8E8;stroke:#14181F}.at-art .a-off{fill:#F0B429;stroke:none;animation:a-pop 2.4s ease-in-out infinite}'+'.at-art .a-card{animation:a-slidein 2.8s ease-out infinite}'+'.at-art .a-star{fill:#F0B429;stroke:#14181F;animation:a-pop 2.6s ease-in-out infinite}'+'.at-art .a-no{stroke:#D94E4E;animation:a-pulse 2.2s ease-in-out infinite}'+'.at-art .a-beam{transform-origin:32px 14px;animation:a-tip 2.8s ease-in-out infinite}'+'.at-art .a-shake{transform-origin:32px 36px;animation:a-shake 1.3s ease-in-out infinite}'+'.at-art .a-grain{fill:#F0B429;stroke:none;animation:a-fall 1.6s ease-in infinite}.at-art .a-g2{animation-delay:.5s}'+'.at-art .a-sp{fill:#F0B429;stroke:none;animation:a-pulse 2s ease-in-out infinite}'+'.at-art .a-sp2{animation-delay:.4s}.at-art .a-sp3{animation-delay:.8s}'+'.at-art .a-cart{animation:a-ride 2.4s ease-in-out infinite alternate}'+'.at-art .a-drop{stroke:#F0B429;animation:a-motion 1.8s ease-in-out infinite}'+'.at-art .a-slice{fill:#F0B429;stroke:#14181F;transform-origin:32px 21px;animation:a-pop 2.6s ease-in-out infinite}'+'.at-art .a-flap{stroke:#F0B429;stroke-dasharray:60;animation:a-draw 2.8s ease-in-out infinite}'+'.at-art .a-swap{animation:a-swapo 3.2s ease-in-out infinite}.at-art .a-sw2{animation:a-swapi 3.2s ease-in-out infinite}'+'.at-art .a-tagw{animation:a-slidein 2.8s ease-out infinite}'+'@media(prefers-reduced-motion:reduce){.at-art *{animation:none!important}}';
(function(){var PAGE='plan',VER='v1',TOURS={"intro": [{"sel": "#stepbar", "title": "The FIVE Steps", "text": "Complete the FIVE Steps.", "art": "steps"}, {"sel": "#s1", "title": "Step 1. About You", "text": "We calculate your Calories and Macros from these INFOs.", "art": "user"}, {"sel": "#coachBtn", "title": "Not Sure What To Pick?", "text": "Let us decide for you!", "art": "spark"}, {"sel": "#liveMacros", "title": "Your Numbers are LIVE.", "text": "Live Numbers.", "art": "macro"}], "week": [{"sel": "#days", "title": "Step 2 · How many days", "text": "How much of your week AERA should cover.", "art": "cal"}, {"sel": "#mpd", "title": "How many of them are ours", "text": "Meals a Day from us, the rest of your Day stays yours.", "art": "plate"}, {"sel": "#total", "title": "Meals you eat in a Day", "text": "Tell us your whole Day so the Calories split properly.", "art": "macro"}], "prefs": [{"sel": "#avoid", "title": "Start with what you DO NOT eat", "text": "Anything you tick here will be left out of every Meal.", "art": "no"}, {"sel": "#planMode", "title": "How we build your Meals", "text": "Prioritise your Goal.", "art": "scale"}, {"sel": "#saAll", "title": "In a hurry? Tick everything", "text": "<b>Select All</b> ticks every list on this page at once.", "art": "tick", "pad": 6}, {"sel": "#seasoning", "title": "Seasoning &amp; Spice", "text": "Normal, Less OR None. Kitchen preps accordingly.", "art": "shaker"}], "plan": [{"sel": "#sideTargets", "title": "Step 4 · Your plan", "text": "The week we built, with your Daily Target beside it.", "art": "macro"}, {"sel": "#sidePrice", "title": "What it costs", "text": "Moves with your portions. Delivery comes at Checkout.", "art": "coin"}, {"sel": "#favLink", "title": "Keep it, share it, or bring your own", "text": "Favourite it, send it to your Coach, or upload a plan you already have.", "art": "star"}], "order": [{"sel": "#orderSummary", "title": "Step 5 · Check it over", "text": "Everything you chose, in one list.", "art": "receipt"}, {"sel": "#orderBtn", "title": "Into the cart", "text": "This takes the whole week to Checkout.", "art": "cart"}]},HELP='How It Works';function key(k){return 'aera.tour.'+PAGE+'.'+k+'.'+VER}function seen(k){try{return localStorage.getItem(key(k))==='1'}catch(e){return true}}function mark(k){try{localStorage.setItem(key(k),'1')}catch(e){}}var $=function(s){return document.querySelector(s)};var S={k:'',i:0,steps:[],anim:false,pct:0},mask,ring,card;function vis(e){if(!e)return false;var r=e.getBoundingClientRect();if(!r.width&&!r.height)return false;var cs=getComputedStyle(e);return cs.visibility!=='hidden'&&cs.display!=='none'}
/* A step may name a list of targets -- the desktop control first, then the phone one it
hides behind. The first that is actually on screen is the one we ring. */
function stEl(st){if(!st||!st.sel)return null;var a=(typeof st.sel==='string')?[st.sel]:st.sel;for(var i=0;i<a.length;i++){var e=$(a[i]);if(vis(e))return e}return null}function build(){if(mask)return;if(typeof ART_CSS==='string'&&!document.getElementById('atArtCss')){var ac=document.createElement('style');ac.id='atArtCss';ac.textContent=ART_CSS;
(document.head||document.documentElement).appendChild(ac)}mask=document.createElement('div');mask.className='at-mask';ring=document.createElement('div');ring.className='at-ring';mask.appendChild(ring);card=document.createElement('div');card.className='at-card';document.body.appendChild(mask);document.body.appendChild(card);mask.addEventListener('click',function(e){if(e.target===mask)next()});document.addEventListener('keydown',function(e){if(!S.steps.length)return;if(e.key==='Escape'){e.preventDefault();stop(false)}else if(e.key==='ArrowRight'||e.key==='Enter'){e.preventDefault();next()}else if(e.key==='ArrowLeft'){e.preventDefault();back()}});addEventListener('resize',place);addEventListener('scroll',place,true)}function paint(){var st=S.steps[S.i],n=S.steps.length;if(!st)return;var pct=Math.round((S.i+1)/n*100);card.innerHTML='<div class="at-tip"></div>'+'<button class="at-x" type="button" aria-label="Close walkthrough">×</button>'+'<div class="at-prog"><i style="width:'+S.pct+'%"></i></div>'+'<div class="at-n">Step '+(S.i+1)+' of '+n+'</div>'+
(st.art&&ART[st.art]?'<div class="at-art"><svg viewBox="0 0 64 40" aria-hidden="true">'+ART[st.art]+'</svg></div>':'')+'<div class="at-t">'+st.title+'</div><div class="at-b">'+st.text+'</div>'+'<div class="at-f">'+(S.i?'<button class="at-btn at-o" type="button" data-a="back">Back</button>'
:'<button class="at-btn at-o" type="button" data-a="skip">Skip</button>')+'<button class="at-btn" type="button" data-a="next">'+(S.i===n-1?'Got It':'Next')+'</button></div>';var fill=card.querySelector('.at-prog i');requestAnimationFrame(function(){if(fill)fill.style.width=pct+'%'});S.pct=pct;card.querySelector('.at-x').onclick=function(){stop(false)};
[].forEach.call(card.querySelectorAll('[data-a]'),function(b){b.onclick=function(){var a=b.getAttribute('data-a');a==='next'?next():a==='back'?back():stop(false)}})}function tipAt(x,where,cw){var t=card.querySelector('.at-tip');if(!t)return;if(!where){t.style.display='none';return}t.style.display='block';t.style.left=Math.min(Math.max(16,x),cw-30)+'px';t.style.top=where==='below'?'-7px':'';t.style.bottom=where==='above'?'-7px':''}function animate(){if(!S.anim)return;S.anim=false;card.classList.remove('at-anim');void card.offsetWidth;card.classList.add('at-anim')}function place(){if(!S.steps.length)return;var st=S.steps[S.i];if(!st)return;var t=stEl(st);if(!t){ring.style.display='none';mask.classList.add('at-dim');card.className='at-card on at-mid';tipAt(0,null,0);animate();return}ring.style.display='';mask.classList.remove('at-dim');var r=t.getBoundingClientRect(),pad=st.pad==null?10:st.pad;var y1=Math.max(6,r.top-pad),y2=Math.min(innerHeight-6,r.bottom+pad);var x1=Math.max(6,r.left-pad),x2=Math.min(innerWidth-6,r.right+pad);ring.style.left=x1+'px';ring.style.top=y1+'px';ring.style.width=Math.max(24,x2-x1)+'px';ring.style.height=Math.max(24,y2-y1)+'px';if(innerWidth<640){card.className='at-card on at-sheet';tipAt(0,null,0);animate();return}card.className='at-card on';var cw=Math.min(340,innerWidth-24);card.style.width=cw+'px';var ch=card.offsetHeight||190;var below=r.bottom+18,above=r.top-ch-18,where='below';var top=below;if(below+ch>innerHeight-10){if(above>10){top=above;where='above'}else{top=Math.max(10,(innerHeight-ch)/2);where=null}}top=Math.min(Math.max(10,top),Math.max(10,innerHeight-ch-10));var left=Math.min(Math.max(12,r.left+r.width/2-cw/2),innerWidth-cw-12);card.style.top=top+'px';card.style.left=left+'px';tipAt(r.left+r.width/2-left-7,where,cw);animate()}function show(){var st=S.steps[S.i];if(!st)return stop(true);var t=stEl(st);if(st.sel&&!t){S.i++;return show()}paint();S.anim=true;if(t){
/* the shop sets scroll-behavior:smooth, so scroll by hand and instantly -- a tour that
lands before the page finishes gliding points at the wrong thing */
var r=t.getBoundingClientRect();if(r.top<90||r.bottom>innerHeight-90){var keep=Math.min(r.height,innerHeight*0.8);var y=(window.pageYOffset||0)+r.top-Math.max(20,(innerHeight-keep)/2);y=Math.max(0,y);try{window.scrollTo({top:y,behavior:'instant'})}catch(e){window.scrollTo(0,y)}}
[40,200,520].forEach(function(ms){setTimeout(place,ms)})}place()}function next(){if(S.i>=S.steps.length-1)return stop(true);S.i++;show()}function back(){if(!S.i)return;S.i--;show()}function stop(done){S.steps=[];S.pct=0;mask.classList.remove('on');card.classList.remove('on');if(S.k)mark(S.k);S.k=''}function start(k,force){var t=TOURS[k];if(!t||!t.length)return;build();if(typeof tourPrep==='function'){try{tourPrep(k,force)}catch(e){}}var steps=[],last=null;t.forEach(function(st){var e=stEl(st);if(st.sel&&!e)return;                 /* its control is not on this screen */
if(e&&e===last)return;                /* the step before it rang the same control */
last=e;steps.push(st)});if(!steps.length)return;
/* a tour that comes down to its opening card alone teaches nothing : on a first visit stay
out of the way and leave it for the Help button, which passes force */
if(!force&&steps.length<2)return;S.k=k;S.i=0;S.steps=steps;S.pct=0;mask.classList.add('on');card.classList.add('on');show()}function auto(k){if(!seen(k))setTimeout(function(){start(k)},900)}function which(){return (typeof tourWhich==='function'&&tourWhich())||Object.keys(TOURS)[0]}function helpBtn(){var help=document.createElement('button');help.type='button';help.className='at-help';help.id='atHelp';help.innerHTML='<i>?</i> '+HELP;help.onclick=function(){start(which(),true)};document.body.appendChild(help)}window.AERATOUR={start:start,auto:auto,seen:seen,stop:stop};function boot(){build();helpBtn();auto(which())}if(document.readyState==='loading')addEventListener('DOMContentLoaded',boot);else boot();})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
(function(){var g=window.goStep;if(typeof g!=='function')return;window.goStep=function(){g.apply(this,arguments);setTimeout(function(){var k=tourWhich();if(window.AERATOUR&&!AERATOUR.seen(k))AERATOUR.start(k)},450)}})();

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
Object.assign(window.AERA_I18N,{
"Return to Homepage":"返回首页","Home":"首页","Shop ▾":"选购 ▾","Meal Bundles":"一周套餐","Fat Loss Meals":"减脂餐","Mass Gain Meals":"增肌餐","All Meals":"全部餐点","À la Carte":"单点","Merchandise":"周边商品","Free Delivery Vouchers":"免运费优惠券","My Account":"我的账户","How It Works":"运作方式","Terms & Conditions":"条款与细则",
"Personalised Meal Plan":"个人定制餐单","Your Plan, Your Macros":"您的餐单，您的营养比例","Tell us about you and your Goal. We work out your Daily Calories and Macros, then build a week of Meals from our Kitchen. Every portion weighed to the gram. Adjust anything, then Order it.":"告诉我们您的身体数据与目标。我们会算出您的每日热量与营养比例，再用厨房的餐点排出一周。每一份都称到克。任何地方都可以调整，然后下单。","1 · About You":"1 · 关于您","2 · Your Week":"2 · 您的一周","3 · Meal Preferences":"3 · 饮食偏好","4 · Your Plan":"4 · 您的餐单","5 · Order":"5 · 下单","Your Free Month of the Personalised Meal Plan has":"您的个人定制餐单免费月还剩","Days left.":"天。","See what happens after":"了解之后会怎样",
"About You":"关于您","Your numbers update as you go. Nothing is saved until you Order.":"数字会随着您的输入即时更新。在下单之前不会保存任何资料。","Gender":"性别","Male":"男","Female":"女","Date Of Birth":"出生日期","Day":"日","Month":"月","Year":"年","Jan":"1 月","Feb":"2 月","Mar":"3 月","Apr":"4 月","May":"5 月","Jun":"6 月","Jul":"7 月","Aug":"8 月","Sep":"9 月","Oct":"10 月","Nov":"11 月","Dec":"12 月","Bodyweight ( Kg )":"体重（公斤）","Height ( Cm )":"身高（厘米）","Daily Macronutrients":"每日营养素","KCALs":"大卡","at rest":"静息","Protein":"蛋白质","Carbs":"碳水","Fat":"脂肪",
"Not Sure What To Pick?":"不确定要选哪个？","Our Assistant will suggest an Activity Level, Body Type, Goal and How many Meals a Day to take, with a reason for each. Everything stays yours to change.":"我们的助手会为您建议活动量、体型、目标与每天几餐，并说明理由。所有选择您都可以自行更改。","Suggest My Settings":"帮我建议设定","Activity Level — What Is Your Activity Level In A Week?":"活动量 — 您一周的活动量如何？","The Minimum Caloric Intake":"最低热量摄取","Not Active — Lower Caloric needs ( BMR × 1.2 )":"不常活动 — 热量需求较低（BMR × 1.2）","Moderate Caloric Intake":"中等热量摄取","Moderately Active — Moderate Caloric needs ( BMR × 1.375 )":"中度活动 — 热量需求中等（BMR × 1.375）","High Caloric Intake":"高热量摄取","Active — High Caloric needs ( BMR × 1.45 )":"经常活动 — 热量需求较高（BMR × 1.45）",
"Body Type — Please Describe Your Current Body Type":"体型 — 请描述您目前的体型","Ectomorph":"外胚型（瘦长型）","Naturally lean, burns through food — +5% Calories and a little more Carbs":"天生偏瘦，吃得快消耗 — 热量 +5%，碳水略多","Mesomorph":"中胚型（运动型）","Athletic build, gains and loses easily — No change":"体格结实，容易增也容易减 — 不作调整","Endomorph":"内胚型（易胖型）","Gains easily, holds Fat — −5% Calories, fewer Carbs, more Protein":"容易增重、脂肪较难消 — 热量 −5%，碳水较少，蛋白质较多",
"Goal — Which Goal Are You Striving For?":"目标 — 您想达成哪个目标？","Fat Loss":"减脂","50% Protein · 30% Carbs · 20% Fat · −200 KCALs":"蛋白质 50% · 碳水 30% · 脂肪 20% · −200 大卡","Lean Mass Gain":"精瘦增肌","45% Protein · 30% Carbs · 25% Fat · +200 KCALs":"蛋白质 45% · 碳水 30% · 脂肪 25% · +200 大卡","Mass Gain":"增肌","35% Protein · 45% Carbs · 20% Fat · +200 KCALs":"蛋白质 35% · 碳水 45% · 脂肪 20% · +200 大卡","Just Healthy":"吃得健康就好","40% Protein · 40% Carbs · 20% Fat · Maintain":"蛋白质 40% · 碳水 40% · 脂肪 20% · 维持","Create My Own Macros":"自订我的营养比例","Type your Own Split":"输入您自己的比例","By Percentage":"按百分比","By Grams":"按克数","Protein %":"蛋白质 %","Carbs %":"碳水 %","Fat %":"脂肪 %","Protein ( G )":"蛋白质（克）","Carbs ( G )":"碳水（克）","Fat ( G )":"脂肪（克）","Adds up to 100% — Good.":"合计 100% — 没问题。","Next : Your Week →":"下一步：您的一周 →",
"Your Week":"您的一周","How much of your week AERA should cover, and what you like to eat.":"AERA 要覆盖您一周中的多少餐，以及您喜欢吃什么。","How Much Should We Cover?":"我们要覆盖多少？","Days Of Meal Plan":"餐单天数","5 Days":"5 天","6 Days":"6 天","7 Days":"7 天","AERA Meals Per Day":"每天几份 AERA 餐点","1 Meal":"1 餐","2 Meals":"2 餐","3 Meals":"3 餐","Meals You Eat In A Day":"您一天吃几餐","What You Eat Outside AERA ( Optional )":"AERA 以外您吃的东西（选填）","Type anything you eat most days that is not from us, a Shake, Breakfast, a Snack. We look up the Macros, you pick the portion, and we take it off your Target so AERA Meals fill only what is left.":"输入您大部分日子会吃、但不是我们提供的东西，例如蛋白奶昔、早餐、零食。我们会查出营养值，您选份量，我们再从您的目标中扣除，AERA 餐点只补上剩下的部分。","+ Add a Home-Sourced Meal":"+ 新增一份自备餐点","Find The Macros":"查询营养值","Or enter the numbers myself →":"或由我自己输入数字 →","Calories ( Kcal )":"热量（大卡）","Add To My Day":"加入我的一天","Cancel":"取消","Sign In To See Your Plan":"登录以查看您的餐单","Your answers are saved. Sign in, or create a free AERA account, and your Plan is built straight away. Your first month of the Personalised Meal Plan is free.":"您的回答已保存。登录或免费注册 AERA 账户后，我们会立即为您生成餐单。个人定制餐单的第一个月免费。","Sign In":"登录","Create A Free Account":"免费注册账户","← Back To Meal Preferences":"← 返回饮食偏好","− Delete Day":"− 删除当天","Next Day":"下一天","Previous Day":"前一天","Close":"关闭","Nothing keyed in yet. Press + Add a Home-Sourced Meal above and what you add will be listed here.":"还没有输入任何内容。点击上方的「+ 新增一份自备餐点」，加入的内容会列在这里。","← Back":"← 返回","Next : Meal Preferences →":"下一步：饮食偏好 →",
"Meal Preferences":"饮食偏好","Select All":"全选","We mix and match from what you pick here. Leave a list untouched and we will use anything from it.":"我们会从您在这里选的项目中搭配。某个清单不动的话，我们就会从中任意挑选。","I Do Not Want…":"我不要…","Start here. Anything you cannot eat or would rather never see, we leave it out of every Meal and it disappears from the lists below.":"从这里开始。任何您不能吃或不想看到的，我们都不会放进任何一餐，它也会从下方清单中消失。","Prawn":"虾","Fish":"鱼","Beef":"牛肉","Egg":"蛋","Peanut & Nuts":"花生与坚果","Tofu":"豆腐","Pasta":"意面","Toast":"吐司",
"How Should We Build Your Meals?":"我们该怎么帮您配餐？","Both stay inside your Calorie Target. This decides what we hold onto when a Meal cannot be everything at once.":"两种方式都会控制在您的热量目标内。这只是决定当一餐无法兼顾时，我们优先保住什么。","Strict Macros":"严格比例","We hold your Protein, Carbs and Fat as close to the split as the Kitchen allows. Leaner cuts and Oil-Free Vegetables when the Fat Budget is tight":"在厨房条件允许下，尽量贴近您的蛋白质、碳水与脂肪比例。脂肪额度吃紧时会用更瘦的部位与无油蔬菜","Calories Only":"只看热量","We hit your Daily Calories and let the Macros fall where they fall. More variety in the box, less exact on the split":"达到您的每日热量即可，比例顺其自然。菜色更多样，比例没那么精准",
"Which Proteins should we build your Meals around?":"您希望以哪些蛋白质为主来配餐？","Chicken":"鸡肉","Seafood & Fish":"海鲜与鱼","None":"不选","Not in your plan":"不在您的餐单内","Stir-Fried Dishes":"热炒类","Carbohydrates":"碳水","Pick the Carbs you want with your Meals.":"选择您想搭配的碳水。","Rice":"饭类","Potato & Sweet Potato":"马铃薯与番薯","No Carbs":"不要碳水","Vegetables":"蔬菜","Tick the ones you like. Oil-Free versions are cooked without Oil, so they carry less Fat.":"勾选您喜欢的。无油版本在烹调时不放油，脂肪较低。","No Vegetables":"不要蔬菜","Oil-Free Only":"只要无油","Garnish":"配菜","A small extra in the box.":"餐盒里的一点小配料。","No Garnish":"不要配菜","Sauces & Gravies":"酱汁与浓酱","How often would you like a Sauce, and which ones?":"您希望多常有酱汁，以及要哪几种？","Where it Fits":"在合适时搭配","No Sauce":"不要酱汁","Seasoning & Spice":"调味与辣度","Seasoning":"调味","Normal Salt":"正常盐","Less Salt":"少盐","No Salt":"无盐","Spice":"辣度","Normal Spice":"正常辣","Less Spicy":"少辣","No Spice":"不辣","Build My Plan →":"生成我的餐单 →",
"Your Plan":"您的餐单","Reset":"重设","Start a New Plan":"重新制定餐单","Save Plan":"保存餐单","★ Favourite":"★ 收藏","Download Slides":"下载简报","Share with my Coach":"分享给我的教练","My Favourites":"我的收藏","I already have a Plan":"我已经有餐单了","A Second Opinion":"再听一个意见","Have our Assistant look over the week before you Order. Protein, variety, and what to eat in the Meals we are not covering.":"下单前让我们的助手帮您看一遍这一周：蛋白质、菜色变化，以及我们没覆盖到的那几餐该吃什么。","Review My Plan":"检视我的餐单","← Change Answers":"← 修改答案","↻ Regenerate":"↻ 重新生成","Add To Cart →":"加入购物车 →","Daily Target":"每日目标","Total Price":"总价","Order Your Plan":"订购您的餐单","← Back To Plan":"← 返回餐单","Add Plan to Cart & Checkout →":"把餐单加入购物车并结账 →","Personalised Meal Plan — AERA Meal Prep":"个人定制餐单 — AERA Meal Prep",
"e.g. Nasi Lemak, 2 Boiled Eggs, Milo Ais":"例如：椰浆饭、2 颗水煮蛋、美禄冰"
});
window.AERA_I18N_RE.push(
[/^Age (\d+)$/,"年龄 $1"],[/^All (\d+) Dishes$/,"全部 $1 道"],[/^My Account · (.+)$/,"我的账户 · $1"],[/^Based on your Basal Metabolic Rate of ([\d,]+) KCALs \( At Rest \) — pick an activity level below for your full Daily Intake · Fat Loss split (.+)$/,"以您的基础代谢率 $1 大卡（静息）为基准 — 在下方选择活动量，即可算出完整的每日摄取量 · 减脂比例 $2"],[/^Based on your Basal Metabolic Rate of ([\d,]+) KCALs \( At Rest \) — pick an activity level below for your full Daily Intake · Lean Mass Gain split (.+)$/,"以您的基础代谢率 $1 大卡（静息）为基准 — 在下方选择活动量，即可算出完整的每日摄取量 · 精瘦增肌比例 $2"],[/^Based on your Basal Metabolic Rate of ([\d,]+) KCALs \( At Rest \) — pick an activity level below for your full Daily Intake · Mass Gain split (.+)$/,"以您的基础代谢率 $1 大卡（静息）为基准 — 在下方选择活动量，即可算出完整的每日摄取量 · 增肌比例 $2"],[/^Based on your Basal Metabolic Rate of ([\d,]+) KCALs \( At Rest \) — pick an activity level below for your full Daily Intake · Just Healthy split (.+)$/,"以您的基础代谢率 $1 大卡（静息）为基准 — 在下方选择活动量，即可算出完整的每日摄取量 · 吃得健康比例 $2"],[/^Based on your Basal Metabolic Rate of ([\d,]+) KCALs \( At Rest \) — pick an activity level below for your full Daily Intake · Custom split (.+)$/,"以您的基础代谢率 $1 大卡（静息）为基准 — 在下方选择活动量，即可算出完整的每日摄取量 · 自订比例 $2"],[/^AERA provides (\d+) of your (\d+) Daily Meals, about ([\d,]+) KCALs and ([\d,]+) g Protein a day\. The rest comes from your Own Meals and Snacks\.$/,"AERA 提供您每天 $2 餐中的 $1 餐，约 $3 大卡、蛋白质 $4 克。其余由您自己的餐点与零食补上。"]
);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Skip":"略过","Next":"下一步","Back":"上一步","Done":"完成","Got it":"知道了","Got It":"知道了","GOT IT":"知道了","Finish":"完成",
"The FIVE Steps":"五个步骤","Complete the FIVE Steps.":"完成这五个步骤。","Step 1. About You":"步骤 1．关于您","We calculate your Calories and Macros from these INFOs.":"我们会用这些资料算出您的热量与营养比例。","Let us decide for you!":"让我们帮您决定！","Your Numbers are LIVE.":"您的数字是即时的。","Live Numbers.":"即时更新的数字。","Step 2 · How many days":"步骤 2 · 要几天","How much of your week AERA should cover.":"AERA 要覆盖您一周中的多少。","How many of them are ours":"其中几餐由我们提供","Meals a Day from us, the rest of your Day stays yours.":"每天由我们提供几餐，其余仍由您自己安排。","Meals you eat in a Day":"您一天吃几餐","Tell us your whole Day so the Calories split properly.":"告诉我们您一整天的情况，热量才能正确分配。","Start with what you DO NOT eat":"先从您不吃的开始","Anything you tick here will be left out of every Meal.":"您在这里勾选的，每一餐都不会出现。","How we build your Meals":"我们怎么帮您配餐","Prioritise your Goal.":"以您的目标为优先。","In a hurry? Tick everything":"赶时间？全部勾选","ticks every list on this page at once.":"会一次勾选这一页的所有清单。","Normal, Less OR None. Kitchen preps accordingly.":"正常、减少或完全不要。厨房会照着做。","Step 4 · Your plan":"步骤 4 · 您的餐单","The week we built, with your Daily Target beside it.":"我们排出的这一周，旁边是您的每日目标。","What it costs":"价格是多少","Moves with your portions. Delivery comes at Checkout.":"会随您的份量变动。配送费在结账时计算。","Keep it, share it, or bring your own":"保存、分享，或自带餐单","Favourite it, send it to your Coach, or upload a plan you already have.":"收藏它、寄给您的教练，或上传您已经有的餐单。","Step 5 · Check it over":"步骤 5 · 再确认一次","Everything you chose, in one list.":"您选的所有内容，集中成一份清单。","Into the cart":"加入购物车","This takes the whole week to Checkout.":"这会把整整一周带到结账页。"
});
window.AERA_I18N_RE.push([/^Step (\d+) of (\d+)$/i,"第 $1 步，共 $2 步"]);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Please fill in your date of birth, bodyweight and height first.":"请先填写出生日期、体重与身高。","Please pick your activity level.":"请选择您的活动量。","We could not load our kitchen list just now. Please refresh the page — if it keeps happening, your connection is blocking my.chatbees.io.":"目前无法载入厨房的菜色清单。请重新整理页面 — 若持续发生，可能是您的网络挡住了 my.chatbees.io。","Enter protein, carbs and fat in grams — we work out the calories for you.":"以克为单位输入蛋白质、碳水与脂肪 — 热量由我们计算。","Meal duplicated.":"已复制这一餐。","Every Day needs at least one Meal. Use Delete Day if you do not want this Day at all.":"每一天至少要有一餐。若完全不需要这一天，请用「移除这一天」。","A Plan needs at least one Day.":"餐单至少要有一天。","Day removed.":"已移除这一天。","Carbs in this Meal are already at or under Target.":"这一盒的碳水已经等于或低于目标。","Fat in this Meal is already at or under Target.":"这一盒的脂肪已经等于或低于目标。","Carbs are already at our smallest Portion, or this Meal has no Carbs. We never take the Carbs out. Use the × in the table for that.":"碳水已经是我们最小的份量，或这一盒本来就没有碳水。我们不会直接拿掉碳水 — 要拿掉请用表格中的 ×。","This Meal is already as low in Fat as these Recipes go.":"以这些菜色来说，这一盒的脂肪已经降到最低。","This is already the cheapest combination from the Items you picked.":"以您选的项目来说，这已经是最便宜的组合。","This Plan is as it was built.":"这份餐单就是最初生成的样子。","Back to the Plan we first built for you.":"已回到我们最初为您生成的餐单。","Your first month is free. After that, keep the builder for RM 21.99 a month or RM 129.99 a year — cancel any time.":"第一个月免费。之后可以每月 RM 21.99 或每年 RM 129.99 继续使用 — 随时可取消。","The Personalised Meal Plan builder is a subscription. Choose a plan and it unlocks again — every answer and every plan you have saved is still here.":"个人定制餐单工具为订阅制。选择一个方案即可重新解锁 — 您所有的答案与已保存的餐单都还在。","Sign in first so your subscription is matched to your account.":"请先登录，让订阅与您的账户对应。","Please enter your email address.":"请输入您的电邮地址。","No items in cart.":"购物车里没有项目。","An email address is required to complete checkout.":"完成结账需要电邮地址。","Thank you for your order.":"感谢您的订购。"
});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Your Meal Plan Subscription":"您的餐单订阅","Your free month has ended":"您的免费月已结束","Monthly":"每月","Annually":"每年","Billed every month":"每月扣款一次","Billed once a year — RM 10.83 a month":"每年扣款一次 — 相当于每月 RM 10.83","Subscribe":"订阅","Opening Soon":"即将开放","Subscribing as":"订阅使用的电邮：","— please pay with this same email so we can match it to your account.":"— 请用同一个电邮付款，我们才能对应到您的账户。","Payment opens in a new tab. When it is done, come back and refresh this page.":"付款会在新分页开启。完成后请回到这里并重新整理页面。","← Back To My Plan":"← 返回我的餐单","Shop The Meals":"选购餐点","Day left.":"天。","ends Today.":"今天结束。","Day left":"天","Days left":"天"
});
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
if(document.documentElement.getAttribute('data-lang')==='zh'){var st=document.createElement('style');st.textContent='.mtitle i,.swapbtn span,.srow em,.dishes label span,.found .nm{white-space:pre-line}';(document.head||document.documentElement).appendChild(st)}
Object.assign(D,{
"Green Curry, Barramundi & Sambal, Soy Garlic Chicken, Pad Krapow, Bolognese, Cauliflower Fried Rice…":"青咖喱、金目鲈配参巴、蒜香酱油鸡、九层塔鸡、番茄肉酱意面、花椰菜炒饭…","Salmon & Mushroom Gravy, Teriyaki Chicken & Sweet Potato, Spicy Chicken & Pesto, Aglio Olio Prawn…":"三文鱼配蘑菇酱、照烧鸡配番薯、香辣鸡配青酱、蒜香橄榄油虾意面…","Black Pepper Chicken, Salted-Egg Chicken Thigh, Toman Fish, Katsu Curry, Gam Hiong Chicken…":"黑胡椒鸡、咸蛋黄鸡腿、多曼鱼、日式咖喱炸鸡扒、甘香鸡…","Creamy Mushroom Pasta, Assam Fettuccine Prawn, Quinoa Fried Rice, Kung Pao Chicken, Egg Fried Brown Rice…":"蘑菇酱意面、亚参宽面配虾、藜麦炒饭、宫保鸡、蛋炒糙米饭…"
});
if(window.aeraRetranslate)window.aeraRetranslate();
})();

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
Object.assign(window.AERA_I18N||{},{"Terms & Conditions":"条款与条件","Privacy Notice":"隐私声明"});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-CONSENT : explicit consent before health information is stored, and a clear
   notice before the AI coach sends anything to OpenAI ( PDPA 2010 ). Consent is kept
   on the device and, once signed in on My Account, copied to the customer's profile. */
(function(){
 var KEY='aera.consent',PN='https://my.chatbees.io/p/xXH4dXALg';
 var EN={health:{h:'Your Health Information',
   p:'Body Measurements, Weight Control readings and Allergies are Health Information. We store them only to cook your Meals safely, build your Plan and show your Progress. You can delete them at any time.',
   c:'I agree that AERA may store and use my Health Information for these purposes.',y:'Agree & Continue'},
  coach:{h:'Before The Coach Answers',
   p:'To make its suggestions, the coach sends your sex, age, height, bodyweight and BMI, the food you type, or the meals in your plan to OpenAI in the United States.',
   c:'I agree to this.',y:'Agree & Ask The Coach'},
  pn:'Read our Privacy Notice',no:'Cancel'};
 var ZH={health:{h:'您的健康资料',
   p:'身体数据、体重管理记录和过敏资料属于健康资料。我们只会用它们来安全地烹调您的餐点、制定您的餐单，并显示您的进度。您可以随时删除这些资料。',
   c:'我同意 AERA 为上述用途储存和使用我的健康资料。',y:'同意并继续'},
  coach:{h:'教练回答之前',
   p:'为了给出建议，教练会把您的性别、年龄、身高、体重和 BMI、您输入的食物，或您餐单里的餐点发送到位于美国的 OpenAI。',
   c:'我同意。',y:'同意并询问教练'},
  pn:'阅读我们的隐私声明',no:'取消'};
 function get(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
 function prof(){try{return (typeof PROFILE!=='undefined'&&PROFILE)||null}catch(e){return null}}
 function has(k){if(get()[k])return true;var p=prof();return !!(p&&p[k+'_consent_at'])}
 var tried={};
 function sync(){try{
  if(typeof sb==='undefined'||!sb||typeof USER==='undefined'||!USER)return;
  var c=get(),p=prof()||{},up={id:USER.id,email:String(USER.email||'').toLowerCase()},any=false;
  ['health','coach'].forEach(function(k){if(c[k]&&!p[k+'_consent_at']&&!tried[k]){up[k+'_consent_at']=c[k];tried[k]=1;any=true}});
  if(!any)return;
  sb.from('profiles').upsert(up).then(function(r){if(r&&!r.error){var q=prof();if(q)Object.assign(q,up)}})}catch(e){}}
 function put(k){var c=get();c[k]=new Date().toISOString();try{localStorage.setItem(KEY,JSON.stringify(c))}catch(e){}sync()}
 function css(){if(document.getElementById('aeraConsentCss'))return;var s=document.createElement('style');s.id='aeraConsentCss';
  s.textContent='#aeraConsent{position:fixed;inset:0;z-index:2147483000;background:rgba(11,28,54,.55);display:flex;align-items:center;justify-content:center;padding:18px}'+
  '#aeraConsent .acx{background:#fff;color:#0B0B0B;max-width:440px;width:100%;border-radius:16px;padding:22px 22px 18px;box-shadow:0 20px 60px rgba(0,0,0,.3);font-family:Montserrat,system-ui,sans-serif;text-align:left}'+
  '#aeraConsent h3{margin:0 0 8px;font-size:18px;font-weight:800;color:#0E3576;text-transform:none}'+
  '#aeraConsent p{margin:0 0 12px;font-size:13.5px;line-height:1.55;color:#3A3A3A}'+
  '#aeraConsent label{display:flex;gap:9px;align-items:flex-start;font-size:13.5px;font-weight:600;cursor:pointer;line-height:1.45;color:#0B0B0B}'+
  '#aeraConsent label input{margin:2px 0 0;width:18px;height:18px;flex:none;accent-color:#16479E}'+
  '#aeraConsent .acn{margin:10px 0 0;font-size:12.5px}#aeraConsent .acn a{color:#16479E}'+
  '#aeraConsent .acb{display:flex;justify-content:flex-end;gap:8px;margin-top:16px;flex-wrap:wrap}'+
  '#aeraConsent button{font:700 13px Montserrat,system-ui,sans-serif;border-radius:99px;padding:10px 18px;cursor:pointer;border:1px solid #CBD2DE;background:#fff;color:#0B0B0B}'+
  '#aeraConsent .acyes{background:#FDB913;border-color:#FDB913}#aeraConsent .acyes:disabled{opacity:.45;cursor:not-allowed}';
  document.head.appendChild(s)}
 function ask(kind,go){css();var old=document.getElementById('aeraConsent');if(old)old.remove();
  var zh=document.documentElement.getAttribute('data-lang')==='zh',L=zh?ZH:EN,t=L[kind];
  var w=document.createElement('div');w.id='aeraConsent';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');
  w.innerHTML='<div class="acx"><h3></h3><p class="acp"></p><label><input type="checkbox" id="acChk"><span></span></label>'+
   '<p class="acn"><a target="_blank" rel="noopener"></a></p><div class="acb"><button type="button" class="acno"></button><button type="button" class="acyes" disabled></button></div></div>';
  w.querySelector('h3').textContent=t.h;w.querySelector('.acp').textContent=t.p;w.querySelector('label span').textContent=t.c;
  var a=w.querySelector('.acn a');a.href=PN;a.textContent=L.pn;
  w.querySelector('.acno').textContent=L.no;var yes=w.querySelector('.acyes');yes.textContent=t.y;
  var chk=w.querySelector('#acChk');chk.onchange=function(){yes.disabled=!chk.checked};
  w.querySelector('.acno').onclick=function(){w.remove()};
  w.onclick=function(e){if(e.target===w)w.remove()};
  yes.onclick=function(){if(!chk.checked)return;put(kind);w.remove();go()};
  document.body.appendChild(w);setTimeout(function(){chk.focus()},30)}
 window.aeraConsentHas=has;window.aeraConsentAsk=ask;
 /* buttons whose own onclick sends data off the device */
 var COACH=/^\s*(coachAsk|foodLookup)\s*\(/, STORE=/^\s*(savePlan|favPlan|sharePlan|orderPlan)\s*\(/;
 document.addEventListener('click',function(e){
  var b=e.target&&e.target.closest?e.target.closest('[onclick]'):null;if(!b||b.__aeraPass)return;
  var oc=String(b.getAttribute('onclick')||''),need=COACH.test(oc)?'coach':STORE.test(oc)?'health':null;
  if(!need||has(need))return;
  e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
  ask(need,function(){b.__aeraPass=true;try{b.click()}finally{b.__aeraPass=false}})},true);
 /* My Account forms that store health information */
 document.addEventListener('submit',function(e){
  var f=e.target;if(!f||f.__aeraPass)return;
  var os=String(f.getAttribute('onsubmit')||''),need=false;
  if(/bodySave|obSave/.test(os))need=true;
  else if(/savePrefs/.test(os)){var al=f.querySelector('#qAllergens');need=!!(al&&String(al.value).trim())}
  if(!need||has('health'))return;
  e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
  ask('health',function(){f.__aeraPass=true;try{if(f.requestSubmit)f.requestSubmit();else f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))}finally{f.__aeraPass=false}})},true);
 var n=0,iv=setInterval(function(){sync();if(++n>=15)clearInterval(iv)},4000);
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

(function(){
 if(window.__aeraBar)return;window.__aeraBar=1;
 if(window.top!==window)return; /* not inside the homepage's embedded pages */
 var H='https://aeramealprep.net',ACC=H+'/account/',CO=H+'/checkout/';
 var SBU="https://swpprjvubgcdsojapaad.supabase.co",KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cHByanZ1YmdjZHNvamFwYWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3ODUxNzIsImV4cCI6MjEwNDM2MTE3Mn0.zBvPkzlV5tYSkWiHnF0HB175QMt-u1tXFmR03urcp_0";
 var ZH={"My Account":"我的账户","Log In":"登录","Sign Up":"注册","Order Now":"立即订购","Signed in as":"已登录：","Order History":"订单记录","My Favourite Meal Plans":"我收藏的餐单","My Home-Sourced Meals":"我的自备餐点","AERA Points":"AERA 积分","Addresses":"收件地址","Settings":"账户设置","Referrer Portal":"推荐人专区","AERA Fridge":"AERA 冰柜","Log Out":"登出","Meal Bundles":"一周套餐","7 Days, Chef-Picked for your Goal":"7 天，主厨按您的目标挑选","À la Carte":"单点","Any Meals, your portion sizes":"任何餐点，按您的分量","Personalised Meal Plan":"个人定制餐单","Built to your Calories and Macros":"按您的热量和营养素设计","Merchandise":"周边商品","Spend your AERA Points":"用 AERA 积分兑换","Bundles":"套餐","Meals":"餐点","Personalised Plan":"个人定制计划","How It Works":"运作方式","Delivery":"配送","Gym Fridges":"健身房冰柜","FAQ":"常见问题","Track My Order":"追踪订单","Home":"首页"};
 function zh(){try{return document.documentElement.getAttribute('data-lang')==='zh'||(localStorage.getItem('aera_lang')||'en')==='zh'}catch(e){return false}}
 function t(s){return zh()&&ZH[s]?ZH[s]:s}
 function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
 function acct(){try{var a=JSON.parse(localStorage.getItem('aera.account')||'null');return a&&a.email?a:null}catch(e){return null}}
 var IC={find:'⌕',inbox:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8z"/><path d="M8 11h8M8 15h5"/></svg>',
  cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h2.6l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2l1.7-7.3H6.1"/></svg>'};
 function html(){var a=acct(),inn=!!a,fr=!!(a&&a.fridge);
  var am='<div class="ab-who">'+t('Signed in as')+'<b>'+esc(a?(a.name||a.email):'')+'</b><a class="ab-go" href="'+ACC+'#orders">'+t('My Account')+' <span aria-hidden="true">→</span></a></div>'+
   '<a href="'+ACC+'#orders">'+t('Order History')+'</a><a href="'+ACC+'#favs">'+t('My Favourite Meal Plans')+'</a><a href="'+ACC+'#home">'+t('My Home-Sourced Meals')+'</a>'+
   '<a href="'+ACC+'#points">'+t('AERA Points')+'</a><a href="'+ACC+'#addresses">'+t('Addresses')+'</a><a href="'+ACC+'#details">'+t('Settings')+'</a>'+
   '<div class="ab-sep"></div><a href="'+H+'/referrer-portal/">'+t('Referrer Portal')+'</a>'+(fr?'<a href="'+H+'/fridge/">'+t('AERA Fridge')+'</a>':'')+
   '<div class="ab-sep"></div><a href="#" class="ab-out" data-ab="out">'+t('Log Out')+'</a>';
  var om='<a href="'+H+'/#bundles">'+t('Meal Bundles')+'<small>'+t('7 Days, Chef-Picked for your Goal')+'</small></a><a href="'+H+'/#meals">'+t('À la Carte')+'<small>'+t('Any Meals, your portion sizes')+'</small></a>'+
   '<a href="'+H+'/meal-plan/">'+t('Personalised Meal Plan')+'<small>'+t('Built to your Calories and Macros')+'</small></a><a href="'+H+'/merchandise/">'+t('Merchandise')+'<small>'+t('Spend your AERA Points')+'</small></a>';
  var pn=[['/#bundles','Bundles'],['/#meals','Meals'],['/meal-plan/','Personalised Plan'],['/merchandise/','Merchandise'],['/#how','How It Works'],['/#delivery','Delivery'],['/#gyms','Gym Fridges'],['/#faq','FAQ'],['/#faq-points','AERA Points'],['/track/','Track My Order'],['/referrer-portal/','Referrer Portal']]
   .map(function(x){return '<a href="'+H+x[0]+'">'+t(x[1])+'</a>'}).join('')+(fr?'<a href="'+H+'/fridge/">'+t('AERA Fridge')+'</a>':'')+
   (inn?'<a class="ab-mobonly" href="'+ACC+'#orders">'+t('My Account')+'</a><a class="ab-mobonly ab-out" href="#" data-ab="out">'+t('Log Out')+'</a>'
       :'<a class="ab-mobonly" href="'+ACC+'#login">'+t('Log In')+'</a><a class="ab-mobonly" href="'+ACC+'#signup">'+t('Sign Up')+'</a>');
  return '<div class="ab-in"><a class="ab-logo" href="'+H+'/" aria-label="AERA Meal Prep">'+LOGOIMG+'</a><div class="ab-r">'+
   '<a class="ab-ic ab-find" href="'+H+'/?find=1" aria-label="Search">'+IC.find+'</a>'+
   '<button type="button" class="ab-lang" data-ab="lang" aria-label="Language / 语言"><span class="l1">EN</span><span class="l2">中文</span></button>'+
   (inn?'<div class="ab-dd ab-acct"><button type="button" class="ab-txt" data-ab="acct" aria-haspopup="true">'+t('My Account')+' <span aria-hidden="true">▾</span></button><div class="ab-menu">'+am+'</div></div>'+
        '<a class="ab-ic" id="abInbox" href="'+ACC+'#inbox" aria-label="Inbox">'+IC.inbox+'<span class="ab-badge red" id="abInboxN"></span></a>'
       :'<span class="ab-guest" style="display:inline-flex;gap:12px;align-items:center"><a class="ab-txt" href="'+ACC+'#login">'+t('Log In')+'</a><a class="ab-pill" href="'+ACC+'#signup">'+t('Sign Up')+'</a></span>')+
   '<a class="ab-ic" id="abCart" href="'+CO+'#cart" aria-label="Cart" data-ab="cart">'+IC.cart+'<span class="ab-badge yel" id="abCartN"></span></a>'+
   '<div class="ab-dd ab-ord"><button type="button" class="ab-order" data-ab="ord" aria-haspopup="true">'+t('Order Now')+' <span aria-hidden="true">▾</span></button><div class="ab-menu">'+om+'</div></div>'+
   '<button type="button" class="ab-burger" data-ab="burger" aria-label="Menu">☰</button></div></div>'+
   '<div class="ab-panel"><div class="ab-pin">'+pn+'</div></div>'}
 var LOGOIMG='';
 function grabLogo(){/* the page's own AERA logo, so nothing extra is downloaded */
  var im=document.querySelector('body > nav img, nav img[alt*="AERA"], header img[alt*="AERA"]');
  LOGOIMG=im?'<img src="'+esc(im.getAttribute('src'))+'" alt="AERA Meal Prep">':'<b style="font-weight:900;letter-spacing:.12em;color:#fff">AERA</b>'}
 var bar=null;
 function paint(){if(!bar)return;bar.innerHTML=html();counts()}
 function counts(){var n=0;try{var c=JSON.parse(localStorage.getItem('aera.cart')||'{}')||{};Object.keys(c).forEach(function(k){n+=Math.max(0,+c[k]||0)})}catch(e){}
  var cb=document.getElementById('abCartN');if(cb){cb.textContent=n>9?'9+':(n?String(n):'');cb.style.display=n?'inline-block':'none'}
  var u=0;try{u=+localStorage.getItem('aera.inboxUnread')||0}catch(e){}var ib=document.getElementById('abInboxN');if(ib){ib.textContent=u>9?'9+':(u?String(u):'');ib.style.display=u?'inline-block':'none'}}
 function inboxLive(){var tok=null,uid=null,em='';try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(/^sb-.*-auth-token$/.test(k)){var o=JSON.parse(localStorage.getItem(k)||'null');if(o&&o.access_token){tok=o.access_token;uid=o.user&&o.user.id;em=String(o.user&&o.user.email||'').toLowerCase()}}}}catch(e){}
  if(!tok||!uid)return;var hd={apikey:KEY,Authorization:'Bearer '+tok};
  var d=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Kuala_Lumpur'}));var td=d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);
  Promise.all([fetch(SBU+'/rest/v1/inbox_messages?select=id,to_email,ends_at&withdrawn_at=is.null&limit=150',{headers:hd}).then(function(r){return r.ok?r.json():null}),
   fetch(SBU+'/rest/v1/inbox_reads?select=message_id&user_id=eq.'+uid,{headers:hd}).then(function(r){return r.ok?r.json():null}),
   fetch(SBU+'/rest/v1/inbox_hidden?select=message_id&user_id=eq.'+uid,{headers:hd}).then(function(r){return r.ok?r.json():[]}).catch(function(){return []})])
  .then(function(a){if(!a[0]||!a[1])return;var rd={};a[1].concat(a[2]||[]).forEach(function(x){rd[x.message_id]=1});
   var n=a[0].filter(function(m){return (!m.ends_at||m.ends_at>=td)&&(!m.to_email||String(m.to_email).toLowerCase()===em)&&!rd[m.id]}).length;
   try{localStorage.setItem('aera.inboxUnread',String(n))}catch(e){}counts()}).catch(function(){})}
 function closeAll(keep){[].forEach.call(bar.querySelectorAll('.ab-dd.open'),function(d){if(d!==keep)d.classList.remove('open')});
  if(keep!=='panel'){var p=bar.querySelector('.ab-panel');if(p)p.classList.remove('open')}}
 function onClick(e){var b=e.target.closest('[data-ab]');
  if(!b){if(!e.target.closest('#aeraBar .ab-menu')&&!e.target.closest('#aeraBar .ab-panel'))closeAll();return}
  var k=b.getAttribute('data-ab');
  if(k==='acct'||k==='ord'){e.preventDefault();var dd=b.parentNode;var was=dd.classList.contains('open');closeAll(dd);dd.classList.toggle('open',!was);return}
  if(k==='burger'){e.preventDefault();var pp=bar.querySelector('.ab-panel'),op=pp.classList.contains('open');closeAll();pp.classList.toggle('open',!op);return}
  if(k==='lang'){e.preventDefault();if(typeof window.aeraLang==='function')window.aeraLang();else{try{localStorage.setItem('aera_lang',zh()?'en':'zh')}catch(x){}location.reload()}setTimeout(paint,60);return}
  if(k==='cart'){if(/\/checkout\/?$/.test(location.pathname)&&typeof window.openCart==='function'){e.preventDefault();window.openCart()}return}
  if(k==='out'){e.preventDefault();try{['aera.account','aera.refLock'].forEach(function(x){localStorage.removeItem(x)})}catch(x){}location.href=ACC+'#logout';return}}
 function boot(){if(document.getElementById('aeraBar'))return;
  grabLogo();
  /* the page's own top bar steps aside ( it stays in the page, so nothing that reads it breaks ) */
  var old=document.querySelector('body > nav')||document.querySelector('nav');if(old&&!old.closest('#aeraBar'))old.classList.add('ab-hidden-nav');
  bar=document.createElement('div');bar.id='aeraBar';bar.className='noi18n';bar.setAttribute('role','navigation');
  document.body.insertBefore(bar,document.body.firstChild);paint();
  document.addEventListener('click',onClick);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll()});
  try{new MutationObserver(function(){paint()}).observe(document.documentElement,{attributes:true,attributeFilter:['data-lang']})}catch(e){}
  window.addEventListener('storage',function(e){if(!e.key||/^aera\.(cart|account|inboxUnread)$/.test(e.key))paint()});
  window.addEventListener('pageshow',paint);window.addEventListener('focus',function(){counts()});
  setInterval(counts,4000);inboxLive()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();