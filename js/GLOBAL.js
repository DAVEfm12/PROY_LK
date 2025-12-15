/* ============================================================
   NAVBAR — EFECTO SCROLLED
============================================================ */
document.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ============================================================
   SISTEMA DE FILTROS DE SERVICIOS Y SUBSERVICIOS
============================================================ */
const filtros = document.querySelectorAll(".filtro-btn");
const subserviciosGrupos = document.querySelectorAll(".subservicios-container");

filtros.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Reset
    filtros.forEach(b => b.classList.remove("active"));
    subserviciosGrupos.forEach(s => s.classList.remove("active"));

    // Activar el actual
    btn.classList.add("active");

    // Mostrar subservicios del filtro actual
    const categoria = btn.dataset.categoria;
    const subservicioDiv = document.getElementById(`sub-${categoria}`);

    if (subservicioDiv) {
      subservicioDiv.classList.add("active");
    }
  });
});

/* ============================================================
   SELECCIÓN DE SUBSERVICIO → ENVÍA AL FORMULARIO
============================================================ */
const subBtns = document.querySelectorAll(".subservicio-btn");
const servicioInput = document.getElementById("servicioSeleccionado");

subBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const servicio = btn.dataset.servicio;
    servicioInput.value = servicio;

    // Scroll suave al formulario
    document.getElementById("form-reserva").scrollIntoView({ behavior: "smooth" });
  });
});

/* ============================================================
   ANIMACIONES AL DESPLAZARSE
============================================================ */
const elementsReveal = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

elementsReveal.forEach(el => observer.observe(el));
