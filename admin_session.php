<?php
session_start();
require_once ('./connection.php');
if($_SESSION['user_id']){
    $admin_id=$_SESSION['user_id'];
$query2 = "SELECT `Id`, `name`, `password`, `email`, `imgPath` FROM `admin` WHERE Id=$admin_id;";
$sql2 = $con->prepare($query2);
$result2 = $sql2->execute();
    if($result2){
        $data_admin = $sql2->fetch(PDO::FETCH_ASSOC);
        echo json_encode($data_admin);
    }
}