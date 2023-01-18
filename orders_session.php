<?php
require_once ('./connection.php');

$query = "SELECT  orders.Id,`name`,`created_at`,`room_no`,`status` FROM `user`,`orders` WHERE user.Id=orders.id_user and status LIKE 'processing' ORDER BY orders.Id limit 5;";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    $data = $sql->fetchall(PDO::FETCH_ASSOC);

    /////////////////////////////////////////////////////
    $query2 = "SELECT `Id`, `name`, `password`, `email`, `imgPath` FROM `admin` WHERE Id=1;";
    $sql2 = $con->prepare($query2);
    $result2 = $sql2->execute();
    $data_admin = $sql2->fetch(PDO::FETCH_ASSOC);
    
?>