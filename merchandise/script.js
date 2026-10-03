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
var SHOP_URL='https://my.chatbees.io/p/D2pz8bZ',POINTS_URL='/api/public/landing-pages/6927/sheet-data';
var AP={perRM:5,rmPer100:1,expiryMonths:6};
var VOUCH_URL='/api/public/landing-pages/6966/sheet-data';
/* Vouchers are managed in the AERA Console. These two are the fallback if the list cannot be reached. */
var VOUCHERS=[
 {code:'FREEDELIVERY-5',name:'RM 5.00 Free Delivery Voucher',ap:500,handover:'any',value:5,image:'',
  blurb:'Takes RM 5.00 off the rider fee on one order. Works on Normal Delivery and Door-to-Door, anywhere we deliver in Klang Valley.',note:'Free Delivery'},
 {code:'FREEDELIVERY-10',name:'RM 10.00 Free Delivery Voucher',ap:1000,handover:'any',value:10,image:'',
  blurb:'Takes RM 10.00 off the rider fee on one order. Works on Normal Delivery and Door-to-Door, including the door-to-door surcharge.',note:'Free Delivery'}
];
function vRows(j){var out=[],hd=j&&Array.isArray(j.headers)?j.headers:null,raw=Array.isArray(j)?j:(j&&(j.data||j.rows))||[];
 raw.forEach(function(r){if(Array.isArray(r)&&hd){var o={};hd.forEach(function(k,i){o[k]=r[i]});out.push(o)}else if(r&&typeof r==='object')out.push(r)});return out}
function loadVoucherList(){fetch(VOUCH_URL,{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
  var list=vRows(j).filter(function(r){return String(r.Code||'').trim()&&!/^(n|no|false|0)$/i.test(String(r.Active==null?'yes':r.Active))})
   .map(function(r){return{code:String(r.Code).trim().toUpperCase(),name:String(r.Name||r.Code).trim(),ap:Math.max(1,Math.round(+r.AP||0)),
    handover:String(r.Handover||'any').trim().toLowerCase(),blurb:String(r.Blurb||'').trim(),note:String(r.Note||'').trim()||'Free Delivery',
    value:Math.max(0,Math.round((+r.Value||0)*100)/100),image:String(r.Image||'').trim()}})
   .filter(function(v){return v.ap>0});
  if(list.length)VOUCHERS=list;render()}).catch(function(){})}
var ACCOUNT_URL='https://my.chatbees.io/p/dtTMaV';
var MERCH=[
 {icon:'\u{1F964}',name:'AERA Shaker Bottle',blurb:'700 ml, leak-proof, dishwasher safe.'},
 {icon:'\u{1F9CA}',name:'Insulated Cooler Bag',blurb:'Keeps a full week of boxes chilled on the way home.'},
 {icon:'\u{1F963}',name:'Bento Tumbler',blurb:'Keeps a meal warm until you are ready to eat it.'}
];
var LOGO_MARK='https://resource.aeramealprep.net/assets/images/logo.png';
var APS={rows:null,loaded:false,failed:false,email:'',key:'',available:0,timer:null};
function $(s){return document.querySelector(s)}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function apFmt(p){return Math.round(p).toLocaleString('en-MY')+' AP'}
function rm(v){return 'RM '+(Math.round((+v||0)*100)/100).toFixed(2)}
function loadVouchers(){try{return JSON.parse(localStorage.getItem('aera.vouchers')||'[]')}catch(e){return[]}}
function saveVouchers(v){try{localStorage.setItem('aera.vouchers',JSON.stringify(v))}catch(e){}}
function inCart(code){return loadVouchers().some(function(v){return v.code===code})}
function addVoucher(code){var d=VOUCHERS.filter(function(v){return v.code===code})[0];if(!d)return;
 var list=loadVouchers();
 if(list.some(function(v){return v.code===code}))return msg('warn','That voucher is already in your cart. One voucher can be used per order.');
 if(list.length>=1)return msg('warn','You already have a voucher in your cart — only one can be used on an order. Remove it first if you would rather use this one.');
 list.push({code:d.code,name:d.name,ap:d.ap,handover:d.handover,value:d.value||0,at:Date.now()});saveVouchers(list);render();
 msg('ok','<b>'+esc(d.name)+'</b> added to your cart. Press <b>Use Voucher</b> at checkout and the delivery fee comes off — '+apFmt(d.ap)+' is taken from your balance when that order is paid. <a href="'+SHOP_URL+'">Go to checkout →</a>')}
