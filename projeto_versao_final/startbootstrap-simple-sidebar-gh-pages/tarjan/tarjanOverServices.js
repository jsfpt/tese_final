function tarjanServiceSim(zoom){
    // get service and edges
    console.log(zoom);

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


    servicesGroup(servicesWithInfo,edgeArrayWithHttpInfo,svg,servicesTarjan,totalNumberRequests,totalAverageTime,zoom);

}



function servicesGroup(list_services,list_edges,svg2,servicesTarjan,totalNumberRequests,totalAverageTime,zoom){  // return component arrays and their links

    // group by services

    var serviceArrayGraph = list_services;
    var EdgeArrayGraph = list_edges;
    var neighborsArray = [];
    var arraySetOfServices = new Array();
    var arrayEdgesSets = new Array();
    var nodesComponets= new Array();
    var linkComponets= new Array();


    // Apply tarjan algorithm


    //console.log(serviceArrayTarjanGraph);

    neighborsArray = pathFromNodeServices2(serviceArrayGraph,EdgeArrayGraph,neighborsArray);  //init neighborsArray


    //tarjan(serviceArrayTarjanGraph,EdgeArrayTarjanGraph,neighborsArray,arraySetOfServices,arrayEdgesSets,nodesComponets,linkComponets); //arraySetOfServices
    arraySetOfServices = groupByService3(serviceArrayGraph,EdgeArrayGraph,neighborsArray,arraySetOfServices,arrayEdgesSets,nodesComponets,linkComponets); //arraySetOfServices




    // add the services that dont have any edge starting on him

    //return;
    addLeftElementsToSccServices2(arraySetOfServices);

    //console.log(arraySetOfServices);
    //console.log(neighborsArray);
    arrayEdgesSets = new Array();

    arrayEdgesSets = edgesFromSetOfServices3(arraySetOfServices,neighborsArray,arrayEdgesSets);  //   return arrayEdgesSets
    //console.log(arrayEdgesSets);


    //console.log(arraySetOfServices);
    //console.log(arrayEdgesSets);


    arraySetOfServices = addHttpInfoSetServices(arraySetOfServices,totalNumberRequests,totalAverageTime);
    arrayEdgesSets = addHttpInfoEdgeSet(arrayEdgesSets,totalNumberRequests,totalAverageTime);

    //console.log(arraySetOfServices);
    //console.log(arrayEdgesSets);

    let newServiceArray = setServicesToServices(arraySetOfServices);
    let newEdgeArray = edgeSetToEdge(arrayEdgesSets,newServiceArray,totalNumberRequests,totalAverageTime);

    //console.log(servicesTarjan);
    //console.log(newServiceArray);
    //console.log(newEdgeArray);

    tarjanGraph(newServiceArray,newEdgeArray,svg,newServiceArray,totalNumberRequests,totalAverageTime,zoom);
    updateTitleGraph(5);

}

function setServicesToServices(arraySetOfServices) {
    let newServiceArray = new Array();
    console.log(arraySetOfServices);
    for(let i=0;i<arraySetOfServices.length;i++){
        let setService = arraySetOfServices[i];
        let newService = new Service(setService.serviceFrom,setService.serviceFrom);
        newService.setInstances(setService.services);
        newService.setTotalNumberRequests(setService.totalNumberRequests);
        newService.setAverageResponseTime(setService.averageResponseTime);
        newService.setTotalRequestTime(setService.totalRequestTime);
        newService.setTotalNumberRequestsPercentage(setService.totalNumberRequestsPercentage);
        newService.setAverageTimePercentage(setService.AverageTimePercentage);
        newService.setVisitedParam(false);
        newService.setLow(0);
        newServiceArray.push(newService);

    }
    return newServiceArray;

}


function  edgeSetToEdge(arrayEdgesSets,newServiceArray,totalNumberRequests,totalAverageTime) {
    //console.log(arrayEdgesSets);
    let newEdgeArray = new Array();
    for(let i=0;i<arrayEdgesSets.length;i++){
        let from = arrayEdgesSets[i].from;
        //console.log(from);
        let serviceFrom = findInServiceArray(from.serviceFrom,newServiceArray);
        let to = arrayEdgesSets[i].to;
        let serviceTo = findInServiceArray(to.serviceFrom,newServiceArray);
        //console.log(serviceFrom);
        //console.log(serviceTo);
        let newEdge = new Edge(serviceFrom,serviceTo,0);

        let totalNumberRequestsEdge = from.totalNumberRequests + to.totalNumberRequests;
        let totalRequestTime = from.totalRequestTime + to.totalRequestTime;
        let averageTime = totalRequestTime/totalNumberRequestsEdge;
        let totalNumberRequestsPercentage = totalNumberRequestsEdge / totalNumberRequests;
        let averageTimePercentage = averageTime / totalAverageTime;

        newEdge.setTotalNumberRequests(totalNumberRequestsEdge);
        newEdge.setAverageResponseTime(averageTime);
        newEdge.setTotalRequestTime(totalRequestTime);
        newEdge.setTotalNumberRequestsPercentage(totalNumberRequestsPercentage);
        newEdge.setAverageTimePercentage(averageTimePercentage);
        newEdgeArray.push(newEdge);

    }
    return newEdgeArray;
}

