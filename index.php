<?php

    // Database Information
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "weather_details"; 

    // Creating connection with database.
    $conn = new mysqli($servername, $username, $password);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 1000");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
  
    // Changing the default time in php.
    date_default_timezone_set('Asia/Kathmandu');

  // Creating database if it does not exist
  $db = "CREATE DATABASE IF NOT EXISTS $dbname";
  $conn -> query ($db);
  $conn -> select_db($dbname);

  // Creating table if it does not exist
  $sql = "CREATE TABLE IF NOT EXISTS weather_data (
                  weather_id int(4) NOT NULL, 
                  weather_main varchar(100) NOT NULL,
                  weather_desc varchar(100) NOT NULL,
                  weather_temp float NOT NULL,
                  weather_wind float NOT NULL,
                  weather_time datetime NOT NULL,
                  city varchar(100) NOT NULL, 
                  country varchar(50) NOT NULL, 
                  humidity float NOT NULL, 
                  pressure float NOT NULL,
                  cloudiness float NOT NULL,
                  weather_wind_direction float NOT NULL,
                  dt int(11) NOT NULL,
                  search_query varchar(100) NOT NULL)";

  $conn -> query ($sql);

  include('database_manager.php');
   
    $sql = "SELECT * FROM weather_data WHERE search_query ='{$_GET['query']}'";
    $result = $conn -> query($sql);

    // Converting the data into JSON and displaying it.
    $row = $result -> fetch_assoc();
    print json_encode($row);

    # Freeing the memory and closing the connection.
    $result -> free_result();
    $conn -> close();

?>
