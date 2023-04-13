<?php

require 'class.php';

$obj = new DB('mysql','localhost','coffee_db_project','root',1234);

$countOfUsers = $obj->getPages();
echo json_encode( $countOfUsers);
