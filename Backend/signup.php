<?php
session_start(); // Start the session at the beginning

// Generate CSRF token
if (empty($_SESSION['token'])) {
    $_SESSION['token'] = bin2hex(random_bytes(32));
}

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

$firstName = $_POST['first_name'] ?? '';
$lastName = $_POST['last_name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Sanitize user input
$firstName = filter_var($firstName, FILTER_SANITIZE_STRING);
$lastName = filter_var($lastName, FILTER_SANITIZE_STRING);
$email = filter_var($email, FILTER_SANITIZE_EMAIL); // Use FILTER_SANITIZE_EMAIL for email
$password = filter_var($password, FILTER_SANITIZE_STRING);

// Check if the email is already registered
$emailCheckQuery = "SELECT email FROM users WHERE email = ?";
$stmt = $conn->prepare($emailCheckQuery);
$stmt->bind_param("s", $email);
$stmt->execute();
$emailCheckResult = $stmt->get_result();

if ($emailCheckResult->num_rows > 0) {
    $response['status'] = 'error';
    $response['message'] = 'Email already registered.';
    echo json_encode($response);
    $stmt->close();
    $conn->close();
    exit();
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert the new user into the users table
$sql = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword);

if ($stmt->execute()) {
    // Set session variables
    $_SESSION['user_id'] = $stmt->insert_id;
    $_SESSION['first_name'] = $firstName;
    $_SESSION['last_name'] = $lastName;

    $response['status'] = 'success';
    $response['message'] = 'Signup successful';
    $response['firstName'] = $firstName; // Include firstName in response
    $response['lastName'] = $lastName; // Include lastName in response
} else {
    $response['status'] = 'error';
    $response['message'] = "Error: " . $stmt->error;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
