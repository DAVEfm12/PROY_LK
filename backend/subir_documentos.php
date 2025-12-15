/ Carpeta destino
$uploadDir = "../uploads/documentos/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Función para subir archivo
function subirPDF($inputName, $uploadDir) {
    if (!empty($_FILES[$inputName]["name"])) {
        $fileName = time() . "_" . $_FILES[$inputName]["name"];
        $destino = $uploadDir . $fileName;
        move_uploaded_file($_FILES[$inputName]["tmp_name"], $destino);
        return $fileName;
    }
    return null;
}

// Guardar archivos (si existen)
$acta = subirPDF("acta", $uploadDir);
$curp = subirPDF("curp", $uploadDir);
$ine_personal = subirPDF("ine_personal", $uploadDir);
$ine_tutor = subirPDF("ine_tutor", $uploadDir);
$estudios = subirPDF("comprobante_estudios", $uploadDir);
$domicilio = subirPDF("comprobante_domicilio", $uploadDir);

// Guardar en BD
$sql = "INSERT INTO alumnas (nombre, correo, telefono, curso, acta, curp, ine_personal, ine_tutor, estudios, domicilio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssssssssss", $nombre, $correo, $telefono, $curso, $acta, $curp, $ine_personal, $ine_tutor, $estudios, $domicilio);

if ($stmt->execute()) {
    echo "✔ Solicitud enviada correctamente. La instructora revisará tu documentación.";
} else {
    echo "❌ Error al enviar la solicitud.";
}