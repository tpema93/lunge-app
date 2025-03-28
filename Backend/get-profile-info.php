<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$servername = "oceanus.cse.buffalo.edu";
$username = "shariana";
$password = "50401138";
$dbname = "cse442_2024_spring_team_j_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user_id from request (assuming it's sent as a POST parameter) ( dont need to sanitize this because it's not user input)
$user_id = $_POST['user_id'] ?? ''; 

// Check if user_id is provided
if ($user_id == '') {
    $response['status'] = 'error';
    $response['message'] = 'user_id is missing';
    echo json_encode($response);
    exit;
}

// Execute the SQL query
$sql = "SELECT birthday, gender, pref, bio, image_1, image_2 FROM profile_info WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$result = $stmt->execute();
$data = $stmt->get_result();

$response = array();

// Check if the query was successful
if ($result) {

    // Fetch the data and do something with it
    if ($row = $data->fetch_assoc()){
    $response['status'] = 'success';
    $response['birthday'] = $row['birthday'];
    $response['gender'] = $row['gender'];
    $response['pref'] = $row['pref'];
    $response['bio'] = $row['bio'];
    $response['image_1'] = base64_encode($row['image_1']);
    if ($row['image_2'] != NULL) {
        $response['image_2'] = base64_encode($row['image_2']);
    } else {
        $response['image_2'] = NULL;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'No profile info found';
        
}} else {
    $response['status'] = 'error';
    $response['message'] = $stmt->error;
}

// Close the database connection

echo json_encode($response);
$stmt->close();
$conn->close();