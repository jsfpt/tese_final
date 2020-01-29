var zoomOnGlobal = false;
var counter = 50;
var simCount = 0;

/*
function initZoomVariables(zoomOn){

  //console.log(zoomOn);
  zoomOnGlobal = zoomOn;
  console.log(viewportXBegin + ";" + viewportYBegin + ";" + viewportXEnd +";"+ viewportYEnd);

  var element = document.getElementById("mytimeline");
  console.log(element);
  element.onwheel = addEventListener("wheel",handleZoom3);
  element.x = 10;
  element.viewportXBegin = viewportXBegin;

  element.viewportYBegin = viewportYBegin;

  element.viewportXEnd = viewportXEnd;

  element.viewportYEnd = viewportYEnd;

  // // TODO: mover o quadrado um bocado para o ponto

  var zoomIntensity = 0.2;

  var scale = 1;
  var originx = 0;
  var originy = 0;
  var visibleWidth = viewBoxFixSize;
  var visibleHeight = viewBoxFixSize;


}

 */

function countScrolls()
{
  if (event.deltaY < 0) {
    console.log("Delta < 0");
    if (zoomOnGlobal === true) {
      updateZoomCont(1);

    }
  }
  else
  {
    console.log("Delta > 0");
    if(zoomOnGlobal === true){
      updateZoomCont(-1);
    }
  }

}

function initZoomVariables(zoomOn) {

  /// -------------------- give credits to: https://www.npmjs.com/package/svg-pan-zoom

  console.log("----- INIT ZOOM ------");

  if(zoomOn === true){
    // count scroll to change graph
    var element = document.getElementById("mytimeline");
    //console.log(element);
    element.onwheel = addEventListener("wheel",countScrolls);
    zoomOnGlobal = zoomOn;

  }


  // actual zoom

  if(simCount != 0){
    try {

      let panZoomTiger = svgPanZoom('#svg');
      panZoomTiger.destroy();
      delete panZoomTiger;

    }
    catch (err) {
      // statements to handle any exceptions
      //console.log(err);
      try {

        let panZoomTiger2 = svgPanZoom('#svg');
        panZoomTiger2.destroy();
        delete panZoomTiger2;
      }
      catch (err) {
        // statements to handle any exceptions
        console.log(err);
      }
    }
  }

  simCount++;


  var panZoom = svgPanZoom('#svg', {
    zoomEnabled: true,
    controlIconsEnabled: true
  });


  document.getElementById('svg-pan-zoom-zoom-in').addEventListener('click', function(ev){
    ev.preventDefault()

    panZoom.zoomIn()
  });

  document.getElementById('svg-pan-zoom-zoom-out').addEventListener('click', function(ev){
    ev.preventDefault()

    panZoom.zoomOut()
  });

  document.getElementById('svg-pan-zoom-reset-pan-zoom').addEventListener('click', function(ev){
    ev.preventDefault()

    panZoom.resetZoom()
  });

  
}

