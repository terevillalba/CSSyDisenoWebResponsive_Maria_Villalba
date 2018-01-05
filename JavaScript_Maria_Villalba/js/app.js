var primerNum=0, signo="", segundoNumero=0,result=0;
var Calculadora={
  /*inicializar calculadora*/
  init: function(){
    var pantalla=document.getElementById('display')
    pantalla.value=0
    /*efectos teclas*/
    this.asignarEventosBotones('tecla');
    document.getElementById('on').onclick=prender;
    document.getElementById('dividido').onclick=this.eventoGuardarPrimerNumYSigno;
    document.getElementById('por').onclick=this.eventoGuardarPrimerNumYSigno;
    document.getElementById('menos').onclick=this.eventoGuardarPrimerNumYSigno;
    document.getElementById('mas').onclick=this.eventoGuardarPrimerNumYSigno;
    document.getElementById('igual').onclick=this.eventoCalcularResultado;
  },



  eventoDisminuirTamano: function(event){
    disminuirTamano(event.target);
  },
  eventoNormalizarTamano: function(event){
    normalizarTamano(event.target);
  },
  eventoNumeros: function(event){
    numeros(event.target);
  },
  eventoPunto: function(event){
    punto(event.target);
  },
  eventoNegativo: function(event){
    negativo(event.target);
  },
  eventoGuardarPrimerNumYSigno: function(event){
    guardarPrimerNumYSigno(event.target);
  },
  eventoCalcularResultado: function(event){
    calcularResultado(event.target);
  },
  asignarEventosBotones: function(selector){
    var botonesCalculadora = document.getElementsByClassName(selector)
    for (var i = 0; i < botonesCalculadora.length; i++) {
      if (botonesCalculadora[i].id<=9){
        botonesCalculadora[i].onclick=this.eventoNumeros;
      } else if (botonesCalculadora[i].id=="punto") {
        botonesCalculadora[i].onclick=this.eventoPunto;
      }else if (botonesCalculadora[i].id=="sign") {
        botonesCalculadora[i].onclick=this.eventoNegativo;
      }
      botonesCalculadora[i].onmouseover = this.eventoDisminuirTamano;
      botonesCalculadora[i].onmouseleave = this.eventoNormalizarTamano;
    }
  }

}

function prender(){
  document.getElementById('display').value=0;
  document.getElementById('display').innerHTML=0;
}
function disminuirTamano (elemento){
  elemento.style.padding="3px";
}
function normalizarTamano(elemento){
  elemento.style.padding="0px";
}
function numeros(elemento){
  var display=document.getElementById('display');
    if ((display.value=="0") || display.value==""){
      if (elemento.id>1){
        display.value=elemento.id;
        document.getElementById('display').innerHTML=display.value;
      }
    } else if (display.value=="0."){
      display.value=display.value+elemento.id;
      document.getElementById('display').innerHTML=display.value;
    } else if ( ((display.value.length>1) || (display.value>1)) && (display.value.length<8)){
        console.log("agrego");
        display.value=display.value+elemento.id;
        document.getElementById('display').innerHTML=display.value;
    }
}
function punto(elemento){
  var strdisplay=document.getElementById('display').value;
  if (strdisplay==0){
    display.value="0.";
    document.getElementById('display').innerHTML=display.value;

  }else if (!strdisplay.includes(".")){
    display.value=display.value+".";
    document.getElementById('display').innerHTML=display.value;
  }
}

function negativo(elemento){
  var strdisplay=document.getElementById('display').value;
  if (strdisplay.includes("-")){
    display.value=strdisplay.substring(1,9);
    document.getElementById('display').innerHTML=display.value;

  }else {
    display.value="-"+display.value;
    document.getElementById('display').innerHTML=display.value;
  }
}

function guardarPrimerNumYSigno(elemento){
  primerNum=document.getElementById('display').value;
  signo=elemento.id;
  document.getElementById('display').value="";
  document.getElementById('display').innerHTML="";
  console.log("primerNum "+primerNum);
  console.log("signo "+signo);
}

function calcularResultado(elemento){
  segundoNumero=document.getElementById('display').value;
  switch (signo) {
    case "dividido":
        result=parseFloat(primerNum) / parseFloat(segundoNumero);
        break;
    case "por":
        result=parseFloat(primerNum) * parseFloat(segundoNumero);
        break;
    case "menos":
        result=parseFloat(primerNum) - parseFloat(segundoNumero);
        break;
    case "mas":
        result=parseFloat(primerNum) + parseFloat(segundoNumero);
        break;
  }
  document.getElementById('display').value="";
  document.getElementById('display').innerHTML=result.toString().substring(0,8);
}

Calculadora.init();
