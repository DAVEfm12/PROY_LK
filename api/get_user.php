<?php
session_start();
header('Content-Type: application/json');
if(!isset($_SESSION['user_id'])){ echo json_encode(['success'=>false]); exit; }
require_once '../backend/conexion.php';
$uid = intval($_SESSION['user_id']);
$stmt = $conexion->prepare("SELECT id,nombre,email,telefono,avatar FROM users WHERE id=?");
$stmt->bind_param("i",$uid); $stmt->execute();
$res = $stmt->get_result()->fetch_assoc();
echo json_encode(['success'=>true,'user'=>$res]);
