var timeIntervalBaseWidth = 15.5;
function initNewTimeLine(datesNewTimeLine){
    console.log(datesNewTimeLine);
    let timeInterval = makeTimeIntervals(datesNewTimeLine);
    console.log(timeInterval);
    let ratioTimeIntervalsArray = ratioTimeIntervals(timeInterval,datesNewTimeLine);
    console.log(ratioTimeIntervalsArray);
    addIntervalDivs(datesNewTimeLine,ratioTimeIntervalsArray);
    timeLineScrollButtons();

}


function addIntervalDivs(datesNewTimeLine,ratioTimeIntervalsArray){
    //console.log(datesNewTimeLine.length);
    //console.log(ratioTimeIntervalsArray.length);
    let line = document.getElementById("line");
    let lineDates = document.createElement("div");
    lineDates.className = "lineDates";
    lineDates.id = "lineDates";
    line.appendChild(lineDates);
    let widthSize = timeIntervalBaseWidth;
    let lastWidth = widthSize +"%";

    for(let i=0;i<datesNewTimeLine.length;i++){
        if(i===0){
            console.log("i === 0");
            let div = document.createElement("div");
            div.className = "dateInterval";
            console.log(ratioTimeIntervalsArray[i]);
            let widthSize = timeIntervalBaseWidth * (ratioTimeIntervalsArray[i]);
            let halfWidth = parseInt(timeIntervalBaseWidth)/2;
            let halfWidthString = halfWidth + "%";
            div.style.width = halfWidthString;
            div.style.background = "white";
            line.appendChild(div);

            /*let lineDates = document.getElementById("lineDates");
            let intervalBetweenDates = document.createElement("div");
            intervalBetweenDates.className = "dateText";
            intervalBetweenDates.style.width = (timeIntervalBaseWidth/2) + "%";
            lineDates.appendChild(intervalBetweenDates);
*/

            //textContent(undefined,(timeIntervalBaseWidth/2)+"%");
        }

        let div = document.createElement("div");
        div.className = "dateInterval";
        console.log(ratioTimeIntervalsArray[i]);
        if(ratioTimeIntervalsArray[i] === undefined){
            console.log("i > ratio lenght");
            let widthSize = timeIntervalBaseWidth * (ratioTimeIntervalsArray[i-1]);
            let widthString = widthSize +"%";
            div.style.width = widthString;
            textContent(datesNewTimeLine[i],timeIntervalBaseWidth * (ratioTimeIntervalsArray[0]),i);
            lastWidth = widthString;
        }

        else{
            let widthSize = timeIntervalBaseWidth * (ratioTimeIntervalsArray[i]);
            let widthString = widthSize +"%";
            div.style.width = widthString;
            div.id = "" + i;
            div.addEventListener("click", function(){
               choseTypeSim(event.target);
            });
            line.appendChild(div);
            textContent(datesNewTimeLine[i],widthSize);

        }
    }
}


function updateBackgroundColor(idSelected1,idSelected2){
    console.log(idSelected1);
    console.log(idSelected2);
    let intervals = document.getElementsByClassName("dateInterval");
    for(let i =1;i<intervals.length;i++){
        if(idSelected1 != undefined && idSelected2!= undefined){
            if(intervals[i].getAttribute("id") === idSelected1 || intervals[i].getAttribute("id") === idSelected2){
                intervals[i].style.background = "#0062cc";
            }
            else {
                intervals[i].style.background = "#42cef5";
            }
        }
        else{
            if(intervals[i].getAttribute("id") === idSelected1){
                intervals[i].style.background = "#0062cc";
            }
            else {
                intervals[i].style.background = "#42cef5";
            }
        }

    }

}

