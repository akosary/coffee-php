<?php
require_once ('./connection.php');
$Name=$_POST['name'];
$Price=$_POST['price'];
$quantity=$_POST['quantity'];
$Category=$_POST['categories'];
// $Image=$_POST['img'];

$img_ex=explode('/',$_FILES['img']['type'])[1];
$img=$_FILES['img'];
$file_name_=time().'.'.$img_ex;
move_uploaded_file($img['tmp_name'],'./imgs/'.$file_name_);

$query = "INSERT INTO `product`( `name`, `price`, `quntity`, `imagePath`, `category_id`) VALUES
 ('$Name','$Price','$quantity','$file_name_','$Category')";
    $sql = $con->prepare($query);
    $result = $sql->execute();
    // $data = $sql->fetchall(PDO::FETCH_ASSOC);
    if($result){
        header('location:orders.php');
    }
    else{
        header('location:add_product.php');
    }
?>