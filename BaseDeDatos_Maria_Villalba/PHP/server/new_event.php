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

      $data['titulo'] = "'".$_POST['titulo']."'";
      $data['fecha_inicio'] = "'".$_POST['start_date']."'";
      $data['fecha_fin'] = "'".$_POST['end_date']."'";
      $data['hora_inicio'] = "'".$_POST['start_hour']."'";
      $data['hora_fin'] = "'".$_POST['end_hour']."'";
      if ($_POST['allDay']== true) {
        $data['allDay']=1;
      }else {
        $data['allDay']=0;
      }
      $data['fk_usuario'] = $fila['id'];

      if ($con->insertData('eventos', $data)) {
        $response['msg']= 'OK';
      }else {
        $response['msg']= 'No se pudo realizar la inserción del evento';
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
