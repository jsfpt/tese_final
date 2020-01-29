package arangoManager;

import java.awt.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.sql.Array;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.GregorianCalendar;
import java.util.Random;
import java.util.TimeZone;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ThreadPoolExecutor.CallerRunsPolicy;

import javax.sound.midi.Soundbank;
import javax.swing.text.Document;

import org.influxdb.InfluxDB;

import com.arangodb.ArangoCollection;
import com.arangodb.ArangoCursor;
import com.arangodb.ArangoDB;
import com.arangodb.ArangoDBException;
import com.arangodb.ArangoDatabase;
import com.arangodb.ArangoVertexCollection;
import com.arangodb.ArangoDB.Builder;
import com.arangodb.entity.BaseDocument;
import com.arangodb.entity.CollectionEntity;
import com.arangodb.entity.CollectionType;
import com.arangodb.entity.DocumentField;
import com.arangodb.entity.EdgeDefinition;
import com.arangodb.entity.EdgeEntity;
import com.arangodb.entity.GraphEntity;
import com.arangodb.model.CollectionCreateOptions;
import com.arangodb.entity.DocumentField.Type;


import com.google.gson.*;
import com.google.gson.reflect.TypeToken;

import classes.Edge;
import classes.Service;
import classes.edgeInfoByTimeStamp;
import classes.link;
import classes.node;

import java.net.*;
import java.io.*;

//import influxdb_crud.*;
// NAO ESTÁ A TIRAR OS EDGES BEM, CONTINUA COM A KEY, DEVIA TER O LABEL, VER FUNCÃO DO CONSTRUCT EDGE


//sudo /usr/sbin/arangod --server.authentication false
//https://www.programcreek.com/java-api-examples/?api=com.arangodb.entity.EdgeDefinition

//web page html + javascript connect to rest api
//https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
//https://medium.com/@kasunpdh/sample-java-web-application-using-servlets-and-jsp-5621cad2f582

//rest api + jersey
//https://www.youtube.com/watch?v=5jQSat1cKMo


//graphviz java
//https://github.com/nidi3/graphviz-java

//graphbic


// rest api
//https://tobias.blickle.online/using-tomcat-java-rest-server


public class App 
{

	static Long currentDate;
	static Long timeInterval;
	static Long endTime;

	static ArrayList<String> datesIteration= new ArrayList<String>();
	
	public static ArrayList<node> nodeList = new ArrayList<node>();
	public static ArrayList<link> linkList = new ArrayList<link>();

	public static 	String dbName = "mydb";

	public Crud_influx crudInflux;
	public InfluxDB influxdb;
	

	
	

	// define how many times the graph will be iterated
	// save each graph iteration in json files with a number to identify the iteration
	// to synchronize the front-end with the rest interface, send a json that describes how many times the graph is iterated

	
	
