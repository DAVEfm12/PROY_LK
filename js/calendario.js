const dates = document.getElementById("dates");
const monthYear = document.getElementById("month-year");
const fechaInput = document.getElementById("fechaSeleccionada");

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

const renderCalendar = () => {
  dates.innerHTML = "";
  monthYear.textContent = `${date.toLocaleString('es', { month: 'long' }).toUpperCase()} ${year}`;

  let firstDay = new Date(year, month, 1).getDay();
  firstDay = firstDay === 0 ? 7 : firstDay;

  let lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i < firstDay; i++) {
    dates.innerHTML += `<div></div>`;
  }

  for (let d = 1; d <= lastDate; d++) {
    const day = document.createElement("div");
    day.textContent = d;

    day.addEventListener("click", function () {
      document.querySelectorAll(".dates div").forEach(el => el.classList.remove("selected"));
      this.classList.add("selected");

      fechaInput.value = `${d}/${month + 1}/${year}`;
    });

    dates.appendChild(day);
  }
};

document.getElementById("next").onclick = () => {
  month++;
  if (month === 12) { month = 0; year++; }
  date = new Date(year, month);
  renderCalendar();
};

document.getElementById("prev").onclick = () => {
  month--;
  if (month === -1) { month = 11; year--; }
  date = new Date(year, month);
  renderCalendar();
};

renderCalendar();

/* —————————— RELOJ INTERACTIVO —————————— */
const clockFace = document.getElementById("clockHours");
const horaInput = document.getElementById("horaSeleccionada");

let step = "hour"; 
let selectedHour = "";
let selectedMinute = "";

// Crear horas en círculo
for (let h = 1; h <= 12; h++) {
  const angle = (h / 12) * 360;
  const x = 110 + 90 * Math.sin(angle * Math.PI / 180);
  const y = 110 - 90 * Math.cos(angle * Math.PI / 180);

  const hourDiv = document.createElement("div");
  hourDiv.textContent = h;
  hourDiv.style.left = `${x}px`;
  hourDiv.style.top = `${y}px`;

  hourDiv.addEventListener("click", () => {
    selectedHour = h < 10 ? "0" + h : h;
    step = "minute";
    renderMinutes();
  });

  clockFace.appendChild(hourDiv);
}

// Generar minutos (cada 5 min)
function renderMinutes() {
  clockFace.innerHTML = "";

  for (let m = 0; m < 60; m += 5) {
    const angle = (m / 60) * 360;
    const x = 110 + 90 * Math.sin(angle * Math.PI / 180);
    const y = 110 - 90 * Math.cos(angle * Math.PI / 180);

    const minDiv = document.createElement("div");
    minDiv.textContent = m.toString().padStart(2, "0");
    minDiv.style.left = `${x}px`;
    minDiv.style.top = `${y}px`;

    minDiv.addEventListener("click", () => {
      selectedMinute = m.toString().padStart(2, "0");
      horaInput.value = `${selectedHour}:${selectedMinute}`;
      step = "hour";
      location.reload();
    });

    clockFace.appendChild(minDiv);
  }
}

/* —————————— PREVIEW DE IMAGEN —————————— */
const imgInput = document.getElementById("imgInput");
const previewBox = document.getElementById("previewBox");
const previewImg = document.getElementById("previewImg");

imgInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewBox.style.display = "flex";
      previewImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

