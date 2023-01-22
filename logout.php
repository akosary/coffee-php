<?php

unset($_SESSION['user_id']);
setcookie("PHPSESSID", "", time() - 3600);
header('Location: http://localhost/login.html');