<?php
require_once ('UserQuery.php');
$UserQuery = new UserQuery();

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $age = $_POST['age'];
    $id = $_POST['id'];
    $message = $_POST['message'];

    switch($message){
        case "add":
            $UserQuery->addUsers($name, $age);
            break;
        case "update":
            $UserQuery->updateUsers($name, $age, $id);
            break;
        case "delete":
            $UserQuery->deleteUser($id);
            break;
        default:
            break;
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET"){
    echo json_encode($UserQuery->getAllUsers());
} else {
    exit;
}