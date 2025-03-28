<?php
session_start(); // Start the session

header('Content-Type: application/json'); // Set header to return JSON

// Check if the session variables for first_name and last_name are set
if(isset($_SESSION['first_name']) && isset($_SESSION['last_name'])) {
    // If there's an active session with the user's first name and last name
    $userInfo = [
        'firstName' => $_SESSION['first_name'],
        'lastName' => $_SESSION['last_name'],
        // Optionally, include the user_id if needed elsewhere
        'userId' => $_SESSION['user_id'],
        'token' => $_SESSION['token']
    ];
    echo json_encode($userInfo);
} else {
    // If no active session or first name and last name not set, return an error message
    echo json_encode(['error' => 'User not logged in or session expired']);
}
?>