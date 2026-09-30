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
"Back to the shop →":"返回商店 →","Corporate Orders":"企业订购","Feeding your team, weighed to the gram.":"为您的团队备餐，每一克都称准。","The same kitchen and the same meals we deliver to individual customers every day — prepared for offices, events, training programmes and ongoing weekday feeding. Tell us what you need below and we will come back with a quotation.":"与我们每天送给个人顾客的同一个厨房、同样的餐点 — 为办公室、活动、训练课程与长期的平日供餐而备。在下方告诉我们您的需求，我们会回复报价。","Your own prices":"专属于您的价格","Agreed with you once and held against your account, so every order is priced the same way without a negotiation each time.":"与您谈定一次后记录在您的账户上，之后每一笔订单都按同样的价格计算，不必每次重新议价。","One invoice":"一张发票","However many days and however many addresses, it is one document to pay against — not a receipt per person.":"不论多少天、多少个地址，都只有一份单据需要付款 — 不是每个人一张收据。","Macros on every box":"每一盒都有营养标示","Every meal carries its calories, protein, carbohydrates and fat. Useful when you are feeding a training programme rather than a lunch.":"每一餐都标示热量、蛋白质、碳水与脂肪。当您供应的是训练课程而不只是一顿午餐时，这很有用。","How it works":"运作方式","Four steps, and the first one is the form below.":"四个步骤，第一步就是下方的表格。","You tell us what you need":"您告诉我们需求","Headcount, how many meals each, how often, and where it goes.":"人数、每人几餐、多久一次，以及送到哪里。","We quote":"我们报价","A written quotation with your prices, usually within one working day. Nothing is cooked and nothing is charged until you accept it.":"一份列明您专属价格的书面报价，通常在一个工作天内送达。在您接受之前，不会开始烹调，也不会收取任何费用。","You accept, we cook":"您确认，我们开煮","Your order goes onto the kitchen docket for the dates agreed. Every box is portioned and labelled.":"您的订单会按约定的日期排进厨房单据。每一盒都会分好份量并贴上标签。","We invoice":"我们开发票","One invoice on the terms we agreed — see below.":"按约定的账期开出一张发票 — 详见下方。","Paying":"付款方式","Whichever suits your finance team. We will confirm which applies to your account on the quotation.":"您们财务部方便哪一种都可以。我们会在报价单上确认适用于您账户的方式。","Bank transfer":"银行转账","Against an invoice, to our Public Bank account.":"凭发票转入我们的 Public Bank 账户。","On terms":"账期付款","14 or 30 days from invoice, once your account is set up.":"账户设立后，自发票日起 14 天或 30 天。","Card or online banking":"信用卡或网上银行","Pay up front through the shop at your account prices.":"按您账户的价格，在商店直接预先付款。","Deposit and balance":"订金与尾款","Part up front, the rest invoiced on delivery.":"先付一部分，其余在配送时开发票结算。","Tell us what you need":"告诉我们您的需求","Nothing here commits you to anything. We will reply with a quotation.":"填写这份表格不构成任何承诺。我们会回复您一份报价。","Corporate Orders — AERA Meal Prep":"企业订购 — AERA Meal Prep"
});
if(window.aeraRetranslate)window.aeraRetranslate();

/* AERA-LEGAL-ZH */
Object.assign(window.AERA_I18N||{},{"Terms & Conditions":"条款与条件","Privacy Notice":"隐私声明"});
if(window.aeraRetranslate)window.aeraRetranslate();

/* AERA-LEGAL-NOTE-ZH */
Object.assign(window.AERA_I18N||{},{"We use the details you send to reply to your enquiry. See our":"我们仅使用您提交的资料来回复您的询问。详情请见我们的"});
if(window.aeraRetranslate)window.aeraRetranslate();