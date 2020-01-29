

function graphCompare(testParam){
  // // TODO:
  // Adicionar a funcao do TARJAN
  // tratar dos arrays necessarios para o TARJAN
  // funcao que chama a funcao de setXY dependendo dos arrays, para escolher o que desenhar, se o grafo compacto ou com TARJAN
  // as funcoes do tarjan usam os arrays basicos e definidos em cima
  // antes de fazer uma simulação, limpar os arrays todos

  console.log("----------graph Compare-------");

  d3Sim = -1;
  //if(exitSim == 1){
    exitSim = 0;

    typeFeature = 1;

    // clean svg
    deleteNodesAndLinks();

    //getDates
    let date1 = dateToIterate;
    let date2 = parseInt(document.getElementById("lineCont").getAttribute("lastDate"));
    console.log(date1,date2);
    document.getElementById("lineCont").setAttribute("lastDate",dateToIterate);


    //order dates
    if(date2 < date1)
    {
      let aux = date1;
      date1 = date2; // index of array dates
      date2 = aux;

    }

    // init arrays
    let services_edges_array_difference = init_Arrays_Diference(date1,date2);   //init serviceArrayDate1 and serviceArrayDate2
    //   serviceArrayDate1 = 0
    //   EdgeArrayDate1 = 1;
    //   serviceArrayDate2 = 2;
    //   EdgeArrayDate2 = 3;

    let serviceArrayDate1,serviceArrayDate2,EdgeArrayDate1,EdgeArrayDate2;
    serviceArrayDate1 = services_edges_array_difference[0];
    serviceArrayDate2 = services_edges_array_difference[2];
    EdgeArrayDate1 = services_edges_array_difference[1];
    EdgeArrayDate2 = services_edges_array_difference[3];

    // calcule graph diference
    console.log("dates:");
    console.log(date1);
    console.log(date2);
    let arraysCompare = calculateGraphCompare(serviceArrayDate1,serviceArrayDate2,EdgeArrayDate1,EdgeArrayDate2);
    let nodesArrayCompare = arraysCompare[0];           // array of services with a color that represents the appearance of that service
    let edgesArrayCompare = arraysCompare[1];           // array of edges
    //console.log(nodesArrayCompare);
    //console.log(edgesArrayCompare);


    //var nodesJson = JSON.stringify(nodesArrayCompare);

    let nodesString = JSON.stringify(nodesArrayCompare);
    let linkArray = edgeToLink(edgesArrayCompare);
    //var linksJson = JSON.stringify(linkArray);
    let linksString = JSON.stringify(linkArray);

    let nodesJson = JSON.parse(nodesString);
    let linksJson = JSON.parse(linksString);

    console.log(nodesJson);
    console.log(linksJson);
    //tarjanGraph(nodesArrayCompare,edgesArrayCompare);
    svg2 = setXYPositionD3_2(1,"compare",nodesJson,linksJson,svgGlobal,viewBoxFixSize,viewBoxFixSize,raius,forceCollide,100,0,0,"#ff8080",0,nodesArrayCompare,1,edgesArrayCompare);             // without Tarjan


}





function init_Arrays_Diference(date1,date2)
{
  let arrayReturn = new Array();
  console.log(typeof  date1);
  console.log(date1);
  console.log(typeof date2);
  console.log(date2);
  let serviceArrayDate1 = new Array();
  let EdgeArrayDate1 = new Array();


  let serviceArrayDate2 = new Array();
  let EdgeArrayDate2 = new Array();

  //date1

  let dates1NotParsed = getGraphByDate(date1);
  //console.log(dates1NotParsed);
  let dates1Parsed = JSON.parse(dates1NotParsed);
  //console.log(dates1Parsed);
  let date1Nodes = dates1Parsed.nodes;
  let date1Links = dates1Parsed.links;

  console.log("size:\n\tnodes:"+date1Nodes.length+"\n\tLinks:"+date1Links.length);
  for(let i =0;i<date1Nodes.length;i++){
    serviceArrayDate1 = populateServicesJsonInstannces2(date1Nodes[i],serviceArrayDate1);
  }

  for(var j=0;j<date1Links.length;j++){
    EdgeArrayDate1 = populateEdgesJson2(date1Links[j],EdgeArrayDate1,serviceArrayDate1);
  }




  // date2
  var dates2NotParsed = getGraphByDate(date2);
  //console.log(dates2NotParsed);
  var dates2Parsed = JSON.parse(dates2NotParsed);
  //console.log(dates2Parsed);
  var date2Nodes = dates2Parsed.nodes;
  var date2Links = dates2Parsed.links;

    console.log("size:\n\tnodes:"+date2Nodes.length+"\n\tLinks:"+date2Links.length);
  for(var i2 =0;i2<date2Nodes.length;i2++){
    populateServicesJsonInstannces2(date2Nodes[i2],serviceArrayDate2);
  }

  for(var j2=0;j2<date2Links.length;j2++){
    EdgeArrayDate2 =  populateEdgesJson2(date2Links[j2],EdgeArrayDate2,serviceArrayDate2);
  }
  arrayReturn.push(serviceArrayDate1);
  arrayReturn.push(EdgeArrayDate1);
  arrayReturn.push(serviceArrayDate2);
  arrayReturn.push(EdgeArrayDate2);
  return arrayReturn;
}


