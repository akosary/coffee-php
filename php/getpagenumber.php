
<?php
session_start();
// $user_id;
$userid=$_SESSION['user_id'];
require('./connection.php');
  $query = "SELECT count(orders.Id) as numoforders FROM orders where id_user=$userid";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    if ($result) {
      $data = $sql->fetchall(PDO::FETCH_ASSOC);
      echo json_encode($data);
  }
  ?>