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
'use strict';
var CAT_URL='https://my.chatbees.io/p/FaMS3PtRe';
var PLAN_URL='https://my.chatbees.io/p/SrQzC5m2';
var KEY='aera.coach';
var MENU=[],BYCODE={},READY=false;
var ST={clients:[],sel:null},DAY=0,PICK=null;

function $(s){return document.querySelector(s)}
function esc(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;')
 .replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function rm(v){return 'RM '+(Math.round((+v||0)*100)/100).toFixed(2)}
function uid(){return 'c'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function say(cls,html){$('#msg').innerHTML=html?'<div class="note '+cls+'">'+html+'</div>':''}

/* ---- our kitchen list ----
   Read from the catalogue the plan editor itself uses, so a dish picked here is a dish that
   page already knows and the handover needs no translating. */
fetch(CAT_URL,{cache:'no-cache'}).then(function(r){return r.text()}).then(function(t){
 var a=t.indexOf('/*CAT*/'),b=t.indexOf('/*ENDCAT*/');if(a<0||b<a)throw 0;
 var d=JSON.parse(t.slice(a+7,b)),L='pcvgs';
 MENU=(d.r||[]).map(function(v,i){var o={};(d.k||[]).forEach(function(k,j){o[k]=v[j]});
  var nm=o.n[1];(d.t||[]).forEach(function(x){nm=nm.split(x[0]).join(x[1])});
  var im=(d.i&&d.i[o.img])||null;
  return{code:o.c,name:(d.n[o.n[0]]||'')+nm,cat:L.charAt(o.cat),
   img:im?((d.p[im[0]]||'')+im[1]+(im[2]||'.jpg')):'',
   sq:(d.q&&d.q[i])||100,kcal:+o.kcal||0,p:+o.p||0,c:+o.cb||0,f:+o.f||0,pr:+o.pr||0,
   po:(d.o&&d.o[o.po])||[50,300,25]}});
 BYCODE={};MENU.forEach(function(x){BYCODE[x.code]=x});
 READY=true;paint()})
.catch(function(){say('bad','<b>We could not load the kitchen list.</b> Refresh the page — if it '+
 'keeps happening, something on this network is blocking my.chatbees.io.')});

function per(r,g){var k=(+g||0)/(r.sq||100);
 return{kcal:r.kcal*k,p:r.p*k,c:r.c*k,f:r.f*k,price:r.pr*k}}
/* A box costs more than the food in it. These are the same two figures the plan editor
   charges, and leaving them out here had the coach quoting about RM 9 light on a five-box
   plan — a number their client would then see go up. */
var PACK_PER_BOX=1.80, EXTRA_COMP=0.50;
function boxExtras(items){var p=0,v=0;
 items.forEach(function(it){var r=BYCODE[it.code];if(!r)return;
  if(r.cat==='p')p++;else if(r.cat==='v')v++});
 return Math.max(0,p-1)+Math.max(0,v-1)}
/* A box is food plus a bento plus a compartment for each extra protein or vegetable. It is
   worked out once, here, and both the breakdown line and the total are read off it — so the
   numbers on screen can never drift apart from each other. */
function mealCost(items){
 var food=0,any=false;
 items.forEach(function(it){var r=BYCODE[it.code];if(!r)return;any=true;
  food+=per(r,rawOf(it).g).price});
 if(!any)return{any:false,food:0,pack:0,extras:0,extraCost:0,total:0};
 var ex=boxExtras(items);
 var r2=function(v){return Math.round(v*100)/100};
 return{any:true,food:r2(food),pack:PACK_PER_BOX,extras:ex,extraCost:r2(ex*EXTRA_COMP),
  total:r2(food+PACK_PER_BOX+ex*EXTRA_COMP)}}
function mealPrice(items){return mealCost(items).total}
function mfootHtml(items){
 var c=mealCost(items);
 if(!c.any)return '';
 return '<div class="mfoot"><span>Food '+rm(c.food)+'</span>'+
  '<span class="pk">Bento box '+rm(c.pack)+'</span>'+
  (c.extras?'<span class="pk">'+c.extras+' extra packaging '+rm(c.extraCost)+'</span>':'')+
  '<b>'+rm(c.total)+'</b></div>'}
function clampG(r,g){var st=r.po[2]||25;g=Math.round((+g||0)/st)*st;
 return Math.max(r.po[0],Math.min(r.po[1],g))}
/* Toast is counted, not weighed: a slice is 10 g, so 40 g is four slices. Coaches think in
   slices, and a weight box that only says "40 g" makes them do the division themselves. */
function unitOf(r){return (r&&r.sq&&r.sq<=10&&/toast|bread/i.test(r.name||''))
 ? {g:r.sq,one:'slice',many:'slices'} : null}
function unitStr(r,g){var u=unitOf(r);if(!u)return '';
 var n=Math.round((+g||0)/u.g);if(!n)return '';
 return n+' '+(n===1?u.one:u.many)}

/* ---- cooked to raw, exactly as the kitchen works ----
   A dish picked from the list tells us what it is, so the conversion is not a guess. Anything
   with no rule falls through at 1:1 and says so on the row rather than pretending. */
var RICE={'basmati long rice':2.90,'fragrant white rice':2.10,'brown rice':2.50,'pearl rice':2.00};
function riceF(n){if(/classic meal prep brown rice|spiced long rice/.test(n))return 0;
 var best=0,len=-1;for(var k in RICE){if(n.indexOf(k)>=0&&k.length>len){best=RICE[k];len=k.length}}
 return best}
function conv(r,g){
 g=+g||0;
 if(cur().basis==='raw')return{g:g,why:'raw, as you entered it',ok:true};
 var n=r.name.toLowerCase();
 if(r.cat==='c'){var f=riceF(n);
  if(f)return{g:g/f,why:'rice, divided by '+f.toFixed(2),ok:true};
  return{g:g,why:'no cooked rule yet, we weigh it',ok:false}}
 if(r.cat==='p'||(r.cat==='g'&&/chicken|beef|tofu|prawn|fish|salmon/.test(n)))
  return{g:g*1.5,why:'protein, times 1.5',ok:true};
 if(r.cat==='v'||(r.cat==='g'&&/corn|pea|mushroom|cabbage/.test(n))){
  if(/broccoli/.test(n))return{g:g,why:'broccoli, no change',ok:true};
  return{g:g+25,why:'vegetable, plus 25 g',ok:true}}
 return{g:g,why:'no cooked rule yet, we weigh it',ok:false}}
/* What the kitchen would actually weigh: converted, then held inside that dish's portion range. */
function rawOf(it){var r=BYCODE[it.code];if(!r)return{g:+it.g||0,why:'',ok:true,own:true};
 var entered=+it.g||0,c=conv(r,entered),g=clampG(r,c.g);
 /* The figure on the right is what the kitchen weighs, and it is often not the number the
    coach typed — we cook in 25 g steps between a smallest and a largest portion. Saying
    "as you entered it" beside a number they did not enter is the sort of small lie that
    makes somebody stop trusting every other figure on the page. */
 var why=c.why;
 if(g!==entered){
  if(g===r.po[1]&&c.g>r.po[1])why='the most we cook in one box';
  else if(g===r.po[0]&&c.g<r.po[0])why='the least we cook in one box';
  else if(cur().basis==='raw')why='rounded to our '+(r.po[2]||25)+' g steps';
  else why=c.why+', rounded to '+(r.po[2]||25)+' g';}
 return{g:g,why:why,ok:c.ok}}

/* ---- state ---- */
function load(){try{var d=JSON.parse(localStorage.getItem(KEY)||'null');
 if(d&&d.clients&&d.clients.length)ST=d}catch(e){}
 if(!ST.clients.length)ST.clients=[blank('Client 1')];
 if(typeof ST.coach!=='string')ST.coach='';
 if(!ST.sel||!byId(ST.sel))ST.sel=ST.clients[0].id}
function save(){try{localStorage.setItem(KEY,JSON.stringify(ST))}catch(e){
 say('bad','<b>This browser will not let us save.</b> Your work is still on screen, but it will '+
  'be lost if you close the tab — copy the sheet before you do.')}}
function blank(n){return{id:uid(),name:n,email:'',phone:'',basis:'raw',
 days:[{name:'Monday',meals:[{name:'Breakfast',items:[]}]}]}}
function byId(id){return ST.clients.filter(function(c){return c.id===id})[0]}
function cur(){return byId(ST.sel)||ST.clients[0]}
/* Undo keeps a short stack of whole-plan snapshots. Anything that changes the plan calls
   mark() first, so one press puts back exactly what was there — including a day or a meal
   deleted by mistake, which is the thing people actually want undone. */
var HIST=[],HMAX=40;
function mark(){try{HIST.push(JSON.stringify({st:ST,day:DAY}));
 if(HIST.length>HMAX)HIST.shift()}catch(e){}}
function undo(){
 var prev=HIST.pop();if(!prev)return false;
 try{var o=JSON.parse(prev);ST=o.st;DAY=o.day}catch(e){return false}
 save();paint();return true}
function day(){var c=cur();if(DAY>=c.days.length)DAY=c.days.length-1;if(DAY<0)DAY=0;return c.days[DAY]}

/* ---- painting ---- */
function paint(){
 var c=cur();
 $('#clientTabs').innerHTML=ST.clients.map(function(x){
  return '<button class="tab'+(x.id===c.id?' on':'')+'" type="button" data-c="'+x.id+'">'+
   esc(x.name||'Unnamed')+'<small>'+boxCount(x)+' box'+(boxCount(x)===1?'':'es')+
   '</small></button>'}).join('')+
  '<button class="tab" type="button" data-new="1">+ New client</button>'+
  (ST.clients.length>1?'<button class="x" type="button" data-del="1" aria-label="Remove this client">&times;</button>':'');
 $('#cname').value=c.name||'';$('#cemail').value=c.email||'';$('#cphone').value=c.phone||'';
 if($('#coachname').value!==ST.coach)$('#coachname').value=ST.coach||'';
 [].forEach.call($('#basisSeg').querySelectorAll('button'),function(b){
  b.classList.toggle('on',b.dataset.b===c.basis)});

 /* Days are numbered by where they sit, not by a name picked when they were made. Deleting
    the middle of Mon/Tue/Wed used to leave the next day you added called Tuesday and sitting
    at the end, so the plan read Monday, Wednesday, Tuesday. It cannot now. A name you type
    yourself is kept and shown instead. */
 $('#dayTabs').innerHTML=c.days.map(function(d,i){
  return '<span class="daytab'+(i===DAY?' on':'')+'">'+
   '<button type="button" data-d="'+i+'">'+esc(dayLabel(d,i))+
    '<small>'+mealsOf(d)+'</small></button>'+
   (c.days.length>1?'<button class="dx" type="button" data-delday="'+i+'" title="Remove this day" '+
    'aria-label="Remove '+esc(dayLabel(d,i))+'">&times;</button>':'')+'</span>'}).join('')+
  '<button class="tab" type="button" data-addday="1">+ Add day</button>'+
  '<button class="tab" type="button" data-copyday="1">Duplicate this day</button>';

 var d=day(),h='';
 h+='<label class="lb" for="dayname">Day name</label>'+
  '<input type="text" id="dayname" value="'+esc(d.name||'')+'" placeholder="'+esc(DOW[DAY%7])+
  '" style="max-width:260px;margin-bottom:14px">';
 if(!d.meals.length)h+='<div class="empty">No meals yet.</div>';
 d.meals.forEach(function(m,mi){
  var t={kcal:0,p:0,c:0,f:0,price:0};
  t.price=mealPrice(m.items);
  var rows=m.items.map(function(it,ii){
   var r=BYCODE[it.code],rw=rawOf(it);
   if(r){var x=per(r,rw.g);t.kcal+=x.kcal;t.p+=x.p;t.c+=x.c;t.f+=x.f}
   var nm=r?esc(r.name):esc(it.own||'')+'<em>home-sourced</em>';
   var us=r?unitStr(r,rw.g):'';
   var sub=r?(rw.g+' g raw'+(us?' ( '+us+' )':'')+(rw.why?' — '+esc(rw.why):''))
            :'home-sourced — not cooked by us';
   var step=r?(r.po[2]||25):5;
   return '<div class="row" data-m="'+mi+'" data-i="'+ii+'">'+
    '<button class="grip" type="button" aria-label="Drag to reorder" title="Drag to reorder">'+
    '<span></span><span></span><span></span></button>'+thumb(r)+
    '<div class="nm">'+nm+'<small>'+sub+'</small></div>'+
    '<div class="wcell"><input type="number" min="0" step="'+(r?(r.po[2]||25):5)+'" value="'+(+it.g||0)+'" aria-label="weight in grams, '+cur().basis+'">'+
     '<small>'+cur().basis+' g</small></div>'+
    '<div class="pr">'+(r?rm(per(r,rw.g).price):'&mdash;')+
     '<small>'+(r?Math.round(per(r,rw.g).kcal)+' kcal':'not ours')+'</small></div>'+
    '<button class="x" type="button" data-rm="1" aria-label="Remove">&times;</button></div>'}).join('');
  h+='<div class="meal"><div class="mh">'+
   mealSelect(m,mi)+
   '<span class="mac">'+Math.round(t.kcal)+' kcal · P '+Math.round(t.p)+' · C '+Math.round(t.c)+
    ' · F '+Math.round(t.f)+'<br>'+rm(t.price)+'</span>'+
   '<button class="x" type="button" data-delmeal="'+mi+'" aria-label="Remove this meal">&times;</button>'+
   '</div><div class="rows">'+(rows||'<div class="empty">Nothing in this meal yet.</div>')+'</div>'+
   mfootHtml(m.items)+
   '<div class="addrow">'+
    '<button class="btn o s" type="button" data-add="'+mi+'">+ Add a dish</button>'+
    '<button class="btn o s" type="button" data-own="'+mi+'">+ Client&rsquo;s Home-Sourced Meal</button>'+
   '</div></div>'});
 h+='<button class="btn o s" type="button" id="addMeal">+ Add a meal</button>';
 $('#dayPanel').innerHTML=h;

 var dt=dayTotals(d);
 $('#dayTot').innerHTML=
  tile('Calories',Math.round(dt.kcal))+tile('Protein',Math.round(dt.p)+' g')+
  tile('Carbs',Math.round(dt.c)+' g')+tile('Day price',rm(dt.price));

 var n=boxCount(c),days=c.days.filter(function(x){return cooked(x).length}).length;
 $('#finishSum').textContent=n?(n+' box'+(n===1?'':'es')+' across '+days+' day'+(days===1?'':'s')+
  ' · '+rm(planPrice(c))):'Nothing to send yet';
 ['#doOpen','#doSend','#doSheet'].forEach(function(s){$(s).disabled=!n});
}
function tile(l,v){return '<div class="tile"><div class="l">'+l+'</div><div class="v">'+v+'</div></div>'}
function thumb(r){return r&&r.img
 ? '<div class="thumb" role="img" aria-label="'+esc(r.name)+'" style="background-image:url('+esc(r.img)+')"></div>'
 : '<div class="thumb none" aria-hidden="true">+</div>'}
function mealsOf(d){var n=d.meals.length;return n+' meal'+(n===1?'':'s')}
function cooked(d){return d.meals.filter(function(m){
 return m.items.some(function(it){return it.code&&BYCODE[it.code]})})}
function boxCount(c){var n=0;c.days.forEach(function(d){n+=cooked(d).length});return n}
function dayTotals(d){var t={kcal:0,p:0,c:0,f:0,price:0};
 d.meals.forEach(function(m){t.price+=mealPrice(m.items);
  m.items.forEach(function(it){var r=BYCODE[it.code];if(!r)return;
   var x=per(r,rawOf(it).g);t.kcal+=x.kcal;t.p+=x.p;t.c+=x.c;t.f+=x.f})});
 t.price=Math.round(t.price*100)/100;return t}
function planPrice(c){var s=0;c.days.forEach(function(d){s+=dayTotals(d).price});return s}

/* ---- events ---- */
$('#clientTabs').addEventListener('click',function(e){
 var b=e.target.closest('button');if(!b)return;
 if(b.dataset.new){var c=blank('Client '+(ST.clients.length+1));ST.clients.push(c);ST.sel=c.id;DAY=0}
 else if(b.dataset.del){
  if(ST.clients.length<2)return;
  /* Two taps rather than a browser confirm box: those are ugly on a phone and, on some
     screens, appear somewhere the coach is not even looking. */
  if(b.dataset.armed!=='1'){
   b.dataset.armed='1';b.textContent='Remove?';b.style.color='var(--bad)';
   setTimeout(function(){if(b.isConnected){b.dataset.armed='';b.innerHTML='&times;';b.style.color=''}},4000);
   return}
  var c2=cur();
  ST.clients=ST.clients.filter(function(x){return x.id!==c2.id});ST.sel=ST.clients[0].id;DAY=0}
 else if(b.dataset.c){ST.sel=b.dataset.c;DAY=0}
 else return;
 save();paint()});
$('#coachname').addEventListener('input',function(){ST.coach=this.value;save()});
['cname','cemail','cphone'].forEach(function(id){
 $('#'+id).addEventListener('input',function(){
  var c=cur();c[id.slice(1)==='name'?'name':id.slice(1)]=this.value;save();
  if(id==='cname')paint()})});
$('#basisSeg').addEventListener('click',function(e){
 var b=e.target.closest('button[data-b]');if(!b||b.dataset.b===cur().basis)return;
 mark();cur().basis=b.dataset.b;save();paint()});

$('#dayTabs').addEventListener('click',function(e){
 var b=e.target.closest('button');if(!b)return;var c=cur();
 if(b.dataset.addday){mark();c.days.push({name:'',meals:[{name:'Breakfast',items:[]}]});DAY=c.days.length-1}
 else if(b.dataset.copyday){mark();var src=day();
  c.days.splice(DAY+1,0,JSON.parse(JSON.stringify({name:'',meals:src.meals})));DAY=DAY+1}
 else if(b.dataset.delday!=null){
  /* Every day carries its own cross, so a day can go without being opened first. */
  if(c.days.length<2)return;mark();
  var i=+b.dataset.delday;c.days.splice(i,1);
  if(DAY>i||DAY>=c.days.length)DAY=Math.max(0,DAY-1)}
 else if(b.dataset.d!=null)DAY=+b.dataset.d;
 else return;
 save();paint()});
var DOW=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
function dayLabel(d,i){return (d.name&&d.name.trim())||DOW[i%7]}

$('#dayPanel').addEventListener('click',function(e){
 var b=e.target.closest('button');if(!b)return;var d=day();
 if(b.id==='addMeal'){mark();d.meals.push({name:nextMeal(d),items:[]})}
 else if(b.dataset.add!=null){openPick(+b.dataset.add);return}
 else if(b.dataset.own!=null){openPick(+b.dataset.own,true);return}
 else if(b.dataset.delmeal!=null){mark();d.meals.splice(+b.dataset.delmeal,1)}
 else if(b.dataset.rm){mark();var row=b.closest('.row');
  d.meals[+row.dataset.m].items.splice(+row.dataset.i,1)}
 else return;
 save();paint()});
$('#dayPanel').addEventListener('change',function(e){
 var t=e.target;
 if(t.dataset.mname!=null){mark();day().meals[+t.dataset.mname].name=t.value;save();return}});
$('#dayPanel').addEventListener('input',function(e){
 var t=e.target,d=day();
 if(t.id==='dayname'){d.name=t.value;save();
  var tab=$('#dayTabs').querySelector('button[data-d="'+DAY+'"]');
  if(tab)tab.childNodes[0].nodeValue=dayLabel(d,DAY);return}

 var row=t.closest('.row');
 if(row&&t.type==='number'){
  var it=d.meals[+row.dataset.m].items[+row.dataset.i];
  it.g=Math.max(0,+t.value||0);save();
  var r=BYCODE[it.code];
  if(r){var rw=rawOf(it),x=per(r,rw.g);
   var us2=unitStr(r,rw.g);
   row.querySelector('.nm small').textContent=rw.g+' g raw'+(us2?' ( '+us2+' )':'')+
    (rw.why?' — '+rw.why:'');
   row.querySelector('.pr').innerHTML=rm(x.price)+'<small>'+Math.round(x.kcal)+' kcal</small>'}
  refreshTotals()}});
/* Typing in a weight box must not repaint the page — that would take the cursor with it — so
   every figure that depends on the weight is refreshed in place instead. */
function refreshTotals(){
 var c=cur(),d=day(),dt=dayTotals(d);
 d.meals.forEach(function(m,mi){
  var t={kcal:0,p:0,c:0,f:0,price:0};
  t.price=mealPrice(m.items);
  m.items.forEach(function(it){var r=BYCODE[it.code];if(!r)return;
   var x=per(r,rawOf(it).g);t.kcal+=x.kcal;t.p+=x.p;t.c+=x.c;t.f+=x.f});
  var el=$('#dayPanel').querySelectorAll('.meal')[mi];
  if(el){var mf=el.querySelector('.mfoot');
   if(mf)mf.outerHTML=mfootHtml(m.items)||'<div class="mfoot" hidden></div>'}
  if(el)el.querySelector('.mac').innerHTML=Math.round(t.kcal)+' kcal · P '+Math.round(t.p)+
   ' · C '+Math.round(t.c)+' · F '+Math.round(t.f)+'<br>'+rm(t.price)});
 $('#dayTot').innerHTML=tile('Calories',Math.round(dt.kcal))+tile('Protein',Math.round(dt.p)+' g')+
  tile('Carbs',Math.round(dt.c)+' g')+tile('Day price',rm(dt.price));
 var n=boxCount(c),days=c.days.filter(function(x){return cooked(x).length}).length;
 $('#finishSum').textContent=n?(n+' box'+(n===1?'':'es')+' across '+days+' day'+(days===1?'':'s')+
  ' · '+rm(planPrice(c))):'Nothing to send yet'}
/* A meal is one of a known set, so it is chosen rather than typed. Anything already on a
   plan that is not in the list stays as its own option, so no existing plan loses its
   wording just because we tidied the choices. */
var MEALS=['Breakfast','Morning Snack','Lunch','Afternoon Snack','Pre Workout',
 'Post Workout','Dinner','Supper'];
function mealSelect(m,mi){
 var cur=m.name||'',list=MEALS.slice();
 if(cur&&list.indexOf(cur)<0)list.unshift(cur);
 return '<select class="msel" data-mname="'+mi+'" aria-label="Meal">'+
  list.map(function(n){return '<option'+(n===cur?' selected':'')+'>'+esc(n)+'</option>'}).join('')+
  '</select>'}
function nextMeal(d){var used={};d.meals.forEach(function(m){used[m.name]=1});
 for(var i=0;i<MEALS.length;i++)if(!used[MEALS[i]])return MEALS[i];
 return MEALS[0]}

/* ---- moving an item within its meal ---- */
(function(){
 var from=null,fromMeal=null,ghost=null;
 function rowsIn(mi){return [].slice.call($('#dayPanel')
  .querySelectorAll('.row[data-m="'+mi+'"]'))}
 /* A finger rarely lands exactly on a row — it strays into the gap, or past the last one.
    Rather than doing nothing, take the row whose middle is nearest. */
 function rowAt(x,y){
  var el=document.elementFromPoint(x,y);
  var row=el&&el.closest?el.closest('.row'):null;
  if(row&&+row.dataset.m===fromMeal)return row;
  var best=null,dist=1e9;
  rowsIn(fromMeal).forEach(function(r){
   var b=r.getBoundingClientRect(),d=Math.abs((b.top+b.bottom)/2-y);
   if(d<dist){dist=d;best=r}});
  return best}
 document.addEventListener('pointerdown',function(e){
  var g=e.target.closest('.grip');if(!g)return;
  var row=g.closest('.row');if(!row)return;
  e.preventDefault();
  from=+row.dataset.i;fromMeal=+row.dataset.m;ghost=row;
  row.classList.add('dragging');
  g.setPointerCapture&&g.setPointerCapture(e.pointerId)});
 document.addEventListener('pointermove',function(e){
  if(from==null)return;
  var row=rowAt(e.clientX,e.clientY);
  rowsIn(fromMeal).forEach(function(r){r.classList.remove('over')});
  if(row&&+row.dataset.i!==from)row.classList.add('over')});
 document.addEventListener('pointerup',function(e){
  if(from==null)return;
  var row=rowAt(e.clientX,e.clientY);
  var to=row?+row.dataset.i:null;
  rowsIn(fromMeal).forEach(function(r){r.classList.remove('over');r.classList.remove('dragging')});
  if(ghost)ghost.classList.remove('dragging');
  if(to!=null&&to!==from){
   mark();
   var items=day().meals[fromMeal].items;
   var moved=items.splice(from,1)[0];
   items.splice(to,0,moved);
   save();paint()}
  from=null;fromMeal=null;ghost=null});
})();

/* ---- the dish search ----
   Names alone are not how a coach thinks, so the query is widened before it is matched: "fish"
   finds the barramundi, "lean" sorts by fat, "no oil" finds the oil-free versions. It runs on
   the list already in the page, so it answers as fast as they can type. */
var SYN={fish:['salmon','barramundi','toman','halibut','fish'],seafood:['salmon','barramundi','toman','halibut','prawn'],
 veg:['sweated','stir fried','broccoli','cauliflower','carrot','bean','pea','kangkung','eggplant','asperges','cabbage','corn'],
 vegetables:['sweated','stir fried','broccoli','cauliflower','carrot','bean','pea','asperges','cabbage','corn'],
 greens:['broccoli','kangkung','bean','pea','asperges'],
 carb:['rice','pasta','potato','toast'],carbs:['rice','pasta','potato','toast'],
 protein:['chicken','beef','salmon','prawn','toman','halibut','barramundi','tofu'],
 rice:['rice'],noodle:['pasta','fusilli','fettuccine'],noodles:['pasta','fusilli','fettuccine'],
 spicy:['spicy','kung pao','curry','pad krapow','sambal','black pepper','cajun'],
 asparagus:['asperges'],eggplant:['eggplant'],aubergine:['eggplant'],
 potato:['potato'],sweetpotato:['sweet potato'],prawns:['prawn'],shrimp:['prawn']};
var CATQ={p:['protein','meat'],c:['carb','carbs','starch'],v:['veg','vegetable','vegetables','greens'],
 s:['sauce','gravy'],g:['garnish','side']};
function nrm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()}
function search(q){
 var n=nrm(q);
 if(!n)return MENU.slice(0,24);
 var lean=/\b(lean|low fat|lowfat|light)\b/.test(n);
 var hip=/\b(high protein|most protein|highest protein)\b/.test(n);
 var nooil=/\b(no oil|oil free|oilfree|without oil)\b/.test(n);
 var words=n.split(' ').filter(Boolean);
 var terms=[];
 words.forEach(function(w){
  terms.push(w);
  (SYN[w]||[]).forEach(function(s){terms.push(s)})});
 var catWanted='';
 Object.keys(CATQ).forEach(function(k){if(CATQ[k].some(function(w){return words.indexOf(w)>=0}))catWanted=k});
 var out=MENU.map(function(r){
  var name=nrm(r.name),sc=0;
  terms.forEach(function(t){
   if(!t||t.length<2)return;
   if(name===t)sc+=60;
   else if(name.indexOf(' '+t)>=0||name.indexOf(t+' ')>=0||name.indexOf(t)===0)sc+=22;
   else if(name.indexOf(t)>=0)sc+=12});
  if(catWanted&&r.cat===catWanted)sc+=18;
  if(nooil)sc+=/oil free/.test(name)?26:-14;
  if(sc<=0)return null;
  if(lean)sc+=Math.max(0,28-r.f)*1.6;
  if(hip)sc+=r.p*1.6;
  return{r:r,sc:sc}}).filter(Boolean)
  .sort(function(a,b){return b.sc-a.sc}).slice(0,30).map(function(x){return x.r});
 return out}
function paintRes(){
 var q=$('#q').value,list=search(q);
 if(!list.length){$('#res').innerHTML='<div class="none">Nothing of ours matches that. '+
  'If the client sources it at home, close this and use <b>Client&rsquo;s Home-Sourced Meal</b> instead.</div>';return}
 $('#res').innerHTML=list.map(function(r){
  var g=r.po[0],x=per(r,g);
  var u=unitOf(r);
  var range=u?(Math.round(r.po[0]/u.g)+'–'+Math.round(r.po[1]/u.g)+' '+u.many)
             :(g+'–'+r.po[1]+' g');
  return '<button type="button" data-code="'+r.code+'">'+thumb(r)+
   '<span><b>'+esc(r.name)+'</b><small>'+range+' · '+Math.round(x.kcal)+' kcal · P '+
   (Math.round(x.p*10)/10)+' · '+rm(x.price)+' at '+(u?unitStr(r,g):g+' g')+
   '</small></span></button>'}).join('')}
/* Asking for a home-sourced meal used to leave our whole kitchen list sitting underneath,
   which is the opposite of what that button is for. The pop-up now shows one or the other. */
function openPick(mi,own){
 PICK=mi;$('#q').value='';$('#ownq').value='';
 $('#scrim').querySelector('.pop').classList.toggle('ownonly',!!own);
 $('#popTitle').textContent=own?'Client’s home-sourced meal':'Add a dish';
 if(!own)paintRes();
 $('#scrim').classList.add('open');
 setTimeout(function(){$(own?'#ownq':'#q').focus()},30)}
function addOwn(){
 var nm=$('#ownq').value.trim();if(!nm||PICK==null)return;
 mark();day().meals[PICK].items.push({own:nm,g:0});
 save();closePick();paint()}
$('#ownAdd').addEventListener('click',addOwn);
$('#ownq').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();addOwn()}});
function closePick(){$('#scrim').classList.remove('open');PICK=null}
$('#popClose').addEventListener('click',closePick);
$('#scrim').addEventListener('click',function(e){if(e.target===this)closePick()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&PICK!=null)closePick()});
$('#q').addEventListener('input',paintRes);
$('#res').addEventListener('click',function(e){
 var b=e.target.closest('button[data-code]');if(b==null||PICK==null)return;
 var r=BYCODE[b.dataset.code];if(!r)return;
 /* Seed at the smallest portion the kitchen cooks, in whichever basis the coach is working in,
    so the number in the box is one they can sensibly edit rather than one we invented. */
 var g=r.po[0];
 if(cur().basis==='cooked'){var c2=conv(r,g);if(c2.ok&&c2.g)g=Math.round(g*g/c2.g)}
 mark();day().meals[PICK].items.push({code:r.code,g:g});
 save();closePick();paint()});
