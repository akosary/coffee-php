<?php
// <link rel="stylesheet" href="./style.css">
// database
include_once('./connection.php');

$order_id=$_GET['id'];
$status=$_GET['status'];
$query = "UPDATE `orders` SET `status`='$status' WHERE orders.Id=$order_id;";
$sql = $con->prepare($query);
$result =   $sql->execute();
if ($result) {
    // $orders = $sql->fetchAll(PDO::FETCH_ASSOC);
    // echo json_encode($result);
    header('location:orders.php');
}

// echo $r;
// echo json_encode($r);
//////////////////////////////////////////////////////////////////
// $query2 = "SELECT DISTINCT (product.Id),name,imagePath,product.price,cart.quntity,orders.total_price FROM product,cart,orders
//     WHERE product.Id=cart.product_id AND cart.order_id=orders.Id AND cart.order_id =$order_id ";
//     $sql2 = $con->prepare($query2);
//     $result2 = $sql2->execute();
    
// if ($result2) {
//     $data2 = $sql2->fetchall(PDO::FETCH_ASSOC);
//     echo json_encode($data2);

// }
