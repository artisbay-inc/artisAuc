<?php
require_once "db_connect.php";

$userId = isset($_GET['userId']) ? $_GET['userId'] : 1;

try {
    // Join with car_lots AND include group info
    $query = "
        SELECT b.id as bidId, b.bidAmount, b.bidStatus, b.created_at, 
               b.selectedGroup, b.selectedUnits, b.maxCeiling, b.customerNote,
               l.make, l.model, l.year, l.lotId, l.thumbnail
        FROM bids b
        LEFT JOIN car_lots l ON b.lotId = l.lotId
        WHERE b.userId = ?
        ORDER BY b.created_at DESC
    ";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute([$userId]);
    $results = $stmt->fetchAll();
    
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to fetch bids: " . $e->getMessage()]);
}
?>
