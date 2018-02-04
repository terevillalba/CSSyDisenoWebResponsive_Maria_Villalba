<?php

require('./conector.php');

session_start();

if (isset($_SESSION['username'])) {
  $con = new ConectorBD('localhost', 't_selector', '12345');
  if ($con->initConexion('agendanu')=='OK') {
    //consulto la info del usuario logueado
    $resultado = $con->consultar(['usuarios'], ['nombre', 'id'], "WHERE email ='".$_SESSION['username']."'");
    if ($fila = $resultado->fetch_assoc()){
      $response['nombre']=$fila['nombre'];
    }
    //consulto los eventos del usuario conectado
    $resultado = $con->consultar(['eventos'], ['*'],"WHERE fk_usuario ='".$fila['id']."'");
    $i=0;
    while ($fila = $resultado->fetch_assoc()) {
      $response['eventos'][$i]['id']=$fila['id'];
      $response['eventos'][$i]['title']=$fila['titulo'];
      $response['eventos'][$i]['start_date']=$fila['fecha_inicio'];
      $response['eventos'][$i]['end_date']=$fila['fecha_fin'];
      $response['eventos'][$i]['start_hour']=$fila['hora_inicio'];
      $response['eventos'][$i]['end_hour']=$fila['hora_fin'];
      $response['eventos'][$i]['allDay']=$fila['allDay'];
      $response['eventos'][$i]['start']=$fila['fecha_inicio']." ".$fila['hora_inicio'];
      $response['eventos'][$i]['end']=$fila['fecha_fin']." ".$fila['hora_fin'];

      $i++;
    }

    $response['msg']= 'OK';

    $con->cerrarConexion();
  }else {
    $response['msg']= 'No se pudo conectar a la base de datos';
  }
}else {
  $response['msg']= 'No se ha iniciado una sesión';
}

echo json_encode($response);


 ?>
