<?php
session_start();
include 'conexion.php';

if (!isset($_SESSION['correo'])) {
    header("Location: ../index.html");
    exit();
}

$correoActual = $_SESSION['correo'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $password = $_POST['password'] ?? '';
    $avatar = NULL;

    // Obtener avatar actual
    $query = $conexion->prepare("SELECT Avatar FROM usuarios WHERE Correo = ?");
    $query->bind_param("s", $correoActual);
    $query->execute();
    $result = $query->get_result();
    $data = $result->fetch_assoc();
    $avatarActual = $data['Avatar'] ?? NULL;

    // Subir nuevo avatar (si hay)
    if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === 0) {
        $ext = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
        $archivoNuevo = uniqid("avatar_") . "." . $ext;
        $destino = "../uploads/" . $archivoNuevo;

        if (move_uploaded_file($_FILES['avatar']['tmp_name'], $destino)) {
            $avatar = $archivoNuevo;
        }
    } else {
        $avatar = $avatarActual;
    }

    // Actualización base
    if ($password !== "") {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conexion->prepare(
            "UPDATE usuarios 
             SET Nombre_User=?, Correo=?, Telefono=?, Password=?, Avatar=? 
             WHERE Correo=?"
        );
        $stmt->bind_param("ssssss", $nombre, $email, $telefono, $passwordHash, $avatar, $correoActual);
    } else {
        $stmt = $conexion->prepare(
            "UPDATE usuarios 
             SET Nombre_User=?, Correo=?, Telefono=?, Avatar=? 
             WHERE Correo=?"
        );
        $stmt->bind_param("sssss", $nombre, $email, $telefono, $avatar, $correoActual);
    }

    if ($stmt->execute()) {
        $_SESSION['usuario'] = $nombre;
        $_SESSION['correo'] = $email;

        echo "<script>
            window.onload = function(){
                alert('Perfil actualizado correctamente 🎉');
                window.location='../Dashboard.php';
            }
        </script>";
    } else {
        echo "Error al actualizar: " . $stmt->error;
    }

    $stmt->close();
    $conexion->close();
}
?>
