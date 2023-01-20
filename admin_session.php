<?php
require_once ('./connection.php');
$query2 = "SELECT `Id`, `name`, `password`, `email`, `imgPath` FROM `admin` WHERE Id=1;";
$sql2 = $con->prepare($query2);
$result2 = $sql2->execute();
    if($result2){
        $data_admin = $sql2->fetch(PDO::FETCH_ASSOC);
        echo json_encode($data_admin);
    }