function removeVoucher(code){saveVouchers(loadVouchers().filter(function(v){return v.code!==code}));render();msg('ok','Removed from your cart.')}
function msg(k,t){$('#vMsg').innerHTML='<div class="msg '+k+'">'+t+'</div>'}
function vServices(h){return h==='drop'?'Normal Delivery only':h==='door'?'Door-to-Door only':'Normal Delivery &amp; Door-to-Door'}
function vArt(v){if(v.image)return'<img class="vart" src="'+esc(v.image)+'" alt="'+esc(v.name)+'" loading="lazy">';
 var amt=(+v.value>0)?rm(v.value):'FREE';
 return'<div class="tik"><div class="stub"><img src="'+LOGO_MARK+'" alt="AERA"><span class="vert">AERA Meal Prep</span></div>'+
  '<div class="body"><span class="kind">'+esc(v.note||'Free Delivery')+'</span>'+
   '<div class="amt">'+amt+'</div>'+
   '<div class="off">'+((+v.value>0)?'Off Your Delivery Fee':'Your Whole Delivery Fee, Covered')+'</div>'+
   '<div class="svc"><small>Services Included</small>'+vServices(v.handover)+'</div>'+
   '<div class="cost"><b>'+apFmt(v.ap)+'</b><span>= '+rm(v.ap/100*AP.rmPer100)+' of your AERA Points</span></div>'+
   '<div class="tc">Terms &amp; Conditions Applied</div>'+
  '</div></div>'}
function render(){
 $('#vgrid').innerHTML=VOUCHERS.map(function(v){var have=inCart(v.code);
  var short=APS.loaded&&APS.email&&APS.available<v.ap;
  return'<div class="vouch">'+vArt(v)+
   '<div class="act">'+(have
     ?'<span class="chip">In your cart</span><button class="btn btn-o s" type="button" onclick="removeVoucher(\''+v.code+'\')">Remove</button><a class="btn btn-y s" href="'+SHOP_URL+'">Go To Checkout</a>'
     :'<button class="btn btn-y s" type="button" onclick="addVoucher(\''+v.code+'\')">Add To My Cart</button>'+(short?'<span class="chip soon">You have '+apFmt(APS.available)+'</span>':''))+
   '</div></div>'}).join('');
 $('#mgrid').innerHTML=MERCH.map(function(m){
  return'<div class="mitem"><div class="ph">'+m.icon+'</div><div class="b"><b>'+esc(m.name)+'</b><small>'+esc(m.blurb)+'</small>'+
   '<div class="foot"><span class="chip soon">Coming Soon</span></div></div></div>'}).join('')}
/* ===== AERA Points balance (same public sheet the checkout reads) ===== */
function sha256hex(str){var K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];var H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];var b=[];for(var i=0;i<str.length;i++){var c=str.charCodeAt(i);if(c<128)b.push(c);else if(c<2048)b.push(192|c>>6,128|c&63);else if(c<55296||c>=57344)b.push(224|c>>12,128|c>>6&63,128|c&63);else{i++;c=65536+((c&1023)<<10|str.charCodeAt(i)&1023);b.push(240|c>>18,128|c>>12&63,128|c>>6&63,128|c&63)}}var l=b.length*8;b.push(128);while(b.length%64!==56)b.push(0);for(var j=7;j>=0;j--)b.push(j>=4?0:(l/Math.pow(2,j*8))&255);var w=new Array(64);function R(x,n){return(x>>>n)|(x<<(32-n))}for(var p=0;p<b.length;p+=64){for(var t=0;t<16;t++)w[t]=(b[p+t*4]<<24)|(b[p+t*4+1]<<16)|(b[p+t*4+2]<<8)|b[p+t*4+3];for(t=16;t<64;t++){var s0=R(w[t-15],7)^R(w[t-15],18)^(w[t-15]>>>3),s1=R(w[t-2],17)^R(w[t-2],19)^(w[t-2]>>>10);w[t]=(w[t-16]+s0+w[t-7]+s1)|0}var a=H[0],bb=H[1],cc=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];for(t=0;t<64;t++){var S1=R(e,6)^R(e,11)^R(e,25),ch=(e&f)^(~e&g),t1=(h+S1+ch+K[t]+w[t])|0,S0=R(a,2)^R(a,13)^R(a,22),mj=(a&bb)^(a&cc)^(bb&cc),t2=(S0+mj)|0;h=g;g=f;f=e;e=(d+t1)|0;d=cc;cc=bb;bb=a;a=(t1+t2)|0}H[0]=(H[0]+a)|0;H[1]=(H[1]+bb)|0;H[2]=(H[2]+cc)|0;H[3]=(H[3]+d)|0;H[4]=(H[4]+e)|0;H[5]=(H[5]+f)|0;H[6]=(H[6]+g)|0;H[7]=(H[7]+h)|0}var out='';for(i=0;i<8;i++)out+=('00000000'+(H[i]>>>0).toString(16)).slice(-8);return out}
function apKey(email){return sha256hex('aera-points:'+String(email||'').trim().toLowerCase()).slice(0,24)}

