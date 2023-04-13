<?php
// Database connection with PDO
$pdo = new PDO('mysql:host=localhost;dbname=coffee_db_project', 'root', '1234');

// Throw a PDOException if an error occurs.
// returns bool TRUE on success or FALSE on failure.
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Make a query to select all products data
// Prepares a statement for execution and returns a statement object
$statement = $pdo->prepare("SELECT count(name) as 'countOfPages' FROM product WHERE status='avilable'");
// Executes a prepared statement and returns bool TRUE on success or FALSE on failure.
$statement->execute();
// Returns an array containing all of the result set rows
$products = $statement->fetch(PDO::FETCH_ASSOC);

// return products data in a json format
echo json_encode($products);
