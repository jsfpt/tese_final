
class nodeLink{
  constructor(name,neighbors){
    this.name = name;
    this.neighbors = neighbors;
  }

  setTotalNumberRequests(totalNumberRequests){
    this.totalNumberRequests = totalNumberRequests;
  }

  setAverageResponseTime(averageResponseTime){
    this.averageResponseTime = averageResponseTime;
  }

  setTotalRequestTime(totalRequestTime){
    this.totalRequestTime = totalRequestTime;
  }

  setTotalNumberRequestsPercentage(totalNumberRequestsPercentage){
    this.totalNumberRequestsPercentage = totalNumberRequestsPercentage;
  }

  setAverageTimePercentage(averageTimePercentage){
    this.AverageTimePercentage = averageTimePercentage;
  }


}

class link{
  constructor(source,target,count,color){
    this.source = source;
    this.target = target;
    this.count = count;
    this.color = color;
  }

  setHttpInfo(source,target,averageTime,totalRequests,color){
    this.source = source;
    this.target = target;
    this.averageTime = averageTime;
    this.totalRequests = totalRequests;
    this.color = color;
  }

  setHttpInfo(httpInfo){
    this.httpInfo = httpInfo;
  }

  setNumberTotalRequests(numberTotalRequests){
    this.numberTotalRequests = numberTotalRequests;
  }

  setAverageTime(averageTime){
    this.averageTime = averageTime;
  }

  setTotalTime(totalTime){
    this.totalTime = totalTime;
  }


  setTotalRequestTime(totalRequestTime){
    this.totalRequestTime = totalRequestTime;
  }


  setTotalNumberRequestsPercentage(totalNumberRequestsPercentage){
    this.totalNumberRequestsPercentage = totalNumberRequestsPercentage;
  }


  setAverageTimePercentage(averageTimePercentage){
    this.AverageTimePercentage = averageTimePercentage;
  }


  setAverageResponseTime(averageResponseTime){
    this.averageResponseTime = averageResponseTime;
  }


  color(newColor){
    this.color = newColor;
  }








}

class setOfServices{

  constructor(description,services){
    this.description;
    this.services;
  }

}


class neighbors{
  constructor(serviceFrom,services){
    this.serviceFrom = serviceFrom;
    this.services = services;
  }


  setTotalNumberRequests(totalNumberRequests){
    this.totalNumberRequests = totalNumberRequests;
  }

  setAverageResponseTime(averageResponseTime){
    this.averageResponseTime = averageResponseTime;
  }

  setTotalRequestTime(totalRequestTime){
    this.totalRequestTime = totalRequestTime;
  }

  setTotalNumberRequestsPercentage(totalNumberRequestsPercentage){
    this.totalNumberRequestsPercentage = totalNumberRequestsPercentage;
  }

  setAverageTimePercentage(averageTimePercentage){
    this.AverageTimePercentage = averageTimePercentage;
  }




}

class Service{

  // Add http info
  constructor(instanceName,serviceName) {
    this.name = instanceName;
    this.serviceName = serviceName;
    this.low =  0;
    this.visited = false;

  }

  setXY(x,y){
    this.x = x;
    this.y = y;
  }


  set coordinateX(x){
    this.coordinatX = x;
  }

  set coordinateY(y){
    this.coordinatY = y;
  }

  color(newColor){
    this.color = newColor;
  }

  setHttpInfo(httpInfo){
    this.httpInfo = httpInfo;
  }
  setInstances(instances){
    this.instances = instances;
  }

  setTotalNumberRequests(totalNumberRequests){
    this.totalNumberRequests = totalNumberRequests;
  }

  setAverageResponseTime(averageResponseTime){
    this.averageResponseTime = averageResponseTime;
  }

  setTotalRequestTime(totalRequestTime){
    this.totalRequestTime = totalRequestTime;
  }

  setTotalNumberRequestsPercentage(totalNumberRequestsPercentage){
    this.totalNumberRequestsPercentage = totalNumberRequestsPercentage;
  }

  setAverageTimePercentage(averageTimePercentage){
    this.AverageTimePercentage = averageTimePercentage;
  }

  setVisitedParam(visited){
    this.visited = visited;
  }

  setLow(low){
    this.low = low;
  }


  setDrawText(drawText){
    this.drawText = drawText;
  }


}

class EdgeComponet{
  constructor(from,to,numberCalls){
    this.from = from;
    this.to = to;
    this.numberCalls = numberCalls;
  }

  setTotalNumberRequests(totalNumberRequests){
    this.totalNumberRequests = totalNumberRequests;
  }

  setAverageResponseTime(averageResponseTime){
    this.averageResponseTime = averageResponseTime;
  }

  setTotalRequestTime(totalRequestTime){
    this.totalRequestTime = totalRequestTime;
  }

  setTotalNumberRequestsPercentage(totalNumberRequestsPercentage){
    this.totalNumberRequestsPercentage = totalNumberRequestsPercentage;
  }

  setAverageTimePercentage(averageTimePercentage){
    this.AverageTimePercentage = averageTimePercentage;
  }


}

class Edge{

  constructor(from,to,numberCalls) {
    this.from = from;
    this.to = to;
    this.numberCalls = numberCalls;
  }

  setHttpInfo(httpInfo){
    this.httpInfo = httpInfo;
  }

  setNumberTotalRequests(numberTotalRequests){
    this.numberTotalRequests = numberTotalRequests;
  }



  setAverageTime(averageTime){
    this.averageTime = averageTime;
  }

  setTotalTime(totalTime){
    this.totalTime = totalTime;
  }


  setTotalRequestTime(totalRequestTime){
    this.totalRequestTime = totalRequestTime;
  }


  setTotalNumberRequestsPercentage(totalNumberRequestsPercentage){
    this.totalNumberRequestsPercentage = totalNumberRequestsPercentage;
  }


  setAverageTimePercentage(averageTimePercentage){
    this.AverageTimePercentage = averageTimePercentage;
  }

  setTotalNumberRequests(totalNumberRequests){
    this.totalNumberRequests = totalNumberRequests;
  }

  setAverageResponseTime(averageResponseTime){
    this.averageResponseTime = averageResponseTime;
  }




  color(newColor){
    this.color = newColor;
  }

}



Edge.prototype.toString = function dogToString() {
  return this.from + " , " +this.to + " , "+ this.number+ "\n";
};


Service.prototype.toString = function dogToString() {
  return this.name + " , " +this.x + " , "+ this.y+ "\n";
};
