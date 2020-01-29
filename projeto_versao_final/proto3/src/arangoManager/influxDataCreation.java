package arangoManager;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

import javax.swing.JSpinner.DateEditor;

import org.influxdb.InfluxDB;

import com.arangodb.ArangoDatabase;
import com.owlike.genson.convert.DefaultConverters.PrimitiveConverterFactory.booleanConverter;

import classes.Edge;
import classes.Edge_Influx;
import classes.edgeInfoByTimeStamp;
import classes.httpInfo_influx;

public class influxDataCreation {
	
	public static httpInfo_influx changeHttpInfo_influxEdge(httpInfo_influx httpInfoIterated) {
		// change http code
		if(Math.random() < 0.1) {
			httpInfoIterated.setCode(getRandomHttpCodeFromFile());
		}
		if(Math.random() < 0.7) {
			int averageTime = httpInfoIterated.getMeanTime();
			//System.out.println("number requests:"+averageTime);
			httpInfoIterated.setMeanTime(getRandomNumber(averageTime -(averageTime/2),averageTime +(averageTime/2) ));
		}
		if(Math.random() < 0.7) {
			int numberRequests = httpInfoIterated.getNumberRequests();
			//System.out.println("number requests:"+numberRequests);
			httpInfoIterated.setNumberRequests(getRandomNumber(numberRequests -(numberRequests/2),numberRequests + (numberRequests/2)));
			
		}
		return httpInfoIterated;
		
		
	}
	
	public static ArrayList<Edge_Influx> changeHttpDataFromArango(String dateIterated,ArrayList<Edge_Influx> lastEdgeInfluxList,ArangoDatabase db,InfluxDB influx,String dbName) throws IOException{
		
		// change data from influxdb
		// get edge info list from db
		ArrayList<Edge> edgelist = crud_arango.getEdgesFromDB(db,dateIterated);
		ArrayList<Edge> finalEdgeList = new ArrayList<Edge>();
		finalEdgeList = crud_arango.constructEdgeArrayBySourceAndTarget(edgelist, db,dateIterated);	
		//System.out.println(finalEdgeList);
		ArrayList<Edge_Influx> listEdge_Influx = new ArrayList<Edge_Influx>();
		//for each edge:
		for(Edge edgeIterated : finalEdgeList) {  // iterate over edge array
			// check if its a new edge, compare to the previous list of http data
			Edge_Influx checkAlreadyAdded = checkEdgeInListInflux(edgeIterated, lastEdgeInfluxList); 
			if( checkAlreadyAdded != null) {
				// No: Get data to the edge from list and change variables
				ArrayList<httpInfo_influx> httpCodesList = new ArrayList<httpInfo_influx>();
				for(httpInfo_influx httpInfoIterated : checkAlreadyAdded.getHttpCodesList()) {
					httpInfo_influx newHttpInfo = changeHttpInfo_influxEdge(httpInfoIterated);
					httpCodesList.add(newHttpInfo);
				}
				Edge_Influx newEdge_Influx = new Edge_Influx(checkAlreadyAdded.getFrom(), checkAlreadyAdded.getTarget(),httpCodesList);
				listEdge_Influx.add(newEdge_Influx);
				
				//listEdge_Influx.add(edgeInflux);
				
				
			}
			else {
				// Yes: add all data related to the edges added
				Edge_Influx  edgeInflux = createHttpData(edgeIterated, 0, 0);
				listEdge_Influx.add(edgeInflux);
				
			}
				 
		}
		// Add new edge Info to influxDB 
		edgeInfoByTimeStamp edgeInfluxTimestamp = new edgeInfoByTimeStamp(Long.parseLong(dateIterated),listEdge_Influx);
		Crud_influx.addEdgeListInflux(edgeInfluxTimestamp, dbName, influx);		
		return listEdge_Influx;
	}
	
	public static Edge_Influx checkEdgeInListInflux(Edge edgeIterated,ArrayList<Edge_Influx> lastEdgeInfluxList) {
		for(Edge_Influx edgeInfluxIterated : lastEdgeInfluxList) {
			if((edgeInfluxIterated.getFrom().equals(edgeIterated.getFrom())) && edgeInfluxIterated.getTarget().equals(edgeIterated.getTo())) {
				return edgeInfluxIterated;
			}
		}
		return null;
		
	}
	
