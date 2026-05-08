<?php
require_once "db_connect.php";

$sql = isset($_GET['sql']) ? $_GET['sql'] : 'SELECT * FROM main LIMIT 10';
$code = 'DvemR43s';
$ip = $_SERVER['REMOTE_ADDR'] ?? '1.2.3.4';

$url = "http://144.76.203.145/api/?ip={$ip}&json&code={$code}&sql=" . urlencode($sql);

$response = null;
$httpCode = 0;

// Method 1: cURL
if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 60,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
}

// Method 2: file_get_contents (fallback if curl failed or not available)
if ($httpCode !== 200 || !$response) {
    $httpCode = 0;
    if (ini_get('allow_url_fopen')) {
        $opts = [
            'http' => [
                'method' => 'GET',
                'timeout' => 60,
                'header' => "Accept: application/json\r\n",
            ]
        ];
        $context = stream_context_create($opts);
        $response = @file_get_contents($url, false, $context);
        if ($response !== false) {
            $httpCode = 200;
        }
    }
}

if ($httpCode === 200 && $response) {
    echo $response;
} else {
    echo json_encode([
        "error" => "External API request failed",
        "http_code" => $httpCode,
        "curl_enabled" => function_exists('curl_init'),
        "allow_url_fopen" => ini_get('allow_url_fopen'),
        "url" => $url,
    ]);
}
