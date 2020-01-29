
function findNodeInAArrray(node,array){

  for(let i=0;i<array.length;i++){
    if(node.name === array[i].name){
      //console.log("found on iteration "+i);
      return true;
    }
  }
  return false;

}

function findEdgeInAArray(link,array){
  for(let i=0;i<array.length;i++){

    if(link.from.name === array[i].from.name && link.to.name === array[i].to.name ){
      //console.log("found on iteration "+i);
      //console.log("edge");
      return true;
    }
  }
  return false;
}


function findService(name,serviceWhereToFind)
{
  let arrayLength = serviceWhereToFind.length;
  for (let i = 0; i < arrayLength; i++)
  {
      if(serviceWhereToFind[i].name === name){
          //console.log("Found");
          return serviceWhereToFind[i];
      }
  }
  return "Not found";

}
