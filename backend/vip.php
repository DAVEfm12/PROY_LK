<?php

session_start();
include 'conexion.php';

// Obtener los datos enviados por AJAX
$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$servicio = $_POST['servicio'];
$estilista = $_POST['estilista'];

// Insertar en BD
$sql = "INSERT INTO vip (nombre, telefono, servicio, estilista) 
        VALUES ('$nombre', '$telefono', '$servicio', '$estilista')";

if ($conexion->query($sql) === TRUE) {
    echo "ok";
} else {
    echo "Error: " . $conexion->error;
}

$conexion->close();
?>
