// onload del documento
$(function(){

  blanco($(".main-titulo"));

  $(".btn-reinicio").on("click",function(){
    var incrementTime = 70,
        updateTimer = function() {
            $('#timer').html(formatTime(currentTime));
            if (currentTime == 0) {
              $(".btn-reinicio").stop();
                timerComplete();
                $(".btn-reinicio").show();
                return;
            }
            currentTime = currentTime - (incrementTime / 10);
            if (currentTime < 0) currentTime = 0;
        },
        timerComplete = function() {
            console.log('Countdown timer complete!');
            $(".panel-tablero").fadeOut(1000);
            $(".panel-score").css("width", "90%");
        },
        init = function() {
            var tiempo = 12000;
            currentTime = tiempo;
            $(".btn-reinicio").text("Reiniciar");
            $(".btn-reinicio").on("click",function(){
              window.open("index.html",'_self');
            });
            $.timer(incrementTime, updateTimer, false);
            matrizInicial();
            showGrid();
            _checkAndDestroy();
        };
        $(init);
  });


});

//cambio a color blanco
function blanco(elemento){
  $(elemento).animate(
    { color: ["white", "linear"]
    }, 500, function(){
      original(elemento)  })
}
//cambio a color amarillo
function original(elemento){
  $(elemento).animate(
    { color: ["yellow", "linear"]
    }, 500, function(){
      blanco(elemento)  })
}

//variables de la grilla
var rows =7;
var cols =7;
var grid=[];

// armo el arreglo de las imagenes disponibles con su ruta
 var imagenes=[];
 imagenes[0]="image/1.png";
 imagenes[1]="image/2.png";
 imagenes[2]="image/3.png";
 imagenes[3]="image/4.png";

function matrizInicial(){
  for (var r = 0; r < rows; r++){
    grid[r]=[];
    for (var c =0; c< cols; c++) {
      //grid[r][c]=pickImage();
      grid[r][c]=new imagen(r,c,null,pickImage());
    }
  }
}

function stop(){
   for (var c = 0; c < cols; c++){
     var col=c+1;
     $('.col-'+col).empty();
   }
   console.log("vaciando grid");
}

// funcion retorna un objeto imagen
function imagen(r,c,obj,src)
    {
      return {
      r: r,  <!-- current row of the object -->
      c: c,  <!-- current columns of the object -->
      src:src, <!-- the image showed in cells (r,c) A Planet image!! -->
      locked:false, <!-- This property indicate if the cell (r,c) is locked -->
      isInCombo:false, <!-- This property indicate if the cell (r,c) is currently in valid figure-->
      o:obj <!-- this is a pointer to a jQuery object -->
     }
    }

// genero una imagen aleatoria
function pickImage() {
  var pickInt = Math.floor((Math.random()*4));
  return imagenes[pickInt];
}

// funcion que llena el tablero por primera vez
function showGrid(){
  //se ingresan las imagenes en las columnas
  for (var c = 0; c < cols; c++){
    var col=c+1;
    $('.col-'+col).empty();
    for (var r =0; r< rows; r++) {
      var img=grid[r][c];
      var elem="<img src="+grid[r][c].src+" class='elemento' id='img_"+r+"_"+c+"' r='"+r+"' c='"+c+"' ondrop='setTimeout(_onDrop(event), 2000)' ondragover='_onDragOverEnabled(event)' ondragstart='_ondragstart(event)'/>"
    //  $(elem).attr("ondragstart","_ondragstart(event)");
      $('.col-'+col).append(elem);
      grid[r][c].o = $(elem);
    }
  }
  console.log("cargando grid");

}

function _ondragstart(a){
    a.dataTransfer.setData("text/plain", a.target.id);
    console.log("on drag " + a.target.id);
}

// se ejecuta cuando muevo una imagen sobre otra sin soltarla
function _onDragOverEnabled(e){
   e.preventDefault();
   console.log("drag over " + e.target.id);
}

// se ejecuta cuando muevo una imagen sobre otra y la suelto
function _onDrop(e){
// solo para firefox!
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  if (isFirefox) {
      console.log("firefox compatibility");
      e.preventDefault();
  }
// obtengo posicion inicial de la imagen
  var src = e.dataTransfer.getData("text/plain");
  //alert("src "+src);
  var sr = src.split("_")[1];
  var sc = src.split("_")[2];

// obtengo posicion destino de la imagen
  var dst = e.target.id;
  var dr = dst.split("_")[1];
  var dc = dst.split("_")[2];

// chequeo la distancia del movimiento que no sea > 1 ;)
  var ddx = Math.abs(parseInt(sr)-parseInt(dr));
  var ddy = Math.abs(parseInt(sc)-parseInt(dc));

// valido que el movimiento sea solo de una posicion
  if (ddx > 1 || ddy > 1){
     console.log("invalid! distance > 1");
     return;
  }

// ejecuto el intercambio de imagenes
  var tmp = grid[sr][sc].src;
  grid[sr][sc].src = grid[dr][dc].src;
  grid[sr][sc].o.attr("src",grid[sr][sc].src);
  grid[dr][dc].src = tmp;
  grid[dr][dc].o.attr("src",grid[dr][dc].src);
  $("#movimientos-text").text(parseInt($("#movimientos-text").text())+1);
  $("#score-text").text(parseInt($("#score-text").text())+50);
  showGrid();
// reescribo la pantalla
_checkAndDestroy();
}

