<?php
$sql = 'mysql:host=localhost;dbname=coffee_db_project';
$con = new PDO ($sql,'root','1234');



$email=$_REQUEST['email'];
$Password=sha1($_REQUEST ['password']);
$query = " SELECT * from user where email = '$email' ";
$sql = $con->prepare($query);
$sql->execute();
if (count($sql->fetchAll()))                          //if returned email, excute inside if statment
{

    $query = " UPDATE user SET password = '$Password' where email = '$email' ";
    $sql = $con->prepare($query);
    $sql->execute();
    header('Location:index.html');
    exit();
}
else
{
    header('Location:forgetPassword.html');
}
