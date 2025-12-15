<?php
include 'conexion.php'; // Aquí tu $conexion

// =====================================
// 2. Recibir datos
// =====================================
$servicio = $_POST['servicio'];
$pago = $_POST['pago'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$info = $_POST['info'];

// ==============================
// 3. Insertar en BD
// ==============================
$sql = "INSERT INTO citas (Servicio, Fecha, Hora, Info_Adicional, Estado) 
        VALUES ('$servicio', '$fecha', '$hora', '$info', 'Pendiente')";

if ($conexion->query($sql)) {
    echo "Cita registrada correctamente 🎉";
} else {
    echo "Error: " . $conexion->error;
}

$conexion->close();
?>
