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
"Home":"首页","Referrer Portal":"推荐人专区","Order Now":"立即订购","Terms & Conditions":"条款与细则","Questions":"常见问题",
"AERA Referral Programme":"AERA 推荐计划","Share Good Food.":"分享好食物。","Earn Every Month.":"每月都有收入。","Give your Members, Clients or Friends a Referral Code. Every time they Order, you earn a share of what they spend, paid to you in cash after each month closes. They get extra AERA Points for using it.":"把推荐码给您的会员、客户或朋友。他们每下一次单，您都能从消费金额中分得一份，每月结算后以现金支付给您。他们使用推荐码也能获得额外的 AERA 积分。","Normal Referrer":"一般推荐人","Anyone who wants to share AERA with Friends, Family or Colleagues.":"任何想把 AERA 分享给朋友、家人或同事的人。","Fitness Studio OR Gym":"健身工作室或健身房","Gyms, Studios and Training Floors putting AERA in front of their Members.":"把 AERA 推荐给会员的健身房、工作室与训练场地。","Fitness Influencer":"健身网红","Coaches and Creators with an audience who trust what they eat.":"拥有受众、且受众信任其饮食建议的教练与创作者。",
"How It Works":"运作方式","You Get a Code":"您会拿到一个代码","We set up a Referral Code in your Name and send it to you.":"我们会以您的名义设定一个推荐码并发送给您。","They Order with it":"他们用它下单","Your people enter the Code at Checkout. It ties to their Account for good, so you keep earning from them.":"您的人在结账时输入代码。代码会永久绑定他们的账户，之后您会持续从他们的订单获得收入。","You Watch it Add-Up":"您看着它累积","Sign in to the Referrer Portal any time to see every Order, month by month.":"随时登录推荐人专区，按月查看每一笔订单。","We Pay You":"我们付款给您","Bank Transfer after each month closes, with a Receipt you can download.":"每月结算后以银行转账支付，并附上可下载的收据。","Cash-Back is worked out on the Meal Subtotal after any Discount. Delivery, Packaging and Processing Fees are not counted.":"回扣以扣除折扣后的餐点小计计算。配送费、包装费与手续费不计算在内。",
"Apply to be a Referrer":"申请成为推荐人","Fill this in and press Send. It goes straight to our Kitchen Console and we reply with your Code, usually the same day.":"填好后按送出。表格会直接进入我们的厨房后台，我们通常当天就会回复您的代码。","Your Name":"您的姓名","Gym, Studio Or Page Name":"健身房、工作室或专页名称","Email":"电邮","This is what you will sign in to the Referrer Portal with.":"您会用这个电邮登录推荐人专区。","Mobile":"手机号码","Which One Are You?":"您属于哪一类？","Normal Referrer · 5% Cash-Back":"一般推荐人 · 5% 回扣","Fitness Studio OR Gym · 6.5% Cash-Back":"健身工作室或健身房 · 6.5% 回扣","Fitness Influencer · 8% Cash-Back":"健身网红 · 8% 回扣","How Many People Could You Reach?":"您大概能接触到多少人？","Referral Code You Would Like":"您想要的推荐码","Letters, numbers and dashes. We will tell you if it is taken.":"可用英文字母、数字与连字号。若已被使用，我们会通知您。","Where We Pay Your Cash-Back":"回扣要付到哪里","We transfer it after each month closes, so we need the Account before we can approve you. It stays in our Kitchen Console — it is never shown on the Portal and never shared.":"我们会在每月结算后转账，因此必须先有账户资料才能批准您的申请。资料只留在我们的厨房后台 — 不会显示在专区上，也不会外泄。","Bank Name":"银行名称","Account Holder Name":"账户持有人姓名","If the Account is in your Gym’s name, use the Gym’s name.":"若账户是健身房名下的，请填健身房的名称。","Bank Account Number":"银行账号","Anything Else":"其他事项","Send My Application":"送出我的申请",
"When do I get paid?":"什么时候会收到款项？","After each month closes. We total every Order placed with your Code, transfer the Cash-Back to your Bank Account, and stamp the Receipt in your Portal so you can download it.":"每月结算后。我们会统计所有使用您代码的订单，把回扣转入您的银行账户，并在您的专区盖上收据供您下载。","What counts towards my Cash-Back?":"哪些金额算进我的回扣？","The Meal Subtotal after any Discount the customer used. Delivery, Packaging and Processing Fees are never counted.":"顾客使用折扣后的餐点小计。配送费、包装费与手续费一律不计算在内。","Can someone change to another Referrer later?":"顾客之后可以换成别的推荐人吗？","No. The first paid order ties that customer to your Code for good, so you keep earning from them.":"不行。第一笔付款订单就会把该顾客永久绑定到您的代码，您会持续从他们的订单获得收入。","What does the Customer get?":"顾客能得到什么？","An extra 3% of their Meal Subtotal in AERA Points, on top of the usual 5 AERA Points per RM 1. 100 AERA Points is RM 1.00 OFF a future order.":"在一般每 RM 1 得 5 点 AERA 积分之外，额外获得餐点小计 3% 的积分。100 点 AERA 积分等于下次订单折抵 RM 1.00。","How do I see my figures?":"我要怎么查看我的数字？","The":"请前往",". Enter the Email on your application, we send a Code, and you are in. Sales by month, which Customers ordered, what is pending and what has been paid.":"。输入您申请时用的电邮，我们会寄一个验证码给您，即可登录。里面有按月的销售额、哪些顾客下了单、哪些待付、哪些已付。","Become An AERA Referrer — AERA Meal Prep":"成为 AERA 推荐人 — AERA Meal Prep",
"Your full name":"您的全名","Leave blank if it is just you":"如果只有您自己，可留空","you@example.com":"you@example.com","01X XXX XXXX":"01X XXX XXXX","e.g. 180 gym members, 12k followers":"例如：180 位健身房会员、1.2 万粉丝","e.g. AERA-IRONHOUSE":"例如 AERA-IRONHOUSE","e.g. Maybank":"例如 Maybank","Exactly as it appears on the Account":"与账户上显示的完全一致","Numbers only":"只填数字","Where you would share it, what your Members are training for, anything we should know…":"您会在哪里分享、您的会员在练什么、还有什么想让我们知道的…"
});
if(window.aeraRetranslate)window.aeraRetranslate();

/* AERA-LEGAL-ZH */
Object.assign(window.AERA_I18N||{},{"Terms & Conditions":"条款与条件","Privacy Notice":"隐私声明"});
if(window.aeraRetranslate)window.aeraRetranslate();

/* AERA-LEGAL-NOTE-ZH */
Object.assign(window.AERA_I18N||{},{"By applying you agree to our":"提交申请即表示您同意我们的","and have read our":"并已阅读我们的"});
if(window.aeraRetranslate)window.aeraRetranslate();