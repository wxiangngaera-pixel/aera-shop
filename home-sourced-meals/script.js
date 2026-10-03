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

try{if(window.self!==window.top)document.documentElement.classList.add("inframe")}catch(e){document.documentElement.classList.add("inframe")}

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

/* Chinese for this page : the site's EN / 中文 choice ( aera_lang ) translates every text, label and placeholder */
(function(){if(window.__aeraZh)return;window.__aeraZh=1;
 var D=window.AERA_I18N=window.AERA_I18N||{},R=window.AERA_I18N_RE=window.AERA_I18N_RE||[];
 Object.assign(D,{"Return to Homepage": "返回首页", "Personalised Meal Plan": "个人定制餐单", "My Home-Sourced Meals": "我的自备餐点", "Log what you eat outside AERA. We find the Macros, and your Plan fills only what is left.": "记录您在 AERA 以外吃的食物。我们算出营养素，您的餐单只补足剩下的部分。", "Search what you eat": "搜索您吃的食物", "Pick your portion": "选择分量", "Send it to your Plan": "送到您的餐单", "Add a Home-Sourced Meal": "新增一份自备餐点", "Name it the way you would say it.": "用您平常的说法命名。", "Find Macros": "查营养素", "Enter the numbers myself": "自己输入数字", "Your List": "我的清单", "Tick what you want counted, then send it to your Plan.": "勾选要计算的项目，然后送到您的餐单。", "Your list is empty": "清单是空的", "Search a meal above and it will show up here.": "在上方搜索餐点，它就会出现在这里。", "Use in Personalised Meal Plan": "用在个人定制餐单", "My Account": "我的账户", "Estimated Figures. Adjust the Servings to match your portion.": "估计数字。请调整份数以符合您的分量。", "Terms & Conditions": "条款与条件", "Privacy Notice": "隐私声明", "Home": "首页", "Calories ( KCAL )": "热量（大卡）", "Protein ( G )": "蛋白质（克）", "Carbs ( G )": "碳水（克）", "Fat ( G )": "脂肪（克）", "Save It": "保存", "Cancel": "取消", "e.g. Nasi Lemak, Milo Ais": "例如：椰浆饭、冰美禄", "Ticked": "已勾选", "Tick at least one first.": "请先至少勾选一项。", "This browser will not let us hand them over. Try it without Private Browsing.": "这个浏览器不允许传送。请关闭无痕模式再试。", "Type what you eat first.": "请先输入您吃的食物。", "We could not work that one out. Try naming it more simply, or enter the numbers yourself.": "我们算不出这一项。试试用更简单的名称，或自己输入数字。", "We could not reach the look-up. Enter the numbers yourself below.": "暂时无法查询。请在下方自己输入数字。", "Half": "半份", "Add to My List": "加入我的清单", "Type what you eat first, at the top.": "请先在上方输入您吃的食物。", "Put the Calories in at least.": "至少要填热量。", "Tick All": "全选", "Tick None": "全不选", "Looking up the Macros…": "正在查询营养素…", "KCAL": "大卡", "Protein": "蛋白质", "Carbs": "碳水", "Fat": "脂肪", "How Much Do You Have?": "您吃多少？", "Servings": "份数", "Saved to your list.": "已保存到清单。", "Nasi Lemak": "椰浆饭", "2 Boiled Eggs": "2 颗水煮蛋", "Protein Shake": "蛋白奶昔", "Kopi O": "咖啡乌", "Roti Canai": "印度煎饼", "Banana": "香蕉"});R.unshift([/^(\d+) of (\d+) ticked$/,'已勾选 $1 / $2'],[/^(\d+) Ticked$/,'已勾选 $1 项'],[/^([\d,]+) KCAL$/,'$1 大卡']);
 function zh(){try{return (localStorage.getItem('aera_lang')||'en')==='zh'}catch(e){return false}}
 if(typeof window.aeraLang!=='function')window.aeraLang=function(){try{localStorage.setItem('aera_lang',zh()?'en':'zh')}catch(e){}location.reload()};
 if(!zh())return;document.documentElement.setAttribute('data-lang','zh');
 function tr(s){var k=String(s).replace(/\s+/g,' ').trim();if(!k)return null;if(Object.prototype.hasOwnProperty.call(D,k))return D[k];
  for(var i=0;i<R.length;i++){if(R[i][0].test(k))return k.replace(R[i][0],R[i][1])}return null}
 var done=new WeakSet();
 function node(n){if(done.has(n))return;var p=n.parentElement;if(!p||/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(p.tagName)||p.closest('#aeraBar,.noi18n'))return;
  var t=tr(n.nodeValue);if(t===null)return;done.add(n);n.nodeValue=n.nodeValue.replace(/^(\s*)[\s\S]*?(\s*)$/,function(m,a,b){return a+t+b})}
 function attrs(e){['placeholder','title','aria-label'].forEach(function(a){var v=e.getAttribute&&e.getAttribute(a);if(!v)return;var t=tr(v);if(t!==null&&t!==v)e.setAttribute(a,t)});
  if(e.tagName==='INPUT'&&/^(submit|button)$/i.test(e.type||'')&&e.value){var t=tr(e.value);if(t!==null)e.value=t}}
 function walk(r){if(!r)return;if(r.nodeType===3)return node(r);if(r.nodeType!==1||(r.closest&&r.closest('#aeraBar')))return;attrs(r);
  var w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT),n;while(n=w.nextNode()){if(n.nodeType===3)node(n);else attrs(n)}}
 function run(){walk(document.body)}window.aeraRetranslate=run;
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
 try{new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==='characterData'){done.delete(m.target);node(m.target)}else [].forEach.call(m.addedNodes,walk)})})
  .observe(document.documentElement,{childList:true,subtree:true,characterData:true})}catch(e){}
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
  /* pages whose body is a centred flex / grid box ( Contact, Thank You ) : the bar goes full width on top, the page's card stays centred below it */
  try{var bs=getComputedStyle(document.body);if(/flex|grid/.test(bs.display)){var st=document.body.style;
   if(bs.display.indexOf('flex')>=0){st.flexDirection='column';st.flexWrap='nowrap';st.justifyContent='flex-start'}
   bar.style.alignSelf='stretch';bar.style.justifySelf='stretch';bar.style.gridColumn='1 / -1';bar.style.width='auto';
   bar.style.margin='-'+bs.paddingTop+' -'+bs.paddingRight+' 0 -'+bs.paddingLeft;
   [].forEach.call(document.body.children,function(c){if(c!==bar&&!/^(SCRIPT|STYLE|LINK|NOSCRIPT|TEMPLATE)$/.test(c.tagName)){c.style.marginTop=c.style.marginTop||'auto';c.style.marginBottom=c.style.marginBottom||'auto';c.style.maxWidth=c.style.maxWidth||'100%'}})}}catch(e){}
  document.addEventListener('click',onClick);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll()});
  try{new MutationObserver(function(){paint()}).observe(document.documentElement,{attributes:true,attributeFilter:['data-lang']})}catch(e){}
  window.addEventListener('storage',function(e){if(!e.key||/^aera\.(cart|account|inboxUnread)$/.test(e.key))paint()});
  window.addEventListener('pageshow',paint);window.addEventListener('focus',function(){counts()});
  setInterval(counts,4000);inboxLive()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

/* the browser tab title in Chinese */(function(){try{if((localStorage.getItem("aera_lang")||"en")==="zh")document.title="我的自备餐点 — AERA Meal Prep"}catch(e){}})();