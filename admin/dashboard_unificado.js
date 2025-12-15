// ====== Cambiar panel ======
const panelAdmin = document.getElementById("panelAdmin");
const panelInstructora = document.getElementById("panelInstructora");

document.getElementById("btnAdmin").onclick = () => {
  panelAdmin.style.display = "block";
  panelInstructora.style.display = "none";
};

document.getElementById("btnInstructora").onclick = () => {
  panelAdmin.style.display = "none";
  panelInstructora.style.display = "block";
};



// ================= ADMIN =================
// Cargar citas
function cargarCitas() {
  fetch("../api/get_reservation.php")
    .then(r => r.json())
    .then(data => {
      const tbody = document.querySelector("#tablaCitas tbody");
      tbody.innerHTML = "";

      data.forEach(cita => {
        tbody.innerHTML += `
          <tr>
            <td>${cita.id}</td>
            <td>${cita.nombre}</td>
            <td>${cita.servicio}</td>
            <td>${cita.fecha}</td>
            <td>${cita.hora}</td>
            <td><span class="badge bg-info">${cita.estado}</span></td>
            <td>
              <a class="btn btn-sm btn-success" target="_blank"
                href="https://wa.me/52${cita.telefono}">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
            </td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="verDetalle(${cita.id})">
                Ver
              </button>
            </td>
          </tr>
        `;
      });
    });
}

cargarCitas();


// Detalle de cita
function verDetalle(id) {
  fetch("../api/get_reservation.php?id=" + id)
    .then(r => r.json())
    .then(cita => {
      document.getElementById("detalleCita").style.display = "block";

      document.getElementById("detalleCita").innerHTML = `
        <h4>Detalle de cita</h4>

        <p><b>Cliente:</b> ${cita.nombre}</p>
        <p><b>Servicio:</b> ${cita.servicio}</p>
        <p><b>Fecha:</b> ${cita.fecha} ${cita.hora}</p>

        <label class="mt-2">Cambiar estado</label>
        <select id="estadoNuevo" class="form-select">
          <option>pendiente</option>
          <option>confirmada</option>
          <option>en_proceso</option>
          <option>finalizada</option>
          <option>cancelada</option>
        </select>

        <button class="btn btn-success w-100 mt-3"
          onclick="actualizarEstado(${cita.id})">
          Guardar
        </button>
      `;
    });
}


function actualizarEstado(id) {
  const estado = document.getElementById("estadoNuevo").value;

  fetch("../api/update_state.php", {
    method: "POST",
    body: new FormData(Object.assign(document.createElement("form"), {
      id, estado
    }))
  })
  .then(r => r.text())
  .then(res => {
    alert("Estado actualizado");
    cargarCitas();
  });
}




// ================= INSTRUCTORA =================
// Registrar alumna
document.getElementById("formAlumna").onsubmit = e => {
  e.preventDefault();

  let datos = new FormData(e.target);

  fetch("../api/add_student.php", {
    method: "POST",
    body: datos
  })
  .then(r => r.text())
  .then(res => {
    alert("Alumna registrada");
    cargarAlumnas();
    e.target.reset();
  });
};

// Lista de alumnas
function cargarAlumnas() {
  fetch("../api/get_students.php")
    .then(r => r.json())
    .then(data => {
      let cont = document.getElementById("listaAlumnas");
      cont.innerHTML = "";

      data.forEach(a => {
        cont.innerHTML += `
          <div class="alumna-card">
            <h6>${a.nombre}</h6>
            <p class="m-0">
              <b>Curso:</b> ${a.curso}<br>
              <b>Tel:</b> ${a.telefono}
            </p>
            <a class="btn btn-success btn-sm mt-2"
              href="https://wa.me/52${a.telefono}" target="_blank">
              WhatsApp
            </a>
          </div>
        `;
      });
    });
}

cargarAlumnas();
