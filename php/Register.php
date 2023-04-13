<?php
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
    header('Location:Register.html');
    exit();
} else {
    setcookie('errors', '', time() - 60); //set empty string in errors if there is no errors //remove cookies
}



//Validate Name and redirect with error massage
$Name_Pattern = '/(^[A-Za-z]+)\s([A-Za-z]+)$/';
$Name = $_REQUEST['fullName'];
if (!preg_match($Name_Pattern, $Name)) {
    setcookie('errors', json_encode(['fullName' => 'Error : Your Name does not match formatting (Example : Mohamed Shehata)']));
    header('Location:register.html');
    exit();
} else {
    setcookie('errors', '', time() - 60);
}




//Validate email and redirect with error massage
//echo ;  //return email if valid , if not valid it returns false
// $email_pattern = '/^(\w+)@([A-Za-z]{3,})[.]([A-Za-z]{3,})$/';
$email = $_REQUEST['email'];
// preg_match_all($email_pattern, $email)
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    setcookie('errors', json_encode(['email' => 'Error : Your Email does not match formatting (abc@yahoo.com)']));
    header('Location:register.html');
    exit();
} else {
    setcookie('errors', '', time() - 60);
}



//validate password and redirect with error massage
$password_pattern = '/^[0-9]{4,8}$/';
$Password = $_REQUEST['password'];
if (!preg_match($password_pattern, $Password)) //return true if valid password and false if not valid 
{
    setcookie('errors', json_encode(['password' => 'Error: Your Password does not match Formatting (********...)']));
    header('Location:register.html');
    exit();
} else {
    setcookie('errors', '', time() - 60);
}


//validtion for confirm password and redirect with error massage
$confirmPasssword = $_REQUEST['Confirm_Password'];
if ($confirmPasssword != $Password) {
    setcookie('errors', json_encode(['Confirm_Password' => 'Error : Your Confirm Password does not match your password']));
    header('Location:register.html');
    exit();
} else {
    setcookie('errors', '', time() - 60);
}



//start connection with data base
//validate if email is exists or not in database
$query = " SELECT * from user where email = '$email' ";
$sql = $con->prepare($query);
$sql->execute();
if (count($sql->fetchAll())) //if returned email, excute inside if statment
{
    setcookie('errors', json_encode(['email' => 'Error : Your email is already exists']));
    header('Location:register.html');
    exit();
} else {
    setcookie('errors', '', time() - 60);
}


// validate if room number is exists or not in database
$roomNumber = $_REQUEST['room_number'];
$query = " SELECT * from user where roomNumber = '$roomNumber' ";
$sql = $con->prepare($query);
$sql->execute();
if (count($sql->fetchAll())) //if returned email, excute inside if statment
{
    setcookie('errors', json_encode(['room_number' => 'Room number is already reserved']));
    header('Location:register.html');
    exit();
} else {
    setcookie('errors', '', time() - 60);
}

//validate if room number is not exists in room table
$query = " SELECT * from room where id = '$roomNumber' ";
$sql = $con->prepare($query);
$sql->execute();
if (count($sql->fetchAll())) //if returned email, excute inside if statment
{
    setcookie('errors', '', time() - 60);
} else {
    setcookie('errors', json_encode(['room_number' => 'Room number is invaild']));
    header('Location:register.html');
    exit();
}



//validate for file 
$Profile_image = $_FILES['formFile'];
// print_r($Profile_image);
$extention = explode('/', $Profile_image['type'])[1];
if ($Profile_image['size'] == 0) {
    setcookie('errors', json_encode(['formFile' => 'Error : Please Enter Your Profile Image .. ']));
    header('Location:Register.html');
    exit();
    // echo "true";
} else if ($Profile_image['size'] > 5000000) {
    setcookie('errors', json_encode(['formFile' => 'Error : Your size of image does not match the formatting .. ']));
    header('Location:Register.html');
    exit();
    // echo "true";
} else if (!($extention != 'jpg' || $extention != 'png' || $extention != 'jpeg')) {
    setcookie('errors', json_encode(['formFile' => 'Your image extention does not match the formatting (.pdf , .jpg , .png )']));
    header('Location:Register.html');
    exit();
    // echo "true";
} else {
    // echo "false";
    setcookie('errors', '', time() - 60);
    $fileName = time() . '.' . $extention;
    move_uploaded_file($Profile_image['tmp_name'], './customers/' . $fileName);
    $Path_img = './customers/' . $fileName;

}











//////////////////////////////////// End of Validation ////////////////////////////////////////////

//////////////////////////////////// Insert data into database ////////////////////////////////////

//md5 sha1   
$Password = sha1($_REQUEST['password']); //to encrypt password
$query = "INSERT INTO user (`name`,`email`,`password`,`imgPath` ,`roomNumber`) VALUES ('$Name','$email','$Password','$Path_img' ,'$roomNumber')";
$sql = $con->prepare($query);
$result = $sql->execute();
//after insertion data
if ($result) {
    header('Location:session_Id.php');
} else {
    header('Location:register.html');
}
$query = "SELECT max(`Id`) as id FROM user";
$sql = $con->prepare($query);
$result = $sql->execute();
$user = $sql->fetch(PDO::FETCH_ASSOC);
$_SESSION['user_id'] = $user['id'];



// //select room query
// $query = "SELECT id FROM room " ;
// $sql = $con->prepare($query);
// $result = $sql->execute();
// $data = $sql->fetchall(PDO::FETCH_ASSOC);