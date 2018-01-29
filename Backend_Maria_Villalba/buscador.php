<?php
$ciudad = $_POST["ciudad"];
$tipo = $_POST["tipo"];
$precio = $_POST["precio"];
$estructura="";

$data_file = fopen("./data-1.json","r");
$data_readed = fread($data_file, filesize("./data-1.json"));
$data = json_decode($data_readed, true);
fclose($data_file);
$valor = explode(";",$precio);

if($ciudad == "x" and $tipo == "x"){
	foreach ( $data as $info ) {
		$venta = explode("$",$info['Precio']);
		$venta = str_replace(",","",$venta);
		if( $venta[1] > $valor[0] and $venta[1]<$valor[1]){
			$estructura = "<div class='itemMostrado card'>";
			$estructura .="<img src='img/home.jpg'>";
			$estructura .="<div class='card-stacked'>";
			$estructura .="<strong>Dirección: </strong>".$info['Direccion']."</br>";
			$estructura .="<strong>Ciudad: </strong>".$info['Ciudad']."</br>";
			$estructura .="<strong>Teléfono: </strong>".$info['Telefono']."</br>";
			$estructura .="<strong>Código Postal: </strong>".$info['Codigo_Postal']."</br>";
			$estructura .="<strong>Tipo: </strong>".$info['Tipo']."</br>";
			$estructura .="<strong>Precio: </strong><span class='precioTexto'>".$info['Precio']."</span></br>";
			$estructura .="<div class='card-action'>VENTAS</div>";
			$estructura .="</div>";
			$estructura .= "</div>";
			echo $estructura;
		}
	}
}if($ciudad != "x" and $tipo != "x"){
	foreach ( $data as $info ) {
    $venta = explode("$",$info['Precio']);
		$venta = str_replace(",","",$venta);
		if($ciudad == $info['Ciudad']){
			if($tipo == $info['Tipo']){
				if( $venta[1] > $valor[0] and $venta[1]<$valor[1]){
					$estructura = "<div class='itemMostrado card'>";
					$estructura .="<img src='img/home.jpg'>";
					$estructura .="<div class='card-stacked'>";
					$estructura .="<strong>Dirección: </strong>".$info['Direccion']."</br>";
					$estructura .="<strong>Ciudad: </strong>".$info['Ciudad']."</br>";
					$estructura .="<strong>Teléfono: </strong>".$info['Telefono']."</br>";
					$estructura .="<strong>Código Postal: </strong>".$info['Codigo_Postal']."</br>";
					$estructura .="<strong>Tipo: </strong>".$info['Tipo']."</br>";
					$estructura .="<strong>Precio: </strong><span class='precioTexto'>".$info['Precio']."</span></br>";
					$estructura .="<div class='card-action'>VENTAS</div>";
					$estructura .="</div>";
					$estructura .= "</div>";
					echo $estructura;
				}
			}
		}
	}
}else{
	if($ciudad != "x" and $tipo == "x"){
			foreach ( $data as $info ) {
				$venta = explode("$",$info['Precio']);
				$venta = str_replace(",","",$venta);
				if($ciudad == $info['Ciudad']){
					if( $venta[1] > $valor[0] and $venta[1]<$valor[1]){
						$estructura = "<div class='itemMostrado card'>";
						$estructura .="<img src='img/home.jpg'>";
						$estructura .="<div class='card-stacked'>";
						$estructura .="<strong>Dirección: </strong>".$info['Direccion']."</br>";
						$estructura .="<strong>Ciudad: </strong>".$info['Ciudad']."</br>";
						$estructura .="<strong>Teléfono: </strong>".$info['Telefono']."</br>";
						$estructura .="<strong>Código Postal: </strong>".$info['Codigo_Postal']."</br>";
						$estructura .="<strong>Tipo: </strong>".$info['Tipo']."</br>";
						$estructura .="<strong>Precio: </strong><span class='precioTexto'>".$info['Precio']."</span></br>";
						$estructura .="<div class='card-action'>VENTAS</div>";
						$estructura .="</div>";
						$estructura .= "</div>";
						echo $estructura;
					}
				}
			}
	}elseif($ciudad == "x" and $tipo != "x"){
		foreach ( $data as $info ) {
			$venta = explode("$",$info['Precio']);
			$venta = str_replace(",","",$venta);
			if($tipo == $info['Tipo']){
				if( $venta[1] > $valor[0] and $venta[1]<$valor[1]){
					$estructura = "<div class='itemMostrado card'>";
					$estructura .="<img src='img/home.jpg'>";
					$estructura .="<div class='card-stacked'>";
					$estructura .="<strong>Dirección: </strong>".$info['Direccion']."</br>";
					$estructura .="<strong>Ciudad: </strong>".$info['Ciudad']."</br>";
					$estructura .="<strong>Teléfono: </strong>".$info['Telefono']."</br>";
					$estructura .="<strong>Código Postal: </strong>".$info['Codigo_Postal']."</br>";
					$estructura .="<strong>Tipo: </strong>".$info['Tipo']."</br>";
					$estructura .="<strong>Precio: </strong><span class='precioTexto'>".$info['Precio']."</span></br>";
					$estructura .="<div class='card-action'>VENTAS</div>";
					$estructura .="</div>";
					$estructura .= "</div>";
					echo $estructura;
				}
			}
		}
	}
}
?>
