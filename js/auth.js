/* js/auth.js
   Simulación simple de autenticación local (demo).
   Guarda perfiles en localStorage bajo "lk_users" y "lk_current"
*/

(function(){
  // util
  const $ = id => document.getElementById(id);

  // helpers storage
  function loadUsers(){ return JSON.parse(localStorage.getItem('lk_users')||'[]'); }
  function saveUsers(u){ localStorage.setItem('lk_users', JSON.stringify(u)); }
  function setCurrent(user){ localStorage.setItem('lk_current', JSON.stringify(user)); }
  function getCurrent(){ return JSON.parse(localStorage.getItem('lk_current')||'null'); }
  function clearCurrent(){ localStorage.removeItem('lk_current'); }

  // elements
  const modalLogin = $('modalLogin');
  const modalRegistro = $('modalRegistro');
  const openLoginBtn = $('openLoginBtn');
  const openRegisterBtn = $('openRegisterBtn');
  const closeLogin = $('closeLogin');
  const closeRegister = $('closeRegister');

  // Register
  const registerBtn = $('registerBtn');
  if(registerBtn){
    registerBtn.addEventListener('click', () => {
      const nombre = $('regNombre').value.trim();
      const telefono = $('regTelefono').value.trim();
      const email = $('regEmail').value.trim().toLowerCase();
      const birthday = $('regBirthday').value || '';
      if(!nombre || !telefono || !email){ alert('Completa nombre, teléfono y email.'); return; }
      const users = loadUsers();
      if(users.some(u => u.email === email || u.phone === telefono)){
        alert('Ya existe una cuenta con ese email o teléfono.');
        return;
      }
      const newUser = { id: Date.now(), name: nombre, phone: telefono, email, birthday };
      users.push(newUser);
      saveUsers(users);
      setCurrent(newUser);
      alert('Cuenta creada. ¡Bienvenida, ' + nombre + '!');
      modalRegistro.style.display = 'none';
      window.dispatchEvent(new Event('lk:user-changed'));
    });
  }

  // Login
  const loginBtn = $('loginBtn');
  if(loginBtn){
    loginBtn.addEventListener('click', () => {
      const idv = $('loginId').value.trim().toLowerCase();
      const pass = $('loginPass').value;
      if(!idv){ alert('Ingresa email o teléfono.'); return; }
      const users = loadUsers();
      const user = users.find(u => u.email === idv || u.phone === idv);
      if(!user){ alert('Usuario no encontrado. Regístrate.'); return; }
      // demo: no password check
      setCurrent(user);
      alert('Hola de nuevo, ' + user.name + '!');
      modalLogin.style.display = 'none';
      window.dispatchEvent(new Event('lk:user-changed'));
    });
  }

  // UI open/close
  if(openLoginBtn) openLoginBtn.addEventListener('click', ()=> modalLogin.style.display = 'flex');
  if(openRegisterBtn) openRegisterBtn.addEventListener('click', ()=> modalRegistro.style.display = 'flex');
  if(closeLogin) closeLogin.addEventListener('click', ()=> modalLogin.style.display = 'none');
  if(closeRegister) closeRegister.addEventListener('click', ()=> modalRegistro.style.display = 'none');
  // close when click outside
  window.addEventListener('click', (e)=> {
    if(e.target === modalLogin) modalLogin.style.display = 'none';
    if(e.target === modalRegistro) modalRegistro.style.display = 'none';
  });

  // expose small API for other scripts
  window.LKAuth = {
    getCurrent,
    clearCurrent,
    loadUsers
  };

  // on load, if logged, fire event
  if(getCurrent()) window.dispatchEvent(new Event('lk:user-changed'));

})();
