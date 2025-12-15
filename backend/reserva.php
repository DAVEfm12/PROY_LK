<?php
include 'conexion.php';

// ==== DATOS ====
$nombre   = $_POST['nombre'];
$servicio = $_POST['servicio'];
$fecha    = $_POST['fecha'];
$hora     = $_POST['hora'];
$info     = $_POST['info'];

// ==== IMAGEN ====
$archivo_nombre = "";

if(!empty($_FILES['imagen']['name'])){
    $archivo_nombre = "img_".time()."_".$_FILES['imagen']['name'];
    move_uploaded_file($_FILES['imagen']['tmp_name'], "uploads/".$archivo_nombre);
}

// ==== GUARDAR BD ====
$stmt = $conexion->prepare("INSERT INTO reservaciones(nombre,servicio,fecha,hora,imagen,info) VALUES (?,?,?,?,?,?)");
$stmt->bind_param("ssssss", $nombre, $servicio, $fecha, $hora, $archivo_nombre, $info);

if($stmt->execute()){

    // ==== WHATSAPP ====
    $telefono = "522219304894"; // AQUÍ VA TU WHATS

    $mensaje = "🔔 *Nueva Reservación*
👤 Nombre: $nombre
💅 Servicio: $servicio
📅 Fecha: $fecha
⏰ Hora: $hora
📝 Info: $info";

    $mensaje = urlencode($mensaje);

    $url = "https://wa.me/$telefono?text=$mensaje";

    echo json_encode([
        "msg" => "Reservación guardada ✔\nEnviando a WhatsApp...",
        "whatsapp" => $url
    ]);

} else {
    echo json_encode(["msg" => "Error al guardar la reservación"]);
}

?>