function handleZoom3(e)
{
  var element = document.getElementById("mytimeline");
  console.log(zoomOnGlobal);

  var makeZoom = 1;

  console.log("\n\n-------------------------------------------------------------------------");


  var XBegin = element.viewportXBegin;
  var YBegin = element.viewportYBegin;
  var XEnd = element.viewportXEnd;


  //console.log("print inicio função:"+ element.viewportXBegin + ";" + element.viewportYBegin + ";" + element.viewportXEnd +";"+ element.viewportYEnd);


  //console.log(e.clientX+";"+e.clientY);
  shape = document.getElementsByTagName("svg")[0];
  var x = e.pageX - $('#mytimeline').offset().left;
  var y = e.pageY - $('#mytimeline').offset().top;
  //var xCurrentCenter = element.viewportXBegin + ((element.viewportXEnd - element.viewportXBegin) / 2);
  //var yCurrentCenter = element.viewportYBegin + ((element.viewportXEnd- element.viewportYBegin) / 2);


  //var xCurrentCenter = viewBoxFixSize/2;
  //var yCurrentCenter = viewBoxFixSize/2;


  //var xCurrentCenter = (element.viewportXBegin + element.viewportXEnd) - element.viewportXBegin;
  //var yCurrentCenter = (element.viewportYBegin + element.viewportYEnd) - element.viewportXBegin;

  //var distX = Math.sqrt(Math.pow((x-xCurrentCenter),2));
  //var distY =  Math.sqrt(Math.pow((y-yCurrentCenter),2));

  var distX = x-xCurrentCenter;
  var distY = y-yCurrentCenter;

  //console.log("Mouse:"+x+"; "+y);
  //console.log("Center:"+xCurrentCenter+"; " + yCurrentCenter);
  //console.log("distX:"+distX+";DistY:"+distY);


  // Alterar o tamanho do quadrado


  // proporção do x em relacao ao y
  var propotion = distY/distX;

  //console.log("porp:"+propotion);

  //---------------------------------------------------------
  var xMovement;
  var yMovement;

  if(distX < 0){
    xMovement = -zoomInc*1.5;
  }
  else {
    xMovement = zoomInc*1.5;
  }
  if(distY < 0)
  {
    yMovement = -(propotion*(zoomInc/10));
  }
  else {
    yMovement = propotion*(zoomInc/10);
  }

  xCurrentCenter -= xMovement;
  yCurrentCenter -= yMovement;

  element.viewportXBegin = element.viewportXBegin +  xMovement;
  element.viewportYBegin = element.viewportYBegin +  yMovement;



  if (event.deltaY < 0)
  {
    console.log("Delta < 0");
    if(zoomOnGlobal === true){
      updateZoomCont(1);

    }
    element.viewportXEnd = element.viewportXEnd - zoomInc;
    if(element.viewportXEnd < 0){
      element.viewportXEnd = 0
    }
  }
  else
  {
    console.log("Delta > 0");
    if(zoomOnGlobal === true){
      updateZoomCont(-1);
    }
    element.viewportXEnd = element.viewportXEnd +  zoomInc;
  }



  // Restringir o tamanho para o intervalo 0-600px

  if(element.viewportXEnd < (viewBoxFixSize/3))
  {
    element.viewportXEnd=(viewBoxFixSize/3)+1;
    makeZoom = 0;
  }

  if(element.viewportXEnd < 0){

  }

/*
  if(element.viewportXBegin > (viewBoxFixSize*(4/5)))
  {
    element.viewportXBegin = (viewBoxFixSize*(4/5));
    makeZoom = 0;
  }

  if(element.viewportYBegin > (viewBoxFixSize*(4/5)))
  {
    element.viewportYBegin = (viewBoxFixSize*(4/5));
    makeZoom = 0;
  }

  if(element.viewportXBegin < 0 )
  {
    console.log("X begin < 0");
    xMovement = 0;
    element.viewportXBegin = 0;
    makeZoom = 0;
  }

  if(element.viewportYBegin < 0 )
  {

    console.log("Y begin < 0");
    yMovement = 0;
    element.viewportYBegin = 0;
  }*/

  //console.log("xMovement:"+xMovement);
  //console.log("yMovement:"+yMovement);




  var viewportString = "" + element.viewportXBegin + " " + element.viewportYBegin + " " + element.viewportXEnd + " " + element.viewportXEnd;
  console.log("String:"+viewportString);
  shape.setAttribute("viewBox", viewportString);

}


function d3Zoom() {
  //https://observablehq.com/@d3/drag-zoom
  var svgPosition = document.getElementById("svg").getBoundingClientRect();
  console.log(svgPosition.top); // y
  console.log(svgPosition.left); //x
  console.log(svgPosition.right); // x + size
  console.log(svgPosition.bottom); //top + size
  console.log("zoom");

  var svgZoom = d3.select("#svg")
      .call(d3.zoom().on("zoom", function () {
            svgZoom.attr("transform", d3.event.transform)
          })
              .translateExtent([[svgPosition.left, svgPosition.top], [svgPosition.right, svgPosition.bottom]])
              .extent([[svgPosition.left, svgPosition.top], [svgPosition.right, svgPosition.bottom]])

          //.extent([[svgPosition.top, svgPosition.left], [svgPosition.right, svgPosition.bottom]])
      )


      .attr("width", viewBoxFixSize)
      .attr("height", viewBoxFixSize);

}
