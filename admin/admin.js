// js/dashboard_admin.js
async function fetchCitas(filters={}) {
  const qs = new URLSearchParams(filters);
  const res = await fetch(`/api/get_reservations.php?${qs.toString()}`);
  return res.json();
}

function renderTable(data) {
  const tbody = document.querySelector('#citasTable tbody');
  tbody.innerHTML = '';
  data.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${escapeHtml(r.nombre)}</td>
      <td>${escapeHtml(r.servicio)}</td>
      <td>${r.fecha}</td>
      <td>${r.hora}</td>
      <td>${r.estado}</td>
      <td>${r.user_name ? escapeHtml(r.user_name)+'<br/>'+escapeHtml(r.user_phone||'') : '-'}</td>
      <td>
        <button class="btn btn-sm btn-light btn-change" data-id="${r.id}">Cambiar estado</button>
        <a class="btn btn-sm btn-success" target="_blank" href="https://wa.me/52${r.user_phone}?text=${encodeURIComponent('Hola '+r.nombre)}">WA</a>
        <button class="btn btn-sm btn-info btn-view" data-id="${r.id}">Ver</button>
      </td>`;
    tbody.appendChild(tr);
  });
  document.querySelectorAll('.btn-change').forEach(b => b.addEventListener('click', onChangeState));
  document.querySelectorAll('.btn-view').forEach(b => b.addEventListener('click', onView));
}

async function loadAndRender() {
  const filters = {
    start: document.getElementById('fStart').value || '',
    end: document.getElementById('fEnd').value || '',
    servicio: document.getElementById('fService').value || '',
    estado: document.getElementById('fState').value || ''
  };
  const data = await fetchCitas(filters);
  renderTable(data);
}

function onChangeState(e){
  const id = e.currentTarget.dataset.id;
  const newState = prompt('Nuevo estado (pendiente,confirmada,en_proceso,finalizada,cancelada):');
  if(!newState) return;
  fetch('/api/update_reservation.php', {
    method:'POST',
    body: new URLSearchParams({id, estado:newState})
  }).then(r=>r.json()).then(j=>{
    if(j.ok) { alert('Estado actualizado'); loadAndRender(); }
    else alert('Error: '+(j.msg||''));
  });
}

function onView(e){
  const id = e.currentTarget.dataset.id;
  fetch(`/api/get_reservations.php?id=${id}`).then(r=>r.json()).then(data=>{
    const r = (Array.isArray(data) && data[0]) || data;
    const html = `<p><strong>Nombre:</strong> ${escapeHtml(r.nombre)}</p>
                  <p><strong>Servicio:</strong> ${escapeHtml(r.servicio)}</p>
                  <p><strong>Fecha:</strong> ${r.fecha} ${r.hora}</p>
                  <p><strong>Estado:</strong> ${r.estado}</p>
                  <p><strong>Info:</strong> ${escapeHtml(r.info||'')}</p>
                  ${r.imagen?`<p><img src="/uploads/${r.imagen}" style="max-width:240px"/></p>`:''}`;
    document.getElementById('detalleContent').innerHTML = html;
    document.getElementById('detailCard').style.display = 'block';
  });
}

function escapeHtml(s){ if(!s) return ''; return s.replaceAll&&s.replaceAll('<','&lt;').replaceAll('>','&gt;') || s; }

document.getElementById('applyFilters').addEventListener('click', loadAndRender);
document.getElementById('refreshBtn').addEventListener('click', loadAndRender);
document.getElementById('showClients').addEventListener('click', ()=> location.href='/api/get_clients.php');

loadAndRender();
