/* AERA notification worker. My Account registers this file as a service worker ( scope /push/ ).
   It only shows AERA Inbox alerts and opens the Inbox when one is tapped. On a normal page it does nothing. */
(function(){
 if(typeof ServiceWorkerGlobalScope==='undefined'||!(self instanceof ServiceWorkerGlobalScope))return;
 var INBOX='https://aeramealprep.net/account/#inbox';
 var ICON='https://swpprjvubgcdsojapaad.supabase.co/functions/v1/aera-push?icon=192';
 var BADGE='https://swpprjvubgcdsojapaad.supabase.co/functions/v1/aera-push?icon=badge';
 self.addEventListener('install',function(){self.skipWaiting()});
 self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
 self.addEventListener('push',function(e){
  var d={};try{d=e.data?e.data.json():{}}catch(x){d={body:e.data?e.data.text():''}}
  /* the number on the app icon, like WhatsApp ( sent with kitchen New Order alerts ) */
  var nb=parseInt(d.badge,10);if(nb>=0&&self.navigator&&self.navigator.setAppBadge){try{(nb?self.navigator.setAppBadge(nb):self.navigator.clearAppBadge()).catch(function(){})}catch(x){}}
  e.waitUntil(self.registration.showNotification(d.title||'New message from AERA',{
   body:d.body||'You have a new message in your AERA Inbox.',icon:ICON,badge:BADGE,
   tag:d.tag||'aera-inbox',renotify:true,data:{url:d.url||INBOX}}));
 });
 self.addEventListener('notificationclick',function(e){
  e.notification.close();var u=(e.notification.data&&e.notification.data.url)||INBOX;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(L){
   for(var i=0;i<L.length;i++){var c=L[i];if(/\/account\//.test(c.url)&&'focus' in c){try{c.postMessage({aera:'inbox'})}catch(x){}return c.focus()}}
   return self.clients.openWindow(u)}));
 });
})();