$('#chips').innerHTML=[['Chicken','chicken'],['Fish','fish'],['Beef','beef'],['Rice','rice'],
 ['Pasta','pasta'],['Potato','potato'],['Vegetables','veg'],['Oil-free','no oil'],
 ['High protein','high protein'],['Lean','lean']]
 .map(function(c){return '<button class="chip" type="button" data-q="'+esc(c[1])+'">'+c[0]+'</button>'}).join('');
$('#chips').addEventListener('click',function(e){var b=e.target.closest('button[data-q]');if(!b)return;
 $('#q').value=b.dataset.q;paintRes();$('#q').focus()});

/* ---- what comes out ---- */
function phoneOut(v){var d=String(v||'').replace(/[^0-9+]/g,'');
 if(!d)return '';if(d.charAt(0)==='+')return d;
 if(d.indexOf('60')===0&&d.length>=11)return '+'+d;
 if(d.charAt(0)==='0')return '+60'+d.slice(1);return '+60'+d}
function pad(s,n){s=String(s);while(s.length<n)s+=' ';return s}
/* Column width comes from the longest dish in the plan, not a guess, so "Pan Seared Ginger
   Garlic Chicken Breast" cannot shove its weight out of line. */
function nameWidth(c){var w=22;
 c.days.forEach(function(d){d.meals.forEach(function(m){m.items.forEach(function(it){
  var r=BYCODE[it.code],n=(r?r.name:(it.own||'')).length;if(n>w)w=n})})});
 return w+2}
