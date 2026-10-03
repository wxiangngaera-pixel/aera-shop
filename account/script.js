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
"Orders":"订单","My Meal Plans":"我的餐单","My Favourite Meal Plans":"我收藏的餐单","My Home-Sourced Meals":"我的自备餐点","AERA Points":"AERA 积分","Referrals":"推荐","Send Your Code To Another AERA Account":"把推荐码发给另一个 AERA 账户","Their AERA Account Email":"对方的 AERA 账户电邮","Send To Their Inbox":"发到对方收件箱","It lands in their AERA Inbox, with a button that puts your Code in at Checkout.":"推荐码会送到对方的 AERA 收件箱，附带一个在结账时自动填入推荐码的按钮。","Type their AERA Account Email first.":"请先输入对方的 AERA 账户电邮。","Sending…":"发送中…","Share by Email":"用电邮分享","Copy Code":"复制推荐码","Copy Link":"复制链接","Copied":"已复制","Turn OFF":"关闭","To be Paid":"待付款","No Outstanding":"没有待付款项","Each Delivery repeats your Order of this Plan. Same Address, Time Slot and Packaging, and is paid from your":"每次送货都会重复您这个餐单的订单。相同地址、时段和包装，并从您的以下账户扣款：","4 Days' notice":"4 天","Late Fee comes OFF your AERA Credit.":"的迟改费用会从您的 AERA 储值金扣除。","Once Meals are cooked or delivered, that Delivery cannot be moved and is":"餐点一旦煮好或送出，该次送货就不能改期，并且","You can switch it OFF at any time. A Delivery already booked in the last 4 days still goes ahead.":"您随时可以关闭。最后 4 天内已预订的送货仍会照常进行。","Upcoming":"即将送达","Search by Order No or Meal":"按订单号或餐点搜索","No upcoming Orders.":"没有即将送达的订单。","See your Order History →":"查看订单记录 →","Past Orders are in Order History →":"过去的订单在「订单记录」里 →","No past Orders yet. Your Orders move here once they are Delivered or Collected.":"还没有过去的订单。订单送达或取餐后会移到这里。","Meals":"餐点","Spent":"消费","AP Earned":"赚取积分","Order Again":"再订一次","That Plan Is No Longer Saved":"这个餐单已不在","Build it again on the Personalised Meal Plan page, then add it to your Cart.":"请在个人定制餐单页重新建立，再加入购物车。","Build A Plan":"建立餐单","Nothing To Add":"没有可加入的餐点","These Meals are no longer on the menu.":"这些餐点已不在菜单上。","Add to Cart":"加入购物车","Delete This Plan?":"删除这个餐单？","Replace The Plan In Your Cart?":"替换购物车里的餐单？","Replace":"替换","Keep The Old One":"保留原来的","This Plan Has No Meals":"这个餐单没有餐点","Open & Tune This Plan first, then add it to your Cart.":"请先打开并调整这个餐单，再加入购物车。","Your Cart already has a Personalised Plan. Only one Plan fits in an Order, so this one takes its place.":"您的购物车里已经有一个个人定制餐单。每张订单只能放一个餐单，这个会取代它。","On for this Device":"本设备已开启","On iPhone : tap":"iPhone 上：点","Share":"分享","Add to Home Screen":"添加到主屏幕",", open":"，从主屏幕打开","from your Home Screen, sign in, then turn this on here.":"，登录后在这里开启。","Notifications are blocked for aeramealprep.net. Allow them in your browser or phone settings, then come back here.":"aeramealprep.net 的通知被封锁了。请在浏览器或手机设置里允许，然后回到这里。","Turn On Notifications":"开启通知","Alerts On Your Phone":"手机提醒","Know the moment a New Message arrives, without signing in to check.":"新讯息一到就知道，不用登录查看。","Phone Notifications":"手机通知","A pop-up on this Phone or Computer.":"在这台手机或电脑上弹出提醒。","Notifications are blocked for aeramealprep.net. Allow them in your browser or phone settings, then try again.":"aeramealprep.net 的通知被封锁了。请在浏览器或手机设置里允许，然后再试一次。","Please tap Allow to get notifications.":"请点「允许」以接收通知。","Could not reach the notification service. Please try again.":"无法连接通知服务，请再试一次。","Done. This device will get a notification for every new AERA message.":"完成。这台设备会收到每一则新的 AERA 讯息通知。","Notifications are off on this device.":"这台设备的通知已关闭。","Email alerts are on.":"电邮提醒已开启。","Email alerts are off.":"电邮提醒已关闭。","Setting up your AERA card…":"正在设置您的 AERA 卡…","Your card is taking longer than usual. Please try again in a minute.":"您的卡比平时久，请一分钟后再试。","Read":"已读","Not read yet":"未读","Get AERA Alerts On Your Phone":"在手机上接收 AERA 提醒","Never miss a message from AERA. Turn on notifications on your phone in under a minute. The steps for iPhone and Android are in the picture below. Tap it to enlarge.":"不错过 AERA 的任何讯息。一分钟内就能在手机上开启通知。iPhone 和 Android 的步骤在下面的图片里，点图片可放大。","View My Orders":"查看我的订单","Inbox":"收件箱","AERA Credit":"AERA 储值金","Auto Subscription":"自动订阅","Loading…":"加载中…","Received":"已收到","Send A Message":"发送讯息","Shop":"商店","We could not load your AERA Credit just now. Please try again in a moment.":"暂时无法读取您的 AERA 储值金，请稍后再试。","Your Balance":"您的余额","Top Up":"充值","Top-Up":"充值","History":"记录","No Top-Ups yet.":"还没有充值记录。","Want unused Credit back? WhatsApp us and we refund it.":"想退回未用完的储值金？WhatsApp 我们，我们会退款给您。","Your AERA Credit Is Running Low":"您的 AERA 储值金快用完了","You have":"您还有","Later":"稍后","Spent On An Order":"用于订单","Every Week":"每周","Every 2 Weeks":"每两周","Every Month":"每月","Start Auto Subscription":"开始自动订阅","Order this Plan once to start an Auto Subscription.":"先订购一次这个餐单，才能开始自动订阅。","Each delivery repeats your Order of this Plan — same address, time slot and packaging — and is paid from your":"每次送货都会重复您这个餐单的订单 — 相同地址、时段和包装 — 并从您的以下账户扣款：","To reschedule, give us":"如需改期，请提前","late fee comes off your AERA Credit.":"的迟改费用会从您的 AERA 储值金扣除。","Once Meals are cooked or delivered, that delivery cannot be moved and is":"餐点一旦煮好或送出，该次送货就不能改期，并且","not refunded":"不予退款","You can switch it off at any time. A delivery already booked in the last 4 days still goes ahead.":"您随时可以关闭。最后 4 天内已预订的送货仍会照常进行。","We do not deliver on Sundays.":"我们星期天不送货。","Checking your AERA Credit…":"正在查看您的 AERA 储值金…","Auto Subscription is paid from AERA Credit, so it needs at least":"自动订阅从 AERA 储值金扣款，所以至少需要","in Credit to start. You have":"的储值金才能开始。您目前有","Not Now":"暂时不要","How Often":"多久一次","First Delivery":"第一次送货","The earliest is 4 days from today, so the kitchen can prepare.":"最早是 4 天后，让厨房有时间准备。","I agree to these Auto Subscription rules.":"我同意以上自动订阅规则。","Please tick to agree to the rules first.":"请先勾选同意规则。","Pick a first delivery at least 4 days from today.":"请选择至少 4 天后的第一次送货日期。","Auto Subscription Started":"自动订阅已开始","See My Auto Subscription":"查看我的自动订阅","Something went wrong. Please try again.":"出了点问题，请再试一次。","Starting…":"开始中…","Delete This Message?":"删除这则讯息？","It will be removed from your Inbox. This cannot be undone.":"讯息会从收件箱移除，无法复原。","Delete":"删除","Keep It":"保留","Could Not Delete":"无法删除","Close":"关闭","No messages yet. News, offers and notes from AERA land here.":"还没有讯息。AERA 的消息、优惠和通知会出现在这里。","Select All":"全选","Tap the picture to zoom in or out":"点图片可放大或缩小","Tap a picture to enlarge it.":"点图片可放大。","Forward":"转发","No Auto Subscription yet. Open":"还没有自动订阅。打开","and press":"然后按","Active":"进行中","Paused":"已暂停","Off":"已关闭","Each Delivery":"每次送货","from AERA Credit":"从 AERA 储值金扣款","Paused because your AERA Credit does not cover the next delivery. Top up, then press Turn On.":"因为 AERA 储值金不够下一次送货而暂停。充值后再按「开启」。","Booked as Order":"已预订为订单","Reschedule":"改期","Turn Off":"关闭","Turn On":"开启","Your delivery is less than 4 days away. Moving it now is late notice and":"距离送货不到 4 天，现在改期属于迟改，","comes off your AERA Credit.":"会从您的 AERA 储值金扣除。","The new date must be at least 4 days from today.":"新日期必须至少是 4 天后。","Delivery Moved":"送货已改期","Your delivery is now on":"您的送货改到","Done":"完成","Turn Off Auto Subscription?":"关闭自动订阅？","No more deliveries of":"将不再预订","will be booked. Your AERA Credit stays in your account.":"的送货。您的 AERA 储值金会保留在账户里。","Keep It On":"继续开启","Auto Subscription Turned Off":"自动订阅已关闭","Turn On Auto Subscription":"开启自动订阅","You need at least":"您至少需要","in AERA Credit to turn it on. You have":"的 AERA 储值金才能开启。您目前有","Your booked delivery on":"您已预订的送货日期","Was Next":"原本的下一次","Move And Pay RM 20":"改期并支付 RM 20","Move Delivery":"改期送货","No more deliveries will be booked.":"之后不会再预订送货。","Portals":"入口","AERA Fridge":"AERA 冰柜","Referral Portal":"推荐人入口","Settings":"账户设置","Addresses":"收件地址","Meal Preferences":"饮食偏好","Weight Control":"体重管理",
"Your Orders":"您的订单","Order your First Meals →":"订购您的第一份餐点 →","No Favourites yet. Star a Plan on the":"还没有收藏。到","Personalised Meal Plan":"个人定制餐单","Page and it will appear here.":"页面为餐单加星，它就会出现在这里。","Everything you have keyed in on the Home-Sourced Meals Page. Add them to a plan from the “Your Week” step.":"您在「自备餐点」页面输入过的全部内容。可在「您的一周」步骤中加入餐单。","Nothing here yet. Look one up under Your Week on the Plan Page and it is kept for next time.":"这里还是空的。在餐单页面的「您的一周」中查找一次，就会保存下来供下次使用。","Add a Home-Sourced Meal →":"新增一份自备餐点 →","Your Personalised Meal Plans":"您的个人定制餐单","No Personalised Plans yet. Answer a few questions and we design every Meal to your Calories and Macros.":"还没有定制餐单。回答几个问题，我们就会按您的热量与营养比例设计每一餐。","Build a New Plan →":"制定新餐单 →",
"Available":"可用","Worth RM 5.00 off your next Orders":"相当于下次订单可折抵 RM 5.00","Earned":"已获得","Used":"已使用","Expired":"已过期","🎂 Add your date of birth under Details & Addresses to unlock a Birthday Treat : 15% OFF Meals during your birthday month, once a year.":"🎂 在「资料与地址」中填上出生日期，即可解锁生日礼遇：生日当月餐点 85 折，每年一次。","5 AP for every RM 1 on Meals · 100 AP = RM 1.00 · Up to 10% OFF an Order · Points expire 6 Months after earning. At Checkout your Points are applied automatically when you are signed in.":"餐点每消费 RM 1 得 5 AP · 100 AP = RM 1.00 · 单笔订单最多折抵 10% · 积分自获得起 6 个月后失效。登录后结账时会自动套用您的积分。","Date":"日期","Details":"明细","Expires":"到期","Welcome Gift — 500 AERA Points":"迎新礼 — 500 AERA 积分","Your Referrer":"您的推荐人","You are not registered under a Referrer yet. If a Gym, Studio or Coach gave you a Code, enter it at Checkout. Your first paid Order ties it to your Account and you start earning an extra 3% of your Meal Subtotal in AERA Points.":"您还没有登记在任何推荐人名下。若健身房、工作室或教练给了您代码，请在结账时输入。第一笔付款订单会把代码绑定到您的账户，之后您会额外获得餐点小计 3% 的 AERA 积分。",
"Date Of Birth":"出生日期","Day":"日","Month":"月","Year":"年","Jan":"1 月","Feb":"2 月","Mar":"3 月","Apr":"4 月","May":"5 月","Jun":"6 月","Jul":"7 月","Aug":"8 月","Sep":"9 月","Oct":"10 月","Nov":"11 月","Dec":"12 月","For your Birthday Treat and your Personalised Meal Plan.":"用于生日礼遇与您的个人定制餐单。","Preferred Packaging":"偏好的包装","MAP Bento Box":"MAP 保鲜餐盒","Vacuum Bag":"真空袋","Save Details":"保存资料","Mobile ( Rider Contact )":"手机号码（骑手联络）","Not verified yet":"尚未验证","Send Me A Code":"寄验证码给我","A Mobile Number can belong to one AERA Account only. It is what our Riders call when they arrive.":"一个手机号码只能绑定一个 AERA 账户。骑手抵达时会拨打这个号码。","Saved Addresses appear at Checkout, so you can pick one instead of typing it again.":"已保存的地址会出现在结账页，可直接选取，不必重新输入。","No saved Addresses yet. Add one below and Checkout will use it automatically.":"还没有保存的地址。在下方新增一个，结账时就会自动使用。","Add an Address":"新增地址","Save Address":"保存地址",
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
AERA_I18N_RE.push([/^We Email a Code to (.+) to confirm the change\.$/,'我们会发验证码到 $1 以确认更改。']);
AERA_I18N_RE.push([/^(.+) · (\d+) Meals?$/,'$1 · $2 份餐'],[/^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) (\d{4})$/,function(x,mo,y){return y+' 年 '+(['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'].indexOf(mo)+1)+' 月'}]);
AERA_I18N_RE.push([/^(.+) will be removed from My Meal Plans\. Orders you already placed with it are not affected\.$/,'$1 会从「我的餐单」移除。已用它下的订单不受影响。']);
AERA_I18N_RE.push([/^Payment Successful · (.+)$/,'付款成功 · $1'],[/^To (\S+@\S+)$/,'发送至 $1']);
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

