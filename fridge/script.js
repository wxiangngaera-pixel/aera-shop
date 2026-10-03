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
(function(){
var SB={url:'https://swpprjvubgcdsojapaad.supabase.co',key:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cHByanZ1YmdjZHNvamFwYWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3ODUxNzIsImV4cCI6MjEwNDM2MTE3Mn0.zBvPkzlV5tYSkWiHnF0HB175QMt-u1tXFmR03urcp_0'};
var SHOP_URL='https://my.chatbees.io/p/ZQr9fS2jA9';
var db=null,ME=null,FRIDGES=[],CUR=null,STOCK=[],STMT=null,BILLS=[],MSGS=[],MEALS=[],MEALIMG={},MENU=[],ORDERL=[],SEL={},QTY={count:{},order:{}};

function $(s){return document.querySelector(s)}
function esc(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function rm(v){v=+v;if(!isFinite(v))v=0;return 'RM '+v.toFixed(2)}
function today(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function days(a,b){return Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/86400000)}
function monthName(ym){if(!ym)return'This Month';var p=String(ym).split('-');
 return ['January','February','March','April','May','June','July','August','September','October','November','December'][+p[1]-1]+' '+p[0]}
function gerr(msg){var e=$('#gerr');if(!msg){e.style.display='none';return}e.textContent=msg;e.style.display='block'}

/* ---- who is signed in ---- */
async function boot(){
 db=window.supabase.createClient(SB.url,SB.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
 var s=await db.auth.getSession();
 if(s.data&&s.data.session)return afterSignIn();
 $('#gate').style.display='block'}
async function signIn(){
 var em=$('#gemail').value.trim(),pw=$('#gpass').value;
 if(!em||!pw)return gerr('Type your email and password.');
 gerr('');$('#gbtn').disabled=true;$('#gbtn').textContent='Signing in…';
 var r=await db.auth.signInWithPassword({email:em,password:pw});
 $('#gbtn').disabled=false;$('#gbtn').textContent='Sign In';
 if(r.error)return gerr(/invalid/i.test(r.error.message)?'That email and password do not match an AERA account.':r.error.message);
 afterSignIn()}
async function resetPass(){
 var em=$('#gemail').value.trim();
 if(!em)return gerr('Type your email first, then press this again.');
 var r=await db.auth.resetPasswordForEmail(em);
 gerr(r.error?r.error.message:'');
 if(!r.error)alert('If that email has an AERA account, a reset link is on its way to it.')}
async function signOut(){await db.auth.signOut();location.reload()}

/* The database decides what this account may see. The page asks first whether the
   account is a fridge merchant at all, so someone who shops with us and signs in here
   by mistake gets told why there is nothing to show. */
async function afterSignIn(){
 var u=await db.auth.getUser();ME=(u.data&&u.data.user)||null;
 var ok=await db.rpc('am_i_a_merchant');
 if(ok.error||!ok.data){
  $('#gate').style.display='block';
  gerr('That account is signed in, but it is not set against a fridge. Ask AERA to put this email on your fridge, then sign in again.');
  $('#out').style.display='block';return}
 $('#gate').style.display='none';$('#app').style.display='block';$('#out').style.display='block';
 var f=await db.from('fridges').select('*').order('name');
 FRIDGES=(f.data)||[];
 if(!FRIDGES.length){$('#fsub').textContent='No fridge on this account yet.';return}
 if(FRIDGES.length>1){
  $('#pickCard').style.display='block';
  $('#pick').innerHTML=FRIDGES.map(function(x){return'<option value="'+esc(x.id)+'">'+esc(x.name)+'</option>'}).join('')}
 pickFridge(FRIDGES[0].id)}

async function pickFridge(id){
 CUR=FRIDGES.filter(function(f){return f.id===id})[0]||FRIDGES[0];
 $('#fname').textContent=CUR.name;
 var ym=today().slice(0,7);
 var a=await db.from('fridge_stock').select('*').eq('fridge_id',CUR.id).gt('qty',0).order('expires');
 STOCK=a.data||[];
 var b=await db.from('fridge_statement').select('*').eq('fridge_id',CUR.id).eq('period',ym).limit(1);
 STMT=(b.data&&b.data[0])||null;
 var c=await db.from('fridge_messages').select('*').eq('fridge_id',CUR.id).order('created_at',{ascending:false}).limit(60);
 MSGS=c.data||[];
 var d=await db.from('fridge_invoices').select('*').eq('fridge_id',CUR.id).order('on_date',{ascending:true});
 BILLS=(d&&d.data)||[];
 MEALS=[];MEALIMG={};var seen={};
 STOCK.forEach(function(r){if(r.image_url&&!MEALIMG[r.meal])MEALIMG[r.meal]=r.image_url;
  if(!seen[r.meal]){seen[r.meal]=1;MEALS.push(r.meal)}});
 MSGS.forEach(function(m){(m.lines||[]).forEach(function(l){if(l&&l.meal&&!seen[l.meal]){seen[l.meal]=1;MEALS.push(l.meal)}})});
 MEALS.sort();
 QTY={count:{},order:{}};SEL={};
 await loadMenu();buildOrderList();
 var e=earliest(),od=$('#odate');
 if(od){od.min=e;od.value=e;
  var mx=new Date(e+'T00:00:00');mx.setDate(mx.getDate()+28);od.max=isoDate(mx)}
 dpWire('odate');
 paintStock();paintLines('order','#olines');
 paintOrderGate();paintBills();paintHist();paintOrders()}

/* ---- the kitchen's schedule ----
   An order is cooked, not picked off a shelf, so it needs notice. The fridge's own
   lead time decides the earliest date this gym can be given, and anything sent after
   the midday cut-off counts as tomorrow's order. The gym never has to work this out. */
function isoDate(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function leadDays(){var n=+((CUR||{}).lead);return isFinite(n)&&n>0?n:4}
function pastCutoff(){var n=new Date();return n.getHours()>12||(n.getHours()===12&&n.getMinutes()>=45)}
function earliest(){var d=new Date();d.setDate(d.getDate()+leadDays()+(pastCutoff()?1:0));return isoDate(d)}
/* the Date boxes read the way AERA writes Dates, with the native picker sitting on top */
var DPZW=['周日','周一','周二','周三','周四','周五','周六'];
function dpFmt(iso){if(!iso)return 'Choose a Date';
 try{var d=new Date(iso+'T00:00:00');
  if(document.documentElement.getAttribute('data-lang')==='zh')
   return d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日 '+DPZW[d.getDay()];
  var wd=d.toLocaleDateString('en-MY',{weekday:'short'}).toUpperCase();
  var mo=d.toLocaleDateString('en-MY',{month:'short'}).toUpperCase().replace('SEPT','SEP');
  var n=d.getDate(),s=(n%10==1&&n%100!=11)?'st':(n%10==2&&n%100!=12)?'nd':(n%10==3&&n%100!=13)?'rd':'th';
  return wd+', '+n+s+' '+mo+' '+d.getFullYear()}catch(e){return iso}}
function dpWire(id){var el=document.getElementById(id),tx=document.getElementById(id+'Txt');
 if(!el||!tx)return;
 function paint(){tx.textContent=dpFmt(el.value);if(window.aeraRetranslate)window.aeraRetranslate()}
 if(!el.__dp){el.__dp=1;el.addEventListener('change',paint);el.addEventListener('input',paint);
  el.addEventListener('click',function(){try{el.showPicker()}catch(e){}})}
 paint()}
function niceDate(s){try{return new Date(s+'T00:00:00').toLocaleDateString('en-MY',
 {weekday:'short',day:'numeric',month:'short'})}catch(e){return s}}

/* ---- how full the fridge is ----
   Boxes already past their date are not stock : they are coming back to us. They are
   left out of the count so a fridge does not look full while it is actually empty. */
function capOf(){var n=+((CUR||{}).cap);return isFinite(n)&&n>0?n:21}
function floorOf(){var n=+((CUR||{}).floor);return isFinite(n)&&n>=0?n:10}
function inFridge(){var t=today(),n=0;
 STOCK.forEach(function(r){if(r.expires&&days(t,r.expires)<0)return;n+=+r.qty||0});return n}
function roomLeft(){return Math.max(0,capOf()-inFridge())}

function paintOrderGate(){
 var box=$('#oremark');if(!box)return;
 var have=inFridge(),room=roomLeft(),fl=floorOf();
 var when='Earliest delivery is <b>'+niceDate(earliest())+'</b> — we need '+leadDays()+
  ' days’ notice'+(pastCutoff()?', and today’s cut-off has passed':'')+'.';
 if(!room){box.className='remark';
  box.innerHTML='Your fridge is full at <b>'+have+' of '+capOf()+' boxes</b>, so there is no room for more just yet. '+
   'Send us a count when some have sold and the order opens again.';return}
 if(have>fl){box.className='remark';
  box.innerHTML='You still have <b>'+have+' boxes</b>. We normally restock at <b>'+fl+
   ' or fewer</b>, so there is no hurry — but if you are expecting a busy week, order anyway and we will fit you in. '+
   'Room for <b>'+room+' more</b>. '+when;return}
 box.className='remark ok';
 box.innerHTML='You are down to <b>'+have+' box'+(have===1?'':'es')+'</b>, at or below your restock level of <b>'+fl+
  '</b> — good time to order. Room for <b>'+room+' more</b>. '+when}

function paintStock(){
 if(!$('#stock'))return;
 var t=today(),total=0,soon=0;
 STOCK.forEach(function(r){total+=+r.qty||0;if(r.expires&&days(t,r.expires)<=2)soon+=+r.qty||0});
 $('#fsub').textContent=total?(total+' Box'+(total===1?'':'es')+' in the Fridge'+(soon?' · '+soon+' at or near its date':'')):'Nothing in the fridge right now';
 var box=$('#stock');
 if(!STOCK.length){box.innerHTML='<div class="empty">Nothing in it at the moment. We will be round.</div>';return}
 box.innerHTML=STOCK.map(function(r,i){
  var d=r.expires?days(t,r.expires):null,tag='';
  if(d!==null&&d<=0)tag='<span class="tag bad">Past its date</span>';
  else if(d!==null&&d<=2)tag='<span class="tag warn">'+d+' day'+(d===1?'':'s')+' left</span>';
  var ph=r.image_url?'<img class="ph" src="'+esc(r.image_url)+'" alt="" loading="lazy">':'<div class="ph"></div>';
  var sel=SEL[i]||0;
  return '<div class="row'+(sel?' sel':'')+'" data-i="'+i+'"><span class="tick">'+(sel?'✓':'')+'</span>'+ph+
   '<div class="nm">'+esc(r.meal)+tag+'</div>'+
   (sel?'<span class="qsel"><button type="button" data-q="-1" data-i="'+i+'">−</button>'+sel+
        '<button type="button" data-q="1" data-i="'+i+'">+</button></span>'
       :'<div class="pill">'+(+r.qty||0)+'</div>')+'</div>'}).join('');
 if(!box.__w){box.__w=1;
  box.addEventListener('click',function(e){
   var q=e.target.closest('button[data-q]');
   if(q){var i=+q.dataset.i,mx=+((STOCK[i]||{}).qty)||0;
    SEL[i]=Math.min(mx,Math.max(0,(SEL[i]||0)+(+q.dataset.q)));
    if(!SEL[i])delete SEL[i];paintStock();return}
   var row=e.target.closest('.row[data-i]');if(!row)return;
   var j=+row.dataset.i;
   if(SEL[j])delete SEL[j];else SEL[j]=1;
   paintStock()})}
 markTally()}

function markTally(){
 var n=0,boxes=0;
 Object.keys(SEL).forEach(function(k){n++;boxes+=SEL[k]});
 var s=$('#bSold'),x=$('#bExp'),h=$('#mhint');
 if(s)s.disabled=!n;
 if(x)x.disabled=!n;
 if(h)h.textContent=n?(boxes+' box'+(boxes===1?'':'es')+' selected.'):'Tick a meal first.'}

/* Sold takes them off the shelf. Expired sends them back to us as a credit. Same two taps. */
async function mark(kind){
 var lines=[],total=0;
 Object.keys(SEL).forEach(function(k){var r=STOCK[+k];if(!r)return;lines.push({meal:r.meal,qty:SEL[k]});total+=SEL[k]});
 if(!total)return;
 var s=$('#bSold'),x=$('#bExp');s.disabled=true;x.disabled=true;
 (kind==='count'?s:x).textContent='Sending…';
 var r=await db.from('fridge_messages').insert({
  fridge_id:CUR.id,kind:kind,on_date:today(),lines:lines,total:total,
  by_name:'',note:'',status:'open',sent_by:(ME&&ME.email)||''});
 s.textContent='Sold';x.textContent='Expired';
 if(r.error){s.disabled=false;x.disabled=false;alert('That did not send: '+r.error.message);return}
 SEL={};pickFridge(CUR.id)}

/* The whole menu, with the ones this fridge has had before at the top. */
function baseName(s){return String(s||'').replace(/\s*\(\s*(FAT LOSS|MASS GAIN)\s*\)\s*$/i,'').trim()}
async function loadMenu(){
 if(MENU.length)return;
 try{var t=await (await fetch(SHOP_URL,{cache:'no-cache'})).text();
  var a=t.indexOf('/*MENU*/'),b=t.indexOf('/*ENDMENU*/');if(a<0||b<a)return;
  var s=t.slice(a,b),o=s.indexOf('['),c=s.lastIndexOf(']');
  MENU=JSON.parse(s.slice(o,c+1)).map(function(r){return{name:r[1],goal:r[2],img:r[8]}})
 }catch(e){MENU=[]}}
function buildOrderList(){
 var past={};MEALS.forEach(function(m){past[baseName(m).toLowerCase()]=1});
 var a=[],b=[],seen={};
 MENU.forEach(function(m){
  var label=m.name+(m.goal==='mass'?' ( MASS GAIN )':' ( FAT LOSS )');
  seen[label]=1;
  (past[String(m.name).toLowerCase()]?a:b).push({label:label,img:m.img})});
 MEALS.forEach(function(m){if(!seen[m])a.push({label:m,img:MEALIMG[m]||''})});
 ORDERL=a.concat(b)}

function paintLines(kind,sel){
 var box=$(sel);if(!box)return;
 if(!ORDERL.length){box.innerHTML='<div class="empty">Loading the menu…</div>';return}
 box.innerHTML=ORDERL.map(function(m,i){
  var ph=m.img?'<img class="ph" src="'+esc(m.img)+'" alt="" loading="lazy">':'<div class="ph"></div>';
  return '<div class="row">'+ph+'<div class="nm">'+esc(m.label)+'</div>'+
   '<div class="step"><button type="button" aria-label="One fewer" data-i="'+i+'" data-d="-1">−</button>'+
   '<input type="number" inputmode="numeric" pattern="[0-9]*" min="0" step="1" value="" placeholder="0" data-i="'+i+'">'+
   '<button type="button" aria-label="One more" data-i="'+i+'" data-d="1">+</button></div></div>'}).join('');
 if(!box.__w){box.__w=1;
  box.addEventListener('click',function(e){
   var b=e.target.closest('button[data-d]');if(!b)return;
   var inp=box.querySelector('input[data-i="'+(+b.dataset.i)+'"]');
   inp.value=Math.max(0,(+inp.value||0)+(+b.dataset.d));if(!+inp.value)inp.value='';
   tally(kind,sel)});
  box.addEventListener('input',function(){tally(kind,sel)})}
 tally(kind,sel)}

function tally(kind,sel){
 var box=$(sel),lines=[],total=0;
 if(!box)return;
 ORDERL.forEach(function(m,i){
  var inp=box.querySelector('input[data-i="'+i+'"]');
  var q=Math.max(0,Math.round(+((inp||{}).value)||0));
  if(q){lines.push({meal:m.label,qty:q});total+=q}});
 QTY[kind]={lines:lines,total:total};
 if(!$('#osend')||!$('#ohint'))return;
 var room=roomLeft();
 if(total>room){$('#osend').disabled=true;
  $('#ohint').textContent='That is '+total+' boxes, but your fridge only has room for '+room+
   ' more before it is full at '+capOf()+'. Take '+(total-room)+' off and we can send it.';return}
 $('#osend').disabled=!total;
 $('#ohint').textContent=total?(total+' box'+(total===1?'':'es')+' to ask for, for delivery on '+niceDate($('#odate').value||earliest())+'.')
  :'Add a number to at least one meal first.'}

async function send(kind){
 var q=QTY[kind]||{};if(!q.total)return;
 var btn=$('#osend');btn.disabled=true;btn.textContent='Sending…';
 var r=await db.from('fridge_messages').insert({
  fridge_id:CUR.id,kind:'order',on_date:$('#odate').value||today(),
  lines:q.lines,total:q.total,by_name:$('#oby').value.trim(),note:$('#onote').value.trim(),
  status:'open',sent_by:(ME&&ME.email)||''});
 btn.textContent='Send The Order';
 if(r.error){btn.disabled=false;alert('That did not send: '+r.error.message);return}
 var card=btn.closest('.card');
 card.innerHTML='<h2>Order More Stock</h2>'+
  '<div class="sent">Thank you — that is with the kitchen. It shows under Bills.</div>';
 pickFridge(CUR.id)}

function showView(v){
 ['Fridge','Refill','Orders','Bills'].forEach(function(k){
  var el=document.getElementById('v'+k),tb=document.getElementById('tb'+k);
  var on=(k.toLowerCase()===v);
  if(el)el.style.display=on?'block':'none';
  if(tb)tb.className='tb'+(on?' on':'')})}

/* ---- what is owed, document by document ----
   A month total tells a gym what to pay but not what for. Every delivery and every
   credit stands on its own line here, in the order they happened, so the figure at the
   bottom can be checked against their own paperwork rather than taken on trust. */
function paintBills(){
 var box=$('#month');if(!box)return;
 $('#mtitle').textContent='Balance Payable To AERA';
 if(!BILLS.length){
  box.innerHTML='<div class="empty">Nothing billed yet. Your first delivery will show here as its own invoice.</div>';
  return}
 var owed=0;
 var rows=BILLS.map(function(b){
  var cr=b.kind==='refund',amt=+b.amount||0;
  var paid=String(b.status||'').toLowerCase()==='paid';
  if(!paid)owed+=cr?-amt:amt;
  return '<tr'+(paid?' class="billpaid"':'')+'><td><span class="no">'+esc(b.id)+'</span>'+(paid?' <span class="tag ok">Paid</span>':' <span class="tag y">Unpaid</span>')+
   '<small>'+niceDate(String(b.on_date).slice(0,10))+(b.note?' · '+esc(b.note):'')+'</small></td>'+
   '<td class="r">'+(+b.boxes||0)+'</td>'+
   '<td class="r'+(cr?' cr':'')+'">'+(cr?'− ':'')+rm(amt)+'</td>'+
   '<td class="r"><button class="dl" onclick="dlBill(\''+esc(b.id)+'\')">Download</button></td></tr>'}).join('');
 box.innerHTML='<div style="overflow-x:auto"><table class="bt">'+
  '<thead><tr><th>Document</th><th class="r">Boxes</th><th class="r">Amount</th><th class="r"></th></tr></thead>'+
  '<tbody>'+rows+
  '<tr class="tot"><td>Total Payable</td><td class="r"></td><td class="r">'+rm(owed)+'</td><td></td></tr>'+
  '</tbody></table></div>'+
  '<p class="hint" style="margin:12px 0 0">Invoices add up, Credit Notes come off. Every Box delivered is invoiced in full. Anything that does not sell, whether it comes back to us or is thrown away past its date is credited back on a separate Credit Note.</p>';
 if(STMT)box.insertAdjacentHTML('beforeend',
  '<p class="hint" style="margin:6px 0 0">'+monthName(STMT.period)+' so far : '+
  (+STMT.delivered||0)+' Delivered, '+(+STMT.returned||0)+' came back.</p>')}

/* A gym asked to pay wants the bill on paper. The page writes one, opens it in its own
   window and lets the browser save or print it — nothing to install, nothing to email. */
function dlBill(id){
 var b=BILLS.filter(function(x){return x.id===id})[0];if(!b)return;
 var cr=b.kind==='refund',amt=+b.amount||0;
 var lines=(b.lines&&b.lines.length)?b.lines:null;
 var body=lines?lines.map(function(l){
   return '<tr><td>'+esc(l.meal)+'</td><td class="r">'+(+l.qty||0)+'</td>'+
    '<td class="r">'+rm(l.cost!=null?l.cost:0)+'</td>'+
    '<td class="r">'+rm((+l.qty||0)*(+(l.cost!=null?l.cost:0)))+'</td></tr>'}).join('')
  : '<tr><td>'+esc(b.note||(cr?'Boxes returned':'Boxes delivered'))+'</td><td class="r">'+(+b.boxes||0)+
    '</td><td class="r"></td><td class="r">'+rm(amt)+'</td></tr>';
 var doc='<!DOCTYPE html><html><head><meta charset="utf-8">'+
  '<sty'+'le>body{font:13px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#0B1C36;margin:32px;max-width:720px}'+
  'h1{font-size:19px;margin:0 0 2px;letter-spacing:-.01em}.sub{color:#5A6B87;font-size:12px;margin:0 0 22px}'+
  '.hd{display:flex;justify-content:space-between;gap:24px;margin-bottom:22px;flex-wrap:wrap}'+
  '.hd div{font-size:12px}.hd b{display:block;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#5A6B87;margin-bottom:3px}'+
  'table{width:100%;border-collapse:collapse;margin-top:8px}'+
  'th{text-align:left;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#5A6B87;border-bottom:1px solid #CBD6E8;padding:0 8px 6px 0}'+
  'td{padding:8px 8px 8px 0;border-bottom:1px solid #E3E9F3}.r{text-align:right;padding-right:0}'+
  'tr.t td{font-weight:800;font-size:15px;border-bottom:0;padding-top:12px}'+
  '.ft{margin-top:26px;color:#5A6B87;font-size:11.5px;line-height:1.6}'+
  '@media print{body{margin:0}}</sty'+'le></head><body>'+
  '<h1>AERA Meal Preparation SDN BHD</h1>'+
  '<p class="sub">'+(cr?'Credit Note':'Invoice')+' · gym fridge, sale or return</p>'+
  '<div class="hd">'+
   '<div><b>'+(cr?'Credit Note No':'Invoice No')+'</b>'+esc(b.id)+'</div>'+
   '<div><b>Date</b>'+niceDate(String(b.on_date).slice(0,10))+'</div>'+
   '<div><b>Fridge</b>'+esc((CUR&&CUR.name)||'')+'</div>'+
   '<div><b>Billed To</b>'+esc((CUR&&CUR.partner)||(CUR&&CUR.name)||'')+'</div></div>'+
  '<table><thead><tr><th>Item</th><th class="r">Boxes</th><th class="r">Each</th><th class="r">Amount</th></tr></thead>'+
  '<tbody>'+body+
  '<tr class="t"><td>'+(cr?'Total Credited':'Total Due')+'</td><td class="r">'+(+b.boxes||0)+'</td><td></td><td class="r">'+rm(amt)+'</td></tr>'+
  '</tbody></table>'+
  '<p class="ft">'+(cr?'These boxes did not sell, whether they came back to us or were thrown away past their date. They were invoiced in full and are credited back here at cost.'
   :'Boxes are charged at cost plus AERA’s agreed share of the profit. Anything that does not sell is credited in full on a separate credit note, whether it comes back to us or is thrown away past its date.')+
  '<br>Queries: reply on the merchant portal and the kitchen will see it.</p>'+
  '</body></html>';
 var w=window.open('','_blank');
 if(!w){alert('Your browser blocked the window. Allow pop-ups for this page and try again.');return}
 w.document.write(doc);w.document.close();w.document.title=b.id}

function mealPic(n){
 if(MEALIMG[n])return MEALIMG[n];
 var b=baseName(n).toLowerCase();
 for(var i=0;i<MENU.length;i++){if(String(MENU[i].name).toLowerCase()===b)return MENU[i].img||''}
 return ''}
function paintOrders(){
 var box=$('#ohist');if(!box)return;
 var rows=MSGS.filter(function(m){return m.kind==='order'});
 if(!rows.length){box.innerHTML='<div class="empty">No orders yet. Ask for your first restock under Order More.</div>';return}
 box.innerHTML=rows.map(function(m){
  var tag=m.status==='done'?'<span class="tag warn">Delivered</span>':'<span class="tag">With the kitchen</span>';
  var lines=(m.lines||[]).map(function(l){
   var u=mealPic(l.meal||'');
   var ph=u?'<img class="ph sm" src="'+esc(u)+'" alt="" loading="lazy">':'<div class="ph sm"></div>';
   return '<div class="ohline">'+ph+'<div class="nm">'+esc(l.meal||'')+'</div>'+
    '<b class="ohq">\u00d7'+esc(l.qty)+'</b></div>'}).join('');
  var meta=[m.by_name,m.note].filter(Boolean).map(esc).join(' \u00b7 ');
  return '<div class="ohcard">'+
   '<div class="ohtop"><b>Asked for '+esc(niceDate(String(m.on_date||'').slice(0,10)))+'</b>'+tag+
    '<span class="pill">'+(+m.total||0)+'</span></div>'+
   '<div class="ohlines">'+(lines||'<div class="hint">\u2014</div>')+'</div>'+
   (meta?'<div class="ohmeta">'+meta+'</div>':'')+
   '</div>'}).join('')}

function paintHist(){
 var rows=MSGS.filter(function(m){return m.kind!=='order'});
 if(!rows.length){$('#hist').innerHTML='<div class="empty">Nothing marked off yet.</div>';return}
 $('#hist').innerHTML=rows.map(function(m){
  var ls=(m.lines||[]).map(function(l){return esc(l.meal)+' ×'+esc(l.qty)}).join(', ');
  var word=(m.kind==='expired'?'Expired':'Sold');
  return '<div class="row"><div class="nm">'+word+' · '+esc(m.on_date||'')+
   (m.status==='done'?' <span class="tag warn">Done</span>':'')+
   '<small>'+(ls||'—')+(m.by_name?' · '+esc(m.by_name):'')+'</small></div>'+
   '<div class="pill">'+(+m.total||0)+'</div></div>'}).join('')}

window.signIn=signIn;window.signOut=signOut;window.resetPass=resetPass;window.pickFridge=pickFridge;window.send=send;window.dlBill=dlBill;
window.mark=mark;window.showView=showView;window.paintOrders=paintOrders;
$('#gpass').addEventListener('keydown',function(e){if(e.key==='Enter')signIn()});
boot();
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
Object.assign(window.AERA_I18N,{"Referral Portal":"推荐人入口","AERA Meal Prep":"AERA 备餐","AERA Fridge — Merchant Portal":"AERA 冰箱 — 商户入口","Fridge Merchant Portal":"冰箱商户入口","Your Fridge":"您的冰箱","Sign in to see what is in it.":"登录后即可查看里面有什么。","Sign out":"登出","Sign In":"登录","Use the same email and password as the AERA website. If you shop with us, that account already works here.":"使用与 AERA 网站相同的电邮和密码。若您有在我们这里下单，那个账户在这里就能用。","No account yet?":"还没有账户？","Create one on the AERA website":"到 AERA 网站注册一个","with the email we have on file for your gym, then come back and sign in.":"请用我们记录中您健身房的电邮注册，然后回来登录。","Email":"电邮","Password":"密码","I have forgotten my password":"我忘记密码了","Which Fridge":"哪一台冰箱","In Your Fridge Now":"目前冰箱里的餐点","Loading…":"载入中…","Tell Us What Sold":"告诉我们卖出了什么","Counted By":"清点人","Date":"日期","Anything We Should Know":"有什么需要我们知道的","Send To AERA":"发送给 AERA","Add a number to at least one meal first.":"请先为至少一款餐点填上数量。","Order More Stock":"补货下单","Checking your fridge…":"正在检查您的冰箱…","This is a request, not a Delivery. We confirm it and bring it. You are only billed for what actually arrives.":"这是一份请求，不是配送 — 我们确认后才送过去。只有实际送达的部分才会计费。","Your Name":"您的姓名","Delivery Date":"配送日期","Anything Else":"其他事项","Send The Order":"送出订单","Balance Payable To AERA":"应付 AERA 的余额","What You Have Sent Us":"您传给我们的记录","Anything wrong on this page, tell us and we will fix it at our end.":"这个页面若有任何不对，告诉我们，我们会在后台修正。","This Month":"本月","Type your email and password.":"请输入电邮和密码。","That email and password do not match an AERA account.":"这个电邮和密码与任何 AERA 账户都不相符。","Type your email first, then press this again.":"请先输入电邮，然后再按一次。","If that email has an AERA account, a reset link is on its way to it.":"若这个电邮有 AERA 账户，重设链接已寄出。","That account is signed in, but it is not set against a fridge. Ask AERA to put this email on your fridge, then sign in again.":"这个账户已登录，但尚未绑定任何冰箱。请联系 AERA 将这个电邮绑定到您的冰箱，然后重新登录。","Send us a count when some have sold and the order opens again.":"卖出一些之后传一份清点给我们，补货就会重新开放。","Nothing in the fridge right now":"冰箱现在是空的","No date on file":"没有日期记录","Boxes returned":"退回的餐盒","Boxes delivered":"送达的餐盒","Credit Note":"贷记单","Credit Note No":"贷记单号","Invoice No":"发票号码","Total Credited":"贷记总额","Total Due":"应付总额","These boxes did not sell, whether they came back to us or were thrown away past their date. They were invoiced in full and are credited back here at cost.":"这些餐盒未售出 — 不论是退回给我们，还是过期后丢弃。已全额开票，并在此按成本贷记退还。","Your browser blocked the window. Allow pop-ups for this page and try again.":"浏览器拦截了弹出窗口。请允许此页面的弹出窗口后再试一次。","Front desk":"前台","Your website password":"您的网站密码","Fridge was switched off overnight…":"冰箱昨晚被关掉了…","More Fat Loss than Mass Gain this week…":"这周减脂餐要比增肌餐多一些…"});
window.AERA_I18N_RE.push([/^(\d+) in the fridge$/,"冰箱里有 $1 份"],[/^Best before (.+)$/,"最佳食用期限 $1"]);
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
/* EN / 中文 toggle */
(function(){function boot(){if(document.getElementById("langSw"))return;
 var z=false;try{z=(localStorage.getItem("aera_lang")||"en")==="zh"}catch(e){}
 var d=document.createElement("div");d.id="langSw";
 d.style.cssText="position:fixed;top:12px;right:12px;z-index:9999;display:flex;border:1px solid #d7dde8;border-radius:999px;overflow:hidden;background:#fff;font:600 12px/1 system-ui,-apple-system,sans-serif;box-shadow:0 2px 10px rgba(11,36,80,.14)";
 d.innerHTML='<button type="button" style="padding:8px 13px;border:0;cursor:pointer;font:inherit;background:'+(z?"#fff":"#16479E")+';color:'+(z?"#16479E":"#fff")+'">EN</button>'+
  '<button type="button" style="padding:8px 13px;border:0;cursor:pointer;font:inherit;background:'+(z?"#16479E":"#fff")+';color:'+(z?"#fff":"#16479E")+'">中文</button>';
 var bs=d.querySelectorAll("button");
 bs[0].onclick=function(){if(z&&window.aeraLang)window.aeraLang()};
 bs[1].onclick=function(){if(!z&&window.aeraLang)window.aeraLang()};
 document.body.appendChild(d)}
 if(document.readyState==="loading")addEventListener("DOMContentLoaded",boot);else boot()})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
if(window.AERA_I18N)Object.assign(window.AERA_I18N,{"Delivered":"已送达","Credited":"已贷记","Invoiced":"已开票","boxes":"盒","box":"盒","before credits":"扣除贷记前","credited to you":"贷记给您","Sending…":"发送中…","Out of date":"已过期","Document":"单据","Boxes":"盒数","Amount":"金额","Item":"项目","Each":"单价","Count":"清点","Request":"补货请求","No fridge on this account yet.":"这个账户还没有绑定冰箱。","Nothing yet":"目前还没有记录","Nothing to show yet.":"目前还没有内容。"});
if(window.AERA_I18N_RE)window.AERA_I18N_RE.unshift(
 [/^(\d+) Boxe?s? in the Fridge · (\d+) at or near its date$/,"冰箱里有 $1 盒 · $2 盒接近有效期"],
 [/^(\d+) Boxe?s? in the Fridge$/,"冰箱里有 $1 盒"],
 [/^Best before (.+) · RM ([\d,.]+) at your counter$/,"最佳食用期限 $1 · 柜台售价 RM $2"],
 [/^No date on file · RM ([\d,.]+) at your counter$/,"没有日期记录 · 柜台售价 RM $1"],
 [/^(\d+) days? left$/,"剩 $1 天"],
 [/^(\d+) days’ notice$/,"需提前 $1 天"],
 [/^(\d+) boxe?s?$/,"$1 盒"]
);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
(function(){var D=window.AERA_I18N;if(!D)return;
var P=[
["Pan Seared Spicy Chicken Breast","香煎香辣鸡胸"],["Baked Spicy Chicken Breast","烤香辣鸡胸"],["Pan Seared Indian Curry Chicken Breast","香煎印度咖喱鸡胸"],["Baked Indian Curry Chicken Breast","烤印度咖喱鸡胸"],["Pan Seared Smoked Paprika Chicken Breast","香煎烟熏红椒粉鸡胸"],["Baked Smoked Paprika Chicken Breast","烤烟熏红椒粉鸡胸"],["Pan Seared Salt & Pepper Chicken Breast","香煎椒盐鸡胸"],["Baked Salt & Pepper Chicken Breast","烤椒盐鸡胸"],["Pan Seared Onion Garlic Chicken Breast","香煎蒜香洋葱鸡胸"],["Baked Onion Garlic Chicken Breast","烤蒜香洋葱鸡胸"],["Pan Seared Ginger Garlic Chicken Breast","香煎姜蒜鸡胸"],["Baked Ginger Garlic Chicken Breast","烤姜蒜鸡胸"],["Tandoori Chicken","印度烤鸡"],["Chicken Katsu","日式炸鸡扒"],["Grilled Teriyaki Chicken Breast","照烧烤鸡胸"],["Grilled Teriyaki Chicken Chop","照烧烤鸡扒"],["Grilled Chicken Chop","烤鸡扒"],["Chicken Breast Meatball","鸡胸肉丸"],
["Pan Seared Salmon","香煎三文鱼"],["Baked Salmon","烤三文鱼"],["Pan Seared Barramundi Fillet","香煎金目鲈鱼柳"],["Baked Barramundi Fillet","烤金目鲈鱼柳"],["Pan Seared Toman Fish Sliced","香煎多曼鱼片"],["Baked Toman Fish Sliced","烤多曼鱼片"],["Pan Seared Halibut","香煎比目鱼"],["Baked Halibut","烤比目鱼"],["Pan Seared Salmon Cubes","香煎三文鱼粒"],["Baked Salmon Cubes","烤三文鱼粒"],["Pan Seared Tiger Prawn","香煎大虎虾"],["Baked Tiger Prawn","烤大虎虾"],["Stir Fried Vannamei Prawn","炒白虾"],["Vannamei Prawn ( Oil-Free )","白虾（无油）"],["Sautéed Beef Sliced","煎炒牛肉片"],
["Stir Fried Ground Chicken Breast ( Plain )","炒鸡胸肉碎（原味）"],["Bolognese Chicken Breast","肉酱鸡胸肉碎"],["Stir Fried Ground Chicken Breast w/ Mushroom Gravy","炒鸡胸肉碎配蘑菇酱"],["Stir Fried Ground Chicken Breast w/ Black Pepper Sauce","炒鸡胸肉碎配黑胡椒酱"],["Stir Fried Kung Pao Chicken Breast","宫保鸡胸"],["Stir Fried Kung Pao Chicken Thigh","宫保鸡腿肉"],["Stir Fried Kung Pao Toman Fish Sliced","宫保多曼鱼片"],["Sweet & Sour Chicken Breast","咕佬鸡胸"],["Sweet & Sour Chicken Thigh","咕佬鸡腿肉"],["Gingered Spring Onion Chicken Sliced","姜葱鸡肉片"],["Gingered Spring Onion Toman Fish Sliced","姜葱多曼鱼片"],["Gingered Spring Onion Beef Sliced","姜葱牛肉片"],["Gam Hiong Chicken Breast","甘香鸡胸"],["Gam Hiong Chicken Thigh","甘香鸡腿肉"],["Curry Chicken Sliced","咖喱鸡肉片"],["Green Curry Chicken Sliced","青咖喱鸡肉片"],["Soy Garlic Chicken Sliced","蒜香酱油鸡肉片"],["Soy Garlic Beef Sliced","蒜香酱油牛肉片"],["Pad Krapow Chicken Breast","泰式九层塔鸡胸肉沫"],["Black Pepper Chicken Sliced","黑胡椒鸡肉片"],["Black Pepper Beef Sliced","黑胡椒牛肉片"],["Classic Meal Prep Chicken Sliced","经典备餐鸡肉片"],["Stir Fried Mushroom Chicken Casserole","冬菇焖鸡片"],["Imitation Salted Egg Yolk Chicken Breast","仿咸蛋黄鸡胸"],["Imitation Salted Egg Yolk Chicken Thigh","仿咸蛋黄鸡腿肉"],["Imitation Salted Egg Yolk Tiger Prawn","仿咸蛋黄大虎虾"],["Black Pepper Toman Fish Sliced","黑胡椒多曼鱼片"],
["Brown Rice","糙米饭"],["Basmati Long Rice","印度香米饭"],["Fragrant White Rice","香白米饭"],["Pearl Rice","珍珠米饭"],["Classic Meal Prep Brown Rice","经典备餐糙米饭"],["Spiced Long Rice","香料长米饭"],["Egg Fried Brown Rice","蛋炒糙米饭"],["Quinoa Fried Rice","藜麦炒饭"],["Cauliflower Fried Rice","花椰菜炒饭"],["Aglio Olio","蒜香橄榄油意面"],["Bolognese","番茄肉酱意面"],["Creamy Mushroom Pasta","蘑菇酱意面"],["Black Pepper Pasta","黑胡椒意面"],["Imitation Salted Egg Yolk Pasta","仿咸蛋黄意面"],["Carbonara","奶油培根意面"],["Pesto Fusilli","青酱螺旋面"],["Cajun Spiced Fusilli","卡真香料螺旋面"],["Assam Fettuccine","亚参宽面"],["Baked Potato","烤马铃薯"],["Baked Potato ( Oil-Free )","烤马铃薯（无油）"],["Baked Sweet Potato ( Orange )","烤黄心番薯"],["Baked Sweet Potato ( Orange ) [ Oil-Free ]","烤黄心番薯（无油）"],["Baked Sweet Potato ( Purple )","烤紫心番薯"],["Garlic Mashed Potato","蒜香薯泥"],["Garlic Toast","蒜香吐司"],
["Sweated Broccoli","清炒西兰花"],["Sweated Broccoli ( Oil-Free )","清炒西兰花（无油）"],["Sweated Cauliflower","清炒花椰菜"],["Sweated Cauliflower ( Oil-Free )","清炒花椰菜（无油）"],["Stir Fried Sweet Pea","炒甜豆"],["Stir Fried Sweet Pea ( Oil-Free )","炒甜豆（无油）"],["Stir Fried French Bean","炒四季豆"],["Stir Fried French Bean ( Oil-Free )","炒四季豆（无油）"],["Sweated Carrot","清炒胡萝卜"],["Sweated Carrot ( Oil-Free )","清炒胡萝卜（无油）"],["Baked Eggplant","烤茄子"],["Stir Fried Broccoli Stem","炒西兰花梗"],["Stir Fried Broccoli Stem ( Oil-Free )","炒西兰花梗（无油）"],["Asperges","芦笋"],["Asperges ( Oil-Free )","芦笋（无油）"],["Stir Fried Kangkung w/ Sambal Belacan","参巴峇拉煎炒空心菜"],["Stir Fried Kangkung w/ Garlic","蒜炒空心菜"],["Stir Fried Cabbage","炒包菜"],
["Baked Smoked Chicken Breast","烤烟熏鸡胸"],["Pan Seared King Mushroom","香煎杏鲍菇"],["Sweated Corn","清炒玉米粒"],["Peas & Corn","青豆玉米"],["Japanese Curry Garnishes","日式咖喱配菜"],["Baked Tofu","烤豆腐"],["Baked Tofu ( Oil-Free )","烤豆腐（无油）"],
["Brown Sauce","黑酱"],["Black Pepper Sauce","黑胡椒酱"],["Curry Gravy","咖喱酱"],["Green Curry Gravy","青咖喱酱"],["Japanese Curry Gravy","日式咖喱酱"],["Mushroom Gravy","蘑菇酱"],["Homemade Sambal","自制参巴"],["Gam Hiong Gravy","甘香酱"],["Sweet & Sour Sauce","酸甜酱"],["Gingered Spring Onion Gravy","姜葱酱"],["Pesto Sauce","青酱"],["Imitation Salted Egg Yolk Gravy","仿咸蛋黄酱"],["Assam Sauce","亚参酱"],["Cajun Spiced Gravy","卡真香料酱"],["Carbonara Sauce","奶油培根酱"],["Tomato Concasse","番茄肉酱"],
["Classic Meal Prep Chicken Sliced & Homemade Sambal","经典备餐鸡肉片配自制参巴"],["Garlic Mashed Potato with Grilled Chicken Chop & Brown Sauce","蒜香薯泥配烤鸡扒与黑酱"],["Grilled Teriyaki Chicken Breast & Sweet & Sour Sauce","照烧烤鸡胸配酸甜酱"],["Japanese Curry Chicken Katsu with Rice","日式咖喱炸鸡扒饭"],["Pan Seared Barramundi Fillet with Homemade Sambal","香煎金目鲈鱼柳配自制参巴"],["Pan Seared Salmon with Mushroom Gravy","香煎三文鱼配蘑菇酱"],["Pan Seared Smoked Paprika Chicken Breast & Tomato Concasse","香煎烟熏红椒粉鸡胸配番茄肉酱"],["Pan Seared Spicy Chicken Breast with Pesto Sauce","香煎香辣鸡胸配青酱"]
];
if(document.documentElement.getAttribute("data-lang")==="zh"){var st=document.createElement("style");st.textContent=".nm{white-space:pre-line}";(document.head||document.documentElement).appendChild(st)}
for(var i=0;i<P.length;i++){var en=P[i][0],zh=P[i][1];D[en]=zh+"\n"+en;
 D[en+" ( FAT LOSS )"]=zh+"\n"+en+"（减脂）";
 D[en+" ( MASS GAIN )"]=zh+"\n"+en+"（增肌）"}
Object.assign(D,{
"Past its date":"已过最佳食用期",
"Nothing in it at the moment. We will be round.":"目前冰箱是空的，我们会尽快补货。",
"Nothing in the fridge right now":"目前冰箱里没有餐点",
"Count what has gone since you last told us. It keeps our stock figure honest and tells us which meals to bring more of. Money is settled on the delivery, so nothing here changes your bill.":"清点自上次通报后卖出的数量。这能让库存数字保持准确，也让我们知道该多送哪几款餐点。货款在配送时结算，这里填写的内容不会改动您的账单。",
"Invoices add up, Credit Notes come off. Every Box delivered is invoiced in full. Anything that does not sell, whether it comes back to us or is thrown away past its date is credited back on a separate Credit Note.":"发票累加，贷记单扣减。送达的餐盒一律全额开票；凡是未售出的 — 不论是退回给我们，还是过期后丢弃 — 都会另开贷记单退还。",
"Your own record of every count and every order you have sent from this page, newest first. It is here so you can see the kitchen received it, and so you can check what you asked for last time before you ask again.":"您从本页面传送过的每一次清点与每一笔订单记录，最新的排在最前。放在这里，方便您确认厨房已收到，也方便您在再次下单前查看上次要了什么。",
"Nothing sent yet.":"尚未传送任何记录。","Choose a Date":"选择日期",
"My Fridge":"我的冰箱","Order More":"补货","Bills":"账单","Order History":"订单记录","Sold And Expired":"已售出与已过期","Sold":"已售出","Expired":"已过期",
"Every restock you have asked us for, newest first. Check what you asked for last time before you ask again.":"您向我们提出的每一次补货请求，最新的排在最前。再次下单前可先看看上次要了什么。",
"Everything you have marked off the Fridge, newest first.":"您从冰箱扣除的所有记录，最新的排在最前。",
"No orders yet. Ask for your first restock under Order More.":"还没有订单。到「补货」提出第一次补货请求。",
"Nothing marked off yet.":"还没有任何扣除记录。","Paid":"已付款","Unpaid":"未付款",
"Delivered":"已送达","With the kitchen":"厨房处理中",
"Tick a meal first.":"请先勾选餐点。",
"Tick the Meals, then press Sold or Expired. Nothing else to fill in.":"勾选餐点，然后按「已售出」或「已过期」。其他都不用填。",
"Loading the menu…":"正在载入菜单…",
"Thank you — that is with the kitchen. It shows under Bills.":"谢谢 — 已送到厨房，可在「账单」里查看。",
"Document":"单据",
"Boxes":"盒数",
"Amount":"金额",
"Total Payable":"应付总额",
"Download":"下载",
"You are down to":"目前只剩",
", at or below your restock level of":"，已达到或低于您的补货标准",
"— good time to order. Room for":"— 是时候下单了。还可存放",
". Earliest delivery is":"。最早可送达",
"You still have":"您还有",
". We normally restock at":"。我们通常在",
", so there is no hurry — but if you are expecting a busy week, order anyway and we will fit you in. Room for":"，所以不急 — 但若您预计下周较忙，仍可下单，我们会安排。还可存放",
"Your fridge is full at":"您的冰箱已满",
", so there is no room for more just yet. Send us a count when some have sold and the order opens again.":"，暂时没有空位。卖出一些后传给我们清点数量，下单功能就会重新开放。"
});
var R=window.AERA_I18N_RE;if(R)R.push(
[/^— we need (\d+) days’ notice, and today’s cut-off has passed\.$/,"— 我们需要 $1 天备货时间，今天的截单时间已过。"],
[/^— we need (\d+) days’ notice\.$/,"— 我们需要 $1 天备货时间。"],
[/^(\d+) of (\d+) boxes?$/,"$1 \/ $2 盒"],
[/^(\d+) boxes?$/,"$1 盒"],
[/^(\d+) more$/,"$1 盒"],
[/^(\d+) or fewer$/,"$1 盒或以下"],
[/^(\d+) days? left$/,"还剩 $1 天"],
[/^(\d+) boxe?s? selected\.$/,"已选 $1 盒。"],
[/^Asked for (.+)$/,"申请日期 $1"],
[/Delivered (\d+) boxes?/,"已送达 $1 盒"],
[/Carried over from aeramealprep\.net/,"由 aeramealprep.net 转入"],
[/^(.+) so far : (\d+) Delivered, (\d+) came back\.$/,"$1 已送达 $2 盒，退回 $3 盒。"],
[/^Ordered · (.+)$/,"已下单 · $1"],
[/^Sold · (.+)$/,"已售出 · $1"],
[/^(.+) \( FAT LOSS \)$/,"$1（减脂）"],
[/^(.+) \( MASS GAIN \)$/,"$1（增肌）"]
);
if(window.aeraRetranslate)window.aeraRetranslate();
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