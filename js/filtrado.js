// FILTRADO POR CATEGORÍA Y SUBCATEGORÍA
const filtroBtns = document.querySelectorAll('.filtro-btn');
const cards = document.querySelectorAll('.servicio-card');
const subfiltrosCont = document.getElementById('subfiltros');

// Definir subfiltros para cada categoría
const subfiltros = {
  "uñas": ["gelish","acrilico","manicure-spa","esculpida","polygel","francesa","extensiones","decoracion"],
  "maquillaje": ["dia","noche","fiesta","catrines","catrinas","halloween","glam-hd","novias","soft-glam","cut-crease"],
  "peinado": ["suelto","recogido","ondas","trenzas","media-cola","coleta-alta","elegante","extensiones"],
  "tintes": ["fantasia","normal","mechas","balayage","iluminacion","global","correccion","matiz"]
};

// Mostrar subfiltros
filtroBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.category;

    // Activar botón
    filtroBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filtrar cards por categoría
    cards.forEach(c => {
      if(cat === "all" || c.dataset.category === cat) c.style.display = "block";
      else c.style.display = "none";
    });

    // Limpiar y mostrar subfiltros
    subfiltrosCont.innerHTML = "";
    if(subfiltros[cat]){
      subfiltros[cat].forEach(sub => {
        const b = document.createElement('button');
        b.textContent = sub.replace("-", " ").toUpperCase();
        b.dataset.sub = sub;
        b.className = "subfiltro-btn btn btn-outline-warning me-2 mb-2";
        subfiltrosCont.appendChild(b);
      });

      // Filtrar por subfiltro
      const subBtns = document.querySelectorAll('.subfiltro-btn');
      subBtns.forEach(sb => {
        sb.addEventListener('click', () => {
          cards.forEach(c => {
            if(c.dataset.category === cat && c.dataset.sub === sb.dataset.sub) c.style.display = "block";
            else if(c.dataset.category !== cat) c.style.display = "none";
            else c.style.display = "none";
          });
        });
      });
    }
  });
});
