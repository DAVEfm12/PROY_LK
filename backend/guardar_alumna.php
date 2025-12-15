<?php
require_once "conexion.php";
header("Content-Type: application/json");

// 1. Datos básicos
$nombre  = $_POST['nombre'] ?? "";
$correo  = $_POST['correo'] ?? "";
$telefono = $_POST['telefono'] ?? "";
$curso   = $_POST['curso'] ?? "";

// 2. Guardar alumna
$sql = "INSERT INTO alumnas (nombre_completo, correo, telefono, curso)
        VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nombre, $correo, $telefono, $curso);

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "No se pudo guardar la alumna"]);
    exit;
}

$id_alumna = $stmt->insert_id;

// 3. Subir documentos PDF
$uploads_dir = "../uploads/alumnas/" . $id_alumna;
if (!file_exists($uploads_dir)) mkdir($uploads_dir, 0777, true);

function subirPDF($fileKey, $uploads_dir) {
    if (!empty($_FILES[$fileKey]['name'])) {
        $filename = $fileKey . "_" . time() . ".pdf";
        $path = "$uploads_dir/$filename";
        move_uploaded_file($_FILES[$fileKey]['tmp_name'], $path);
        return $filename;
    }
    return null;
}

$acta = subirPDF("acta", $uploads_dir);
$curp = subirPDF("curp", $uploads_dir);
$ine_personal = subirPDF("ine_personal", $uploads_dir);
$ine_tutor    = subirPDF("ine_tutor", $uploads_dir);
$comp_estudios = subirPDF("comprobante_estudios", $uploads_dir);
$comp_domicilio = subirPDF("comprobante_domicilio", $uploads_dir);

// 4. Insertar documentos
$sql2 = "INSERT INTO documentos_alumna (
            id_alumna, acta_nacimiento, curp, ine, comprobante_estudios, comprobante_domicilio
        ) VALUES (?, ?, ?, ?, ?, ?)";
$stmt2 = $conn->prepare($sql2);
$stmt2->bind_param(
    "isssss",
    $id_alumna,
    $acta,
    $curp,
    $ine_personal,
    $comp_estudios,
    $comp_domicilio
);

$stmt2->execute();

echo json_encode(["status" => "ok"]);
?>
