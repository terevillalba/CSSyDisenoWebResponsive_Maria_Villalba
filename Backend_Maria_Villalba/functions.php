<?php
function getData(){
  $data_file = fopen("./data-1.json","r");
  $data_readed = fread($data_file, filesize("./data-1.json"));
  $data = json_decode($data_readed, true);
  fclose($data_file);
  return $data;
}

function getCities(){
  $data = getData();
  $cities= array();
  $estructura="";
  if (isset($data)) {
    foreach ($data as $key => $value) {
      $city=$value['Ciudad'];
      if (!in_array($city,$cities)) {
        array_push($cities,$city);
      }
    }
    $a = count($cities);
    for($b=0; $b<$a;$b++){
  		$estructura .= "<option value='$cities[$b]'>";
  		$estructura .= $cities[$b];
  		$estructura .= "</option>";
  	}
    echo $estructura;
  }
}

function getTypes(){
  $data = getData();
  $types= array();
  $estructura="";
  if (isset($data)) {
    foreach ($data as $key => $value) {
      $type=$value['Tipo'];
      if (!in_array($type,$types)) {
        array_push($types,$type);
      }
    }
    $a = count($types);
    for($b=0; $b<$a;$b++){
  		$estructura .= "<option value='$types[$b]'>";
  		$estructura .= $types[$b];
  		$estructura .= "</option>";
  	}
    echo $estructura;
  }
}

 ?>
