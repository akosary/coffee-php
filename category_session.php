<?php
require_once ('./connection.php');
$Name=$_POST['name'];

// print_r($_REQUEST);

$query = "INSERT INTO `category`( `name`) VALUES ('$Name')";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    // $data = $sql->fetchall(PDO::FETCH_ASSOC);
    if($result){
        header('location:orders.html');
    }
    else{
        header('location:add_category.html');
    }
?>