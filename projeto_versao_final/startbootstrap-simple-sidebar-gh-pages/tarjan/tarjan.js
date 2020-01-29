

// Recives the lists of services and edges,
// construct arrays and performs d3 simulation

function getServicesEdgesTarjanSim(svg2) {
  console.log("------- tarjan simulation------");

  let newResponseNotParsed = getGraphByDate(dateToIterate);

  //console.log(newResponseNotParsed);
  let newResponseInfluxNotParsed = getGraphByDateInflux(dateToIterate);
  //console.log(newResponseInfluxNotParsed);

  //console.log(newResponseNotParsed);
  let newResponseParsed = JSON.parse(newResponseNotParsed);
  let newResponseInfluxParsed = JSON.parse(newResponseInfluxNotParsed);
  //console.log(newResponseInfluxParsed);
  //console.log(newResponseParsed);

  let newNodes = newResponseParsed.nodes;
  let newLinks = newResponseParsed.links;

  //console.log(newNodes);
  //console.log(newLinks);

  let servicesTarjan = [];


  for(let i =0;i<newNodes.length;i++){
    servicesTarjan = populateServicesJsonInstances3(newNodes[i],servicesTarjan);
  }

  //console.log(servicesTarjan);

  let edgeArray = [];

  for(let j=0;j<newLinks.length;j++){
    edgeArray = populateEdgesJson2(newLinks[j],edgeArray,servicesTarjan);
  }

  // init http data parameters
  // init edges

  let edgeArrayWithHttpInfo =  serielizeInflux(newResponseInfluxParsed,servicesTarjan,edgeArray);
  let arrayReturn = edge_initHttpInfo(servicesTarjan,edgeArrayWithHttpInfo);
  edgeArrayWithHttpInfo = arrayReturn[0];
  let totalNumberRequests = arrayReturn[1];
  let totalAverageTime = arrayReturn[2];
  //console.log(totalAverageTime);
  //console.log(totalNumberRequests);
  //console.log(edgeArrayWithHttpInfo);

  let servicesWithInfo = service_initHttpInfo(servicesTarjan,edgeArrayWithHttpInfo);
  servicesWithInfo = service_initHttpInfoPercentages(servicesTarjan, edgeArrayWithHttpInfo,totalNumberRequests, totalAverageTime);

  edgeArrayWithHttpInfo = edge_initHttpInfoPercentages(edgeArrayWithHttpInfo,totalNumberRequests,totalAverageTime);

  //console.log(servicesTarjan);
  //console.log(servicesWithInfo);
  //console.log(edgeArrayWithHttpInfo);


  tarjanGraph(servicesWithInfo,edgeArrayWithHttpInfo,svg,servicesTarjan,totalNumberRequests,totalAverageTime);


}

