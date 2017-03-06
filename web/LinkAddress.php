<?php

// Connect to Database
include("ConnectDatabase.php");

$accKey = $_POST['accKey'];
$accAddress = $_POST['accAddress'];

$query = "UPDATE Account SET accAddress='$accAddress' WHERE accKey='$accKey' AND accAddress IS NULL";

// mysqli_query
// For successful SELECT, SHOW, DESCRIBE, or EXPLAIN queries
// it will return a mysqli_result object.
// For other successful queries it will return TRUE.
// FALSE on failure

$res = mysqli_query($con, $query);

// If account creation is succesful then generate a Key

if($res){
	echo $accKey;
	echo $accAddress;
	exit();
} else{
	echo "Something went wrong";
	exit();
}
?>