function calculateGraphCompare(serviceArrayDate1,serviceArrayDate2,EdgeArrayDate1,EdgeArrayDate2){
  var arrayReturn = new Array();
  var finalServiceArray = new Array();
  var finalEdgeArray = new Array();
  console.log("date1, size:"+serviceArrayDate1.length);
  //console.log(serviceArrayDate1);

  console.log("date2, size:"+serviceArrayDate2.length);
  //console.log(serviceArrayDate2);


  for(var i=0;i<serviceArrayDate1.length;i++){
    var foundNode1 = findNodeInAArrray(serviceArrayDate1[i],serviceArrayDate2);
    if(foundNode1 == false){
      console.log("false1");
      serviceArrayDate1[i].color("red");
      // service disapear, mark as red
      console.log(serviceArrayDate1[i]);

    }
    else {
      serviceArrayDate1[i].color("none");

    }
    finalServiceArray.push(serviceArrayDate1[i]);


    // add to final array, to draw
  }


  // add only if Something appear from last iteration

   for(var j=0;j<EdgeArrayDate1.length;j++){
     var foundEdge1 = findEdgeInAArray(EdgeArrayDate1[j],EdgeArrayDate2);
     //console.log(foundNode1);
     if(foundEdge1 == false){
       //console.log("false2");
       // edge disappear,mark as red
       EdgeArrayDate1[j].color("red")
       //console.log(EdgeArrayDate1[j]);

     }
     else{
       EdgeArrayDate1[j].color("none")
     }
     finalEdgeArray.push(EdgeArrayDate1[j]);


     // add to final array
   }

   for(var i2=0;i2<serviceArrayDate2.length;i2++){
     var foundNode2 = findNodeInAArrray(serviceArrayDate2[i2],serviceArrayDate1);
     console.log(foundNode2);
     if(foundNode2 == false){
       //console.log("false3");
       // service appear, mark as green
       serviceArrayDate2[i2].color("green");
       // service disapear, mark as red
      // console.log(serviceArrayDate1[i2]);

       // add to final array
       finalServiceArray.push(serviceArrayDate2[i2]);
     }
     else {
       //serviceArrayDate2[i2].color("none");

       // add to final array
       //finalServiceArray.push(serviceArrayDate2[i2]);

     }

   }
    for(var j2=0;j2<EdgeArrayDate2.length;j2++){
      var foundEdge2 = findEdgeInAArray(EdgeArrayDate2[j2],EdgeArrayDate1);
      console.log(foundNode2);
      if(foundEdge2 == false){
        //console.log("false4");
        // edge appear,mark as green
        EdgeArrayDate2[j2].color("green")
        //console.log(EdgeArrayDate2[j2]);

        // add to final array

        finalEdgeArray.push(EdgeArrayDate2[j2]);
      }
      else {
        //EdgeArrayDate2[j2].color("none")
        //console.log(EdgeArrayDate2[j2]);

        // add to final array
        //finalEdgeArray.push(EdgeArrayDate2[j2]);

      }
    }
    arrayReturn.push(finalServiceArray);
    arrayReturn.push(finalEdgeArray);

    return arrayReturn;
}
