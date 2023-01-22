<?php
//start asession for a login user
session_start();


//start connection with database
$sql = 'mysql:host=localhost;dbname=coffee_db_project';
$con = new PDO($sql, 'root', '1234');


//validate all fields are required
$errors = [];
foreach ($_REQUEST as $key => $value) //assoitive array key value
{
    if (empty($value)) {
        $errors[$key] = "$key is requried";
    }
}

if ($errors) {
    setcookie('errors', json_encode($errors));
    header('Location:Login.html');
    exit();
} else {
    setcookie('errors', '', time() - 60);
}

//validation for email and password for admin and redirect for admin page
$email = $_REQUEST['email'];
$password = $_REQUEST['password'];
$query = " SELECT * from admin where email = :email  and password = :password  ";
$sql = $con->prepare($query);
$sql->bindParam('email', $email);
$sql->bindParam('password', $password); //to prevent injection to database..
$sql->execute();
$admin = $sql->fetch();

if ($admin) //if return only one admin
{
    // login to admin page
    $_SESSION['user_id'] = $admin['Id'];
    header('Location:session_Id.php'); //just for experiement
    exit();
}



//validation for email and password for user and redirect for users page
$email = $_REQUEST['email'];
$password = sha1($_REQUEST['password']);
$query = " SELECT * from user where email = :email  and password = :password  ";
$sql = $con->prepare($query);
$sql->bindParam('email', $email);
$sql->bindParam('password', $password); //to prevent injection to database..
$sql->execute();
$user = $sql->fetch();
if ($user) //if return only one user
{
    // login to users page
    $_SESSION['user_id'] = $user['Id'];
    header('Location:session_Id.php');
    exit();
} else {
    header('Location:Login.html');
    exit();
}