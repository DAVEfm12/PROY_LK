<?php
include "conexion.php";

$usuario = $_POST['usuario'];
$comentario = $_POST['comentario'];
$estrellas = $_POST['estrellas'];
$fecha = date("Y-m-d H:i:s");

$fotoNombre = "";

if(isset($_FILES['foto']) && $_FILES['foto']['name'] != ""){
    $fotoNombre = time() . "_" . basename($_FILES['foto']['name']);
    $ruta = "../uploads/" . $fotoNombre;
    move_uploaded_file($_FILES['foto']['tmp_name'], $ruta);
}

$sql = "INSERT INTO testimonios (Usuario, Foto, Estrellas, Comentario, Fecha)
        VALUES ('$usuario', '$fotoNombre', '$estrellas', '$comentario', '$fecha')";

if($conexion->query($sql)){
    echo "OK";
} else {
    echo "ERROR";
}
?>
