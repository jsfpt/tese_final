var linksGlobal;
var nodesGlobalJSON;

function setXYPositionD3_2(type, type2, nodesSetParam, links, svg, xDimension, yDimension, raiusInside, forceCollideInside, distance, xInitial, yInitial, color, firstIteration, serviceArray,zoomOn,linkArray)
{

    nodesGlobalJSON = nodesSetParam;
    linksGlobal = links;

    //console.log(nodesSetParam);
    //console.log(links)
    //console.log(serviceArray);
    currentServiceArray = serviceArray;
    currentlinksArray = linkArray;
    if(typeSim === 1 || typeSim === 2){
        currentNeighboursArray = constructNeighboursService(currentServiceArray,currentlinksArray);
        console.log("constructNeighboursService_setXY");
    }
    else{
        currentNeighboursArray = constructNeighboursServiceGroupOfNodes(currentServiceArray,currentlinksArray);
        console.log("constructNeighboursService_setXY_2");
    }

    console.log(currentServiceArray);
    console.log(currentlinksArray);
    console.log(currentNeighboursArray);

    exitSim = 0;
    //console.log(svg);
    oldNodes = nodesSetParam;
    //console.log(nodesSet);
    let nodesSet = initNodePosition(nodesSetParam);
    //nodesSet.forEach(function(d) { d.x = d.cx; d.y = d.cy; });
    findPreviousPosition(nodesSet);
    try {
        deleteNodesAndLinks();
    } catch (e) {

    }

    /*nodesSet.forEach(function(d) { var number = d.x.substring(0,2);
    d.x = string(parseInt(number));});*/


    //console.log(nodesSet);
    //console.log(links);


    exitSim = 0;
    let nodesGlobalReturn = null;
    let simulation;
    let link;
    let node;
    let attractForce = d3.forceManyBody().strength(200).distanceMax(400).distanceMin(60);
    let repelForce = d3.forceManyBody().strength(-140).distanceMax(50).distanceMin(10);

    if (type == 1) {
        simulation = d3.forceSimulation()
            .force("collide", d3.forceCollide(forceCollideInside))
            .force("charge", d3.forceManyBody().strength(-100).distanceMax(2000))
            .force("link", d3.forceLink().id(function (d) {
                return d.name;
            }).distance(distance))
            .force("x", d3.forceX(xDimension / 2))
            .force("y", d3.forceY(yDimension / 2))
            .force("attractForce", attractForce)
            .force("repelForce", repelForce)
            .force("centeringForce", d3.forceCenter(viewBoxFixSize / 2, viewBoxFixSizeHeight / 2))
            //.alphaDecay(0.01)         // uncomment to slow down
            //.velocityDecay(0.9)

            //.on("tick", tickedMenu)
            .on("tick",  function(d){
                    setTimeout(tickedMenu(d), 200);
            })
            .on("end", function () {

                previousNodeInfo = nodesSet;
                console.log(previousNodeInfo);
                removeTextTags();
                //reload_js('svg-pan-zoom/svg-pan-zoom.js');
                initZoomVariables(zoomOn);
                //handleZoom3();
                exitSim = 1;
                //d3Zoom();

                svg.selectAll("circle")
                    .on("mouseover", highlightNode)
                    .on("mouseout", fade)
                    .call(d3.drag().on("drag", dragged));

                svgGlobal = svg;
                console.log("fim sim listener nodes");
                addEventListenerToCircle(serviceArray);   //BOX
                addEventListenerToLinks(linkArray,serviceArray);   //BOX

                //d3Zoom();

            });

        function dragged(d) {
            d.x = d3.event.x, d.y = d3.event.y;
            d3.select(this).attr("cx", d.x).attr("cy", d.y);
            link.filter(function (l) {
                return l.source === d;
            }).attr("x1", d.x).attr("y1", d.y);
            link.filter(function (l) {
                return l.target === d;
            }).attr("x2", d.x).attr("y2", d.y);

            // update text position
            //console.log(d._data_);
            updateTextPosition(d.name, d3.event.x, d3.event.y);

        }

        function updateTextPosition(serviceName, x, y) {
            //console.log(serviceName);
            //console.log("\n\n------------Iteration");
            let textArray = document.getElementsByTagName("text");
            for (let i = 0; i < textArray.length; i++) {
                let currentText = textArray[i];
                //console.log("current text:"+currentText.getAttribute("id")+"\\serviceName:"+serviceName);
                if (currentText.getAttribute("id") === serviceName) {
                    //console.log("text = text");
                    currentText.setAttribute("x", x);
                    currentText.setAttribute("y", y);

                }
            }
        }


        link = svg.selectAll(".link");
        node = svg.selectAll(".node");

        simulation.nodes(nodesSet);
        simulation.force("link").links(links);

        link = link
            .data(links)
            .enter().append("line")
            .attr("class", "link");


    }
    if (type === 2) {

        simulation = d3.forceSimulation()
            .force("collide", d3.forceCollide(forceCollideInside))
            .force("charge", d3.forceManyBody().strength(-200))
            //.force("link", d3.forceLink().id(function(d) { return d.name; }).distance(distance))
            .force("x", d3.forceX(xDimension / 2))
            .force("y", d3.forceY(yDimension / 2))
            .on("tick", tickedWithOutLinks);

        //var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");
        simulation.nodes(nodesSet);
        //simulation.force("link").links(links);

    }

    if (firstIteration === 0) {
        node = node
            .data(nodesSet)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", raiusInside)
            .attr("text", function (d) {
                return d.name;
            })
            .style("fill", function (d) {
                return d.id;
            });
        //.atttr("cx", function(d){ return String(d.x);})
        //.atttr("cy", function(d){ return String(d.y);});

    }


    if (firstIteration === 1) {
        node = node
            .data(nodesSet)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", raiusInside)
            .attr("text", function (d) {
                return d.name;
            })
            .style("fill", function (d) {
                return d.id;
            });
    }


    function end() {
        console.log("end of simulation");
    }

    function tickedMenu() {
        if (type2 == "normal") {
            tickedNormal();
        } else if (type2 == "compare") {
            console.log("compare");
            ticked();
        }
    }


    function ticked() {
        removeTextDom();
        link.attr("x1", function (d) {
            updateArray(d, serviceArray);
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            })
            .attr("source", function (d) {
                return d.source.name
            })
            .attr("target", function (d) {
                return d.target.name
            })
            //.attr("stroke","blue")
            .attr("stroke-dasharray", "10,10")
            //<path stroke-dasharray="10,10" d="M5 40 l215 0" />
            .attr("style", function (d) {
                if (d.color === "green") {
                    //stroke:rgb(255,0,0);stroke-width:2
                    return "stroke:rgb(0,255,0)";
                }
                if (d.color === "red") {
                    return "stroke:rgb(255,0,0)";
                } else {
                    return "stroke:#ffffff";
                }

            })
            .attr("stroke-width", "5");

        svg.selectAll("circle").append("svg:text")
            .attr("class", "nodetext")
            .attr("x", raius)
            .attr("y", raius)
            .attr("fill", "white");
        /*.attr("text-anchor","middle")
        .attr("font-size","30")
        .text(function(d) { return d.name });*/


        /*  node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.name });*/

        node.attr("cx", function (d) {
            drawText(d, serviceArray);
            return String(parseInt(d.x) + xInitial);
        })
            .attr("cy", function (d) {
                return String(parseInt(d.y) + yInitial);
            })
            //.attr("fill",String(color));
            /*.attr("r", function (d) {
                return raiusInside * d.totalNumberRequestsPercentage;
            })*/
            .attr("stroke", "black")
            .attr("fill", function (d) {
                if (d.color === "green") {
                    return "#00e64d";
                }
                if (d.color === "red") {
                    return "#ff3300";
                } else {
                    return "#3399ff";
                }
            });

    }


    function tickedNormal() {
        removeTextDom();
        link.attr("x1", function (d) {
            updateArray(d, serviceArray);
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            })

            .attr("source", function (d) {
                return d.source.name
            })
            .attr("target", function (d) {
                return d.target.name
            })
            //.attr("stroke","blue")
            .attr("stroke-dasharray", "10,10")
            //<path stroke-dasharray="10,10" d="M5 40 l215 0" />
            .attr("style", function (d) {
                /*if(d.color === "green") {
                    //stroke:rgb(255,0,0);stroke-width:2
                    return "stroke:rgb(0,255,0)";
                }*/
                let color = colorPicker3Intervals(d.AverageTimePercentage);
                let strokeColor = "stroke:" + color;
                let thichness = 7 * d.totalNumberRequestsPercentage
                if (thichness > 20) {
                    thichness = 20;
                }
                let thichnessString = "stroke-width:" + thichness + "px";
                let finalStyleString = strokeColor + ";" + thichnessString;
                return finalStyleString;

            })
            .attr("stroke-width", "2");

        svg.selectAll("circle").append("svg:text")
            .attr("class", "nodetext")
            .attr("x", raius)
            .attr("y", raius)
            .attr("fill", "white");/*
            .attr("text-anchor","middle")
            .attr("font-size","30")
            .text(function(d) { return d.name });  // don't work for tarajn*/


        /*  node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.name });*/

        node.attr("cx", function (d) {
            drawText(d, serviceArray);
            return String(parseInt(d.x) + xInitial);
        })
            .attr("cy", function (d) {
                return String(parseInt(d.y) + yInitial);
            })
            //.attr("fill",String(color));
            .attr("r", function (d) {
                let raiusCalc = raiusPicker(d.totalNumberRequestsPercentage, 20);
                //console.log(raiusCalc);
                return raiusCalc;
            })
            .attr("stroke", "black")
            .attr("fill", function (d) {

                /*if(d.color === "green"){
                    return "#00e64d";
                }
                */
                return colorPicker3Intervals(d.AverageTimePercentage);

            });

    }


    function tickedWithOutLinks() {
        removeTextDom();

        /*  node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.name });*/

        node.attr("cx", function (d) { /*drawText(d)*/
            return String(parseInt(d.x) + xInitial);
        })
            .attr("cy", function (d) {
                return String(parseInt(d.y) + yInitial);
            })
            .attr("fill", String("#ff8080"))


    }


}