function sheetText(){
 var c=cur(),L=['AERA MEAL PLAN','',
  'Client:   '+(c.name||''),
  'Email:    '+(c.email||''),
  'Mobile:   '+phoneOut(c.phone),
  'Coach:    '+(ST.coach||''),
  'Weights:  '+(c.basis==='raw'?'RAW':'COOKED'),
  'Covers:   '+c.days.length+' day'+(c.days.length===1?'':'s'),''];
 var W=nameWidth(c);
 c.days.forEach(function(d){
  L.push(String(d.name||'Day').toUpperCase());
  d.meals.forEach(function(m){
   if(!m.items.length)return;
   L.push('  '+(m.name||'Meal'));
   m.items.forEach(function(it){var r=BYCODE[it.code];
    var u=r?unitStr(r,+it.g||0):'';
    L.push('    '+pad(r?r.name:(it.own||''),W)+String(+it.g||0).padStart(5)+' g'+
     (u?'  ( '+u+' )':''))})});
  L.push('')});
 return L.join('\n')}
function draft(){
 var c=cur(),meals=[],off=[],dayN=0,mpd=0,names=[];
 c.days.forEach(function(d){
  var pending=[];
  d.meals.forEach(function(m){
   var comps=[];
   m.items.forEach(function(it){
    var r=BYCODE[it.code];
    if(!r){if(it.own)off.push({day:d.name||'',meal:m.name||'',food:it.own,g:+it.g||0});return}
    comps.push({r:it.code,g:rawOf(it).g})});
   if(comps.length)pending.push(comps)});
  if(!pending.length)return;
  dayN++;names.push(d.name||('Day '+dayN));
  pending.forEach(function(cs,i){
   var t={kcal:0,p:0,c:0,f:0};
   cs.forEach(function(cp){var r=BYCODE[cp.r];if(!r)return;var x=per(r,cp.g);
    t.kcal+=x.kcal;t.p+=x.p;t.c+=x.c;t.f+=x.f});
   /* Kept unrounded. Rounding a 6.5 g protein target to 7 made the editor mark a plain
      toast breakfast 7% under a target it was in fact exactly on. */
   meals.push({day:dayN,slot:i+1,comps:cs,t:t})});
  if(pending.length>mpd)mpd=pending.length});
 if(!meals.length)return null;
 var tot={kcal:0,p:0,c:0,f:0};
 meals.forEach(function(m){tot.kcal+=m.t.kcal;tot.p+=m.t.p;tot.c+=m.t.c;tot.f+=m.t.f});
 var nd=Math.max(1,dayN);
 return{off:off,plan:{
  id:'PL-'+Date.now().toString(36).toUpperCase()+Math.random().toString(36).slice(2,5).toUpperCase(),
  days:nd,mpd:mpd,meals:meals,byop:1,src:'coach',dayNames:names,
  targets:{kcal:Math.round(tot.kcal/nd),p:Math.round(tot.p/nd),
           c:Math.round(tot.c/nd),f:Math.round(tot.f/nd)},
  q:{days:nd,mpd:mpd,total:mpd,plan:'macros'}}}}

