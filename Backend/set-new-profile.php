<?php

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

$token = $_POST['token'] ?? '';
if ($csrf_token !== $_SESSION['token']) {
    $response['status'] = 'error';
    $response['message'] = 'Invalid CSRF token';
    echo json_encode($response);
    exit;
}

// Retrieve data from React app
$user_id = $_POST['user_id'] ?? '';
$birthday = $_POST['birthday'] ?? '';
$gender = $_POST['gender'] ?? '';
$pref = $_POST['pref'] ?? '';
$bio = $_POST['bio'] ?? '';
$null = null;

// Sanitize user input
$user_id = filter_var($user_id, FILTER_SANITIZE_STRING);
$birthday = filter_var($birthday, FILTER_SANITIZE_STRING);
$gender = filter_var($gender, FILTER_SANITIZE_STRING);
$pref = filter_var($pref, FILTER_SANITIZE_STRING);
$bio = filter_var($bio, FILTER_SANITIZE_STRING);

// Check if image file was uploaded successfully
if (isset($_FILES['image_1']) && $_FILES['image_1']['error'] === UPLOAD_ERR_OK) {
    $image_1 = file_get_contents($_FILES['image_1']['tmp_name']);
    $filecheck = "file uploaded";

} else {
    $image_1 = null;
}
if (isset($_FILES['image_2']) && $_FILES['image_2']['error'] === UPLOAD_ERR_OK) {
    $image_2 = file_get_contents($_FILES['image_2']['tmp_name']);
    $filecheck = "file uploaded";

} else {
    $image_2 = null;
}


// Prepare SQL statement to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO profile_info (user_id, birthday, gender, pref, bio, image_1, image_2) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("issssbb", $user_id, $birthday, $gender, $pref, $bio, $null, $null);
$stmt->send_long_data(5, $image_1);
$stmt->send_long_data(6, $image_2);
$result = $stmt->execute();

$response = array();

if($result){
    $response['status'] = 'success';
    $response['message'] = 'Profile created successfully.';
} else {
    $response['status'] = 'error';
    $response['message'] = $stmt->error;
}

echo json_encode($response);

$stmt->close();
$conn->close();