<?php
require 'class.php';


$Date= json_decode(file_get_contents("php://input"), true);
$from = $Date['arrOfDate']['from'];
$to = $Date['arrOfDate']['to'];
$pageNumber = $Date['arrOfDate']['pageNumber'];
$perPage = $Date['arrOfDate']['perPage'];
echo json_encode($obj->getUsersByDateOfOrders($from,$to,$perPage,$pageNumber));

