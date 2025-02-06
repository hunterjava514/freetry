<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Basic validation
if (empty($data['wallet']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

// Compose email message
$to = $data['email'];
$subject = "USDT Payment Instructions for Property #".$data['propertyId'];
$message = "Please send exactly ".$data['amount']." USDT to our wallet address:\n\n";
$message .= "ERC20: 0x1234567890abcdef1234567890abcdef12345678\n";
$message .= "TRC20: TAbcdef1234567890abcdef1234567890abcdef\n\n";
$message .= "Include your wallet address (".$data['wallet'].") in the transaction memo.";

// Send email (configure your server's mail settings)
$headers = "From: sales@cryptorealestate.com";
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
