<?php
session_start();
require('./class.php');
$user_id = $_SESSION['user_id'];
$result = $obj->validateSessionId($user_id);
if ($result['contain'] == 'true') {
    header('Location:index.html');
} else {
    header('Location:user-home_last_one.html');
}
?>