	public static ArrayList<String> constructGraphInitTimeEndTime(ArangoDatabase db, long initTime,long endTime, long timeInterval, String graphName) throws ArangoDBException, InterruptedException, ExecutionException, IOException {
		// Function to init the graphs by time
		// Construct a initial graph, by a set of probabilities and if one property of the graph changes, a instance of it will be created

		
		datesIteration= new ArrayList<String>();
		// first iteration
		dynamicChangeGraph dynaGraph = new dynamicChangeGraph();
		ArrayList<Service> serviceArray =  dynaGraph.createGraph  (30, 40,100);  // low high instances, return array of populated services
		ArrayList<Edge> edgeArray = dynaGraph.addEdgesToGraph(serviceArray, 0.02, serviceArray.size());  // prob to link to a edge
		crud_arango.addServicesEdgesToDb(db, serviceArray, edgeArray,Long.toString(initTime),Long.toString(initTime));  // graphName: currentDateSeconds

		System.out.println("Init Time:"+initTime+"\nEndTime:"+endTime+"\nTimeInterval:"+timeInterval+"Numero Interações:"+(endTime-initTime)/timeInterval);
		String lastGraphModified = Long.toString(initTime);
		datesIteration.add(lastGraphModified);
		//System.out.println("First iteration:\n\tEdge added:"+serviceArray.size()+"\n\tEdges added:"+edgeArray.size());
		int contador=0;
		
		//arrayOperations.printServiceArray(serviceArray);
		
		for(long i=initTime+timeInterval;i<endTime;i+=timeInterval) {
			
			// something is going to change
			// need to create the collections to the new iteration
			//System.out.println("\n\n-----------------------New graph iteration----------------");
			ArrayList<Service> serviceList = crud_arango.getAllNodesAndInstancesDB(db,lastGraphModified);	
			//System.out.println("Size of the service list:"+serviceList.size());
			ArrayList<Edge> edgelist = crud_arango.getEdgesFromDB(db,lastGraphModified);
			ArrayList<Edge> finalEdgeList = new ArrayList<Edge>();
			finalEdgeList = crud_arango.constructEdgeArrayBySourceAndTarget(edgelist, db,lastGraphModified);	
			//System.out.println("Size of the edge list:"+finalEdgeList.size());
			crud_arango.addServicesEdgesToDb(db, serviceList, finalEdgeList,Long.toString(i),Long.toString(i));  



			// ----------------- Functions to modify the graph 


			dynamicChangeGraph dynaGraph1 = new dynamicChangeGraph();
			boolean removeEdge = dynaGraph1.removeEdges(db,0.05,Long.toString(i));  // esta a remover os edges todos de cada vez, probabilidade para cada um, tipo o de adicionar
			boolean removeService = dynaGraph1.removeService(db, 0.2,Long.toString(i));
			

			ArrayList<Service> serviceListBeforeModification = crud_arango.getAllNodesAndInstancesDB(db,Long.toString(i));			

			// ---------------------- add a service by a prob ---------------------------
			boolean addedService = addServiceDB.addServiceByProb(db, 0.2, serviceListBeforeModification,6,0.1,i,Long.toString(i),Long.toString(i));                        // ERROR, THE NEW SERVICE LINKS ARE WRONGLY MADE
			//addServiceByProb(ArangoDatabase db,double probAddService,ArrayList<Service> serviceArray,int numberInstances,double probLink,long date,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {

			// --------------------------------------------------------------------------	

			// ---------------------- add a link by a prob ------------------------------

			dynamicChangeGraph.addLinkByAProbability(db, 0.02,Long.toString(i),Long.toString(i));   // pass the collection last parameter
			// --------------------------------------------------------------------------

			if((removeEdge == true) || (removeService == true) || (addedService == true)) {
				contador++;
				lastGraphModified = Long.toString(i);
				datesIteration.add(lastGraphModified);
				
			}

		}
		System.out.println("dates iteration size:"+datesIteration.size());
		System.out.println("numeor de datas added:"+contador);
		return datesIteration; 
	}

	

	public static String getGraphByDate(String date) throws IOException {
		String linkJsonFileName = "link.json";
		String nodeJsonFileName = "node.json";


		Builder arangoDB1 = new ArangoDB.Builder().host("127.0.0.1", 8529);
		arangoDB1.password("arangodb123");
		arangoDB1.user("myuser");

		ArangoDB arangoDB = arangoDB1.build();
		// ArangoDB.Builder().host("localhost", 8529).user("root").password(null);

		String dbName = "mydb";
		try {
			arangoDB.createDatabase(dbName);
			System.out.println("Database created: " + dbName);
		} catch (ArangoDBException e) {
			System.err.println("Failed to create database: " + dbName + "; " + e.getMessage());
		}
		ArangoDatabase db = arangoDB.db(dbName);



		ArrayList<Service> serviceList = crud_arango.getAllNodesAndInstancesDB(db,date);	
		ArrayList<Edge> edgelist = crud_arango.getEdgesFromDB(db,date);
		ArrayList<Edge> finalEdgeList = new ArrayList<Edge>();
		finalEdgeList = crud_arango.constructEdgeArrayBySourceAndTarget(edgelist, db,date);	
		
		arrayOperations.printServiceArray(serviceList);
		ArrayList<node> nodeList = ClassesTransform.transformServiceToNodeInstances(serviceList);
		ArrayList<link> linkList = ClassesTransform.transformEdgeToLink(finalEdgeList);	
		
		arrayOperations.printNodeArray(nodeList);
		
		JsonFunctions.nodeListToJson(nodeList, nodeJsonFileName);
		JsonFunctions.linkToJson(linkList, linkJsonFileName);
		return JsonFunctions.mergeJsonFiles(nodeJsonFileName, linkJsonFileName,-1);		// Modify to return a string

	}

		
	// Não está a mandar as datas certas
	