function apBalance(rows,todayIso){var ev=rows.map(function(r){return{d:String(r.Date||'').slice(0,10),e:+r.Earned||0,r:+r.Redeemed||0,exp:String(r.Expires||'').slice(0,10)}}).sort(function(a,b){return a.d.localeCompare(b.d)});var batches=[],earned=0,redeemed=0;ev.forEach(function(x){if(x.e>0){batches.push({g:x.e,exp:x.exp});earned+=x.e}if(x.r>0){redeemed+=x.r;var left=x.r;batches.forEach(function(b){if(left<=0||b.g<=0)return;if(b.exp&&b.exp<x.d)return;var t=Math.min(b.g,left);b.g-=t;left-=t})}});var avail=0,expired=0,soon=0,soonDate='';var in30=addDaysIso(todayIso,30);batches.forEach(function(b){if(b.g<=0)return;if(b.exp&&b.exp<todayIso)expired+=b.g;else{avail+=b.g;if(b.exp&&b.exp<=in30){soon+=b.g;if(!soonDate||b.exp<soonDate)soonDate=b.exp}}});return{available:avail,expired:expired,earned:earned,redeemed:redeemed,expiringSoon:soon,expiringDate:soonDate}}
function iso(d){return d.toISOString().slice(0,10)}
function addDaysIso(isoDate,k){var d=new Date(isoDate+'T00:00:00');d.setDate(d.getDate()+k);return iso(d)}
function apLookup(email){email=String(email||'').trim().toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){APS.email='';APS.available=0;paintBal();return}
 APS.email=email;APS.key=apKey(email);
 if(!APS.loaded){paintBal();return}
 var mine=(APS.rows||[]).filter(function(r){return String(r.Key||'').trim()===APS.key});
 var bal=apBalance(mine,iso(new Date()));APS.available=bal.available;paintBal();render()}
function apInput(now){clearTimeout(APS.timer);var v=$('#apEmail').value;var run=function(){apLookup(v)};
 if(now)run();else APS.timer=setTimeout(run,400)}
function paintBal(){var v=$('#balVal'),n=$('#balNote');
 if(!APS.email){v.textContent='—';n.innerHTML='<a href="'+ACCOUNT_URL+'">Sign in</a> and your balance shows here, or put in the email you order with.';return}
 if(!APS.loaded){v.textContent='…';n.textContent=APS.failed?'Points are unavailable right now.':'Checking your balance…';return}
 v.textContent=apFmt(APS.available);
 n.textContent='Worth '+rm(APS.available/100*AP.rmPer100)+' · '+APS.email}
function loadPoints(){fetch(POINTS_URL).then(function(r){return r.json()}).then(function(j){
  var rows=[],hd=j&&Array.isArray(j.headers)?j.headers:null,raw=Array.isArray(j)?j:(j&&(j.data||j.rows))||[];
  raw.forEach(function(r){if(Array.isArray(r)&&hd){var o={};hd.forEach(function(k,i){o[k]=r[i]});rows.push(o)}else if(r&&typeof r==='object')rows.push(r)});
  APS.rows=rows;APS.loaded=true;apLookup($('#apEmail').value);render()})
 .catch(function(){APS.rows=[];APS.loaded=true;APS.failed=true;paintBal()})}
