<?php
  require('./conector.php');

  session_start();

  if (isset($_SESSION['username'])) {
    $con = new ConectorBD('localhost', 't_selector', '12345');
    if ($con->initConexion('agendanu')=='OK') {

      $data['fecha_inicio'] = "'".$_POST['start_date']."'";
      $data['fecha_fin'] = "'".$_POST['end_date']."'";
      $data['hora_inicio'] = "'".$_POST['start_hour']."'";
      $data['hora_fin'] = "'".$_POST['end_hour']."'";

      if ($con->actualizarRegistro('eventos', $data, " id =".$_POST['id']."")) {
        $response['msg']= 'OK';
      }else {
        $response['msg']= 'No se pudo realizar la actualización del evento';
      }

      $con->cerrarConexion();
    }else {
      $response['msg']= 'No se pudo conectar a la base de datos';
    }
  }else {
    $response['msg']= 'No se ha iniciado una sesión';
  }

  echo json_encode($response);

 ?>
