
function addHttpInfoSetServices(arraySetServices,totalNumberRequests,totalAverageTime) {
    //console.log(arraySetServices);
    //console.log(totalNumberRequests);
    //console.log(totalAverageTime);

    let totalNumberRequest;
    for(let i=0;i<arraySetServices.length;i++){
        let componet = arraySetServices[i];
        let componentTotalrequests = 0;
        let componentTime = 0;
        //console.log(componet);
        let numberServices = componet.services.length;
        for(let j=0;j<numberServices;j++){
            //console.log(componet.services[j]);
            componentTotalrequests+= componet.services[j].totalNumberRequests;
            componentTime += componet.services[j].totalRequestTime;
        }

        let componentAverageTime = componentTime/componentTotalrequests;
        let componentTotalRequestsPercentage = componentTotalrequests / (totalNumberRequests/arraySetServices.length) ;
        let componentAverageTimePercentage = componentAverageTime/totalAverageTime;

        /*console.log(componentTotalrequests);
        console.log(componentTotalRequestsPercentage);
        console.log(componentAverageTime);
        console.log(componentAverageTimePercentage);
        */

        componet.setTotalNumberRequests(componentTotalrequests);
        componet.setAverageResponseTime(componentAverageTime);
        componet.setTotalRequestTime(componentTime);
        componet.setTotalNumberRequestsPercentage(componentTotalRequestsPercentage);
        componet.setAverageTimePercentage(componentAverageTimePercentage);

    }

    return arraySetServices;


}


function  addHttpInfoEdgeSet(arrayEdgeSet,totalNumberRequests,totalAverageTime) {
    //console.log(arrayEdgeSet);
    let averageTotalNumberRequestSet = totalNumberRequests/arrayEdgeSet.length;
    //console.log(averageTotalNumberRequestSet);
    for(let  i= 0;i<arrayEdgeSet.length;i++){
        let from = arrayEdgeSet[i].from;
        let to = arrayEdgeSet[i].to;
        //console.log(from);
        //console.log(to);
        let totalRequests = from.totalNumberRequests + to.totalNumberRequests;
        let totalTime = from.totalRequestTime + to.totalRequestTime;
        let averageTime = totalTime/totalRequests;
        let setTotalRequestsPercentage = totalRequests / averageTotalNumberRequestSet;
        let setAverageTimePercentage = averageTime/totalAverageTime;


        arrayEdgeSet[i].setTotalNumberRequests(totalRequests);
        arrayEdgeSet[i].setAverageResponseTime(averageTime);
        arrayEdgeSet[i].setTotalRequestTime(totalTime);
        arrayEdgeSet[i].setTotalNumberRequestsPercentage(setTotalRequestsPercentage);
        arrayEdgeSet[i].setAverageTimePercentage(setAverageTimePercentage);

    }

    return arrayEdgeSet;
}