function highlightNode(node, links2) {
    //console.log("highlight Node");
   //console.log(node);
    if (serviceClicked == 0) {
        d3.selectAll("circle").classed("highlight", d => d === node);
        d3.selectAll("circle").classed("faded", d => !(d === node
            || (linksGlobal.filter(k => k.source == node).filter(m => m.target == d).length > 0)
            || (linksGlobal.filter(k => k.target == node).filter(m => m.source == d).length > 0)));
        d3.selectAll("line").classed("faded", edge => !(edge.source === node || edge.target === node));

    }
}

function updateArray(d, serviceArray) {
    updateCoordinates(d, serviceArray);
}

function removeTextDom() {
    let textArray = document.getElementsByTagName("text");
    let length = textArray.length;
    for (let i = 0; i < length; i++) {
        try {
            textArray[i].remove();
            i-=1;
        } catch (e) {
            //console.log(textArray[i]);
            //console.log(e);
        }

    }
}



function removeTextDom2() {
    let viewport = document.getElementById("svg")
    //console.log(viewport);
    for(let i=0;i<viewport.length;i++){
        console.log(viewport.children[i]);
        if(viewport.children[i].tagName === "text"){
            viewport.children[i].remove();
        }
    }

}


function drawText(d, serviceArray) {
    //console.log("drawText");
    //console.log(d.name);
    //console.log(serviceArray);
    let node = findService(d.name, serviceArray);
    if (node == "Not found") {
        console.log("not found");
        return 0;
    }
    //console.log(node);
    //console.log(d);
        let svgElement = document.getElementById("svg");
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', String(d.x));
        text.setAttribute('y', String(d.y));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute('font-size', String(giveTextPosition(d.name)));
        text.setAttribute('fill', 'white');
        text.setAttribute('id', d.name);
        text.setAttribute('id2', "fixed");
        text.textContent = d.name;
        svgElement.appendChild(text);
        node.drawText = true;



}

