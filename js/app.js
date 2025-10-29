// js/app.js
// Globale Helfer, Effekte & SVGs – von allen Stufen genutzt.

// ---------- Utils ----------
function shuffle(arr){ return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]); }

function spawnConfetti(count=40){
  for(let i=0;i<count;i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = (Math.random()*100)+'vw';
    c.style.background = `hsl(${Math.random()*360},85%,60%)`;
    c.style.animationDuration = (2+Math.random()*2.5)+'s';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),4000);
  }
}

function flash(x,y){
  const b=document.createElement('div');
  b.className='burst';
  b.style.left=x+'px'; b.style.top=y+'px';
  document.body.appendChild(b);
  setTimeout(()=>b.remove(),450);
}

function setHP(barEl,value){ if(!barEl) return; barEl.style.width=Math.max(0, value)+'%'; }

// ---------- SVGs ----------
function heroSVG(){
  return `
  <svg viewBox="0 0 120 120">
    <defs><linearGradient id="cape" x1="0" x2="1">
      <stop offset="0" stop-color="#ffd24d"/><stop offset="1" stop-color="#ff9f3b"/></linearGradient></defs>
    <circle cx="60" cy="32" r="14" fill="#ffe8b3" />
    <rect x="50" y="46" width="20" height="38" rx="8" fill="#3a95ff"/>
    <path d="M50 56 Q20 86 60 92" fill="url(#cape)" class="glow">
      <animate attributeName="d" dur="2s" repeatCount="indefinite"
        values="M50 56 Q20 86 60 92; M50 56 Q18 80 58 88; M50 56 Q20 86 60 92"/>
    </path>
    <rect x="56" y="84" width="8" height="26" rx="3" fill="#2dd36f"/>
  </svg>`;
}

function bossSVG(stage){
  if(stage===1){ // Hera
    return `<svg viewBox="0 0 120 120">
      <ellipse cx="60" cy="80" rx="26" ry="20" fill="#8b2e5d"/>
      <circle cx="60" cy="40" r="16" fill="#f9d4dd"/>
      <path d="M30 46 L90 46" stroke="#ffd24d" stroke-width="4"/>
      <circle cx="60" cy="18" r="8" fill="#ffd24d"/>
    </svg>`;
  }
  if(stage===2){ // Poseidon
    return `<svg viewBox="0 0 120 120">
      <ellipse cx="60" cy="80" rx="28" ry="22" fill="#2a6fb3"/>
      <circle cx="60" cy="40" r="16" fill="#cce7ff"/>
      <path d="M48 18 C55 10, 65 10, 72 18" stroke="#3a95ff" stroke-width="6" fill="none"/>
      <path d="M60 0 L58 14 L62 14 Z" fill="#3a95ff"/>
    </svg>`;
  }
  // Zeus
  return `<svg viewBox="0 0 120 120">
    <ellipse cx="60" cy="82" rx="30" ry="24" fill="#b33a2a"/>
    <circle cx="60" cy="40" r="18" fill="#ffe0cc"/>
    <polygon points="40,6 80,6 60,26" fill="#ffd24d"/>
    <path d="M32 50 L88 50" stroke="#ffd24d" stroke-width="5"/>
  </svg>`;
}

// ---------- Projektile & FX ----------
function throwSpear(fromEl, toEl, onHit){
  const a = fromEl.getBoundingClientRect();
  const b = toEl.getBoundingClientRect();
  const spear = document.createElement('div');
  spear.className='spear';
  spear.style.left = (a.left + a.width*0.75)+'px';
  spear.style.top  = (a.top + a.height*0.5)+'px';
  spear.style.transform = 'translate(0,0) rotate(0deg)';
  spear.style.position='fixed';
  document.body.appendChild(spear);

  const dx = (b.left + b.width*0.2) - (a.left + a.width*0.75);
  const dy = (b.top + b.height*0.45) - (a.top + a.height*0.5);
  const ang = Math.atan2(dy,dx) * 180/Math.PI;

  requestAnimationFrame(()=>{
    spear.style.transition='transform .56s linear';
    spear.style.transform = `translate(${dx}px, ${dy}px) rotate(${ang}deg)`;
  });

  setTimeout(()=>{
    flash(b.left + b.width*0.35, b.top + b.height*0.4);
    spear.remove();
    if(typeof onHit === 'function') onHit();
  }, 570);
}

function castLightning(fromEl, toEl, onHit){
  const a = fromEl.getBoundingClientRect();
  const b = toEl.getBoundingClientRect();
  const x1 = a.left + a.width*0.5, y1 = a.top+10;
  const x2 = b.left + b.width*0.5, y2 = b.top + b.height*0.2;

  const bolt = document.createElement('div');
  bolt.className='lightning';
  bolt.style.position='fixed';
  bolt.style.left = x1+'px'; bolt.style.top = y1+'px';
  const len = Math.hypot(x2-x1, y2-y1);
  bolt.style.height = len+'px';
  const ang = Math.atan2((y2-y1),(x2-x1))*180/Math.PI + 90;
  bolt.style.transform = `rotate(${ang}deg)`;
  document.body.appendChild(bolt);

  setTimeout(()=>{ flash(x2,y2); bolt.remove(); if(typeof onHit==='function') onHit(); }, 180);
}

// Expose (optional)
window.shuffle = shuffle;
window.spawnConfetti = spawnConfetti;
window.heroSVG = heroSVG;
window.bossSVG = bossSVG;
window.throwSpear = throwSpear;
window.castLightning = castLightning;
window.setHP = setHP;
