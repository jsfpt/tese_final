
function updateServiceCoordinates(d)
{
  console.log("UPDATE");
  var arrayLength = serviceArray.length;
  for (var i = 0; i < arrayLength; i++)
  {
      if(serviceArray[i].name == d.name){
        console.log("---FIND------:"+d.name);
        console.log("\tX:"+d.x+" Y:"+d.y);
        serviceArray[i].x = d.x;
        serviceArray[i].y = d.y;
      }
  }

}


function updateCoordinates(d,serviceArray)
{
  var arrayLength = serviceArray.length;
  for (var i = 0; i < arrayLength; i++)
  {
      if(serviceArray[i].name == d.source.name){
          //console.log("Found");
          /*serviceArray[i].coordinateX(d.source.x);
          serviceArray[i].coordinateY(d.source.y);*/

          serviceArray[i].coordinateX = d.source.x;
          serviceArray[i].coordinateY = d.source.y;
      }
  }

  for (var i = 0; i < arrayLength; i++)
  {
      if(serviceArray[i].name == d.target.name){
          //console.log("Found");
          serviceArray[i].coordinateX = d.target.x;
          serviceArray[i].coordinateY = d.target.y;
      }
  }


}
