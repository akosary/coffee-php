<?php
session_start();
$userid=$_SESSION['user_id'];
require('./connection.php');
$from= json_decode(file_get_contents("php://input"), true)['from'];
$to= json_decode(file_get_contents("php://input"), true)['to'];
$pageNumber= json_decode(file_get_contents("php://input"), true)['pageNumber'];
$perPage= json_decode(file_get_contents("php://input"), true)['perPage'];
echo($pageNumber);
  $offset = $perPage * ($pageNumber - 1);
        $query = "SELECT * FROM`orders` WHERE id_user=$userid AND orders.created_at between '$from' and '$to'  LIMIT $perPage OFFSET $offset";
        $sql = $con->prepare($query);
        $result = $sql->execute();
        if ($result) {
          $data = $sql->fetchall(PDO::FETCH_ASSOC);
          echo json_encode($data);
        }
?>