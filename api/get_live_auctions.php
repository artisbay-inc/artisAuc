<?php
require_once "db_connect.php";

/**
 * api/get_live_auctions.php
 * Fetches car lots and their highest bids to represent "Live Auctions"
 */

try {
    // We'll join car_lots with the latest/highest bid from the bids table
    // Since the database.sql didn't show the bids table, we assume the structure from place_bid.php
    $query = "
        SELECT 
            c.id, 
            c.lotId, 
            c.year, 
            c.make, 
            c.model, 
            c.mileage, 
            c.grade, 
            c.transmission, 
            c.auctionHouse, 
            c.thumbnail, 
            c.auctionDate,
            COALESCE(MAX(b.bidAmount), 1000) as currentBid,
            COUNT(b.id) as bidderCount
        FROM car_lots c
        LEFT JOIN bids b ON c.lotId = b.lotId
        GROUP BY c.id
        ORDER BY c.auctionDate ASC
    ";

    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $lots = $stmt->fetchAll();

    // Enrich data with mock "live" fields if they don't exist in DB yet
    $enriched = array_map(function($lot) {
        // Mocking some fields for the "Live" experience until DB is expanded
        return [
            "id" => $lot['id'],
            "carId" => $lot['id'], // Using DB ID as carId
            "currentBid" => (int)$lot['currentBid'],
            "startingBid" => (int)$lot['currentBid'] * 0.8,
            "bidderCount" => (int)$lot['bidderCount'],
            "status" => "Live",
            "endTime" => date('Y-m-d H:i:s', strtotime($lot['auctionDate'] . ' + 17 hours')),
            "car" => [
                "id" => $lot['id'],
                "lotId" => $lot['lotId'],
                "year" => $lot['year'],
                "make" => $lot['make'],
                "model" => $lot['model'],
                "mileage" => (int)str_replace([',', ' km'], '', $lot['mileage']),
                "grade" => $lot['grade'],
                "transmission" => $lot['transmission'],
                "images" => [$lot['thumbnail']],
                "chassisNumber" => $lot['lotId']
            ]
        ];
    }, $lots);

    echo json_encode($enriched);

} catch (PDOException $e) {
    // Fallback if 'bids' table doesn't exist yet
    if (strpos($e->getMessage(), "Table 'artisbay_db.bids' doesn't exist") !== false) {
        $stmt = $pdo->prepare("SELECT * FROM car_lots LIMIT 20");
        $stmt->execute();
        $lots = $stmt->fetchAll();
        
        $enriched = array_map(function($lot) {
            return [
                "id" => $lot['id'],
                "carId" => $lot['id'],
                "currentBid" => 5000,
                "startingBid" => 3000,
                "bidderCount" => 0,
                "status" => "Live",
                "endTime" => date('Y-m-d H:i:s', strtotime('+2 days')),
                "car" => [
                    "id" => $lot['id'],
                    "lotId" => $lot['lotId'],
                    "year" => $lot['year'],
                    "make" => $lot['make'],
                    "model" => $lot['model'],
                    "mileage" => (int)str_replace([',', ' km'], '', $lot['mileage']),
                    "grade" => $lot['grade'],
                    "transmission" => $lot['transmission'],
                    "images" => [$lot['thumbnail']],
                    "chassisNumber" => $lot['lotId']
                ]
            ];
        }, $lots);
        echo json_encode($enriched);
    } else {
        echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
    }
}
?>
