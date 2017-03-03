<?php

$hostname = "utbweb.its.ltu.se";
$username = "robluj-4";
$password = "robluj-4";
$dbname = "robluj4db";

$con = mysqli_connect($hostname, $username, $password, $dbname);
if (!$con)
{
	die('Could not connect: ' . mysqli_error($con));
}

?>