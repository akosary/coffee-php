<?php

$page = json_decode(file_get_contents("php://input"), true);

class DB
{
    private $sql;
    private $con;
    private $query;
    public function __construct($DbType, $host, $dbname, $userName, $Password)
    {
        $this->sql = "$DbType:host=$host;dbname=$dbname";
        $this->con = new PDO($this->sql, $userName, $Password);
    }
    // get all resource
    public function index($table_name)
    {
        $this->query = "SELECT * from $table_name ";
        $this->sql = $this->con->prepare($this->query);
        $result = $this->sql->execute();
        $indexes = $this->sql->fetchAll(PDO::FETCH_ASSOC);
        if (count($indexes)) {
            return $indexes;
        } else {
            return 'No Data';
        }
    }

    // get single resource
    public function show($table_name, $column_name, $column_value)
    {
        $this->query = "SELECT * from $table_name WHERE $column_name = $column_value ";
        $this->sql = $this->con->prepare($this->query);
        $this->sql->execute();
        $index = $this->sql->fetch(PDO::FETCH_ASSOC);
        if ($index) {
            return $index;
        } else {
            return 'No Data';
        }
    }

    // edit  resource


    // create  resource
    public function store($table_name, $col_array)
    {
        $col_names = '';
        $col_values = '';
        foreach ($col_array as $key => $value) {
            $col_names = $col_names . "`$key`,";
            $col_values = $col_values . "'$value',";
        }
        ;
        $len = strlen($col_names);
        $len2 = strlen($col_values);
        $columns = '(' . substr($col_names, 0, $len - 1) . ')';
        $columns_values = '(' . substr($col_values, 0, $len2 - 1) . ')';
        $this->query = "INSERT INTO $table_name $columns VALUES $columns_values ";
        // echo $this->query;
        $this->sql = $this->con->prepare($this->query);
        $this->sql->execute();
        $result = $this->sql->fetchAll();
        if (!$result) {
            return 'Insertion successfully';
        } else {
            return 'Failed To Insert';
        }
    }

    public function delete($table_name, $column_name, $column_value)
    {
        $this->query = "DELETE from $table_name WHERE $column_name = $column_value ";
        // echo $this->query;
        $this->sql = $this->con->prepare($this->query);
        $this->sql->execute();
        $index = $this->sql->fetch();
        if (!$index) {
            return 'Deleted Successfully';
        } else {
            return 'Failed to delete';
        }
    }

    //select user.name , sum(orders.total_price)
    // from orders inner join user
    // where user.Id= orders.id_user
    // group by user.name
    // $offset;
    public function getCount()
    {
        $this->query = "SELECT user.Id, user.name , sum(total_price) AS 'Total' FROM `orders` INNER JOIN `user` WHERE user.Id=orders.id_user GROUP BY user.name ORDER BY user.Id";
        $this->query = "SELECT count(user.Id) AS 'CountOfUsers' FROM `orders` INNER JOIN `user` WHERE user.Id=orders.id_user ";
        $this->sql = $this->con->prepare($this->query);
        $this->sql->execute();
        $indexes = $this->sql->fetch(PDO::FETCH_ASSOC);
        if ($indexes) {
            return $indexes;
        } else {
            return 'Failed';
        }
    }



    public function selectTotalUserWithAmount($pageNo, $perPage)
    {
        $offset = $perPage * ($pageNo - 1);
        $this->query = "SELECT * FROM product LIMIT $perPage OFFSET $offset";
        $this->sql = $this->con->prepare($this->query);
        $this->sql->execute();
        $indexes = $this->sql->fetchAll(PDO::FETCH_ASSOC);
        if ($indexes) {
            return $indexes;
        } else {
            return 'Failed';
        }
    }

    public function getOrdersByUserId($table_name, $column_name, $column_value)
    {
        $this->query = "SELECT Id , total_price , created_at FROM `orders` WHERE $column_name = $column_value";
        // echo $this->query;
        $this->sql = $this->con->prepare($this->query);
        $this->sql->execute();
        $indexes = $this->sql->fetchAll(PDO::FETCH_ASSOC);
        if ($indexes) {
            return $indexes;
        } else {
            return ["failed" => 'Failed'];
        }
    }




    public function getOrderDetails($table_name, $column_name, $column_value)
    {
        $this->query = "SELECT * FROM `$table_name` WHERE $column_name = $column_value";
        // echo $this->query;
        $this->sql = $this->con->prepare($this->query);
        $this->sql->execute();
        $indexes = $this->sql->fetchAll(PDO::FETCH_ASSOC);
        if ($indexes) {
            return $indexes;
        } else {
            return ["failed" => 'Failed'];
        }
    }
}

$obj = new DB('mysql', 'localhost', 'coffee_db_project', 'root', 1234);


echo json_encode($obj->selectTotalUserWithAmount($page['pageNumber'], $page['perPage']));
// echo json_encode($obj->getCount());