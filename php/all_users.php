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
  public function selectAll_table_condition($table, $condition)
  {
    $whereCondition = condition($condition);
    $query = "SELECT * FROM $table WHERE $whereCondition";
    $sql = $this->connection->prepare($query);
    $sql->execute();
    $data = $sql->fetch(PDO::FETCH_ASSOC);
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
$dataBase = new DataBase('mysql', 'localhost', 'coffee_db_project', 'root', '1234');
$users = $dataBase->selectAll_Table('user');
$users = json_encode($users);
echo $users;

?>