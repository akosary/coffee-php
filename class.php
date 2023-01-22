<?php

class DB 
{
    private $sql;
    private $con;
    private $query;
    public function __construct($DbType , $host ,$dbname , $userName, $Password)
    {
        $this->sql ="$DbType:host=$host;dbname=$dbname";
        $this->con = new PDO($this->sql, $userName, $Password);
    }
    // get all resource
    public function index($table_name)
    {
    $this->query = "SELECT * from $table_name ";
    $this->sql = $this->con->prepare($this->query);
    $result = $this->sql->execute();
    $indexes = $this->sql->fetchAll(PDO::FETCH_ASSOC);
    if(count($indexes))
    {
        return $indexes;
    }else
    {
        return 'No Data';
    }
    }

    // get single resource
    public function show($table_name , $column_name , $column_value)
    {
    $this->query = "SELECT * from $table_name WHERE $column_name = $column_value ";
    $this->sql = $this->con->prepare($this->query);
    $this->sql->execute();
    $index = $this->sql->fetch(PDO::FETCH_ASSOC);
    if($index)
    {
        return $index;
    }
    else
    {
        return 'No Data';
    }
    }

    // edit  resource
    // public function update($table_name , $id, $col_array )
    // {
    //     foreach ($col_array AS $key => $value)
    //     {
    //         // echo $key . '= ' . $value;
    //         $this->query = "UPDATE $table_name SET $key = '$value' WHERE id= $id ";
    //         $this->sql = $this->con->prepare($this->query);
    //         $this->sql->execute();
    //     };
    //     $result = $this->sql->fetchAll();
    //     if(!$result)
    //     {
    //         return 'Updated successfully';
    //     }else {
    //         return 'Not updated';
    //     }
    // }


    // create  resource
    public function store($table_name ,$col_array)
    {
        $col_names='';
        $col_values='';
        foreach ($col_array AS $key => $value )
        {
            $col_names = $col_names ."`$key`,";
            $col_values = $col_values . "'$value',";
        };
        $len=strlen($col_names);
        $len2=strlen($col_values);
        $columns='('. substr($col_names ,0,$len-1) .')';
        $columns_values='('. substr($col_values ,0,$len2-1) .')';
        $this->query = "INSERT INTO $table_name $columns VALUES $columns_values ";
        // echo $this->query;
        $this->sql = $this->con->prepare($this->query);
        $this->sql->execute();
        $result = $this->sql->fetchAll();
        if(!$result)
        {
            return 'Insertion successfully';
        }else {
            return 'Failed To Insert';
        }
    }

    public function delete($table_name , $column_name ,$column_value)
    {
        $this->query = "DELETE from $table_name WHERE $column_name = $column_value ";
        // echo $this->query;
        $this->sql = $this->con->prepare($this->query);
        $this->sql->execute();
        $index = $this->sql->fetch();
        if(!$index)
        {
            return 'Deleted Successfully';
        }
        else
        {
            return 'Failed to delete';
        }
    }


    public function getCount()
    {
        $this->query = "SELECT count(user.Id) AS 'CountOfUsers' FROM `orders` INNER JOIN `user` WHERE user.Id=orders.id_user " ;
        $this->sql= $this->con->prepare($this->query);
        $this->sql->execute();
        $indexes = $this->sql->fetch(PDO::FETCH_ASSOC);
        if($indexes)
        {
            return $indexes;
        }else
        {
            return 'Failed';
        }
    }


    public function selectTotalUserWithAmount($pageNo, $perPage)
    {
        $offset = $perPage * ($pageNo - 1);
        $this->query = "SELECT user.Id, user.name , sum(total_price) AS 'Total' FROM `orders` INNER JOIN `user` WHERE user.Id=orders.id_user GROUP BY user.name ORDER BY user.Id LIMIT $perPage OFFSET $offset" ;
        $this->sql= $this->con->prepare($this->query);
        $this->sql->execute();
        $indexes = $this->sql->fetchAll(PDO::FETCH_ASSOC);
        if($indexes)
        {
            return $indexes;
        }else
        {
            return 'Failed';
        }
    }

    // public function getOrdersByUserId($table_name,$column_name , $column_value){
    //     $this->query = "SELECT Id , total_price , created_at FROM `orders` WHERE $column_name = $column_value";
    //     // echo $this->query;
    //     $this->sql= $this->con->prepare($this->query);
    //     $this->sql->execute();
    //     $indexes = $this->sql->fetchAll(PDO::FETCH_ASSOC);
    //     if($indexes)
    //     {
    //         return $indexes;
    //     }else
    //     {
    //         return ["failed"=>'Failed'];
    //     }
    // }




