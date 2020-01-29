function drawEdges(draw){
  var arrayLength = EdgeArray.length;
  for (var i = 0; i < arrayLength; i++) {
    var coordinatesFrom = getIncidencePoint(EdgeArray[i].from,EdgeArray[i].to);
    var coordinatesTo = getIncidencePoint(EdgeArray[i].to,EdgeArray[i].from);
    var from = EdgeArray[i].from;
    var to = EdgeArray[i].to;
    var line = draw.line(from.x+ ServiceRadius/2 +coordinatesFrom[0], from.y+ ServiceRadius/2 +coordinatesFrom[1],    to.x + ServiceRadius/2 + coordinatesTo[0],    to.y + ServiceRadius/2 + coordinatesTo[0]);
    line.stroke({ color: '#f06', width: 5, linecap: 'round' });
  }
}


function drawEdges2(draw){
  var arrayLength = EdgeArray.length;
  console.log("numero de edges:"+ arrayLength+"   ;");
  for (var i = 0; i < arrayLength; i++) {
    console.log("-----------------LOOP---------------");
    console.log("Service0:x:"+EdgeArray[i].from.x+";y:"+EdgeArray[i].from.y);
    console.log("Service1:x:"+EdgeArray[i].to.x+";y:"+EdgeArray[i].to.y);
    var coordinatesFrom = getIncidencePointMiddle(i,0);
    var coordinatesTo = getIncidencePointMiddle(i,1);


    //var coordinatesFrom = getIncidencePoint(EdgeArray[i].from,EdgeArray[i].to);
    //var coordinatesTo = getIncidencePoint(EdgeArray[i].to,EdgeArray[i].from);
    //console.log("x:"+coordinatesFrom[0]+";y:"+coordinatesFrom[1]);
    //console.log("x:"+coordinatesTo[0]+";y:"+coordinatesTo[1]);
    var from = EdgeArray[i].from;
    var to = EdgeArray[i].to;
    var line = draw.line(coordinatesFrom[0],coordinatesFrom[1], coordinatesTo[0], coordinatesTo[1]);
    line.stroke({ color: '#f06', width: 5, linecap: 'round' });
    console.log("desenhou");
  }
}



function getIncidencePointMiddle(i,modo)
{



  var x;
  var y;
  console.log("-------calcular ponto-----------");

  if(modo == 0){
    console.log("Modo 0");
    var x1 = EdgeArray[i].from.x;
    var y1 = EdgeArray[i].from.y;
    var x2 = EdgeArray[i].to.x;
    var y2 = EdgeArray[i].to.y;

  }
  else if(modo == 1){
    console.log("modo 1");
    var x2 = EdgeArray[i].from.x;
    var y2 = EdgeArray[i].from.y;
    var x1 = EdgeArray[i].to.x;
    var y1 = EdgeArray[i].to.y;

  }
  console.log("X:"+ x1 + "   Y:"+ y1);

  var mY= y2 - y1;
  var mX = x2 - x1;
  var m =mY/mX;
  var angle = Math.atan(m);
  console.log("mX:"+mX+"  ;mY:"+mY);
  console.log("M:"+ m +"  ;Angle:"+angle);
  if(mY < 0 && mX < 0)
  {
    console.log("menor menor");
    if(angle < 0.78 )
    {
      console.log("angulo maior que 45");
      x = x1 + ServiceRadius/2;
      y = y1 ;
      //var x =
    }
    else if(angle >= 0.78)
    {
      console.log("angulo menor que 45");
      x = x1 + ServiceRadius/2;
      y = y1;
    }

  }

  if(mY >= 0 && mX >= 0)
  {
    console.log("maior maior");
    if(angle < 0.78 )
    {
      console.log("angulo maior que 45");
      var x = x1 + ServiceRadius;
      var y = y1 + ServiceRadius/2;
    }
    else if(angle  >= 0.78)
    {
      console.log("angulo menos que 45");
      x = x1 + ServiceRadius/2;
      y = y1 + ServiceRadius;
    }
  }


    if(mY >= 0 && mX < 0)
    {
      console.log("maior menor");
      if(angle < 0.78 )
      {
        console.log("angulo maior que 45");
        x = x1 ;
        y = y1 + ServiceRadius/2;
      }
      else if(angle  >= 0.78)
      {
        console.log("angulo menos que 45");
      }
    }


      if(mY < 0 && mX >= 0)
      {
        console.log("menor maior");
        if(angle < 0.78 )
        {
          console.log("angulo maior que 45");
          x = x1+ ServiceRadius/2;
          y = y1;
        }
        else if(angle  >= 0.78)
        {
          console.log("angulo menos que 45");
        }
      }

      console.log("x:"+x+"; y:"+y);
      return [x,y];

}

