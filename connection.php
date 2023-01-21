<?php
require('./env.php');
$sql = DATABASE . ':host=' . DATABASE_Host . ';dbname=' . DATABASE_Name;

$con = new PDO ($sql, DATABASE_UserName, DATABASE_Password)
?>