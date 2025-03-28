<?php


// Database connection details
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


// Assuming you're sending a POST request with 'name' of the matched user
// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the JSON POST body and decode it
    $content = file_get_contents("php://input");
    $decoded = json_decode($content, true);


    // Extract the 'name' from the decoded data
    $name = $conn->real_escape_string($decoded['name']);


    // SQL to insert the new match
    // Note: Adjust the SQL according to your database schema. This example assumes you have a 'name' column.
    $sql = "INSERT INTO matches (matching) VALUES ('$name')";


    // Execute the query and check if it was successful
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => "New match added successfully."));
    } else {
        echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
    }
} else {
    // If the request is not a POST request, return an error message
    echo json_encode(array("error" => "This endpoint accepts only POST requests."));
}


// Close the database connection
$conn->close();


?>
