
function serielizeInflux(influxDataParsed,serviceArray,edgeArray) {
    //console.log(influxDataParsed);
    //console.log(serviceArray);
    //console.log(edgeArray);
    influxDataParsed = influxDataParsed.edge_influx_list;
    //console.log(influxDataParsed);
    for(let i=0;i<edgeArray.length;i++){
        //console.log("\n\nedge to find:"+edgeArray[i]);
        let httpCodeListForIteratedEdge = findEdge(edgeArray[i].from.name, edgeArray[i].to.name,influxDataParsed);
        edgeArray[i].setHttpInfo(httpCodeListForIteratedEdge.httpCodesList);
        //console.log(edgeArray[i]);
    }
    //edgeArray[0].setHttpInfo("httpInfo");
    return edgeArray;
}

function findEdge(from,target,influxData) {
    for(let i=0 ;i<influxData.length;i++){
        if(influxData[i].from === from && influxData[i].target === target){
            return influxData[i];
        }
    }
}