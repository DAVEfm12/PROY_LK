<?php
include 'conexion.php'; // Aquí tu $conexion

$email = $_POST['email'];
$password = $_POST['password'];

// Usamos $conexion, no $conn
$sql = "SELECT * FROM usuarios WHERE Correo = '$email' LIMIT 1";
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    
    $row = $result->fetch_assoc();

    if (password_verify($password, $row['Password'])) {

        session_start();
        $_SESSION['usuario'] = $row['Nombre_Completo'];
        $_SESSION['correo'] = $row['Correo'];

        // REDIRECCIÓN AL DASHBOARD
        header("Location: ../Dashboard.php");
        exit();

    } else {
        echo "Contraseña incorrecta";
    }

} else {
    echo "El usuario no existe";
}

$conexion->close();
?>
