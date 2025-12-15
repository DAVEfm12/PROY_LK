<?php
session_start();
header('Content-Type: application/json');
if(!isset($_SESSION['user_id'])){ echo json_encode(['success'=>false]); exit; }
require_once '../backend/conexion.php';
$uid = intval($_SESSION['user_id']);

// ejemplo simple: leer historial foto_subida
$stmt = $conexion->prepare("SELECT detalle FROM historial WHERE user_id=? AND tipo='foto_subida' ORDER BY created_at DESC LIMIT 30");
$stmt->bind_param("i",$uid); $stmt->execute();
$res = $stmt->get_result();
$imgs=[];
while($r=$res->fetch_assoc()){
  $imgs[] = ['url' => '../uploads/'.$r['detalle']];
}
echo json_encode(['success'=>true,'images'=>$imgs]);
