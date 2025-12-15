<?php
header('Content-Type: application/json');
require 'conexion.php';

// Devuelve un JSON:
// { dates: ['2025-12-05','2025-12-07'], occupancy: {'2025-12-05': 3, '2025-12-07': 7 } }

try {
    $stmt = $pdo->query("SELECT Fecha, COUNT(*) AS cnt FROM citas WHERE Fecha >= CURDATE() GROUP BY Fecha");
    $dates = [];
    $occ = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $d = $row['Fecha']; // YYYY-MM-DD
        $c = (int)$row['cnt'];
        $dates[] = $d;
        $occ[$d] = $c;
    }
    echo json_encode(['dates' => $dates, 'occupancy' => $occ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB error: '.$e->getMessage()]);
}
