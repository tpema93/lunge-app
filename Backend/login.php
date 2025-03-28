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

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Sanitize email and password
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$password = filter_var($password, FILTER_SANITIZE_STRING);

// Prepare a statement to prevent SQL injection
$stmt = $conn->prepare("SELECT user_id, first_name, last_name, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Verify the password
    if (password_verify($password, $user['password'])) {
        // Store data in session variables
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['first_name'] = $user['first_name'];
        $_SESSION['last_name'] = $user['last_name'];

        $response['status'] = 'success';
        $response['message'] = 'Login successful.';
    } else {
        // Password is not valid
        $response['status'] = 'error';
        $response['message'] = 'Invalid email or password.';
    }
} else {
    // Email does not exist
    $response['status'] = 'error';
    $response['message'] = 'Invalid email or password.';
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
