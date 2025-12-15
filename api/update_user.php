<?php
session_start();
header('Content-Type: application/json');
if(!isset($_SESSION['user_id'])){ echo json_encode(['success'=>false,'msg'=>'No autorizado']); exit; }
require_once '../backend/conexion.php';
$uid = intval($_SESSION['user_id']);

$nombre = trim($_POST['nombre'] ?? '');
$email  = trim($_POST['email'] ?? '');
$telefono= trim($_POST['telefono'] ?? '');

$avatar_name = null;
if(!empty($_FILES['avatar']['name'])){
  $ok = true;
  $ext = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
  $allowed = ['jpg','jpeg','png','webp'];
  if(!in_array(strtolower($ext), $allowed)) $ok = false;
  if($ok){
    $avatar_name = 'avatar_'.$uid.'_'.time().'.'.$ext;
    move_uploaded_file($_FILES['avatar']['tmp_name'], '../uploads/'.$avatar_name);
  }
}

// update fields
if($avatar_name){
  $stmt = $conexion->prepare("UPDATE users SET nombre=?, email=?, telefono=?, avatar=? WHERE id=?");
  $stmt->bind_param("ssssi", $nombre, $email, $telefono, $avatar_name, $uid);
}else{
  $stmt = $conexion->prepare("UPDATE users SET nombre=?, email=?, telefono=? WHERE id=?");
  $stmt->bind_param("sssi", $nombre, $email, $telefono, $uid);
}
$ok = $stmt->execute();
echo json_encode(['success'=>boolval($ok),'msg'=> $ok ? 'Datos actualizados' : 'Error al actualizar']);
