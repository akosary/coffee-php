<?php
session_start();
require('./class.php');
if(!isset( $_SESSION['user_id'])){
    echo json_encode(['login'=>'notValid']);
    exit();
};

$user_id = $_SESSION['user_id'];
$result = $obj->validateSessionId($user_id);
if($result['contain'] == 'true'){
    // require_once('./session_restrict.php');
    $data = $obj->show('admin','Id',$user_id);
    echo json_encode(["Data"=>$data , "role"=>"admin"]);
    exit();
}else{
    require_once('./session_restrict.php');
    $data = $obj->show('user','Id',$user_id);
    echo json_encode(["Data"=>$data , "role"=>"user"]);
    exit();
}