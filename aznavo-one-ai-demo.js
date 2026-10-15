(function(){
const isImmo=location.pathname.includes('immobilier');
function getData(){try{return isImmo?{properties:typeof properties!=='undefined'?properties:[],clients:typeof clients!=='undefined'?clients:[]}: {db:typeof DB!=='undefined'?DB:{}}}catch(e){return {}}}
function reply(q){
const d=getData(),s=q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const tun=/\b(fema|famma|chneya|chnowa|nheb|andek|andi|9adeh|kadeh|warini|a3tini|hathom|kol|dar|karhba|kraheb|mawjoud|mawjoudin|soum|flous|yekri|mouch|b9adeh|win|3andek)\b|[\u0600-\u06ff]/i.test(s);
const say=(tn,fr)=>tun?tn:fr;
const contains=(...words)=>words.some(w=>s.includes(w));
const fmt=x=>Number(x||0).toLocaleString('fr-TN')+' DT';
if(contains('bonjour','salut','salam','asslema','عسلامة','مرحبا','اهلا'))return say('عسلامة! 😊 أنا مساعد AZNAVO. اسألني على العقارات، الكليونات، الميزانية ولا الحجوزات.','Bonjour ! 😊 Je peux vous renseigner sur les données de la démo. Posez-moi une question.');
if(isImmo){
const ps=d.properties||[],cs=d.clients||[];
const city=(s.match(/(?:fi|في|a|à)\s+(tunis|sousse|sfax|en(n)?asr|marsa|ariana|lac|manar)/i)||[])[1];
const type=(s.match(/s\s*\+\s*[0-9]/i)||[])[0];
const budget=(s.match(/(\d[\d\s.,]*)(?:\s*(?:dt|dinar|دينار|mille|alf|ألف))?/i)||[])[1];
const askHouse=contains('dar','maison','appart','bien','propri','villa','studio','s+','s +','عقار','دار','شقة','منزل','عندك','fema','famma','disponib','mawjoud');
if(askHouse){
let filtered=ps.filter(x=>/disponible/i.test(String(x.status||'')));
if(type)filtered=filtered.filter(x=>JSON.stringify(x).toLowerCase().includes(type.replace(/\s/g,'').toLowerCase())||JSON.stringify(x).toLowerCase().includes(type.toLowerCase()));
if(city)filtered=filtered.filter(x=>JSON.stringify(x).toLowerCase().includes(city.toLowerCase()));
const raw=s.match(/(\d[\d\s]{4,})\s*(?:dt|dinars?|دينار)?/i);
if(raw){const max=Number(raw[1].replace(/\s/g,''));if(max>=10000)filtered=filtered.filter(x=>Number(x.price||x.prix||0)<=max);}
if(!filtered.length)return say('ما لقيتش عقارات مطابقة للمعايير هاذم في الديمو. جرّب تبدّل المنطقة ولا الميزانية.','Aucun bien correspondant dans les données de démonstration. Essayez une autre zone ou un autre budget.');
return say('إي، لقيت '+filtered.length+' عقار متوفر في الديمو:\n','J’ai trouvé '+filtered.length+' biens disponibles dans la démo :\n')+filtered.slice(0,6).map(x=>'• '+(x.title||x.type||x.name||x.id)+' — '+(x.city||x.location||'')+' — '+fmt(x.price||x.prix)).join('\n')+(filtered.length>6?'\n…':'');
}
if(contains('client','prospect','relanc','حريف','كليون','متابعة','budget')){
const filtered=cs.filter(x=>!/conclu|vendu|signé/i.test(String(x.status||'')));
return say('عنا '+filtered.length+' كليون يستحقّوا متابعة حسب statut في الديمو:\n','Il y a '+filtered.length+' clients à suivre selon leur statut dans la démo :\n')+filtered.slice(0,6).map(x=>'• '+(x.name||x.id)+' — '+(x.city||'')+' — '+fmt(x.budget)).join('\n')+'\n'+say('هاذي قائمة مقترحة، موش relances تبعثت.','Aucune relance n’a été envoyée.');
}
if(contains('combien','9adeh','قداش','total','statistique','rapport'))return say('في الديمو عنا '+ps.length+' عقار و'+cs.length+' كليون.','Dans la démo : '+ps.length+' biens et '+cs.length+' clients.');
return say('نفهمك. تنجم تسألني مثلاً: «fema dar s+2 ?»، «ورّيني العقارات المتوفرة»، «شكون الكليونات اللي يلزم نتابعوهم؟».','Je peux chercher des biens disponibles, afficher les clients à suivre ou résumer le portefeuille. Essayez une question plus précise.');
}
const db=d.db||{},cars=db.cars||db.vehicles||[],res=db.reservations||[],customers=db.customers||[];
if(contains('voitur','vehicul','auto','car','كرهبة','kraheb','karhba','disponib','mawjoud')){
const a=cars.filter(x=>/disponib|available/i.test(String(x.status||'')));
return say('في الديمو عنا '+cars.length+' كرهبة، منهم '+a.length+' متوفرين:\n','Dans la démo : '+cars.length+' véhicules, dont '+a.length+' disponibles :\n')+a.slice(0,6).map(x=>'• '+(x.brand||x.make||'')+' '+(x.model||'')+' — '+(x.plate||x.licensePlate||x.id||'')).join('\n');
}
if(contains('retard','retour','late','تأخير','رجوع')){
const late=res.filter(x=>x.returnDate&&new Date(x.returnDate)<new Date()&&/active|confirm/i.test(String(x.status||'')));
return say('فمّا '+late.length+' retour محتمل متأخر في الديمو:\n','Retours potentiellement en retard : '+late.length+'\n')+late.slice(0,5).map(x=>'• '+x.id+' — '+x.returnDate).join('\n');
}
if(contains('reserv','booking','حجز','rendez','موعد'))return say('عنا '+res.length+' réservation في الديمو.\n','Il y a '+res.length+' réservations dans la démo.\n')+res.slice(0,6).map(x=>'• '+x.id+' — '+x.status).join('\n');
if(contains('client','حريف','كليون'))return say('عنا '+customers.length+' كليون في الديمو.','Il y a '+customers.length+' clients dans la démo.');
return say('تنجم تسألني على الكراهب المتوفرة، الحجوزات، ولا retours en retard.','Je peux répondre sur les véhicules disponibles, les réservations et les retours en retard.');
}
function init(){
if(document.getElementById('az-ai-launch'))return;
const style=document.createElement('style');style.textContent='#az-ai-launch{position:fixed;bottom:22px;right:22px;z-index:999999;background:#17449e;color:white;border:0;border-radius:30px;padding:15px;cursor:pointer;font-weight:bold}#az-ai-panel{position:fixed;bottom:80px;right:22px;z-index:999999;width:min(390px,calc(100vw - 32px));height:480px;background:white;color:#16213d;border-radius:16px;box-shadow:0 12px 45px #0005;display:none;flex-direction:column;overflow:hidden;font:14px Arial}#az-ai-panel.open{display:flex}#az-ai-panel header{background:#17449e;color:white;padding:16px;display:flex;justify-content:space-between}#az-ai-panel button{cursor:pointer}#az-ai-log{flex:1;overflow:auto;padding:14px;white-space:pre-wrap}#az-ai-log div{background:#eef2fa;padding:10px;border-radius:10px;margin:7px 0}#az-ai-log .user{background:#d9eafe;margin-left:30px}#az-ai-panel footer{display:flex;padding:10px;gap:5px}#az-ai-input{flex:1;min-width:0;padding:10px;border:1px solid #ddd}#az-ai-panel footer button{border:0;background:#17449e;color:white;padding:9px;border-radius:7px}';document.head.appendChild(style);
const btn=document.createElement('button');btn.id='az-ai-launch';btn.textContent='✦ AZNAVO ONE AI';
const panel=document.createElement('section');panel.id='az-ai-panel';panel.innerHTML='<header><strong>✦ AZNAVO ONE AI</strong><button id="az-ai-close">✕</button></header><div id="az-ai-log"></div><small style="padding:9px;color:#667">Assistant multilingue de démonstration (tounsi, arabe, français). Réponses basées sur des règles et des données fictives, sans LLM.</small><footer><input id="az-ai-input" placeholder="Votre question..."><button id="az-ai-mic">🎙</button><button id="az-ai-send">➤</button></footer>';
document.body.append(btn,panel);const log=panel.querySelector('#az-ai-log'),inp=panel.querySelector('#az-ai-input');
function add(t,user){const e=document.createElement('div');e.textContent=t;if(user)e.className='user';log.append(e);log.scrollTop=log.scrollHeight}
add('Bonjour ! Demandez-moi un résumé des données de démonstration.');
function send(){const q=inp.value.trim();if(!q)return;add(q,true);inp.value='';try{add(reply(q))}catch(e){add('Données indisponibles dans cette vue.')}}
btn.onclick=()=>panel.classList.toggle('open');panel.querySelector('#az-ai-close').onclick=()=>panel.classList.remove('open');panel.querySelector('#az-ai-send').onclick=send;inp.onkeydown=e=>{if(e.key==='Enter')send()};
panel.querySelector('#az-ai-mic').onclick=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){add('Reconnaissance vocale indisponible sur ce navigateur.');return}const r=new SR();r.lang='fr-FR';r.onresult=e=>{inp.value=e.results[0][0].transcript;send()};r.start()};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();