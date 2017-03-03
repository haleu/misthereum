<?php

// Connect to Database
include("ConnectDatabase.php");

$accName = $_POST['accName'];
$accPassword = $_POST['accPassword'];

$query = "SELECT accKey FROM Account WHERE accName = '$accName' AND accPassword = '$accPassword'";

// mysqli_query
// For successful SELECT, SHOW, DESCRIBE, or EXPLAIN queries
// it will return a mysqli_result object.
// For other successful queries it will return TRUE.
// FALSE on failure

$res = mysqli_query($con, $query);

if($res){
	
	$row = mysqli_fetch_array($res, MYSQLI_ASSOC);
	$key = $row['accKey'];
	
	echo $key;
	exit();
} else{
	echo "Something went wrong";
	exit();
}
?>