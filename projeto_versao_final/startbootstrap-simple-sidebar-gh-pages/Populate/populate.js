
function service_initHttpInfoPercentages(serviceArray,edgeArray, totalNumberRequests, averageTimeTotal){
  //console.log(serviceArray);
  for(let i =0;i<serviceArray.length;i++){
    serviceArray[i].setTotalNumberRequestsPercentage(serviceArray[i].totalNumberRequests/(totalNumberRequests/serviceArray.length));
    serviceArray[i].setAverageTimePercentage(serviceArray[i].averageResponseTime/averageTimeTotal);

    //edgeArray[i].setTotalNumberRequestsPercentage(edgeArray[i].numberTotalRequests/(totalNumberRequests/edgeArray.length));
    //edgeArray[i].setAverageTimePercentage(edgeArray[i].averageTime/averageTimeTotal);

  }
  return serviceArray;
}

function edge_initHttpInfoPercentages (edgeArray, totalNumberRequests, averageTimeTotal) {
  //console.log(edgeArray);
  for(let i=0;i<edgeArray.length;i++){
    //edgeArray[i].averageTime;
    //edgeArray[i].numberTotalRequests;
    edgeArray[i].setTotalNumberRequestsPercentage(edgeArray[i].numberTotalRequests/(totalNumberRequests/edgeArray.length));
    edgeArray[i].setAverageTimePercentage(edgeArray[i].averageTime/averageTimeTotal);
  }
  return edgeArray;
}


function service_initHttpInfo(serviceArray,edgeArray)
{
  //console.log(serviceArray);
  //console.log(edgeArray);
  for(let i = 0;i<serviceArray.length;i++){
    let service = serviceArray[i];
    let serviceTotalTime  = 0;
    let serviceNumberTotalRequests = 0;

    for(let j=0;j<edgeArray.length;j++){
      if((service.name === edgeArray[j].from.name) || (service.name === edgeArray[j].to.name)){
        //edge leaves or enter the service
        serviceTotalTime += edgeArray[j].totalTime;
        serviceNumberTotalRequests += edgeArray[j].numberTotalRequests;
      }

    }

    service.setTotalRequestTime(serviceTotalTime);
    service.setTotalNumberRequests(serviceNumberTotalRequests);
    service.setAverageResponseTime(serviceTotalTime/serviceNumberTotalRequests);


  }
  return serviceArray;
}

function edge_initHttpInfo(serviceArray,edgeArray)
{
  // for each edge
  //    update total number of edges leaving or hitting the service
  //    update total average time
  // In the end, finish updating final parameters

  //console.log(edgeArray);
  let totalNumberRequests = 0;
  let totalEdgesTime = 0;
  let totalAverageTime = 0;
  for(let i = 0;i<edgeArray.length;i++){
    let totalTime = 0;
    let numberRequests=0;
    let edgeIterate = edgeArray[i];
    for(let j=0;j<edgeIterate.httpInfo.length;j++){
      let httpInfoCode = edgeIterate.httpInfo[j];
      numberRequests+= httpInfoCode.numberRequests;
      totalTime +=  httpInfoCode.numberRequests * httpInfoCode.meanTime;
    }
    edgeIterate.setAverageTime(totalTime/numberRequests);
    totalEdgesTime+= totalTime;

    edgeIterate.setNumberTotalRequests(numberRequests);
    totalNumberRequests+= numberRequests;

    edgeIterate.setTotalTime(totalTime);

    totalAverageTime = totalEdgesTime/totalNumberRequests;
  }
  let returnArray = new Array();
  returnArray.push(edgeArray);
  returnArray.push(totalNumberRequests);
  returnArray.push(totalAverageTime);
  //console.log(edgeArray);
  return returnArray;
  //return edgeArray;
}

// from a json file, initialize service array
function populateServicesJsonInstannces2(node,serviceArrayPopulateJson)
{

  let instancesArray = new Array();


  //let auxService = new Service(node.name,node.x,node.y,instancesArray);
  let auxService = new Service(node.name,node.serviceName);
  //console.log(auxService);
  serviceArrayPopulateJson.push(auxService);
  return serviceArrayPopulateJson;
}

function populateServicesJsonInstances3(node,serviceArrayPopulateJson)
{

  let instancesArray = new Array();


  //let auxService = new Service(node.name,node.x,node.y,instancesArray);
  const auxService = new Service(node.name,node.serviceName);
  //console.log(auxService);
  serviceArrayPopulateJson.push(auxService);
  return serviceArrayPopulateJson;
}







function populateServicesJsonInstannces(node)
{
  var instancesNode = node.instances;
  var numberInstances = instancesNode.length;
  var instancesArray = new Array();
  for(var i =0;i<numberInstances;i++){
    var iInstance = new Service(instancesNode[i].id,instancesNode[i].id);
    instancesArray.push(iInstance);
  }
  var auxService = new Service(node.name,node.x,node.y,instancesArray);
  serviceArray.push(auxService);
}



function populateServicesJson(node)
{
  var auxService = new Service(node.name,node.x,node.y);
  serviceArray.push(auxService);
}


function populateEdgesJson2(link,EdgeArrayDate,serviceArrayDates)
{
  //console.log("; source:"+link.source+"target:"+link.target);
  var from = findService(link.source,serviceArrayDates);
  var to = findService(link.target,serviceArrayDates);
  //console.log("from:"+from+"\nTo:"+to);
  if(from != "Not found" && to  != "Not found"){
    var auxEdge = new Edge(from,to,link.count);
    EdgeArrayDate.push(auxEdge);
  }
  return EdgeArrayDate;
}



function populateEdgesJson(link)
{
  //console.log("; source:"+link.source+"target:"+link.target);
  var from = findService(link.source);
  var to = findService(link.target);
  //console.log("from:"+from+"\nTo:"+to);
  if(from != "Not found" && to  != "Not found"){
    var auxEdge = new Edge(from,to,link.count);
    EdgeArray.push(auxEdge);
  }
}


function populateEdge(numberEdges)
{

/*  edge1 = new Edge(serviceArray[0],serviceArray[1],getRndInteger(0,100));
  EdgeArray.push(edge1);
*/

  var i;
  for(i=0;i<numberEdges;){
    //console.log("loop1");
    var rand1= getRndInteger(0,numberServices);
    var rand2= getRndInteger(0,numberServices);

    service1 = serviceArray[rand1];
    service2 = serviceArray[rand2];
    if(service1 !=  service2){
      //console.log("loop");
      i+=1;
      edge = new Edge(service1,service2,getRndInteger(0,100));
      EdgeArray.push(edge);
    }
  }

}

function populateEdge2Services()
{
    service0 = serviceArray[0];
    service1 = serviceArray[1];
    edge = new Edge(service0,service1,getRndInteger(0,100));
    EdgeArray.push(edge);

}




function populateServices(numberServices) {

  var i;
  for (i = 0; i < numberServices; i++) {
    var x = getRndInteger(2,500);
    var y = getRndInteger(2,500);
    var name = "Service"+i;
    service = new Service(name,x,y);
    serviceArray.push(service);
  }
  console.log(serviceArray.length);
}


function populate2Sevices()
{
  service1 = new Service("service0",100,300);
  service2 = new Service("service1",300,300);
  serviceArray.push(service1);
  serviceArray.push(service2);
  console.log(serviceArray.length);

}