(function(){var em='';try{var a=JSON.parse(localStorage.getItem('aera.account')||'null');if(a&&a.email)em=a.email}catch(e){}
 if(em){$('#apEmail').value=em;APS.known=true;var r=$('#apRow');if(r)r.style.display='none';
  /* claim the email now rather than waiting for the points sheet : the box stays hidden and
     the balance fills in by itself the moment the sheet lands. */
  apLookup(em)}
 else paintBal()})();
render();loadPoints();loadVoucherList();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
(function(){
 if(!('IntersectionObserver' in window))return;
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 var sel='main .card';
 var io=new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('aera-in');io.unobserve(e.target)}})},
  {rootMargin:'0px 0px -8% 0px',threshold:.06});
 function arm(){
  [].forEach.call(document.querySelectorAll(sel),function(el){
   if(el.dataset.aeraRv)return;
   el.dataset.aeraRv='1';
   /* anything already on screen stays as it is -- only what is still below the fold animates */
   if(el.getBoundingClientRect().top<innerHeight*0.85)return;
   el.classList.add('aera-rv');io.observe(el)})}
 arm();
 addEventListener('load',arm);
 setTimeout(arm,1200);setTimeout(arm,3000);
})();

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
 var PAGE='merch',VER='v1',TOURS={"main": [{"sel": null, "title": "What your Points can buy", "text": "You earn 5 Points for every RM 1 you spend on Meals.", "art": "coin"}, {"sel": "#apEmail", "title": "Check your Balance", "text": "Type the Email you Order with, nothing to sign into.", "art": "mail"}, {"sel": "#vgrid", "title": "Free Delivery Vouchers", "text": "Purchase one to your Cart and the Rider Fee comes off at Checkout.", "art": "ticket"}, {"sel": "#mgrid", "title": "AERA Merchandise", "text": "Merchandise that travels with your Meals, coming soon…", "art": "box"}]},HELP='How Points Work';
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
 function auto(k){if(!seen(k))setTimeout(function(){start(k)},900)}
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
Object.assign(window.AERA_I18N,{
"Return to Homepage":"返回首页","Home":"首页","My Account":"我的账户","Shop":"选购","Terms & Conditions":"条款与细则","Terms & Conditions Applied":"适用条款与细则",
"AERA Merchandise":"AERA 周边商品","Spend Your Points.":"用掉您的积分。","Carry the Kit.":"带上这套装备。","Turn the AERA Points you earn on every Order into Free Delivery, and AERA Kit that travels with your Meals. AERA Points are earned at 5 AP for each RM 1 you spend on Meals.":"把您每笔订单赚到的 AERA 积分，换成免运费，以及能跟餐点一起带着走的 AERA 装备。餐点每消费 RM 1 可得 5 AP。","Redeem With Points":"用积分兑换","Free Delivery Vouchers":"免运费优惠券","Add a Voucher to your Cart, then press Use Voucher at Checkout. The Delivery Fee comes off automatically, no Code to type. Your AERA Points are only spent when that Order is paid for.":"把优惠券加入购物车，结账时按「使用优惠券」。配送费会自动扣除，不必输入任何代码。只有在该笔订单付款后，积分才会被扣除。","Your AERA Points":"您的 AERA 积分","Check My Balance":"查询我的余额","Free Delivery":"免运费","Off Your Delivery Fee":"折抵您的配送费","Services Included":"适用服务","Normal Delivery & Door-to-Door":"普通配送与送到门","Add To My Cart":"加入我的购物车","Coming Soon":"即将推出","AERA Kit":"AERA 装备","Merchandise is on its way.":"周边商品即将上架。","AERA Shaker Bottle":"AERA 摇摇杯","700 ml, leak-proof, dishwasher safe.":"700 毫升，防漏，可用洗碗机清洗。","Insulated Cooler Bag":"保温保冷袋","Keeps a full week of boxes chilled on the way home.":"回家路上也能让整整一周的餐盒保持低温。","Bento Tumbler":"保温餐盒","Keeps a meal warm until you are ready to eat it.":"让餐点保持温热，随时可以吃。",
"How Points Work":"积分怎么算","You earn":"您可获得","5 AERA Points for every RM 1":"每消费 RM 1 得 5 AERA 积分","you spend on Meals. Packaging and Delivery are not counted.":"（仅计算餐点消费，包装与配送不计算在内）。","100 AP is worth RM 1.00":"100 AP 等于 RM 1.00",". Points are tied to the Email you Order with and expire 6 Months after they are earned. Use a Referral Code and you earn an extra 3% of your Meal Subtotal in points on top.":"。积分绑定您下单时使用的电邮，自获得起 6 个月后失效。使用推荐码，还可额外获得餐点小计 3% 的积分。","Step 1 of 3":"第 1 步，共 3 步","What your Points can buy":"您的积分可以换什么","You earn 5 Points for every RM 1 you spend on Meals.":"餐点每消费 RM 1，可获得 5 点积分。","Skip":"略过","Next":"下一步","Merchandise — AERA Meal Prep":"周边商品 — AERA Meal Prep","you@example.com":"you@example.com"
});
window.AERA_I18N_RE.push(
[/^You have ([\d,]+) AP$/,"您目前有 $1 AP"],[/^= RM ([\d,.]+) of your AERA Points$/,"= 您的 AERA 积分 RM $1"],[/^Step (\d+) of (\d+)$/,"第 $1 步，共 $2 步"],[/^Worth RM ([\d,.]+) · (.+)$/,"价值 RM $1 · $2"],[/^Worth RM ([\d,.]+) off your next Orders$/,"相当于下次订单可折抵 RM $1"],[/^My Account · (.+)$/,"我的账户 · $1"]
);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Back":"上一步","Done":"完成","Got it":"知道了","Got It":"知道了","GOT IT":"知道了","Finish":"完成",
"Check your Balance":"查询您的余额","Type the Email you Order with, nothing to sign into.":"输入您下单时用的电邮即可，不需要登录。","Purchase one to your Cart and the Rider Fee comes off at Checkout.":"购买一张加入购物车，结账时骑手配送费就会扣除。","Merchandise that travels with your Meals, coming soon…":"能跟餐点一起带着走的周边商品，即将推出…"
});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-LEGAL-ZH */
Object.assign(window.AERA_I18N||{},{"Terms & Conditions":"条款与条件","Privacy Notice":"隐私声明"});
if(window.aeraRetranslate)window.aeraRetranslate();

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

