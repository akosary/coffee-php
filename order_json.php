<?php

include_once('./connection.php');
if(isset($_COOKIE["order_id"])) {
   
   
    $id=$_COOKIE["order_id"];

        $query2 = "SELECT DISTINCT (product.Id),name,imagePath,product.price,cart.quntity,orders.total_price FROM product,cart,orders
        WHERE product.Id=cart.product_id AND cart.order_id=orders.Id AND cart.order_id =$id";
        $sql2 = $con->prepare($query2);
        $result2 = $sql2->execute();
        if ($result2) {
            $data2 = $sql2->fetchall(PDO::FETCH_ASSOC);
            echo json_encode($data2);
        }
      

    }
   
   else {
    echo json_encode(['error' => '!!!']);
  }

