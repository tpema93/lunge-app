<?php
session_start(); // Ensure the session is started

// Your database connection details
$servername = "oceanus.cse.buffalo.edu";
$username = "shariana";
$password = "50401138";
$dbname = "cse442_2024_spring_team_j_db";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the user is logged in by checking the session variable
if (!isset($_SESSION['user_id'])) {
    echo json_encode(array("error" => "User is not logged in."));
    $conn->close();
    exit();
}

$loggedInUserId = $_SESSION['user_id'];

// Query to retrieve matches where the logged-in user is user1_id
// and then join the result with the users table to get first_name and last_name
$query = "SELECT u.first_name, u.last_name 
          FROM matches m 
          JOIN users u ON m.user2_id = u.user_id 
          WHERE m.user1_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $loggedInUserId);
$stmt->execute();
$result = $stmt->get_result();

$matches = array();

// Fetch matches and add them to the array
while ($row = $result->fetch_assoc()) {
    $matches[] = array(
        "first_name" => $row['first_name'],
        "last_name" => $row['last_name']
    );
}

// Return matches as JSON
echo json_encode(array("matches" => $matches));

// Close the database connection and the prepared statement
$stmt->close();
$conn->close();
?>