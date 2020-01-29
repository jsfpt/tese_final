//// TODO:
// TIRAR OS SERVIÇOS QUE NAO ESTEJAM NO ECRA DEPOIS DO Zoombem

// horizontal bar
//https://uxdesign.cc/creating-horizontal-scrolling-containers-the-right-way-css-grid-c256f64fc585

// DRAG https://stackoverflow.com/questions/4367055/javascript-ondrag-ondragstart-ondragend


var ServiceRadius = 50;
var serviceArray = [];
var EdgeArray = [];

var serviceArrayDate1 = [];
var EdgeArrayDate1= [];


var serviceArrayDate2 = [];
var EdgeArrayDate2= [];



var ServiceTarget = [];
var numberServices = 10;
var neighborsArray = [];
var arraySetOfServices = new Array();
var arrayEdgesSets = new Array();
var nodesComponets= new Array();
var linkComponets= new Array();
var exitSim = 0;
var d3Sim= 1;
var d3dif = 1;
var triggerSim = -1;
var typeSim = 0;
var svgGlobal;
var dateToIterate = 0;
var datePrevious = 0;
var dateToIterateFinal = 2;
var typeFeature = 0; // 0-normal graph, 1-graphCompare
var oldNodes = Array();

/*var viewportX = 0;
var viewportY = 0;
var viewportW = 600;
var viewportH = 600;*/
var serviceClicked = 0;


var w = window.innerWidth;
var h = window.innerHeight;
console.log(w);
console.log(h);

/*const viewportXEnd = 1000;
const viewportYEnd = 1000;
const viewBoxFixSize = 1000;
const viewBoxFixSizeHeight = 700;*/
const viewportXEnd = 1000;
const viewportYEnd = 1000;
const viewBoxFixSize = 0.52*w;
const viewBoxFixSizeHeight = 0.64*h;
console.log(viewBoxFixSize);
console.log(viewBoxFixSizeHeight);


let viewportXBegin = 0;
let viewportYBegin = 0;
let zoomInc = 10;
let zoomIncSide = 5; // 10 passos

var xCurrentCenter = viewBoxFixSize/2;
var yCurrentCenter = viewBoxFixSize/2;



// D3 simulation
const simulationDurationInMs = 10000; // 5 seconds
let startTime = Date.now();
let endTime = startTime + simulationDurationInMs;


let raius = 30;
let forceCollide = raius*1.7;
var raiusInstances = raius/3;



var iterativeZoom = false;
var triggerNewSim = false;

var countSims = 0;


var previousNodeInfo;

var currentServiceArray = new Array();
var currentlinksArray = new Array();
var currentNeighboursArray = new Array();



//  ----------------------- Parse Node and link array to JSON, with the objective to draw the findComponentFromService

function parseNodesComponents(){
  var nodesComponetsJSON = JSON.stringify(nodesComponets);
  //console.log(nodesComponetsJSON);
  return nodesComponetsJSON;
}

function parseLinksComponents(){
  var linksComponentsJSON = JSON.stringify(linkComponets);
  //console.log(linksComponentsJSON);
  return linksComponentsJSON;
}

//------------------------ Joins all the edges from the services of each set




function deleteNodesAndLinks(){


  const myNode = document.getElementById("svg");
   while (myNode.firstChild) {
     var child = myNode.firstChild;
     //console.log(child);
     /*try{
       if(child.getAttribute("id") != "outbox"){
         myNode.removeChild(myNode.firstChild);
       }
     }catch(e){

     }*/
     myNode.removeChild(myNode.firstChild);



   }

}

function d3Zoom(){
  var graphArea = d3.select("#id")
    .attr("width",  viewBoxFixSize)
    .attr("height",  viewBoxFixSizeHeight)
    .call(d3.zoom().on("zoom", function () {
       graphArea.attr("transform", d3.event.transform)
    }));


}




function fadeClick() {
  d3.selectAll ("circle, line").classed ("faded highlight", false);
}


function desiriJson(graph)
{
  var graphObject = JSON.parse(graph) ;
  console.log(graphObject);

}







function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}



// get the info about de date intervals
init_DB_dates();


//init the svg area
var svg = d3.select("#mytimeline").append("svg")
  .attr("width", viewBoxFixSize)
  .attr("height", viewBoxFixSizeHeight)
  .attr("overflow","hidden")
  .attr("display","block");





var nodesComponentJSON;
var linksComponentJSON;

// ------------------------ DRAW FUNCTIONS
//setXYPositionD3_2(1,nodesComponentJSON,linksComponentJSON,svg,viewBoxFixSize,viewBoxFixSize,raius,forceCollide,40,0,0);       //
//setXYPositionD3_2(1,response.nodes,response.links,viewBoxFixSize,viewBoxFixSize,raius,forceCollide,40,0,0,"#0080ff",1);             // without Tarjan

