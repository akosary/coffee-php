<?php
require_once ('./connection.php');
$Name=$_POST['name'];
$Price=$_POST['price'];
$quantity=$_POST['quantity'];
$Category=$_POST['categories'];


$img_ex=explode('/',$_FILES['formFile']['type'])[1];
$img=$_FILES['formFile'];
$file_name_=time().'.'.$img_ex;
move_uploaded_file($img['tmp_name'],'./img/'.$file_name_);
$path='./img/'.$file_name_;

$query = "INSERT INTO `product`( `name`, `price`, `quntity`, `imagePath`, `category_id`) VALUES
 ('$Name','$Price','$quantity','$path','$Category')";
    $sql = $con->prepare($query);
    $result = $sql->execute();

    if($result){
        header('location:orders.html');
    }
    else{
        header('location:add_product.html');
    }
?>