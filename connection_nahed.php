<?php
require('./env.php');
$sql = DATABASE . ':host=' . DATABASE_host . ';dbname=' . DATABASE_name;
$con = new PDO($sql, DATABASE_username, DATABASE_password);