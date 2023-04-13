<?php
session_start();
require_once ('./connection.php');
if($_SESSION['user_id']){

$query = "SELECT  orders.Id,`name`,`created_at`,`room_no`,`status` FROM `user`,`orders` WHERE user.Id=orders.id_user and status LIKE 'processing' ORDER BY orders.Id DESC LIMIT 7 ;";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    if($result){
    $data = $sql->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($data);
    }
}

?>