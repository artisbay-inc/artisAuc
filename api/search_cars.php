<?php
require_once "db_connect.php";

$make = isset($_GET['make']) ? $_GET['make'] : 'ALL';
$model = isset($_GET['model']) ? $_GET['model'] : 'ALL';
$auction = isset($_GET['auction']) ? $_GET['auction'] : 'ALL';

$query = "SELECT * FROM car_lots WHERE 1=1";
$params = [];

if (strtoupper($make) !== 'ALL' && !empty($make)) {
    $query .= " AND LOWER(make) = LOWER(?)";
    $params[] = $make;
}

if (strtoupper($model) !== 'ALL' && !empty($model)) {
    // Basic search for model, could be improved for comma-separated
    $query .= " AND LOWER(model) LIKE LOWER(?)";
    $params[] = "%$model%";
}

if (strtoupper($auction) !== 'ALL' && !empty($auction)) {
    $query .= " AND LOWER(auctionHouse) LIKE LOWER(?)";
    $params[] = "%$auction%";
}

try {
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $results = $stmt->fetchAll();
    
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
}
?>
