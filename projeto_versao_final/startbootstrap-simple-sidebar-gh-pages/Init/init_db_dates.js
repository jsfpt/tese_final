
function init_DB_dates(){

  var initDBResponse = initDB();
  //console.log(initDBResponse);
    //console.log("init done");
  //dates =  constructTimeLineByDates(initDBResponse);
  let datesDegub =  constructTimeLineByDates(initDBResponse);
  datesDegub.pop();
  //console.log(datesDegub);

  //init(datesDegub);


  var getDate = getConfig(); //currentDate-timeInterval-EndTime
  console.log(getDate);
  var initDate = getDate.split("-")[0];
  var timeInterval = getDate.split("-")[1];
  var finalTime = getDate.split("-")[2];

  var iterations = parseInt((finalTime-initDate)/timeInterval);
  var date = initDate;
  var dateInterval = timeInterval;

  dates =  constructDates(date,iterations,dateInterval/60); // minutos
  /*console.log("dates mal:")
  console.log(dates)
  console.log("dates bem:")
  console.log(datesDegub)*/
  //init(dates);   // timeline/script.js


  //init(datesDegub);   // timeline/script.js

  initNewTimeLine(datesDegub);



  console.log("---INIT DONE----");

}

function constructTimeLineByDates(datesString){
  //1574265242-1574265302-1574265362-1574265422-1574265482-1574265542-1574265602-1574265662-1574265722-
  let datesArray = datesString.split("-");
  let arrayDates = new Array();
  //console.log("tamanho loop");
  //console.log(datesArray.length);
  for(let i=0;i<datesArray.length;i++){
    let initDateStringFormat = new Date(datesArray[i] * 1000);

    //console.log(initDateStringFormat);
    let year = initDateStringFormat.getFullYear();
    let month = initDateStringFormat.getMonth();
    let day = initDateStringFormat.getDate();
    let hour = initDateStringFormat.getHours();
    let minutes = initDateStringFormat.getMinutes();
    let seconds = initDateStringFormat.getSeconds();
    let dateString = ""+ day+"/"+month+"/"+year+"/"+hour+"/"+minutes+"/"+seconds;
    //console.log(dateString);
    arrayDates.push(dateString);
  }
//  console.log(arrayDates);
  return arrayDates;

}


function constructDates(initDates,iterations, timeInterval){
  console.log(initDates,iterations,timeInterval)
  iterations = parseInt(iterations);
  timeInterval = parseInt(timeInterval);
  console.log("construct dates inside");
  var arrayDates = new Array();
  var newDateObj;
  console.log(typeof initDate);
  console.log(typeof iterations);
  console.log(typeof timeInterval);
  var initDateStringFormat;
  //console.log(initDates);
  //console.log(iterations);
  ///console.log(timeInterval);
  console.log("dates:");
  for(var i=0; i < iterations;i++){
    if(i>100){
      return;
    }

    if(i==0){
      initDateStringFormat = new Date(initDates * 1000);
    }

    else {
      initDateStringFormat = new Date(newDateObj);
    }
    //console.log(initDateStringFormat);
    var year = initDateStringFormat.getFullYear();
    var month = initDateStringFormat.getMonth();
    var day = initDateStringFormat.getDate();
    var hour = initDateStringFormat.getHours();
    var minutes = initDateStringFormat.getMinutes();
    var seconds = initDateStringFormat.getSeconds();
    var dateString = ""+ day+"/"+month+"/"+year+"/"+hour+"/"+minutes+"/"+seconds;
    //console.log(dateString);

    newDateObj = moment(initDateStringFormat).add(timeInterval, 'm').toDate();
    //console.log(newDateObj);
    arrayDates.push(dateString);
  }
//  console.log(arrayDates);
  return arrayDates;
}
