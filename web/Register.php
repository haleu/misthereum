<?php

// Connect to Database
include("ConnectDatabase.php");

$accName = $_POST['accName'];
$accPassword = $_POST['accPassword'];

$query = "INSERT INTO Account VALUES ('$accName', '$accPassword', NULL, NULL)";

// mysqli_query
// For successful SELECT, SHOW, DESCRIBE, or EXPLAIN queries
// it will return a mysqli_result object.
// For other successful queries it will return TRUE.
// FALSE on failure

$res = mysqli_query($con, $query);

// If account creation is succesful then generate a Key

if($res){
	
	// Generate Key and check unique-ness
	while(true){
		$key = rand(1, 10000);
		
		$queryKey = "SELECT * FROM Account WHERE accKey = $key";
		
		$resKey = mysqli_query($con, $queryKey);
		
		// If the key is unique, assign it to the account and break the loop
		// WARNING: If all Keys are used this loop will continue forever
		if($resKey->num_rows == 0){
			$queryKey = "UPDATE Account SET accKey='$key' WHERE accName='$accName' AND accPassword='$accPassword'";
			$resKey = mysqli_query($con, $queryKey);
			if ($resKey){}
			else{
				echo mysqli_error($con);
			} 
			break;
		}
	}
	
	echo "Account Registered<br>";
	echo "Name: ".$accName."<br>";
	echo "Password: ".$accPassword."<br>";
	echo "Key: ".$key."<br>";
	exit();
} else{
	echo "Something went wrong";
	exit();
}
?>