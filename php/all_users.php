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
    $query = "SELECT * FROM $table LIMIT $numberRows OFFSET $from";
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
}
if (strpos($_SERVER["HTTP_ORIGIN"], "javascript") == false) {
  header("Access-Control-Allow-Origin: " . $_SERVER["HTTP_ORIGIN"]);
}
// header("Access-Control-Allow-Origin: *");
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//   header("Access-Control-Allow-Headers: *");
// }
$actual_link = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
$dataBase = new DataBase('mysql', 'localhost', 'coffee_db_project', 'root', '1234');
if (str_contains($actual_link, 'all_users.php')) {
  $users = $dataBase->selectAll_NumberRow('user', 3, 0);
  $users = json_encode($users);
  echo $users;
}
// SELECT * FROM $table LIMIT 4, 10;
// $divide = 0;
// $cookie_number = 0;
// for ($index = 0; $index < count($users); $index = $index + 16) {
//   $multi_users = [];
//   $divide++;
//   if ($divide <= count($users) / 16) {
//     for ($i = $index; $i < 16 + $index; $i++) {
//       $multi_users[] = $users[$i];
//     }
//     $cookie_number++;
//     $multi_users = json_encode($multi_users);
//     setcookie("users$cookie_number", $multi_users);
//   } else {
//     for ($i = $index; $i < count($users); $i++) {
//       $multi_users[] = $users[$i];
//     }
//     $cookie_number++;
//     $multi_users = json_encode($multi_users);
//     setcookie("users$cookie_number", $multi_users);
//   }
// }
?>