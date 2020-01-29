function tiggerEvent(nodeDomElement,service){
    console.log(nodeDomElement);
    console.log(service);
    console.log(currentServiceArray);
    console.log(currentlinksArray);
    console.log(currentNeighboursArray);
    let neighbours = findServiceNeighboursArray(service);
    //console.log(neighbours);
    functionCreateAllInfo(nodeDomElement,service,neighbours.neighbors,0);
}

function findServiceNeighboursArray(service) {
    //console.log(service);
    //console.log(currentNeighboursArray);
    for(let i=0;i<currentNeighboursArray.length;i++){
        if(service.name === currentNeighboursArray[i].name){
            //console.log("find");
            return currentNeighboursArray[i];
        }
    }
    return null;

}


function functionCreateAllInfo(nodeDomElement,service,neighbours,option) {
    window.event.stopPropagation();
    if(option === 0){
        let rightDiv = document.getElementById("right-div");
        let mainInfo = createMainInfo(nodeDomElement,service,neighbours,4);
        addHighligthEvent(nodeDomElement,mainInfo);
        rightDiv.insertBefore(mainInfo,rightDiv.firstChild);
    }
    else if(option === 1){
        console.log()
        let mainInfo = createMainInfo(nodeDomElement,service,neighbours,4);
        return mainInfo;
    }

    /*eElement.insertBefore(newFirstElement, eElement.firstChild);
    rightDiv.appendChild(mainInfo);*/
    
}

function addHighligthEvent(nodeDomElement,mainInfo){

    console.log(mainInfo);
    let nodeJson = findNodeInJson(nodeDomElement.getAttribute("text"));
    mainInfo.onmouseover = function () {
        nodeDomElement.setAttribute("stroke-width","4px");
        nodeDomElement.setAttribute("stroke","#005380");
        highlightNode(nodeJson);
    };

    mainInfo.onmouseout =function () {
        nodeDomElement.setAttribute("stroke-width","1px");
        nodeDomElement.setAttribute("stroke","black");
        fade();
    };

}


function createMainInfo(nodeDomElement,service,neighbours,iteration){
    let div = document.createElement("div");
    div.className = "mainInfo";
    div.id = service.name;
    let title = document.createElement("h6");
    title.className = "title";
    title.textContent = "Node: " + service.name;
    div.appendChild(title);
    if(typeSim == 3 || typeSim == 4 || typeSim == 5){
        let elementsInfo = addNodeElements(nodeDomElement,service,service.neighbors,iteration);
        div.appendChild(elementsInfo);
    }
    let neighboursInfo = document.createElement("div");
    neighboursInfo.className = "serviceInfoDropDown";

    let dropDownNeighbours = addDropDownDiv("Neighbours:" + neighbours.length,neighboursInfo);
    neighboursInfo.id = service.name;
    dropDownNeighbours.onclick = function(){
        if(neighboursInfo.children.length ===1){
            let allNeighboursInfo = createNeighboursInfo(nodeDomElement,service,neighbours,iteration);
            neighboursInfo.appendChild(allNeighboursInfo);
        }
        else{
            while(neighboursInfo.children[1]) {
                neighboursInfo.removeChild(neighboursInfo.children[1]);
            }
            //dropDownNeighbours = addDropDownDiv("Neighbours:" + neighbours.length,neighboursInfo);
        }

    };

    div.appendChild(neighboursInfo);
    div = addAllMetrics(nodeDomElement,service,neighbours,iteration,div);
    return div;

}


function addDropDownDiv(text,neighboursInfo,iteration) {
    console.log("AddDropDownDiv");
    let textContent = document.createElement("p");
    textContent.id = "dropDown";
    textContent.textContent = text;
    let dropSymbol = document.createElement("img");
    dropSymbol.id = "dropDownImage"
    dropSymbol.src = "images/icons8-menu-24.png";
    dropSymbol.align = "right";
    textContent.appendChild(dropSymbol);
    neighboursInfo.appendChild(textContent);
    return dropSymbol;
}

function  addNodeElements(nodeDomElement,service,neighbours,iteration) {

    let elementsInfo = document.createElement("div");
    elementsInfo.className = "serviceInfoDropDown";
    let elementsDropDown = addDropDownDiv("Elements:" + neighbours.length,elementsInfo);
    //elementsInfo.textContent = "Elements:" + neighbours.length;

    elementsInfo.id = service.name;
    console.log(neighbours);
    console.log(neighbours.length);
    if(neighbours.length > 0){
        elementsDropDown.onclick = function(){
            console.log(service);

            if(elementsInfo.children.length ==1){
                let allNeighboursInfo = createElementsInfo(nodeDomElement,service,neighbours,iteration);
                elementsInfo.appendChild(allNeighboursInfo);
            }
            else{
                while(elementsInfo.children[1]) {
                    elementsInfo.removeChild(elementsInfo.children[1]);
                }
                //elementsInfo.textContent = "Elements: "+ neighbours.length;
                //elementsDropDown = addDropDownDiv("Elements:" + neighbours.length,elementsInfo);

            }

        };
    }
    return elementsInfo;

}

function addAllMetrics(nodeDomElement,service,neighbours,iteration,div){

    if(typeSim == 1){
        let serviceDiv = createMetris(nodeDomElement,service,neighbours,4,"Service:",service.serviceName, "");
        div.insertBefore(serviceDiv,div.firstChild);

        div.appendChild(serviceDiv);
    }
    let aveDiv = createMetris(nodeDomElement,service,neighbours,4,"Average Response Time:",service.averageResponseTime, "ms");
    let aveDivPerc = createMetris(nodeDomElement,service,neighbours,4,"Average Response Time Percentage:",service.AverageTimePercentage, "%");

    let totalRequests = createMetris(nodeDomElement,service,neighbours,4,"Total number Requests:",service.totalNumberRequests, "");
    let totalRequestsPercentage = createMetris(nodeDomElement,service,neighbours,4,"Total number Requests percentage:",service.totalNumberRequestsPercentage, "%");

    //let aveDiv = averageResponseTime(nodeDomElement,service,neighbours,4);
    div.appendChild(aveDiv);
    div.appendChild(aveDivPerc);
    div.appendChild(totalRequests);
    div.appendChild(totalRequestsPercentage);
    return div;
}


