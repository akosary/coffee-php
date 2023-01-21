<?php
require_once ('./connection.php');

$query = "SELECT * FROM `category`";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    if($result){
    $data = $sql->fetchall(PDO::FETCH_ASSOC);
    echo json_encode($data);
    }
  
    
?>