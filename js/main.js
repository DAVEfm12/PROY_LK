/* js/main.js */
document.addEventListener('DOMContentLoaded', () => {
  // NAVBAR SCROLL EFFECT
  const nav = document.querySelector('.navbar');
  function onScroll(){
    if(window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    // btnUp visibility
    const btnUp = document.getElementById('btnUp');
    if(btnUp) btnUp.style.display = window.scrollY > 300 ? 'block' : 'none';
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // btnUp
  const btnUp = document.getElementById('btnUp');
  if(btnUp) btnUp.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  // IMAGE FALLBACK (global)
  window.imgFallback = function(img){
    if(!img) return;
    img.onerror = null;
    img.src = 'assets/img/fallback.png';
  };

  // Hide modals on Esc globally
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    }
  });

  // Loader (if present)
  const loader = document.getElementById('loader');
  if(loader) window.addEventListener('load', ()=> loader.style.display = 'none');

  // small: close login/register links in header if present
  const openLoginBtn = document.getElementById('openLoginBtn');
  const openRegisterBtn = document.getElementById('openRegisterBtn');
  if(openLoginBtn) openLoginBtn.addEventListener('click', ()=> { const m = document.getElementById('modalLogin'); if(m) m.style.display='flex'; });
  if(openRegisterBtn) openRegisterBtn.addEventListener('click', ()=> { const m = document.getElementById('modalRegistro'); if(m) m.style.display='flex'; });

});
