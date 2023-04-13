<?php
session_start();
require('./connection.php');
$orderid=json_decode(file_get_contents("php://input"),true)['ORDER_ID'];
$query = "SELECT c.price as price,p.name as name,c.quntity as quntity, p.imagePath as imagePath  FROM product as p,cart as c where c.order_id=$orderid and p.Id=c.product_id";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    // $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    if ($result) {
      $data = $sql->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($data);
  }
?>


 