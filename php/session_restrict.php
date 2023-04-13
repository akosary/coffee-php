<?php

$user_id = $_SESSION['user_id'];
$result = $obj->validateSessionId($user_id);
if($result['contain'] != 'true'){
    header("location: 404.html");
    exit();
}else{
    header("location: 404.html");
    exit();
    // header('WWW-Authenticate: Basic realm=“Test restricted area”');
    // header('HTTP/1.0 401 Unauthorized');
}