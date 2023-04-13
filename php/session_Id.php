<?php
session_start();
require('./class.php');
$user_id = $_SESSION['user_id'];
$result = $obj->validateSessionId($user_id);
$admin;
if ($result['contain'] == 'true') {
    header('Location:user-home_last_oneAdmin.html');
    $admin=$user_id;
    echo json_encode(["admin_id"=>$admin]);
} else {
    header('Location:user-home_last_one.html');
}








?>