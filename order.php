<?php
require('./connection.php');

$userid=35;

$query = "SELECT * FROM orders where id_user=$userid";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    // $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    if ($result) {
      $data = $sql->fetchall(PDO::FETCH_ASSOC);
      echo json_encode($data);
  }

?>