$('#doOpen').addEventListener('click',function(){
 var d=draft();if(!d)return say('bad','There are no AERA dishes in this plan yet.');
 try{
  localStorage.setItem('aera.planDraft',JSON.stringify({q:d.plan.q,plan:d.plan,step:4}));
  localStorage.setItem('aera.byop',JSON.stringify({off:d.off,basis:cur().basis,at:Date.now(),
   coach:1,client:cur().name||''}))}
 catch(e){return say('bad','This browser will not let us hand the plan over. Copy the sheet instead.')}
 location.href=PLAN_URL});

$('#doUndo').addEventListener('click',function(){
 if(!undo())say('','Nothing left to undo.');else say('','')});
/* The plan is written to this browser on every change already. The button exists because
   autosaving invisibly is not the same as a coach knowing their work is safe. */
$('#doSave').addEventListener('click',function(){
 save();
 var t=new Date();
 say('ok','<b>Saved on this device.</b> You can close the tab and pick '+
  esc(cur().name||'this plan')+' up later &mdash; it was saved at '+
  t.getHours().toString().padStart(2,'0')+':'+t.getMinutes().toString().padStart(2,'0')+'.')});
$('#doSheet').addEventListener('click',function(){
 $('#sheet').textContent=sheetText();
 $('#outCard').style.display='block';
 $('#outCard').scrollIntoView({behavior:'smooth',block:'start'})});
