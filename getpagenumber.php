
<?php
session_start();
$user_id;
require('./connection.php');
  $query = "SELECT count(orders.Id) as numoforders FROM orders where id_user=15";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    if ($result) {
      $data = $sql->fetchall(PDO::FETCH_ASSOC);
      echo json_encode($data);
  }
  ?>