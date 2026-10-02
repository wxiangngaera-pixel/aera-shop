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

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();window.__aeraHash=String(location.hash||'');window.__aeraSearch=String(location.search||'');

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
 function node(n){if(done.has(n))return;var p=n.parentElement;if(!p||SKIP[p.tagName])return;if(p.closest('#langSw,.noi18n'))return;
  var t=tr(n.nodeValue);if(t===null)return;done.add(n);
  n.nodeValue=n.nodeValue.replace(/^(\s*)[\s\S]*?(\s*)$/,'$1'+t.replace(/\$/g,'$$')+'$2')}
 var ATTR=['placeholder','title','aria-label','alt','value'];
 function attrs(el){if(!el.getAttribute)return;if(el.closest&&el.closest('#langSw,.noi18n'))return;
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
"Return to Homepage":"返回首页","Home":"首页","Shop ▾":"选购 ▾","Meal Bundles":"一周套餐","Fat Loss Meals":"减脂餐","Mass Gain Meals":"增肌餐","All Meals":"全部餐点","À la Carte":"单点","Merchandise":"周边商品","Free Delivery Vouchers":"免运费优惠券","Order Now":"立即订购","My Account":"我的账户",
"Accounts Are Almost Ready":"账户功能即将开放","Customer accounts are being switched on. You can still order without an account — your AERA Points are tracked by email.":"顾客账户正在陆续开放。没有账户也可以下单 — 您的 AERA 积分会以电邮记录。",
"Sign In":"登录","Create Account":"注册账户","Forgot Password":"忘记密码","Email":"电邮","Password":"密码","New here?":"第一次来？","Create an account":"注册一个账户",". It takes 30 seconds.":"，只需 30 秒。","Your Name":"您的姓名","Mobile":"手机号码","Use the same Email you Order with. Your AERA Points from earlier Orders are linked automatically.":"请使用您下单时用的同一个电邮。过往订单的 AERA 积分会自动连结。","We'll email you a link to set a New Password.":"我们会寄一封电邮给您，内含设定新密码的链接。","Send Reset Link":"寄出重设链接","Set a New Password":"设定新密码","New Password":"新密码","Save Password":"保存密码","Change Password":"更改密码","Cancel":"取消","Rename":"重新命名","Save":"保存","Type It Again":"再输入一次","Same password again":"再次输入相同密码","Show Password":"显示密码","Save New Password":"保存新密码","Signed in":"已登录","Sign Out":"登出",
"Orders":"订单","My Meal Plans":"我的餐单","My Favourite Meal Plans":"我收藏的餐单","My Home-Sourced Meals":"我的自备餐点","AERA Points":"AERA 积分","Referrals":"推荐","Settings":"账户设置","Addresses":"收件地址","Meal Preferences":"饮食偏好","Weight Control":"体重管理",
"Your Orders":"您的订单","Order your First Meals →":"订购您的第一份餐点 →","No favourites yet. Star a plan on the":"还没有收藏。到","Personalised Meal Plan":"个人定制餐单","page and it will appear here.":"页面为餐单加星，它就会出现在这里。","Everything you have keyed in on the Home-Sourced Meals Page. Add them to a plan from the “Your Week” step.":"您在「自备餐点」页面输入过的全部内容。可在「您的一周」步骤中加入餐单。","Nothing here yet. Look one up under Your Week on the plan page and it is kept for next time.":"这里还是空的。在餐单页面的「您的一周」中查找一次，就会保存下来供下次使用。","Add a Home-Sourced Meal →":"新增一份自备餐点 →","Your Personalised Meal Plans":"您的个人定制餐单","No Personalised Plans yet. Answer a few questions and we design every Meal to your Calories and Macros.":"还没有定制餐单。回答几个问题，我们就会按您的热量与营养比例设计每一餐。","Build a New Plan →":"制定新餐单 →",
"Available":"可用","Worth RM 5.00 off your next Orders":"相当于下次订单可折抵 RM 5.00","Earned":"已获得","Used":"已使用","Expired":"已过期","🎂 Add your date of birth under Details & Addresses to unlock a Birthday Treat : 15% OFF Meals during your birthday month, once a year.":"🎂 在「资料与地址」中填上出生日期，即可解锁生日礼遇：生日当月餐点 85 折，每年一次。","5 AP for every RM 1 on Meals · 100 AP = RM 1.00 · Up to 10% OFF an Order · Points expire 6 Months after earning. At Checkout your Points are applied automatically when you are signed in.":"餐点每消费 RM 1 得 5 AP · 100 AP = RM 1.00 · 单笔订单最多折抵 10% · 积分自获得起 6 个月后失效。登录后结账时会自动套用您的积分。","Date":"日期","Details":"明细","Expires":"到期","Welcome Gift — 500 AERA Points":"迎新礼 — 500 AERA 积分","Your Referrer":"您的推荐人","You are not registered under a Referrer yet. If a Gym, Studio or Coach gave you a Code, enter it at Checkout. Your first paid Order ties it to your Account and you start earning an extra 3% of your Meal Subtotal in AERA Points.":"您还没有登记在任何推荐人名下。若健身房、工作室或教练给了您代码，请在结账时输入。第一笔付款订单会把代码绑定到您的账户，之后您会额外获得餐点小计 3% 的 AERA 积分。",
"Date Of Birth":"出生日期","Day":"日","Month":"月","Year":"年","Jan":"1 月","Feb":"2 月","Mar":"3 月","Apr":"4 月","May":"5 月","Jun":"6 月","Jul":"7 月","Aug":"8 月","Sep":"9 月","Oct":"10 月","Nov":"11 月","Dec":"12 月","For your Birthday Treat and your Personalised Meal Plan.":"用于生日礼遇与您的个人定制餐单。","Preferred Packaging":"偏好的包装","MAP Bento Box":"MAP 保鲜餐盒","Vacuum Bag":"真空袋","Save Details":"保存资料","Mobile ( Rider Contact )":"手机号码（骑手联络）","Not verified yet":"尚未验证","Send Me A Code":"寄验证码给我","A mobile number can belong to one AERA Account only. It is what our Riders call when they arrive.":"一个手机号码只能绑定一个 AERA 账户。骑手抵达时会拨打这个号码。","Saved addresses appear at Checkout, so you can pick one instead of typing it again.":"已保存的地址会出现在结账页，可直接选取，不必重新输入。","No saved addresses yet. Add one below and Checkout will use it automatically.":"还没有保存的地址。在下方新增一个，结账时就会自动使用。","Add an Address":"新增地址","Save Address":"保存地址",
"Body Weight ( KG )":"体重（公斤）","Body Fat Mass ( KG )":"体脂重（公斤）","Body Fat ( % )":"体脂率（%）","Skeletal Muscle Mass ( KG )":"骨骼肌重（公斤）","Visceral Fat ( level )":"内脏脂肪（等级）","BMI ( KG / m² )":"BMI（公斤 / 米²）","Height ( cm )":"身高（厘米）","Leave anything your scale does not report empty. BMI is worked out from your Weight and Height if you do not enter it.":"体重计没有的数据可以留空。若不填 BMI，我们会用您的体重与身高计算。","Save Today’s Report":"保存今天的记录","Add your date of birth and sex in":"请先在","and enter a weight and height above — then your Basal Metabolic Rate and daily intake appear here.":"中填上出生日期与性别，并在上方输入体重与身高 — 您的基础代谢率与每日摄取量就会显示在这里。",", and enter a weight and height above — then your Basal Metabolic Rate and daily intake appear here.":"中填上出生日期与性别，并在上方输入体重与身高 — 您的基础代谢率与每日摄取量就会显示在这里。","Overview":"总览","Body Weight":"体重","Body Fat Mass":"体脂重","Body Fat":"体脂率","Skeletal Muscle Mass":"骨骼肌重","Visceral Fat":"内脏脂肪","BMI":"BMI","Overall":"整体","Monthly":"每月","Nothing recorded for this view yet.":"这个视图还没有任何记录。",
"Saved on your Profile and sent to the Kitchen with every Order.":"保存在您的个人资料中，并随每笔订单送到厨房。","Seasoning":"调味","Normal Salt":"正常盐","Less Salt":"少盐","No Salt":"无盐","Spice":"辣度","Normal Spice":"正常辣","Less Spicy":"少辣","No Spice":"不辣","Allergies":"过敏","Dislikes / Notes for the Kitchen":"不吃的东西 / 给厨房的备注","Save Preferences":"保存偏好","Terms & Conditions":"条款与细则","My Account — AERA Meal Prep":"我的账户 — AERA Meal Prep",
"Your password":"您的密码","Full Name":"全名","01x-xxx xxxx":"01x-xxx xxxx","At least 8 characters":"至少 8 个字符","012-345 6789":"012-345 6789","Start typing your address…":"开始输入您的地址…","Label, e.g. Home / Office":"标签，例如 住家 / 办公室","Unit / floor / guard house ( Optional )":"单位 / 楼层 / 警卫室（选填）","e.g. prawn, peanut, dairy":"例如：虾、花生、乳制品","e.g. no coriander, sauce on the side":"例如：不要香菜、酱汁另外装"
});
window.AERA_I18N_RE.push(
[/^([\d,]+) AP$/,"$1 AP"],[/^My Account · (.+)$/,"我的账户 · $1"],[/^(\d+) KCALs · (\d+) g P$/,"$1 大卡 · 蛋白质 $2 克"]
);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
Object.assign(window.AERA_I18N,{
"That email already has an AERA account, so no new confirmation was sent. Sign in below, or use Forgot Password if you cannot remember it.":"这个电邮已经有 AERA 账户，因此没有再寄出确认信。请在下方登录，或使用「忘记密码」。","If that email has an account, a reset link is on its way.":"若这个电邮已有账户，重设链接已经寄出。","Password saved — you are signed in.":"密码已保存 — 您已登录。","Please fill in all five — each one changes the result.":"五项都请填写 — 每一项都会影响结果。","Please check the date of birth.":"请检查出生日期。","This saved plan has no items we can reopen.":"这份已保存的餐单没有可重新打开的项目。","Please enter your email address.":"请输入您的电邮地址。","No items in cart.":"购物车里没有项目。","An email address is required to complete checkout.":"完成结账需要电邮地址。"
});
window.AERA_I18N_RE.push([/^([\d,]+) AP expire on (.+) — use them at Checkout before then\.$/,"$1 AP 将于 $2 到期 — 请在此之前于结账时使用。"]);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-OV-ZH : Chinese for the Overview tab of My Account */
Object.assign(window.AERA_I18N,{
"Your AERA":"您的 AERA",
"Everything that belongs to you, in one place.":"属于您的一切，都在这里。",
"Next Delivery":"下次配送",
"Order History":"订单记录",
"Order History":"订单记录",
"No Orders yet":"还没有订单",
"Everything you Order shows up here with its Delivery Day and Tracking.":"您的每一笔订单都会显示在这里，附上配送日期和物流追踪。",
"Nothing on its way at the moment.":"目前没有正在配送的订单。",
"See the Menu":"查看菜单",
"order":"张订单",
"orders":"张订单",
"My Home-Sourced Meal":"我的自备餐点",
"Nothing Saved":"尚未保存",
"item":"项",
"items":"项",
"Counted into your plan alongside what our kitchen cooks.":"会与我们厨房烹调的餐点一起计入您的餐单。",
"Everything you have keyed in on the Home-Sourced Meals Page. Add them to a plan from the “Your Week” step.":"您在自备餐点页面记录的所有内容。在「您的一周」步骤中把它们加入餐单。",
"Manage":"管理",
"Add Something":"添加",
"Cash-Back":"返现",
"due":"待付",
"Referral statements":"推荐结算单",
"My Meal Plan":"我的餐单",
"None yet":"还没有",
"Build one around your Calories and Macros, or hand us a Plan your Coach wrote.":"根据您的热量与三大营养素来制定，或把教练写好的餐单交给我们。",
"Build a plan":"制定餐单",
"This plan has no meals saved against it.":"这份餐单还没有保存任何餐点。",
"Open & tune this plan":"打开并调整这份餐单",
"Meal":"餐点",
"Fat Loss":"减脂",
"Lean Gain":"精瘦增肌",
"Mass Gain":"增肌",
"Healthy Eating":"健康饮食",
"Custom Macros":"自定义营养素"
});
window.AERA_I18N_RE.push(
 [/^No Orders yet under (.+)\.$/,"$1 还没有任何订单。"],
 [/ · Self Pick-Up$/," · 自取"],
 [/ · (\d+) Orders all together$/," · 共 $1 张订单"],
 [/^Last on (.+)$/,"上次订单：$1"],
 [/^(.+)’s AERA$/,"$1 的 AERA"],
 [/^worth (RM [\d,.]+)$/,"价值 $1"],
 [/^earn (\d+) per RM 1$/,"每消费 RM 1 赚取 $1 AP"],
 [/^(RM [\d,.]+) earned all together$/,"累计赚取 $1"],
 [/^([\d.]+)% of the meal subtotal on every order placed with your code\.$/,"使用您的推荐码下单，可获餐点小计的 $1%。"],
 [/^(\d+) Days x (\d+) Meals$/,"$1 天 × 每天 $2 餐"],
 [/^(\d+) Boxes$/,"$1 盒"],
 [/^(\d+) Boxes · (RM [\d,.]+)$/,"$1 盒 · $2"],
 [/^Day (\d+)$/,"第 $1 天"],
 [/^(\d+) g$/,"$1 克"],
 [/^kcal a day · P (\d+) g · C (\d+) g · F (\d+) g$/,"大卡/天 · 蛋白质 $1 克 · 碳水 $2 克 · 脂肪 $3 克"],
 [/^kcal a day · P (\d+) g · C (\d+) g · F (\d+) g · Fat Loss$/,"大卡/天 · 蛋白质 $1 克 · 碳水 $2 克 · 脂肪 $3 克 · 减脂"],
 [/^kcal a day · P (\d+) g · C (\d+) g · F (\d+) g · Lean Gain$/,"大卡/天 · 蛋白质 $1 克 · 碳水 $2 克 · 脂肪 $3 克 · 精瘦增肌"],
 [/^kcal a day · P (\d+) g · C (\d+) g · F (\d+) g · Mass Gain$/,"大卡/天 · 蛋白质 $1 克 · 碳水 $2 克 · 脂肪 $3 克 · 增肌"],
 [/^kcal a day · P (\d+) g · C (\d+) g · F (\d+) g · Healthy Eating$/,"大卡/天 · 蛋白质 $1 克 · 碳水 $2 克 · 脂肪 $3 克 · 健康饮食"],
 [/^kcal a day · P (\d+) g · C (\d+) g · F (\d+) g · Custom Macros$/,"大卡/天 · 蛋白质 $1 克 · 碳水 $2 克 · 脂肪 $3 克 · 自定义营养素"]
);
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
Object.assign(window.AERA_I18N||{},{"By creating an Account you agree to our":"创建账户即表示您同意我们的","Terms & Conditions":"条款与条件","and have read our":"，并已阅读我们的","Privacy Notice":"隐私声明"});
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-MARKETING-OPTIN : opt-in kept in the Supabase user metadata (marketing_opt_in, marketing_opt_in_at) */
Object.assign(window.AERA_I18N||{},{"Send me New Menus, Offers and News by Email or WhatsApp. You can stop anytime.":"通过电邮或 WhatsApp 向我发送新菜单、优惠和最新消息。可随时取消。","News & Offers":"最新消息与优惠","Changes save straight away.":"更改会立即保存。","Could not save. Please try again.":"保存失败，请重试。","Saved":"已保存"});
if(window.aeraRetranslate)window.aeraRetranslate();
window.aeraMktSet=async function(on){var m=document.getElementById("pMktMsg"),b=document.getElementById("pMkt");if(b)b.disabled=true;try{var r=await sb.auth.updateUser({data:{marketing_opt_in:!!on,marketing_opt_in_at:on?new Date().toISOString():null,marketing_opt_out_at:on?null:new Date().toISOString()}});if(r.error)throw r.error;m.innerHTML='<span class="chip ok">Saved</span>'}catch(e){if(b)b.checked=!on;m.innerHTML='<span class="chip bad">Could not save. Please try again.</span>'}if(b)b.disabled=false;if(window.aeraRetranslate)window.aeraRetranslate()};
(function(){var n=0,t=setInterval(async function(){n++;if(n>60)return clearInterval(t);try{if(typeof USER==="undefined"||!USER||typeof sb==="undefined")return;clearInterval(t);var r=await sb.auth.getUser();var md=(r&&r.data&&r.data.user&&r.data.user.user_metadata)||USER.user_metadata||{};var b=document.getElementById("pMkt");if(b)b.checked=md.marketing_opt_in===true}catch(e){}},1000)})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-WELCOMEBACK-ZH : the Welcome Back card old-site customers see on their first sign-in */
Object.assign(window.AERA_I18N||{},{"Welcome Back":"欢迎回来",
"Your details have come across from our old site, including":"您的资料已从旧网站转移过来，包括",
"Your details have come across from our old site, including your last order (":"您的资料已从旧网站转移过来，包括您的上一笔订单（",
"and your last order (":"以及您的上一笔订单（",
"). Nothing else has changed.":"）。其他一切不变。",
". Nothing else has changed.":"。其他一切不变。",
"Your details have come across from our old site. Nothing else has changed.":"您的资料已从旧网站转移过来，其他一切不变。",
"Carried-over points are good for the next six months and come off your bill automatically at checkout.":"转移过来的积分六个月内有效，结账时会自动折抵。"});
if(window.AERA_I18N_RE)window.AERA_I18N_RE.push([/^([\d,]+) AERA Points$/,'$1 AERA 积分']);
if(window.AERA_I18N)Object.assign(window.AERA_I18N,{"KG":"公斤","kg":"公斤","g":"克"});
if(window.AERA_I18N_RE)window.AERA_I18N_RE.push([/^([\d,.]+) ?KG$/i,"$1 公斤"],[/^([\d,.]+) ?g$/,"$1 克"]);
if(window.AERA_I18N)Object.assign(window.AERA_I18N,{"kg/m²":"公斤 / 米²","KG/M²":"公斤 / 米²","KG / m²":"公斤 / 米²","kg / m²":"公斤 / 米²"});
if(window.AERA_I18N_RE)window.AERA_I18N_RE.push([/^([\d,.]+)\s*kg\s*\/\s*m²$/i,"$1 公斤 / 米²"]);
/* The body report, in 中文 : the reading, its unit and how it sits against the band. */
if(window.AERA_I18N&&window.AERA_I18N_RE)(function(){var D=window.AERA_I18N,R=window.AERA_I18N_RE;
 function rx(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
 var ST={"Low":"偏低","Normal":"正常","High":"偏高","Above the typical range":"高于正常范围"};
 var U=[["KG / m²","公斤 / 米²"],["% of body weight","% 体重占比"],["%","%"],["level","级"]];
 Object.keys(ST).forEach(function(s){U.forEach(function(u){
  R.push([new RegExp("^([\\d,.]+) "+rx(u[0])+" · "+rx(s)+"$"),"$1 "+u[1]+" · "+ST[s]])})});
 var ACT={"Highly Active":"高度活跃","Moderately Active":"中度活跃","Not Very Active":"活动量较低"};
 Object.keys(ACT).forEach(function(k){
  R.push([new RegExp("^KCAL a day, "+rx(k)+" \\( BMR × ([\\d.]+) \\)$"),"每日大卡，"+ACT[k]+" ( BMR × $1 )"])});
 R.push([/^Typical (.+)$/,"正常范围 $1"]);
 Object.assign(D,{"Your Latest Report":"最新体测报告","Low":"偏低","High":"偏高","Above":"偏高",
  "Normal":"正常","Skeletal Muscle":"骨骼肌","Overview":"总览",
  "Basal Metabolic Rate ( BMR )":"基础代谢率 ( BMR )","Daily Caloric Intake":"每日热量摄取",
  "KCAL a day at Rest":"静息状态每日大卡",
  "10 and over is usually flagged for attention.":"10 及以上通常需要留意。",
  "Every Reading":"全部记录","Remove":"删除","HEIGHT":"身高","Height":"身高"});
 /* Saved Meal Plans */
 Object.assign(D,{"Saved, not ordered yet":"已保存，尚未下单","Show Meals":"显示餐点",
  "Open & Tune This Plan":"打开并调整这份餐单","Plan Price":"餐单价格"});
 var G={"Fat Loss":"减脂","Lean Gain":"增肌减脂","Mass Gain":"增肌","Healthy Eating":"健康饮食","Custom Macros":"自定义营养比例"};
 Object.keys(G).forEach(function(g){
  R.push([new RegExp("^"+rx(g)+" · (\\d+) Days x (\\d+) Meals? a day · (\\d+) Boxes · (.+)$"),
   G[g]+" · $1 天 × 每天 $2 餐 · $3 盒 · $4"]);
  R.push([new RegExp("^"+rx(g)+" · (\\d+) Days x (\\d+) Meals? a day · (\\d+) Boxes$"),
   G[g]+" · $1 天 × 每天 $2 餐 · $3 盒"])});
 R.push([/^Ordered · (.+)$/,"已下单 · $1"]);
 R.push([/^AERA Meals Target ≈ ([\d,]+) KCALs · Protein ([\d.]+) g · Carbs ([\d.]+) g · Fat ([\d.]+) g per Day$/,
  "AERA 餐点目标 ≈ 每日 $1 大卡 · 蛋白质 $2 克 · 碳水 $3 克 · 脂肪 $4 克"]);
 R.push([/^≈ RM ([\d,.]+) per Meal · Packaging Included$/,"≈ 每餐 RM $1 · 已含包装"]);
 /* AERA Points and the Birthday Treat */
 R.push([/^Worth RM ([\d,.]+) off your next Orders$/,"价值 RM $1，可折抵下次订单"]);
 /* Ledger notes written by the changeover, which arrive as data rather than page text */
 R.push([/^AERA Points carried over from your earlier orders\.?$/i,"从过往订单转移过来的 AERA 积分"]);
 R.push([/^Points carried over from your earlier orders\.?$/i,"从过往订单转移过来的积分"]);
 R.push([/^AERA Points carried over from the old website\.?$/i,"从旧网站转移过来的 AERA 积分"]);
 R.push([/^\ud83c\udf82 Add your date of birth under Details & Addresses to unlock a Birthday Treat : (\d+)% OFF Meals during your birthday month, once a year\.$/,
  "\ud83c\udf82 在「资料与地址」填上生日，即可解锁生日礼遇 ：生日当月餐点享 $1% 折扣，每年一次。"]);
 var MON=["January","February","March","April","May","June","July","August","September","October","November","December"];
 var MZH=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
 MON.forEach(function(m,i){var z=MZH[i];
  R.push([new RegExp("^\ud83c\udf82 Birthday Treat : (\\d+)% OFF Meals on one Order in "+m+", applied automatically at Checkout while you are signed in\\. Once a year\\.$"),
   "\ud83c\udf82 生日礼遇 ："+z+"任选一单，餐点享 $1% 折扣，登入后结账时自动套用。每年一次。"]);
  R.push([new RegExp("^\ud83c\udf82 Birthday Treat : (\\d+)% OFF Meals on one Order in "+m+" — that is this month! It is applied automatically at Checkout while you are signed in\\.$"),
   "\ud83c\udf82 生日礼遇 ："+z+"任选一单，餐点享 $1% 折扣 — 就是这个月！登入后结账时自动套用。"]);
  R.push([new RegExp("^\ud83c\udf82 Birthday Treat for (\\d{4}) used — see you next "+m+"!$"),
   "\ud83c\udf82 $1 年的生日礼遇已使用 — 明年"+z+"再见！"]);
  R.push([new RegExp("^\ud83c\udf82 Birthday Treat for (\\d{4}) used on Order (.+) — see you next "+m+"!$"),
   "\ud83c\udf82 $1 年的生日礼遇已用于订单 $2 — 明年"+z+"再见！"])});
 R.push([/^on (.+)\. You may now keep track of your Fitness Journey here\.$/,
  "记录于 $1。从这里开始追踪您的健身历程。"]);
 if(window.aeraRetranslate)window.aeraRetranslate();})();
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
if(window.AERA_I18N)Object.assign(window.AERA_I18N,{"Preparing":"备餐中","In the kitchen":"厨房制作中","Packed · rider booked":"已装箱 · 已安排骑手","On the way":"配送途中","Delivered":"已送达","Cancelled":"已取消","Earned All Time":"累计获得","Since you joined":"自加入以来","Order No":"订单号码","Status":"状态","Sales":"销售额","Note given to the rider":"给骑手的备注","Track My Rider ↗":"追踪我的骑手 ↗","Paid":"已付款","Ordered":"已下单","Balance":"余额","Credit":"AERA 余额","Points":"积分"});
if(window.AERA_I18N_RE)window.AERA_I18N_RE.unshift(
 [/^Earned (\d+) AP · used (\d+) AP$/,"获得 $1 AP · 使用 $2 AP"],
 [/^Earned (\d+) AP$/,"获得 $1 AP"],
 [/^([\d,]+) AP$/,"$1 AP"]
);
if(window.aeraRetranslate)window.aeraRetranslate();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA-CONSENT : explicit consent before health information is stored, and a clear
   notice before the AI coach sends anything to OpenAI ( PDPA 2010 ). Consent is kept
   on the device and, once signed in on My Account, copied to the customer's profile. */
(function(){
 var KEY='aera.consent',PN='https://my.chatbees.io/p/xXH4dXALg';
 var EN={health:{h:'Your Health Information',
   p:'Body Measurements, Weight Control readings and Allergies are Health Information. We store them only to cook your Meals safely, build your Plan and show your Progress. You can delete them at any time.',
   c:'I agree that AERA may store and use my Health Information for these purposes.',y:'Agree & Continue'},
  coach:{h:'Before The Coach Answers',
   p:'To make its suggestions, the coach sends your sex, age, height, bodyweight and BMI, the food you type, or the meals in your plan to OpenAI in the United States.',
   c:'I agree to this.',y:'Agree & Ask The Coach'},
  pn:'Read our Privacy Notice',no:'Cancel'};
 var ZH={health:{h:'您的健康资料',
   p:'身体数据、体重管理记录和过敏资料属于健康资料。我们只会用它们来安全地烹调您的餐点、制定您的餐单，并显示您的进度。您可以随时删除这些资料。',
   c:'我同意 AERA 为上述用途储存和使用我的健康资料。',y:'同意并继续'},
  coach:{h:'教练回答之前',
   p:'为了给出建议，教练会把您的性别、年龄、身高、体重和 BMI、您输入的食物，或您餐单里的餐点发送到位于美国的 OpenAI。',
   c:'我同意。',y:'同意并询问教练'},
  pn:'阅读我们的隐私声明',no:'取消'};
 function get(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
 function prof(){try{return (typeof PROFILE!=='undefined'&&PROFILE)||null}catch(e){return null}}
 function has(k){if(get()[k])return true;var p=prof();return !!(p&&p[k+'_consent_at'])}
 var tried={};
 function sync(){try{
  if(typeof sb==='undefined'||!sb||typeof USER==='undefined'||!USER)return;
  var c=get(),p=prof()||{},up={id:USER.id,email:String(USER.email||'').toLowerCase()},any=false;
  ['health','coach'].forEach(function(k){if(c[k]&&!p[k+'_consent_at']&&!tried[k]){up[k+'_consent_at']=c[k];tried[k]=1;any=true}});
  if(!any)return;
  sb.from('profiles').upsert(up).then(function(r){if(r&&!r.error){var q=prof();if(q)Object.assign(q,up)}})}catch(e){}}
 function put(k){var c=get();c[k]=new Date().toISOString();try{localStorage.setItem(KEY,JSON.stringify(c))}catch(e){}sync()}
 function css(){if(document.getElementById('aeraConsentCss'))return;var s=document.createElement('style');s.id='aeraConsentCss';
  s.textContent='#aeraConsent{position:fixed;inset:0;z-index:2147483000;background:rgba(11,28,54,.55);display:flex;align-items:center;justify-content:center;padding:18px}'+
  '#aeraConsent .acx{background:#fff;color:#0B0B0B;max-width:440px;width:100%;border-radius:16px;padding:22px 22px 18px;box-shadow:0 20px 60px rgba(0,0,0,.3);font-family:Montserrat,system-ui,sans-serif;text-align:left}'+
  '#aeraConsent h3{margin:0 0 8px;font-size:18px;font-weight:800;color:#0E3576;text-transform:none}'+
  '#aeraConsent p{margin:0 0 12px;font-size:13.5px;line-height:1.55;color:#3A3A3A}'+
  '#aeraConsent label{display:flex;gap:9px;align-items:flex-start;font-size:13.5px;font-weight:600;cursor:pointer;line-height:1.45;color:#0B0B0B}'+
  '#aeraConsent label input{margin:2px 0 0;width:18px;height:18px;flex:none;accent-color:#16479E}'+
  '#aeraConsent .acn{margin:10px 0 0;font-size:12.5px}#aeraConsent .acn a{color:#16479E}'+
  '#aeraConsent .acb{display:flex;justify-content:flex-end;gap:8px;margin-top:16px;flex-wrap:wrap}'+
  '#aeraConsent button{font:700 13px Montserrat,system-ui,sans-serif;border-radius:99px;padding:10px 18px;cursor:pointer;border:1px solid #CBD2DE;background:#fff;color:#0B0B0B}'+
  '#aeraConsent .acyes{background:#FDB913;border-color:#FDB913}#aeraConsent .acyes:disabled{opacity:.45;cursor:not-allowed}';
  document.head.appendChild(s)}
 function ask(kind,go){css();var old=document.getElementById('aeraConsent');if(old)old.remove();
  var zh=document.documentElement.getAttribute('data-lang')==='zh',L=zh?ZH:EN,t=L[kind];
  var w=document.createElement('div');w.id='aeraConsent';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');
  w.innerHTML='<div class="acx"><h3></h3><p class="acp"></p><label><input type="checkbox" id="acChk"><span></span></label>'+
   '<p class="acn"><a target="_blank" rel="noopener"></a></p><div class="acb"><button type="button" class="acno"></button><button type="button" class="acyes" disabled></button></div></div>';
  w.querySelector('h3').textContent=t.h;w.querySelector('.acp').textContent=t.p;w.querySelector('label span').textContent=t.c;
  var a=w.querySelector('.acn a');a.href=PN;a.textContent=L.pn;
  w.querySelector('.acno').textContent=L.no;var yes=w.querySelector('.acyes');yes.textContent=t.y;
  var chk=w.querySelector('#acChk');chk.onchange=function(){yes.disabled=!chk.checked};
  w.querySelector('.acno').onclick=function(){w.remove()};
  w.onclick=function(e){if(e.target===w)w.remove()};
  yes.onclick=function(){if(!chk.checked)return;put(kind);w.remove();go()};
  document.body.appendChild(w);setTimeout(function(){chk.focus()},30)}
 window.aeraConsentHas=has;window.aeraConsentAsk=ask;
 /* buttons whose own onclick sends data off the device */
 var COACH=/^\s*(coachAsk|foodLookup)\s*\(/, STORE=/^\s*(savePlan|favPlan|sharePlan|orderPlan)\s*\(/;
 document.addEventListener('click',function(e){
  var b=e.target&&e.target.closest?e.target.closest('[onclick]'):null;if(!b||b.__aeraPass)return;
  var oc=String(b.getAttribute('onclick')||''),need=COACH.test(oc)?'coach':STORE.test(oc)?'health':null;
  if(!need||has(need))return;
  e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
  ask(need,function(){b.__aeraPass=true;try{b.click()}finally{b.__aeraPass=false}})},true);
 /* My Account forms that store health information */
 document.addEventListener('submit',function(e){
  var f=e.target;if(!f||f.__aeraPass)return;
  var os=String(f.getAttribute('onsubmit')||''),need=false;
  if(/bodySave|obSave/.test(os))need=true;
  else if(/savePrefs/.test(os)){var al=f.querySelector('#qAllergens');need=!!(al&&String(al.value).trim())}
  if(!need||has('health'))return;
  e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
  ask('health',function(){f.__aeraPass=true;try{if(f.requestSubmit)f.requestSubmit();else f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))}finally{f.__aeraPass=false}})},true);
 var n=0,iv=setInterval(function(){sync();if(++n>=15)clearInterval(iv)},4000);
})();

(function(){if(window.__AERA_API) return; window.__AERA_API=1;if(/my\.chatbees\.io$/i.test(location.hostname)) return;var API="https://my.chatbees.io";function conv(u){try{if(typeof u!=="string")return u;if(u.indexOf("/api/")===0)return API+u;if(u.indexOf(location.origin+"/api/")===0)return API+u.slice(location.origin.length);}catch(e){}return u}var of=window.fetch;if(of)window.fetch=function(i,o){try{if(typeof i==="string")i=conv(i);else if(typeof Request!=="undefined"&&i instanceof Request){var n=conv(i.url);if(n!==i.url)i=new Request(n,i)}}catch(e){}return of.call(this,i,o)};var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype,oo=XP&&XP.open;if(oo)XP.open=function(m,u){var a=[].slice.call(arguments);try{a[1]=conv(u)}catch(e){}return oo.apply(this,a)};})();
/* AERA — Order This Again (self-contained; edits nothing above) */
(function(){
  function reusable(o){var n=0;(Array.isArray(o&&o.items)?o.items:[]).forEach(function(i){
    var c=String(i.sku||i.code||'');if(c&&c.indexOf('PLAN-')!==0)n++});return n}
  window.ordAgain=function(idx){
    var O=window.ORDERS||[],o=O[idx];if(!o)return;
    var cart={};try{cart=JSON.parse(localStorage.getItem('aera.cart')||'{}')}catch(e){}
    var added=0,plans=0;
    (Array.isArray(o.items)?o.items:[]).forEach(function(it){
      var c=String(it.sku||it.code||'');if(!c)return;
      if(c.indexOf('PLAN-')===0){plans++;return}
      cart[c]=(+cart[c]||0)+(+it.qty||1);added++});
    if(!added)return;
    try{localStorage.setItem('aera.cart',JSON.stringify(cart))}catch(e){}
    if(plans)alert('Added to your Cart. The Personalised Meal Plan on this Order is not included \u2014 open it under Meal Plans to order that one again.');
    location.href=(window.SHOP_URL||'https://my.chatbees.io/p/D2pz8bZ');
  };
  function paint(){
    try{
      var el=document.getElementById('ordersList'),O=window.ORDERS;
      if(!el||!O||!O.length)return;
      var cards=el.querySelectorAll('.order');
      for(var i=0;i<cards.length;i++){
        if(cards[i].querySelector('.ordagain'))continue;
        if(!reusable(O[i]))continue;
        var d=document.createElement('div');
        d.className='ordagain';d.style.marginTop='10px';
        var b=document.createElement('button');
        b.className='btn btn-y s';b.type='button';b.textContent='Order This Again';
        b.setAttribute('data-i',i);
        b.onclick=function(){window.ordAgain(+this.getAttribute('data-i'))};
        d.appendChild(b);cards[i].appendChild(d);
      }
    }catch(e){}
  }
  var tries=0,t=setInterval(function(){
    var el=document.getElementById('ordersList');
    if(el){clearInterval(t);try{new MutationObserver(paint).observe(el,{childList:true})}catch(e){}paint();}
    else if(++tries>120)clearInterval(t);
  },500);
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
function cut(img){var w=img.naturalWidth,h=img.naturalHeight;if(w<60||h<60)return null;var sc=Math.min(1,900/Math.max(w,h));w=Math.round(w*sc);h=Math.round(h*sc);
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
 function peel(m,n,ok){for(var it=0;it<n;it++){var kill=[];for(i=0;i<N;i++){if(m[i])continue;var X=i%w,Y=(i/w)|0;
   if(!((X>0&&m[i-1])||(X<w-1&&m[i+1])||(Y>0&&m[i-w])||(Y<h-1&&m[i+w])))continue;if(ok(i))kill.push(i)}kill.forEach(function(q){m[q]=1})}}
 /* the gentle cut : only the backdrop colour and its soft shadow */
 var A=flood(function(q){if(Math.max(Math.abs(p[q*4]-r0),Math.abs(p[q*4+1]-g0),Math.abs(p[q*4+2]-b0))<=22)return 1;var L=lum(q);return L<L0&&L>L0-100&&hueOk(q,8)});
 if(A.n>N*0.97)return null;
 /* the deep cut : anything pale and colourless from the edge in, up to a dark rim such as the bento tray's */
 var D=flood(function(q){return lum(q)>70&&chr(q)<50}),m=A.m;
 if((N-D.n)>=(N-A.n)*0.6){m=D.m;peel(m,2,function(q){return lum(q)>50&&chr(q)<50})}
 else peel(m,1,function(q){return lum(q)>95&&hueOk(q,8)});
 for(i=0;i<N;i++)if(m[i])p[i*4+3]=0;
 for(i=0;i<N;i++){if(m[i])continue;var X2=i%w,Y2=(i/w)|0,z=0,n=0;
  for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){var xx=X2+dx,yy=Y2+dy;if(xx<0||yy<0||xx>=w||yy>=h)continue;n++;if(m[yy*w+xx])z++}
  if(z)p[i*4+3]=Math.round(255*(1-z/n*0.5))}
 x.putImageData(d,0,0);return c}
function get(u,cb){if(u in C)return cb(C[u]);(W[u]=W[u]||[]).push(cb);if(W[u].length>1)return;
 Q.push(u);pump()}
function pump(){if(busy||!Q.length)return;busy=1;var u=Q.shift(),i=new Image();i.crossOrigin='anonymous';
 function done(v){C[u]=v;var L=W[u]||[];delete W[u];L.forEach(function(f){try{f(v)}catch(e){}});busy=0;setTimeout(pump,15)}
 i.onload=function(){var c=null;try{c=cut(i)}catch(e){}if(!c)return done(null);
  if(c.toBlob)c.toBlob(function(b){done(b?URL.createObjectURL(b):null)},'image/png');else done(c.toDataURL('image/png'))};
 i.onerror=function(){done(null)};i.src=u}
function doImg(el){if(el.dataset.cut||(el.closest&&el.closest(SKIP)))return;var u=el.getAttribute('src')||'';if(!src(u))return;
 el.dataset.cut='1';get(u,function(v){if(v&&el.getAttribute('src')===u){el.removeAttribute('srcset');el.src=v}else if(el.getAttribute('src')!==u){delete el.dataset.cut;img(el)}})}
function doBg(el){var s=el.style&&el.style.backgroundImage;if(!s||s.indexOf('url(')<0||(el.closest&&el.closest(SKIP)))return;
 var mm=s.match(/url\(["']?([^"')]+)["']?\)/);if(!mm)return;var u=mm[1];if(!src(u)||el.dataset.cutbg===u)return;el.dataset.cutbg=u;
 get(u,function(v){if(v&&el.style.backgroundImage.indexOf(u)>=0){el.style.backgroundImage=s.replace(mm[0],'url("'+v+'")')}})}
function img(el){if(el.complete&&el.naturalWidth)doImg(el);else el.addEventListener('load',function(){doImg(el)},{once:true})}
function walk(root){if(!root||root.nodeType!==1)return;
 if(root.tagName==='IMG')img(root);else if(root.style&&root.style.backgroundImage)doBg(root);
 root.querySelectorAll&&root.querySelectorAll('img,[style*="background"]').forEach(function(e){e.tagName==='IMG'?img(e):doBg(e)})}
function start(){walk(document.body);new MutationObserver(function(ms){ms.forEach(function(r){
  if(r.type==='childList')r.addedNodes.forEach(walk);
  else if(r.attributeName==='src'&&r.target.tagName==='IMG'){if(!/^blob:|^data:image\/png/.test(r.target.getAttribute('src')||'')){delete r.target.dataset.cut;img(r.target)}}
  else if(r.attributeName==='style')doBg(r.target)})}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['src','style']})}
if(document.body)start();else document.addEventListener('DOMContentLoaded',start);
})();