$('#hideSheet').addEventListener('click',function(){$('#outCard').style.display='none'});
$('#copySheet').addEventListener('click',function(){
 var t=sheetText(),btn=this;
 var done=function(){btn.textContent='Copied';setTimeout(function(){btn.textContent='Copy the sheet'},1800)};
 if(navigator.clipboard&&navigator.clipboard.writeText)
  navigator.clipboard.writeText(t).then(done).catch(function(){sel()});
 else sel();
 function sel(){var r=document.createRange();r.selectNodeContents($('#sheet'));
  var s=window.getSelection();s.removeAllRanges();s.addRange(r);
  btn.textContent='Select and copy';setTimeout(function(){btn.textContent='Copy the sheet'},2200)}});

/* ---- getting it to the kitchen ----
   This page deliberately carries no endpoint of its own: an address written into a public
   page is an address anyone can read and post to. The platform's own form-webhook setting
   turned out not to reach a hand-built form — tested, it posts the page back to itself — so
   rather than have a button that says "Sent" when nothing was sent, the plan goes the way
   that demonstrably works: onto the clipboard, and into the upload page that already talks
   to the kitchen. One paste, and the sheet is in our format so the reading is exact. */
var BYOP_URL='https://my.chatbees.io/p/DSBcJ9bN4';
$('#doSend').addEventListener('click',function(){
 var c=cur(),d=draft();
 if(!d)return say('bad','There are no AERA dishes in this plan yet.');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email||''))
  return say('bad','<b>We need the client&rsquo;s email.</b> That is where we come back with the price.');
 var t=sheetText();
 $('#sheet').textContent=t;$('#outCard').style.display='block';
 /* The link is theirs to click. Opening it ourselves either lands behind a popup blocker or
    takes the page away before they have read what to do with it. */
 var how='<ol style="margin:8px 0 0;padding-left:20px">'+
  '<li>Open our upload page.</li>'+
  '<li>Paste the plan into the box and set the weights switch to <b>'+
   (c.basis==='raw'?'Raw':'Cooked')+'</b>, to match the sheet.</li>'+
  '<li>Press <b>Read My Plan</b>, then fill in '+esc(c.name||'your client')+
   '&rsquo;s details and send it.</li></ol>'+
  '<p style="margin:10px 0 0"><a class="btn o s" href="'+BYOP_URL+'" target="_blank" '+
   'rel="noopener">Open the upload page</a></p>';
 var done=function(ok){
  say('ok',(ok?'<b>Plan copied to your clipboard.</b>':
   '<b>Your plan is in the box below</b> &mdash; copy it first.')+how)};
 if(navigator.clipboard&&navigator.clipboard.writeText)
  navigator.clipboard.writeText(t).then(function(){done(true)}).catch(function(){done(false)});
 else done(false);
 $('#msg').scrollIntoView({behavior:'smooth',block:'center'})});

