<?php
include "conexion.php";

$sql = "SELECT * FROM testimonios ORDER BY Id_Testimonio DESC";
$result = $conexion->query($sql);

$testimonios = [];

while($row = $result->fetch_assoc()){
    $testimonios[] = $row;
}

echo json_encode($testimonios);
?>
