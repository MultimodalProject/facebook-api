<?php
header('Content-Type: text/html; charset=UTF-8');

// define variables
$columns = array ();
$values = array ();
$sql_query = array ();
$i = 0;

// connect to database
$mysqli = new mysqli("idontmind.de", "db1087652-veosg", "RpbKG7vX", "db1087652-veosg");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL";
}

$mysqli->set_charset("utf8");

// iterate through data object send from main application
while($i < count($_POST)) {

  foreach($_POST[$i] as $key => $value) {
    $columns[$i] .= $key . ", ";
    $values[$i] .= "'" . $value . "', ";
  }

  if($i == 0) {
    $columns[0] = substr($columns[$i], 0, strlen($columns[0]) - 2);
    $values[0] = substr($values[$i], 0, strlen($values[0]) - 2);  
    // build query string
    $sql_query[0] = "INSERT INTO user (" . $columns[0] . ") VALUES (" . $values[0] . ")"; 
    if (!$mysqli->query($sql_query[0])) {
      echo "query failed (" . $mysqli->errno . ") " . $mysqli->error;
    }
  } else {
    $columns[$i] .= "friend_of";
    $values[$i] .= $_POST[0]["id"];
    // build query string
    $sql_query[$i] = "INSERT INTO friends (" . $columns[$i] . ") VALUES (" . $values[$i] . ")";
    if (!$mysqli->query($sql_query[$i])) {
      echo "query failed (" . $mysqli->errno . ") " . $mysqli->error;
    }
  }

  $i++;
}

?>