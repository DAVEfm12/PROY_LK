<?php
session_start();
header('Content-Type: application/json');
if(!isset($_SESSION['user_id'])){ echo json_encode(['success'=>false,'msg'=>'No autorizado']); exit; }
require_once '../backend/conexion.php';
$uid = intval($_SESSION['user_id']);
$id = intval($_POST['id'] ?? 0);

$stmt = $conexion->prepare("UPDATE reservaciones SET estado='cancelada' WHERE id=? AND user_id=?");
$stmt->bind_param("ii",$id,$uid);
$ok = $stmt->execute();
if($ok){
  // add history
  $stmt2 = $conexion->prepare("INSERT INTO historial (user_id,tipo,detalle) VALUES (?,?,?)");
  $tipo='cancelacion'; $detalle = "Reserva #$id cancelada por usuario";
  $stmt2->bind_param("iss",$uid,$tipo,$detalle); $stmt2->execute();

  echo json_encode(['success'=>true,'msg'=>'Reservación cancelada']);
}else{
  echo json_encode(['success'=>false,'msg'=>'No se pudo cancelar']);
}
