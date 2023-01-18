<?php
require('./connection.php');
// $egp="EGP";

// function get_orders(){
//   global $con;
//     $query = "SELECT * FROM orders where id_user=293";
//     $sql = $con->prepare($query);
//     $result = $sql->execute();
//     $data = $sql->fetchAll(PDO::FETCH_ASSOC);
//     return $data;
// }

$userid=11;
$query = "SELECT * FROM user where Id=$userid";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    // $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    if ($result) {
      $data = $sql->fetch(PDO::FETCH_ASSOC);
      echo json_encode($data);
  }
?>





