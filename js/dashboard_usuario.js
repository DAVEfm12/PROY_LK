// js/dashboard_usuario.js
document.addEventListener('DOMContentLoaded', () => {
  // menu switching
  const menuItems = document.querySelectorAll('.menu li[data-section]');
  const panels = document.querySelectorAll('.panel');

  function showSection(name){
    panels.forEach(p => p.classList.toggle('visible', p.id === name));
    menuItems.forEach(m => m.classList.toggle('active', m.dataset.section === name));
  }

  menuItems.forEach(li => {
    li.addEventListener('click', () => {
      showSection(li.dataset.section);
      if(li.dataset.section === 'reservaciones') loadReservas();
      if(li.dataset.section === 'datos') loadUserData();
      if(li.dataset.section === 'fotos') loadGallery();
      if(li.dataset.section === 'historial') loadHistorial();
    });
  });

  // default section
  showSection('inicio');

  // API endpoints (adjust paths if needed)
  const API = {
    listReservations: 'api/get_reservations.php',
    getUser: 'api/get_user.php',
    updateUser: 'api/update_user.php',
    uploadPhoto: 'api/upload_photo.php',
    cancelReservation: 'api/cancel_reservation.php',
    getGallery: 'api/get_gallery.php',
    getHistory: 'api/get_history.php'
  };

  // ---------- Reservas ----------
  async function loadReservas(){
    const tbody = document.getElementById('tablaReservas');
    tbody.innerHTML = '<tr><td colspan="4">Cargando...</td></tr>';
    try{
      const res = await fetch(API.listReservations);
      const data = await res.json();
      if(!data.success) throw new Error(data.msg || 'Error');
      if(data.reservas.length === 0){
        tbody.innerHTML = '<tr><td colspan="4">No tienes reservaciones.</td></tr>';
        return;
      }
      tbody.innerHTML = '';
      data.reservas.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${escapeHtml(r.servicio)}</td>
          <td>${escapeHtml(r.fecha)}</td>
          <td>${escapeHtml(r.hora)}</td>
          <td>
            <span class="badge ${r.estado}">${r.estado}</span>
            ${r.estado === 'pendiente' ? `<button class="btn-cancel" data-id="${r.id}">Cancelar</button>` : ''}
          </td>
        `;
        tbody.appendChild(tr);
      });

      // attach cancel listeners
      document.querySelectorAll('.btn-cancel').forEach(btn=>{
        btn.addEventListener('click', async () => {
          if(!confirm('¿Cancelar esta reservación?')) return;
          const id = btn.dataset.id;
          const resp = await fetch(API.cancelReservation, {
            method:'POST', body: new URLSearchParams({ id })
          });
          const j = await resp.json();
          alert(j.msg);
          loadReservas();
        });
      });
    }catch(err){
      tbody.innerHTML = `<tr><td colspan="4">Error cargando reservaciones</td></tr>`;
      console.error(err);
    }
  }

  // ---------- Mis Datos ----------
  async function loadUserData(){
    const formArea = document.querySelector('#datos .form') || createDatosForm();
    try{
      const res = await fetch(API.getUser);
      const j = await res.json();
      if(!j.success){ console.warn(j.msg); return; }
      // fill fields
      document.getElementById('nombre').value = j.user.nombre || '';
      document.getElementById('tel').value = j.user.telefono || '';
      document.getElementById('correo').value = j.user.email || '';
    }catch(err){ console.error(err); }
  }

  // submit update user
  document.addEventListener('submit', async (e) => {
    if(!e.target.matches('.form')) return;
    e.preventDefault();
    const fd = new FormData(e.target);
    try{
      const res = await fetch(API.updateUser, { method:'POST', body:fd });
      const j = await res.json();
      alert(j.msg);
      if(j.success) loadUserData();
    }catch(err){ console.error(err); alert('Error al guardar'); }
  });

  // ---------- Gallery ----------
  async function loadGallery(){
    const gal = document.getElementById('galeria');
    gal.innerHTML = 'Cargando...';
    try{
      const res = await fetch(API.getGallery);
      const j = await res.json();
      if(!j.success){ gal.innerHTML = 'No hay imágenes'; return; }
      gal.innerHTML = '';
      j.images.forEach(img=>{
        const el = document.createElement('img'); el.src = img.url; gal.appendChild(el);
      });
    }catch(err){ console.error(err); gal.innerHTML = 'Error al cargar'; }
  }

  // upload photo
  const uploadBtn = document.querySelector('.upload-box button');
  if(uploadBtn){
    uploadBtn.addEventListener('click', async ()=>{
      const input = document.getElementById('fotoSubir');
      if(!input.files[0]){ alert('Selecciona una imagen'); return; }
      const fd = new FormData(); fd.append('foto', input.files[0]);
      try{
        const res = await fetch(API.uploadPhoto, { method:'POST', body:fd });
        const j = await res.json();
        alert(j.msg);
        if(j.success) loadGallery();
      }catch(err){ console.error(err); alert('Error al subir'); }
    });
  }

  // ---------- Historial ----------
  async function loadHistorial(){
    const list = document.querySelector('#historial .lista');
    list.innerHTML = '<li>Cargando...</li>';
    try{
      const res = await fetch(API.getHistory);
      const j = await res.json();
      if(!j.success){ list.innerHTML = '<li>No hay historial</li>'; return; }
      list.innerHTML = '';
      j.history.forEach(h => {
        const li = document.createElement('li'); li.textContent = `${h.created_at} — ${h.tipo} — ${h.detalle}`; list.appendChild(li);
      });
    }catch(err){ list.innerHTML = '<li>Error al cargar historial</li>'; console.error(err); }
  }

  // util
  function escapeHtml(s){ return (s||'').toString().replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]); }

});


// ===========================
//   MOSTRAR PANELES
// ===========================
function verPanel(panelID) {

    // Quitar "#" si viene así
    panelID = panelID.replace("#", "");

    // Ocultar todos los paneles
    document.querySelectorAll(".panel").forEach(panel => {
        panel.classList.remove("visible");
    });

    // Mostrar el panel seleccionado
    const panelMostrar = document.getElementById(panelID);
    if (panelMostrar) {
        panelMostrar.classList.add("visible");
    } else {
        console.error("El panel no existe:", panelID);
    }

    // Cerrar sidebar en modo móvil (se ve pro)
    const sidebar = document.querySelector(".sidebar");
    if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
    }
}

// ===========================
//   SIDEBAR: BOTÓN
// ===========================
const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');   
    sidebar.classList.toggle('collapsed');
});

