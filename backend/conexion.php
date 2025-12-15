<?php
$conexion = new mysqli("localhost", "root", "", "lk_bd", 3307);

if ($conexion->connect_error) {
    die("Error en conexión: " . $conexion->connect_error);
}
?>
