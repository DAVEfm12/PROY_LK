document.getElementById("inscripcionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("/backend/guardar_alumna.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {

        if (data.status === "ok") {
            // Feedback visual
            const msg = document.getElementById("insFeedback");
            msg.classList.remove("d-none");
            msg.textContent = "¡Solicitud enviada correctamente!";

            // Redirección al dashboard de instructora
            setTimeout(() => {
                window.location.href = "../HTML/dashboard_instructora.html";
            }, 1500);

        } else {
            alert("Ocurrió un error: " + data.message);
        }
    })
    .catch(err => console.log("Error:", err));
});
