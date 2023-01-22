<?php

require 'class.php';

$Date= json_decode(file_get_contents("php://input"), true);
$from = $Date['from'];
$to = $Date['to'];

echo json_encode($obj->getUsersByDateOfOrder($from,$to));