// choose the type of the sim, either a graph with only one time line or tow, trigger the simulation with the timeinterval id
function choseTypeSim(div) {
    console.log(div);
    if(typeSim != 2){

        updateBackgroundColor(div.getAttribute("id"),undefined);
        triggeSim(div.getAttribute("id"));
    }

    else if(typeSim === 2){
        console.log("typeSim == 2");
        dateToIterate = div.getAttribute("id");
        console.log(dateToIterate);
        let lastDate = document.getElementById("lineCont").getAttribute("lastDate");
        console.log(div.getAttribute("id"));
        console.log(lastDate);
        updateBackgroundColor(div.getAttribute("id"),lastDate);
        triggeSim(div.getAttribute("id"));
    }

}
function triggeSim(id){
    console.log("trigger Sim");
    dateToIterate = id;
    triggerSim = 1;
    if(exitSim === 1){
        triggerNewSim = true;
    }

}
function textContent(string,width){
    let lineDates = document.getElementById("lineDates");
    let text = document.createElement("div");
    text.className = "dateText";
    if(string != undefined){
        let titleString = string;
        let topString = titleString.split("/")[0] + "/" + titleString.split("/")[1] + "/" + titleString.split("/")[2];
        let bottomString = titleString.split("/")[3] + ":" + titleString.split("/")[4] + ":" + titleString.split("/")[5];
        text.textContent = topString+ "\r\n" + bottomString;
    }
    //console.log(width);
    //console.log(typeof width);
    text.style.width = timeIntervalBaseWidth + "%";
    lineDates.appendChild(text);

    let intervalWidth = width-timeIntervalBaseWidth;
    if(intervalWidth>0){
        //console.log(" novo intervalo datas")
        let intervalBetweenDates = document.createElement("div");
        intervalBetweenDates.className = "dateText";
        intervalBetweenDates.style.width = (width-timeIntervalBaseWidth) + "%";
        lineDates.appendChild(intervalBetweenDates);
    }


}
function makeTimeIntervals(dates)
{
    let timeIntervals = new Array();

    console.log(dates);

    let first = dates[0];
    let last = dates[dates.length - 1];

    let firstMonth = parseInt(first.split('/')[0]);
    let firstDay = parseInt(first.split('/')[1]);
    let firstHour = parseInt(first.split('/')[3]);
    let firstMinute = parseInt(first.split('/')[4]);

    let firstInt = (firstMonth*30*24*60+firstDay*24*60+firstHour*60+firstMinute);

    //Loop through middle dates
    let previousDateInt = firstInt;
    for (let i = 1; i < dates.length; i++) {

        //console.log("loop dates");
        let thisMonth = parseInt(dates[i].split('/')[0]);
        let thisDay = parseInt(dates[i].split('/')[1]);
        let thisHour = parseInt(dates[i].split('/')[3]);
        let thisMinute = parseInt(dates[i].split('/')[4]);
        //console.log(thisMonth);
        //console.log(thisDay);
        //Integer representation of the date
        //var thisInt = (((thisMonth - firstMonth) * 30) + (thisDay - firstDay))*24*60+ thisHour*60 +thisMinute;
        let thisInt = (thisMonth*30*24*60+thisDay*24*60+thisHour*60+thisMinute);

        //Integer relative to the first and last dates
        //let relativeInt = thisInt / lastInt;

        let intervalMinutes = thisInt-previousDateInt;  // number os minutes in this interval
        timeIntervals.push(intervalMinutes);
        previousDateInt = thisInt;
    }
    return timeIntervals;
    //console.log(timeIntervals);
}

function ratioTimeIntervals(timeIntervals,datesNewTimeLine) {
    let arrayMin = calcMin(timeIntervals);
    let minInterval = arrayMin[0];
    let ratioTimeIntervalsArray = new Array();
    //console.log(minInterval);
    for(let i=0;i<timeIntervals.length;i++){
        //console.log(timeIntervals[i]);
        ratioTimeIntervalsArray.push(timeIntervals[i]/minInterval);
    }
    return ratioTimeIntervalsArray;
}


function calcMin(timeIntervals){

    let minValue = 10000000;
    let minIndex = 0;
    for(let i=0;i<timeIntervals.length;i++){
        if(timeIntervals[i]<minValue){
            minValue = timeIntervals[i];
            minIndex = i;
        }
    }
    let arrayReturn = new Array();
    arrayReturn.push(minValue);
    arrayReturn.push(minIndex);

    return arrayReturn;
}