function getIncidencePoint(service1, service2)
{

  var mY=service2.y - service1.y;
  var mX = service2.x - service1.x;
  var m =mY/mX;

  if(m<0){
    m = -m;
  }

  console.log("m:"+m);
  var angle = Math.atan(m);
  console.log("Angulo:"+angle);

  var x1 = Math.cos(angle);
  var y1 = Math.sin(angle);
  console.log("x1:"+x1+";y1:"+y1);
  if(mX < 0 && mY < 0 ){
    console.log("Menor ambas");
    var x = ServiceRadius/2 - (x1*ServiceRadius/2);
    var y = ServiceRadius/2 - (y1*ServiceRadius/2);

  }
  else if(mX <0){

    console.log("Menor X");
    var x = ServiceRadius/2 - (x1*ServiceRadius/2);
    var y = ServiceRadius/2 + (y1*ServiceRadius/2);
  }
  else if(mY<0){

    console.log("Menor y");
    var x = ServiceRadius/2 + (x1*ServiceRadius/2);
    var y = ServiceRadius/2 - (y1*ServiceRadius/2);

  }

  else{
    //console.log("Maior");
    var x = ServiceRadius/2 + x1*ServiceRadius/2;
    var y = ServiceRadius/2 + y1*ServiceRadius/2;

  }
  console.log("x:"+x+";y:"+y);
  return [x,y];
}



// EXEMPLO DE ZOOM
//https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate

//document.getElementById("mytimeline").addEventListener("wheel",
function handleZoom(e)
{

  var element = document.getElementById("mytimeline");
  //console.log("---TESTE"+element.x);
  console.log("ZOOM");


  console.log(element.viewportXBegin + ";" + element.viewportYBegin + ";" + element.viewportXEnd +";"+ element.viewportYEnd);
  console.log(element.viewportXBegin);
  //var centerPoint = [viewportH/2, viewportW/2];

  //alert(centerPoint)
  //console.log(window.scrollX+";"+window.scrollY);
  console.log(e.clientX+";"+e.clientY);
  shape = document.getElementsByTagName("svg")[0];
  var x = e.pageX - $('#mytimeline').offset().left;
  var y = e.pageY - $('#mytimeline').offset().top;

  if (event.deltaY < 0)
  {
    console.log("deltaY < 0 ");
    /*viewportXEnd+=zoomInc;
    viewportXBegin+=zoomInc;///home/joel/Desktop/disserta%C3%A7%C3%A3o/startbootstrap-simple-sidebar-gh-pages%20(1)/startbootstrap-simple-sidebar-gh-pages/index.html
    viewportYEnd+=zoomInc;
    viewportYBegin+=zoomInc;*/

    element.viewportXBegin = x - ((element.viewportXEnd - element.viewportXBegin)) + zoomInc;
    element.viewportYBegin = y - ((element.viewportYEnd - element.viewportYBegin)) + zoomInc;
    //element.viewportXEnd =  x + ((element.viewportXEnd - element.viewportXBegin)) + zoomInc;
    //element.viewportYEnd= y + ((element.viewportYEnd - element.viewportYBegin)) + zoomInc;


    element.viewportXEnd =  element.viewportXEnd - zoomInc;

    element.viewportYEnd =  element.viewportYEnd - zoomInc;


  }

  else if (event.deltaY > 0)
  {
    console.log("deltaY > 0 ");
    /*viewportXEnd-=zoomInc;
    viewportXBegin-=zoomInc;///home/joel/Desktop/disserta%C3%A7%C3%A3o/startbootstrap-simple-sidebar-gh-pages%20(1)/startbootstrap-simple-sidebar-gh-pages/index.html
    viewportYEnd-=zoomInc;
    viewportYBegin-=zoomInc;*/

    element.viewportXBegin = x - ((element.viewportXEnd - element.viewportXBegin)) - zoomInc;
    element.viewportYBegin = y - ((element.viewportYEnd - element.viewportYBegin)) - zoomInc;
    //element.viewportXEnd =  x + ((element.viewportXEnd - element.viewportXBegin)) - zoomInc;
    //element.viewportYEnd= y + ((element.viewportYEnd - element.viewportYBegin)) - zoomInc;

    element.viewportXEnd =  element.viewportXEnd + zoomInc;

    element.viewportYEnd =  element.viewportYEnd + zoomInc;


  }


  /*if(element.viewportXBegin < 0){
    console.log("entrou");
    element.viewportXBegin = 5;
  }
  if(element.viewportYBegin < 0){
    console.log("entrou1");
    element.viewportYBegin = 5;
  }
  if(element.viewportXEnd > 800){
    console.log("entrou2");
    element.viewportXEnd = 795;
  }
  if(element.viewportYEnd > 800){
    console.log("entrou3");
    element.viewportYEnd = 795;
  }
*/

  var viewportString = "" + element.viewportXBegin + " " + element.viewportYBegin + " " + element.viewportXEnd+ " " + element.viewportYEnd  ;
  console.log(viewportString);
  shape.setAttribute("viewBox", viewportString);



}
//);
