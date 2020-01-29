function printEdges(EdgeArray){
  let arrayLength = EdgeArray.length;
  console.log("printEdges");
  console.log(EdgeArray);
  console.log("tamanho Edges:"+arrayLength);
  for(let i =0;i<arrayLength;i++){
      console.log(EdgeArray[i].from.name+";"+EdgeArray[i].to.name+";"+EdgeArray[i].numberCalls);
  }

}

function printServices(serviceArray)
{
    let arrayLengthPrint = serviceArray.length;
    console.log("tamanho:"+ arrayLengthPrint);
    console.log(serviceArray);
    for(let i =0;i<arrayLengthPrint;i++){
        console.log(serviceArray[i].name+"; x:" + serviceArray[i].x + ";y:"+ serviceArray[i].y);
    }
}
