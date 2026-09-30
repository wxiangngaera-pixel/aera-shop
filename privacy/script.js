var TX={en:{t:'Privacy Notice',u:'Last updated 21 September 2026',f:'Terms &amp; Conditions'},
 bm:{t:'Notis Privasi',u:'Kemas kini terakhir 21 September 2026',f:'Terma &amp; Syarat'}};
function setL(l){if(!TX[l])l='en';
 document.getElementById('en').hidden=(l!=='en');document.getElementById('bm').hidden=(l!=='bm');
 document.getElementById('bEN').className=l==='en'?'on':'';document.getElementById('bBM').className=l==='bm'?'on':'';
 document.getElementById('ttl').textContent=TX[l].t;document.getElementById('upd').textContent=TX[l].u;
 document.querySelector('#ft a').innerHTML=TX[l].f;
 document.documentElement.lang=(l==='bm'?'ms':'en');
 try{history.replaceState(null,'',l==='bm'?'#bm':'#en')}catch(e){}}
(function(){var h=(location.hash||'').toLowerCase();if(h==='#bm'||h==='#ms')setL('bm')})();