function findInServiceArray(serviceName,newServiceArray) {
    //console.log(serviceName);
    //console.log(newServiceArray);
    for(let i=0;i<newServiceArray.length;i++){
        if(serviceName === newServiceArray[i].name){
            return newServiceArray[i];
        }
    }
}

function  groupByService3(serviceArrayGraph,EdgeArrayTarjanGraph,neighborsArray,arraySetOfServices,arrayEdgesSets,nodesComponets,linkComponets)      // return arraySetOfServices
{
    let arraySetOfServicesGroupByServices = new Array();
    //console.log(serviceArrayGraph);
    for(let i = 0;i<serviceArrayGraph.length;i++){
        let service = serviceArrayGraph[i];
        if(serviceArrayGraph[i].serviceName != undefined){

            if(i ===0){
                // create new set of services
                let array = new Array();
                array.push(serviceArrayGraph[i]);
                let neighbour = new neighbors(serviceArrayGraph[i].serviceName,array);
                arraySetOfServicesGroupByServices.push(neighbour);
            }else{
                let index = findInArraySetOfServices(serviceArrayGraph[i].serviceName,arraySetOfServicesGroupByServices);
                // check if neighbour with this service Name is already in the final array
                // if yes:
                // add service to the service array
                // if not
                // create neighbour and add service

                if(index != -1){

                    // already exist the set of services
                    arraySetOfServicesGroupByServices[index].services.push(serviceArrayGraph[i]);
                }
                else{
                    // create new set of services
                    let array = new Array();
                    array.push(serviceArrayGraph[i]);
                    let neighbour = new neighbors(serviceArrayGraph[i].serviceName,array);
                    arraySetOfServicesGroupByServices.push(neighbour);
                }
            }

        }

    }
    //console.log(arraySetOfServicesGroupByServices);
    return arraySetOfServicesGroupByServices;
}


function findInArraySetOfServices(serviceNameToFind,arraySetOfServicesFind) {
    //console.log(arraySetOfServicesFind);
    for(let i=0;i<arraySetOfServicesFind.length;i++){
        //console.log(arraySetOfServicesFind[i].serviceFrom);
        //console.log(serviceNameToFind)
        if(arraySetOfServicesFind[i].serviceFrom === serviceNameToFind){
            //console.log("find");
            return i;
        }
    }
    return -1;

}

function findInNeighboursServices(name,neighborsArray){
    //console.log(name);
    let arrayLength = neighborsArray.length;
    if(arrayLength > 0){
        for(let i=0;i<arrayLength;i++){
            if(neighborsArray[i].serviceFrom.name == name){
                return i;
            }
        }
    }
    else{
        return -1;
    }

    return -1;
}

function addLeftElementsToSccServices2(arraySetOfServices)
{
    //console.log(arraySetOfServices);
    //console.log(neighborsArray);
    let length = serviceArray.length;
    //console.log("number of sets:"+arraySetOfServices.length);
    for(let i =0;i<length;i++){
        let service = serviceArray[i];
        //console.log("\n\n-----------------SERVICE TO FOUND:"+service.name);
        //console.log(service);
        let setLenght = arraySetOfServices.length;
        //console.log(componentLenght);
        let found = 0;
        for(let j=0;j<setLenght;j++){
            //console.log("\n--------------->NEW Set");
            //console.log(arraySetOfServices[j]);

            let servicesFromSetLenght = arraySetOfServices[j].services.length;
            for(let k=0;k<servicesFromSetLenght;k++){
                //console.log(arraySetOfServices[i].services[k]);
                //console.log("Service name:"+ service.name+"\nservice to compare:"+ arraySetOfServices[j].services[k].name);
                if(arraySetOfServices[j].services[k].name == service.name){
                    found = 1;
                }
            }
        }
        if(found ==0){
            //console.log("NOT FOUND:"+service.name);
            arraySetOfServices = addNotFoundServiceToSetServices(service,arraySetOfServices);
        }
        found = 0;
    }

    function addNotFoundServiceToSetServices(service,arraySetOfServices){ // return arraySetOfServices
        let arrayService = new Array();
        arrayService.push(service);
        let numberOfSets = arraySetOfServices.length;
        numberOfSets+=1;
        let componetName = "component"+numberOfSets;
        let newSet = new neighbors(componetName,arrayService);
        arraySetOfServices.push(newSet);
        return arraySetOfServices;
    }

}

