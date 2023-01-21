<?php
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=coffee_db_project', 'root', '1234');
session_start();
$_SESSION['id'] = 57;
$statement = $pdo->prepare("
INSERT INTO orders (`total_price`,`notes` ,`room_no`,`id_user`)
VALUES ($_REQUEST[total],'$_REQUEST[notes]' ,$_REQUEST[room],$_SESSION[id])");
$statement->execute();
?>