/* more Chinese for this page : added to the page's own translation list */
(function(){try{var D=window.AERA_I18N=window.AERA_I18N||{},R=window.AERA_I18N_RE=window.AERA_I18N_RE||[];
 Object.assign(D,{"Sign in": "登录", "and your balance shows here, or put in the email you order with.": "后余额会显示在这里，或输入您下单用的电邮。"});
 var go=function(){try{if(window.aeraRetranslate)window.aeraRetranslate()}catch(e){}};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(go,50)});else setTimeout(go,50)}catch(e){}})();

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
       :'<span class="ab-guest"><a class="ab-txt" href="'+ACC+'#login">'+t('Log In')+'</a><a class="ab-pill" href="'+ACC+'#signup">'+t('Sign Up')+'</a></span>')+
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
 /* the page's own top bar : a <nav> first in the page, or a slim header / top strip with no heading or
    form in it. A hero header keeps its heading and only loses its logo-and-buttons row. */
 function hideOld(){var b=document.body;var first=[].filter.call(b.children,function(e){return !/^(SCRIPT|STYLE|LINK|NOSCRIPT|TEMPLATE)$/.test(e.tagName)&&e.id!=='aeraBar'})[0];if(!first)return;
  if(first.tagName==='NAV'){first.classList.add('ab-hidden-nav');return}
  var row=first.querySelector('.brandrow');if(row&&first.querySelector('h1')){row.classList.add('ab-hidden-nav');return}
  if((first.tagName==='HEADER'||(first.tagName==='DIV'&&first.classList.contains('top')))&&!first.querySelector('h1,h2,form,input,textarea'))first.classList.add('ab-hidden-nav')}
 function boot(){if(document.getElementById('aeraBar'))return;
  grabLogo();
  /* the page's own top bar steps aside ( it stays in the page, so nothing that reads it breaks ) */
  hideOld();
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