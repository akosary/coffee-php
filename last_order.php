<?php

session_start();
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=coffee_db_project', 'root', '1234');

$user_id = $_SESSION['user_id'] ;                                         //obtain user_id saved in session

$query = "SELECT * FROM product where Id = any(
    SELECT product_id FROM cart where order_id=(
    SELECT id FROM orders where id_user = '$user_id' ORDER BY created_at DESC LIMIT 1));";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    if($result){
    $data = $sql->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($data);
    }