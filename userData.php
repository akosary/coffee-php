<?php
session_start();
require('./connection.php');
// $_SESSION[""]
$userid=$_SESSION['user_id'];
$query = "SELECT * FROM user where Id=$userid";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    // $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    if ($result) {
      $data = $sql->fetch(PDO::FETCH_ASSOC);
      echo json_encode($data);
  }
?>





