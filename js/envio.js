document.getElementById("formReserva").addEventListener("submit", function(e){
    e.preventDefault();

    let datos = new FormData(this);

    fetch("procesar_reserva.php", {
        method: "POST",
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        alert(data.msg);
    })
    .catch(err => console.log(err));
});
