(function(){
const isImmo=location.pathname.includes('immobilier');
function getData(){try{return isImmo?{properties:typeof properties!=='undefined'?properties:[],clients:typeof clients!=='undefined'?clients:[]}: {db:typeof DB!=='undefined'?DB:{}}}catch(e){return {}}}
function reply(q){
const d=getData(), s=q.toLowerCase();
if(isImmo){
const ps=d.properties||[],cs=d.clients||[];
if(/bien|disponib|maison|appart|عقار/.test(s)){const a=ps.filter(x=>/disponible/i.test(x.status||''));return a.length+' biens disponibles (démo):\n'+a.slice(0,5).map(x=>(x.title||x.type||x.id)+' — '+(x.city||'')+' — '+(x.price||x.prix||'?')+' DT').join('\n')}
if(/client|prospect|relanc|حريف/.test(s)){return cs.length+' clients (démo):\n'+cs.slice(0,6).map(x=>(x.name||x.id)+' — '+(x.city||'')+' — budget '+(x.budget||'?')+' DT').join('\n')}
return 'Démo immobilier: '+ps.length+' biens et '+cs.length+' clients. Essayez « biens disponibles » ou « clients à relancer ».';
}
const db=d.db||{},cars=db.cars||db.vehicles||[],res=db.reservations||[];
if(/voitur|véhicul|disponib|كرهبة/.test(s))return cars.length+' véhicules (démo):\n'+cars.slice(0,6).map(x=>(x.brand||x.make||'')+' '+(x.model||'')+' — '+(x.status||'')).join('\n');
if(/retard|retour/.test(s)){const late=res.filter(x=>x.returnDate&&new Date(x.returnDate)<new Date()&&/active|confirm/i.test(x.status||''));return late.length+' retours potentiellement en retard (démo).\n'+late.slice(0,5).map(x=>x.id+' — '+x.returnDate).join('\n')}
return res.length+' réservations (démo). Essayez « voitures disponibles » ou « retours en retard ».';
}
function init(){
if(document.getElementById('az-ai-launch'))return;
const style=document.createElement('style');style.textContent='#az-ai-launch{position:fixed;bottom:22px;right:22px;z-index:999999;background:#17449e;color:white;border:0;border-radius:30px;padding:15px;cursor:pointer;font-weight:bold}#az-ai-panel{position:fixed;bottom:80px;right:22px;z-index:999999;width:min(390px,calc(100vw - 32px));height:480px;background:white;color:#16213d;border-radius:16px;box-shadow:0 12px 45px #0005;display:none;flex-direction:column;overflow:hidden;font:14px Arial}#az-ai-panel.open{display:flex}#az-ai-panel header{background:#17449e;color:white;padding:16px;display:flex;justify-content:space-between}#az-ai-panel button{cursor:pointer}#az-ai-log{flex:1;overflow:auto;padding:14px;white-space:pre-wrap}#az-ai-log div{background:#eef2fa;padding:10px;border-radius:10px;margin:7px 0}#az-ai-log .user{background:#d9eafe;margin-left:30px}#az-ai-panel footer{display:flex;padding:10px;gap:5px}#az-ai-input{flex:1;min-width:0;padding:10px;border:1px solid #ddd}#az-ai-panel footer button{border:0;background:#17449e;color:white;padding:9px;border-radius:7px}';document.head.appendChild(style);
const btn=document.createElement('button');btn.id='az-ai-launch';btn.textContent='✦ AZNAVO ONE AI';
const panel=document.createElement('section');panel.id='az-ai-panel';panel.innerHTML='<header><strong>✦ AZNAVO ONE AI</strong><button id="az-ai-close">✕</button></header><div id="az-ai-log"></div><small style="padding:9px;color:#667">Démo avec données fictives. Sans connexion à un modèle IA externe.</small><footer><input id="az-ai-input" placeholder="Votre question..."><button id="az-ai-mic">🎙</button><button id="az-ai-send">➤</button></footer>';
document.body.append(btn,panel);const log=panel.querySelector('#az-ai-log'),inp=panel.querySelector('#az-ai-input');
function add(t,user){const e=document.createElement('div');e.textContent=t;if(user)e.className='user';log.append(e);log.scrollTop=log.scrollHeight}
add('Bonjour ! Demandez-moi un résumé des données de démonstration.');
function send(){const q=inp.value.trim();if(!q)return;add(q,true);inp.value='';try{add(reply(q))}catch(e){add('Données indisponibles dans cette vue.')}}
btn.onclick=()=>panel.classList.toggle('open');panel.querySelector('#az-ai-close').onclick=()=>panel.classList.remove('open');panel.querySelector('#az-ai-send').onclick=send;inp.onkeydown=e=>{if(e.key==='Enter')send()};
panel.querySelector('#az-ai-mic').onclick=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){add('Reconnaissance vocale indisponible sur ce navigateur.');return}const r=new SR();r.lang='fr-FR';r.onresult=e=>{inp.value=e.results[0][0].transcript;send()};r.start()};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();