/* the My AERA overview ( homepage when signed in, and My Account ) in Chinese : status, delivery card, cash-back */
(function(){try{var D=window.AERA_I18N=window.AERA_I18N||{},R=window.AERA_I18N_RE=window.AERA_I18N_RE||[];
 Object.assign(D,{"Next Delivery":"下次配送","Preparing":"准备中","In the kitchen":"厨房制作中","Packed · rider booked":"已打包 · 已预约骑手",
  "On the way":"配送中","Delivered":"已送达","Cancelled":"已取消","item":"项","items":"项","order":"笔订单","orders":"笔订单",
  "Counted into your plan alongside what our kitchen cooks.":"会和我们厨房烹制的餐点一起计入您的餐单。","Manage":"管理",
  "Cash-Back":"现金回馈","due":"待付","Referral statements":"推荐结单","Nothing on its way at the moment.":"目前没有正在配送的订单。",
  "Self Pick-Up":"自取"});
 var WD={SUN:'日',MON:'一',TUE:'二',WED:'三',THU:'四',FRI:'五',SAT:'六'},MO=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
 function dt(w,d,mo,y){return y+' 年 '+(MO.indexOf(mo)+1)+' 月 '+d+' 日（周'+WD[w]+'）'}
 var DL=/(SUN|MON|TUE|WED|THU|FRI|SAT), (\d+)(?:st|nd|rd|th) (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) (\d{4})/;
 function hr(s){return s.replace(/(\d+) (AM|PM)/g,function(m,h,p){return (p==='AM'?'上午 ':'下午 ')+h+' 点'})}
 R.unshift(
  [/^(SUN|MON|TUE|WED|THU|FRI|SAT), (\d+)(?:st|nd|rd|th) (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) (\d{4})$/,function(m,w,d,mo,y){return dt(w,d,mo,y)}],
  [/^Last on (.+)$/,function(m,x){var k=DL.exec(x);return '最近一次：'+(k?dt(k[1],k[2],k[3],k[4]):x)}],
  [/^(\d+ (?:AM|PM) - \d+ (?:AM|PM))( · Self Pick-Up)?$/,function(m,s,p){return hr(s)+(p?' · 自取':'')}],
  [/^ ?· Self Pick-Up$/,' · 自取'],
  [/^(.+?) · (\d+) Orders all together$/,'$1 · 共 $2 笔订单'],
  [/^(RM [\d,.]+) earned all together$/,'累计赚取 $1'],
  [/^([\d.]+)% of the meal subtotal on every order placed with your code\.$/,'每笔使用您推荐码的订单，可获餐点小计的 $1%。']);
 var go=function(){try{if(window.aeraRetranslate)window.aeraRetranslate()}catch(e){}};
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(go,50)});else setTimeout(go,50)}catch(e){}})();