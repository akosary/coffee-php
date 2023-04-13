<?php
session_start();
require('./connection.php');
$userid=$_SESSION['user_id'];
$Page=json_decode(file_get_contents("php://input"),true)['pageNumber'];
$perPage=json_decode(file_get_contents("php://input"),true)['perPage'];
        $offset = $perPage * ($Page - 1);
        $query = "SELECT * FROM `orders`  where id_user=$userid LIMIT $perPage OFFSET $offset" ;
        $sql = $con->prepare($query);
        $result = $sql->execute();
            // $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            if ($result) {
              $data = $sql->fetchall(PDO::FETCH_ASSOC);
              echo json_encode($data);
          }

?>


