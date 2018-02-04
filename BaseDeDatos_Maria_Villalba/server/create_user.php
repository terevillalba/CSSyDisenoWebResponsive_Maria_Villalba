<?php

include('conector.php');

$con = new ConectorBD('localhost','t_create_user','12345');
$response['conexion'] = $con->initConexion('agendanu');

if ($response['conexion']=='OK') {

  //usuario1
  $data['id'] = 1;
  $data['nombre'] = "'Maria Teresa Villalba'";
  $data['email'] = "'tere@mail.com'";
  $data['psw'] = "'".password_hash("12345",PASSWORD_DEFAULT)."'";

  if($con->insertData('usuarios', $data)){
     echo "exito en la inserción usuario #1</br>";
  }else {
    echo "Hubo un error y los datos no han sido cargados</br>";
  }

  //usuario 2
  $data['id'] = 2;
  $data['nombre'] = "'Maria Villalba'";
  $data['email'] = "'maria@mail.com'";
  $data['psw'] = "'".password_hash("12345",PASSWORD_DEFAULT)."'";

  if($con->insertData('usuarios', $data)){
     echo "exito en la inserción usuario #2</br>";
  }else {
    echo "Hubo un error y los datos no han sido cargados</br>";
  }

  //usuario 3
  $data['id'] = 3;
  $data['nombre'] = "'Teresa Villalba'";
  $data['email'] = "'teresa@mail.com'";
  $data['psw'] = "'".password_hash("12345",PASSWORD_DEFAULT)."'";

  if($con->insertData('usuarios', $data)){
     echo "exito en la inserción usuario #3</br>";
  }else {
    echo "Hubo un error y los datos no han sido cargados</br>";
  }

  $con->cerrarConexion();
}else {
  echo "No se pudo conectar a la base de datos";
}


 ?>
