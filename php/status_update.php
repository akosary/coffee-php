<?php
session_start();
include_once('./connection.php');
if($_SESSION['user_id']){
$order_id=json_decode(file_get_contents("php://input"),true)[0];

$status=json_decode(file_get_contents("php://input"),true)[1];

$query = "UPDATE `orders` SET `status`='$status' WHERE orders.Id=$order_id;";

$sql = $con->prepare($query);
$result =   $sql->execute();
if ($result) {

    header('location:orders.html');
   
}
}


