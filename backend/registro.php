<?php
include 'conexion.php';

$nombre = $_POST['nombre'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$pass = $_POST['password'];

$passHash = password_hash($pass, PASSWORD_DEFAULT);

// Verificar si el correo ya existe
$check = $conexion->query("SELECT Correo FROM usuarios WHERE Correo='$email'");

if ($check->num_rows > 0) {
    echo "<script>alert('Este correo ya está registrado. Intenta iniciar sesión.'); window.location='../index.html';</script>";
    exit();
}

// Insertar usuario nuevo
$sql = "INSERT INTO usuarios (Nombre_User, Correo, Password, Telefono, Tipo_User, Fecha_Insc)
        VALUES ('$nombre', '$email', '$passHash', '$tel', 'Nuevo', NOW())";

if ($conexion->query($sql) === TRUE) {

    session_start();
    $_SESSION['usuario'] = $nombre;
    $_SESSION['correo'] = $email;
    $_SESSION['id_user'] = $conexion->insert_id;

    header("Location: ../Dashboard.php");
    exit();

} else {
    echo "Error al registrar: " . $conexion->error;
}

$conexion->close();
?>
