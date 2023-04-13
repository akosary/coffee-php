<?php

require 'class.php';

$orderId= json_decode(file_get_contents("php://input"), true);
// var_dump($orderId);

echo json_encode($obj->getOrderDetails('cart','order_id',$orderId));