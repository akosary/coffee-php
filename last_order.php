<?php

session_start();
require_once ('./connection.php');

$user_id = 57 ;                                         //obtain user_id saved in session

$query = "SELECT * FROM product where Id = any(
    SELECT product_id FROM cart where order_id=(
    SELECT id FROM orders where id_user = '$user_id' ORDER BY created_at DESC LIMIT 1));;";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    if($result){
    $data = $sql->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($data);
    }