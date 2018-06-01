<?php
/**
 * Created by IntelliJ IDEA.
 * User: mzhang
 * Date: 6/1/2018
 * Time: 9:25 AM
 */

class UserQuery {
    private $servername = "localhost";
    private $username = 'ldbuser';
    private $password = 'pw4ldbuser';
    private $dbname = "employees";
    public $connection;

    function __construct(){
        $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($this->connection->connect_error){
            die("Connection failed".$this->onnection->connect_error);
        }
    }

    function addUsers($name, $age){
        $sql = "INSERT INTO employees.EmployeeInformation(Name, Age) VALUES (?, ?)";
        $sqlQuery = $this->connection->prepare($sql);
        $sqlQuery->bind_param('si', $name, $age);
        $sqlQuery->execute();
    }

    function updateUsers($name, $age, $id){
        $sql = "UPDATE employees.EmployeeInformation 
                  SET employees.EmployeeInformation.name = ?,
                  employees.EmployeeInformation.age = ?
                  WHERE employees.EmployeeInformation.EmployeeId = ?";
        $sqlQuery = $this->connection->prepare($sql);
        $sqlQuery->bind_param('sii', $name, $age, $id);
        $sqlQuery->execute();
    }

    function deleteUser($id){
        $sql = "DELETE FROM employees.EmployeeInformation
                  WHERE employees.EmployeeInformation.EmployeeId = ?";
        $sqlQuery = $this->connection->prepare($sql);
        $sqlQuery->bind_param('i', $id);
        $sqlQuery->execute();
    }

    function getAllUsers(){
        $sql = "SELECT * FROM employees.EmployeeInformation
                  ORDER BY employees.employeeinformation.EmployeeId";
        $sqlQuery = $this->connection->query($sql);
        $resultsArray = [];
        if ($sqlQuery->num_rows > 0){
            while ($row = $sqlQuery->fetch_assoc()){
                $resultsArray[] = $row;
            }
        }
        return $resultsArray;
    }

    function getOneUser($employeeId){
        $sql = "SELECT * FROM employees.EmployeeInformation 
                  WHERE employees.EmployeeInformation.EmployeeId = $employeeId";
        $sqlQuery = $this->connection->prepare($sql);
        $sqlQuery->execute();
    }
}