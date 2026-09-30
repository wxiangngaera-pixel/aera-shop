(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
var DATA_URL='/api/public/landing-pages/6950/sheet-data';
var TIERS={normal:'Normal Referrer',gym:'Fitness Studio / Gym',influencer:'Fitness Influencer'};
var R={rows:[],loaded:false,year:'',month:''};
function $(s){return document.querySelector(s)}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function rm(v){return 'RM '+(Math.round((+v||0)*100)/100).toFixed(2)}
function isPaid(v){return /^(y|yes|true|1|paid)$/i.test(String(v||''))}
function monthLabel(m){var p=String(m||'').split('-');if(p.length<2)return String(m||'');
 var d=new Date(+p[0],+p[1]-1,1);return isNaN(d)?String(m):d.toLocaleDateString('en-MY',{month:'long',year:'numeric'})}
function monthShort(m){var p=String(m||'').split('-');if(p.length<2)return String(m||'');
 var d=new Date(+p[0],+p[1]-1,1);return isNaN(d)?String(m):d.toLocaleDateString('en-MY',{month:'short'})}
function fmtDate(d){var x=new Date(String(d||'').slice(0,10)+'T00:00:00');return isNaN(x)?String(d||''):x.toLocaleDateString('en-MY',{day:'numeric',month:'short',year:'numeric'})}
function rows(j){var out=[],hd=j&&Array.isArray(j.headers)?j.headers:null,raw=Array.isArray(j)?j:(j&&(j.data||j.rows))||[];
 raw.forEach(function(r){if(Array.isArray(r)&&hd){var o={};hd.forEach(function(k,i){o[k]=r[i]});out.push(o)}else if(r&&typeof r==='object')out.push(r)});return out}
function load(){fetch(DATA_URL,{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){R.rows=rows(j);R.loaded=true;render()})
 .catch(function(){R.loaded=true;R.failed=true;render()})}
function years(){var y={};R.rows.forEach(function(r){var m=String(r.Month||'');if(m)y[m.slice(0,4)]=1});return Object.keys(y).sort().reverse()}
function monthsIn(y){var m={};R.rows.forEach(function(r){var s=String(r.Month||'');if(s.slice(0,4)===y)m[s]=1});return Object.keys(m).sort().reverse()}
function inMonth(m){return R.rows.filter(function(r){return String(r.Month||'')===m})}
function sum(list,k){var t=0;list.forEach(function(r){t+=+r[k]||0});return Math.round(t*100)/100}
function setYear(y){R.year=y;var ms=monthsIn(y);R.month=ms[0]||'';render()}
function setMonth(m){R.month=m;render()}
function render(){
 var box=$('#state');
 if(!R.loaded)return;
 if(R.failed)return box.innerHTML='<div class="card"><div class="msg bad">We could not load your figures just now. Please refresh the page.</div></div>';
 if(!R.rows.length)return box.innerHTML='<div class="card"><div class="empty">Nothing here yet.<br><br>Once someone orders with your referral code, every order shows up here with the cash-back it earned you.</div></div>';
 var name=String(R.rows[0].Referrer||''),code=String(R.rows[0].Code||'').toUpperCase(),tier=String(R.rows[0].Tier||'normal').toLowerCase(),rate=+R.rows[0].Rate||0;
 $('#hdr').textContent=name||'Your Cash-Back';
 $('#sub').innerHTML='<span class="chip">'+esc(code)+'</span> <span class="chip ok">'+esc(TIERS[tier]||TIERS.normal)+' · '+rate+'% Cash-Back</span><br>Every order placed with your referral code, month by month — what it earned you, and what has been paid.';
 var ys=years();if(!R.year||ys.indexOf(R.year)<0)R.year=ys[0]||'';
 var ms=monthsIn(R.year);if(!R.month||ms.indexOf(R.month)<0)R.month=ms[0]||'';
 var mine=inMonth(R.month);
 var pendAll=R.rows.filter(function(r){return !isPaid(r.Paid)}),paidAll=R.rows.filter(function(r){return isPaid(r.Paid)});
 var mPaid=mine.length&&mine.every(function(r){return isPaid(r.Paid)});
 var h='<div class="card">'+
  '<div class="f2"><div><label class="lb" for="yr">Year</label><select id="yr" onchange="setYear(this.value)">'+ys.map(function(y){return'<option value="'+y+'"'+(R.year===y?' selected':'')+'>'+y+'</option>'}).join('')+'</select></div>'+
  '<div><label class="lb" for="mo">Month</label><select id="mo" onchange="setMonth(this.value)">'+ms.map(function(m){return'<option value="'+m+'"'+(R.month===m?' selected':'')+'>'+monthLabel(m)+'</option>'}).join('')+'</select></div></div>'+
  '<div class="mo">'+ms.map(function(m){return'<button type="button" class="'+(R.month===m?'on':'')+'" onclick="setMonth(\''+m+'\')">'+monthShort(m)+'</button>'}).join('')+'</div>'+
  '<div class="tiles">'+
   '<div class="tile"><div class="l">Sales This Month</div><div class="v">'+rm(sum(mine,'Sales'))+'</div><small>'+mine.length+' order'+(mine.length===1?'':'s')+' · '+monthLabel(R.month)+'</small></div>'+
   '<div class="tile"><div class="l">Cash-Back This Month</div><div class="v">'+rm(sum(mine,'Cashback'))+'</div><small>'+rate+'% of the meal subtotal</small></div>'+
   '<div class="tile pend"><div class="l">Pending Cash-Back</div><div class="v">'+rm(sum(pendAll,'Cashback'))+'</div><small>Across every month, not yet paid</small></div>'+
   '<div class="tile paid"><div class="l">Paid Cash-Back</div><div class="v">'+rm(sum(paidAll,'Cashback'))+'</div><small>Received all time</small></div>'+
  '</div>'+
  '<div class="row" style="margin-top:14px">'+
   (mPaid?'<button class="btn btn-y" type="button" onclick="receipt()">Download Receipt For '+esc(monthLabel(R.month))+'</button>':'<span class="hint" style="margin:0">A receipt is available once '+esc(monthLabel(R.month))+' has been paid out.</span>')+
   (mPaid?'<span class="chip ok">Paid'+(mine[0].PaidAt?' · '+esc(fmtDate(mine[0].PaidAt)):'')+'</span>':'<span class="chip warn">Awaiting payment</span>')+
  '</div>'+
 '</div>';
 h+='<div class="card"><h2>Orders In '+esc(monthLabel(R.month))+'</h2>'+
  (mine.length?'<div class="tblwrap"><table><thead><tr><th>Date</th><th>Order</th><th>Customer</th><th class="r">Meal Subtotal</th><th class="r">Rate</th><th class="r">Your Cash-Back</th><th>Status</th></tr></thead><tbody>'+
   mine.slice().sort(function(a,b){return String(b.Date||'').localeCompare(String(a.Date||''))}).map(function(r){
    return'<tr><td>'+esc(fmtDate(r.Date))+'</td><td>'+esc(r.OrderNo||'')+'</td><td><b>'+esc(r.Customer||'Customer')+'</b>'+(r.CustomerMasked?'<div class="hint" style="margin:0">'+esc(r.CustomerMasked)+'</div>':'')+'</td>'+
     '<td class="r">'+rm(r.Sales)+'</td><td class="r">'+(+r.Rate||0)+'%</td><td class="r"><b>'+rm(r.Cashback)+'</b></td>'+
     '<td><span class="chip '+(isPaid(r.Paid)?'ok':'warn')+'">'+(isPaid(r.Paid)?'Paid':'Pending')+'</span></td></tr>'}).join('')+
   '<tr><td colspan="3"><b>Total</b></td><td class="r"><b>'+rm(sum(mine,'Sales'))+'</b></td><td></td><td class="r"><b>'+rm(sum(mine,'Cashback'))+'</b></td><td></td></tr>'+
   '</tbody></table></div>'
  :'<div class="empty">No orders with your code in '+esc(monthLabel(R.month))+'.</div>')+
  '<div class="hint">Cash-back is worked out on the meal subtotal after any discount. Delivery, packaging and processing fees are never counted. We settle by bank transfer after each month closes.</div>'+
 '</div>';
 h+='<div class="card"><h2>Every Month</h2><div class="tblwrap"><table><thead><tr><th>Month</th><th class="r">Orders</th><th class="r">Sales</th><th class="r">Cash-Back</th><th>Status</th><th></th></tr></thead><tbody>'+
  allMonths().map(function(m){var L=inMonth(m),p=L.length&&L.every(function(r){return isPaid(r.Paid)});
   return'<tr><td>'+esc(monthLabel(m))+'</td><td class="r">'+L.length+'</td><td class="r">'+rm(sum(L,'Sales'))+'</td><td class="r"><b>'+rm(sum(L,'Cashback'))+'</b></td>'+
    '<td><span class="chip '+(p?'ok':'warn')+'">'+(p?'Paid'+(L[0].PaidAt?' · '+esc(fmtDate(L[0].PaidAt)):''):'Pending')+'</span></td>'+
    '<td class="r">'+(p?'<button class="btn btn-o s" type="button" onclick="receipt(\''+m+'\')">Receipt</button>':'')+'</td></tr>'}).join('')+
  '</tbody></table></div></div>';
 box.innerHTML=h}
function allMonths(){var m={};R.rows.forEach(function(r){var s=String(r.Month||'');if(s)m[s]=1});return Object.keys(m).sort().reverse()}
function receipt(mo){mo=mo||R.month;var L=inMonth(mo);if(!L.length)return;
 var name=String(L[0].Referrer||''),code=String(L[0].Code||'').toUpperCase(),rate=+L[0].Rate||0;
 var paidAt=L[0].PaidAt?fmtDate(L[0].PaidAt):'',ref=L[0].PaidRef||'';
 var w=window.open('','_blank');
 if(!w)return alert('Allow pop-ups for this page, then press the receipt button again.');
 var css='*{box-sizing:border-box}body{margin:0;font:13px Montserrat,system-ui,sans-serif;color:#0B0B0B;background:#fff;padding:36px}'+
  '.hd{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;border-bottom:3px solid #16479E;padding-bottom:14px}'+
  'h1{font-size:24px;margin:0 0 4px;letter-spacing:-.02em}.mut{color:#6B7280;font-size:12px}'+
  '.big{font-size:30px;font-weight:800;letter-spacing:-.02em;color:#16479E}'+
  'table{width:100%;border-collapse:collapse;margin-top:20px;font-size:12px}'+
  'th{text-align:left;background:#EDF3FD;color:#16479E;font-size:9.5px;letter-spacing:.07em;text-transform:uppercase;padding:7px 8px;border-bottom:2px solid #CBD9F0}'+
  'td{padding:7px 8px;border-bottom:1px solid #E3E7EE}td.r,th.r{text-align:right}'+
  'tfoot td{font-weight:800;border-top:2px solid #0B0B0B;border-bottom:0}'+
  '.box{margin-top:18px;border:1px solid #E3E7EE;border-radius:10px;padding:14px;background:#F5F8FD}'+
  '.ft{margin-top:26px;color:#6B7280;font-size:11px;border-top:1px solid #E3E7EE;padding-top:12px}'+
  '@media print{body{padding:0}}';
 var html='<!DOCTYPE html><html><head><meta charset="utf-8">'+
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap"></head><body>'+
  '<div class="hd"><div><h1>Cash-Back Receipt</h1><div class="mut">AERA Meal Preparation SDN BHD · 202001037122 ( 1393443-P )<br>35, Jalan Equine 9A, Taman Equine, 43300 Seri Kembangan, Selangor</div></div>'+
  '<div style="text-align:right"><div class="mut">'+esc(monthLabel(mo))+'</div><div class="big">'+rm(sum(L,'Cashback'))+'</div><div class="mut">'+(paidAt?'Paid '+esc(paidAt):'Pending')+(ref?' · Ref '+esc(ref):'')+'</div></div></div>'+
  '<div class="box"><b>'+esc(name)+'</b><div class="mut">Referral Code '+esc(code)+' · '+rate+'% of the meal subtotal · '+L.length+' order'+(L.length===1?'':'s')+' in '+esc(monthLabel(mo))+'</div></div>'+
  '<table><thead><tr><th>Date</th><th>Order</th><th>Customer</th><th class="r">Meal Subtotal</th><th class="r">Rate</th><th class="r">Cash-Back</th></tr></thead><tbody>'+
  L.slice().sort(function(a,b){return String(a.Date||'').localeCompare(String(b.Date||''))}).map(function(r){
   return'<tr><td>'+esc(fmtDate(r.Date))+'</td><td>'+esc(r.OrderNo||'')+'</td><td>'+esc(r.Customer||'Customer')+'</td><td class="r">'+rm(r.Sales)+'</td><td class="r">'+(+r.Rate||0)+'%</td><td class="r">'+rm(r.Cashback)+'</td></tr>'}).join('')+
  '</tbody><tfoot><tr><td colspan="3">Total</td><td class="r">'+rm(sum(L,'Sales'))+'</td><td></td><td class="r">'+rm(sum(L,'Cashback'))+'</td></tr></tfoot></table>'+
  '<div class="ft">Cash-back is worked out on the meal subtotal after any discount. Delivery, packaging and processing fees are not included. Generated '+esc(fmtDate(new Date().toISOString()))+'.</div>'+
  '</body></html>';
 w.document.open();w.document.write(html);w.document.close();
 setTimeout(function(){try{w.focus();w.print()}catch(e){}},600)}
load();

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
"Home":"首页","Order Now":"立即订购","Referrer Portal":"推荐人专区","Terms & Conditions":"条款与细则",
"Your Cash-Back":"您的回扣","Every order placed with your referral code, month by month — what it earned you, and what has been paid.":"每一笔使用您推荐码的订单，按月列出 — 为您赚了多少，以及已经付了多少。","Loading your figures…":"正在载入您的数字…","We could not load your figures just now. Please refresh the page.":"目前无法载入您的数字，请重新整理页面。","Nothing here yet.":"这里还没有内容。","Once someone orders with your referral code, every order shows up here with the cash-back it earned you.":"只要有人使用您的推荐码下单，每一笔订单都会显示在这里，并附上为您赚到的回扣。","Year":"年","Month":"月","Sales This Month":"本月销售额","Cash-Back This Month":"本月回扣","Pending Cash-Back":"待付回扣","Across every month, not yet paid":"所有月份合计，尚未支付","Paid Cash-Back":"已付回扣","Received all time":"历来已收到","Awaiting payment":"等待付款","Date":"日期","Order":"订单","Customer":"顾客","Meal Subtotal":"餐点小计","Rate":"比率","Status":"状态","Total":"合计","Every Month":"所有月份","Orders":"订单数","Sales":"销售额","Cash-Back":"回扣","Receipt":"收据","Cash-Back Receipt":"回扣收据","Normal Referrer":"一般推荐人","Fitness Studio / Gym":"健身工作室 / 健身房","Fitness Influencer":"健身网红","Cashback":"回扣","Pending":"待付","Paid":"已付","Allow pop-ups for this page, then press the receipt button again.":"请允许此页面弹出视窗，然后再按一次收据按钮。","Referrer Portal — AERA Meal Prep":"推荐人专区 — AERA Meal Prep"
});
window.AERA_I18N_RE.push([/^([\d.]+)% of the meal subtotal$/,"餐点小计的 $1%"]);
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
Object.assign(window.AERA_I18N||{},{"Terms & Conditions":"条款与条件","Privacy Notice":"隐私声明"});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
if(window.AERA_I18N)Object.assign(window.AERA_I18N,{"Date":"日期","Order":"订单","Customer":"客户","Meal Subtotal":"餐点小计","Rate":"比例","Your Cash-Back":"您的现金回馈","Status":"状态","Month":"月份","Orders":"订单数","Sales":"销售额","Cash-Back":"现金回馈","Cashback":"现金回馈","Pending":"待付款","Paid":"已付款","Normal Referrer":"一般推荐人","Fitness Studio / Gym":"健身工作室 / 健身房","Fitness Influencer":"健身网红","Allow pop-ups for this page, then press the receipt button again.":"请允许此页面的弹出窗口，然后再按一次收据按钮。","Loading your figures…":"正在载入您的数据…","Referrer Portal":"推荐人入口","Home":"首页","Order Now":"立即订购"});
if(window.AERA_I18N_RE)window.AERA_I18N_RE.push([/^Paid (.+) · Ref (.+)$/,"已付款 $1 · 参考 $2"],
 [/^Paid (.+)$/,"已付款 $1"],
 [/^([\d.]+)% of the meal subtotal · (.+)$/,"餐点小计的 $1% · $2"],
 [/^(\d+) orders?$/,"$1 笔订单"]);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
(function(){
  if(window.__AERA_HOSTMAP) return; window.__AERA_HOSTMAP=1;
  if(/my\.chatbees\.io$/i.test(location.hostname)) return;
  var MAP={"ZQr9fS2jA9":"/","xR3Dfd9n":"/fridge","D2pz8bZ":"/checkout","dtTMaV":"/account","SrQzC5m2":"/meal-plan",
  "DSBcJ9bN4":"/bring-your-own-plan","8s4Xd6h":"/track","VMrvEw":"/merchandise","TVRk6bqam":"/corporate",
  "G7mXL4RMz2":"/terms","xXH4dXALg":"/privacy","B2WjrKhnz":"/contact","DiB2ZadptP":"/thank-you",
  "HkKJuxBS":"/referrer-portal","H9H32i9ShW":"/referrer-signup","ZmQYknnnM":"/points-checkout"};
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
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",function(){fix(document)});
  else fix(document);
  try{ new MutationObserver(function(ms){ for(var i=0;i<ms.length;i++){ var n=ms[i].addedNodes; for(var j=0;j<n.length;j++) if(n[j].nodeType===1) fix(n[j]); } })
    .observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}
})();