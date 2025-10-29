// js/index.js
// Startseite: Video-Preview, Level-Locks, Navigation

document.addEventListener('DOMContentLoaded', () => {
    const upload = document.getElementById('videoUpload');
    const preview = document.getElementById('preview');
    const levelButtons = document.querySelectorAll('.btn[data-level]');
    const levelCards = document.querySelectorAll('.level.card');
  
    // Optionales Video
    if (upload && preview) {
      upload.addEventListener('change', () => {
        const file = upload.files && upload.files[0];
        if (!file) return;
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
        try { localStorage.setItem('hasVideo','true'); } catch(e){}
      });
      if (!preview.src) preview.style.display = 'none';
    }
  
    function updateLocks(){
      const u2 = localStorage.getItem('unlocked2')==='true';
      const u3 = localStorage.getItem('unlocked3')==='true';
      levelCards.forEach(card=>{
        const btn = card.querySelector('.btn[data-level]');
        if(!btn) return;
        const lvl = Number(btn.dataset.level||'1');
        if((lvl===2 && u2) || (lvl===3 && u3)){
          card.classList.remove('locked');
          btn.textContent='Starten';
        } else if(lvl>=2){
          card.classList.add('locked');
          btn.textContent='Freischalten im Tor 🔒';
        }
      });
    }
    updateLocks();
  
    levelButtons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const lvl = Number(btn.dataset.level||'1');
        const locked = btn.closest('.card')?.classList.contains('locked');
        if(locked){ location.href='gate.html'; return; }
        location.href = `stufe${lvl}.html`;
      });
    });
  
    window.addEventListener('storage', (e)=>{ if(e.key==='unlocked2' || e.key==='unlocked3') updateLocks(); });
  });
  