function createNeighboursInfo(nodeDomElement,service,neighbours,iteration) {
        let neighboursInfo = document.createElement("ul");
        neighboursInfo.className = "listInfo";
        neighboursInfo.id = service.name;
            for(let i=0;i<neighbours.length;i++){
                //console.log(neighbours[i]);
                let currentNeighbourNeighbours =  findServiceNeighboursArray(neighbours[i]);
                let currentNeighbour = createDomElementSecondServiceAllInfo(nodeDomElement,neighbours[i],currentNeighbourNeighbours.neighbors,iteration+1,"Node: ");
                neighboursInfo.appendChild(currentNeighbour);
            }
        return neighboursInfo;
}


function createElementsInfo(nodeDomElement,service,neighbours,iteration) {
    let neighboursInfo = document.createElement("ul");
    neighboursInfo.className = "listInfo";
    neighboursInfo.id = service.name;
    for(let i=0;i<neighbours.length;i++){
        //console.log(neighbours[i]);
        //let currentNeighbourNeighbours =  findServiceNeighboursArray(neighbours[i]);
        let currentNeighbour = createDomElementSecondServiceAllInfo(nodeDomElement,neighbours[i],null,iteration+1,"Node: ");
        neighboursInfo.appendChild(currentNeighbour);
    }
    return neighboursInfo;
}

function createDomElementSecondService(nodeDomElement,service,neighbours,iteration){

    let mainInfoDiv = document.createElement("div");
    mainInfoDiv.className = "mainInfo";
    mainInfoDiv.id = service.name;
    let title = document.createElement("h8");
    title.className = "title";
    title.textContent = "Node: " + service.name;
    mainInfoDiv.appendChild(title);
    if(neighbours != null || neighbours != undefined){
        let allInfoDiv = document.createElement("div");
        allInfoDiv.className = "serviceInfoDropDown";
        allInfoDiv.textContent = "Neighbours: "+ neighbours.length;
        if(neighbours.length >0){
            let listInfoDiv = document.createElement("ul");
            listInfoDiv.className = "listInfo";

            for(let i=0;i<neighbours.length;i++){
                listInfoDiv.appendChild(addServicesAllInfo(neighbours[i].name));
            }
            allInfoDiv.appendChild(listInfoDiv);
        }
        mainInfoDiv.appendChild(allInfoDiv);
    }
    return mainInfoDiv;
}


function createDomElementSecondServiceAllInfo(nodeDomElement,service,neighbours,iteration,appendBefore){
    let div = document.createElement("div");
    div.className = "mainInfo";
    div.id = service.name;

    let dropdownSymbolNode = addDropDownDiv(appendBefore + service.name,div);

    dropdownSymbolNode.onclick = function () {
        event.stopPropagation();
        if(div.children.length === 1){
            if(typeSim == 3 || typeSim == 4 || typeSim == 5){
                let elementsInfo = addNodeElements(nodeDomElement,service,service.neighbors,iteration);
                div.appendChild(elementsInfo);

            }
            let neighboursInfo = document.createElement("div");
            neighboursInfo.className = "serviceInfoDropDown";

            let dropDownSymbol = addDropDownDiv("Neighbours:" + neighbours.length,neighboursInfo,2);
            neighboursInfo.id = service.name;
            dropDownSymbol.onclick = function(){
                event.stopPropagation();
                console.log("inside div click");
                if(neighboursInfo.children.length ==1){
                    let allNeighboursInfo = createNeighboursInfo(nodeDomElement,service,neighbours,iteration);
                    neighboursInfo.appendChild(allNeighboursInfo);
                }
                else{
                    while(neighboursInfo.children[1]) {
                        neighboursInfo.removeChild(neighboursInfo.children[1]);
                    }
                    //dropDownSymbol = addDropDownDiv("Neighbours:" + neighbours.length,neighboursInfo);
                }

            };

            div.appendChild(neighboursInfo);
            div = addAllMetrics(nodeDomElement,service,neighbours,iteration,div);
        }
        else{
            while(div.children[1]) {
                div.removeChild(div.children[1]);
            }
            //dropdownSymbolNode = addDropDownDiv("Node: " + service.name,div);
        }
    }

    return div;

}




function addServicesAllInfo(neighboursName){
    let divInfo = document.createElement("div");
    divInfo.className = "divInfo";
    divInfo.textContent = neighboursName;
    return divInfo;
}

function httpRequests(nodeDomElement,service,neighbours,iteration){
    console.log(service);
}

function createMetris(nodeDomElement,service,neighbours,iteration,metric, value,ending){
    let averageDiv = document.createElement("div");
    averageDiv.className = "serviceInfo";
    averageDiv.textContent = metric + " " + value + " " + ending;

    //averageDiv.textContent = "Average Response Time: " + service.averageResponseTime + "ms";
    return averageDiv;
}


function  findNodeInJson(nodeName){
    for(let i=0;i<nodesGlobalJSON.length;i++){
        if(nodeName === nodesGlobalJSON[i].name){
            return nodesGlobalJSON[i];
        }
    }
}

function addBorderRadiusNode(nodeDomElement) {
    nodeDomElement.setAttribute("stroke-width","5px");
}