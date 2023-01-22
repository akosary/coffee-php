<?php
session_start();
require('./connection.php');
$from= json_decode(file_get_contents("php://input"), true)['from'];
$to= json_decode(file_get_contents("php://input"), true)['to'];
// $to = $Date['to'];
$id = $_SESSION['user_id'];
echo($to);
    $query = "SELECT count(*) as 'CountOforders' FROM `orders` WHERE id_user=$id AND orders.created_at between '$from' and '$to'";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    if ($result) {
      $data = $sql->fetchall(PDO::FETCH_ASSOC);
      echo json_encode($data);
      
      }
      
?>
