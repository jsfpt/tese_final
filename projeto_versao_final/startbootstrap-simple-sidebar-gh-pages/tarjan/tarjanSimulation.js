
function tarjanGraph(list_services,list_edges,svg,servicesTarjan,totalNumberRequests,totalAverageTime,zoom){  // return component arrays and their links

    var serviceArrayTarjanGraph = list_services;
    var EdgeArrayTarjanGraph = list_edges;
    var neighborsArray = [];
    var arraySetOfServices = new Array();
    var arrayEdgesSets = new Array();
    var nodesComponets= new Array();
    var linkComponets= new Array();

    console.log("--------------------tarjan graph---------------");

    // Apply tarjan algorithm


    //console.log(serviceArrayTarjanGraph);




    tarjan(serviceArrayTarjanGraph,EdgeArrayTarjanGraph,neighborsArray,arraySetOfServices,arrayEdgesSets,nodesComponets,linkComponets); //arraySetOfServices
    //console.log(arraySetOfServices);
    //console.log(neighborsArray);


    // add the services that dont have any edge starting on him
    addLeftElementsToScc(arraySetOfServices);

    //console.log(arraySetOfServices);
    //console.log(neighborsArray);

    //return;
    //console.log(arrayEdgesSets);
    arrayEdgesSets = edgesFromSetOfServices(arraySetOfServices,neighborsArray,arrayEdgesSets);  //   return arrayEdgesSets
    //console.log(arrayEdgesSets);


    //console.log(arraySetOfServices);
    //console.log(arrayEdgesSets);

    arraySetOfServices = addHttpInfoSetServices(arraySetOfServices,totalNumberRequests,totalAverageTime);
    arrayEdgesSets = addHttpInfoEdgeSet(arrayEdgesSets,totalNumberRequests,totalAverageTime);

    console.log(arraySetOfServices);
    console.log(arrayEdgesSets);

    linkComponets = edgePojoObjects(arrayEdgesSets,linkComponets);  // nodesComponets
    nodesComponets = nodePojoObjects(arraySetOfServices,nodesComponets);  // linkComponets

    //console.log(nodesComponets);
    //console.log(linkComponets);


    nodesComponetsJson = JSON.parse(JSON.stringify(nodesComponets));
    linksComponetsJson = JSON.parse(JSON.stringify(linkComponets));



    //console.log(nodesComponetsJson);
    //console.log(linksComponetsJson);

    svg2 = setXYPositionD3_2(1,"normal",nodesComponetsJson,linksComponetsJson,svgGlobal,viewBoxFixSize,viewBoxFixSizeHeight,raius,forceCollide,100,0,0,"#0080ff",0,nodesComponets,zoom,arrayEdgesSets);             // without Tarjan


}

//--------------------------- Build the array linking one service to all of his neighbors-----------------------------


