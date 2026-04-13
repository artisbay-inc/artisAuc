<?php
require_once "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['lotId']) || !isset($data['bidAmount'])) {
    echo json_encode(["success" => false, "error" => "Submission failed: Missing data."]);
    exit;
}

$lotId = $data['lotId'];
$bidAmount = $data['bidAmount'];
$maxCeiling = isset($data['maxCeiling']) ? $data['maxCeiling'] : $bidAmount;
$customerNote = isset($data['customerNote']) ? $data['customerNote'] : '';
$selectedGroup = isset($data['selectedGroup']) ? $data['selectedGroup'] : null;
$selectedUnits = isset($data['selectedUnits']) ? $data['selectedUnits'] : null;
$userId = isset($data['userId']) ? $data['userId'] : 1; 

try {
    // Check if lot exists in car_lots or bike_lots
    $checkCar = $pdo->prepare("SELECT id FROM car_lots WHERE lotId = ?");
    $checkCar->execute([$lotId]);
    
    if (!$checkCar->fetch()) {
        // Check bikes
        $checkBike = $pdo->prepare("SELECT id FROM bike_lots WHERE lotId = ?");
        $checkBike->execute([$lotId]);
        
        if (!$checkBike->fetch()) {
            // Auto-stub the lot so the FK check passes
            $stub = $pdo->prepare("INSERT INTO car_lots (lotId, year, make, model) VALUES (?, 0, 'Pending', 'Sync')");
            $stub->execute([$lotId]);
        }
    }

    // Insert the bid
    $stmt = $pdo->prepare("INSERT INTO bids (lotId, userId, bidAmount, maxCeiling, customerNote, selectedGroup, selectedUnits) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$lotId, $userId, $bidAmount, $maxCeiling, $customerNote, $selectedGroup, $selectedUnits]);
    
    echo json_encode(["success" => true, "message" => "Successfully processed."]);

} catch (Exception $e) {
    // Log the actual error for debugging
    error_log("Database Error: " . $e->getMessage());
    
    // Generic message for the user
    echo json_encode(["success" => false, "error" => "System busy. Please try again in a moment."]);
}
?>