load();paint();
})();

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

Object.assign(window.AERA_I18N,{"Coach Plan Builder — AERA Meal Prep":"教练餐单编排 — AERA Meal Prep","Coach Plan Builder":"教练餐单编排","Write the plan straight into our kitchen list":"直接用我们的厨房菜单写出餐单","Client":"客户","Your name, and your gym":"您的姓名与所属健身房","Working from a handwritten or printed sheet instead? Our":"手上是手写或打印的餐单？我们的","photo reader":"拍照读取工具","will read it out for you — photograph the sheet, check what it read, and it goes straight to our kitchen. This page is for building a plan from our dish list.":"可以帮您读出来 — 拍下那张表，确认读取结果，就会直接送到我们厨房。这个页面是用我们的菜色清单来编排餐单。","Client name":"客户姓名","Client email":"客户电邮","Client mobile":"客户手机号码","The weights you enter are":"您输入的重量是","Raw":"生重","Cooked":"熟重","Our kitchen weighs raw. Pick Cooked if that is how you write, and we convert every line ourselves — you will see both figures on each row.":"我们厨房是以生重秤量。若您习惯写熟重，请选「熟重」，每一行我们都会自己换算 — 您会在每行看到两个数字。","Days":"天数","The sheet":"餐单内容","This is the plan written in our format. Send it to your client and they can paste it straight into our Bring Your Own Plan page.":"这是用我们格式写出的餐单。传给您的客户，他们可以直接贴进「自备餐单」页面。","Copy the sheet":"复制餐单","Close":"关闭","Bring Your Own Plan":"自备餐单","Personalised Meal Plan":"个人定制餐单","↶ Undo":"↶ 复原","Save":"保存","Copy As A Sheet":"复制成餐单","Send To AERA":"发送给 AERA","Save To My Meal Plan":"保存到我的餐单","Add a dish":"加入一道菜","Search our kitchen list. Type what you mean — \"fish\", \"lean protein\", \"no oil\" and \"high protein\" all work.":"搜索我们的厨房清单。直接输入您要的 —「鱼」「低脂蛋白」「无油」「高蛋白」都可以。","What do they eat here?":"这一餐他们吃什么？","Add":"加入","Something the client sources at home. We will not cook it, but it stays on the plan so nothing goes missing.":"客户自己在家准备的部分。我们不会烹调，但会留在餐单上，以免遗漏。","Morning Snack":"上午加餐","Afternoon Snack":"下午加餐","Pre Workout":"训练前","Post Workout":"训练后","Day price":"当日价格","Select and copy":"选取并复制","Undo the last change":"复原上一个更动","Client’s home-sourced meal":"客户自备的一餐","home-sourced — not cooked by us":"自备 — 非我们烹调","High protein":"高蛋白","AERA Meal Preparation SDN BHD · Seri Kembangan. Your clients are saved in this browser on this device only — they are not sent anywhere until you press Send To AERA.":"AERA Meal Preparation SDN BHD · Seri Kembangan。您的客户资料只保存在这台设备的浏览器里 — 在您按下「发送给 AERA」之前不会传去任何地方。","Hafiz, TNT Fitness":"例：Hafiz，TNT Fitness","Chicken, salmon, brown rice, broccoli…":"鸡肉、三文鱼、糙米、西兰花…","Egg Whites, Rolled Oats, Banana…":"蛋白、燕麦片、香蕉…"});
if(window.aeraRetranslate)window.aeraRetranslate();

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

