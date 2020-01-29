function triggerLinksEvents(domElement,link) {

    console.log(link);
    console.log(currentServiceArray);
    console.log(currentlinksArray);
    console.log(currentNeighboursArray);
    createMainInfoLink(domElement, link);

}

function createMainInfoLink(domElement,link){
    let rightDiv = document.getElementById("right-div")
    let mainInfo = document.createElement("div");
    mainInfo.className = "mainInfo";
    mainInfo.id = link.from + "-" + link.to;
    mainInfo.appendChild(createTitleLinks(link));
    mainInfo.appendChild(createSourceOrTarget(link.from,"Source: "));
    mainInfo.appendChild(createSourceOrTarget(link.to,"Target: "));
    mainInfo = addAllMetricsLinks(link,mainInfo);
    console.log(mainInfo);
    if(typeSim == 1){
        mainInfo = addHttpInfo(link,mainInfo);
        console.log(mainInfo);

    }
    // add all other info;
    rightDiv.insertBefore(mainInfo,rightDiv.firstChild);
    //rightDiv.appendChild(mainInfo);

}

function createTitleLinks(link){
    let titleLink = document.createElement("h6");
    titleLink.className = "title";
    titleLink.textContent = "Link: " +link.from.name + " -  " + link.to.name;
    return titleLink;
}

function createSourceOrTargetOld(option,service)
{
    let serviceInfo = document.createElement("div");
    serviceInfo.className = "serviceInfo";
    if(option === "source"){
        serviceInfo.textContent = " Source: " + service.name;
        let dropDownSourceOrTarget = addDropDownDiv( " Source: " + service.name,serviceInfo);

        let clickedSource = false;
        dropDownSourceOrTarget.onclick = function(){
            if(clickedSource === false){
                clickedSource = true;
                let neighbours = findServiceNeighboursArray(service);
                //console.log(neighbours);
                serviceInfo.appendChild(functionCreateAllInfo(null,service,neighbours.neighbors,1));
            }
            else{
                clickedSource = false;
                while(serviceInfo.children[1]) {
                    serviceInfo.removeChild(serviceInfo.children[1]);
                }
                //serviceInfo.textContent = " Source: " + service.name;


            }

        }
    }
    else if(option == "target"){
        serviceInfo.textContent = " Target:" + service.name;
        let clickedTarget = false;

        serviceInfo.onclick = function(){
            if(clickedTarget === false){
                clickedTarget = true;
                let neighbours = findServiceNeighboursArray(service);
                //console.log(neighbours);
                serviceInfo.appendChild(functionCreateAllInfo(null,service,neighbours.neighbors,1));
            }
            else{
                clickedTarget = false;
                while(serviceInfo.firstChild) {
                    serviceInfo.removeChild(serviceInfo.firstChild);
                }
                serviceInfo.textContent = " Target:" + service.name;



            }

        }

    }
    serviceInfo.id = service.name;
    return serviceInfo;

}

function createSourceOrTarget(service,beforeNode){
    let neighbours = findServiceNeighboursArray(service);
    console.log(neighbours);
    let allInfo = createDomElementSecondServiceAllInfo(undefined,service,neighbours.neighbors,2,beforeNode);
    return allInfo;

}


function addAllMetricsLinks(link,div){

    let aveDiv = createMetris(null,null,null,4,"Average Response Time:",link.averageTime, "ms");
    let aveDivPerc = createMetris(null,null,null,4,"Average Response Time Percentage:",link.AverageTimePercentage, "%");
    let totalRequests = createMetris(null,null,null,4,"Total number Requests:",link.numberTotalRequests, "");
    let totalRequestsPercentage = createMetris(null,null,null,4,"Total number Requests percentage:",link.totalNumberRequestsPercentage, "%");

    //let aveDiv = averageResponseTime(nodeDomElement,service,neighbours,4);
    div.appendChild(aveDiv);
    div.appendChild(aveDivPerc);
    div.appendChild(totalRequests);
    div.appendChild(totalRequestsPercentage);
    return div;
}

function addHttpInfo(link,divToAdd) {
    let clickedHttpInfo = false;
    let httpDiv = document.createElement("div");
    httpDiv.className = "serviceInfo";
    //httpDiv.textContent = "Http Requests";
    let httpRequestMenu = addDropDownDiv("Http Requests",httpDiv);

    httpRequestMenu.onclick = function () {
        if(httpDiv.children.length === 1){
            clickedHttpInfo = true;
            for(let i=0;i<link.httpInfo.length;i++){
                let newHttpType = createHttpType(link,link.httpInfo[i]);
                httpDiv.appendChild(newHttpType);
            }

        }
        else if(clickedHttpInfo === true){
            clickedHttpInfo = true;

            while(httpDiv.children[1]) {
                httpDiv.removeChild(httpDiv.children[1]);
            }
            //httpDiv.textContent = "Http Requests";
        }
    }

    divToAdd.appendChild(httpDiv);
    return divToAdd;
}

function createHttpType(link,request){
    console.log(link);
    let mainInfoLinks = document.createElement("div");
    mainInfoLinks.className = "mainInfo";
    let title = document.createElement("h9");
    title.className = "titleLink";
    title.textContent = request.code;
    mainInfoLinks.appendChild(title);
    let numberRequestsDiv = document.createElement("div");
    numberRequestsDiv.className = "serviceInfo";
    numberRequestsDiv.textContent = "Number of Requests : "+ request.numberRequests;
    let aveTimeRequestsDiv = document.createElement("div");
    aveTimeRequestsDiv.className = "serviceInfo";
    aveTimeRequestsDiv.textContent = "Average Time : "+ request.meanTime + "ms";
    mainInfoLinks.appendChild(numberRequestsDiv);
    mainInfoLinks.appendChild(aveTimeRequestsDiv);
    return mainInfoLinks;


}