function edgesFromSetOfServices3(arraySetOfServices,neighborsArray,arrayEdgesSets2)
{

    let length = arraySetOfServices.length;
    //console.log(length);
    for(let i=0;i<length;i++){
        let  set = arraySetOfServices[i];
        //console.log("\n\n------------------")
        //console.log(set);
        //console.log(set.services.length);
        for(let j=0;j<set.services.length;j++)
        {
            let node = set.services[j];
            //console.log(node)
            //console.log(neighborsArray);
            let nodeNeighbour = getNodeInNeighborsService(node,neighborsArray); // node with the neighbors
            if(nodeNeighbour != null){
                //console.log(nodeNeighbour);
                //console.log(arrayEdgesSets2);
                arrayEdgesSets2 = checkNeighborsServices(nodeNeighbour,set,arrayEdgesSets2);
            }

        }

    }

    return arrayEdgesSets2;


    function getNodeInNeighborsService(node,neighborsArray)
    {
        let length = neighborsArray.length;
        for(let i=0;i<length;i++){
            if(neighborsArray[i].serviceFrom.name === node.name){
                //console.log("encontrou");
                return neighborsArray[i];
            }
        }

        return null;
    }

    function checkNeighborsServices(node,set,arrayEdgesSets)
    {
        //console.log(arrayEdgesSets);
        try{
            let lengthNodeNeigh = node.services.length;
        }catch(e){
            return;
        }

        let lengthNodeNeigh = node.services.length;
        for(let i=0;i<lengthNodeNeigh;i++)
        {
            let nodeNeighbour = node.services[i];
            //console.log(nodeNeighbour);
            let component = findComponentFromService2(nodeNeighbour,set);
            /*console.log("Node:");
            console.log(node);
            console.log("neighbor:");
            console.log(nodeNeighbour);*/
            if(set != component && component != null)
            {
                let edgeComponetAux = new EdgeComponet(set,component,0); // Unidirecional, caso se pretenda meter bidirecional colocar ao contrário
                let checkAlreadyInArray = checkEdgeSetInArrayService(edgeComponetAux,arrayEdgesSets);
                if(checkAlreadyInArray == false){
                    //not yet in the array
                    //console.log("add edge ");
                    arrayEdgesSets.push(edgeComponetAux);
                }
                //EM sets Diferentes, adionar edges entre sets
            }
            else{  // Sets iguas, ignorar

            }
        }
        //console.log(arrayEdgesSets);
        return arrayEdgesSets;
        //return false;

    }

    function checkEdgeSetInArrayService(edgeSet,arrayEdgesSets){
        //console.log("Array edge Sets");
        //console.log(arrayEdgesSets);
        if(arrayEdgesSets === undefined){
            return false;
        }
        var length = arrayEdgesSets.length;
        for(var i=0;i<length;i++){
            //console.log(arrayEdgesSets[i]);
            if((arrayEdgesSets[i].from.serviceFrom == edgeSet.from.serviceFrom) && (arrayEdgesSets[i].to.serviceFrom == edgeSet.to.serviceFrom)){
                return true;

            }
        }
        return false;

    }

    function findComponentFromService2(node,set)
    {
        //console.log("Erro, o node não é encontrado");
        //console.log(node);
        //console.log("neste Array:");
        //console.log(arraySetOfServices);
        var length = arraySetOfServices.length;
        for(var i=0;i<length;i++){
            var setAux = arraySetOfServices[i];
            //console.log(setAux);
            var lengthSet = setAux.services.length;
            for(var j=0;j<lengthSet;j++){
                if(setAux.services[j].name == node.name){
                    //console.log("found");
                    return setAux;
                }
            }
        }

        return null;

    }

}




function pathFromNodeServices2(serviceArray,EdgeArray,neighborsArray)  //Return neighborsArray
{

    var arrayLength = EdgeArray.length;
    //console.log("tamanho EdgeArray:"+arrayLength);
    for(var i=0;i<arrayLength;i++){
        //console.log(EdgeArray[i].from);
        var from = findInNeighboursServices(EdgeArray[i].from.name,neighborsArray);
        //var to = findInNeighboursServices(EdgeArray[i].to.name),neighborsArray;
        if(from != -1){ // já exsite no array
            //console.log("Já existe");
            neighborsArray[from].services.push(EdgeArray[i].to);
        }
        else{         //adicionar ao array
            var array = new Array();
            array.push(EdgeArray[i].to);
            var neighbor = new neighbors(EdgeArray[i].from,array);
            neighborsArray.push(neighbor);
        }

    }
    return neighborsArray;

}
