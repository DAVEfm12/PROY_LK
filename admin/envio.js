// js/envio.js (simplificado)
document.querySelector('form').addEventListener('submit', async function(e){
  e.preventDefault();
  const fd = new FormData(this);
  const res = await fetch('/backend/guardar_cita.php', { method:'POST', body: fd });
  const j = await res.json();
  if (j.ok) {
    alert('Reservación guardada. Te llevamos a WhatsApp para confirmar.');
    if (j.whatsapp) window.open(j.whatsapp, '_blank');
    this.reset();
  } else {
    alert('Error: ' + (j.msg||''));
  }
});