	public static String initDB(String dbNameInflux,InfluxDB influxdb) throws ArangoDBException, InterruptedException, ExecutionException, IOException {
		String graphName = "proto5";
		int numberIterations = 30;
		System.out.println("Hello World");
		Builder arangoDB1 = new ArangoDB.Builder().host("127.0.0.1", 8529);
		arangoDB1.password("arangodb123");
		arangoDB1.user("myuser");

		ArangoDB arangoDB = arangoDB1.build();
		// ArangoDB.Builder().host("localhost", 8529).user("root").password(null);

		String dbName = "mydb";
		try {
			arangoDB.createDatabase(dbName);
			System.out.println("Database created: " + dbName);
		} catch (ArangoDBException e) {
			System.err.println("Failed to create database: " + dbName + "; " + e.getMessage());
		}
		ArangoDatabase arango = arangoDB.db(dbName);

	
		crud_arango.cleanDataBase(arango);
		
		


		currentDate = (long) 0;
		timeInterval = (long) 0;
		endTime = (long) 0;


		currentDate = System.currentTimeMillis()/1000;
		timeInterval = (long) 1 *60; //1 min
		endTime = currentDate + numberIterations * timeInterval;


	
		ArrayList<String> dates =  constructGraphInitTimeEndTime(arango,currentDate, endTime, timeInterval, graphName);
		//System.out.println("tamanho das datas:"+ dates.size());
		String datesStringFormat = "";
		for(String date:dates) {
			//System.out.println(date);
			datesStringFormat+=date+"-";
		}
		
		Crud_influx crudInflux = new Crud_influx();
		
		influxDataCreation.createRequestData(dates,arango,influxdb,dbNameInflux);
		
		crudInflux.getEdgeInfoPointByTimeStamp(Long.parseLong(dates.get(1)), influxdb);
		//configsJSONFile(dates);

		
		System.out.println("----------------- DONE ----------------- ");
		return datesStringFormat;

	}

	public static String listenRequests() throws IOException, ArangoDBException, InterruptedException, ExecutionException {

		ServerSocket serverSocket;
		Socket clientSocket;
		PrintWriter out;
		BufferedReader in;
		int port = 2000;

		serverSocket = new ServerSocket(port);
        clientSocket = serverSocket.accept();
   
        in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        out = new PrintWriter(clientSocket.getOutputStream(), true);
        
        //String input = in.readLine();
        String input;
        String dbNameInflux = "baeldung";
        Crud_influx crudInflux = new Crud_influx();
		InfluxDB influxdb;

		influxdb =  crudInflux.initDbInflux(dbNameInflux);

        while ((input = in.readLine()) != null) {
        	System.out.println("request received");
        	System.out.println(input);
            if (".".equals(input)) {
                out.println("good bye");
                
                break;
             }
            if ("init".equals(input)) {
            	crudInflux = new Crud_influx();
            	String response = initDB(dbNameInflux,influxdb);
            	sendResponse(response);
            	break;
            }
            
            // date-124353, get all information on ArangoDB about a specific time interval
            if(input.split("-")[0].equals("date")) {
            	String date = input.split("-")[1];
            	String dateParameter = datesIteration.get(Integer.parseInt(date));
            	String graphResponse = getGraphByDate(dateParameter);
            	System.out.println("response to send:");
            	System.out.println(graphResponse);
            	// send response to socket
            	System.out.print(graphResponse);
            	sendResponse(graphResponse);
            }
            
            // dateInflux-124353, get the influxDB info about a time interval 
            if(input.split("-")[0].equals("dateInflux")) {
            	System.out.println("----------get Influx data by date --------");
            	String date = input.split("-")[1];
            	String dateParameter = datesIteration.get(Integer.parseInt(date));
            	// crud get by date
            	//crudInflux.getEdgeInfoPointByTimeStamp(Long.parseLong(dates.get(1)), influxdb);
            	String InfluxResponse = Crud_influx.getEdgeInfoPointByTimeStamp(Long.parseLong(dateParameter), influxdb);
            	InfluxResponse = InfluxResponse.replace("\n", "").replace("\r", "");
            	//System.out.println("response to send:");
            	//System.out.println(InfluxResponse);
            	// send response to socket
            	System.out.println(InfluxResponse);
            	System.out.print(InfluxResponse);
            	sendResponse(InfluxResponse);
            }
            
            if(input.equals("config")) {
            	out.print(getConfig());
            	sendResponse(getConfig());
            	
            }
        }
        serverSocket.close();
        clientSocket.close();
        return "";
        
	}
	public static void sendResponse(String response) throws UnknownHostException, IOException{
		System.out.println("sending response...");
		
		Socket clientSocket;
	    PrintWriter out;
	    BufferedReader in;
	    String ip = "127.0.0.1";
	    int port = 2002;
	    //String request = "init";
        clientSocket = new Socket(ip, port);
        out = new PrintWriter(clientSocket.getOutputStream(), true);
        in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
   
        out.println(response);
        clientSocket.close();
	}
	
	public static String getConfig() {
		String configString = "";
		configString+= Long.toString(currentDate)+"-"+Long.toString(timeInterval)+"-"+Long.toString(endTime);
		return configString;
		
	}

	public static void main(String args[])
			throws ArangoDBException, InterruptedException, ExecutionException, IOException {
		
		while(true) {
			listenRequests();
		}
		
	}
	
	

}
