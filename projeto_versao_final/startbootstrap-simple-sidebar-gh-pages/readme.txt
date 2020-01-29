
############################################################################################
This web application is a tool to visualize the arquitecture of a microsservices application
############################################################################################



############################################################################################
The main capabilities are:

	Show the arquitecture of the service dependecies and their instances

	Compare 2 differente time intervals

	An iterative graph, allows to join the information to a better visualization

############################################################################################

How to use:

The main html page is index.html

To use the aplication it is needed to have a REST Server that implements certain funcions, as follows:


 Url to get the information:
 	"http://localhost:8080/CrunchifyRESTJerseyExample/crunchify/requestHandler"
 	
	Params: 

		Init the creation of the data: String: "init"

		Get the graph data: String:"date-12435", date-timeID

 		Get the info about the requests: String:"dateInflux-124354" dateInflux-timeId


##########################################################################################

Data format

It is used 4 different data formats in the REST function:

	Init the data file:

		init.txt

	Get the graph data file:

		getGraphData.txt

	Get the requests data file:
		getInfluxData.txt




	    
  