function pathFromNode(serviceArray,EdgeArray,neighborsArray)  //Return neighborsArray
{

    var arrayLength = EdgeArray.length;
    //console.log("tamanho EdgeArray:"+arrayLength);
    for(var i=0;i<arrayLength;i++){
        //console.log(EdgeArray[i].from);
        var from = findInNeighbours(EdgeArray[i].from.name,neighborsArray);
        //var to = findInNeighbours(EdgeArray[i].to.name),neighborsArray;
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
//--------------------------- TARJAN-----------------------------




function tarjan(serviceArrayTarjan,EdgeArray,neighborsArray,arraySetOfServices,arrayEdgesSets,nodesComponets,linkComponets)  // init arraySetOfServices
{

    //console.log(serviceArrayTarjan);
    //console.log(EdgeArray);
    let serviceArrayTarjanVisitedLow = setVisited(serviceArrayTarjan);

    //console.log(serviceArrayTarjanVisitedLow);
    //console.log(EdgeArray);



    // construct the array that links a service to all of his neighbors
    neighborsArray = pathFromNode(serviceArrayTarjan,EdgeArray,neighborsArray);  //init neighborsArray
    currentNeighboursArray = neighborsArray;
    /*console.log(serviceArray);
    console.log(EdgeArray);
    console.log(neighborsArray);
    console.log(arraySetOfServices);
    console.log(arrayEdgesSets);
    */


    var V = serviceArrayTarjan.length;
    var preCount = 0;
    var low = new Array();
    var visited = new Array();
    var sccComp = new Array();
    var stack = [];
    var neighborsLenght = neighborsArray.length;

    for(let i =0;i<neighborsLenght;i++){
        if(neighborsArray[i].serviceFrom.visited == false){
            dfs(neighborsArray[i],neighborsArray,arraySetOfServices);
        }
    }

    //console.log(arraySetOfServices);
    //onsole.log(arrayEdgesSets);

    function dfs(nodeNeighbour,neighborsArray,arraySetOfServices){
        //console.log(stack);
        //console.log("dfs");
        let node = nodeNeighbour.serviceFrom;
        preCount++;
        node.low = preCount;
        node.visited = true;
        stack.push(node);
        //console.log(node);
        //console.log(stack);

        var min = node.low;
        let arrayLength = nodeNeighbour.services.length;
        //console.log("Node:" + nodeNeighbour.serviceFrom.name+"   visited:"+nodeNeighbour.serviceFrom.visited);
        for(let i =0;i<arrayLength;i++) // iterar sobre os nodes que se ligam aao no v
        {
            let nodeToNeigh = nodeNeighbour.services[i];
            //console.log("\t"+nodeToNeigh.name+";"+nodeToNeigh.visited);
            let index = findInNeighbours(nodeToNeigh.name,neighborsArray);

            if(index != -1){
                var nodeTo = neighborsArray[index].serviceFrom;

                if(nodeTo.visited == false){
                    //console.log("recursão");
                    dfs(neighborsArray[index],neighborsArray);
                }
                if(nodeTo.low < min){
                    min = nodeTo.low;
                }
            }
        }
        //console.log("-----No more neighbors\n\tStack:"+stack);

        if(min < node.low){
            node.low = min;
            return;
        }

        var component = new Array();
        var nodePop = new Service();
        do{
            //console.log("Removing from stack");
            nodePop = stack.pop();
            component.push(nodePop);
            neighborsArray[findInNeighbours(nodePop.name,neighborsArray)].serviceFrom.low = V;

        }while(nodePop != node)
        //console.log(neighborsArray);
        //console.log(stack);

        sccComp.push(component);
        //console.log(component);
        //console.log("FIND SCC");
    }
    //console.log(sccComp);
    arraySetOfServices = construcSetOfServices(sccComp,arraySetOfServices);
    //console.log(arraySetOfServices);
}


function construcSetOfServices(sccComp,arraySetOfServices)
{
    let count = 1;
    let arrayLength =  sccComp.length;
    for(let i=0;i<arrayLength;i++){
        let serviceArrayComponet = new Array();
        for(j=0;j<sccComp[i].length;j++){
            serviceArrayComponet.push(sccComp[i][j]);
        }
        let string = "component"+ count;
        count++;
        let neigh = new neighbors(string,serviceArrayComponet);
        arraySetOfServices.push(neigh);
    }
    return arraySetOfServices;

}


function findInNeighbours(name,neighborsArray){
    //console.log(name);
    try{
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
    }catch (e) {
        return -1;

    }

}

function addLeftElementsToScc(arraySetOfServices)
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
            arraySetOfServices = addNotFoundServiceToSet(service,arraySetOfServices);
        }
        found = 0;
    }

    function addNotFoundServiceToSet(service,arraySetOfServices){ // return arraySetOfServices
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


function edgesFromSetOfServices(arraySetOfServices,neighborsArray,arrayEdgesSets){


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
            let nodeNeighbour = getNodeInNeighbors(node,neighborsArray); // node with the neighbors
            //console.log(nodeNeighbour);
            arrayEdgesSets = checkNeighbors(nodeNeighbour,set,arrayEdgesSets);
        }

    }
    return arrayEdgesSets;


    function getNodeInNeighbors(node,neighborsArray)
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

    function checkNeighbors(node,set,arrayEdgesSets)
    {
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
            let component = findComponentFromService(nodeNeighbour,set);
            /*console.log("Node:");
            console.log(node);
            console.log("neighbor:");
            console.log(nodeNeighbour);*/
            if(set != component && component != null)
            {
                let edgeComponetAux = new EdgeComponet(set,component,0); // Unidirecional, caso se pretenda meter bidirecional colocar ao contrário
                let checkAlreadyInArray = checkEdgeSetInArray(edgeComponetAux,arrayEdgesSets);
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

    function checkEdgeSetInArray(edgeSet,arrayEdgesSets){
        //console.log("Array edge Sets");
        //console.log(arrayEdgesSets);
        var length = arrayEdgesSets.length;
        for(var i=0;i<length;i++){
            //console.log(arrayEdgesSets[i]);
            if((arrayEdgesSets[i].from.serviceFrom == edgeSet.from.serviceFrom) && (arrayEdgesSets[i].to.serviceFrom == edgeSet.to.serviceFrom)){
                return true;

            }
        }
        return false;

    }

    function findComponentFromService(node,set)
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


//getIncidencePoint(EdgeArray[0].from, EdgeArray[0].to);
function setVisited(serviceArraySetVisited)
{
    let length = serviceArraySetVisited.length;
    //console.log(length);
    for(let i=0;i<length;i++){

        serviceArraySetVisited[i].low = 0;
        serviceArraySetVisited[i].visited = false;


        serviceArraySetVisited[i].setVisitedParam(false);
        //serviceArraySetVisited[i].setDrawText(false);
        serviceArraySetVisited[i].setLow(0);

        //console.log(serviceArraySetVisited[i]);

    }
    return serviceArraySetVisited;

}


