
// need to return svg2 from setXY
function manageNewSimulation(svg2,zoomOnInstances){
        typeSim = 1;
      console.log("------- New simulation------");

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

        let services = new Array();
        for(let i =0;i<newNodes.length;i++){
          services = populateServicesJsonInstannces2(newNodes[i],services);
        }
        //console.log(services);
        let edgeArray = new Array();

        for(let j=0;j<newLinks.length;j++){
          edgeArray = populateEdgesJson2(newLinks[j],edgeArray,services);
        }

        // init http data parameters
      // init edges
        let edgeArrayWithHttpInfo =  serielizeInflux(newResponseInfluxParsed,services,edgeArray);
        let arrayReturn = edge_initHttpInfo(services,edgeArrayWithHttpInfo);
      edgeArrayWithHttpInfo = arrayReturn[0];
      let totalNumberRequests = arrayReturn[1];
      let totalAverageTime = arrayReturn[2];
      //console.log(totalAverageTime);
      //console.log(totalNumberRequests);
      //console.log(edgeArrayWithHttpInfo);

      services = service_initHttpInfo(services,edgeArrayWithHttpInfo);
      services = service_initHttpInfoPercentages(services, edgeArrayWithHttpInfo,totalNumberRequests, totalAverageTime);

      edgeArrayWithHttpInfo = edge_initHttpInfoPercentages(edgeArrayWithHttpInfo,totalNumberRequests,totalAverageTime);

      console.log(services);
      console.log(edgeArrayWithHttpInfo);

    let nodesString = JSON.stringify(services);
    let linkArray = edgeToLinkInflux(edgeArrayWithHttpInfo);
    let linksString = JSON.stringify(linkArray);

    let nodesJson = JSON.parse(nodesString);
    let linksJson = JSON.parse(linksString);


    //console.log(nodesJson);
    //console.log(linksJson);

    //init services

    //console.log(newNodes);
    //exitSim = 1;
    document.getElementById("lineCont").setAttribute("lastDate",dateToIterate);
    //svg2 = setXYPositionD3_2(1,"compare",newNodes,newLinks,svgGlobal,viewBoxFixSize,viewBoxFixSize,raius,forceCollide,100,0,0,"#0080ff",0,services);             // without Tarjan

    svg2 = setXYPositionD3_2(1,"normal",nodesJson,linksJson,svgGlobal,viewBoxFixSize,viewBoxFixSizeHeight,(3/4)*raius,forceCollide,100,0,0,"#0080ff",0,services,zoomOnInstances,edgeArrayWithHttpInfo);             // without Tarjan



}
