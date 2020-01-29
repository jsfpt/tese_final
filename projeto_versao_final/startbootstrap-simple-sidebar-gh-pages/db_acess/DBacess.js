function getDataJSON(dateToRepresent)
{

 const url = "http://localhost:8080/CrunchifyRESTJerseyExample/crunchify/ctofservice/";
 let params = "iteration="+dateToRepresent;

 let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url+"?"+params, false); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getDataConfig(){

   const url = "http://localhost:8080/CrunchifyRESTJerseyExample/crunchify/config/";

   let xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", url, false ); // false for synchronous request
      xmlHttp.send( null );
      return xmlHttp.responseText;

}

function initDB(){
  const url = "http://localhost:8080/CrunchifyRESTJerseyExample/crunchify/requestHandler";
  let params = "request="+"init";
  let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url+"?"+params, false); // false for synchronous request
     xmlHttp.send( null );
     return xmlHttp.responseText;
}

function getConfig(){
    console.log("get config")
  const url = "http://localhost:8080/CrunchifyRESTJerseyExample/crunchify/requestHandler";
  let params = "request="+"config";

  let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url+"?"+params, false); // false for synchronous request
     xmlHttp.send( null );
     return xmlHttp.responseText;

}


function getGraphByDate(date){
  // parameter: date-124353
  let dateString = "date-"+date;
  let url = "http://localhost:8080/CrunchifyRESTJerseyExample/crunchify/requestHandler";
  let params = "request="+dateString;

  let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url+"?"+params, false); // false for synchronous request
     xmlHttp.send( null );
     return xmlHttp.responseText;
}



function getGraphByDateInflux(date){
    // parameter: date-124353
    let dateString = "dateInflux-"+date;
    let url = "http://localhost:8080/CrunchifyRESTJerseyExample/crunchify/requestHandler";
    let params = "request="+dateString;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url+"?"+params, false); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
