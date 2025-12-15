// js/envioR.js (opcional - ya integrado en reservacion.js)
// Si prefieres enviar con fetch separadamente, usa este helper.
async function postFormData(url, formData){
  const res = await fetch(url, { method:'POST', body: formData });
  return res.json();
}
