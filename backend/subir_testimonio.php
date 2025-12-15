<?php
session_start();
include 'conexion.php';

if (!isset($_SESSION['correo'])) {
    header("Location: ../index.html#testimonios");
    exit();
}

$correo = $_SESSION['correo'];

// Obtener ID REAL del usuario
$stmtUser = $conexion->prepare("SELECT Id_User FROM usuarios WHERE Correo = ?");
$stmtUser->bind_param("s", $correo);
$stmtUser->execute();
$resUser = $stmtUser->get_result();
$user = $resUser->fetch_assoc();
$idUser = $user['Id_User'];
$stmtUser->close();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $comentario = $_POST['comentario'];
    $estrellas = intval($_POST['estrellas']);
    $foto = NULL;
    // Si sube foto
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {
        $ext = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
        $nombreArchivo = uniqid("testimonio_") . "." . $ext;
        $destino = "../uploads/" . $nombreArchivo;

        if (move_uploaded_file($_FILES['foto']['tmp_name'], $destino)) {
            $foto = $nombreArchivo;
        }
    }
    // Insertar testimonio
    $stmt = $conexion->prepare(
        "INSERT INTO testimonios (Usuario, Comentario, Estrellas, Foto, Fecha)
         VALUES (?, ?, ?, ?, NOW())"
    );

    $stmt->bind_param("isis", $idUser, $comentario, $estrellas, $foto);

    if ($stmt->execute()) {

        echo "<script>
    window.onload = function(){
        alert('¡Testimonio agregado con éxito! ⭐');
        window.location='../index.html#testimonios';
    }
</script>";


    } else {
        echo "Error al guardar testimonio: " . $stmt->error;
    }

    $stmt->close();
    $conexion->close();
}
?>
