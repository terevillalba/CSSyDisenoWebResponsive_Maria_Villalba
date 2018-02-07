<?php
  require('./conector.php');

  session_start();

  if (isset($_SESSION['username'])) {
    $con = new ConectorBD('localhost', 't_selector', '12345');
    if ($con->initConexion('agendanu')=='OK') {

      if ($con->eliminarRegistro('eventos', " id =".$_POST['id']."")) {
        $response['msg']= 'OK';
      }else {
        $response['msg']= 'No se pudo eliminar del evento';
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
