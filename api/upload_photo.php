<?php
session_start();
header('Content-Type: application/json');
if(!isset($_SESSION['user_id'])){ echo json_encode(['success'=>false,'msg'=>'No autorizado']); exit; }
require_once '../backend/conexion.php';
$uid = intval($_SESSION['user_id']);

if(empty($_FILES['foto']['name'])){ echo json_encode(['success'=>false,'msg'=>'No file']); exit; }
$ext = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
$allowed = ['jpg','jpeg','png','webp'];
if(!in_array(strtolower($ext), $allowed)) { echo json_encode(['success'=>false,'msg'=>'Formato no permitido']); exit; }

$fname = 'user_'.$uid.'_'.time().'.'.$ext;
$dest = '../uploads/'.$fname;
if(move_uploaded_file($_FILES['foto']['tmp_name'], $dest)){
  // opcional: guarda referencia en historial o tabla images
  $stmt = $conexion->prepare("INSERT INTO historial (user_id,tipo,detalle) VALUES (?,?,?)");
  $tipo = 'foto_subida'; $detalle = $fname;
  $stmt->bind_param("iss",$uid,$tipo,$detalle); $stmt->execute();

  echo json_encode(['success'=>true,'msg'=>'Imagen subida']);
}else{
  echo json_encode(['success'=>false,'msg'=>'Error al mover archivo']);
}
