<?php
function condition($condition)
{
  $column = [];
  $values = [];
  foreach ($condition as $key => $value) {
    $column[] = "$key";
    $values[] = "$value";
  }
  $columnValid = [];
  foreach ($column as $key => $value) {
    if (!($key % 2)) {
      $columnValid[] = $value;
    }
  }
  $valuesValid = [];
  $logic = [];
  foreach ($values as $key => $value) {
    if ($key % 2) {
      $logic[] = $value;
    } else {
      $valuesValid[] = $value;
    }
  }
  $cond = [];
  for ($i = 0; $i < count($columnValid); $i++) {
    $in = $i;
    if ($in == count($columnValid) - 1) {
      $in = 0;
      $logic[0] = '';
    }
    $cond[] = "$columnValid[$i] = '$valuesValid[$i]'  $logic[$in] ";
  }
  return implode($cond);
}
function arr_update($array)
{
  $column = [];
  $values = [];
  foreach ($array as $key => $value) {
    $column[] = "$key";
    $values[] = "$value";
  }
  $setColValue = [];
  for ($i = 0; $i < count($column); $i++) {
    $setColValue[] = "$column[$i] = '$values[$i]' ";
  }
  return implode(",", $setColValue);
}

class DataBase
{
  public $connection;
  public function __construct($database, $database_host, $database_name, $database_username, $database_password)
  {
    $this->connection = new PDO("$database:host=$database_host;dbname=$database_name", $database_username, $database_password);
  }
  public function selectAll_Table($table)
  {
    $query = "SELECT * FROM $table";
    $sql = $this->connection->prepare($query);
    $sql->execute();
    $allData = $sql->fetchAll(PDO::FETCH_ASSOC);
    return $allData;
  }
  public function selectAll_NumberRow($table, $numberRows, $from)
  {
    $query = "SELECT * FROM $table ORDER BY Id DESC LIMIT $numberRows OFFSET $from ";
    $sql = $this->connection->prepare($query);
    $sql->execute();
    $allData = $sql->fetchAll(PDO::FETCH_ASSOC);
    return $allData;
  }
  public function selectAll_NumberRecords($table)
  {
    $query = "SELECT count(*) as count FROM $table";
    $sql = $this->connection->prepare($query);
    $sql->execute();
    $allData = $sql->fetchAll(PDO::FETCH_ASSOC);
    return $allData;
  }
  public function selectAll_table_condition($table, $condition)
  {
    $whereCondition = condition($condition);
    $query = "SELECT * FROM $table WHERE $whereCondition";
    $sql = $this->connection->prepare($query);
    $sql->execute();
    $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    return $data;
  }
  public function update($table, $columnValues, $condition)
  {
    $whereCondition = condition($condition);
    $setColumnValues = arr_update($columnValues);
    $query = "UPDATE $table SET $setColumnValues WHERE $whereCondition";
    $sql = $this->connection->prepare($query);
    $result = $sql->execute();
    return $result;
  }
  public function create_newData($table, $newData)
  {
    $column = [];
    $values = [];
    foreach ($newData as $key => $value) {
      $column[] = "$key";
      $values[] = "$value";
    }
    $column = implode(',', $column);
    $values = "'" . implode("','", $values) . "'";
    $query = "INSERT INTO $table($column) VALUES($values)";
    $sql = $this->connection->prepare($query);
    return $sql->execute();
  }
  public function delete($table, $condition)
  {
    $whereCondition = condition($condition);
    $query = "DELETE FROM $table WHERE $whereCondition";
    $sql = $this->connection->prepare($query);
    return $sql->execute();
  }
  public function validateSessionId($id)
  {
    $query = "SELECT IF(Id=$id,'true','false') as contain , imgPath ,name
            FROM `admin` order BY contain DESC LIMIT 1";
    $sql = $this->connection->prepare($query);
    $sql->execute();
    $result = $sql->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
}
// session_start();
// $_SESSION['user_id'] = 11;
session_start();
$dataBase = new DataBase('mysql', 'localhost', 'coffee_db_project', 'root', '1234');
$user_id = $_SESSION['user_id'];
$checkOnlyAdmin = $dataBase->validateSessionId($user_id);
$actual_link = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
if ($checkOnlyAdmin[0]['contain'] === 'true' && str_contains($actual_link, 'all_users.php')) {
  $data = file_get_contents('php://input');
  $data = json_decode($data, true);
  $response = $data;
  $sourceImage = false;
  if ($response == "count") {
    $numberUsers = $dataBase->selectAll_NumberRecords('user');
    $roomNumber = $dataBase->selectAll_Table('room');
    $numberUsersAndRoomNumber = json_encode(array_merge($numberUsers, $roomNumber,$checkOnlyAdmin));
    echo $numberUsersAndRoomNumber;
  } elseif ($response === null) {
    $errors = [];
    foreach ($_REQUEST as $key => $value) {
      if (empty($value)) {
        $errors[$key] = "$key is required";
      }
    }
    validImageUser();
    if ($errors) {
      echo json_encode($errors);
    } else {
      $result = $dataBase->update(
        'user',
        [
          "name" => $_REQUEST['fullName'],
          "roomNumber" => $_REQUEST['roomNumber'],
          "imgPath" => $sourceImage
        ],
        ['id' => $_REQUEST['id']]
      );
      echo $result;
    }
  } elseif (gettype($response) === 'array') {
    $result = $dataBase->delete(
      'user',
      ['id' => $response['id']]
    );
    echo $result;
  } else {
    $users = $dataBase->selectAll_NumberRow('user', 3, $response);
    $users = json_encode($users);
    echo $users;
  }
} elseif ($checkOnlyAdmin[0]['contain'] === 'false' && str_contains($actual_link, 'all_users.php')) {
  echo json_encode('noOne');
}
function validImageUser()
{
  global $errors;
  $mime_type = explode('/', $_FILES["image"]['type'])[1];
  $arrImages = ["png", "jpg", "jpeg"];
  if ($_FILES["image"]['size'] == 0) {
    $errors["image"] = "Error : Please Enter Product Image ..";
  } else if ($_FILES["image"]['size'] > 1024 * 1024) {
    $errors["image"] = 'Error : size of image must be maximum 1 mega';
  } else if (!in_array($mime_type, $arrImages)) {
    $errors["image"] = 'please upload png or jpg or jpeg';
  } else {
    $fileName = time() . '.' . $mime_type;
    move_uploaded_file($_FILES["image"]['tmp_name'], '../img/upload/' . $fileName);
    global $sourceImage;
    $sourceImage = '../img/upload/' . $fileName;
  }
}

?>