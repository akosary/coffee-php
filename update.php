<?php
require('./connection.php');
// $data = file_get_contents("php://input");
$orderid=json_decode(file_get_contents("php://input"),true)['ORDER_ID'];
$query = "UPDATE orders set status='canceled' where Id=$orderid";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    if ($result) {
      $data = $sql->fetch(PDO::FETCH_ASSOC);
      echo json_encode($data);
  }
