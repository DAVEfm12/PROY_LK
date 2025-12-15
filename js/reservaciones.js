// ==============================================
// MODALES de Login/Register
// ==============================================
document.addEventListener("DOMContentLoaded", function () {
  const loginModal = new bootstrap.Modal(document.getElementById("modalLogin"));
  const registerModal = new bootstrap.Modal(document.getElementById("modalRegister"));

  document.getElementById("btn-login")?.addEventListener("click", () => loginModal.show());
  document.getElementById("btn-register")?.addEventListener("click", () => registerModal.show());
});

// ==============================================
// CALENDARIO
// ==============================================
flatpickr("#fecha", {
  dateFormat: "Y-m-d",
  minDate: "today",
  altInput: true,
  altFormat: "F j, Y",
});

// ==============================================
// RELOJ
// ==============================================
flatpickr("#hora", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr: true,
});

// ==============================================
// FORMULARIO
// ==============================================
document.getElementById("form-reserva").addEventListener("submit", function (e) {
  e.preventDefault();

  let datos = new FormData(this);

  fetch("backend/cita.php", {
    method: "POST",
    body: datos
  })
    .then(res => res.text())
    .then(data => {
      alert("Reserva enviada:\n" + data);
      this.reset();
    })
    .catch(err => alert("Error en el envío"));
});