//vuelve a recrear la matriz de imagenes luego de un movimiento de drag del usuario

function _checkAndDestroy(){
  for (var r = 0; r < rows; r++){
    var prevCell = null;
    var figureLen = 0;
    var figureStart = null;
    var figureStop = null;
    var validFigures=0;
    for (var c=0; c< cols; c++){
      // Bypass jewels that is in valid figures.
      if (grid[r][c].locked || grid[r][c].isInCombo){
        figureStart = null;
        figureStop = null;
        prevCell = null;
        figureLen = 1;
        continue;
      }
      // first cell of combo!
      if (prevCell==null){
        //console.log("FirstCell: " + r + "," + c);
        prevCell = grid[r][c].src;
        figureStart = c;
        figureLen = 1;
        figureStop = null;
        continue;
      }
      else
      {
        //second or more cell of combo.
        var curCell = grid[r][c].src;
        // if current cell is not equal to prev cell
        // then current cell becomes new first cell!
        if (!(prevCell==curCell))
        {
          //console.log("New FirstCell: " + r + "," + c);
          prevCell = grid[r][c].src;
          figureStart = c;
          figureStop=null;
          figureLen = 1;
          continue;
        }
        else
        {
          // if current cell is equal to prevcell
          // then combo length is increased
          // Due to combo, current combo
          // will be destroyed at the end of this procedure.
          // Then, the next cell will become new first cell
          figureLen+=1;
          if (figureLen==3){

            validFigures+=1;
            figureStop = c;
            console.log("Combo from " + figureStart + " to " + figureStop + "!");
            for (var ci=figureStart;ci<=figureStop;ci++){
              grid[r][ci].isInCombo=true;
              grid[r][ci].src=null;


              //grid[r][ci].o.attr("src","");
              _executeDestroy();
            }
          prevCell=null;
          figureStart = null;
          figureStop = null;
          figureLen = 1;
          continue;
          }
        }
      }
    }
  }
}

// execute the destroy fo cell
function _executeDestroy(){
  for (var r=0;r<rows;r++)
    for (var c=0;c<cols;c++)
      if (grid[r][c].isInCombo)  // this is an empty cell
      {
        $("#img_"+r+"_"+c).fadeIn(200).delay(200).fadeOut(200).fadeIn(200).delay(200).fadeOut(200, function(){
            $(this).remove();
            $("#score-text").text(parseInt($("#score-text").text())+50);
            _executeDestroyMemory();
        });
      }
}

function _executeDestroyMemory() {
// move empty cells to top
  for (var r=0;r<rows;r++){
    for (var c=0;c<cols;c++){
      if (grid[r][c].isInCombo)  // this is an empty cell
      {
        grid[r][c].o.attr("src","")
        // disable cell from combo
        // (The cell at the end of this routine will be on the top)
        grid[r][c].isInCombo=false;

        for (var sr=r;sr>=0;sr--){
          if (sr==0) break; // cannot shift. this is the first rows
          if (grid[sr-1][c].locked) break; // cannot shift. my top is locked
          // shift cell
          var tmp = grid[sr][c].src;
          grid[sr][c].src=grid[sr-1][c].src;
          grid[sr-1][c].src=tmp;
        }
      }
    }
  }
  console.log("End of movement");

  //redrawing the grid
  // and setup respaw
  //Reset all cell
  for (var r=0;r<rows;r++){
    for (var c = 0;c<cols;c++){
      grid[r][c].o.attr("src",grid[r][c].src);
      grid[r][c].o.css("opacity","0.5");
      grid[r][c].isInCombo=false;
      if (grid[r][c].src==null) {
        grid[r][c].respawn=true;}
      // if respawn is needed
      if (grid[r][c].respawn==true){
        grid[r][c].o.off("ondragover");
        grid[r][c].o.off("ondrop");
        grid[r][c].o.off("ondragstart");
        grid[r][c].respawn=false; // respawned!
        console.log("Respawning " + r + "," + c);
        var nueva=new imagen(r,c,null,pickImage());
        var elem="<img src="+grid[r][c].src+" class='elemento' id='img_"+r+"_"+c+"' r='"+r+"' c='"+c+"' ondrop='setTimeout(_onDrop(event), 2000)' ondragover='_onDragOverEnabled(event)' ondragstart='_ondragstart(event)'/>"
      //  $(elem).attr("ondragstart","_ondragstart(event)");
        grid[r][c].o = $(elem);
        grid[r][c].src=nueva.src;
        console.log("aqui " +grid[r][c].src);
        grid[r][c].locked=false;
        grid[r][c].o.attr("src",grid[r][c].src);
        grid[r][c].o.attr("ondragstart","_ondragstart(event)");
        grid[r][c].o.attr("ondrop","_onDrop(event)");
        grid[r][c].o.attr("ondragover","_onDragOverEnabled(event)");
        //grid[r][c].o.css("opacity","0.3");
        //grid[r][c].o.css("background-color","red");
      }
    }
  }
  console.log("jewels resetted and rewpawned");
  showGrid();
  // check for other valid figures
  _checkAndDestroy();
}

function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return pad(min, 2) + ":" + pad(sec, 2) ;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
