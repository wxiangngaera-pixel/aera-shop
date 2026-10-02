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

(function(){
var MAP={'#bundles':'bundles','#meals':'bundles','#plan':'plan','#home-sourced':'home','#how':'how','#delivery':'pack','#packaging':'pack','#pickup':'pick','#gyms':'gyms','#faq':'faq'};
function item(k){return document.getElementById('hc-'+k)}
function key(h){h=String(h||'');if(MAP[h])return MAP[h];if(/^#faq-/.test(h))return'faq';return''}
var mounted=0;
function mount(){if(mounted)return;mounted=1;
 function put(k,el){var b=item(k);if(b&&el)b.querySelector('.hin').appendChild(el)}
 function $(i){return document.getElementById(i)}
 var hb=item('bundles').querySelector('.hin');if($('bundles'))hb.insertBefore($('bundles'),hb.firstChild);if($('meals'))hb.appendChild($('meals'));put('how',$('how'));
 var dl=$('delivery');if(dl){var ps=dl.querySelectorAll('.two>.panel');if(ps[1]){var w=document.createElement('div');w.className='wrap hpick';w.appendChild(ps[1]);put('pick',w)}put('pack',dl)}
 put('gyms',$('gyms'));put('faq',$('faq'));
 if(key(location.hash))open(key(location.hash),location.hash)}
function open(k,h,toggle){mount();var it=item(k);if(!it)return;var was=it.classList.contains('open');
 [].forEach.call(document.querySelectorAll('#hub .hitem.open'),function(x){if(x!==it){x.classList.remove('open');x.querySelector('.hhead').setAttribute('aria-expanded','false')}});
 if(was&&toggle){it.classList.remove('open');it.querySelector('.hhead').setAttribute('aria-expanded','false');return}
 if(k==='meals')alcLoad();if(k==='home')hsLoad();if(k==='plan')hsLoad('planFrame','/meal-plan/','https://my.chatbees.io/p/SrQzC5m2',/meal-plan|SrQzC5m2/);it.classList.add('open');it.querySelector('.hhead').setAttribute('aria-expanded','true');
 try{if(typeof window.aeExpand==='function')window.aeExpand()}catch(e){}
 var t=(h&&(!MAP[h]||h==='#meals')&&/^#[\w-]+$/.test(h))?document.querySelector(h):null;
 setTimeout(function(){var el=t||it;var y=el.getBoundingClientRect().top+window.pageYOffset-84;window.scrollTo({top:y,behavior:'smooth'})},400)}
function hsLoad(fid,lp,rp,rx){fid=fid||'hsFrame';var f=document.getElementById(fid);if(!f||f.getAttribute('src'))return;rx=rx||/home-sourced|8kZjg8U5XD/;
 var u=/aeramealprep\.net$/.test(location.hostname)?(lp||'/home-sourced-meals/'):(rp||'https://my.chatbees.io/p/8kZjg8U5XD');
 f.addEventListener('load',function(){try{var w=f.contentWindow,d=f.contentDocument;if(!d)return;
  if(!rx.test(w.location.href)){window.location.href=w.location.href;return}
  try{w.scrollTo=function(a,b){var y=(a&&typeof a==='object')?(a.top||0):(b||0);window.scrollTo({top:f.getBoundingClientRect().top+window.pageYOffset+y-84,behavior:'smooth'})}}catch(e){}
  var st=d.createElement('style');st.textContent='body>nav,body>header,.aeralegal,main>h1,.at-mask,.at-card,.at-help,#aera-bento,[id^=ultra-fast-widget],.bubble-floating{display:none!important}html,body{background:transparent!important;margin:0!important}main{padding-top:10px!important}';d.head.appendChild(st);
  if(!d.querySelector('base')){var b=d.createElement('base');b.target='_top';d.head.appendChild(b)}
  var fit=function(){var m=d.querySelector('main')||d.body;f.style.height=Math.max(420,Math.ceil(m.getBoundingClientRect().bottom+(w.pageYOffset||0)+16))+'px'};fit();setTimeout(fit,400);
  if(window.ResizeObserver)new ResizeObserver(fit).observe(d.querySelector('main')||d.body);window.addEventListener('resize',fit)}catch(e){}});
 f.setAttribute('src',u)}
function alcBar(){var c={};try{c=JSON.parse(localStorage.getItem('aera.cart')||'{}')}catch(e){}var n=0;for(var k in c)n+=typeof c[k]==='number'?c[k]:1;var b=document.getElementById('alcGo');if(!b){if(!n)return;b=document.createElement('a');b.id='alcGo';b.className='btn btn-y';b.href=/aeramealprep\.net$/.test(location.hostname)?'/checkout/':'https://my.chatbees.io/p/D2pz8bZ';document.body.appendChild(b)}b.textContent='Checkout · '+n+' item'+(n===1?'':'s')+' →';b.style.display=n?'':'none'}
window.addEventListener('storage',function(e){if(e.key==='aera.cart')alcBar()});
function alcLoad(){var f=document.getElementById('alcFrame');if(!f||f.getAttribute('src'))return;
 var u=/aeramealprep\.net$/.test(location.hostname)?'/checkout/#alc':'https://my.chatbees.io/p/D2pz8bZ#alc';
 f.addEventListener('load',function(){try{var w=f.contentWindow,d=f.contentDocument,g=d.getElementById('grid');if(!g)return;
  if(!/checkout|D2pz8bZ/.test(w.location.href)){location.href=w.location.href;return}
  for(var el=g;el&&el!==d.body;el=el.parentElement){[].forEach.call(el.parentElement.children,function(s){if(s!==el&&!/^(SCRIPT|STYLE|LINK)$/.test(s.tagName))s.style.setProperty('display','none','important')})}
  var st=d.createElement('style');st.textContent='html,body{background:transparent!important;margin:0!important;padding:0!important}#grid{margin:0!important}';d.head.appendChild(st);
  var fit=function(){f.style.height=Math.max(300,Math.ceil(g.getBoundingClientRect().bottom+(w.pageYOffset||0)+12))+'px'};fit();setTimeout(fit,800);if(window.ResizeObserver)new ResizeObserver(fit).observe(g);alcBar()}catch(e){}});
 f.setAttribute('src',u)}
window.hubAlc=function(b,e){if(e)e.stopImmediatePropagation();var m=document.getElementById('meals');if(!m)return;
 [].forEach.call(m.querySelectorAll('.tabs .tab'),function(t){t.classList.toggle('on',t===b)});m.classList.add('alcon');
 if(!document.getElementById('alcBox')){var x=document.createElement('div');x.id='alcBox';x.innerHTML='<iframe id="alcFrame" class="hsf" title="À la Carte"></iframe>';var g=document.getElementById('mealGrid');g.parentNode.insertBefore(x,g)}alcLoad()};
document.addEventListener('click',function(e){var t=e.target&&e.target.closest&&e.target.closest('#meals .tabs .tab');if(t&&!t.hasAttribute('onclick')){var m=document.getElementById('meals');if(m)m.classList.remove('alcon')}},true);
window.hubTog=function(k){open(k,'',true)};
window.hubRoute=function(h){if(key(h))open(key(h),h)};
document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href'),k=key(h);if(!k)return;e.preventDefault();open(k,h)},true);
window.addEventListener('hashchange',function(){if(key(location.hash))open(key(location.hash),location.hash)});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
function wrap(n,f){var o=window[n];if(typeof o!=='function'||o.__hub)return;var w=function(){try{f.apply(null,arguments)}catch(e){}return o.apply(this,arguments)};w.__hub=1;window[n]=w}
function hook(){wrap('aeGoMeal',function(){open('bundles','#meals')});wrap('aeGoTo',function(h){if(key(h))open(key(h),h)})}
hook();window.addEventListener('load',hook);
var ZH={"Order":"下单","Good to Know":"须知","Meal Bundles":"餐点套餐","Chef-Picked for your Goal":"主厨按目标精选","À la Carte":"单点","Build your own week":"自选一周餐点","Vacuum Packed ONLY":"仅限真空包装","Personalised Meal Plan":"个人定制餐单","Built to your Daily Calories":"按您的每日热量定制","Home-Sourced Meals":"自备餐点","Shakes, snacks & home food, counted":"奶昔、零食与家常餐，一并计算","Shakes, Snacks & Home-Food, counted.":"奶昔、零食与家常餐，一并计算。","How it Works":"运作方式","From order to microwave":"从下单到微波加热","Packaging & Delivery":"包装与配送","MAP Bento Box or Vacuum Packed":"MAP 便当盒或真空包装","Delivery & Pick-Up":"配送与自取","Slots, fees and Self Pick-Up":"时段、运费与自取","Gym Fridges":"健身房冰柜","Grab a Meal after your workout":"运动后随手拿一份","FAQ":"常见问题","The questions we are asked most":"最常被问的问题","Counted in your Plan":"计入您的餐单","Chef-Picked or DIY":"主厨精选或自选","Portion Sizes":"自选份量","DIY Meal Bundle":"自选套餐","Build Your Own Bundle":"打造您的专属套餐","Fat Loss DIY":"减脂自选","Mass Gain DIY":"增肌自选","Add Bundle to Cart":"加入购物车","Clear":"清空","The Menu":"菜单","All 29 Meals":"全部29款餐点","Add My Home-Sourced Meals":"添加我的自备餐点"};
if(window.AERA_I18N)for(var z in ZH)if(!(z in window.AERA_I18N))window.AERA_I18N[z]=ZH[z];
})();

(function(){var D={g:'fat',n:1,s:[],a:0};
function meals(){var out=[];(window.MEALS||[]).forEach(function(m){if(m[2]!==D.g)return;var c=document.querySelector('#mealGrid .meal[data-sku="'+m[0]+'"]');if(c&&/oos/.test(c.className))return;var p=c&&c.querySelector('.p');var pr=p?parseFloat(p.textContent.replace(/[^\d.]/g,'')):(+m[3]+1.8);out.push({sku:m[0],name:(window.AERA_I18N&&window.AERA_I18N[m[1]])||m[1],kcal:m[4],img:m[8],price:pr})});return out}
function size(){return 7*D.n}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function draw(){var el=document.getElementById('diy');if(!el)return;var L=meals(),M={};L.forEach(function(x){M[x.sku]=x});
 D.s=D.s.slice(0,size()).map(function(k){return k&&M[k]?k:null});while(D.s.length<size())D.s.push(null);if(D.a>=size())D.a=0;
 var h='';for(var d=0;d<7;d++){h+='<div class="diyday" style="--n:'+D.n+'"><b>Day '+(d+1)+'</b>';for(var j=0;j<D.n;j++){var i=d*D.n+j,x=D.s[i]&&M[D.s[i]];
  h+='<button type="button" class="dslot'+(x?' f':'')+(i===D.a?' on':'')+'" onclick="diySlot('+i+')">'+(x?'<img src="'+esc(x.img)+'" alt=""><span>'+esc(x.name)+'</span><i onclick="event.stopPropagation();diyRm('+i+')">✕</i>':'<span>'+(D.n>1?'Meal '+(j+1):'Pick a Meal')+'</span>')+'</button>'}h+='</div>'}
 el.querySelector('.diyslots').innerHTML=h;var n=0,t=0;D.s.forEach(function(k){if(k&&M[k]){n++;t+=M[k].price}});
 document.getElementById('diyCount').textContent=n+' / '+size()+' picked';document.getElementById('diyTotal').textContent='RM '+t.toFixed(2);document.getElementById('diyAdd').disabled=n<size();
 el.querySelector('.diypick').innerHTML=L.map(function(x){return'<button type="button" class="dpm" onclick="diyPut(\''+x.sku+'\')"><img src="'+esc(x.img)+'" alt="" loading="lazy"><b>'+esc(x.name)+'</b><small>'+x.kcal+' KCAL · RM '+x.price.toFixed(2)+'</small></button>'}).join('');
 [].forEach.call(el.querySelectorAll('.diyseg button'),function(b){b.classList.toggle('on',b.dataset.g?b.dataset.g===D.g:+b.dataset.n===D.n)})}
window.diySet=function(k,v){D[k]=v;draw()};window.diySlot=function(i){D.a=i;draw()};window.diyRm=function(i){D.s[i]=null;D.a=i;draw()};
window.diyPut=function(k){D.s[D.a]=k;for(var i=1;i<=size();i++){var j=(D.a+i)%size();if(!D.s[j]){D.a=j;break}}draw()};
window.diyClear=function(){D.s=[];D.a=0;draw()};
window.diyGo=function(){var c={};try{c=JSON.parse(localStorage.getItem('aera.cart')||'{}')}catch(e){}D.s.forEach(function(k){if(k)c[k]=(+c[k]||0)+1});try{localStorage.setItem('aera.cart',JSON.stringify(c))}catch(e){}location.href=/aeramealprep\.net$/.test(location.hostname)?'/checkout/':'https://my.chatbees.io/p/D2pz8bZ'};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',draw);else draw();window.addEventListener('load',function(){setTimeout(draw,300)})})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* ---- Hero video -----------------------------------------------------------
   Paste the MP4 address between the quotes and the phone-shaped video replaces
   the photo in the hero. Leave it empty and the photo stays, so the page is
   never broken by a missing video. Muted + playsinline is what lets a phone
   auto-play at all; a tap turns the sound on. */
var HERO_VIDEO = '';
var HERO_SETTINGS_URL = '/api/public/landing-pages/6938/sheet-data';
/* ---- announcements ---- */
/* Written in the Kitchen Console and pushed to a sheet; this only reads. A notice shows when it
   is switched on, has started and has not finished, so one can be written weeks ahead.
   The pop-up remembers being dismissed against WHAT was showing at the time — so ticking the box
   silences these notices, but a new or edited one opens it again rather than being lost. */
var ANN_URL='/api/public/landing-pages/7033/sheet-data';
var ANN_SEEN='aera.ann.seen',ANN=[],ANN_I=0,ANN_SIG='';
function annToday(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function annEsc(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function annShows(r,t){if(!/^(y|yes|true|1)$/i.test(String(r.Active==null?'yes':r.Active)))return false;
 var f=String(r.From||'').slice(0,10),u=String(r.Until||'').slice(0,10);
 if(f&&t<f)return false;if(u&&t>u)return false;return !!String(r.Title||'').trim()}
function annCard(r){var img=String(r.Image||'').trim(),link=String(r.Link||'').trim(),lab=String(r.LinkLabel||'').trim();
 var btn=link?'<a class="annbtn" href="'+annEsc(link)+'">'+annEsc(lab||'Read More')+'</a>'
             :(lab?'<span class="annbtn">'+annEsc(lab)+'</span>':'');
 return '<div class="annslide"><div class="anncard">'+
  (img?'<div class="annpic" style="background-image:url(\''+annEsc(img)+'\')"></div>':'<div class="annpic none"></div>')+
  '<div class="anntext">'+
  (r.Eyebrow?'<span class="anneye">'+annEsc(r.Eyebrow)+'</span>':'')+
  '<h3>'+annEsc(r.Title)+'</h3>'+
  (r.Body?'<p>'+annEsc(r.Body)+'</p>':'')+btn+'</div></div></div>'}
function annGo(i){var n=ANN.length;if(!n)return;ANN_I=Math.max(0,Math.min(n-1,i));
 var t=document.getElementById('annTrack');if(t)t.style.transform='translateX('+(-ANN_I*100)+'%)';
 var d=document.getElementById('annDots');
 if(d)[].forEach.call(d.children,function(el,k){el.className=k===ANN_I?'on':''});
 var p=document.getElementById('annPrev'),x=document.getElementById('annNext');
 if(p)p.disabled=ANN_I===0;if(x)x.disabled=ANN_I===n-1}
function annClose(){var w=document.getElementById('annModal');if(!w)return;w.classList.remove('on');
 try{var box=document.getElementById('annSkip');
  if(box&&box.checked)localStorage.setItem(ANN_SEEN,ANN_SIG)}catch(e){}
 [].forEach.call(document.querySelectorAll('.annbell'),function(b){b.classList.remove('unread')})}
function annOpen(){var w=document.getElementById('annModal');if(!w)return;w.classList.add('on');annGo(0);
 var x=document.getElementById('annClose');if(x)x.focus()}
function loadAnnouncements(){
 fetch(ANN_URL,{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
  var rows=(j&&(j.data||j.rows))||[],t=annToday();
  ANN=rows.filter(function(r){return annShows(r,t)}).sort(function(a,b){return (+a.Order||0)-(+b.Order||0)});
  if(!ANN.length)return;
  /* the signature changes the moment anything is added, edited or taken down */
  ANN_SIG=ANN.map(function(r){return String(r.Id||r.Title)+':'+String(r.Updated||'')}).join('|');
  var seen='';try{seen=localStorage.getItem(ANN_SEEN)||''}catch(e){}
  var dismissed=(seen===ANN_SIG);
  var track=document.getElementById('annTrack');if(!track)return;
  track.innerHTML=ANN.map(annCard).join('');
  var dots=document.getElementById('annDots');
  if(dots){dots.innerHTML=ANN.map(function(){return'<i></i>'}).join('');
   [].forEach.call(dots.children,function(el,k){el.onclick=function(){annGo(k)}})}
  var prev=document.getElementById('annPrev'),next=document.getElementById('annNext');
  if(prev)prev.onclick=function(){annGo(ANN_I-1)};
  if(next)next.onclick=function(){annGo(ANN_I+1)};
  var xb=document.getElementById('annClose'),bk=document.getElementById('annBack');
  if(xb)xb.onclick=annClose;if(bk)bk.onclick=annClose;
  document.addEventListener('keydown',function(e){
   var w=document.getElementById('annModal');if(!w||!w.classList.contains('on'))return;
   if(e.key==='Escape')annClose();
   if(e.key==='ArrowRight')annGo(ANN_I+1);
   if(e.key==='ArrowLeft')annGo(ANN_I-1)});
  /* swipe, because most of this traffic is on a phone */
  var deck=document.querySelector('.anndeck'),x0=null;
  if(deck){deck.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
   deck.addEventListener('touchend',function(e){if(x0==null)return;var dx=e.changedTouches[0].clientX-x0;
    if(Math.abs(dx)>44)annGo(ANN_I+(dx<0?1:-1));x0=null},{passive:true})}
  /* The bell lives in the header whether or not they dismissed the pop-up, so anyone who closed
     it too quickly can read it again. The gold dot marks notices they have not seen yet. */
  [].forEach.call(document.querySelectorAll('.annbell'),function(bell){
   bell.classList.add('on');if(!dismissed)bell.classList.add('unread')});
  if(!dismissed)setTimeout(annOpen,1100);
 }).catch(function(){});}
try{loadAnnouncements()}catch(e){}
var HERO_LIST = [], HERO_I = 0, HERO_MUTED = true;
function heroVid(i){var s=document.querySelectorAll('#vTrack .vslide video');return s[i]||null}
function heroSound(){var v=heroVid(HERO_I),b=document.getElementById('vSound');if(!v)return;
 HERO_MUTED=!HERO_MUTED;v.muted=HERO_MUTED;if(!HERO_MUTED){v.volume=1;v.play().catch(function(){})}
 if(b)b.textContent=HERO_MUTED?'🔇 Sound':'🔊 Sound On'}
/* Only the video on screen is downloaded and played; its neighbour is warmed up so a
   swipe does not land on a blank frame, and everything else stays untouched. */
function heroLoad(i){var v=heroVid(i);if(!v)return;if(!v.src&&v.dataset.src)v.src=v.dataset.src}
function heroGo(i){var n=HERO_LIST.length;if(!n)return;i=(i%n+n)%n;HERO_I=i;
 var t=document.getElementById('vTrack');if(t)t.style.transform='translateX('+(-i*100)+'%)';
 heroLoad(i);heroLoad((i+1)%n);heroLoad((i-1+n)%n);
 for(var k=0;k<n;k++){var v=heroVid(k);if(!v)continue;
  if(k===i){v.muted=HERO_MUTED;v.play().catch(function(){})}else{v.pause();v.muted=true}}
 var d=document.getElementById('vDots');
 if(d)[].forEach.call(d.children,function(el,k){el.className=k===i?'on':''});
 var s=document.getElementById('vSwipe');if(s&&i!==0){s.style.opacity='0';setTimeout(function(){if(s.parentNode)s.parentNode.removeChild(s)},400)}}
function heroVideoApply(list,poster){
 list=(list||[]).map(function(u){return String(u||'').trim()}).filter(Boolean);
 if(!list.length)return;
 var pic=document.getElementById('heroPic'),frame=document.getElementById('vFrame'),t=document.getElementById('vTrack');
 if(!pic||!frame||!t)return;
 HERO_LIST=list;
 t.innerHTML=list.map(function(u,i){
  return'<div class="vslide"><video playsinline muted loop preload="none"'+
   (i===0&&poster?' poster="'+String(poster).replace(/"/g,'&quot;')+'"':'')+
   ' data-src="'+u.replace(/"/g,'&quot;')+'"></video></div>'}).join('');
 if(list.length>1){frame.classList.add('many');
  var d=document.getElementById('vDots');
  if(d)d.innerHTML=list.map(function(u,i){return'<i'+(i?'':' class="on"')+' onclick="heroGo('+i+')"></i>'}).join('');
  var s=document.createElement('div');s.className='vswipe';s.id='vSwipe';s.textContent='Swipe for more ›';frame.appendChild(s)}
 /* one broken address should not take the whole hero down — drop that slide and carry on */
 [].forEach.call(t.querySelectorAll('video'),function(v){v.addEventListener('error',function(){
   var i=HERO_LIST.indexOf(v.dataset.src);if(i<0)return;
   if(HERO_LIST.length===1){pic.classList.remove('hasvid');return}
   heroGo(HERO_I===i?HERO_I+1:HERO_I)})});
 pic.classList.add('hasvid');
 var x0=null,dx=0;
 t.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;dx=0;t.classList.add('drag')},{passive:true});
 t.addEventListener('touchmove',function(e){if(x0===null)return;dx=e.touches[0].clientX-x0;
  t.style.transform='translateX(calc('+(-HERO_I*100)+'% + '+dx+'px))'},{passive:true});
 t.addEventListener('touchend',function(){t.classList.remove('drag');
  if(Math.abs(dx)>40)heroGo(HERO_I+(dx<0?1:-1));else heroGo(HERO_I);x0=null;dx=0});
 var go=function(){heroGo(0)};
 if(document.readyState==='complete')go();else window.addEventListener('load',go)}
(function(){if((HERO_VIDEO||'').trim())return heroVideoApply([HERO_VIDEO]);
 fetch(HERO_SETTINGS_URL,{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
  var got={},p='';(j&&j.data||[]).forEach(function(r){var k=String(r.Key||'').trim();
   if(k==='hero_video_poster'){p=String(r.Value==null?'':r.Value).trim();return}
   if(k==='out_of_stock_meals')oosMealParse(r.Value);
   if(/^hero_video(_[2-9])?$/.test(k))got[k]=String(r.Value==null?'':r.Value).trim()});
  try{oosPanels()}catch(e){}
  heroVideoApply([got.hero_video,got.hero_video_2,got.hero_video_3,got.hero_video_4],p)}).catch(function(){})})();
// ---- Shop wiring -----------------------------------------------------------
// SHOP_URL is the AERA checkout page (Stripe on-page checkout); ?add=SKU drops that item into the cart.
// PRODUCT_URLS can override a SKU; with no SHOP_URL every buy button falls back to a WhatsApp order message.
var SHOP_URL = "https://my.chatbees.io/p/D2pz8bZ";
var PRODUCT_URLS = {};
var WA = "https://wa.me/60166630205?text=";

/* The exact Meals the Kitchen packs for each Bundle, straight from the Kitchen Console. */
var BUNDLE_MEALS={
 'BUNDLE-11':['MEAL-9','MEAL-11','MEAL-17','MEAL-19','MEAL-24','MEAL-25','MEAL-59'],
 'BUNDLE-7':['MEAL-59','MEAL-58','MEAL-9','MEAL-10','MEAL-11','MEAL-12','MEAL-17','MEAL-14','MEAL-19','MEAL-16','MEAL-24','MEAL-18','MEAL-25','MEAL-20'],
 'BUNDLE-13':['MEAL-13','MEAL-15','MEAL-21','MEAL-22','MEAL-30','MEAL-31','MEAL-26'],
 'BUNDLE-12':['MEAL-13','MEAL-8','MEAL-15','MEAL-23','MEAL-21','MEAL-27','MEAL-22','MEAL-33','MEAL-30','MEAL-32','MEAL-31','MEAL-34','MEAL-28','MEAL-36']};
/* The Bundle lists above are a fallback baked in at publish time. The Kitchen Console
   publishes the live lists to a Sheet, and this reads them on every visit, so a Bundle
   reshuffled in the Console shows up here without the page being rebuilt. */
var BUNDLES_URL='/api/public/landing-pages/7004/sheet-data';
function bundleFeed(after){
 fetch(BUNDLES_URL,{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
  var got=0;(j&&j.data||[]).forEach(function(r){
   var sku=String(r.Sku==null?'':r.Sku).trim();
   var meals=String(r.Meals==null?'':r.Meals).split('|').map(function(x){return x.trim().toUpperCase()}).filter(Boolean);
   if(sku&&meals.length){BUNDLE_MEALS[sku]=meals;got++}});
  if(got&&typeof after==='function')after()}).catch(function(){})}
/* ---- what the Kitchen has run out of ----
   A Bundle is never pulled because one of its parts ran out : the Kitchen swaps in something
   from the same Category and the Bundle sells at the price it has always had. What the customer
   is owed is being told before they buy, so any Bundle holding one says so on its own card.
   The Kitchen Console publishes the affected Meals to the AERA Settings Sheet; if that read
   fails nothing is marked, which is the right way round to fail. */
var OOSM={};
function oosMealParse(v){OOSM={};String(v||'').split('~').forEach(function(e){
 var a=e.split('|');var sku=String(a[0]||'').trim().toUpperCase();if(!sku||!a[1])return;
 (OOSM[sku]=OOSM[sku]||[]).push({n:String(a[1]).trim(),c:String(a[2]||'').trim()})})}
function oosBundle(sku){var seen={},out=[];
 (BUNDLE_MEALS[String(sku||'').toUpperCase()]||[]).forEach(function(k){
  (OOSM[k]||[]).forEach(function(x){var t=x.n.toLowerCase();
   if(seen[t])return;seen[t]=1;out.push(x)})});
 return out}
function oosSwapText(list,cats){
 var ck=Object.keys(cats||{});
 if(list.length===1)return ck.length?('another dish from '+ck[0]):'another dish from the same group';
 return ck.length===1?('other dishes from '+ck[0]):'other dishes from the same groups'}
function oosPanels(){
 [].forEach.call(document.querySelectorAll('.bundle'),function(card){
  var had=card.querySelector('.oosnote');if(had)had.parentNode.removeChild(had);
  var a=card.querySelector('.js-buy');if(!a)return;
  var list=oosBundle(a.getAttribute('data-sku'));if(!list.length)return;
  var cats={};list.forEach(function(x){if(x.c)cats[x.c]=1});
  var ck=Object.keys(cats);
  var d=document.createElement('div');d.className='oosnote';
  d.innerHTML=list.map(function(x){return'<b>'+esc(x.n)+'</b>'}).join(' and ')+' '+
   (list.length===1?'is':'are')+' currently out of stock — the kitchen swaps in '+
   esc(oosSwapText(list,cats))+'. The price does not change.';
  a.parentNode.insertBefore(d,a)});
 oosMarkInside();
 try{oosMealNotes()}catch(e){}}
/* À la Carte : a Meal whose dish is out of stock still goes out -- the kitchen swaps that one
   dish for another in the same group -- so the card says so plainly instead of hiding the Meal
   or letting someone order it expecting the original. Same wording as the Bundle notice. */
function oosMealNotes(){
 [].forEach.call(document.querySelectorAll('#mealGrid article.meal[data-sku]'),function(card){
  var had=card.querySelector('.oosnote');if(had)had.parentNode.removeChild(had);
  var list=OOSM[String(card.getAttribute('data-sku')||'').toUpperCase()];
  if(!list||!list.length)return;
  var cats={};list.forEach(function(x){if(x.c)cats[x.c]=1});
  var d=document.createElement('div');d.className='oosnote';
  d.innerHTML=list.map(function(x){return'<b>'+esc(x.n)+'</b>'}).join(' and ')+' '+
   (list.length===1?'is':'are')+' out of stock — the kitchen swaps in '+
   esc(oosSwapText(list,cats))+'. The price does not change.';
  var row=card.querySelector('.row');
  if(row)row.parentNode.insertBefore(d,row);else card.querySelector('.body').appendChild(d)})}
/* Inside the “See the Meals Inside” list, the Meals carrying something out of stock are dimmed
   and say which dish is being swapped. The Meal is still coming — it is a dish inside it that
   changed — so this marks it rather than striking it out. */
function oosMarkInside(){
 [].forEach.call(document.querySelectorAll('.inside li[data-sku]'),function(li){
  var t=li.querySelector('.oosmk');if(t)t.parentNode.removeChild(t);
  li.classList.remove('oosout');
  var list=OOSM[String(li.getAttribute('data-sku')||'').toUpperCase()];
  if(!list||!list.length)return;
  li.classList.add('oosout');
  var cap=li.querySelector('.cap')||li;
  var e=document.createElement('em');e.className='oosmk';
  e.textContent=list.map(function(x){return x.n}).join(', ')+' — substituted';
  cap.appendChild(e)})}
/* Every Bundle card gets a “See the N Meals Inside” panel, built from the Meal list below so
   the names, calories and protein can never drift from the rest of the page. */
function bundleInsidePanels(){try{setTimeout(oosMarkInside,0)}catch(e){}
 var by={};MEALS.forEach(function(m){by[m[0]]=m});
 [].forEach.call(document.querySelectorAll('.bundle'),function(card){
  if(card.querySelector('.inside'))return;
  var a=card.querySelector('.js-buy');if(!a)return;
  var list=(BUNDLE_MEALS[a.getAttribute('data-sku')]||[]).map(function(k){return by[k]}).filter(Boolean);
  if(!list.length)return;
  var per=list.length>=14?'two a day for seven days, every one different':'one a day for seven days';
  var d=document.createElement('details');d.className='inside';
  d.innerHTML='<summary>See the '+list.length+' Meals Inside</summary><ul class="mgrid">'+
   list.map(function(m){var src=m[8]||'';
    return'<li data-sku="'+esc(m[0])+'"><div class="pic">'+(src?'<img src="'+esc(src)+'" alt="'+esc(m[1])+'" loading="lazy" decoding="async">':'')+'<em class="mm" title="'+m[4]+' KCALs &middot; '+m[5]+' g Protein"><i>'+m[4]+' kcal</i><i>'+m[5]+' g protein</i></em></div>'+
     '<div class="cap"><b title="'+esc(m[1])+'">'+esc(m[1])+'</b></div></li>'}).join('')+
   '</ul><div class="note">These are the '+list.length+' meals the kitchen packs for this bundle — '+per+'. Tell us in the kitchen notes at checkout if there is one you would rather not have and we will swap it.</div>';
  card.insertBefore(d,a)})}
/*MENU*/
var MEALS = [
 ["MEAL-10","Aglio Olio","fat",26.7,576,31,67,21,"https://my.chatbees.io/objects/quick-uploads/1302/d228cac817165404.jpg"],
 ["MEAL-23","Assam Fettuccine","mass",30.8,860,38,94,37,"https://my.chatbees.io/objects/quick-uploads/1302/54ad5f5f99873bd6.jpg"],
 ["MEAL-13","Black Pepper Chicken Sliced","mass",17.1,871,52,101,29,"https://my.chatbees.io/objects/quick-uploads/1302/7e20ca59b543daa7.jpg"],
 ["MEAL-58","Black Pepper Pasta","fat",21.9,779,53,90,23,"https://my.chatbees.io/objects/quick-uploads/1302/e5889c544b7a47e8.jpg"],
 ["MEAL-25","Bolognese","fat",21.1,761,52,84,24,"https://my.chatbees.io/objects/quick-uploads/1302/40ba7660ea09bfc4.jpg"],
 ["MEAL-27","Cajun Spiced Fusilli","mass",23.5,872,53,86,35,"https://my.chatbees.io/objects/quick-uploads/1302/051b3233749d80a9.jpg"],
 ["MEAL-59","Cauliflower Fried Rice","fat",32.4,575,38,30,33,"https://my.chatbees.io/objects/quick-uploads/1302/707b85bebe9ec81d.jpg"],
 ["MEAL-15","Classic Meal Prep Chicken Sliced & Homemade Sambal","mass",19.8,849,50,98,28,"https://my.chatbees.io/objects/quick-uploads/1302/065eceba3b2ebcaf.jpg"],
 ["MEAL-8","Creamy Mushroom Pasta","mass",25.1,886,59,84,35,"https://my.chatbees.io/objects/quick-uploads/1302/cdd3eaa61bcef587.jpg"],
 ["MEAL-19","Curry Chicken Sliced","fat",14.0,651,45,57,27,"https://my.chatbees.io/objects/quick-uploads/1302/c5ac5dbd6b40f89e.jpg"],
 ["MEAL-34","Egg Fried Brown Rice","mass",24.4,885,42,103,34,"https://my.chatbees.io/objects/quick-uploads/1302/e478eb3ebf3769cc.jpg"],
 ["MEAL-30","Gam Hiong Chicken Breast","mass",19.2,1264,63,132,54,"https://my.chatbees.io/objects/quick-uploads/1302/0c7c881b9c97ae2e.jpg"],
 ["MEAL-14","Garlic Mashed Potato with Grilled Chicken Chop & Brown Sauce","fat",24.3,652,43,65,24,"https://my.chatbees.io/objects/quick-uploads/1302/163c79a8c25dbc56.jpg"],
 ["MEAL-21","Gingered Spring Onion Toman Fish Sliced","mass",26.0,798,42,89,30,"https://my.chatbees.io/objects/quick-uploads/1302/378629b116cf880d.jpg"],
 ["MEAL-9","Green Curry Chicken Sliced","fat",16.6,653,43,61,27,"https://my.chatbees.io/objects/quick-uploads/1302/f1f440404d9bdc9f.jpg"],
 ["MEAL-16","Grilled Teriyaki Chicken Breast & Sweet & Sour Sauce","fat",23.9,509,41,56,13,"https://my.chatbees.io/objects/quick-uploads/1302/3d4dda127200808e.jpg"],
 ["MEAL-22","Imitation Salted Egg Yolk Chicken Thigh","mass",20.2,1080,50,102,53,"https://my.chatbees.io/objects/quick-uploads/1302/cb4b717d4f73a112.jpg"],
 ["MEAL-33","Imitation Salted Egg Yolk Pasta","mass",32.7,946,45,83,48,"https://my.chatbees.io/objects/quick-uploads/1302/97d491c90d587bd7.jpg"],
 ["MEAL-26","Japanese Curry Chicken Katsu with Rice","mass",22.2,1029,54,113,40,"https://my.chatbees.io/objects/quick-uploads/1302/2750fce3b4d73063.jpg"],
 ["MEAL-24","Pad Krapow Chicken Breast","fat",11.2,563,34,65,19,"https://my.chatbees.io/objects/quick-uploads/1302/613bf3feec488d0b.jpg"],
 ["MEAL-11","Pan Seared Barramundi Fillet with Homemade Sambal","fat",24.5,660,42,89,15,"https://my.chatbees.io/objects/quick-uploads/1302/fbd9528ea969604d.jpg"],
 ["MEAL-18","Pan Seared Salmon with Mushroom Gravy","fat",29.0,593,40,46,27,"https://my.chatbees.io/objects/quick-uploads/1302/6cd842cd6fd9717c.jpg"],
 ["MEAL-12","Pan Seared Smoked Paprika Chicken Breast & Tomato Concasse","fat",19.1,326,42,15,11,"https://my.chatbees.io/objects/quick-uploads/1302/d37d78c8c5bbcdae.jpg"],
 ["MEAL-20","Pan Seared Spicy Chicken Breast with Pesto Sauce","fat",23.5,412,44,33,12,"https://my.chatbees.io/objects/quick-uploads/1302/4ecc1270ff70aa0f.jpg"],
 ["MEAL-32","Quinoa Fried Rice","mass",26.3,933,66,89,35,"https://my.chatbees.io/objects/quick-uploads/1302/65771ee44125250e.jpg"],
 ["MEAL-17","Soy Garlic Chicken Sliced","fat",14.2,565,42,58,18,"https://my.chatbees.io/objects/quick-uploads/1302/89b77953054ae8aa.jpg"],
 ["MEAL-28","Stir Fried Kung Pao Chicken Breast","mass",17.3,864,48,89,35,"https://my.chatbees.io/objects/quick-uploads/1302/4594c863149f5972.jpg"],
 ["MEAL-36","Stir Fried Mushroom Chicken Casserole","mass",18.7,1032,52,123,37,"https://my.chatbees.io/objects/quick-uploads/1302/9be81a3880a5b89d.jpg"],
 ["MEAL-31","Sweet & Sour Chicken Breast","mass",17.9,1073,51,118,44,"https://my.chatbees.io/objects/quick-uploads/1302/2cfeb4c55c209802.jpg"]
];
/*ENDMENU*/
var IMG = "https://aera-assets-production.sgp1.digitaloceanspaces.com/recipe-images/";
var PACK_PER_BOX = 1.8; // packaging, included in every displayed price
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;");}
function buyHref(sku,name){ return PRODUCT_URLS[sku] || (SHOP_URL ? SHOP_URL + "?add=" + encodeURIComponent(sku) : WA + encodeURIComponent("Hi AERA, I'd like to order: " + name)); }
var AE_PAGES=[
 ["Personalised Meal Plan","Built to your Calories and Macros","https://my.chatbees.io/p/SrQzC5m2"],
 ["Bring Your Own Plan","A Plan from your Coach or Dietitian","https://my.chatbees.io/p/DSBcJ9bN4"],
 ["Merchandise","Shakers, Bags and Tees","https://my.chatbees.io/p/VMrvEw"],
 ["Track My Order","Where your Boxes are right now","https://my.chatbees.io/p/8s4Xd6h"],
 ["My Account","Your Orders, AERA Points and Addresses","https://my.chatbees.io/p/dtTMaV#orders"],
 ["Order History","Every Order you have placed","https://my.chatbees.io/p/dtTMaV#orders"],
 ["AERA Points","How Points are earned and spent","#faq-points"],
 ["Meal Bundles","A whole week, chef-picked","#bundles"],
 ["All Meals","Build your own week from 29 Meals","#meals"],
 ["How It Works","From the kitchen to your fridge","#how"],
 ["Delivery","Areas, slots and Self Pick-Up","#delivery"],
 ["Gym Fridges","AERA chillers in partner gyms","#gyms"],
 ["FAQ","The questions we are asked most","#faq"]];
function aeExpand(){try{document.body.classList.add("mkExpand")}catch(e){}}
function aeFindOpen(){var w=document.getElementById("findWrap");if(!w)return;
 w.classList.add("on");var i=document.getElementById("findQ");if(i){i.value="";i.focus()}
 aeFind("")}
function aeFindClose(){var w=document.getElementById("findWrap");if(w)w.classList.remove("on")}
function aeGoMeal(sku,name){aeFindClose();aeExpand();
 try{mealSearch(name)}catch(e){}
 var el=document.getElementById("meals");
 if(el)setTimeout(function(){el.scrollIntoView({behavior:"smooth",block:"start"})},60)}
function aeGoTo(href){aeFindClose();
 if(href.charAt(0)==="#"){aeExpand();var el=document.querySelector(href);
  if(el)return setTimeout(function(){el.scrollIntoView({behavior:"smooth",block:"start"})},60)}
 location.href=href}
var AE_ASK_EX=[["Lowest Calories","lowest calories"],["Cheapest Meal","cheapest meal"],["Most Protein","most protein"],["Lowest Carbs","lowest carbs"],["Fat Loss Under 500 kcal","fat loss under 500 calories"],["Best Protein per Ringgit","best value protein"]];
var AE_MN={k:"Calories",rm:"Price",p:"Protein",c:"Carbs",f:"Fat"};
function aeMet(w){w=String(w||"");if(!w)return null;
 if(/\brm\b|ringgit|price|cost|价格|令吉/.test(w))return "rm";
 if(/kcal|calorie|calories|\bcals?\b|热量|卡路里|卡/.test(w))return "k";
 if(/protein|蛋白/.test(w))return "p";
 if(/carb|碳水/.test(w))return "c";
 if(/fat|脂肪/.test(w))return "f";
 return null}
function aeAsk(q){
 var t=" "+String(q||"").toLowerCase().replace(/[，,]/g," ")+" ";
 var goal="",lim=[],sort=null,dir=null,val=false,any=false,m,k;
 if(/fat\s*loss|减脂|减肥|cutting|\bcut\b/.test(t)){goal="fat";any=true;t=t.replace(/fat\s*loss|减脂|减肥|cutting|\bcut\b/g," ")}
 else if(/mass\s*gain|增肌|增重|bulking|\bbulk\b/.test(t)){goal="mass";any=true;t=t.replace(/mass\s*gain|增肌|增重|bulking|\bbulk\b/g," ")}
 if(/best value|value for money|per ringgit|per rm|性价比|划算/.test(t)){val=true;any=true}
 var reL=/(under|below|less than|lower than|at most|max|<=|<|≤|不超过|低于|少于)\s*(rm)?\s*(\d+)\s*([a-z一-鿿]*)\s*([a-z一-鿿]*)/g;
 var reH=/(over|above|more than|higher than|at least|min|>=|>|≥|超过|高于|多于)\s*(rm)?\s*(\d+)\s*([a-z一-鿿]*)\s*([a-z一-鿿]*)/g;
 var zL=/(\d+)\s*([a-z一-鿿]{0,6}?)(以内|以下)/g, zH=/(\d+)\s*([a-z一-鿿]{0,6}?)(以上)/g;
 while(m=reL.exec(t)){k=aeMet(m[2])||aeMet(m[4])||aeMet(m[5]);if(k){lim.push([k,"<",+m[3]]);any=true}}
 while(m=reH.exec(t)){k=aeMet(m[2])||aeMet(m[4])||aeMet(m[5]);if(k){lim.push([k,">",+m[3]]);any=true}}
 while(m=zL.exec(t)){k=aeMet(m[2])||aeMet(t);if(k){lim.push([k,"<",+m[1]]);any=true}}
 while(m=zH.exec(t)){k=aeMet(m[2])||aeMet(t);if(k){lim.push([k,">",+m[1]]);any=true}}
 if(/lowest|least|fewest|lower|\blow\b|minimum|\bmin\b|最低|最少|最小/.test(t))dir="min";
 else if(/highest|most|maximum|\bmax\b|\btop\b|\bhigh\b|richest|最高|最多|最大/.test(t))dir="max";
 if(dir){sort=aeMet(t);if(sort)any=true;else dir=null}
 if(/cheapest|cheaper|\bcheap\b|最便宜/.test(t)){sort="rm";dir="min";any=true}
 if(/expensive|priciest|最贵/.test(t)){sort="rm";dir="max";any=true}
 if(!any)return null;
 var ix={k:4,rm:3,p:5,c:6,f:7};
 var list=MEALS.filter(function(x){
  if(goal&&x[2]!==goal)return false;
  for(var i=0;i<lim.length;i++){var L=lim[i],vv=(L[0]==="rm")?(x[3]+PACK_PER_BOX):x[ix[L[0]]];
   if(L[1]==="<"&&!(vv<=L[2]))return false;
   if(L[1]===">"&&!(vv>=L[2]))return false}
  return true});
 if(val)list=list.slice().sort(function(a,b){return (b[5]/(b[3]+PACK_PER_BOX))-(a[5]/(a[3]+PACK_PER_BOX))});
 else if(sort){var j=ix[sort];list=list.slice().sort(function(a,b){return dir==="min"?a[j]-b[j]:b[j]-a[j]})}
 var lab=[];
 if(val)lab.push(["Best Protein per Ringgit",""]);
 else if(sort)lab.push([(dir==="min"?"Lowest ":"Highest ")+AE_MN[sort],""]);
 for(var i2=0;i2<lim.length;i2++)lab.push([AE_MN[lim[i2][0]],(lim[i2][1]==="<"?" ≤ ":" ≥ ")+(lim[i2][0]==="rm"?"RM ":"")+lim[i2][2]]);
 if(goal)lab.push([goal==="fat"?"Fat Loss":"Mass Gain",""]);
 if(!lab.length)lab.push(["Best Match",""]);
 return {list:list.slice(0,8),lab:lab}}
function aeMealBtn(m){
 var zh=(window.AERA_I18N&&window.AERA_I18N[m[1]])||m[1];
 return'<button type="button" onclick="aeGoMeal(\'' + m[0] + '\',\'' + String(m[1]).replace(/'/g,"") + '\')">'+
  '<img loading="lazy" src="'+(m[8].indexOf("http")===0?m[8]:IMG+m[8])+'" alt="">'+
  '<span>'+esc(zh)+'<small>'+(m[2]==="fat"?"Fat Loss":"Mass Gain")+" · "+m[4]+" KCAL · RM "+(m[3]+PACK_PER_BOX).toFixed(2)+'</small></span></button>'}
function aePageBtn(p){return'<button type="button" onclick="aeGoTo(\'' + p[2] + '\')"><span>'+esc(p[0])+'<small>'+esc(p[1])+'</small></span></button>'}
function aeLab(lab){return'<div class="fh">'+lab.map(function(x){return'<span>'+esc(x[0])+'</span>'+esc(x[1])}).join('<i> · </i>')+'</div>'}
function aeFillFind(s){var q=document.getElementById("findQ");if(!q)return;q.value=s;aeFind(s);q.focus()}
function aeFind(q){
 var box=document.getElementById("findRes");if(!box)return;
 var words=String(q||"").trim().toLowerCase().split(/\s+/).filter(Boolean);
 if(!words.length){
  box.innerHTML='<div class="fh">Try</div><div class="fchips">'+AE_ASK_EX.map(function(x){
    return'<button type="button" class="fchip" onclick="aeFillFind(\'' + x[1] + '\')">'+esc(x[0])+'</button>'}).join("")+
   '</div><div class="fh">Jump to</div>'+AE_PAGES.slice(0,6).map(aePageBtn).join("");
  if(window.aeraRetranslate)window.aeraRetranslate();return}
 function hit(s){s=String(s||"").toLowerCase();for(var i=0;i<words.length;i++)if(s.indexOf(words[i])<0)return false;return true}
 var out="",A=null;
 try{A=aeAsk(q)}catch(e){}
 if(A){out+=aeLab(A.lab)+(A.list.length?A.list.map(aeMealBtn).join(""):'<div class="fnone">Nothing matches that.</div>')}
 else{var meals=[];MEALS.forEach(function(m){if(meals.length<8&&hit(mealHay(m)))meals.push(m)});
  if(meals.length)out+='<div class="fh">Meals</div>'+meals.map(aeMealBtn).join("")}
 var pages=AE_PAGES.filter(function(p){return hit(p[0]+" "+p[1])}).slice(0,8);
 if(pages.length)out+='<div class="fh">Pages</div>'+pages.map(aePageBtn).join("");
 box.innerHTML=out||'<div class="fnone">Nothing matches that.</div>';
 if(window.aeraRetranslate)window.aeraRetranslate()}
var MQ="",MF="all";
function mealHay(m){
  var zh=(window.AERA_I18N&&window.AERA_I18N[m[1]])||"";
  return (m[1]+" "+zh+" "+(m[2]==="fat"?"fat loss 减脂":"mass gain 增肌")+" "+m[4]+"kcal "+m[5]+"g protein "+m[6]+"g carbs "+m[7]+"g fat").toLowerCase()}
function mealSearch(q){
  MQ=String(q||"").trim().toLowerCase();
  var b=document.getElementById("mealQ");if(b&&b.value!==q)b.value=q;
  var w=document.querySelector(".mlfind");if(w)w.classList.toggle("on",!!MQ);
  render(MF)}
function render(f){
  MF=f||"all";
  var g=document.getElementById("mealGrid"), h="", n=0;
  var words=MQ?MQ.split(/\s+/):[];
  MEALS.forEach(function(m){
    if(f!=="all" && m[2]!==f) return;
    if(words.length){var hay=mealHay(m);
      for(var w=0;w<words.length;w++){if(hay.indexOf(words[w])<0)return}}
    n++;
    h+='<article class="meal '+m[2]+'" data-sku="'+m[0]+'"><img loading="lazy" src="'+(m[8].indexOf("http")===0?m[8]:IMG+m[8])+'" alt="'+esc(m[1])+'"><div class="body">'+
       '<span class="goal">'+(m[2]==="fat"?"Fat Loss":"Mass Gain")+'</span><div class="name">'+esc(m[1])+'</div>'+
       '<div class="macros"><span><b>'+m[4]+'</b>KCAL</span><span><b>'+m[5]+'g</b>Protein</span><span><b>'+m[6]+'g</b>Carbs</span><span><b>'+m[7]+'g</b>Fat</span></div>'+
       '<div class="row"><span class="p">RM '+(m[3]+PACK_PER_BOX).toFixed(2)+'</span><a class="btn btn-k js-buy" data-sku="'+m[0]+'" href="'+buyHref(m[0],m[1])+'">Add to Cart</a></div></div></article>';
  });
  g.innerHTML=h;
  var none=document.getElementById("mealNone");if(none)none.classList.toggle("on",!n);
  if(MQ)g.classList.remove("clip");
  try{oosMealNotes()}catch(e){}
  if(window.aeraRetranslate)window.aeraRetranslate();
}
render("all");
document.querySelectorAll(".tab").forEach(function(t){t.addEventListener("click",function(){document.querySelectorAll(".tab").forEach(function(x){x.classList.remove("on")});t.classList.add("on");render(t.dataset.f);});});
document.querySelectorAll(".bundle .js-buy").forEach(function(a){
  var names={"BUNDLE-7":"Fat Loss Bundle ( 7 Days x 2 Meals )","BUNDLE-11":"Fat Loss Bundle ( 7 Days x 1 Meal )","BUNDLE-12":"Mass Gain Bundle ( 7 Days x 2 Meals )","BUNDLE-13":"Mass Gain Bundle ( 7 Days x 1 Meal )"};
  a.href=buyHref(a.dataset.sku,names[a.dataset.sku]);
});
bundleInsidePanels();
bundleFeed(function(){document.querySelectorAll('.bundle .inside').forEach(function(d){d.parentNode.removeChild(d)});bundleInsidePanels()});
if(SHOP_URL){document.querySelectorAll(".js-shop").forEach(function(a){a.href=SHOP_URL;});}


function ordMenu(force){var d=document.querySelector('.navr .ordm');if(!d)return;
 var open=(force===undefined)?!d.classList.contains('open'):!!force;
 d.classList.toggle('open',open);
 var b=document.getElementById('ordBtn');if(b)b.setAttribute('aria-expanded',open?'true':'false');
 if(open){var li=document.querySelector('.navr .acct');if(li)li.classList.remove('open');
  var p=document.getElementById('navPanel');if(p)p.classList.remove('open')}}
function acctMenu(){var li=document.querySelector('.navr .acct');if(!li)return;
 var open=!li.classList.contains('open');li.classList.toggle('open',open);
 var b=document.getElementById('acctBtn');if(b)b.setAttribute('aria-expanded',open?'true':'false');
 if(open){var p=document.getElementById('navPanel');if(p)p.classList.remove('open');var od=document.querySelector('.navr .ordm');if(od)od.classList.remove('open')}}
function navMenu(force){var p=document.getElementById('navPanel');if(!p)return;
 var open=(force===undefined)?!p.classList.contains('open'):!!force;p.classList.toggle('open',open);
 var b=document.getElementById('navToggle');if(b)b.setAttribute('aria-expanded',open?'true':'false');
 if(open){var li=document.querySelector('.navr .acct');if(li)li.classList.remove('open');var od=document.querySelector('.navr .ordm');if(od)od.classList.remove('open')}}
function closeMenus(){var li=document.querySelector('.navr .acct');if(li)li.classList.remove('open'); var od=document.querySelector('.navr .ordm');if(od)od.classList.remove('open');
 var p=document.getElementById('navPanel');if(p)p.classList.remove('open');
 ['acctBtn','navToggle','ordBtn'].forEach(function(id){var b=document.getElementById(id);if(b)b.setAttribute('aria-expanded','false')})}
document.addEventListener('click',function(e){var li=document.querySelector('.navr .acct'),p=document.getElementById('navPanel'),t=document.getElementById('navToggle'); var om=document.querySelector('.navr .ordm'); if(om&&om.contains(e.target)){if(e.target.closest('a'))closeMenus();return}
 if(li&&li.contains(e.target))return;if(t&&t.contains(e.target))return;if(p&&p.contains(e.target)){closeMenus();return}
 closeMenus()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenus()});
var ACCT_URL='https://my.chatbees.io/p/dtTMaV';
var FRIDGE_URL='https://my.chatbees.io/p/xR3Dfd9n';
function acctState(){try{aeraStrip()}catch(e){}
 var a=null;try{a=JSON.parse(localStorage.getItem('aera.account')||'null')}catch(e){}
 var top=document.getElementById('acctTop'),bot=document.getElementById('acctBot'),nav=document.querySelector('nav');
 var inn=!!(a&&a.email);
 if(nav){nav.classList.toggle('signedin',inn);nav.classList.toggle('signedout',!inn)}
 document.body.classList.toggle('signedin',inn);
 try{MEH.a=inn?a:null;
  document.body.classList.toggle('mkExpand',inn&&mhExpanded());
  if(inn){mhLinks();mhToggleLabel()}
  mhRender()}catch(e){}
 if(top)top.innerHTML=inn
  ?'<div class="who">Signed in as<b>'+String(a.name||a.email).replace(/[<>&"]/g,'')+'</b></div>'
  :'<a href="'+ACCT_URL+'#login" onclick="return ppOpen(\'login\',event)">Log In</a><a href="'+ACCT_URL+'#signup" onclick="return ppOpen(\'signup\',event)">Sign Up</a><div class="sep"></div>';
 if(bot)bot.innerHTML=inn
  ?'<div class="sep"></div><a href="#" class="danger" onclick="logout();return false">Log Out</a>'
  :'';
 var pa=document.getElementById('navPanelAcct');
 if(pa)pa.innerHTML=inn
  ?'<a href="'+ACCT_URL+'#orders">My Account</a><a href="#" style="color:#FFD9D4" onclick="logout();return false">Log Out</a>'
  :'<a href="'+ACCT_URL+'#login" onclick="return ppOpen(\'login\',event)">Log In</a><a href="'+ACCT_URL+'#signup" onclick="return ppOpen(\'signup\',event)">Sign Up</a>';
 /* the Fridge only shows for the Gyms that have one on their Account */
 var hasF=!!(inn&&a.fridge);
 var pf=document.getElementById('navPanelFridge');
 if(pf)pf.innerHTML=hasF?'<a href="'+FRIDGE_URL+'">AERA Fridge</a>':'';
 var lf=document.getElementById('navFridge');
 if(lf)lf.style.display=hasF?'':'none';
 if(hasF&&window.aeraRetranslate)window.aeraRetranslate();}
function logout(){
 try{['aera.account','aera.refLock'].forEach(function(k){localStorage.removeItem(k)})}catch(e){}
 acctState();closeMenus();
 location.href=ACCT_URL+'#logout'}
acctState();
window.addEventListener('pageshow',acctState);
window.addEventListener('focus',acctState);
/* ---- Banner strip ---------------------------------------------------------
   The wide carousel under the menu. Rows are written in the Kitchen Console and
   published to a Sheet; this reads that Sheet and draws whatever is switched on
   and in date. Nothing here is dismissible on purpose — a banner comes down when
   Peter takes it down, not when a customer closes it. With no rows the strip
   never appears and the page opens straight into the hero. ------------------- */
var BAN_URL='/api/public/landing-pages/7066/sheet-data';
var BAN=[],BAN_I=0,BAN_T=null,BAN_MS=6000;
function banEsc(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function banToday(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function banShows(r,t){if(!/^(y|yes|true|1)$/i.test(String(r.Active==null?'yes':r.Active)))return false;
 var f=String(r.From||'').slice(0,10),u=String(r.Until||'').slice(0,10);
 if(f&&t<f)return false;if(u&&t>u)return false;
 return !!String(r.Image||'').trim()}
/* On a phone the 6 : 1 strip is too thin to read, so a banner that has a phone picture ( 2 : 1 ) shows that instead -- the Chinese one for visitors who picked 中文. */
function banPhone(r){try{if(!matchMedia('(max-width:600px)').matches)return '';
 var zh=document.documentElement.getAttribute('data-lang')==='zh'||localStorage.getItem('aera_lang')==='zh';
 return String((zh&&r.PhoneImageZh)||r.PhoneImage||'').trim()}catch(e){return ''}}
function banSlide(r){
 var a=String(r.Align||'left').toLowerCase();
 var cls=a==='center'?'ac':a==='right'?'ar':'al';
 var head=String(r.Headline||'').trim(),sub=String(r.Subline||'').trim();
 var lab=String(r.ButtonLabel||'').trim(),link=String(r.ButtonLink||'').trim();
 var words=!!(head||sub||lab);
 var ph=banPhone(r);if(ph)cls+=' ph';var bg='background-image:url(\''+banEsc(ph||r.Image)+'\')';
 var inner='<span class="bnblur" style="'+bg+'"></span><span class="bnpic" style="'+bg+'"></span><span class="bnveil"></span>'+
  (words?'<span class="bntext">'+
   (head?'<span class="bnh">'+banEsc(head)+'</span>':'')+
   (sub?'<span class="bns">'+banEsc(sub)+'</span>':'')+
   (lab?'<span class="bnbtn">'+banEsc(lab)+'</span>':'')+
  '</span>':'');
 /* the whole banner is the click target when it has somewhere to go */
 return link?'<a class="bnslide '+cls+(words?'':' bare')+'" href="'+banEsc(link)+'"'+(/^https?:/i.test(link)?' target="_blank" rel="noopener"':'')+'>'+inner+'</a>'
            :'<div class="bnslide '+cls+(words?'':' bare')+'">'+inner+'</div>'}
function banGo(i){var n=BAN.length;if(!n)return;BAN_I=(i%n+n)%n;
 var t=document.getElementById('banTrack');if(t)t.style.transform='translateX('+(-BAN_I*100)+'%)';
 var d=document.getElementById('banDots');
 if(d)[].forEach.call(d.children,function(el,k){el.className=k===BAN_I?'on':''})}
function banStep(d){banGo(BAN_I+d);banHold()}
function banHold(){if(BAN_T)clearInterval(BAN_T);
 if(BAN.length>1)BAN_T=setInterval(function(){banGo(BAN_I+1)},BAN_MS)}
function loadBanners(){
 fetch(BAN_URL,{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
  var rows=(j&&(j.data||j.rows))||[],t=banToday();
  BAN=rows.filter(function(r){return banShows(r,t)}).sort(function(a,b){return (+a.Order||0)-(+b.Order||0)});
  var band=document.getElementById('banBand'),track=document.getElementById('banTrack');
  if(!band||!track||!BAN.length)return;
  track.innerHTML=BAN.map(banSlide).join('');
  var dots=document.getElementById('banDots');
  if(dots){dots.innerHTML=BAN.map(function(){return'<i></i>'}).join('');
   [].forEach.call(dots.children,function(el,k){el.onclick=function(){banGo(k);banHold()}})}
  var p=document.getElementById('banPrev'),x=document.getElementById('banNext');
  if(p)p.onclick=function(){banStep(-1)};
  if(x)x.onclick=function(){banStep(1)};
  band.classList.add('on');
  if(BAN.length<2)band.classList.add('solo');
  banGo(0);banHold();
  /* a phone swipes it; the wheel is left alone so the page still scrolls */
  var x0=null,dx=0;
  track.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;dx=0;if(BAN_T)clearInterval(BAN_T)},{passive:true});
  track.addEventListener('touchmove',function(e){if(x0==null)return;dx=e.touches[0].clientX-x0;
   track.style.transition='none';track.style.transform='translateX(calc('+(-BAN_I*100)+'% + '+dx+'px))'},{passive:true});
  track.addEventListener('touchend',function(){if(x0==null)return;track.style.transition='';
   if(Math.abs(dx)>44)banGo(BAN_I+(dx<0?1:-1));else banGo(BAN_I);x0=null;dx=0;banHold()});
  /* nothing slides while the tab is in the background */
  document.addEventListener('visibilitychange',function(){
   if(document.hidden){if(BAN_T)clearInterval(BAN_T)}else banHold()})
 }).catch(function(){})}
try{loadBanners()}catch(e){}

/* ---- which portal -------------------------------------------------------- */
/* Three separate places a person can sign in to, and only one of them is the shop.
   Rather than guess, the button asks. A gym fridge has no sign-up of its own on
   purpose : merchants use their ordinary AERA account, and we put their email on
   their fridge at our end, so there is no second password anywhere. */
var PP_URL={acct:'https://my.chatbees.io/p/dtTMaV',ref:'https://my.chatbees.io/p/HkKJuxBS',
 refnew:'https://my.chatbees.io/p/H9H32i9ShW',fridge:'https://my.chatbees.io/p/xR3Dfd9n'};
function ppRow(href,icon,title,sub){
 return '<a class="ppitem" href="'+href+'"><span class="ppicon" aria-hidden="true">'+icon+'</span>'+
  '<span><b>'+title+'</b><small>'+sub+'</small></span></a>'}
function ppOpen(mode,ev){
 if(ev&&ev.preventDefault)ev.preventDefault();
 var login=mode!=='signup';
 var t=document.getElementById('ppTitle');
 if(t)t.textContent=login?'Where are you signing in?':'What are you signing up for?';
 var rows=login
  ? ppRow(PP_URL.acct+'#login','\u{1F371}','AERA Meal Prep','Your Orders, Meal Plans, AERA Points and saved details.')+
    ppRow(PP_URL.ref,'\u{1F91D}','Referral Programme','Your Referral Code, your downline and your monthly Cash-Back.')+
    ppRow(PP_URL.fridge,'❄️','AERA Fridge Merchant','For Gyms with an AERA Fridge : what is in it, what sold, and ordering more.')
  : ppRow(PP_URL.acct+'#signup','\u{1F371}','AERA Meal Prep','Order Meals, build a plan and start earning AERA Points.')+
    ppRow(PP_URL.refnew,'\u{1F91D}','Referral Programme','Become a Referrer and earn Cash-Back on everyone you bring.')+
    ppRow(PP_URL.acct+'#signup-fridge','❄️','AERA Fridge Merchant','Sign up for an AERA Website Account first. The same login opens your Fridge.');
 document.getElementById('ppList').innerHTML=rows;
 document.getElementById('ppNote').innerHTML=login
  ? 'Gym Fridge Merchants sign in with their ordinary AERA Website Email and Password. There is no separate Fridge Password to remember.'
  : 'There is no separate Sign-Up for a Fridge. Create an AERA Website Account, then tell us the Email and we will put it on your Fridge.';
 document.getElementById('ppList').parentNode.parentNode.classList.add('on');
 document.body.style.overflow='hidden';
 return false}
function ppClose(){var w=document.getElementById('ppWrap');if(w)w.classList.remove('on');document.body.style.overflow=''}
document.addEventListener('keydown',function(e){
 var w=document.getElementById('ppWrap');
 if(e.key==='Escape'&&w&&w.classList.contains('on'))ppClose()});

/* ---- Seasonal theme -------------------------------------------------------
   One theme at a time, written in the Kitchen Console and published to a Sheet.
   This reads that Sheet and dresses the page : the accent colours shift, a
   greeting ribbon drops in under the menu, the banner and hero get a festive
   frame, and a few motifs drift slowly down the page. With nothing switched on
   it does nothing at all, so the shop looks exactly as it does the rest of the
   year. -------------------------------------------------------------------- */
var THEME_URL='/api/public/landing-pages/7068/sheet-data';
/* Each preset carries its own motifs, drawn here rather than loaded, so a theme
   costs nothing to fetch and cannot half-arrive. A custom theme uses whatever
   characters were typed into the Console instead. */
var THEME_ART={
 raya:['<svg viewBox="0 0 24 24"><mask id="aeraMoon"><rect width="24" height="24" fill="#fff"/><circle cx="16.5" cy="9.5" r="8" fill="#000"/></mask><circle cx="12" cy="12" r="9.2" fill="C2" mask="url(#aeraMoon)"/></svg>',
       '<svg viewBox="0 0 24 24"><path d="M12 2l1.6 4.9H19l-4.3 3.1 1.6 5-4.3-3-4.3 3 1.6-5L5 6.9h5.4z" fill="C2"/></svg>',
       '<svg viewBox="0 0 24 24"><path d="M12 2.5l9 9.5-9 9.5-9-9.5z" fill="C2"/><path d="M12 2.5l9 9.5-9 9.5-9-9.5zM4.5 12h15M12 4l6.5 8-6.5 8-6.5-8z" fill="none" stroke="C1" stroke-width="1.1" opacity=".75"/></svg>'],
 christmas:['<svg viewBox="0 0 24 24"><path d="M12 2v20M4 12h16M6 6l12 12M18 6L6 18" stroke="C1" stroke-width="2" stroke-linecap="round"/></svg>',
       '<svg viewBox="0 0 24 24"><path d="M12 2l4 6h-2.5L17 14h-3l3 5H7l3-5H7l3.5-6H8z" fill="C2"/><rect x="11" y="19" width="2" height="3" fill="C1"/></svg>',
       '<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="6" fill="C1"/><rect x="11" y="3" width="2" height="4" fill="C2"/></svg>'],
 merdeka:['<svg viewBox="0 0 24 24"><g fill="#CC0001"><ellipse cx="12" cy="6.4" rx="3" ry="4.1"/><ellipse cx="17.3" cy="10.2" rx="3" ry="4.1" transform="rotate(72 17.3 10.2)"/><ellipse cx="15.3" cy="16.6" rx="3" ry="4.1" transform="rotate(144 15.3 16.6)"/><ellipse cx="8.7" cy="16.6" rx="3" ry="4.1" transform="rotate(216 8.7 16.6)"/><ellipse cx="6.7" cy="10.2" rx="3" ry="4.1" transform="rotate(288 6.7 10.2)"/></g><path d="M12 12l5 5.6" stroke="#FFCC00" stroke-width="1.3" stroke-linecap="round"/><circle cx="17.4" cy="18.1" r="1.2" fill="#FFCC00"/><circle cx="12" cy="12" r="2.3" fill="#FFCC00"/></svg>',
  '<svg viewBox="0 0 24 24"><path d="M12.00 1.40L13.02 7.52L16.60 2.45L14.87 8.40L20.29 5.39L16.14 10.00L22.33 9.64L16.60 12.00L22.33 14.36L16.14 14.00L20.29 18.61L14.87 15.60L16.60 21.55L13.02 16.48L12.00 22.60L10.98 16.48L7.40 21.55L9.13 15.60L3.71 18.61L7.86 14.00L1.67 14.36L7.40 12.00L1.67 9.64L7.86 10.00L3.71 5.39L9.13 8.40L7.40 2.45L10.98 7.52Z" fill="#FFCC00"/></svg>',
  '<svg viewBox="0 0 24 24"><mask id="aeraMoonMy"><rect width="24" height="24" fill="#fff"/><circle cx="16.5" cy="9.5" r="8" fill="#000"/></mask><circle cx="12" cy="12" r="9.2" fill="#FFCC00" mask="url(#aeraMoonMy)"/></svg>'],
 cny:['<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="6" ry="7" fill="C1"/><rect x="9" y="3" width="6" height="2" fill="C2"/><rect x="9" y="19" width="6" height="2" fill="C2"/><path d="M12 21v2" stroke="C2" stroke-width="2"/></svg>',
       '<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="2" fill="C1"/><circle cx="12" cy="12" r="3" fill="C2"/></svg>',
       '<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="6" fill="C1"/><path d="M12 7c1-2 3-3 3-3" stroke="C2" stroke-width="2" fill="none"/></svg>']};
var THEME_ON=null;
function thToday(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function thYes(v,d){var s=String(v==null?'':v).trim();if(!s)return !!d;return /^(y|yes|true|1|on)$/i.test(s)}
function thEsc(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function thCol(v,f){var s=String(v==null?'':v).trim();return /^#[0-9a-f]{3,8}$/i.test(s)?s:f}
/* Malaysia Day wears the Jalur Gemilang's fourteen stripes across the whole ribbon,
   in two tones of the flag red rather than red and white, so the stripes are plain to
   see and the white greeting on top of them stays just as readable. */
function thRibbonBg(r,a){
 var bg=thCol(r.RibbonBg,a);
 if(String(r.Preset||'').toLowerCase()!=='merdeka')return bg;
 return 'repeating-linear-gradient(90deg,#CC0001 0 7.143%,#A50001 7.143% 14.286%)'}
/* The glyph flanking the greeting is drawn flat in the ribbon's own ink, because a
   motif in the theme's red would vanish on a red ribbon. Each preset names the one
   of its motifs that still reads as itself in a single colour at 20px. */
var THEME_GLYPH={merdeka:1,raya:0,christmas:0,cny:0};
function thGlyph(r,ink){
 var k=String(r.Preset||'').toLowerCase(),set=THEME_ART[k];
 if(!set||!set.length)return '';
 var i=THEME_GLYPH[k]||0;if(i>=set.length)i=0;
 var svg=set[i].split('C1').join(ink).split('C2').join(ink);
 return '<span class="thglyph">'+svg+'</span>'}
/* Which theme is in force. A theme set to On beats the calendar; one set to Off
   is ignored however good its dates look; the rest run on their dates. */
function thPick(rows){var t=thToday(),forced=null,dated=null;
 rows.forEach(function(r){
  if(!thYes(r.Active,true))return;
  var mode=String(r.Mode||'auto').toLowerCase();
  if(mode==='off')return;
  if(mode==='on'){if(!forced||(+r.Order||0)<(+forced.Order||0))forced=r;return}
  var f=String(r.From||'').slice(0,10),u=String(r.Until||'').slice(0,10);
  if(f&&t<f)return;if(u&&t>u)return;
  if(!dated||(+r.Order||0)<(+dated.Order||0))dated=r});
 return forced||dated}
function thMotifs(r){
 var set=THEME_ART[String(r.Preset||'').toLowerCase()];
 var a=thCol(r.ColA,'#FDB913'),b=thCol(r.ColB,'#FFFFFF');
 if(set)return set.map(function(s){return s.split('C1').join(a).split('C2').join(b)});
 /* a theme built from scratch : whatever characters were typed, drawn as text */
 var chars=String(r.Decor||'').trim().split(/\s+/).filter(Boolean).slice(0,4);
 if(!chars.length)return [];
 return chars.map(function(c){return '<i>'+thEsc(c)+'</i>'})}
function thApply(r){
 if(!r)return;THEME_ON=r;
 var a=thCol(r.ColA,'#FDB913'),b=thCol(r.ColB,'#FFCB4D'),ink=thCol(r.ColInk,'#0B0B0B');
 var st=document.createElement('style');
 st.textContent=
  ':root{--y:'+a+';--y2:'+b+';--y-ink:'+ink+'}'+
  '.thribbon{display:flex;align-items:center;justify-content:center;gap:12px;padding:9px 16px 12px;'+
   'font-weight:700;font-size:13.5px;letter-spacing:.04em;text-align:center;line-height:1.35;'+
   'background:'+thRibbonBg(r,a)+';color:'+thCol(r.RibbonInk,ink)+';position:relative;z-index:30}'+
  '.thribbon b{font-weight:700}'+
  /* The ribbon carries the theme's own motif on both sides of the greeting, and closes
     on a band along its bottom edge. Every theme gets a plain rule in the accent colour;
     Malaysia Day gets the Jalur Gemilang's fourteen stripes, which is the one detail that
     makes the ribbon unmistakably Hari Malaysia rather than generically red. */
  '.thribbon .thglyph{flex:0 0 auto;width:20px;height:20px;display:block;opacity:.95}'+
  '.thribbon .thglyph svg{width:100%;height:100%;display:block}'+
  '.thribbon:after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:'+a+'}'+
  '@media(max-width:640px){.thribbon{font-size:12.5px;gap:8px}.thribbon .thglyph{width:16px;height:16px}}'+
  '.thsky{position:fixed;inset:0;pointer-events:none;z-index:9;overflow:hidden}'+
  '.thsky span{position:absolute;top:-8%;display:block;opacity:.5;will-change:transform;'+
   'animation:thfall linear infinite}'+
  '.thsky span svg{width:100%;height:100%;display:block;filter:drop-shadow(0 0 1.5px rgba(255,255,255,.6))}'+
  '.thsky span i{font-style:normal;font-size:26px;line-height:1}'+
  '@keyframes thfall{0%{transform:translate3d(0,-10vh,0) rotate(0)}'+
   '100%{transform:translate3d(var(--dx,12px),112vh,0) rotate(var(--rot,180deg))}}'+
  /* A double rule reads as a festive frame where a single line reads as a border:
     the accent on the outside, the theme's second colour just inside it, and a
     bracket in each opposite corner sitting inside both. */
  '.thframe{position:relative;border-radius:inherit;'+
   'box-shadow:inset 0 0 0 3px '+a+',inset 0 0 0 6px '+b+'}'+
  '.thframe:before,.thframe:after{content:"";position:absolute;width:22px;height:22px;'+
   'border:3px solid '+a+';z-index:6;pointer-events:none}'+
  '.thframe:before{left:11px;top:11px;border-right:0;border-bottom:0}'+
  '.thframe:after{right:11px;bottom:11px;border-left:0;border-top:0}'+
  '@media(prefers-reduced-motion:reduce){.thsky span{animation:none;display:none}}';
 document.head.appendChild(st);

 if(thYes(r.GreetingOn,true)&&String(r.Greeting||'').trim()){
  var rib=document.createElement('div');rib.className='thribbon';
  var g=thGlyph(r,thCol(r.RibbonInk,ink));
  rib.innerHTML=g+'<b>'+thEsc(String(r.Greeting).trim())+'</b>'+g;
  var nav=document.querySelector('nav');
  if(nav&&nav.parentNode)nav.parentNode.insertBefore(rib,nav.nextSibling);
  else document.body.insertBefore(rib,document.body.firstChild)}

 if(thYes(r.FrameOn,false)){
  ['.bnwrap','header.hero'].forEach(function(sel){
   var el=document.querySelector(sel);if(el)el.classList.add('thframe')})}

 if(thYes(r.DecorOn,true)){
  var art=thMotifs(r);
  if(art.length){
   var n=Math.max(0,Math.min(40,Math.round(+r.DecorCount||14)));
   var sky=document.createElement('div');sky.className='thsky';sky.setAttribute('aria-hidden','true');
   var html='';
   for(var i=0;i<n;i++){
    var sz=18+Math.round(Math.random()*20);
    html+='<span style="left:'+(Math.random()*98).toFixed(1)+'%;width:'+sz+'px;height:'+sz+'px;'+
     'animation-duration:'+(11+Math.random()*13).toFixed(1)+'s;'+
     'animation-delay:-'+(Math.random()*20).toFixed(1)+'s;'+
     '--dx:'+Math.round(-70+Math.random()*140)+'px;'+
     '--rot:'+Math.round(-260+Math.random()*520)+'deg;'+
     'opacity:'+(0.42+Math.random()*0.34).toFixed(2)+'">'+art[i%art.length]+'</span>'}
   sky.innerHTML=html;document.body.appendChild(sky)}}}
function loadTheme(){
 fetch(THEME_URL,{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
  var rows=(j&&(j.data||j.rows))||[];
  /* one bad row must never take the shop's paint with it */
  try{thApply(thPick(rows))}catch(e){}
 }).catch(function(){})}
try{loadTheme()}catch(e){}


/* ===== Your AERA, on the way in =====
   A line for someone already signed in: what is coming, what they are tracking, what they have
   to spend. This page has no sign-in of its own — it reads the small copy My Account leaves in
   this browser, the same one the nav already uses to know whether to say "My Account" or
   "Sign In". Nothing here is fetched, so it costs the page nothing and shows nothing at all to
   a visitor who has not signed in. */
function stripDate(s){var p=String(s||'').split('-');if(p.length<3)return'';
 return new Date(+p[0],+p[1]-1,+p[2]).toLocaleDateString('en-MY',{weekday:'short',day:'numeric',month:'short'})}
function stripSlot(v){var M={'09:00-11:00':'9-11 AM','11:00-13:00':'11 AM-1 PM','13:00-15:00':'1-3 PM','15:00-17:00':'3-5 PM'};
 return M[v]||v||''}
function stripRm(v){return 'RM '+(Math.round((+v||0)*100)/100).toFixed(2)}
function stripEsc(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;')
 .replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function aeraStrip(){
 var host=document.getElementById('meStrip');if(!host)return;
 var a=null;try{a=JSON.parse(localStorage.getItem('aera.account')||'null')}catch(e){}
 if(!a||!a.email){host.innerHTML='';host.style.display='none';return}
 var s=a.sum||{},bits=[];
 if(s.next)bits.push('<a class="mecell" href="'+ACCT_URL+'#orders">'+
   '<span>Next delivery</span><b>'+stripEsc(stripDate(s.next.date))+'</b>'+
   '<i>'+stripEsc(s.next.pickup?'Self Pick-Up':stripSlot(s.next.slot))+'</i></a>');
 if(s.plan&&s.plan.days)bits.push('<a class="mecell" href="'+ACCT_URL+'#plans">'+
   '<span>My meal plan</span><b>'+s.plan.days+' × '+s.plan.mpd+'</b>'+
   '<i>'+(s.plan.boxes?s.plan.boxes+' Boxes':'')+'</i></a>');
 if(s.weight&&s.weight.v!=null)bits.push('<a class="mecell" href="'+ACCT_URL+'#body">'+
   '<span>Weight</span><b>'+(+s.weight.v).toFixed(1)+' kg</b>'+
   '<i>'+(s.weight.d==null?'':(s.weight.d<0?'▼ ':s.weight.d>0?'▲ +':'')+Math.abs(s.weight.d).toFixed(1)+' kg')+'</i></a>');
 if(a.ap!=null&&+a.ap>0)bits.push('<a class="mecell" href="'+ACCT_URL+'#points">'+
   '<span>AERA Points</span><b>'+(+a.ap).toLocaleString()+' AP</b>'+
   '<i>worth '+stripRm(+a.ap/100)+'</i></a>');
 if(s.cash&&+s.cash.owed>0)bits.push('<a class="mecell" href="'+ACCT_URL+'#refs">'+
   '<span>Cash-back</span><b>'+stripRm(s.cash.owed)+'</b><i>'+stripEsc(s.cash.code||'')+'</i></a>');
 if(s.home)bits.push('<a class="mecell" href="'+ACCT_URL+'#home">'+
   '<span>Home-sourced</span><b>'+s.home+'</b><i>'+(s.home===1?'item':'items')+'</i></a>');
 if(!bits.length){host.innerHTML='';host.style.display='none';return}
 var first=String(a.name||'').trim().split(' ')[0];
 host.style.display=(typeof MEH_STRIP!=='undefined'&&MEH_STRIP)?'block':'none';
 host.innerHTML='<div class="wrap"><div class="mebar">'+
  '<div class="mehi"><b>'+(first?'Welcome back, '+stripEsc(first):'Welcome back')+'</b>'+
   '<span>Everything of yours is in <a href="'+ACCT_URL+'">My Account</a>.</span></div>'+
  '<div class="mecells">'+bits.join('')+'</div></div></div>'}


/* ---- The signed-in homepage -----------------------------------------------
   Everything below draws from the copy My Account leaves in this browser under
   'aera.account'. That copy is rewritten every time the customer opens My
   Account — which is where signing in lands them — so it is current as of their
   last visit there. Nothing on this page talks to the database, which is what
   keeps this page free of any key.
   If the copy is missing or old the block simply shows less; it never blocks
   the page, and a signed-out visitor never sees any of it. -------------------*/
var MEH={metric:'w',view:'all',plan:false,a:null};
var MEH_STRIP=false;            /* the six-cell strip under the menu: the block below
                                   says the same things with room to breathe, so it is
                                   off. Set true to bring the strip back. */
var PLAN_URL='https://my.chatbees.io/p/SrQzC5m2';
var MEH_AP={perRM:5,rmPer100:1};

function mhE(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
 .replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function mhRM(v){return 'RM '+(Math.round((+v||0)*100)/100).toFixed(2)}
function mhToday(){var d=new Date();d=new Date(d.getTime()+(d.getTimezoneOffset()+480)*60000);
 return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function mhDateLong(d){if(!d)return'';var x=new Date(String(d).slice(0,10)+'T00:00:00');if(isNaN(x))return String(d);
 var n=x.getDate(),t=(n%100>=11&&n%100<=13)?'th':({1:'st',2:'nd',3:'rd'}[n%10]||'th');
 return ['SUN','MON','TUE','WED','THU','FRI','SAT'][x.getDay()]+', '+n+t+' '+
  ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][x.getMonth()]+' '+x.getFullYear()}
function mhSlot(v){var m={'09:00-11:00':'9 AM - 11 AM','11:00-13:00':'11 AM - 1 PM',
 '13:00-15:00':'1 PM - 3 PM','15:00-17:00':'3 PM - 5 PM'};return m[v]||v||''}
var MEH_STATUS={new:['Preparing','cat'],in_kitchen:['In the kitchen','warn'],
 packed:['Packed · rider booked','warn'],out_for_delivery:['On the way','warn'],
 delivered:['Delivered','ok'],cancelled:['Cancelled','bad']};

/* ---- the measurements, named and scaled the same way My Account names them ---- */
var MEH_M=[
 ['w'  ,'Body Weight'          ,'KG'    ,2],
 ['fm' ,'Body Fat Mass'        ,'KG'    ,2],
 ['fp' ,'Body Fat'             ,'%'     ,1],
 ['mu' ,'Skeletal Muscle Mass' ,'KG'    ,2],
 ['vi' ,'Visceral Fat'         ,'level' ,0],
 ['bmi','BMI'                  ,'kg/m²' ,1]
];
function mhLabel(k){for(var i=0;i<MEH_M.length;i++)if(MEH_M[i][0]===k)return MEH_M[i][1];return k}
function mhUnit(k){for(var i=0;i<MEH_M.length;i++)if(MEH_M[i][0]===k)return MEH_M[i][2];return''}
function mhDp(k){for(var i=0;i<MEH_M.length;i++)if(MEH_M[i][0]===k)return MEH_M[i][3];return 1}
function mhNum(v,dp){return v==null||v===''?'—':(+v).toFixed(dp==null?1:dp)}
function mhD(s){var p=String(s).split('-');return new Date(+p[0],+p[1]-1,+p[2],12,0,0,0)}
function mhNice(s){return mhD(s).toLocaleDateString('en-MY',{day:'numeric',month:'short',year:'numeric'})}
/* 18th SEP 2026 : the long way of writing a date, as everywhere else in the shop. */
function mhBig(s){var d=mhD(s),n=d.getDate(),t=(n%100>=11&&n%100<=13)?'th':({1:'st',2:'nd',3:'rd'}[n%10]||'th');
 var dow=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getMonth()];
 return n+t+' '+dow+' '+d.getFullYear()}
function mhShort(s){return mhD(s).toLocaleDateString('en-MY',{day:'numeric',month:'short'})}

/* ---- the graph. One measurement at a time, so there is one line and no legend
        to read; a crosshair follows the pointer and names the nearest reading. ---- */
function mhChart(rows,key){
 var W=760,H=260,PL=52,PR=16,PT=18,PB=34;
 if(!rows.length)return'<div class="empty">Nothing recorded for this view yet.</div>';
 if(rows.length===1){var r0=rows[0];
  return'<div class="bmone"><b>'+mhNum(r0[key],mhDp(key))+' '+mhE(mhUnit(key))+'</b>'+
   '<span>on '+mhE(mhBig(r0.d))+'. You may now keep track of your Fitness Journey here.</span></div>'}
 var xs=rows.map(function(r){return mhD(r.d).getTime()});
 var ys=rows.map(function(r){return +r[key]});
 var x0=Math.min.apply(null,xs),x1=Math.max.apply(null,xs);
 var y0=Math.min.apply(null,ys),y1=Math.max.apply(null,ys);
 var pad=(y1-y0)||Math.max(1,Math.abs(y1)*0.05);y0-=pad*0.25;y1+=pad*0.25;
 function px(t){return x1===x0?PL+(W-PL-PR)/2:PL+(t-x0)/(x1-x0)*(W-PL-PR)}
 function py(v){return PT+(1-(v-y0)/((y1-y0)||1))*(H-PT-PB)}
 var ticks=[],STEPS=4,i;
 for(i=0;i<=STEPS;i++)ticks.push(y0+(y1-y0)*i/STEPS);
 var grid=ticks.map(function(v){var y=py(v).toFixed(1);
  return'<line x1="'+PL+'" x2="'+(W-PR)+'" y1="'+y+'" y2="'+y+'" stroke="var(--line)" stroke-width="1"/>'+
   '<text x="'+(PL-8)+'" y="'+(+y+4)+'" text-anchor="end" class="bmax">'+
    mhNum(v,Math.min(mhDp(key),1))+'</text>'}).join('');
 var d=rows.map(function(r,i){return(i?'L':'M')+px(xs[i]).toFixed(1)+' '+py(ys[i]).toFixed(1)}).join(' ');
 var dots=rows.map(function(r,i){
  return'<circle cx="'+px(xs[i]).toFixed(1)+'" cy="'+py(ys[i]).toFixed(1)+'" r="4.5" '+
   'fill="var(--navy)" stroke="var(--card)" stroke-width="2"/>'}).join('');
 var pts=rows.map(function(r,i){return px(xs[i]).toFixed(1)+','+py(ys[i]).toFixed(1)+','+
   (+r[key])+','+r.d}).join(';');
 return'<div class="bmchart" id="mhChart" data-pts="'+mhE(pts)+'" data-key="'+mhE(key)+'">'+
  '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" role="img" '+
   'aria-label="'+mhE(mhLabel(key)+' over time')+'">'+
   grid+
   '<path d="'+d+'" fill="none" stroke="var(--navy)" stroke-width="2" '+
    'stroke-linejoin="round" stroke-linecap="round"/>'+dots+
   '<line id="mhCross" x1="0" x2="0" y1="'+PT+'" y2="'+(H-PB)+'" stroke="var(--navy-line)" '+
    'stroke-width="1" style="display:none"/>'+
   '<text x="'+PL+'" y="'+(H-10)+'" class="bmax">'+mhE(mhShort(rows[0].d))+'</text>'+
   '<text x="'+(W-PR)+'" y="'+(H-10)+'" text-anchor="end" class="bmax">'+
     mhE(mhShort(rows[rows.length-1].d))+'</text>'+
  '</svg><div class="bmtip" id="mhTip" hidden></div></div>'}

function mhWire(){
 var box=document.getElementById('mhChart');if(!box)return;
 var svg=box.querySelector('svg'),cross=document.getElementById('mhCross'),tip=document.getElementById('mhTip');
 if(!svg||!cross||!tip)return;
 var pts=(box.getAttribute('data-pts')||'').split(';').filter(Boolean).map(function(s){
  var p=s.split(',');return{x:+p[0],y:+p[1],v:+p[2],d:p[3]}});
 var key=box.getAttribute('data-key')||'';
 if(!pts.length)return;
 function move(ev){
  var r=box.getBoundingClientRect();
  var cx=(ev.clientX-r.left)/r.width*760;
  var best=pts[0],bd=1e9;
  pts.forEach(function(p){var dd=Math.abs(p.x-cx);if(dd<bd){bd=dd;best=p}});
  cross.setAttribute('x1',best.x);cross.setAttribute('x2',best.x);cross.style.display='';
  tip.hidden=false;
  tip.innerHTML='<b>'+mhNum(best.v,mhDp(key))+' '+mhE(mhUnit(key))+'</b><span>'+mhE(mhNice(best.d))+'</span>';
  var left=best.x/760*r.width;
  tip.style.left=Math.max(40,Math.min(r.width-40,left))+'px'}
 function out(){cross.style.display='none';tip.hidden=true}
 box.addEventListener('mousemove',move);
 box.addEventListener('mouseleave',out);
 box.addEventListener('touchmove',function(e){if(e.touches&&e.touches[0])move(e.touches[0])},{passive:true});
 box.addEventListener('touchend',out)}

/* ---- the pieces of the page ---- */
function mhBtn(href,label,primary){
 return'<a class="btn '+(primary?'btn-y':'btn-o')+' s" href="'+mhE(href)+'">'+mhE(label)+'</a>'}
function mhCard(o){
 return'<div class="ovcard">'+
  '<div class="ovtop"><span class="ovlabel">'+mhE(o.label)+'</span>'+
   (o.chip?'<span class="chip '+(o.chipKind||'')+'">'+mhE(o.chip)+'</span>':'')+'</div>'+
  (o.big?'<div class="ovbig">'+o.big+'</div>':'')+
  (o.line?'<div class="ovline">'+o.line+'</div>':'')+
  (o.sub?'<div class="ovsub">'+o.sub+'</div>':'')+
  '<div class="ovgo">'+o.action+'</div></div>'}

function mhPlanToggle(){MEH.plan=!MEH.plan;mhRender()}
function mhMetric(k){MEH.metric=k;mhRender()}
function mhView(v){MEH.view=v;mhRender()}

/* The picture on a plan meal : that box's dishes laid into the MAP bento tray, or flat in a
   vacuum pouch when that is how their last Order was packed. The dish photos and their
   categories come from the Kitchen List, the same catalogue the Plan Builder reads. */
var AE_TRAY='https://my.chatbees.io/objects/generated-images/1302/1788628096238-5f5755c542d808b9.png';
var AE_CAT=null,AE_CATP=null;
function aeUnpack(d){var rows=d.r.map(function(v){var o={};for(var i=0;i<d.k.length;i++)o[d.k[i]]=v[i];return o});
 var by={};rows.forEach(function(o){var im=d.i[o.img];o.img=im?d.p[im[0]]+im[1]+(im[2]||'.jpg'):'';
  o.cat='pcvgs'.charAt(o.cat);by[o.c]=o});return by}
function aeCat(){if(AE_CATP)return AE_CATP;
 AE_CATP=new Promise(function(res){
  try{var raw=localStorage.getItem('aera.cat');if(raw){var o=JSON.parse(raw);if(o&&o.d){AE_CAT=aeUnpack(o.d);return res(AE_CAT)}}}catch(e){}
  fetch('https://my.chatbees.io/p/FaMS3PtRe',{cache:'no-cache'}).then(function(r){return r.text()}).then(function(t){
   var a=t.indexOf('/*CAT*/'),b=t.indexOf('/*ENDCAT*/');if(a<0||b<a)return res(null);
   try{AE_CAT=aeUnpack(JSON.parse(t.slice(a+7,b)))}catch(e){}res(AE_CAT)}).catch(function(){res(null)})});
 return AE_CATP}
function aeBox(m,pack){if(!AE_CAT)return '';
 var P=[],C=null,V=[];
 (m.comps||[]).forEach(function(c){var r=AE_CAT[String(c.code||'')];if(!r||!r.img)return;
  if(r.cat==='p'){if(P.length<2)P.push(r)}
  else if(r.cat==='c'){if(!C)C=r}
  else if(r.cat==='v'||r.cat==='g'){if(V.length<2)V.push(r)}});
 if(!P.length&&!C&&!V.length)return '';
 var cell=function(r,cls){return r?'<b class="'+cls+'" style="background-image:url('+r.img+')"></b>':''};
 var vac=String(pack||'').toLowerCase().indexOf('vac')===0;
 var inner=vac?cell(P[0],'pro')+cell(C,'crb')+cell(V[0],'veg')
  :((P.length>1?cell(P[0],'pro h1')+cell(P[1],'pro h2'):cell(P[0],'pro'))+cell(C,'crb')+
    (V.length>1?cell(V[0],'veg w1')+cell(V[1],'veg w2'):cell(V[0],'veg')));
 return '<div class="aebox'+(vac?' vac':'')+'"'+(vac?'':' style="background-image:url('+AE_TRAY+')"')+'>'+inner+'</div>'}
try{aeCat().then(function(){try{if(typeof mhRender==='function')mhRender()}catch(e){}})}catch(e){}
function mhPlanRow(s){
 var p=s.plan;
 if(!p||!p.days)return'<div class="ovplan empty-plan">'+
  '<div class="ovtop"><span class="ovlabel">My Meal Plan</span></div>'+
  '<div class="ovbig"><span class="ovnone">None yet</span></div>'+
  '<div class="ovsub">Build one around your Calories and Macros, or hand us a Plan your Coach wrote.</div>'+
  '<div class="ovgo">'+mhBtn(PLAN_URL,'Build a plan',true)+'</div></div>';
 var meals=p.meals||[],t=p.targets||{},pr=p.prefs||{};
 var head='<button type="button" class="ovplanhead" onclick="mhPlanToggle()" aria-expanded="'+
  (MEH.plan?'true':'false')+'">'+
  '<span class="ovlabel">My Meal Plan</span>'+
  '<span class="ovplanline"><b>'+(+p.days||0)+' Days x '+(+p.mpd||0)+' Meals</b>'+
   '<span>'+(+p.boxes||meals.length||0)+' Boxes'+(+p.price?' · '+mhRM(p.price):'')+'</span></span>'+
  '<span class="ovcaret" aria-hidden="true">'+(MEH.plan?'▴':'▾')+'</span></button>';
 if(!MEH.plan)return'<div class="ovplan">'+head+'</div>';
 var byDay={};meals.forEach(function(m){(byDay[m.day||1]=byDay[m.day||1]||[]).push(m)});
 var days=Object.keys(byDay).sort(function(a,b){return a-b});
 var GOAL={fat_loss:'Fat Loss',lean_gain:'Lean Gain',mass_gain:'Mass Gain',
  healthy:'Healthy Eating',custom:'Custom Macros'};
 var body='<div class="ovplanbody">'+
  (t.kcal?'<div class="ovtargets"><b>'+Math.round(t.kcal)+'</b> kcal a day · P '+Math.round(t.p||0)+
    ' g · C '+Math.round(t.c||0)+' g · F '+Math.round(t.f||0)+' g'+
    (pr.goal&&GOAL[pr.goal]?' · '+mhE(GOAL[pr.goal]):'')+'</div>':'')+
  (days.length?'<div class="ovdays">'+days.map(function(d){
    return'<div class="ovday"><b>Day '+mhE(d)+'</b>'+byDay[d].map(function(m){
      var comps=m.comps||[];
      return'<div class="ovmeal">'+aeBox(m,s&&s.pack)+'<span class="ovmtxt"><i class="noi18n">'+mhE(m.name||'Meal').split(' · ').join('<br>')+'</i>'+
       (comps.length
         ?comps.map(function(c){return'<span>'+mhE(c.name||'')+
            (c.grams!=null?' <em>'+mhE(c.grams)+' g</em>':'')+'</span>'}).join('')
         :'<span>'+mhE(m.name||'')+'</span>')+'</span></div>'}).join('')+
    '</div>'}).join('')+'</div>'
   :'<div class="ovsub">This plan has no meals saved against it.</div>')+
  '<div class="ovgo">'+mhBtn(ACCT_URL+'#plans','Open & tune this plan',true)+'</div></div>';
 return'<div class="ovplan open">'+head+body+'</div>'}

function mhRows(s){
 var all=(s.body||[]).filter(function(r){return r[MEH.metric]!=null});
 if(MEH.view==='month'){
  var m=all.length?String(all[all.length-1].d).slice(0,7):'';
  all=all.filter(function(r){return String(r.d).slice(0,7)===m})}
 return all}

function mhWeight(s){
 var rows=(s.body||[]);
 if(!rows.length)return'<div class="ovwide">'+
  '<div class="ovtop"><span class="ovlabel">Weight Control</span></div>'+
  '<div class="ovbig"><span class="ovnone">Empty</span></div>'+
  '<div class="ovsub">Put in your Weight and Body Composition and watch it move over time.</div>'+
  '<div class="ovgo">'+mhBtn(ACCT_URL+'#body','Add your first Report',true)+'</div></div>';
 var view=mhRows(s);
 var last=rows[rows.length-1],prev=rows.length>1?rows[rows.length-2]:null;
 var d=null;
 if(prev&&last[MEH.metric]!=null&&prev[MEH.metric]!=null)d=+last[MEH.metric]-+prev[MEH.metric];
 var chips=MEH_M.map(function(m){
  return'<button type="button" class="bmchip'+(MEH.metric===m[0]?' on':'')+'" '+
   'onclick="mhMetric(\''+m[0]+'\')">'+mhE(m[1])+'</button>'}).join('');
 var views='<button type="button" class="bmchip'+(MEH.view==='all'?' on':'')+
   '" onclick="mhView(\'all\')">Overall</button>'+
  '<button type="button" class="bmchip'+(MEH.view==='month'?' on':'')+
   '" onclick="mhView(\'month\')">Monthly</button>';
 return'<div class="ovwide">'+
  '<div class="ovtop"><span class="ovlabel">Weight Control</span>'+
   '<span class="ovwnow"><b>'+mhNum(last[MEH.metric],mhDp(MEH.metric))+'</b> '+mhE(mhUnit(MEH.metric))+
   (d===null?'':' <i>'+(d<0?'▼ ':d>0?'▲ +':'')+mhNum(Math.abs(d),mhDp(MEH.metric))+'</i>')+'</span></div>'+
  '<div class="bmrow">'+chips+'</div><div class="bmrow">'+views+'</div>'+
  mhChart(view,MEH.metric)+
  '<div class="ovgo">'+mhBtn(ACCT_URL+'#body','Report Today',true)+'</div></div>'}

function mhRender(){
 var host=document.getElementById('meHome');if(!host)return;
 var a=MEH.a;
 if(!a||!a.email){host.innerHTML='';return}
 var s=a.sum||{};
 var first=String(s.name||a.name||a.email||'').split(' ')[0].split('@')[0];
 var ap=+a.ap||0;

 var cards=[];
 if(s.next){var st=MEH_STATUS[s.next.status]||[s.next.status||'—',''];
  cards.push(mhCard({label:'Next Delivery',chip:st[0],chipKind:st[1],
   big:mhDateLong(s.next.date),
   line:(s.next.slot?mhE(mhSlot(s.next.slot)):'')+(s.next.pickup?' · Self Pick-Up':''),
   sub:mhE(s.next.no)+(s.orders>1?' · '+s.orders+' Orders all together':''),
   action:mhBtn(ACCT_URL+'#orders','Order History',true)}))}
 else if(s.last)cards.push(mhCard({label:'Order History',
   big:(s.orders||0)+' <span>'+((s.orders===1)?'order':'orders')+'</span>',
   line:'Last on '+mhDateLong(s.last.date),sub:'Nothing on its way at the moment.',
   action:mhBtn(ACCT_URL+'#orders','Order History')}));
 else cards.push(mhCard({label:'Order History',big:'<span class="ovnone">No Orders yet</span>',
   sub:'Everything you Order shows up here with its Delivery Day and Tracking.',
   action:mhBtn(SHOP_URL,'See the Menu',true)}));

 var home=+s.home||0;
 cards.push(mhCard({label:'My Home-Sourced Meal',
  big:home?home+' <span>'+(home===1?'item':'items')+'</span>':'<span class="ovnone">Nothing Saved</span>',
  sub:home?'Counted into your plan alongside what our kitchen cooks.'
          :'Everything you have keyed in on the Home-Sourced Meals Page. Add them to a plan from the “Your Week” step.',
  action:mhBtn(ACCT_URL+'#home',home?'Manage':'Add Something')}));

 if(s.cash&&+s.cash.owed>=0&&s.cash.code)cards.push(mhCard({label:'Cash-Back',
  chip:s.cash.code,chipKind:'ok',
  big:mhRM(s.cash.owed)+' <span>due</span>',
  line:s.cash.life?mhRM(s.cash.life)+' earned all together':'',
  sub:(s.cash.rate||0)+'% of the meal subtotal on every order placed with your code.',
  action:mhBtn(ACCT_URL+'#refs','Referral statements')}));

 host.innerHTML='<div class="wrap">'+
  '<div class="ovhead">'+
   '<div><h2>'+(first?mhE(first)+'’s AERA':'Your AERA')+'</h2>'+
   '<p>Everything that belongs to you, in one place.</p></div>'+
   '<a class="ovap" href="'+ACCT_URL+'#points" title="AERA Points">'+
    '<b>'+ap.toLocaleString()+' AP</b><span>'+
    (ap?'worth '+mhRM(ap/100*MEH_AP.rmPer100):'earn '+MEH_AP.perRM+' per RM 1')+'</span></a>'+
  '</div>'+
  mhPlanRow(s)+mhWeight(s)+
  '<div class="ovgrid">'+cards.join('')+'</div>'+
 '</div>';
 mhWire()}

/* Links in the menu, the hero and the footer that point at a section this page no
   longer shows. Anything with somewhere else to go is pointed there; the rest are
   marked .mkt, which the stylesheet hides once the body is signed in. */
var MEH_GONE={'#bundles':'shop#bundles','#meals':'shop#all','#faq-points':'acct#points',
 '#plan':'plan','#how':'','#delivery':'','#gyms':'','#faq':''};
function mhLinks(){
 var on=document.body.classList.contains('mkExpand');
 var scope=document.querySelectorAll('nav a[href^="#"],nav a[data-mkt],'+
  '.hero a[href^="#"],.hero a[data-mkt],footer a[href^="#"],footer a[data-mkt]');
 Array.prototype.forEach.call(scope,function(a){
  /* the anchor it was written with is kept, so extending can put it straight back */
  var orig=a.getAttribute('data-mkt');
  if(orig==null){var h=a.getAttribute('href');if(!(h in MEH_GONE))return;
   orig=h;a.setAttribute('data-mkt',h)}
  var to=MEH_GONE[orig];
  var box=a.closest('li,span')||a;
  if(on){a.setAttribute('href',orig);box.classList.remove('mkt');return}
  if(to){a.setAttribute('href',
    to.indexOf('shop')===0?SHOP_URL+to.slice(4):
    to.indexOf('acct')===0?ACCT_URL+to.slice(4):PLAN_URL);
   box.classList.remove('mkt')}
  else{a.setAttribute('href',orig);box.classList.add('mkt')}})}

/* ---- Extend / Summarise ----------------------------------------------------
   Summarised is what signing in gives you. This brings the rest of the page back —
   the bundles, the menu, how it works, the lot — and puts it away again. The choice
   lasts as long as this browser tab does; a fresh sign-in always starts summarised. */
function mhExpanded(){try{return sessionStorage.getItem('aera.expand')==='1'}catch(e){return false}}
function mhExpand(on){
 try{sessionStorage.setItem('aera.expand',on?'1':'0')}catch(e){}
 document.body.classList.toggle('mkExpand',!!on);
 mhLinks();mhToggleLabel()}
function mhToggleLabel(){
 var b=document.getElementById('meToggle');if(!b)return;
 var on=document.body.classList.contains('mkExpand');
 b.textContent=on?'Summarise':'Extend';
 b.setAttribute('aria-expanded',on?'true':'false');
 b.title=on?'Hide the rest of the page again':'Show the whole page'}

/* acctState ran while the page was still parsing, before any of the above existed,
   so it is run once more now that it does. */
try{acctState()}catch(e){}

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
(function(){
 if(!('IntersectionObserver' in window))return;
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 var sel='section#bundles, section#meals, section#how, section#delivery, section#gyms, section#faq, section#plan';
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
 var PAGE='landing',VER='v1',TOURS={"main": [{"sel": "#hc-bundles", "title": "1 · 7 Days Meal Bundles", "text": "Chef-Picked Menus for your Goal, labelled with Calories and Macros.", "art": "box"}, {"sel": "#hc-meals", "title": "2 · À la Carte Available", "text": "In the Portion Size you choose. ( Vacuum Packed ONLY )", "art": "list"}, {"sel": "#hc-plan", "title": "3 · Personalise To Your Daily Intake", "text": "Tell us your Body and your Goal, and we build the week around it.", "art": "macro"}, {"sel": "#hc-how", "title": "After Placing Order…", "text": "Kitchen Prep, Weigh and Pack according to your Order.", "art": "cook"}, {"sel": "#hc-pack", "title": "Packaging &amp; Delivery", "text": "Select your Preferred Packaging at Checkout.", "art": "pack"}, {"sel": ["#acctBtn", "#navToggle"], "title": "My Account", "text": "Order History, AERA Points, Saved Meal Plans &amp; AERA Credit live here.", "art": "user", "pad": 6}, {"sel": ["#annBell", "#annBellM", "#navToggle"], "title": "What Is New", "text": "New Dishes, Closures and Promotions show up behind the Bell.", "art": "bell", "pad": 6}, {"sel": "#faq .sec-head", "title": "Few Easy Steps", "text": "Sign Up — Order — Self Pick-Up or Delivery — keep it in the chiller up to 7 Days — reheat in the microwave — Bon Appétit.", "art": "doc"}]},HELP='How It Works';
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
window.AERA_I18N={};
window.AERA_I18N_RE=[];
(function(){
 var KEY='aera_lang',lang='en';
 try{lang=localStorage.getItem(KEY)||'en'}catch(e){}
 window.aeraLangGet=function(){return lang};
 window.aeraLang=function(){var n=(lang==='zh')?'en':'zh';try{localStorage.setItem(KEY,n)}catch(e){}location.reload()};
 if(lang!=='zh')return;
 document.documentElement.setAttribute('data-lang','zh');
 var D=window.AERA_I18N,R=window.AERA_I18N_RE,done=new WeakSet();
 function tr(s){var k=String(s).replace(/\s+/g,' ').trim();if(!k)return null;
  if(Object.prototype.hasOwnProperty.call(D,k))return D[k];
  for(var i=0;i<R.length;i++){if(R[i][0].test(k))return k.replace(R[i][0],R[i][1])}
  return null}
 var SKIP={SCRIPT:1,STYLE:1,NOSCRIPT:1,TEXTAREA:1};
 function walk(root){
  if(root.nodeType===3){node(root);return}
  if(root.nodeType!==1)return;
  attrs(root);root.querySelectorAll('*').forEach(attrs);
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode())node(n)}
 function node(n){
  if(done.has(n))return;var p=n.parentElement;if(!p||SKIP[p.tagName])return;
  if(p.closest('#langSw,.noi18n'))return;
  var t=tr(n.nodeValue);if(t===null)return;done.add(n);
  n.nodeValue=n.nodeValue.replace(/^(\s*)[\s\S]*?(\s*)$/,'$1'+t.replace(/\$/g,'$$')+'$2')}
 var ATTR=['placeholder','title','aria-label','alt','value'];
 function attrs(el){if(!el.getAttribute)return;if(el.closest&&el.closest('#langSw,.noi18n'))return;
  for(var i=0;i<ATTR.length;i++){var a=ATTR[i];if(!el.hasAttribute(a))continue;
   if(a==='value'&&!/^(button|submit|reset)$/i.test(el.type||''))continue;
   var t=tr(el.getAttribute(a));if(t!==null)el.setAttribute(a,t)}}
 var q=false;
 function run(){q=false;walk(document.body);var t=tr(document.title);if(t!==null)document.title=t}
 function queue(){if(q)return;q=true;requestAnimationFrame(run)}
 window.aeraRetranslate=queue;
 function boot(){run();new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){if(ms[i].addedNodes.length||ms[i].type==='characterData'){queue();return}}}).observe(document.body,{childList:true,subtree:true,characterData:true});setInterval(queue,1200)}
 if(document.readyState==='loading')addEventListener('DOMContentLoaded',boot);else boot();
})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Bundles":"套餐","Meals":"餐点","How It Works":"运作方式","Delivery":"配送","Gym Fridges":"健身房冰柜","FAQ":"常见问题","Personalised Plan":"个人定制计划","AERA Fridge":"AERA 冰箱","Merchandise":"周边商品","AERA Points":"AERA 积分","Track My Order":"查询我的订单","Log In":"登录","Sign Up":"注册","My Account":"我的账户","Order History":"订单记录","My Favourite Meal Plans":"我收藏的餐单","My Home-Sourced Meals":"我的自备餐点","Addresses":"收件地址","Settings":"账户设置","Change Password":"更改密码","Referrer Sign Up":"推荐人注册","Referrer Portal":"推荐人专区","Order Now":"立即订购","AERA Meal Prep home":"AERA Meal Prep 首页",
"Meal Bundles":"一周套餐","7 Days, Chef-Picked for your Goal":"七天份，主厨依您的目标搭配","À la Carte":"单点","Any Meals, your portion sizes":"任选餐点，份量自订","Personalised Meal Plan":"个人定制餐单","Built to your Calories and Macros":"依您的热量与营养比例定制","Spend your AERA Points":"使用您的 AERA 积分","Announcements":"最新公告","Where are you signing in?":"您要从哪里登录？",
"Chef-prepared · Macros on every box · Klang Valley":"主厨现做 · 每盒标示营养 · 巴生谷","Meal Prep Built":"专为您的","Around":"目标","Your Goal.":"而做的备餐。","Fat Loss or Mass Gain - Pick a 7 Days Bundle or build your Own Week from 29 meals. Weighed to the gram, MAP-Packed to stay fresh for 7 Days, delivered chilled or ready for Pick-Up.":"减脂或增肌 — 选一份七天套餐，或从 29 道餐点自组您的一周。每一克都称准，MAP 保鲜包装可存放 7 天，冷藏配送或到店自取。","Search a Meal by Name, Goal or Macros":"按名称、目标或营养搜索餐点","No Meal matches that. Try a shorter word.":"没有符合的餐点。试试更短的关键词。","Shop Meal Bundles":"选购一周套餐","Browse All Meals":"浏览全部餐点","Get My Daily Calories":"计算我的每日热量","🔇 Sound":"🔇 声音","Swipe for more ›":"左右滑动查看更多 ›","6 Years Serving Malaysia":"服务马来西亚 6 年","3,800+ Meal Plans Generated":"已生成 3,800+ 份餐单","MAP Bento · 7 Days Shelf Life":"MAP 保鲜餐盒 · 7 天保质期","Reheat in 2 Minutes - 3 Minutes":"微波 2 至 3 分钟即可",
"Latest From AERA":"AERA 最新消息","Kitchen Notice":"厨房通知","Kitchen Closed 14 – 21 March":"厨房休息：3 月 14 日至 21 日","We are away for the week. Last delivery is Friday 13 March — order by Wednesday to get your boxes before we close.":"我们休息一周。最后配送日为 3 月 13 日（星期五）— 请在星期三之前下单，以便在休息前收到餐点。","New This Week":"本周新品","Thai basil, chilli and garlic over jasmine rice. On the menu now and in every 14-box bundle.":"泰国罗勒、辣椒与蒜香，搭配香米饭。现已上菜单，14 盒套餐内也有。","See The Menu":"查看菜单","Now Stocked At TNT Fitness, USJ":"现已进驻 TNT Fitness, USJ","Grab-and-go boxes in the chiller, restocked every Monday and Thursday morning.":"冷柜内即拿即走，每周一与周四早上补货。","Find A Fridge":"寻找冰柜据点","Turn Your Points Into Merchandise":"用积分换购周边商品","Shakers, cooler bags and tees can now be paid for with the points you have already earned.":"摇摇杯、保温袋与 T 恤，现在都能用您已累积的积分换购。","Browse Merchandise":"浏览周边商品","Do not show me this again":"不再显示","Extend":"延长",
"Skip the Guesswork. Take a Week.":"不必伤脑筋，直接订一周。","Chef-Selected Menus for each Goal. Every box is labelled with Calories, Protein, Carbs & Fat. Prices include Packaging.":"每个目标都有主厨挑选的菜单。每一盒都标示热量、蛋白质、碳水与脂肪。价格已含包装。","Fat Loss":"减脂","Mass Gain":"增肌","Most Popular":"最受欢迎","Order This Bundle":"订购此套餐","Lean Proteins, Oil-Free Vegetables":"低脂蛋白质，无油蔬菜","14 Different Fat Loss Meals — No Repeats":"14 道不重复的减脂餐","14 Different Mass Gain Meals — No Repeats":"14 道不重复的增肌餐","800 KCALs - 1,260 KCALs, 40 g - 60 g Protein each":"每餐 800 – 1,260 大卡，蛋白质 40 – 60 克","These are the 7 meals the kitchen packs for this bundle — one a day for seven days. Tell us in the kitchen notes at checkout if there is one you would rather not have and we will swap it.":"这是厨房为此套餐准备的 7 道餐点 — 七天，每天一份。若有不想要的，请在结账时的厨房备注中告诉我们，我们会替换。","These are the 14 meals the kitchen packs for this bundle — two a day for seven days, every one different. Tell us in the kitchen notes at checkout if there is one you would rather not have and we will swap it.":"这是厨房为此套餐准备的 14 道餐点 — 七天，每天两份，道道不同。若有不想要的，请在结账时的厨房备注中告诉我们，我们会替换。",
"Build Your Own Week":"自组您的一周","Mix and match any Meals. Minimum order applies at Checkout; all prices in RM per box, Packaging included.":"任意搭配餐点。结账时有最低订购量；价格为每盒 RM，已含包装。","KCAL":"热量","Protein":"蛋白质","Carbs":"碳水","Fat":"脂肪","Add to Cart":"加入购物车",
"How it works":"运作方式","From Order to Microwave":"从下单到上桌","Kitchen in Seri Kembangan. Every Order is cooked to order, weighed, sealed and chilled, never frozen.":"厨房设于 Seri Kembangan。每一份订单都现做、称重、封装、冷藏，绝不冷冻。","Pick Your Meals":"选择餐点","A Goal Bundle, or any mix from the Menu.":"选一份目标套餐，或从菜单自由搭配。","Choose a Slot":"选择时段","Delivery Date and Time, or Self Pick-Up. Order before 1 PM for any time slot 3 days later. Sundays are not counted, and we do not deliver on Sundays.":"选择配送日期与时段，或自行取餐。下午 1 点前下单，可选 3 天后的任何时段。星期日不计，星期日也不配送。","Pay Securely":"安全付款","Card, FPX Online Banking or GrabPay at Checkout.":"结账时可用信用卡、FPX 网上银行或 GrabPay。","We Cook & Seal":"现做并封装","Modified-Atmosphere Packaging keeps texture and freshness for 7 Days in the chiller.":"气调保鲜包装（MAP）让口感与新鲜度在冷藏下维持 7 天。","Chilled Delivery":"冷藏配送","Rider brings your whole Order in one trip across Klang Valley.":"骑手一趟把整份订单送达巴生谷各区。","Heat & Eat":"加热即食","Remove the top film, pour the Sauce, 2 minutes - 3 minutes in the microwave.":"撕开封膜，淋上酱汁，微波 2 至 3 分钟。"
});
window.AERA_I18N_RE.push(
[/^(\d+) kcal$/,"$1 大卡"],[/^(\d+) KCALs$/,"$1 大卡"],[/^(\d+) g protein$/,"蛋白质 $1 克"],[/^(\d+) g Protein · (.+)$/,"蛋白质 $1 克 · $2"],[/^RM ([\d,.]+) per Meal$/,"每餐 RM $1"],[/^See the (\d+) Meals Inside$/,"查看内含的 $1 道餐点"],[/^(\d+) Meals$/,"$1 份餐点"],[/^(\d+) Days x (\d+) Meals?$/,"$1 天 × 每天 $2 餐"],[/^All (\d+) Meals$/,"全部 $1 道餐点"],[/^kcal a day · P (\d+) g · C (\d+) g · F (\d+) g · Fat Loss$/,"大卡/天 · 蛋白质 $1 克 · 碳水 $2 克 · 脂肪 $3 克 · 减脂"],[/^kcal a day · P (\d+) g · C (\d+) g · F (\d+) g · Mass Gain$/,"大卡/天 · 蛋白质 $1 克 · 碳水 $2 克 · 脂肪 $3 克 · 增肌"],[/^kcal a day · P (\d+) g · C (\d+) g · F (\d+) g · Just Healthy$/,"大卡/天 · 蛋白质 $1 克 · 碳水 $2 克 · 脂肪 $3 克 · 健康饮食"],[/^kcal a day · P (\d+) g · C (\d+) g · F (\d+) g$/,"大卡/天 · 蛋白质 $1 克 · 碳水 $2 克 · 脂肪 $3 克"],[/^(\d+) Boxes · (RM [\d,.]+)$/,"$1 盒 · $2"],[/^(\d+) Boxes$/,"$1 盒"]
);
Object.assign(window.AERA_I18N,{
"Packaging & delivery":"包装与配送","Fresh, Not Frozen":"冷藏保鲜，绝不冷冻","RM 1.80 per box · Choose at Checkout":"每盒 RM 1.80 · 结账时选择","MAP Bento Box":"MAP 保鲜餐盒","Oxygen is removed from the box and replaced with a 70% Nitrogen / 30% CO₂ blend before it is top-sealed. The food is never compressed, so texture stays as the Chef intended. Keep in the chiller — 7-Day shelf life.":"封膜前先抽走盒内氧气，换成 70% 氮气 / 30% 二氧化碳的混合气体。食物完全不受挤压，口感保持主厨原本的样子。请冷藏存放 — 保质期 7 天。","Vacuum Packed":"真空包装","Same freshness, flatter pack. Takes far less fridge space but compresses the food slightly. Good for taking several days of Meals home from the Gym.":"一样新鲜，包装更扁平。占用冰箱空间少得多，但食物会被稍微压实。适合从健身房一次带几天的餐点回家。","Klang Valley":"巴生谷","Delivery & Pick-Up":"配送与自取","— Choose your Date and Time slot at Checkout; Delivery Fee is calculated by distance.":"— 结账时选择日期与时段；配送费按距离计算。","Self Pick-Up":"自取","— Free, from our Kitchen at NO.35, Jalan Equine 9A, Taman Equine, 43300 Seri Kembangan, Selangor. Daily 9.00 AM - 5.00 PM.":"— 免费，到我们的厨房自取：NO.35, Jalan Equine 9A, Taman Equine, 43300 Seri Kembangan, Selangor。每天上午 9:00 至下午 5:00。","Cut-OFF":"截单时间","— Order before 1 PM for any time slot 3 days later. Sundays are not counted, and we do not deliver on Sundays. Weekly Bundles are cooked in one batch and delivered together.":"— 下午 1 点前下单，可选 3 天后的任何时段。星期日不计，星期日也不配送。一周套餐会一次做好，一起送达。","— Grab single Meals any time from our Partner Gyms below.":"— 也可随时到以下合作健身房选购单盒餐点。","Open Kitchen Location in Maps":"在地图中打开厨房位置",
"AERA × Gyms":"AERA × 健身房","Find Us in the Fridge":"在冰柜里找到我们","Members at our Partner Gyms can grab a Fat-Loss or Mass-Gain box before or after training and heat it in the Gym microwave, or take a few home for the week.":"合作健身房的会员可以在训练前后取一盒减脂或增肌餐，用健身房的微波炉加热，也可以多带几盒回家吃一周。","Run a Gym? We stock, restock and label the Fridge for you.":"您经营健身房吗？冰柜的上架、补货与标签，我们全包。","Partner with us on WhatsApp":"用 WhatsApp 洽谈合作",
"Personalised meal plan":"个人定制餐单","Want it Built to Your Macros?":"想按您的营养比例定制吗？","Answer a short Questionnaire — Body, Activity Level, Goal, Foods to Avoid, How many Meals a day, and our Planner sets your Daily Calories and Macros, then fills 5 Days or 7 Days with Meals sized to the gram to hit them. Swap any dish or adjust any portion before you order.":"填一份简短问卷 — 身体数据、活动量、目标、忌口食物、每天几餐 — 我们的规划系统会定出您的每日热量与营养比例，再用称到克的餐点填满 5 天或 7 天。下单前可随时更换菜色或调整份量。","Start My Personalised Plan":"开始定制我的餐单","Already have a plan from a Coach or a Dietitian?":"已经有教练或营养师给的餐单？","Hand it to us and we will cook it":"交给我们，我们照着做",". Type it out, or photograph the sheet.":"。可以直接输入，或拍下那张表。","Fat Loss Split":"减脂配比","−200 KCALs a Day":"每天 −200 大卡","Lean Mass Gain":"精瘦增肌","+ 200 KCALs a Day, higher Protein":"每天 +200 大卡，蛋白质更高","+200 KCALs a Day, Carb-Loaded":"每天 +200 大卡，高碳水","Custom":"自定义","Your Own Macros":"您自己的营养比例","Type them in; we do the Maths":"输入数字，计算交给我们",
"Questions":"常见问题","Good to Know":"您可能想知道","How long do the meals last?":"餐点可以放多久？","7 Days in the chiller from the day they are packed. The Pack Date is printed on every box. Don't freeze MAP Bento Boxes; it defeats the Packaging. Vacuum Packed can be frozen if you need longer.":"从包装当天起，冷藏可放 7 天。每一盒都印有包装日期。MAP 保鲜餐盒请勿冷冻，那会破坏包装的作用。真空包装如需放更久，可以冷冻。","How do I reheat?":"要怎么加热？","Peel back the top seal, pour the Sauce Sachet over the food if one is included, and microwave 2 minutes or 3 minutes. A steamer works too.":"撕开顶部封膜，若附有酱包请淋在食物上，微波 2 至 3 分钟。用蒸的也可以。","Allergies and Preferences?":"过敏与饮食偏好？","Each Meal lists its components. Meals containing Prawn, Seafood, Dairy, Peanut or Beef are named as such. For No-Spice, Less-Salt or Oil-Free requests, or to exclude an Ingredient entirely, use the Personalised Meal Plan on aeramealprep.net, or message us on WhatsApp before ordering.":"每道餐点都列出成分。含虾、海鲜、乳制品、花生或牛肉的餐点都会注明。若需要不辣、少盐、无油，或要完全避开某样食材，请到 aeramealprep.net 使用个人定制餐单，或在下单前用 WhatsApp 联系我们。","Where do you deliver?":"您们送到哪些地区？","Across Klang Valley — Kuala Lumpur, Petaling Jaya, Subang, Puchong, Seri Kembangan, Cheras, Ampang, Shah Alam and surrounding areas. The Delivery Fee is shown at Checkout based on distance from our Seri Kembangan Kitchen.":"巴生谷全区 — 吉隆坡、八打灵再也、梳邦、蒲种、Seri Kembangan、蕉赖、安邦、莎阿南及周边地区。配送费会在结账时按与 Seri Kembangan 厨房的距离显示。","What are AERA Points?":"什么是 AERA 积分？","Every Order earns":"每笔订单可获得","5 AP for each RM 1":"每消费 RM 1 得 5 AP","spent on Meals ( Packaging and Delivery Fees excluded ).":"（仅计算餐点消费，不含包装费与配送费）。","OFF a future order — Up to 10% of that Order OR towards AERA Merchandise. Points are tied to the Email you order with and expire 6 Months after they are earned. No Sign-In needed : At":"可在下次订单折抵 — 最多折抵该笔订单的 10%，或用来换购 AERA 周边商品。积分绑定您下单时使用的电邮，自获得起 6 个月后失效。无需登录：在","Checkout":"结账页",", type your email and your balance appears with a dropdown to pick how much to take off before you pay.":"输入您的电邮，余额就会显示，并可从下拉选单选择付款前要折抵多少。","How do I pay?":"如何付款？","Checkout is handled by Stripe. Visa, Mastercard, FPX Online Banking and GrabPay are accepted; we never see or store your card details.":"结账由 Stripe 处理。接受 Visa、Mastercard、FPX 网上银行与 GrabPay；我们不会看到也不会保存您的卡片资料。","Can I change or cancel an order?":"可以更改或取消订单吗？","We prep your Meals over the 3 days before your slot, so changes and cancellations are possible up to 1 PM, 3 days before Delivery, not counting Sundays. For a Monday delivery, that is 1 PM on the Thursday before. Message us on WhatsApp with your Order Number.":"我们会在您选的时段前 3 天备餐，因此更改或取消最晚可到配送 3 天前的下午 1 点（星期日不计）。例如星期一配送，须在之前的星期四下午 1 点前。请用 WhatsApp 联系我们并提供订单号码。","AERA stands for Always an ERA. Fitness Culture and Healthy eating are never going out of style. We make eating well the easy part.":"AERA 代表 Always an ERA。健身文化与健康饮食永远不会过时。我们让「吃得好」变成最轻松的那一环。",
"Order & Contact":"订购与联络","Follow":"关注我们","Bring Your Own Plan":"自带餐单","Search anything":"搜索任何内容","Try":"试试","Calories":"热量","Price":"价格","Lowest Calories":"最低热量","Highest Calories":"最高热量","Lowest Price":"最低价格","Highest Price":"最高价格","Lowest Protein":"最低蛋白质","Highest Protein":"最高蛋白质","Lowest Carbs":"最低碳水","Highest Carbs":"最高碳水","Lowest Fat":"最低脂肪","Highest Fat":"最高脂肪","Best Protein per Ringgit":"每令吉最多蛋白质","Best Match":"最佳匹配","Nothing matches that.":"没有符合的结果","Cheapest Meal":"最便宜的餐点","Most Protein":"最多蛋白质","Fat Loss Under 500 kcal":"减脂 500 卡以内","Shakers, Bags and Tees":"摇摇杯、袋子与 T 恤","Where your Boxes are right now":"您的餐盒现在在哪里","Your Orders, AERA Points and Addresses":"您的订单、AERA 积分与地址","Every Order you have placed":"您下过的每一单","Built to your Calories and Macros":"依您的热量与营养比例定制","The questions we are asked most":"最常被问到的问题","Jump to":"快速前往","Pages":"页面","A Plan from your Coach or Dietitian":"来自教练或营养师的餐单","Nothing found":"未找到结果","Terms & Conditions":"条款与细则","WhatsApp us":"WhatsApp 联系我们","© 2026 AERA Meal Preparation SDN BHD · 202001037122 ( 1393443-P ) · 35, Jalan Equine 9A, Taman Equine, 43300 Seri Kembangan, Selangor. Kitchen open daily 9.00 am - 5.00 pm.":"© 2026 AERA Meal Preparation SDN BHD · 202001037122 ( 1393443-P ) · 35, Jalan Equine 9A, Taman Equine, 43300 Seri Kembangan, Selangor。厨房每天营业 上午 9:00 – 下午 5:00。"
});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Skip":"略过","Next":"下一步","Back":"上一步","Done":"完成","Got it":"知道了","Got It":"知道了","GOT IT":"知道了","Finish":"完成","Close":"关闭","Start":"开始",
"1 · 7 Days Meal Bundles":"1 · 七天一周套餐","Chef-Picked Menus for your Goal, labelled with Calories and Macros.":"主厨依您的目标挑选的菜单，每一盒都标示热量与营养值。","2 · À la Carte Available":"2 · 也可以单点","In the Portion Size you choose. ( Vacuum Packed ONLY )":"份量由您决定。（仅限真空包装）","3 · Personalise To Your Daily Intake":"3 · 依您的每日摄取量定制","Tell us your Body and your Goal, and we build the week around it.":"告诉我们您的身体数据与目标，我们就照着排出这一周。","After Placing Order…":"下单之后…","Kitchen Prep, Weigh and Pack according to your Order.":"厨房会依您的订单备料、称重与包装。","Packaging & Delivery":"包装与配送","Select your Preferred Packaging at Checkout.":"结账时选择您偏好的包装。","Order History, AERA Points, Saved Meal Plans & AERA Credit live here.":"订单记录、AERA 积分、已保存的餐单与 AERA 余额都在这里。","What Is New":"有什么新消息","New Dishes, Closures and Promotions show up behind the Bell.":"新菜色、休息通知与优惠活动都会出现在铃铛里。","Few Easy Steps":"几个简单步骤","Sign Up — Order — Self Pick-Up or Delivery — keep it in the chiller up to 7 Days — reheat in the microwave — Bon Appétit.":"注册 — 下单 — 自取或配送 — 冷藏最多 7 天 — 微波加热 — 请慢用。"
});
window.AERA_I18N_RE.push([/^Step (\d+) of (\d+)$/i,"第 $1 步，共 $2 步"]);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"Signed in as":"已登录：","Log Out":"登出","Everything of yours is in":"您的所有资料都在","Everything that belongs to you, in one place.":"属于您的一切，都在这里。","My Meal Plan":"我的餐单","None yet":"还没有","Build one around your Calories and Macros, or hand us a Plan your Coach wrote.":"依您的热量与营养比例制定一份，或把教练写的餐单交给我们。","Build a plan":"制定餐单","Weight Control":"体重管理","Empty":"还没有记录","Put in your Weight and Body Composition and watch it move over time.":"输入您的体重与身体组成，看它随时间的变化。","Add your first Report":"新增第一份记录","No Orders yet":"还没有订单","Everything you Order shows up here with its Delivery Day and Tracking.":"您下的每一笔订单都会显示在这里，附上配送日期与查询连结。","See the Menu":"查看菜单","My Home-Sourced Meal":"我的自备餐点","Nothing Saved":"还没有保存任何内容","Everything you have keyed in on the Home-Sourced Meals Page. Add them to a plan from the “Your Week” step.":"您在「自备餐点」页面输入过的全部内容。可在「您的一周」步骤中加入餐单。","Add Something":"新增一项"
});
Object.assign(window.AERA_I18N,{
"Open & tune this plan":"打开并调整这份餐单",
"Body Weight":"体重","Body Fat Mass":"体脂重","Body Fat":"体脂率",
"Skeletal Muscle Mass":"骨骼肌重","Visceral Fat":"内脏脂肪",
"Overall":"总览","Monthly":"每月","Report Today":"记录今天"
});
Object.assign(window.AERA_I18N,{"KG":"公斤","kg":"公斤","g":"克"});
Object.assign(window.AERA_I18N,{"kg/m²":"公斤 / 米²","KG/M²":"公斤 / 米²","KG / m²":"公斤 / 米²","kg / m²":"公斤 / 米²"});
window.AERA_I18N_RE.push([/^([\d,.]+)\s*kg\s*\/\s*m²$/i,"$1 公斤 / 米²"]);
window.AERA_I18N_RE.push(
[/^([\d,.]+) ?KG$/i,"$1 公斤"],
[/^([\d,.]+) ?g$/,"$1 克"]
);
window.AERA_I18N_RE.push(
[/^on (.+)\. You may now keep track of your Fitness Journey here\.$/,"记录于 $1。从这里开始追踪您的健身历程。"]
);
window.AERA_I18N_RE.push(
[/^Welcome back, (.+)$/,"欢迎回来，$1"],[/^worth RM ([\d,.]+)$/,"价值 RM $1"],[/^(.+)[’']s AERA$/,"$1 的 AERA"]
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
if(document.documentElement.getAttribute('data-lang')==='zh'){var st=document.createElement('style');st.textContent='.cap b,.name{white-space:pre-line}';(document.head||document.documentElement).appendChild(st)}
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
/* AERA-MEALS-MORE : on a phone the list opens on six Meals with a button for the rest */
(function(){var SHOW=6,open=false;
 function phone(){try{return matchMedia('(max-width:600px)').matches}catch(e){return false}}
 function apply(){var g=document.getElementById('mealGrid');if(!g)return;
  var n=g.querySelectorAll('article.meal').length,b=document.getElementById('mlMore');
  if(!b){b=document.createElement('button');b.type='button';b.id='mlMore';b.className='mlmore';
   b.onclick=function(){open=!open;apply();if(!open){var s=document.getElementById('meals');if(s)s.scrollIntoView({behavior:'smooth'})}};
   g.parentNode.insertBefore(b,g.nextSibling)}
  var clip=phone()&&!open&&n>SHOW;g.classList.toggle('clip',clip);
  b.style.display=(phone()&&n>SHOW)?'':'none';
  var t=open?'Show Fewer':'Show All '+n+' Meals';if(b.getAttribute('data-t')!==t){b.setAttribute('data-t',t);b.textContent=t;if(window.aeraRetranslate)window.aeraRetranslate()}}
 function boot(){var g=document.getElementById('mealGrid');if(!g)return;
  new MutationObserver(function(){apply()}).observe(g,{childList:true});
  try{matchMedia('(max-width:600px)').addEventListener('change',apply)}catch(e){}
  apply()}
 if(window.AERA_I18N_RE)window.AERA_I18N_RE.unshift([/^Show All (\d+) Meals$/,'显示全部 $1 道餐点']);
 if(window.AERA_I18N){window.AERA_I18N['Show Fewer']='收起';window.AERA_I18N['Summarise']='收起';window.AERA_I18N['Extend']='展开'}
 if(document.readyState==='loading')addEventListener('DOMContentLoaded',boot);else boot();
})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* Dates in 中文 : 16th SEP 2026 is written 9 月 16 日 2026 年. One pass after the page
   settles, and again whenever a card is redrawn. English is left exactly as it was. */
(function(){
 var M={JAN:1,FEB:2,MAR:3,APR:4,MAY:5,JUN:6,JUL:7,AUG:8,SEP:9,OCT:10,NOV:11,DEC:12};
 try{if((localStorage.getItem('aera_lang')||'en')!=='zh')return}catch(e){return}
 var W={SUN:'\u5468\u65e5',MON:'\u5468\u4e00',TUE:'\u5468\u4e8c',TUES:'\u5468\u4e8c',WED:'\u5468\u4e09',THU:'\u5468\u56db',THUR:'\u5468\u56db',THURS:'\u5468\u56db',FRI:'\u5468\u4e94',SAT:'\u5468\u516d'};
 var RE=/(?:([A-Z]{3,5}),\s*)?(\d{1,2})(?:st|nd|rd|th)?\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:\s+(\d{4}))?/gi;
 function fix(s){return s.replace(RE,function(m,w,d,mon,y){var n=M[String(mon).toUpperCase()];
  if(!n)return m;var wd=w?(W[String(w).toUpperCase()]||''):'';if(w&&!wd)return m;
  return (wd?wd+', ':'')+n+' \u6708 '+(+d)+' \u65e5'+(y?' '+y+' \u5e74':'')})}
 var busy=false,t=null;
 function pass(){if(busy)return;busy=true;
  try{var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;
   while(n=w.nextNode()){var p=n.parentElement;if(!p)continue;var g=p.tagName;
    if(g==='SCRIPT'||g==='STYLE'||g==='TEXTAREA')continue;
    var v=n.nodeValue;if(!v||v.length<5)continue;var nv=fix(v);if(nv!==v)n.nodeValue=nv}}catch(e){}
  busy=false}
 function boot(){pass();
  try{new MutationObserver(function(){if(busy)return;clearTimeout(t);t=setTimeout(pass,150)})
   .observe(document.body,{childList:true,subtree:true,characterData:true})}catch(e){}}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* The chat launcher ships with a generic speech bubble. Swap in Bento, the AERA
   assistant, whenever the launcher is showing its closed state. The widget swaps
   in its own close mark while the panel is open, so leave that one alone. */
(function(){
 var ID='ultra-fast-widget-bubble-48507863';
 var FACE='<svg width="34" height="34" viewBox="0 0 48 48" fill="none" aria-hidden="true" data-aera-bento="1">'+
  '<path d="M24 13.5V10" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>'+
  '<circle cx="24" cy="6.6" r="2.7" fill="#FDB913"/>'+
  '<rect x="8.6" y="13.5" width="30.8" height="26" rx="7.2" stroke="#fff" stroke-width="2.9"/>'+
  '<circle cx="17.8" cy="24" r="2.7" fill="#fff"/>'+
  '<circle cx="30.2" cy="24" r="2.7" fill="#fff"/>'+
  '<path d="M17.6 31.2q6.4 5 12.8 0" stroke="#FDB913" stroke-width="2.9" stroke-linecap="round"/>'+
  '</svg>';
 function paint(){
  var b=document.getElementById(ID);
  if(!b)return false;
  if(b.querySelector('[data-aera-bento]'))return true;
  var h=b.innerHTML||'';
  /* only the closed-state speech bubble, never the close mark */
  if(h.indexOf('m3 21 1.9-5.7')<0)return true;
  b.innerHTML=FACE;
  b.setAttribute('aria-label','Ask AERA');
  b.setAttribute('title','Ask AERA');
  return true;
 }
 var n=0,t=setInterval(function(){ if(paint()||++n>60)clearInterval(t) },400);
 try{ new MutationObserver(function(){paint()})
  .observe(document.body,{childList:true,subtree:true}) }catch(e){}
})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA · Bento companion — lives on the landing page : start */
(function(){
  if(window.__AERA_BENTO) return; window.__AERA_BENTO=1;
  var reduce=false; try{ reduce=matchMedia('(prefers-reduced-motion: reduce)').matches }catch(e){}

  function boot(){
    if(window.THREE) return start();
    var s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.async=true; s.onload=start; document.head.appendChild(s);
  }
  if(document.readyState==='complete') setTimeout(boot,1200);
  else window.addEventListener('load',function(){ setTimeout(boot,1200) });

  function start(){
    if(!window.THREE) return;

    /* ---------- stage ---------- */
    var wrap=document.createElement('div');
    wrap.id='aera-bento';
    wrap.setAttribute('aria-hidden','true');
    wrap.style.cssText='position:fixed;inset:0;z-index:44;pointer-events:none;overflow:hidden';
    document.body.appendChild(wrap);

    var hit=document.createElement('button');
    hit.type='button';
    hit.setAttribute('aria-label','Bento, the AERA mascot');
    hit.style.cssText='position:fixed;width:74px;height:104px;border:0;background:transparent;padding:0;'+
      'z-index:45;cursor:pointer;pointer-events:auto;outline-offset:4px';
    document.body.appendChild(hit);

    var W=innerWidth, H=innerHeight, PPU=innerWidth<760?36:46;
    var renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
    renderer.setSize(W,H);
    if(THREE.sRGBEncoding) renderer.outputEncoding=THREE.sRGBEncoding;
    renderer.domElement.style.cssText='display:block;width:100%;height:100%';
    wrap.appendChild(renderer.domElement);

    var scene=new THREE.Scene();
    var cam=new THREE.OrthographicCamera(-W/2/PPU,W/2/PPU,H/2/PPU,-H/2/PPU,-80,80);
    cam.position.set(0,0,20); cam.lookAt(0,0,0); scene.add(cam);
    function bounds(){ return {l:cam.left+2.6,r:cam.right-2.6,f:cam.bottom+0.52} }

    scene.add(new THREE.HemisphereLight(0xffffff,0xC8D4E8,0.95));
    var key=new THREE.DirectionalLight(0xffffff,0.85); key.position.set(3,6,7); scene.add(key);
    var rim=new THREE.DirectionalLight(0xBFD4FF,0.35); rim.position.set(-5,3,-4); scene.add(rim);

    /* ---------- materials ---------- */
    var NAVY=0x16479E, DEEP=0x0E3576, GOLD=0xFDB913, WHITE=0xF6F9FE;
    function mk(c,e,r){
      var m=new THREE.MeshStandardMaterial({color:c,roughness:r===undefined?0.58:r,metalness:0,
        emissive:c,emissiveIntensity:e===undefined?0.28:e});
      if(m.color.convertSRGBToLinear){ m.color.convertSRGBToLinear(); m.emissive.convertSRGBToLinear(); }
      return m;
    }
    var mN=mk(NAVY,0.34), mG=mk(GOLD,0.42,0.46), mW=mk(WHITE,0.05,0.42), mD=mk(DEEP,0.22);

    function limb(len,r,m){
      var x=new THREE.Mesh(new THREE.CylinderGeometry(r,r*0.9,len,14),m);
      x.position.y=-len/2; return x;
    }
    function ball(r,m){ return new THREE.Mesh(new THREE.SphereGeometry(r,18,14),m) }
    function box(w,h,d,m){ return new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m) }

    /* ---------- the mascot ---------- */
    var bento=new THREE.Group(); scene.add(bento);
    var BW=1.02,BH=1.06,BD=0.46, HIPY=0.88, TORY=HIPY+BH/2+0.04, HEADY=TORY+BH/2+0.36;

    var torso=box(BW,BH,BD,mN); torso.position.y=TORY; bento.add(torso);
    var pecL=ball(0.25,mN), pecR=ball(0.25,mN);
    pecL.position.set(-0.24,TORY+0.26,BD/2-0.04); pecL.scale.set(1,0.8,0.7);
    pecR.position.set( 0.24,TORY+0.26,BD/2-0.04); pecR.scale.set(1,0.8,0.7);
    bento.add(pecL); bento.add(pecR);
    for(var ai=0;ai<3;ai++){
      var abL=ball(0.11,mN), abR=ball(0.11,mN);
      abL.position.set(-0.13,TORY-0.02-ai*0.22,BD/2-0.03); abL.scale.set(1,0.72,0.55);
      abR.position.set( 0.13,TORY-0.02-ai*0.22,BD/2-0.03); abR.scale.set(1,0.72,0.55);
      bento.add(abL); bento.add(abR);
    }
    var belt=box(BW+0.08,0.18,BD+0.06,mG); belt.position.y=HIPY+0.06; bento.add(belt);

    var head=new THREE.Group(); head.position.y=HEADY; bento.add(head);
    head.add(box(0.80,0.70,0.40,mN));
    var visor=box(0.84,0.20,0.44,mG); visor.position.y=0.26; head.add(visor);
    var ant=limb(0.26,0.026,mG); ant.position.y=0.62; head.add(ant);
    var tip=ball(0.075,mG); tip.position.y=0.66; head.add(tip);
    var eyeL=ball(0.115,mW), eyeR=ball(0.115,mW);
    eyeL.position.set(-0.17,0.05,0.21); eyeR.position.set(0.17,0.05,0.21);
    head.add(eyeL); head.add(eyeR);
    var pupL=ball(0.055,mD), pupR=ball(0.055,mD);
    pupL.position.set(-0.17,0.05,0.30); pupR.position.set(0.17,0.05,0.30);
    head.add(pupL); head.add(pupR);
    var smile=new THREE.Mesh(new THREE.TorusGeometry(0.15,0.028,8,22,Math.PI),mG);
    smile.position.set(0,-0.15,0.215); smile.rotation.z=Math.PI; head.add(smile);

    function arm(side){
      var sh=new THREE.Group(); sh.position.set(side*(BW/2+0.14),TORY+0.34,0.02);
      sh.add(ball(0.19,mN)); sh.add(limb(0.42,0.135,mN));
      var el=new THREE.Group(); el.position.y=-0.42;
      el.add(limb(0.38,0.115,mN));
      var hand=ball(0.135,mG); hand.position.y=-0.44; el.add(hand);
      sh.add(el); bento.add(sh);
      return {s:sh,e:el,h:hand};
    }
    var aL=arm(-1), aR=arm(1);

    function leg(side){
      var hp=new THREE.Group(); hp.position.set(side*0.22,HIPY,0);
      hp.add(limb(0.42,0.155,mN));
      var kn=new THREE.Group(); kn.position.y=-0.42;
      kn.add(limb(0.34,0.125,mN));
      var an=new THREE.Group(); an.position.y=-0.34; kn.add(an);
      var shoe=box(0.30,0.15,0.46,mG); shoe.position.set(0,-0.06,0.09); an.add(shoe);
      hp.add(kn); bento.add(hp);
      return {h:hp,k:kn,a:an};
    }
    var lL=leg(-1), lR=leg(1);

    var shade=new THREE.Mesh(new THREE.CircleGeometry(0.62,26),
      new THREE.MeshBasicMaterial({color:0x0E3576,transparent:true,opacity:0.13,depthWrite:false}));
    shade.rotation.x=-Math.PI/2; shade.position.y=0.02; scene.add(shade);

    /* ---------- the AERA portal ---------- */
    var PTS=[[-0.2813,-0.5007],[-0.3239,-0.4869],[-0.3384,-0.4519],[-0.4718,0.4807],[-0.4381,0.5007],
      [-0.4078,0.4924],[-0.0358,0.1066],[-0.0385,0.0805],[-0.1685,-0.0468],[-0.1348,0.0557],
      [-0.2957,0.2098],[-0.2428,-0.1926],[0.3968,0.4842],[0.4587,0.4869],[0.4787,0.4395],
      [0.3219,-0.3349],[0.2785,-0.337],[0.0839,-0.1451],[0.1905,0.0138],[0.1733,-0.0846],
      [0.2696,-0.1575],[0.3157,0.2338],[-0.2531,-0.4862]];
    var sh=new THREE.Shape();
    sh.moveTo(PTS[0][0],PTS[0][1]);
    for(var pi=1;pi<PTS.length;pi++) sh.lineTo(PTS[pi][0],PTS[pi][1]);
    sh.closePath();
    var markGeo=new THREE.ExtrudeGeometry(sh,{depth:0.16,bevelEnabled:true,bevelThickness:0.03,
      bevelSize:0.024,bevelSegments:2,curveSegments:4});
    markGeo.center();
    var mark=new THREE.Mesh(markGeo,mk(GOLD,0.85,0.34));
    mark.scale.setScalar(2.9);
    var portal=new THREE.Group(); portal.add(mark); portal.visible=false; scene.add(portal);

    /* ---------- state ---------- */
    var B=bounds();
    var px=(B.l+B.r)/2, tx=px, facing=1, yaw=0;
    bento.position.set(px,B.f,0);
    var mode='idle', t0=performance.now(), mt=0, blinkAt=0, nextAt=0;
    var TP=null, wave=0, braced=0, lastScroll=0, scrollHit=0;

    function feetY(){ return bounds().f }
    function reset(){
      lL.h.rotation.x=lR.h.rotation.x=0; lL.k.rotation.x=lR.k.rotation.x=0;
      lL.a.rotation.x=lR.a.rotation.x=0;
      aL.s.rotation.set(0,0,0.18); aR.s.rotation.set(0,0,-0.18);
      aL.e.rotation.set(0,0,0); aR.e.rotation.set(0,0,0);
      head.rotation.set(0,0,0);
      aL.h.visible=aR.h.visible=true;
      bento.rotation.set(0,0,0); bento.scale.setScalar(1);
    }

    function pick(){
      var b=bounds(), r=Math.random();
      if(r<0.34){ mode='walk'; tx=b.l+Math.random()*(b.r-b.l); nextAt=0; }
      else if(r<0.50){ mode='lean'; tx=b.r-0.45; nextAt=0; }
      else if(r<0.64){ mode='teleport'; TP={t:0,to:b.l+Math.random()*(b.r-b.l)}; nextAt=0; }
      else { mode='idle'; nextAt=performance.now()+2600+Math.random()*3400; }
    }
    nextAt=performance.now()+2200;

    /* ---------- poses ---------- */
    function poseIdle(t){
      reset();
      bento.position.y=feetY()+Math.sin(t*1.6)*0.035;
      head.rotation.z=Math.sin(t*0.95)*0.02;
      aL.s.rotation.z=0.18+Math.sin(t*1.3)*0.02;
      aR.s.rotation.z=-0.18-Math.sin(t*1.3)*0.02;
      if(wave>0){
        aR.s.rotation.z=-1.95; aR.s.rotation.x=-0.18;
        aR.e.rotation.z=Math.sin(t*11)*0.42; head.rotation.y=-0.18;
      }
    }
    function poseWalk(t,run){
      reset();
      var w=run?8.4:4.6, s=Math.sin(t*w), a=run?0.95:0.55;
      lL.h.rotation.x=s*a;  lL.k.rotation.x=Math.max(0,-s)*(run?1.4:0.75);
      lR.h.rotation.x=-s*a; lR.k.rotation.x=Math.max(0,s)*(run?1.4:0.75);
      lL.a.rotation.x=-s*0.30; lR.a.rotation.x=s*0.30;
      aL.s.rotation.x=-s*(run?0.8:0.48); aL.s.rotation.z=0.18;
      aR.s.rotation.x= s*(run?0.8:0.48); aR.s.rotation.z=-0.18;
      aL.e.rotation.x=run?-1.3:-0.34; aR.e.rotation.x=run?-1.3:-0.34;
      bento.rotation.x=run?0.22:0.05;
      bento.position.y=feetY()+Math.abs(Math.sin(t*w))*(run?0.11:0.05);
      head.rotation.z=s*0.03;
    }
    function poseLean(t){
      reset();
      var s=Math.sin(t*1.15);
      bento.position.y=feetY()+0.04;
      bento.rotation.z=-0.15; bento.rotation.x=0;
      lL.h.rotation.x=-1.00; lL.k.rotation.x=2.42; lL.a.rotation.x=0.95;
      lR.h.rotation.x=-0.58; lR.k.rotation.x=0.02; lR.a.rotation.x=0.74;
      aL.s.rotation.z=0.16; aL.s.rotation.x=0.10; aL.e.rotation.x=-0.88;
      aR.s.rotation.z=-0.16; aR.s.rotation.x=0.10; aR.e.rotation.x=-0.88;
      aL.h.visible=aR.h.visible=false;
      head.rotation.y=-0.44+s*0.06; head.rotation.x=0.02;
    }
    function poseBrace(t,k){
      reset();
      bento.position.y=feetY();
      lL.h.rotation.x=-0.30*k; lR.h.rotation.x=-0.30*k;
      lL.k.rotation.x=0.62*k;  lR.k.rotation.x=0.62*k;
      lL.a.rotation.x=0.30*k;  lR.a.rotation.x=0.30*k;
      aL.s.rotation.z=0.34+0.70*k; aR.s.rotation.z=-0.34-0.70*k;
      aL.e.rotation.x=-0.70*k; aR.e.rotation.x=-0.70*k;
      bento.rotation.x=-0.16*k;
      head.rotation.x=-0.10*k;
    }

    /* ---------- scroll reaction ---------- */
    addEventListener('scroll',function(){
      var y=pageYOffset, d=Math.abs(y-lastScroll); lastScroll=y;
      scrollHit=Math.min(1,scrollHit+d/260);
    },{passive:true});

    /* ---------- resize ---------- */
    var rz;
    addEventListener('resize',function(){
      clearTimeout(rz); rz=setTimeout(function(){
        W=innerWidth; H=innerHeight; PPU=W<760?36:46;
        renderer.setSize(W,H);
        cam.left=-W/2/PPU; cam.right=W/2/PPU; cam.top=H/2/PPU; cam.bottom=-H/2/PPU;
        cam.updateProjectionMatrix();
        var b=bounds(); px=Math.max(b.l,Math.min(b.r,px)); tx=Math.max(b.l,Math.min(b.r,tx));
      },180);
    },{passive:true});

    /* ---------- click ---------- */
    hit.addEventListener('click',function(){
      if(mode==='teleport') return;
      if(Math.random()<0.45){ var b=bounds(); mode='teleport'; TP={t:0,to:b.l+Math.random()*(b.r-b.l)}; }
      else { mode='idle'; wave=performance.now()+2000; nextAt=performance.now()+2400; }
    });

    /* ---------- loop ---------- */
    var visible=true;
    document.addEventListener('visibilitychange',function(){ visible=!document.hidden });

    function loop(now){
      requestAnimationFrame(loop);
      if(!visible) return;
      var t=(now-t0)/1000, b=bounds();
      scrollHit=Math.max(0,scrollHit-0.028);
      if(wave && now>wave) wave=0;

      if(mode==='teleport'){
        TP.t+=1/60;
        var e=TP.t;
        portal.visible=true;
        portal.position.set(e<1.05?px:TP.to,b.f+1.45,-0.5);
        if(e<0.35){ portal.scale.setScalar(e/0.35); bento.scale.setScalar(1); poseIdle(t); }
        else if(e<1.05){ var u=(e-0.35)/0.70; portal.scale.setScalar(1);
          poseIdle(t); bento.scale.setScalar(Math.max(0.001,1-u*u)); bento.rotation.y=u*u*16; }
        else if(e<1.35){ bento.scale.setScalar(0.001); px=TP.to; }
        else if(e<2.10){ var v=(e-1.35)/0.75, c=1.70158;
          var o=1+(c+1)*Math.pow(v-1,3)+c*Math.pow(v-1,2);
          poseIdle(t); bento.scale.setScalar(Math.max(0.001,o)); bento.rotation.y=(1-v)*(1-v)*16; }
        else if(e<2.70){ portal.scale.setScalar(1-(e-2.10)/0.60); poseIdle(t); }
        else { portal.visible=false; bento.scale.setScalar(1); bento.rotation.y=0;
               mode='idle'; nextAt=now+1500; }
        mark.rotation.y+=0.05;
      }
      else if(scrollHit>0.06){
        poseBrace(t,Math.min(1,scrollHit));
        bento.rotation.y=0;
      }
      else if(mode==='walk'){
        var dx=tx-px;
        if(Math.abs(dx)<0.14){ mode='idle'; nextAt=now+1400+Math.random()*2600; poseIdle(t); }
        else {
          facing=dx>0?1:-1;
          var run=Math.abs(dx)>6;
          px+=facing*(run?0.075:0.035);
          poseWalk(t,run);
        }
      }
      else if(mode==='lean'){
        var d2=tx-px;
        if(Math.abs(d2)>0.16){ facing=d2>0?1:-1; px+=facing*0.035; poseWalk(t,false); }
        else { poseLean(t); if(!nextAt) nextAt=now+5200+Math.random()*5200; }
      }
      else {
        poseIdle(t);
        if(now>nextAt && nextAt) pick();
      }
      if(mode!=='lean' && mode!=='teleport'){
        if(now>nextAt && nextAt && mode==='idle') pick();
      }
      if(mode==='lean' && nextAt && now>nextAt){ nextAt=0; pick(); }

      /* facing */
      var want = (mode==='lean' && Math.abs(tx-px)<0.16) ? -1.15 : (facing>0?0.5:-0.5);
      yaw += (want-yaw)*0.12;
      if(mode!=='teleport') bento.rotation.y=yaw;

      bento.position.x=px;
      shade.position.set(px,b.f-0.02,-0.2);
      shade.scale.setScalar(bento.scale.x*0.9+0.1);
      shade.material.opacity=0.13*bento.scale.x;

      /* blink */
      if(now>blinkAt){
        var k=(now-blinkAt)/130;
        if(k<1){ var sy=1-Math.sin(k*Math.PI)*0.9; eyeL.scale.y=sy; eyeR.scale.y=sy; }
        else { eyeL.scale.y=1; eyeR.scale.y=1; blinkAt=now+2800+Math.random()*3600; }
      }

      /* hit box follows him */
      var sx=(px-cam.left)/(cam.right-cam.left)*W;
      hit.style.left=Math.round(sx-37)+'px';
      hit.style.top=Math.round(H-128)+'px';
      hit.style.pointerEvents=(sx<150||sx>W-150)?'none':'auto';

      renderer.render(scene,cam);
    }

    if(reduce){ poseIdle(0); renderer.render(scene,cam); hit.remove(); }
    else requestAnimationFrame(loop);
  }
})();
/* AERA · Bento companion : end */

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

/* Inbox button in the menu bar. The count shows at once from what My Account last saw, then
   is checked live against the Website database with the visitor's own sign-in ( same site, so the
   session My Account keeps is right here ); if that sign-in has lapsed, the saved count stays. */
(function(){var SBU="https://swpprjvubgcdsojapaad.supabase.co",KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cHByanZ1YmdjZHNvamFwYWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3ODUxNzIsImV4cCI6MjEwNDM2MTE3Mn0.zBvPkzlV5tYSkWiHnF0HB175QMt-u1tXFmR03urcp_0";
function paint(n){var el=document.getElementById("hbInbox");if(el){el.textContent=n>9?"9+":(n?String(n):"");el.style.display=n?"inline-block":"none"}var b=document.getElementById("inboxBtn");if(b){b.setAttribute("aria-label",n?"Inbox, "+n+" unread":"Inbox");b.title=n?n+" unread message"+(n>1?"s":""):"Inbox"}}
function go(){var c=0;try{c=+localStorage.getItem("aera.inboxUnread")||0}catch(e){}paint(c);
 var tok=null,uid=null,em="";try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(/^sb-.*-auth-token$/.test(k)){var o=JSON.parse(localStorage.getItem(k)||"null");if(o&&o.access_token){tok=o.access_token;uid=o.user&&o.user.id;em=String(o.user&&o.user.email||"").toLowerCase()}}}}catch(e){}
 if(!tok||!uid)return;var hd={apikey:KEY,Authorization:"Bearer "+tok};
 var d=new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Kuala_Lumpur"}));var t=d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);
 Promise.all([fetch(SBU+"/rest/v1/inbox_messages?select=id,to_email,ends_at&withdrawn_at=is.null&limit=150",{headers:hd}).then(function(r){return r.ok?r.json():null}),
  fetch(SBU+"/rest/v1/inbox_reads?select=message_id&user_id=eq."+uid,{headers:hd}).then(function(r){return r.ok?r.json():null})]).then(function(a){if(!a[0]||!a[1])return;var rd={};a[1].forEach(function(x){rd[x.message_id]=1});
  var n=a[0].filter(function(m){return (!m.ends_at||m.ends_at>=t)&&(!m.to_email||String(m.to_email).toLowerCase()===em)&&!rd[m.id]}).length;paint(n);try{localStorage.setItem("aera.inboxUnread",String(n))}catch(e){}}).catch(function(){})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()})();

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