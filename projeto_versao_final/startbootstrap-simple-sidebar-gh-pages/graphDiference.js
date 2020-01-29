var nodesAfterDif = new Array;

/*
0: Service
coordinatX: 307.67860668526066
coordinatY: 200.35711302402606
drawText: true
instances: (12) [Service, Service, Service, Service, Service, Service, Service, Service, Service, Service, Service, Service]
low: undefined
name: "service0"
neighbors: undefined
textDraw: undefined
visited: false
*/

/*
from: Service {name: "service2", coordinatX: 62.495001342521014, coordinatY: 401.71664075167433, instances: Array(11), visited: true, …}
numberCalls: "13"
to: Service {name: "service10", coordinatX: 154.7142858425813, coordinatY: 478.2
*/



function graphDif(firstNodes,secondsNodes,firstLinks,secondsLink){

  var arrayServiceDif = serviceDif(firstNodes,secondsNodes);
  var nodesAdded = arrayServiceDif[0];
  var nodesRemoved = arrayServiceDif[1];
  var arrayLinkDif = linkDifAddedRemoved(firstLinks,secondsLink);v
  var linksAdded = arrayLinkDif[0];
  var linksRemoved = arrayLinkDif[1];
}

// links added or removed
function linkDifAddedRemoved(firstLinks,secondLinks){

  var linksAdded;
  var linksRemoved;

  // nodes nodesRemoved

  for(var i=0;i<firstLinks.length;i++){

    var currentLink = firstLinks[i];
    var founded = false;
    for(var j=0;j< secondLinks.length;j++){
      if(firstLinks[i] == secondLinks[j]){
        founded= true;
      }
    }
    if(founded == false){
      linksRemoved.add(currentLink);
    }
    founded = false;
  }

  // nodesAdded


  for(var i=0;i<secondLinks.length;i++){

  var currentLink = secondLinks[i];
  var founded = false;
  for(var j=0;j<firstLinks.length;j++){
    if(secondLinks[i] == firstLinks[j]){
      founded= true;
    }
  }
  if(founded == false){
    linksAdded.add(currentLink);
  }
  founded = false;
  }

  var arrayReturn = new Array();
  arrayReturn.push(linksAdded,linksRemoved);
  return arrayReturn;

}


// diference in the link information
function linkDifInfo(firstLinks,secondLinks){
  for(var i=0;i<)
}


function serviceDif(firstNodes,secondsNodes){
  var nodesAdded;
  var nodesRemoved;

  // nodes nodesRemoved

  for(var i=0;i<firstNodes.length;i++){

    var currentNode = firstNodes[i];
    var founded = false;
    for(var j=0;j<secondsNodes.length;j++){
      if(firstNodes[i] == secondsNodes[j]){
        founded= true;
      }
    }
    if(founded == false){
      nodesRemoved.add(currentNode);
    }
    founded = false;
  }

  // nodesAdded


  for(var i=0;i<secondsNodes.length;i++){

  var currentNode = secondsNodes[i];
  var founded = false;
  for(var j=0;j<firstNodes.length;j++){
    if(secondsNodes[i] == firstNodes[j]){
      founded= true;
    }
  }
  if(founded == false){
    nodesAdded.add(currentNode);
  }
  founded = false;
  }

  var arrayReturn = new Array();
  arrayReturn.push(nodesAdded,nodesRemoved);
  return arrayReturn;

}
