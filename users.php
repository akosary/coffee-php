<?php
// Database connection with PDO
$pdo = new PDO('mysql:host=localhost;dbname=coffee_db_project', 'root', '1234');
// Throw a PDOException if an error occurs.
// returns bool TRUE on success or FALSE on failure.
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$statement = $pdo->prepare("SELECT id , name FROM user");
// Executes a prepared statement and returns bool TRUE on success or FALSE on failure.
$statement->execute();
// Returns an array containing all of the result set rows
$products = $statement->fetchAll(PDO::FETCH_ASSOC);

// return products data in a json format
echo json_encode($products);
// if (isset($_POST['submit'])) {
//     $str = $_POST['search'];
//     echo $str;
// }
// session_start();
// $id = $_SESSION['id'];



?>