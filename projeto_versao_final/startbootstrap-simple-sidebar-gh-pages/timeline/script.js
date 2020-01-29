//Sample dates
//var dates = ["6/12/2015", "8/15/2015", "10/22/2015", "11/2/2015", "12/22/2015"];
//For the purpose of stringifying MM/DD/YYYY date format
var monthSpan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Format MM/DD/YYYY into string


function initDates(newDates){
  dates = newDates;
}

//
function dateSpan(date) {

  // 6/12/2015/45/10/23
  //          s   m   h
  //console.log(date);

  var month = date.split('/')[1];
  //console.log(month);
  month = monthSpan[month - 1];
  var day = date.split('/')[0];
  if (day.charAt(0) == '0') {
    day = day.charAt(1);
  }
  var year = date.split('/')[2];
  var seconds  = date.split('/')[3];
  var minutes = date.split('/')[4];
  var hour = date.split('/')[5];
  //console.log();
  //Spit it out!
  var dateReturn = month + " " + day + ", " + year + "-" + hour+ ":" +minutes+":"+ seconds ;
  //console.log(dateReturn);
  return dateReturn;
}

//Main function. Draw your circles.


function makeCircles(dates) {
  console.log(dates);
  //Forget the timeline if there's only one date. Who needs it!?
  if (dates.length < 2) {
    $("#line").hide();
    $("#span").show().text(dateSpan(dates[0]));
    //This is what you really want.
  } else if (dates.length >= 2) {

    //Set day, month and year variables for the math
    var first = dates[0];
    var last = dates[dates.length - 1];

    var firstMonth = parseInt(first.split('/')[0]);
    var firstDay = parseInt(first.split('/')[1]);
    var firstHour = parseInt(first.split('/')[3]);
    var firstMinute = parseInt(first.split('/')[4]);

    var lastMonth = parseInt(last.split('/')[0]);
    var lastDay = parseInt(last.split('/')[1]);

    var lastHour = parseInt(last.split('/')[3]);
    var lastMinute = parseInt(last.split('/')[4]);

    //Integer representation of the last day. The first day is represnted as 0
    //var lastInt = ((lastMonth - firstMonth) * 30) + (lastDay - firstDay);

    // soma dos minutos entre a primeira data e a ultima
    //var lastInt = (((lastMonth - firstMonth) * 30) + (lastDay - firstDay))*24*60 + (lastHour) + (lastMinute);
    var lastInt = (lastMonth*30*24*60+lastDay*24*60+lastHour*60+lastMinute) - (firstMonth*30*24*60+firstDay*24*60+firstHour*60+firstMinute);
    console.log(lastInt);

    //Draw first date circle
    $("#line").append('<div class="circle" id="circle0"'  + '"relativeInt ="'+String(0)+" "+'style="left: ' + 0 + '%;"><div class="popupSpan">' + dateSpan(dates[0]) + '</div></div>');
    //$("#line").append('<div class="verticalLine" style="left: ' + 0 + '%;"></div>');

    $("#mainCont").append('<span id="span0" class="center">' + dateSpan(dates[0]) + '</span>');

    //Loop through middle dates
    for (i = 1; i < dates.length - 1; i++) {
      //console.log("loop dates");
      var thisMonth = parseInt(dates[i].split('/')[0]);
      var thisDay = parseInt(dates[i].split('/')[1]);
      var thisHour = parseInt(dates[i].split('/')[3]);
      var thisMinute = parseInt(dates[i].split('/')[4]);
      //console.log(thisMonth);
      //console.log(thisDay);
      //Integer representation of the date
      //var thisInt = (((thisMonth - firstMonth) * 30) + (thisDay - firstDay))*24*60+ thisHour*60 +thisMinute;
      var thisInt = (thisMonth*30*24*60+thisDay*24*60+thisHour*60+thisMinute) - (firstMonth*30*24*60+firstDay*24*60+firstHour*60+firstMinute);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#line").append('<div class="circle" id="circle' + i +
      '"relativeInt ="'+String(relativeInt)+" "+'" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + dateSpan(dates[i]) + '</div></div>');


     // $("#line").append('<div class="verticalLine" style="left: ' + relativeInt * 100 + '%;"></div>');

      $("#mainCont").append('<span id="span' + i + '" class="right">' + dateSpan(dates[i]) + '</span>');
    }
    //'"relativeInt ="'+String(relativeInt)+" "
    //Draw the last date circle
    $("#line").append('<div class="circle" id="circle' + i +  '"relativeInt ="'+String(1)+" "+ '" style="left: ' + 99 + '%;"><div class="popupSpan">' + dateSpan(dates[dates.length - 1]) + '</div></div>');

    $("#mainCont").append('<span id="span' + i + '" class="right">' + dateSpan(dates[i]) + '</span>');
  }

  $(".circle:first").addClass("active");
}

//init(dates);

function init(newDates){

  console.log("init");
  dates = newDates;
  console.log(dates);
  makeCircles(dates);

  $(".circle").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".circle").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $(".circle").click(function() {
    var spanNum = $(this).attr("id");
    dateToIterate = spanNum.replace('circle','')-1;

    console.log(dateToIterate);
    selectDate(spanNum);
  });
  console.log("end of init");

}

function selectDate(selector) {
  triggerSim = 1;

  // have 2 dates actives

  // remove active from first date to be selected

  // add active to the new date, aka, selector


  // get previous id
  var lastDate = document.getElementById("lineCont").getAttribute("lastDate");
  //console.log(typeof lastDate);
  var lastDateInt = parseInt(lastDate);
  //console.log(typeof lastDateInt);
  lastDateInt+=1;

  datePrevious = "circle"+String(lastDateInt);
  console.log(datePrevious);
  console.log(selector);
  $selectorPrevious = "#" + datePrevious;
  $spanSelectorPrevious = $selectorPrevious.replace("circle", "span");

  exitSim = 1;
  $selector = "#" + selector;
  $spanSelector = $selector.replace("circle", "span");
  //var current = $selector.replace("circle", "");



  $(".active").removeClass("active");

  $($selectorPrevious).addClass("active");

  $($selector).addClass("active");

  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left")
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right")
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  };
  triggerNewSim = true;
  //triggerAllSims();

};
