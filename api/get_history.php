<?php
session_start();
header('Content-Type: application/json');
if(!isset($_SESSION['user_id'])){ echo json_encode(['success'=>false]); exit; }
require_once '../backend/conexion.php';
$uid = intval($_SESSION['user_id']);
$stmt = $conexion->prepare("SELECT tipo,detalle,created_at FROM historial WHERE user_id=? ORDER BY created_at DESC LIMIT 50");
$stmt->bind_param("i",$uid); $stmt->execute();
$res = $stmt->get_result();
$rows=[];
while($r=$res->fetch_assoc()) $rows[] = $r;
echo json_encode(['success'=>true,'history'=>$rows]);
