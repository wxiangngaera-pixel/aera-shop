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

Object.assign(window.AERA_I18N,{
"Return to Homepage":"返回首页","Home":"首页","Terms & Conditions":"条款与细则","Bring Your Own Plan":"自带餐单",
"Already Have A Plan? We Will Cook It.":"已经有餐单了？交给我们来煮。","This is what it comes back as":"成品会是这个样子","Every meal on your plan is weighed to the gram and packed into a MAP bento box — protein, carbohydrate and vegetables in their own compartments, sealed and labelled with the calories and macros for that box.":"您餐单上的每一餐都会称到克，装进 MAP 保鲜餐盒 — 蛋白质、碳水与蔬菜各自分格，封膜并标上该盒的热量与营养值。","Hand us the plan your coach, dietitian or clinic wrote for you. We read it, turn the portions into the weights our kitchen works to, and show you exactly what we would make.":"把教练、营养师或诊所为您写的餐单交给我们。我们会读一遍，把份量换算成厨房使用的重量，再清楚告诉您我们会做出什么。","Give Us The Plan":"把餐单交给我们","The weights in your plan are":"您餐单上的重量是","Cooked Weights":"熟重","Raw Weights":"生重","Most coaches write cooked weights — what ends up on the plate. Our kitchen weighs everything raw, so we convert it for you. If you are not sure, leave it on Cooked.":"多数教练写的是熟重 — 也就是上桌时的重量。我们厨房一律称生重，所以会为您换算。如果不确定，就保持「熟重」。","Type it out, or paste it":"直接输入，或贴上","Or take a photo of it, or load a PDF":"或拍一张照片，或上传 PDF","Photograph the whole sheet straight on, in good light. We read it out into the box above so you can check every line before anything is priced — a machine reading handwriting will get some of it wrong, and it is much easier to fix here than after it is cooked.":"请在光线充足处正对着拍下整张表。我们会把内容读进上方的框里，让您在报价前逐行核对 — 机器读手写字一定会有出错的地方，在这里改比煮好后再改容易得多。","Read My Plan":"读取我的餐单","Check What We Read":"核对我们读到的内容","A machine read this, so check it against your own sheet before you send it. The grey line under each item is your original wording. Change any weight that looks wrong — the raw figure on the right updates as you type.":"这是机器读出来的，送出前请对照您自己的表核对一遍。每一项下方的灰色文字是您原本的写法。看到不对的重量就直接改 — 右边的生重会随着您输入即时更新。","See It As A Plan":"以餐单形式查看","This opens your plan in our plan editor, built from the dishes matched above. Swap any dish, change any portion, and the calories, protein and price move with it. Your own plan's totals become the target, so you can see where ours drifts from your coach's sheet.":"这会用上方配对到的菜色，在我们的餐单编辑器中打开您的餐单。换任何一道菜、改任何份量，热量、蛋白质与价格都会跟着变。您原本餐单的总量会成为目标，方便您看出我们和教练那张表差在哪里。","Open My Plan":"打开我的餐单","Would rather we just priced it by hand and came back to you?":"想让我们直接人工报价再回复您？","Send it to the kitchen instead":"改为送去厨房","Send It To The Kitchen":"送去厨房","Your Name":"您的姓名","Email":"电邮","Mobile":"手机号码","Who Wrote This Plan":"这份餐单是谁写的","If a coach, dietitian or clinic wrote it, their name goes on the plan when it reaches our kitchen. Leave it empty if the plan is your own.":"若是教练、营养师或诊所写的，餐单送到厨房时会附上他们的名字。如果是您自己写的，留空即可。","Anything We Should Know":"有什么需要我们注意的","We will price it and come back to you before anything is cooked. Nothing is charged at this point.":"我们会先报价并回复您，之后才开始烹调。此阶段不会收取任何费用。","Send My Plan To AERA":"把我的餐单送给 AERA","AERA Meal Preparation SDN BHD · Seri Kembangan":"AERA Meal Preparation SDN BHD · Seri Kembangan","Prefer us to build the plan instead?":"想让我们帮您制定餐单？","Use the Personalised Meal Plan builder":"使用个人定制餐单工具","Bring Your Own Plan — AERA Meal Prep":"自带餐单 — AERA Meal Prep",
"01x-xxx xxxx":"01x-xxx xxxx","Coach Hafiz, TNT Fitness — or leave blank if it is your own":"例如：Coach Hafiz, TNT Fitness — 若是自己写的可留空","No prawns. Less salt on everything.":"例如：不要虾。全部少盐。"
});
if(window.aeraRetranslate)window.aeraRetranslate();

Object.assign(window.AERA_I18N,{
"Please enter your email address.":"请输入您的电邮地址。","An email address is required to complete checkout.":"完成结账需要电邮地址。"
});
window.AERA_I18N_RE.push([/^Thank you — your plan is with the kitchen\. We will price it and come back to you at (.+) before anything is cooked\.$/,"谢谢 — 您的餐单已送到厨房。我们会先报价，并以 $1 回复您，之后才开始烹调。"]);
if(window.aeraRetranslate)window.aeraRetranslate();

/* AERA-LEGAL-ZH */
Object.assign(window.AERA_I18N||{},{"Terms & Conditions":"条款与条件","Privacy Notice":"隐私声明"});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){
  if(window.__AERA_HOSTMAP) return; window.__AERA_HOSTMAP=1;
  if(/my\.chatbees\.io$/i.test(location.hostname)) return;
  var MAP={"ZQr9fS2jA9":"/","D2pz8bZ":"/checkout","dtTMaV":"/account","SrQzC5m2":"/meal-plan",
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