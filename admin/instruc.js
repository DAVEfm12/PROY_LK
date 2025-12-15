// js/dashboard_instructora.js
document.getElementById('formAlumna').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const res = await fetch('/backend/registrar_alumna.php', { method:'POST', body:fd });
  const j = await res.json();
  alert(j.ok ? 'Alumna registrada' : ('Error: '+(j.msg||'')));
  if (j.ok) loadAlumnas();
  e.target.reset();
});

async function loadAlumnas() {
  const res = await fetch('/api/get_alumnas.php');
  const arr = await res.json();
  const wrap = document.getElementById('alumnasList');
  wrap.innerHTML = arr.map(a => `<div class="alumna-item p-2 border-bottom">
    <strong>${a.nombre}</strong><br/>
    ${a.phone||''} • ${a.email||''} • <span class="badge bg-warning text-dark">${a.curso}</span>
    <div class="mt-1">
      <a class="btn btn-sm btn-success" href="https://wa.me/52${a.phone}?text=${encodeURIComponent('Hola '+a.nombre)}" target="_blank">WA</a>
      <button class="btn btn-sm btn-outline-light" onclick="downloadDocs(${a.id})">Docs</button>
    </div>
  </div>`).join('');
}
function downloadDocs(id){ location.href = `/api/get_documentos_alumna.php?id=${id}`; }
loadAlumnas();
