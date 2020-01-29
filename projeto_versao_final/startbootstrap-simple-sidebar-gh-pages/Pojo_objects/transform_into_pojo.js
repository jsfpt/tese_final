

function edgeToLink(edgeArray){
  var length = edgeArray.length;
  var linkArrayReturn = new Array();
  for(var i=0;i<length;i++){
    var from = edgeArray[i].from;
    var to = edgeArray[i].to;
    var numberCalls = edgeArray[i].numberCalls;
    var color = edgeArray[i].color;
    var newLink = new link(from.name,to.name,numberCalls,color);
    linkArrayReturn.push(newLink);
  }
  return linkArrayReturn;
}


function edgeToLinkInflux(edgeArray){
  let length = edgeArray.length;
  let linkArrayReturn = new Array();
  for(let i=0;i<length;i++){
    let from = edgeArray[i].from.name;
    let to = edgeArray[i].to.name;
    let color = "none";
    let averageTime = edgeArray[i].AverageTimePercentage;
    let totalNumberRequestsPercentage = edgeArray[i].totalNumberRequestsPercentage;

    /*let newLink = new link();
    newLink.setHttpInfo(from,to,averageTime,totalNumberRequestsPercentage,color);
    */
    var edge = new link(from,to);
    edge.setNumberTotalRequests(edgeArray[i].totalNumberRequests);
    edge.setAverageResponseTime(edgeArray[i].averageResponseTime);
    edge.setTotalRequestTime(edgeArray[i].totalRequestTime);
    edge.setTotalNumberRequestsPercentage(edgeArray[i].totalNumberRequestsPercentage);
    edge.setAverageTimePercentage(edgeArray[i].AverageTimePercentage);


    linkArrayReturn.push(edge);

  }
  return linkArrayReturn;

}



//-------------------------Transform info to pojo objects


/*
    this.totalNumberRequests = totalNumberRequests;
    this.averageResponseTime = averageResponseTime;
    this.totalRequestTime = totalRequestTime;
    this.totalNumberRequestsPercentage = totalNumberRequestsPercentage;

    this.AverageTimePercentage = averageTimePercentage;

 */
function edgePojoObjects(arrayEdgesSets,linkComponets){
  //console.log(arrayEdgesSets);

  var length = arrayEdgesSets.length;
  for(var i =0;i<length;i++){
    var from = arrayEdgesSets[i].from;
    var to = arrayEdgesSets[i].to;
    var edge = new link(from.serviceFrom,to.serviceFrom);
    edge.setNumberTotalRequests(arrayEdgesSets[i].totalNumberRequests);
    edge.setAverageResponseTime(arrayEdgesSets[i].averageResponseTime);
    edge.setTotalRequestTime(arrayEdgesSets[i].totalRequestTime);
    edge.setTotalNumberRequestsPercentage(arrayEdgesSets[i].totalNumberRequestsPercentage);
    edge.setAverageTimePercentage(arrayEdgesSets[i].AverageTimePercentage);

    linkComponets.push(edge);
  }
  return linkComponets;
}

function nodePojoObjects(arraySetOfServices,nodesComponets){
  //console.log("---------");
  var length = arraySetOfServices.length;
  for(var i=0;i<length;i++){
    var node = new nodeLink(arraySetOfServices[i].serviceFrom,arraySetOfServices[i].services);
    node.setTotalNumberRequests(arraySetOfServices[i].totalNumberRequests);
    node.setAverageResponseTime(arraySetOfServices[i].averageResponseTime);
    node.setTotalRequestTime(arraySetOfServices[i].totalRequestTime);
    node.setTotalNumberRequestsPercentage(arraySetOfServices[i].totalNumberRequestsPercentage);
    node.setAverageTimePercentage(arraySetOfServices[i].AverageTimePercentage);

    nodesComponets.push(node);
  }
  return nodesComponets;
  //arraySetOfServices

}
