<?php
 // Function to update the old data in the table.
 function dataQuery($conn)
 {
     $url = 'https://api.openweathermap.org/data/2.5/weather?q='.$_GET['query'].'&units=metric&appid=cdffaa4cc6491debc7c970bbae3e8d3d';

     // Decoding the JSON data obtained from the Openweathermap.org.
     $data = file_get_contents($url);
     $json = json_decode($data, true);

     // Fetching values from required field and also storing them in variables.
     // These variables are being used in Sql queries to store the data in database.

     // Weather details of the city
     $weather_id = $json['weather'][0]['id'];
     $weather_main = $json["weather"][0]["main"];
     $weather_description = $json['weather'][0]['description'];
     $weather_temperature = $json['main']['temp'];
     $cloudiness = $json['clouds']['all'];
     $weather_wind_deg = $json['wind']['deg'];
     $weather_wind = $json['wind']['speed'];
     $city = $json['name'];
     $country = $json['sys']['country'];
     $humidity = $json['main']['humidity'];
     $pressure = $json['main']['pressure'];
     $dt = $json['dt'];
     $weather_time = date("Y-m-d H:i:s");
     $query = $_GET['query'];

     // Build 'UPDATE' sql statement.
     $sql = "UPDATE `weather_data` SET `weather_id` = '$weather_id', `weather_main` = '$weather_main',
     `weather_desc` = '$weather_description', `weather_temp`= '$weather_temperature',`weather_wind`='$weather_wind', 
     `cloudiness` = '$cloudiness', `weather_wind_direction`='$weather_wind_deg', 
     `weather_time` ='$weather_time', `pressure`='$pressure', `dt` = '$dt',
     `humidity`='$humidity', `city`='$city', `country`='$country', `search_query`='$query' WHERE search_query='{$_GET['query']}'";
     
     // Run sql statement and report errors
     if (!$conn -> query($sql)) 
     {
       echo("<h4>Error Occurred: " . $conn -> error . "</h4>");
     }
 }
 
 # Selecting data from table where search_query is equal to the query parameter.
 $sql = "SELECT * FROM weather_data WHERE search_query='{$_GET['query']}'";
 $checkdb = mysqli_query($conn, $sql);
 $row = mysqli_fetch_array($checkdb,MYSQLI_ASSOC);

 // Checking if the table is empty or not.
 $check = mysqli_num_rows($checkdb);
 if($check == 0)
 {
     // Calling the Openweather API and passing the name of city as query.
     $url = 'http://api.openweathermap.org/data/2.5/weather?q='.$_GET['query'].'&units=metric&appid=0de6fc00abc79dc9398e8181bd49765c';
     $data = file_get_contents($url);
     $json = json_decode($data, true);

     // Return 404 error if the data is null.
     if($json == null)
     {
        echo "404 Error!";
     }
     
     // If the data exists
     else
     {
        // Fetching values from required field and also storing them in variables.
       $weather_id = $json['weather'][0]['id'];
       $weather_main = $json["weather"][0]["main"];
       $weather_description = $json['weather'][0]['description'];
       $weather_temperature = $json['main']['temp'];
       $cloudiness = $json['clouds']['all'];
       $weather_wind_deg = $json['wind']['deg'];
       $weather_wind = $json['wind']['speed'];
       $city = $json['name'];
       $country = $json['sys']['country'];
       $humidity = $json['main']['humidity'];
       $pressure = $json['main']['pressure'];
       $dt = $json['dt'];
       $weather_time = date("Y-m-d H:i:s"); 
       $query = $_GET['query'];

       // Inserting the data into the database
       $sql = "INSERT INTO weather_data (weather_id, weather_main, weather_desc, weather_temp, weather_wind, weather_time, city, country, humidity, pressure, cloudiness, weather_wind_direction , dt ,search_query)
       VALUES('{$weather_id}','{$weather_main}','{$weather_description}', '{$weather_temperature}', '{$weather_wind}', '{$weather_time}', '{$city}','{$country}','{$humidity}','{$pressure}','{$cloudiness}','{$weather_wind_deg}','{$dt}', '{$query}')";

       // Report Error if the data is not inserted.
       if (!$conn -> query($sql)){
         echo("<h4>SQL Error Occurred: " . $conn -> error . "</h4>");
       }
    }
 }

 // If the data is already present in the table, then update the data.
 else{

     
     $sql = "SELECT * FROM weather_data WHERE search_query ='{$_GET['query']}'";
     $checkdb = mysqli_query($conn, $sql);
     $row = mysqli_fetch_array($checkdb,MYSQLI_ASSOC);

     // Getting time from the array
     $time = $row['weather_time'];
     // Splitting date and time 
     $arr = explode(" ",$time);
     // Getting date in Year-Month-Day
     $newdate = date("Y-m-d");
     // If current date is ahead of the date in database
     if($arr[0] < $newdate)
     {
       // Calling function that updates data in database
       dataQuery($conn);
     }
     else
     {
       // Adding 30 minutes to the time in database
       $newtime = strtotime($arr[1]) + (1800);
       $added = date("H:i:s",$newtime);
       $weather_time = date("H:i:s");

       // If the current time is ahead of the time in database
       if($weather_time >= $added)
         {
           // Calling function that updates data in database
           dataQuery($conn);
         }
     }
 }
?>