function giveTextPosition(word) {
    //return 16;
    // font 16 is 22 px
    //console.log(word.length);
    let pixelByOneChar = 22;
    let pixelBychar = ((raius * 2) / word.length) - 2;
    let font = pixelBychar * 3.5;
    if (font > raius) {
        font = raius - 3;
    }
    return font;
}


function fade() {

    if (serviceClicked == 0) {
        d3.selectAll("circle, line").classed("faded highlight", false);

    }
}


function initNodePosition(nodesFuncInit) {
    //console.log(nodesFuncInit);
    let circles = document.getElementsByTagName("circle");
    let numberCircles = circles.length;
    //console.log("number circles:"+numberCircles);
    for (let i = 0; i < numberCircles; i++) {
        //console.log(i);
        //console.log(circles[i]);
        let label = circles[i].getAttribute("text");
        let x = circles[i].getAttribute("cx");
        let y = circles[i].getAttribute("cy");
        for (let j = 0; j < nodesFuncInit.length; j++) {
            let d = nodesFuncInit[i];
            try {
                if (d.name === label) {
                    //console.log("Add cx and cy to json:x:"+x+"//y:"+y);
                    d.cx = parseInt(x);
                    d.cy = parseInt(y);
                    d.x = parseInt(x);
                    d.y = parseInt(y);
                    //console.log(d);
                }
            } catch (e) {

            }

        }
    }
    //console.log(nodesFuncInit);

    return nodesFuncInit;

}


function reload_js(src) {
    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');
}

