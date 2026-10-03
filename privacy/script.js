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
var TX={en:{t:'Privacy Notice',u:'Last updated 21 September 2026',f:'Terms &amp; Conditions'},
 bm:{t:'Notis Privasi',u:'Kemas kini terakhir 21 September 2026',f:'Terma &amp; Syarat'},
 zh:{t:'隐私声明',u:'最后更新：2026年9月21日',f:'条款与条件'}};
function setL(l){if(!TX[l])l='en';
 ['en','bm','zh'].forEach(function(k){var a=document.getElementById(k);if(a)a.hidden=(l!==k)});
 [['bEN','en'],['bBM','bm'],['bZH','zh']].forEach(function(x){var e=document.getElementById(x[0]);if(e)e.className=l===x[1]?'on':''});
 document.getElementById('ttl').textContent=TX[l].t;document.getElementById('upd').textContent=TX[l].u;
 try{document.querySelector('#ft a').innerHTML=TX[l].f}catch(e){}
 document.documentElement.lang=(l==='bm'?'ms':l==='zh'?'zh-Hans':'en');
 try{history.replaceState(null,'',l==='en'?location.pathname+location.search:'#'+l)}catch(e){}}
/* the site's own language choice opens the Chinese version */
(function(){var h=(location.hash||'').toLowerCase(),site='';try{site=localStorage.getItem('aera_lang')||''}catch(e){}
 if(h==='#bm'||h==='#ms')setL('bm');else if(h==='#zh'||(site==='zh'&&h!=='#en'))setL('zh')})();

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
 var LOGOSRC='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM5IiBoZWlnaHQ9IjU5IiB2aWV3Qm94PSIwIDAgMTM5IDU5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik02NS40MTI1IDIzLjQ3OTJDNjYuMTQ0OCAyNS41MjQxIDY2Ljg4NDUgMjcuNTU3MyA2Ny42MDcyIDI5LjU3NDdDNjguMzI1IDMxLjU3OTUgNjkuMDM4OCAzMy41NzI3IDY5Ljc3MjQgMzUuNTUyNkM2OS44MzggMzUuNzYzNSA2OS43OTA5IDM2LjAwODYgNjkuNjIzNSAzNi4yMjI4QzY5LjQ1NjIgMzYuNDM3OSA2OS4yMDY5IDM2LjU2MDQgNjguOTczOSAzNi41NTk2QzY3LjE1MjkgMzYuNTUyOSA2NS4zNDU2IDM2LjU0NjIgNjMuNTM5NiAzNi41Mzg3QzYzLjMwOCAzNi41Mzc5IDYzLjEyODQgMzYuNDIzNyA2My4wNjA4IDM2LjIyMkM2Mi45MjQyIDM1Ljg4NiA2Mi43OTkyIDM1LjU0NzYgNjIuNjczNSAzNS4yMDkxQzYyLjYyNSAzNS4yMDkxIDYyLjU4ODEgMzUuMjA5MSA2Mi41NTEyIDM1LjIwOTFDNTkuNzMxNiAzNS4xOTkxIDU2LjkyODQgMzUuMTg5OSA1NC4xMTc2IDM1LjE3OTlDNTQuMDgxNCAzNS4xNzk5IDU0LjA0NDUgMzUuMTc5OSA1NC4wMDgzIDM1LjE3OTlDNTMuNzEyNiAzNS41MTU5IDUzLjQ1MyAzNS44NTI3IDUzLjE3MDIgMzYuMTg2MUM1Mi45OTg4IDM2LjM4NjIgNTIuNzkwNCAzNi40OTg3IDUyLjU2MDMgMzYuNDk3OUM1MC43NjY2IDM2LjQ5MTIgNDguOTYzMyAzNi40ODQ2IDQ3LjE3MyAzNi40Nzc5QzQ2Ljk0MzUgMzYuNDc3MSA0Ni43NTAyIDM2LjM1MzcgNDYuNjY1NSAzNi4xMzg2QzQ2LjYxNyAzNS45MjUyIDQ2LjY2NTUgMzUuNjgwOSA0Ni44MzQ5IDM1LjQ3MjVDNDguNDI3MSAzMy41MTE5IDUwLjA0NDYgMzEuNTM1MyA1MS42NzM3IDI5LjU0NDZDNTMuMzE1IDI3LjUzODkgNTQuOTU3MSAyNS41MTQ5IDU2LjYzNiAyMy40Nzc1QzU3LjI4MzUgMjIuNjc4OSA1OC4xNTAzIDIyLjIyODggNTkuMDYwMiAyMi4yMjg4QzYwLjU0MzcgMjIuMjI4OCA2Mi4wNDAzIDIyLjIyODggNjMuNTM4OSAyMi4yMjg4QzY0LjQ1MDggMjIuMjI4OCA2NS4xMjQzIDIyLjY4MDYgNjUuNDExOCAyMy40OEw2NS40MTI1IDIzLjQ3OTJaTTU2LjcxNTkgMzEuOTcyMkM1OC4yODM1IDMxLjk3NjMgNTkuODUzMiAzMS45ODA1IDYxLjQzNTggMzEuOTg0N0M2MS40NjA0IDMxLjk4NDcgNjEuNDg1IDMxLjk4NDcgNjEuNTA4OSAzMS45ODQ3QzYxLjI1NTUgMzEuMzA5NCA2MS4wMDE0IDMwLjYzMjUgNjAuNzU5NiAyOS45NTQ4QzYwLjUxNzEgMjkuMjc1NCA2MC4yNjE2IDI4LjU5MjYgNjAuMDE3OCAyNy45MDkxVjI3Ljg4NTdDNjAuMDA2MiAyNy44OTQxIDU5Ljk5MzIgMjcuOTAxNiA1OS45ODA5IDI3LjkwODJDNTkuNDIyOSAyOC41OTEgNTguODQ2NCAyOS4yNjU0IDU4LjI4NjkgMjkuOTQ5QzU3LjczODUgMzAuNjE4NCA1Ny4xODExIDMxLjI5ODYgNTYuNjQyOCAzMS45NzEzQzU2LjY2NzQgMzEuOTcxMyA1Ni42OTIgMzEuOTcxMyA1Ni43MTY2IDMxLjk3MTNMNTYuNzE1OSAzMS45NzIyWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNNzYuNjQzMSAyMi4yMjc2QzgyLjA4NDMgMjIuMjI3NiA4Ny41NjU4IDIyLjIyNzYgOTMuMDUwNyAyMi4yMjc2QzkzLjQxODEgMjIuMjI3NiA5My42MzUzIDIyLjU0MTEgOTMuNTI4OCAyMi45MjQ1QzkzLjMzODIgMjMuNTgxNCA5My4xNjA2IDI0LjIzNjcgOTIuOTcxNCAyNC44OTExQzkyLjg2NjIgMjUuMjcxMiA5Mi40NjM5IDI1LjU4MTMgOTIuMDk4NSAyNS41ODA1Qzg4LjIzMTEgMjUuNTc3MSA4NC4zODQ4IDI1LjU3MzggODAuNTQ1NCAyNS41NzA1QzgwLjI4MjQgMjUuNTcwNSA4MC4wMjE1IDI1Ljc1MyA3OS44OTQ0IDI2LjAwODFDNzkuODc5NCAyNi4wNDk4IDc5Ljg2NTEgMjYuMDkyMyA3OS44NSAyNi4xMzRDNzkuNzA1OSAyNi43MDkyIDc5LjU0ODggMjcuMjgyNyA3OS4zOTI0IDI3Ljg1MzhDODMuMDI2OSAyNy44NTg4IDg2LjY1NTkgMjcuODY0NiA5MC4zMTcxIDI3Ljg2OTZDOTAuNjkzNCAyNy44Njk2IDkwLjkwOTMgMjguMTc4IDkwLjgwNjIgMjguNTU0QzkwLjYyMDQgMjkuMjAwMSA5MC40NDgyIDI5Ljg0MiA5MC4yNjMxIDMwLjQ4M0M5MC4xNjA3IDMwLjg1NjUgODkuNzYzOCAzMS4xNTkxIDg5LjM4OTUgMzEuMTU4M0M4NS43NTAyIDMxLjE0OTkgODIuMTQyMyAzMS4xNDE2IDc4LjUyOTcgMzEuMTMyNEM3OC4zODc2IDMxLjY5NzYgNzguMjMzOSAzMi4yNjExIDc4LjA5MjUgMzIuODIzQzc4LjA3ODIgMzIuODY0NyA3OC4wNjMyIDMyLjkwNTUgNzguMDczNCAzMi45NDY0Qzc4LjA2MDQgMzMuMTk0OCA3OC4yMzYgMzMuMzc0IDc4LjQ5NTUgMzMuMzc0OUM4Mi4yODEgMzMuMzg1NyA4Ni4wNzMzIDMzLjM5NzQgODkuODg2MSAzMy40MDgyQzkwLjI0NjcgMzMuNDA5IDkwLjQ0ODIgMzMuNzExNiA5MC4zNDY1IDM0LjA4MDFDOTAuMTYyNyAzNC43MTIgODkuOTkyNiAzNS4zNDMgODkuODEwMyAzNS45NzE2Qzg5LjcwOTIgMzYuMzM3NiA4OS4zMjg3IDM2LjYzNDMgODguOTcwMSAzNi42MzM1QzgzLjYyNTkgMzYuNjEzNSA3OC4yODUyIDM2LjU5MjYgNzIuOTgzMyAzNi41NzI2QzcxLjgzMTcgMzYuNTY4NSA3MS4xMjQ3IDM1LjYxNDggNzEuNDE4NSAzNC40NTAyQzcxLjgzMzEgMzIuODA0NyA3Mi4yNDk3IDMxLjE0OTkgNzIuNjY4NCAyOS40ODZDNzMuMDg5OSAyNy44MTIxIDczLjUxNDEgMjYuMTI4MiA3My45NDEgMjQuNDMyNkM3NC4yNDcgMjMuMjIyMiA3NS40NjA3IDIyLjIyNjggNzYuNjQzMSAyMi4yMjY4VjIyLjIyNzZaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik05Ny4xODEzIDIyLjIyNkgxMTUuMDAyQzExNi4xOTUgMjIuMjI2IDExNi44NjMgMjMuMjMzOSAxMTYuNDczIDI0LjQ1ODVDMTE2LjE1OCAyNS40MjU1IDExNS44NDQgMjYuMzkwOCAxMTUuNTMxIDI3LjM0ODdDMTE1LjIxOSAyOC4zMDQgMTE0LjkwNyAyOS4yNjAxIDExNC41OTcgMzAuMjA4OEMxMTQuMjE3IDMxLjQwNTEgMTEyLjkxOSAzMi4zNzc5IDExMS43NDggMzIuMzc0NkMxMTEuMjc3IDMyLjM3MzcgMTEwLjgwNiAzMi4zNzIxIDExMC4zMzUgMzIuMzcxMkMxMTEuMDAyIDMzLjQ0OTEgMTExLjY4MiAzNC41MjIgMTEyLjM2IDM1LjU5MTVDMTEyLjQ5NSAzNS43ODk5IDExMi40NjMgMzYuMDY2NyAxMTIuMjY1IDM2LjMxNzZDMTEyLjA2NyAzNi41Njg1IDExMS43OTQgMzYuNzIxOSAxMTEuNTI1IDM2LjcyMTFDMTA5Ljk1MyAzNi43MTUyIDEwOC4zODEgMzYuNzA5NCAxMDYuODExIDM2LjcwMzZDMTA2LjYyNyAzNi43MDM2IDEwNi40NzkgMzYuNjMzNSAxMDYuMzk0IDM2LjQ5ODVDMTA1LjkzOSAzNS44MTE2IDEwNS40OTkgMzUuMTIzIDEwNS4wNTcgMzQuNDMzNkMxMDQuNjE0IDMzLjc0MjUgMTA0LjE1NyAzMy4wNDk4IDEwMy43MjYgMzIuMzUzN0MxMDIuNDQ3IDMyLjM1MDQgMTAxLjE4MyAzMi4zNDcxIDk5LjkxOTYgMzIuMzQzN0M5OS41Mzk4IDMzLjU3MTYgOTkuMTc1OCAzNC43OTIxIDk4LjgxMzggMzYuMDA3NUM5OC43MTA2IDM2LjM3NDMgOTguMzE3OSAzNi42NzE5IDk3Ljk1MjQgMzYuNjcwMkM5Ni4yOTI2IDM2LjY2MzYgOTQuNjQ3OCAzNi42NTc3IDkzLjAwNDQgMzYuNjUxMUM5Mi42Mzk3IDM2LjY0OTQgOTIuNDM4MiAzNi4zNTEgOTIuNTM3MiAzNS45ODQyQzkzLjE1NTQgMzMuODUwMSA5My43NzgzIDMxLjY5NiA5NC40MDYgMjkuNTI4NkM5NS4wMzc5IDI3LjM0NTMgOTUuNjc1MSAyNS4xNDIgOTYuMzAyOSAyMi45MjI5Qzk2LjQyMSAyMi41Mzk1IDk2LjgwNyAyMi4yMjQ0IDk3LjE4MiAyMi4yMjQ0TDk3LjE4MTMgMjIuMjI2Wk0xMDcuOTk0IDI5LjA3MjZDMTA4LjMxIDI5LjA3MjYgMTA4LjYyMiAyOC44MjA4IDEwOC43MjYgMjguNTA5OUMxMDguOTY2IDI3LjczMDQgMTA5LjIyIDI2Ljk0OTMgMTA5LjQ2IDI2LjE2NDFDMTA5LjU1MSAyNS44NTIzIDEwOS4zOTEgMjUuNTk0NyAxMDkuMDg4IDI1LjU5MzlDMTA2LjY5NSAyNS41OTE0IDEwNC4zMDYgMjUuNTg5NyAxMDEuOTM0IDI1LjU4NzJDMTAxLjU4MyAyNi43NTAxIDEwMS4yNDcgMjcuOTA3MiAxMDAuODk5IDI5LjA1OTJDMTAzLjI1NiAyOS4wNjM0IDEwNS42MyAyOS4wNjc2IDEwNy45OTMgMjkuMDcxN0wxMDcuOTk0IDI5LjA3MjZaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xMzUuMjI0IDIzLjUwMjRDMTM1Ljc0MyAyNS41ODQ4IDEzNi4yNyAyNy42NTU1IDEzNi43ODIgMjkuNzA5NkMxMzcuMjkgMzEuNzUwMyAxMzcuNzk2IDMzLjc3OTMgMTM4LjMyMyAzNS43OTQyQzEzOC4zNjYgMzYuMDA4NCAxMzguMjg5IDM2LjI1ODUgMTM4LjA5IDM2LjQ3NjFDMTM3Ljg5MSAzNi42OTUzIDEzNy42MTggMzYuODE5NSAxMzcuMzc3IDM2LjgxODdDMTM1LjQ4OSAzNi44MTEyIDEzMy42MTYgMzYuODA0NSAxMzEuNzQ1IDM2Ljc5N0MxMzEuNTA1IDM2Ljc5NjIgMTMxLjMzMiAzNi42ODAzIDEzMS4yODUgMzYuNDc1MkMxMzEuMTgzIDM2LjEzMjYgMTMxLjA5MyAzNS43ODgzIDEzMS4wMDMgMzUuNDQ0MUMxMzAuOTUyIDM1LjQ0NDEgMTMwLjkxNCAzNS40NDQxIDEzMC44NzcgMzUuNDQ0MUMxMjcuOTU0IDM1LjQzNDEgMTI1LjA0OSAzNS40MjQgMTIyLjEzNSAzNS40MTRDMTIyLjA5NyAzNS40MTQgMTIyLjA1OSAzNS40MTQgMTIyLjAyMiAzNS40MTRDMTIxLjY3NSAzNS43NTU4IDEyMS4zNjcgMzYuMDk4NSAxMjEuMDM1IDM2LjQzNzdDMTIwLjgzMyAzNi42NDExIDEyMC42MDQgMzYuNzU1MyAxMjAuMzY2IDM2Ljc1NDVDMTE4LjUwNyAzNi43NDc4IDExNi42MzggMzYuNzQwMyAxMTQuNzgzIDM2LjczMzdDMTE0LjU0NiAzNi43MzI4IDExNC4zNTkgMzYuNjA3IDExNC4yOTcgMzYuMzg4NkMxMTQuMjcyIDM2LjE3MTggMTE0LjM1IDM1LjkyMzQgMTE0LjU1MSAzNS43MTA4QzExNi40MzIgMzMuNzE2IDExOC4zNDEgMzEuNzAzNiAxMjAuMjYzIDI5LjY3NzlDMTIyLjIwMSAyNy42MzYzIDEyNC4xNDIgMjUuNTc1NiAxMjYuMTIzIDIzLjQ5OTlDMTI2Ljg4OSAyMi42ODcxIDEyNy44NDEgMjIuMjI3OCAxMjguNzg0IDIyLjIyNzhDMTMwLjMyMyAyMi4yMjc4IDEzMS44NzYgMjIuMjI3OCAxMzMuNDMgMjIuMjI3OEMxMzQuMzc2IDIyLjIyNzggMTM1LjAyMSAyMi42ODc5IDEzNS4yMjUgMjMuNTAyNEgxMzUuMjI0Wk0xMjUuMjA1IDMyLjE0ODdDMTI2LjgzMSAzMi4xNTI5IDEyOC40NTcgMzIuMTU3MSAxMzAuMDk5IDMyLjE2MTJDMTMwLjEyNCAzMi4xNjEyIDEzMC4xNDkgMzIuMTYxMiAxMzAuMTc0IDMyLjE2MTJDMTI5Ljk5MSAzMS40NzM1IDEyOS44MDcgMzAuNzg0OSAxMjkuNjM2IDMwLjA5NDdDMTI5LjQ2NSAyOS40MDI4IDEyOS4yOCAyOC43MDg0IDEyOS4xMDggMjguMDExNUMxMjkuMTA4IDI4LjAwNCAxMjkuMTEgMjcuOTk3MyAxMjkuMTExIDI3Ljk4ODFDMTI5LjA5NyAyNy45OTczIDEyOS4wODMgMjguMDA0OCAxMjkuMDY5IDI4LjAxMTVDMTI4LjQxIDI4LjcwNjcgMTI3LjczMyAyOS4zOTI4IDEyNy4wNzIgMzAuMDg4OUMxMjYuNDI0IDMwLjc3MDggMTI1Ljc2NyAzMS40NjI3IDEyNS4xMjkgMzIuMTQ3MUMxMjUuMTU0IDMyLjE0NzEgMTI1LjE4IDMyLjE0NzEgMTI1LjIwNSAzMi4xNDcxVjMyLjE0ODdaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik00Ni4yODE2IDIuNDE0ODhDNDUuNzQwNiAwLjYyNzU5MSA0My43MDk5IC0wLjE2MTg1IDQyLjQ0NyAxLjQ3MDM5TDM5Ljk5NjkgNC42MzU2NUwxMS44MTQyIDQxLjA0NzVMOS4zMDE5NiAxNi45Mjk5QzkuNDA3ODQgMTcuMDI5MSAxNS4wNTUzIDIzLjYwNTYgMTYuODgzMSAyNS43MzM4QzE3LjIwMDEgMjYuMTAyMyAxNy4yMjUzIDI2LjcwOTIgMTYuOTQxOSAyNy4xMTZMMTYuMDc5OSAyOC4zNTMxTDE1LjQ2OTIgMzIuMjc0NUwyMS40ODgzIDI0Ljk1NjlDMjEuOTYwOSAyNC4zODI1IDIxLjk2NzggMjMuNDUxNCAyMS41MDQgMjIuODY2Mkw0LjI3MTMgMS4xNDE5NEw0LjI1ODMyIDEuMTI1MjZDMi44NDAzMSAtMC42NjQ1MjUgMC4zNzc5MTQgMC44MzE4MjkgMC42OTI4IDMuMjkwMTlMMS4wNTE0IDYuMDkxMTZMMS4xOTU1MiA3LjIxNDA1TDcuNDkwNTEgNTYuMzU3QzcuNzk2NTIgNTguNzQ3OCAxMC4yODkgNTkuNTQ4MSAxMS41MTk4IDU3LjY1MDhMMTMuMjY0MyA1NC45NjA3TDM4Ljg5ODUgMTUuNDM0NEwzNi41MTA2IDM4LjkxMjZMMzIuMDMxMSAzNC44MTI4QzMxLjc4MzkgMzQuNTg2MSAzMS43MTA4IDM0LjE3MTggMzEuODYwNCAzMy44NDE3TDMyLjUxMTMgMzIuNDAzN0wzMi42ODI4IDI4LjY4ODJMMjcuODIwOCAzNi42NTkzQzI3LjQ0NzIgMzcuMjcyIDI3LjUwNTkgMzguMTI4MiAyNy45NTgxIDM4LjY1NjdMMzUuNjI1MyA0Ny42MDczTDM2Ljk3OTEgNDkuMTg3OEMzNy43MTgyIDUwLjA1MDYgMzguOTQ2MyA0OS41NzcxIDM5LjE0NTggNDguMzUyNkwzOS4zODA4IDQ2LjkwODdMNDAuMTQwMyA0Mi4yMzYzTDQwLjUyMjEgMzkuODg3MUw0NC4zNTk1IDE2LjI5MTRMNDQuODMzNSAxMy4zNzU0QzQ0LjgzNyAxMy40MDg3IDQ0LjgzOTcgMTMuNDQyOSA0NC44NDE3IDEzLjQ3NzFMNDYuMzc1OSAzLjk2NzkyQzQ2LjQxMDcgMy43NTExOCA0Ni40MjU3IDMuNTQxMTEgNDYuNDIzIDMuMzM3N0M0Ni40MTg5IDMuMDA4NDIgNDYuMzY3NyAyLjY5OTE1IDQ2LjI3OTYgMi40MTU3MUw0Ni4yODE2IDIuNDE0ODhaIiBmaWxsPSIjRkRCOTEzIi8+PC9zdmc+';
 function grabLogo(){/* the same AERA logo as the homepage on every page */LOGOIMG='<img src="'+LOGOSRC+'" alt="AERA Meal Prep">'}
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