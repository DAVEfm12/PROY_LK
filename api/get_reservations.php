<?php
session_start();
header('Content-Type: application/json');
if(!isset($_SESSION['user_id'])) { echo json_encode(['success'=>false,'msg'=>'No autorizado']); exit; }
require_once '../backend/conexion.php';
$uid = intval($_SESSION['user_id']);

$stmt = $conexion->prepare("SELECT id,servicio,fecha,hora,estado,imagen,info,created_at FROM reservaciones WHERE user_id=? ORDER BY fecha ASC, hora ASC");
$stmt->bind_param("i",$uid); $stmt->execute();
$res = $stmt->get_result();
$rows=[];
while($r=$res->fetch_assoc()){
  $rows[] = [
    'id'=>$r['id'],
    'servicio'=>$r['servicio'],
    'fecha'=>date('d/m/Y', strtotime($r['fecha'])),
    'hora'=>substr($r['hora'],0,5),
    'estado'=>$r['estado'],
    'imagen'=>$r['imagen'],
    'info'=>$r['info']
  ];
}
echo json_encode(['success'=>true,'reservas'=>$rows]);
