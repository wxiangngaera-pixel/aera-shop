var TX={en:{t:"Terms & Conditions",u:"Last updated 21 September 2026"},zh:{t:"条款与条件",u:"最后更新：2026年9月21日"}};
function setL(l){if(!TX[l])l="en";
 document.getElementById("en").hidden=(l!=="en");document.getElementById("zh").hidden=(l!=="zh");
 document.getElementById("bEN").className=l==="en"?"on":"";document.getElementById("bZH").className=l==="zh"?"on":"";
 document.getElementById("ttl").textContent=TX[l].t;document.getElementById("upd").textContent=TX[l].u;
 document.title=TX[l].t+" — AERA Meal Prep";document.documentElement.lang=(l==="zh"?"zh-Hans":"en");
 try{history.replaceState(null,"",l==="zh"?"#zh":location.pathname+location.search)}catch(e){}}
(function(){var h=(location.hash||"").toLowerCase(),site="";try{site=localStorage.getItem("aera_lang")||""}catch(e){}
 if(h==="#zh"||(site==="zh"&&h!=="#en"))setL("zh")})();