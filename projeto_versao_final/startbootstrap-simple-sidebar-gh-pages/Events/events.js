function addEventListenerToCircle(serviceArray,links) {
    console.log("add listener circle");
    console.log(serviceArray);
    let circle = document.getElementsByTagName("circle");
    let numberCircles = circle.length;
    for (let i = 0; i < numberCircles; i++) {
        //console.log(circle[i]);
        circle[i].setAttribute('clicked', 0);
        let x = circle[i].getAttribute("cx");
        let y = circle[i].getAttribute("cy");
        circle[i].addEventListener("click", function () {
            nodeListener(circle[i],serviceArray);
        });
        /*
        console.log(circle[i].getAttribute("text"));
        circle[i].addEventListener("click",drawBoxClick.bind(this)); */

    }

    serviceClicked = 0;

}

function nodeListener(circle,serviceArray) {
    //console.log(circle.getAttribute("text"));

    // there is the service Array, linksArray and the neighbours array

    let service = findNodeInArray(circle.getAttribute("text"),serviceArray);

    //console.log(event.target);
    //console.log(service);
    tiggerEvent(event.target,service);

}



function findNodeInArray(circleName,serviceArray)
{
    for(let i=0;i<serviceArray.length;i++)
    {
        if(serviceArray[i].name === circleName){
            return serviceArray[i];
        }

    }

}


function addEventListenerToLinks(linksArray,serviceArray){
    console.log(linksArray);
    let lines = document.getElementsByTagName("line");
    let numberLinks = lines.length;
    for (let i = 0; i < numberLinks; i++) {
        //console.log(circle[i]);
        lines[i].setAttribute('clicked', 0);
        let x = lines[i].getAttribute("cx");
        let y = lines[i].getAttribute("cy");
        lines[i].addEventListener("click", function () {
            let link = linesListener(lines[i],linksArray,serviceArray);
        });
        // Display info
        /*
        console.log(circle[i].getAttribute("text"));
        circle[i].addEventListener("click",drawBoxClick.bind(this)); */

    }
}


function linesListener(line,linksArray,serviceArray) {
    console.log(serviceArray);
    console.log(linksArray);

    if(typeSim == 1){
        let link = findLinksArray(line,linksArray);
        console.log(event.target);
        console.log(link);
        triggerLinksEvents(event.target,link);
    }
    else if(typeSim == 3 || typeSim == 4 || typeSim == 5){
        let link = findLinkArrayGroup(line,linksArray,serviceArray);
        triggerLinksEvents(event.target,link);
    }



        // display info
}

function findLinksArray(line,linksArray)
{
    console.log(line);
    console.log(linksArray);
    let source = line.getAttribute("source");
    let target = line.getAttribute("target");
    for(let i=0;i<linksArray.length;i++){
        if(source === linksArray[i].from.name && target === linksArray[i].to.name){
            return linksArray[i];
        }
    }

}

function findLinkArrayGroup(line,linksArray,serviceArray) {
    let source = line.getAttribute("source");
    let target = line.getAttribute("target");

    /*let source = line.source;
    let target = line.target;*/
    //console.log(line);
    console.log(source);
    console.log(target);
    console.log(linksArray);
    for(let i=0;i<linksArray.length;i++){
        if(linksArray[i].source === source && linksArray[i].target === target){
            console.log(linksArray[i]);
            let nodeSource = findServiceInServiceArray(source,serviceArray);
            let nodeTarget = findServiceInServiceArray(target,serviceArray);
            let newEdge = new Edge(nodeSource,nodeTarget,0);
            newEdge.setAverageTime(linksArray[i].averageResponseTime);
            newEdge.setNumberTotalRequests(linksArray[i].numberTotalRequests);
            newEdge.setTotalTime(linksArray[i].totalRequestTime);
            newEdge.setTotalNumberRequestsPercentage(linksArray[i].totalNumberRequestsPercentage);
            newEdge.setAverageTimePercentage(linksArray[i].AverageTimePercentage);
            //console.log(nodeSource);
            //console.log(nodeSource);

            /*averageTime: 43.75495750708215
            numberTotalRequests: 706
            totalTime: 30891
            totalNumberRequestsPercentage: 1.0996106194690267
            AverageTimePercentage: 0.8718905927602852

            numberTotalRequests: 12295
            averageResponseTime: 49.72826352175681
            totalRequestTime: 611409
            totalNumberRequestsPercentage: 9.57486725663717
            AverageTimePercentage: 0.9909186896571978*/
            return newEdge;
        }
    }
}

function findServiceInServiceArray(serviceName,serviceArray) {
    for(let i=0;i<serviceArray.length;i++){
        if(serviceArray[i].name === serviceName){
            return serviceArray[i];
        }
    }
    return null;
}