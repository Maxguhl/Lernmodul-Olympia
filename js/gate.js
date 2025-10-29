// js/gate.js
// Gate-Quiz: 6 Fragen (Choice/TrueFalse). Score -> unlock Stufe 2/3.

const GATE = [
    { type:'choice',    prompt:'Wo starteten die ersten modernen Spiele (1896)?', options:['London','Athen','Paris'], answer:'Athen' },
    { type:'truefalse', prompt:'Die antiken Spiele ehrten den Gott Zeus.',        answer:true },
    { type:'choice',    prompt:'Wie viele Ringe hat das olympische Symbol?',      options:['4','5','6'], answer:'5' },
    { type:'choice',    prompt:'Erste Winterspiele (1924) fanden statt in…',      options:['Chamonix','Oslo','St. Moritz'], answer:'Chamonix' },
    { type:'truefalse', prompt:'Biathlon ist eine Sommerdisziplin.',              answer:false },
    { type:'choice',    prompt:'„Citius, Altius, Fortius“ bedeutet…',             options:['Schneller, höher, stärker','Größer, schwerer, weiter','Schneller, weiter, fairer'], answer:'Schneller, höher, stärker' }
  ];
  
  const host     = document.getElementById('gate-quiz');
  const nextBtn  = document.getElementById('btnNextGate');
  const resultEl = document.getElementById('gateResult');
  
  let idx=0, score=0, currentValue=null;
  
  function renderGateQuestion(){
    if(idx>=GATE.length){ finishGate(); return; }
    const q=GATE[idx];
  
    host.innerHTML = `
      <h2><span class="badge">Frage ${idx+1}/${GATE.length}</span> ${q.prompt}</h2>
      <div class="q-block" id="qBlock"></div>
    `;
    const block = document.getElementById('qBlock');
    currentValue = null;
    nextBtn.disabled = true;
    nextBtn.textContent = (idx === GATE.length-1) ? 'Auswerten' : 'Weiter';
  
    if(q.type==='choice'){
      const row=document.createElement('div'); row.className='q-row';
      (q.options||[]).forEach(opt=>{
        const b=document.createElement('button'); b.className='option'; b.textContent=opt;
        b.onclick=()=>{ row.querySelectorAll('.option').forEach(o=>o.classList.remove('active')); b.classList.add('active'); currentValue=opt; nextBtn.disabled=false; };
        row.appendChild(b);
      });
      block.appendChild(row);
    }else if(q.type==='truefalse'){
      const row=document.createElement('div'); row.className='q-row';
      [{label:'Wahr',val:true},{label:'Falsch',val:false}].forEach(x=>{
        const b=document.createElement('button'); b.className='option'; b.textContent=x.label;
        b.onclick=()=>{ row.querySelectorAll('.option').forEach(o=>o.classList.remove('active')); b.classList.add('active'); currentValue=x.val; nextBtn.disabled=false; };
        row.appendChild(b);
      });
      block.appendChild(row);
    }
  }
  
  function checkGateQuestion(){
    const q=GATE[idx];
    let ok=false;
    if(q.type==='choice'){
      ok = String(currentValue).trim().toLowerCase() === String(q.answer).trim().toLowerCase();
    } else if(q.type==='truefalse'){
      ok = currentValue === q.answer;
    }
    if(ok) score++;
  }
  
  function finishGate(){
    host.innerHTML = '';
    let msg = `Dein Ergebnis: ${score}/${GATE.length}. `;
    if(score>=5){
      localStorage.setItem('unlocked2','true');
      localStorage.setItem('unlocked3','true');
      msg += '🎉 Stufe 2 & 3 freigeschaltet!';
    } else if(score>=3){
      localStorage.setItem('unlocked2','true');
      msg += '🎉 Stufe 2 freigeschaltet!';
    } else {
      msg += 'Zu wenig richtige Antworten – versuch es nochmal!';
    }
    resultEl.textContent = msg;
    nextBtn.style.display='none';
  }
  
  nextBtn.addEventListener('click', ()=>{
    if(nextBtn.disabled) return;
    checkGateQuestion();
    idx++;
    renderGateQuestion();
  });
  
  renderGateQuestion();
  