	public static ArrayList<Edge_Influx> createHttpDataFromArango(String dateIterated,ArangoDatabase db,InfluxDB influx,String dbName) throws IOException {
		// get edges from arango
		
		ArrayList<Edge> edgelist = crud_arango.getEdgesFromDB(db,dateIterated);
		ArrayList<Edge> finalEdgeList = new ArrayList<Edge>();
		finalEdgeList = crud_arango.constructEdgeArrayBySourceAndTarget(edgelist, db,dateIterated);	
		//System.out.println(finalEdgeList);
		ArrayList<Edge_Influx> listEdge_Influx = new ArrayList<Edge_Influx>();
		for(Edge edgeIterated : finalEdgeList) {  // iterate over edge array
			
			// call createHttpData for each Data
			Edge_Influx  edgeInflux = createHttpData(edgeIterated, 0, 0);
			// save edge_influx from previous function to listEdge_Influx
			listEdge_Influx.add(edgeInflux);
			
		}
		
		// save array listEdge_Influx to influx
		
		edgeInfoByTimeStamp edgeInfluxTimestamp = new edgeInfoByTimeStamp(Long.parseLong(dateIterated),listEdge_Influx);
		Crud_influx.addEdgeListInflux(edgeInfluxTimestamp, dbName, influx);		
				
		// print debug
		//for(Edge_Influx edgeInflux_iterated : listEdge_Influx) {
		//	edgeInflux_iterated.print();
		//}
		return listEdge_Influx;
	}
	
	
	public static void createRequestData(ArrayList<String> dates,ArangoDatabase db,InfluxDB influx,String dbName) throws IOException {
		
		
		int contador = 0;
		
		System.out.println("------Influx Data----------");
		System.out.println("loop over dates, size:"+ dates.size());
		//System.out.println(dates);
		String lastDate = "";
		ArrayList<ArrayList<Edge_Influx>> HttpInfoByDate = new ArrayList<ArrayList<Edge_Influx>>();
		for(String dateIterated : dates) {
			System.out.println("contador:"+contador);
			// save edge_influx info to array
			// save last date 
			if(contador == 0) { // create http data from edges
				HttpInfoByDate.add(createHttpDataFromArango(dateIterated, db, influx, dbName));
				lastDate = dateIterated;
			}
			else {		
				// call function
				HttpInfoByDate.add(changeHttpDataFromArango(dateIterated,HttpInfoByDate.get(contador-1),db,influx,dbName));
				lastDate = dateIterated;
			}
			contador++;
		}
	}
	
	
	public static int getRandomNumber(int low,int high) {
		//System.out.println("low:"+low+"//High:"+high);
		if(low == high) {
			high = low *2;
		}
		Random r = new Random();
		int result = r.nextInt(high-low) + low;
		return result;
	}
	
	public static Edge_Influx createHttpData(Edge edgeToCreateData,int numberRequests, int averageResponseTime ) {
	// averageResponseTime in ms
	String from = edgeToCreateData.getFrom();
	String to = edgeToCreateData.getTo();
	Edge_Influx edgeCreated = new Edge_Influx();
	edgeCreated.setFrom(from);
	edgeCreated.setTarget(to);
	// Init array of httpCodes
	ArrayList<httpInfo_influx> httpCodesList = new ArrayList<httpInfo_influx>();
	int numberDiffentHttpCodes = getRandomNumber(5,20);
	ArrayList<String> httpCodesAdded = new ArrayList<String>();
	for(int i=0;i<numberDiffentHttpCodes;) {
		String httpCode = getRandomHttpCodeFromFile();
		if(!httpCodesAdded.contains(httpCode)) {
			i++;
			httpCodesAdded.add(httpCode);
			httpCodesList.add(new httpInfo_influx(httpCode,getRandomNumber(1, 100),getRandomNumber(1, 100)));
			
		}
	}
	edgeCreated.setHttpCodesList(httpCodesList);
	return edgeCreated;
	
	 	
		
	}
	
	public static String getRandomHttpCodeFromFile() {
		ArrayList<String> httpCodes = new ArrayList<String>();
		BufferedReader reader;
		try {
			reader = new BufferedReader(new FileReader("list_http_codes.txt"));
			String line = reader.readLine();
			while (line != null) {
				httpCodes.add(line);
				// read next line
				line = reader.readLine();
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		Random r = new Random();
		int low = 0;
		int high = httpCodes.size();
		int result = r.nextInt(high-low) + low;
		return httpCodes.get(result);
	}
	
	
}


