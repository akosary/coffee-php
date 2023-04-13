<?php
$pdo = new PDO('mysql:host=localhost;dbname=coffee_db_project', 'root', '1234');
session_start();

$user_id= $_SESSION['user_id'];
$statement = $pdo->prepare("
INSERT INTO orders (`total_price`,`notes` ,`room_no`,`id_user`)
VALUES ($_REQUEST[total],'$_REQUEST[notes]' ,$_REQUEST[room],$user_id)");
$statement->execute();
?>