    public function getOrderDetails($table_name,$column_name , $column_value ){
        $this->query = "SELECT * FROM `$table_name` WHERE $column_name = $column_value";
        // echo $this->query;
        $this->sql= $this->con->prepare($this->query);
        $this->sql->execute();
        $indexes = $this->sql->fetchAll(PDO::FETCH_ASSOC);
        if($indexes)
        {
            return $indexes;
        }else
        {
            return ["failed"=>'Failed'];
        }
    }

    public function getOrdersByUserId($table_name,$column_name , $column_value){
        $this->query = "SELECT Id , total_price , created_at FROM `orders` WHERE $column_name = $column_value";
        // echo $this->query;
        $this->sql= $this->con->prepare($this->query);
        $this->sql->execute();
        $indexes = $this->sql->fetchAll(PDO::FETCH_ASSOC);
        if($indexes)
        {
            return $indexes;
        }else
        {
            return ["failed"=>'Failed'];
        }
    }


    // public function getOrderDetails($table_name,$column_name , $column_value ){
    //     $this->query = "SELECT * FROM `$table_name` WHERE $column_name = $column_value";
    //     $this->sql= $this->con->prepare($this->query);
    //     $this->sql->execute();
    //     $indexes = $this->sql->fetchAll(PDO::FETCH_ASSOC);
    //     if($indexes)
    //     {
    //         return $indexes;
    //     }else
    //     {
    //         return ["failed"=>'Failed'];
    //     }
    // }

    public function getSingleUser($id)
    {
        $this->query = "SELECT user.Id, user.name , sum(total_price) AS 'Total' FROM `orders` INNER JOIN `user` WHERE user.Id=orders.id_user AND user.Id=$id GROUP BY user.name ORDER BY user.Id";
        $this->sql= $this->con->prepare($this->query);
        $this->sql->execute();
        $index = $this->sql->fetchAll(PDO::FETCH_ASSOC);
        if($index)
        {
            return $index;
        }else
        {
            return ["failed"=>'Failed'];
        }
    }

    public function getPages()
    {
        $this->query = "SELECT count( DISTINCT user.Id) AS 'CountOfUsers' FROM `orders` INNER JOIN `user` WHERE user.Id=orders.id_user " ;
        $this->sql= $this->con->prepare($this->query);
        $this->sql->execute();
        $indexes = $this->sql->fetch(PDO::FETCH_ASSOC);
        if($indexes)
        {
            return $indexes;
        }else
        {
            return 'Failed';
        }
    }

    public function getUsersByDateOfOrders($from,$to,$per,$pageNo)
    {
        $offset = $per * ($pageNo - 1);
        $this->query = "SELECT user.Id , user.name , sum(orders.total_price) AS 'Total' FROM `user` INNER JOIN `orders` WHERE user.Id = orders.id_user AND orders.created_at >= '$from' AND orders.created_at <= '$to' GROUP BY user.name LIMIT $per OFFSET $offset";
        $this->sql= $this->con->prepare($this->query);
        $this->sql->execute();
        $index = $this->sql->fetchAll(PDO::FETCH_ASSOC);
        if($index)
        {
            return $index;
        }else
        {
            return ["result"=>'Failed'];
        }
    }

    public function getUsersByDateOfOrder($from,$to)
    {
        $this->query = "SELECT count( DISTINCT user.Id) as 'CountOfUsers' FROM `user` INNER JOIN `orders` WHERE user.Id = orders.id_user AND orders.created_at >= '$from' AND orders.created_at <= '$to'";
        $this->sql= $this->con->prepare($this->query);
        $this->sql->execute();
        $index = $this->sql->fetch(PDO::FETCH_ASSOC);
        if($index)
        {
            return $index;
        }else
        {
            return ["result"=>'Failed'];
        }
    }
    public function validateSessionId($id)
    {
        $this->query = "SELECT IF(Id=$id,'true','false') as contain 
            FROM `admin` order BY contain DESC LIMIT 1";
        $this->sql= $this->con->prepare($this->query);
        $this->sql->execute();
        $index = $this->sql->fetch(PDO::FETCH_ASSOC);
        if($index)
        {
            return $index;
        }else
        {
            return ["result"=>'Failed'];
        }
    }
}
$obj = new DB('mysql','localhost','coffee_db_project','root',1234);