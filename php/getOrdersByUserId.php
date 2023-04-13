<?php

require 'class.php';

$userId= json_decode(file_get_contents("php://input"), true);

echo json_encode($obj->getOrdersByUserId('orders','id_user',$userId));
