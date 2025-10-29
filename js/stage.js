// js/stage.js
// Stage Engine: Fragen rendern -> prüfen -> bei richtig Held greift an, bei falsch Boss.
// Fix: Confirm-Button zuverlässig, Normalisierung der Vergleiche, Animation-Callbacks robust.

(function(){
    const stage = window.STAGE || 1;
    let heroHP = 100, bossHP = 100, qIndex = 0, busy=false, timerId=null;
  
    const elInfo   = document.getElementById('stageInfo');
    const elQuiz   = document.getElementById('quizArea');
    const elRes    = document.getElementById('stageResult');
    const barHero  = document.getElementById('hpHero');
    const barBoss  = document.getElementById('hpBoss');
    const heroEl   = document.getElementById('heroSVG');
    const bossEl   = document.getElementById('bossSVG');
  
    // Avatare
    heroEl.innerHTML = heroSVG();
    bossEl.innerHTML = bossSVG(stage);
  
    document.getElementById('btnStartStage')?.addEventListener('click', ()=>{
      elInfo.style.display='none';
      qIndex = 0;
      nextQuestion();
    });
  
    function updHP(){ setHP(barHero, heroHP); setHP(barBoss, bossHP); }
    updHP();
  
    function clearTimer(){ if(timerId){ cancelAnimationFrame(timerId); timerId=null; } }
  
    function nextQuestion(){
      if(busy) return;
      clearTimer();
      elRes.textContent='';
      const list = window.stageQuestions || [];
      if(!list.length){ elQuiz.innerHTML = '<div class="failure">Keine Fragen definiert.</div>'; return; }
      if(qIndex >= list.length) qIndex = 0; // schleife bis Boss fällt
      renderQuestion(list[qIndex]);
    }
  
    // Helpers
    function makeConfirm(actions, label='Bestätigen'){
      const b=document.createElement('button'); b.className='btn'; b.textContent=label; b.disabled=true; actions.appendChild(b); return b;
    }
    function enableConfirm(btn,on){ if(btn) btn.disabled=!on; }
    function shake(el){ el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
    function norm(v){ if(Array.isArray(v)) return v.map(s=>String(s).trim().toLowerCase()); if(v!=null) return String(v).trim().toLowerCase(); return v; }
  
    function renderQuestion(q){
      elQuiz.innerHTML='';
      const head=document.createElement('h2');
      head.innerHTML=`<span class="badge">Frage ${qIndex+1}</span> ${q.prompt}`;
      elQuiz.appendChild(head);
  
      const block=document.createElement('div'); block.className='q-block'; elQuiz.appendChild(block);
      const actions=document.createElement('div'); actions.className='q-actions'; elQuiz.appendChild(actions);
      const hint=document.createElement('div'); hint.className='hint'; elQuiz.appendChild(hint);
  
      const state={data:null};
      const confirmBtn = makeConfirm(actions);
  
      function requireSelection(){ if(confirmBtn.disabled){ shake(confirmBtn); hint.textContent='Bitte triff eine Auswahl.'; return true; } return false; }
  
      if(q.type==='choice'){
        const row=document.createElement('div'); row.className='q-row';
        (q.options||[]).forEach(opt=>{
          const btn=document.createElement('button'); btn.className='option'; btn.textContent=opt;
          btn.onclick=()=>{ row.querySelectorAll('.option').forEach(o=>o.classList.remove('active')); btn.classList.add('active'); state.data=opt; enableConfirm(confirmBtn,true); hint.textContent=''; };
          row.appendChild(btn);
        });
        block.appendChild(row);
        confirmBtn.onclick=()=>{ if(requireSelection()) return; check(q,state.data); };
      }
  
      else if(q.type==='truefalse'){
        const row=document.createElement('div'); row.className='q-row';
        [{label:'Wahr',val:true},{label:'Falsch',val:false}].forEach(x=>{
          const btn=document.createElement('button'); btn.className='option'; btn.textContent=x.label;
          btn.onclick=()=>{ row.querySelectorAll('.option').forEach(o=>o.classList.remove('active')); btn.classList.add('active'); state.data=x.val; enableConfirm(confirmBtn,true); hint.textContent=''; };
          row.appendChild(btn);
        });
        block.appendChild(row);
        confirmBtn.onclick=()=>{ if(requireSelection()) return; check(q,state.data); };
      }
  
      else if(q.type==='multiselect'){
        const row=document.createElement('div'); row.className='q-row';
        (q.options||[]).forEach(opt=>{
          const btn=document.createElement('button'); btn.className='option'; btn.textContent=opt;
          btn.onclick=()=>{ btn.classList.toggle('active'); const chosen=[...row.querySelectorAll('.option.active')].map(x=>x.textContent); state.data=chosen; enableConfirm(confirmBtn,chosen.length>0); hint.textContent=''; };
          row.appendChild(btn);
        });
        block.appendChild(row);
        confirmBtn.onclick=()=>{ if(requireSelection()) return; check(q,state.data); };
      }
  
      else if(q.type==='match'){
        if(q.inputMode==='click'){
          const row=document.createElement('div'); row.className='q-row';
          const leftCol=document.createElement('div'); leftCol.className='drag-col';
          const rightCol=document.createElement('div'); rightCol.className='drag-col';
          leftCol.innerHTML='<h4>Links</h4>'; rightCol.innerHTML='<h4>Rechts</h4>';
  
          const pairs=[]; let selL=null, selR=null;
          (q.left||[]).forEach(l=>{
            const pill=document.createElement('div'); pill.className='pill'; pill.textContent=l; pill.dataset.side='L';
            pill.onclick=()=>{ if(pill.classList.contains('taken')) return; toggleSel(pill); };
            leftCol.appendChild(pill);
          });
          shuffle(q.right||[]).forEach(r=>{
            const pill=document.createElement('div'); pill.className='pill'; pill.textContent=r; pill.dataset.side='R';
            pill.onclick=()=>{ if(pill.classList.contains('taken')) return; toggleSel(pill); };
            rightCol.appendChild(pill);
          });
  
          function toggleSel(p){
            p.classList.toggle('active');
            if(p.dataset.side==='L'){ if(selL && selL!==p) selL.classList.remove('active'); selL = p.classList.contains('active')?p:null; }
            else { if(selR && selR!==p) selR.classList.remove('active'); selR = p.classList.contains('active')?p:null; }
            if(selL && selR){
              pairs.push([selL.textContent, selR.textContent]);
              selL.classList.remove('active'); selR.classList.remove('active');
              selL.classList.add('taken'); selR.classList.add('taken');
              selL = selR = null;
              enableConfirm(confirmBtn, pairs.length>0); hint.textContent='';
            }
          }
  
          row.appendChild(leftCol); row.appendChild(rightCol); block.appendChild(row);
          confirmBtn.onclick=()=>{ if(requireSelection()) return; const map={}; pairs.forEach(p=>map[p[0]]=p[1]); check(q,map); };
        } else {
          enableConfirm(confirmBtn,true);
          const row=document.createElement('div'); row.className='q-row';
          const leftCol=document.createElement('div'); leftCol.className='drag-col';
          const rightCol=document.createElement('div'); rightCol.className='drag-col';
          leftCol.innerHTML='<h4>Ziele</h4>'; rightCol.innerHTML='<h4>Bausteine</h4>';
  
          (q.left||[]).forEach(l=>{
            const pair=document.createElement('div'); pair.className='pair'; pair.dataset.key=l;
            pair.innerHTML=`<div class="lbl">${l}</div><div class="drop" data-accept="${l}"></div>`;
            leftCol.appendChild(pair);
          });
          shuffle(q.right||[]).forEach(r=>{
            const chip=document.createElement('div'); chip.className='pill draggable'; chip.textContent=r; chip.draggable=true;
            chip.addEventListener('dragstart',e=>{ e.dataTransfer.setData('text/plain', r); });
            rightCol.appendChild(chip);
          });
  
          block.appendChild(row); row.appendChild(leftCol); row.appendChild(rightCol);
  
          block.addEventListener('dragover',e=>{ if(e.target.classList.contains('drop')) e.preventDefault(); });
          block.addEventListener('drop',e=>{
            if(e.target.classList.contains('drop')){ e.preventDefault();
              const text=e.dataTransfer.getData('text/plain');
              if(e.target.children.length===0){
                const chip=[...block.querySelectorAll('.draggable')].find(c=>c.textContent===text);
                if(chip) e.target.appendChild(chip);
              }
            }
          });
  
          confirmBtn.onclick=()=>{ const map={}; block.querySelectorAll('.pair').forEach(p=>{ const k=p.dataset.key; const v=p.querySelector('.drop')?.children[0]?.textContent||''; map[k]=v; }); check(q,map); };
        }
      }
  
      else if(q.type==='order'){
        enableConfirm(confirmBtn,true);
        const col=document.createElement('div'); col.className='drag-col';
        const list=document.createElement('div'); list.className='q-block'; list.style.gap='6px';
        shuffle(q.items||[]).forEach(item=>{
          const row=document.createElement('div'); row.className='pair draggable'; row.draggable=true; row.textContent=item;
          row.addEventListener('dragstart',e=>{ e.dataTransfer.setData('text/plain', item); row.classList.add('dragging'); });
          row.addEventListener('dragend',()=>row.classList.remove('dragging'));
          list.appendChild(row);
        });
        list.addEventListener('dragover',e=>{
          e.preventDefault();
          const dragging=list.querySelector('.dragging');
          const items=[...list.querySelectorAll('.pair:not(.dragging)')];
          let placed=false;
          for(const el of items){
            const box=el.getBoundingClientRect();
            if(e.clientY < box.top + box.height/2){ list.insertBefore(dragging, el); placed=true; break; }
          }
          if(!placed && dragging) list.appendChild(dragging);
        });
        col.appendChild(list); block.appendChild(col);
        confirmBtn.onclick=()=>{ const arr=[...list.querySelectorAll('.pair')].map(x=>x.textContent); check(q,arr); };
      }
  
      else if(q.type==='speed'){
        confirmBtn.style.display='none';
        const time=q.timeLimitMs||6000;
        const bar=document.createElement('div'); bar.className='timer'; bar.style.width='100%'; elQuiz.appendChild(bar);
        const t0=performance.now();
        function tick(){ const dt=performance.now()-t0; const rest=Math.max(0,1-dt/time); bar.style.width=(rest*100)+'%';
          if(rest<=0){ clearTimer(); showResult(false); } else { timerId=requestAnimationFrame(tick); } }
        tick();
  
        const row=document.createElement('div'); row.className='q-row';
        if(q.subtype==='truefalse'){
          [{label:'Wahr',val:true},{label:'Falsch',val:false}].forEach(x=>{
            const b=document.createElement('button'); b.className='option'; b.textContent=x.label; b.onclick=()=>{ clearTimer(); check(q,x.val); };
            row.appendChild(b);
          });
        } else {
          (q.options||[]).forEach(opt=>{
            const b=document.createElement('button'); b.className='option'; b.textContent=opt; b.onclick=()=>{ clearTimer(); check(q,opt); };
            row.appendChild(b);
          });
        }
        block.appendChild(row);
      }
    }
  
    function check(q,value){
      if(busy) return;
      // fehlende Auswahl abfangen
      if((q.type==='choice'||q.type==='truefalse'||q.type==='multiselect') && (value==null || (Array.isArray(value)&&!value.length))){
        const btn=document.querySelector('.q-actions .btn'); if(btn) shake(btn);
        const hint=document.querySelector('.hint'); if(hint) hint.textContent='Bitte triff eine Auswahl.';
        return;
      }
      let ok=false;
      if(q.type==='choice' || (q.type==='speed'&&q.subtype==='choice')) ok = (String(value).trim().toLowerCase() === String(q.answer).trim().toLowerCase());
      else if(q.type==='truefalse' || (q.type==='speed'&&q.subtype==='truefalse')) ok = (value===q.answer);
      else if(q.type==='multiselect'){ const a=(q.answer||[]).slice().sort().map(x=>String(x).toLowerCase()).join('|'); const v=(value||[]).slice().sort().map(x=>String(x).toLowerCase()).join('|'); ok=a===v; }
      else if(q.type==='match'){ const sol=q.solution||{}; ok = Object.keys(sol).every(k=> String((value||{})[k]||'').trim().toLowerCase() === String(sol[k]).trim().toLowerCase()); }
      else if(q.type==='order'){ ok = (q.correctOrder||[]).join('|') === (value||[]).join('|'); }
      else if(q.type==='speed'){ ok = (q.subtype==='truefalse') ? (value===q.answer) : (String(value).trim().toLowerCase()===String(q.answer).trim().toLowerCase()); }
  
      showResult(ok);
    }
  
    function showResult(ok){
      busy=true;
      elRes.innerHTML = `<span class="${ok?'success':'failure'}">${ok?'Richtig! Angriff!':'Falsch! Boss kontert!'}</span>`;
  
      if(ok){
        let done=false;
        setTimeout(()=>{
          throwSpear(heroEl, bossEl, ()=>{
            done=true; bossHP-=25; updHP();
            if(bossHP<=0){ win(); return; }
            busy=false; qIndex++; nextQuestion();
          });
        },150);
        setTimeout(()=>{ if(!done){ bossHP-=25; updHP(); if(bossHP<=0){ win(); return; } busy=false; qIndex++; nextQuestion(); } }, 900);
      } else {
        let done=false;
        setTimeout(()=>{
          castLightning(bossEl, heroEl, ()=>{
            done=true; heroHP-=20; updHP();
            if(heroHP<=0){ lose(); return; }
            busy=false; qIndex++; nextQuestion();
          });
        },160);
        setTimeout(()=>{ if(!done){ heroHP-=20; updHP(); if(heroHP<=0){ lose(); return; } busy=false; qIndex++; nextQuestion(); } }, 750);
      }
    }
  
    function win(){
      elQuiz.innerHTML='';
      elRes.innerHTML='<div class="success">🎉 Sieg! Die Schatzkiste öffnet sich…</div>';
      const chest=document.createElement('div'); chest.className='chest'; elRes.appendChild(chest);
      spawnConfetti(60);
      const next = stage===1 ? 'stufe2.html' : stage===2 ? 'stufe3.html' : 'index.html';
      if(stage===1) localStorage.setItem('unlocked2','true');
      if(stage===2) localStorage.setItem('unlocked3','true');
      setTimeout(()=>location.href=next,3000);
    }
  
    function lose(){
      elQuiz.innerHTML='';
      elRes.innerHTML = `<div class="failure">💀 Game Over – versuch es erneut!</div>
        <div class="center mt"><button class="btn" id="retry">Wiederholen</button></div>`;
      document.getElementById('retry').onclick=()=>location.reload();
      spawnConfetti(10);
    }
  })();
  