/* AERA-LEGAL-ZH */
Object.assign(window.AERA_I18N||{},{"Terms & Conditions":"条款与条件","Privacy Notice":"隐私声明"});
if(window.aeraRetranslate)window.aeraRetranslate();

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

Object.assign(window.AERA_I18N,{"Pick the dishes, set the weights, and hand it over. Nothing is typed up twice and nothing is read by a machine, so nothing is misread. Keep as many clients here as you like.":"选好菜色、定好克数，交给我们就行。不必重打一次，也不经机器辨识，不会读错。客户要存多少个都可以。","+ New client":"+ 新增客户","+ Add day":"+ 新增一天","Duplicate this day":"复制这一天","Day name":"这一天的名称","Monday":"星期一","Tuesday":"星期二","Wednesday":"星期三","Thursday":"星期四","Friday":"星期五","Saturday":"星期六","Sunday":"星期日","Breakfast":"早餐","Lunch":"午餐","Dinner":"晚餐","Supper":"宵夜","Nothing in this meal yet.":"这一餐还没有内容。","+ Add a dish":"+ 加入一道菜","+ Client’s Home-Sourced Meal":"+ 客户自备的一餐","+ Add a meal":"+ 新增一餐","Calories":"热量","Protein":"蛋白质","Carbs":"碳水","Fat":"脂肪","Nothing to send yet":"目前还没有可发送的内容","Chicken":"鸡肉","Fish":"鱼","Beef":"牛肉","Rice":"米饭","Pasta":"意面","Potato":"马铃薯","Vegetables":"蔬菜","Oil-free":"无油","Lean":"低脂"});
window.AERA_I18N_RE.push([/^(\d+) boxes?$/,"$1 盒"],[/^(\d+) meals?$/,"$1 餐"],[/^(\d+) clients?$/,"$1 位客户"],
 [/^([\d,]+) kcal · P ([\d.]+) · C ([\d.]+) · F ([\d.]+)$/,"$1 大卡 · 蛋白 $2 · 碳水 $3 · 脂肪 $4"],
 [/^Client (\d+)$/,"客户 $1"]);
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