<?php
include('./all_users.php');
$response = "$_SERVER[REMOTE_PORT]";
if ($response === 0) {
  $numberProducts = $dataBase->selectAll_NumberRecords('product');
  $numberProducts = json_encode($numberProducts);
  echo $numberProducts;
  echo '<br>';
  echo "$_SERVER[REMOTE_PORT]";
  echo '<br>';
  echo "$_SERVER[REQUEST_TIME_FLOAT]";
} else {
  $products = $dataBase->selectAll_NumberRow('product', 3, 0);
  $products = json_encode($products);
  $data = file_get_contents('php://input');
  $data = json_decode($data, true);
  print_r($data);
}
?>