exitSim = 1;
svgGlobal = svg;

//console.log(serviceArray);
//console.log(EdgeArray);
console.log(dates);
//dateToIterate = dates[0]; // pass the index of the array of dates in seconds
dateToIterate = 0;
datePrevious  = 0;
//manageNewSimulation(svg);

/*while (exitSim == 0) {
  console.log("waiting...");
}
*/

//console.log("saiu do waiting");
//console.log(nodesGlobal);

//setXYPositionD3_2(1,nodesGlobal,response.links,svg,viewBoxFixSize,viewBoxFixSize,raius,forceCollide,40,0,0,"#0080ff");             // without Tarjan


// trigger all sims, there is a timer that checks if an simulation is about to begin, and choose wich type
function triggerAllSims(){

  if(triggerNewSim == true){

    updateTitleGraph(typeSim);

    let shape = document.getElementsByTagName("svg")[0];
    var viewportString = "" + 0 + " " + 0 + " " + viewBoxFixSize + " " + viewBoxFixSize;
    console.log("String:"+viewportString);
    shape.setAttribute("viewBox", viewportString);
    if(typeSim == 1){
      //normal sims

      manageNewSimulation(svg,iterativeZoom);
      //tarjanServiceSim(true);

    }
    if(typeSim == 2){
      //dif sim
      graphCompare();
    }
    if(typeSim == 3){
      getServicesEdgesTarjanSim(svg);
    }
    if(typeSim == 4){
      console.log("Services Sim");
      servicesSim(svg,iterativeZoom);
    }

    if(typeSim == 5){
      tarjanServiceSim(true,iterativeZoom);
    }

    if(typeSim === 6){
      iterativeGraph(true,iterativeZoom);
    }

  }

  triggerNewSim = false;

}


//buttons chossethe types of simulation

function initNormalSim(){  // iterative
  //triggerNewSim = true;
  cleanRightDiv();
  typeSim = 6;
  iterativeZoom = true;

}
function initDifSim(){
  //triggerNewSim = true;
  cleanRightDiv();
  typeSim = 2;
}
function initTarjanSim(){
  //triggerNewSim = true;
  cleanRightDiv();
  typeSim = 3;
}
function initServicesSim(){  // iterative
  //triggerNewSim = true;
  cleanRightDiv();
  typeSim = 4;
}

function initTarjanServiceSim(){  //iterative
  //triggerNewSim = true;
  cleanRightDiv();
  typeSim = 5

}

function initInstancesSim(){  //iterative
  //triggerNewSim = true;
  cleanRightDiv();
  typeSim = 1;

}


//tarjan over services
//initTarjanSim();

//services
//initServicesSim();

//instances
//initNormalSim();



let svgList = document.getElementsByTagName("svg");
let svgId = svgList[0];
svgId.setAttribute("id","svg");


let EdgeJson, ServiceJson;


// ----------------------------- listeners ----------------------------
//addEventListenerToCircle();   //BOX
//addEventListenerToLines();


function  alertFuncRight(){

  alert("double click");

}

function alertFunc(x,y){
    alert(" X:"+ x +" Y:"+ y);

}



function toJSON(){

  EdgeJson = JSON.stringify(EdgeArray);
  ServiceJson = JSON.stringify(serviceArray);
  saveAs(EdgeJson,"nodes.json");


}


loopcheckNewSim();


function loopcheckNewSim() {

  console.log("loop");
    if(triggerNewSim == true){
      triggerAllSims();
    }

    setTimeout(loopcheckNewSim, 1000);

}

function  testTitleclick(){
  console.log("title click");
  console.log(event.target);
}


// update title of the graph
function updateTitleGraph(typeSim){

  console.log(typeSim);
  let title = document.getElementById("titleGraph");
  //console.log(title);
  console.log(dateToIterate);
  if(typeSim === 1){
    title.textContent = "Instances";
    title.setAttribute("textContent","Instances");
  }
  if(typeSim === 2){
    title.textContent = "Graph Compare";
    title.setAttribute("textContent","Graph Compare");
  }
  if(typeSim === 3){
    title.textContent = "Graph of Strong connected Instances Components";
    title.setAttribute("textContent","Graph of Strong connected Instances Components");
  }
  if(typeSim === 4){
    title.textContent = "Graph of Services";
    title.setAttribute("textContent","Graph of Services");
  }
  if(typeSim === 5){
    title.textContent = "Graph of Strongly connected Service Components";
    title.setAttribute("textContent","Graph of Strongly connected Service Components");
  }


}
