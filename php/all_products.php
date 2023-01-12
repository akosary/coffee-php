<?php
include('./all_users.php');
$products = $dataBase->selectAll_Table('product');
$products = json_encode($products);
echo $products;
?>