function  removeTextTags() {
    let svgDom = document.getElementById("svg");
    let firstChild = svgDom.firstChild;
    //console.log(firstChild);
    let children = firstChild.children;
    for (let i = 0; i < children.length; i++) {
        //console.log("----loop----");
        let child = children[i];
        if(child.tagName=== "text"){
            //console.log(child);
            child.remove();
        }
        // Do stuff
    }

}


function findPreviousPosition(nodeSet){
    if(previousNodeInfo != undefined){
        //console.log(nodeSet);
        //console.log(previousNodeInfo);
        for(let k=0;k<nodeSet.length;k++){
            let nodeName = nodeSet[k].name;
            //console.log("-------------"+nodeName);
            //neighbors.name
            for(let i=0;i<previousNodeInfo.length;i++){
                if(previousNodeInfo[i].neighbors != undefined){
                    for(let j=0;j<previousNodeInfo[i].neighbors.length;j++){
                        //console.log(previousNodeInfo[i].neighbors[j].name);
                        if(previousNodeInfo[i].neighbors[j].name == nodeName){
                            // init x and y
                            nodeSet[k].cx = parseInt(previousNodeInfo[i].x);
                            nodeSet[k].cy = parseInt(previousNodeInfo[i].y);
                            nodeSet[k].x = parseInt(previousNodeInfo[i].x);
                            nodeSet[k].y = parseInt(previousNodeInfo[i].y);
                            //nodeSet[i].
                            console.log(previousNodeInfo[i]);
                        }
                    }
                }
            }
        }
    }
    else {
        console.log("previousNodeInfo undefined");
    }
}


function constructNeighboursService(serviceArrayConstructNeighbours,linksArrayConstructNeighbours){
  console.log("create neighborsArray");
  console.log(linksArrayConstructNeighbours);
    try{
        let neighboursArrayConstruct = new Array();
        for(let i=0;i<serviceArrayConstructNeighbours.length;i++){
            let currentService = serviceArrayConstructNeighbours[i];
            //console.log(currentService);
            let neighbours = new Array();
            for(let j=0;j<linksArrayConstructNeighbours.length;j++){
                let currentLink = linksArrayConstructNeighbours[j];
                //console.log(currentLink);
                if(currentService.name === currentLink.from.name){ // only the edges that leave the service
                    neighbours.push(currentLink.to);
                }
                if(currentService.name === currentLink.to.name){ // only the edges that leave the service
                    neighbours.push(currentLink.from);
                }
            }
            neighboursArrayConstruct.push(new nodeLink(currentService.name,neighbours));
        }
        return neighboursArrayConstruct;

    }catch (e) {
        console.log(e);
        return null;
    }
    /*
 new nodeLink(name,neighbors);
  }*/

}


function constructNeighboursServiceGroupOfNodes(serviceArrayConstructNeighbours,linksArrayConstructNeighbours){
    try{
        let neighboursArrayConstruct = new Array();
        for(let i=0;i<serviceArrayConstructNeighbours.length;i++){
            let currentService = serviceArrayConstructNeighbours[i];
            //console.log(currentService);
            let neighbours = new Array();
            for(let j=0;j<linksArrayConstructNeighbours.length;j++){
                let currentLink = linksArrayConstructNeighbours[j];
                //console.log(currentLink);
                if(currentService.name === currentLink.source){ // only the edges that leave the service
                    //console.log("find 1");
                    let target = findNodeNodeArray(currentLink.target,serviceArrayConstructNeighbours);
                    let checkAlreadyInArray = findNodeNodeArray(currentLink.target,neighbours);
                    if(checkAlreadyInArray == undefined) {
                        neighbours.push(target);
                    }
                }
                if(currentService.name === currentLink.target){ // only the edges that leave the service
                    console.log("find 2");
                    let source = findNodeNodeArray(currentLink.source,serviceArrayConstructNeighbours);
                    let checkAlreadyInArray = findNodeNodeArray(currentLink.source,neighbours);

                    if(checkAlreadyInArray == undefined) {
                        neighbours.push(source);
                    }
                }
            }
            neighboursArrayConstruct.push(new nodeLink(currentService.name,neighbours));
        }
        return neighboursArrayConstruct;

    }catch (e) {
        console.log(e);
        return null;
    }
    /*
 new nodeLink(name,neighbors);
  }*/

}

function findNodeNodeArray(nodeName,serviceArrayConstructNeighbours) {
    for(let i=0;i<serviceArrayConstructNeighbours.length;i++){
        if(nodeName === serviceArrayConstructNeighbours[i].name){
            return serviceArrayConstructNeighbours[i];
        }
    }
}
