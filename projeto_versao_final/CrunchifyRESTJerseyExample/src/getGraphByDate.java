import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import java.awt.List;

import java.io.BufferedReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Array;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Random;
import java.util.TimeZone;
import java.util.concurrent.ExecutionException;

import javax.sound.midi.Soundbank;
import javax.swing.text.Document;

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




@Path("/getGraph")
public class getGraphByDate {
	

	@GET
	@Produces("application/json")
	public String getGraph(@QueryParam("iteration") String date) throws IOException {
		
		
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

		
		ArrayList<Service> serviceList = getAllNodesInstances(db,date);	
			System.out.println("Size of the service list:"+serviceList.size());
			ArrayList<Edge> edgelist = getEdges(db,date);
			ArrayList<Edge> finalEdgeList = new ArrayList<Edge>();
			finalEdgeList = constructEdgeArray(edgelist, db,date);	
			
		ArrayList<node> nodeList = transformServiceToNodeInstances(serviceList);
		ArrayList<link> linkList = transformEdgeToLink(finalEdgeList);		
		nodeToJson(nodeList, nodeJsonFileName);
		linkToJson(linkList, linkJsonFileName);
		String finalJson = mergeJsonFiles(nodeJsonFileName, linkJsonFileName,-1);		// Modify to return a string
		
		
		return finalJson;
	}
	
	
	// find out how
	public static ArrayList<Service> getAllNodesInstances(ArangoDatabase  db,String id) {
		
		ArrayList<Service> serviceList = new ArrayList<Service>();
		//String query = "For v In services Return v.label";
		String collectionName = "services"+""+id;
		ArangoCursor<BaseDocument> cursor = db.query("For v In "  + collectionName +" Return v",BaseDocument.class);
		cursor.forEachRemaining(aDocument -> {
			String label = (String) aDocument.getAttribute("label");	
			try {
				String auxService = aDocument.getAttribute("instances").toString(); 
				ArrayList<Service> instances = constructInstanceArray(auxService);
				Service service = new Service(label,label,instances,0);
				serviceList.add(service);
			}catch (Exception e) {
				// TODO: handle exception
				Service service = new Service(label,label);
				serviceList.add(service);
			    
			}
			
			//System.out.println("Key: " + aDocument.getAttribute("label"));
	    
		  });
		
		return serviceList;
		
	}
	
	public static ArrayList<Service> constructInstanceArray(String instancesString){   // poorly made, attention!!!!!!!!!!
		Pattern pattern = Pattern.compile("(\\_id=)(.*?)(\\,)");
        Matcher matcher = pattern.matcher(instancesString);

        ArrayList<Service> listMatches = new ArrayList<Service>();

        while(matcher.find())
        {
            listMatches.add( new Service(matcher.group(2),matcher.group(2)));
            
        }

        /*for(String s : listMatches)
        {
            System.out.println(s);
        }*/
        return listMatches;
			
 	}

public static String mergeJsonFiles(String file1, String file2,long nTime) throws IOException
{
	String mergeString = "";
	// PrintWriter object for file3.txt 
	String jsonFileName;
	if(nTime == -1) {
		jsonFileName= "file.json";

	}else {
		jsonFileName= "file"+Long.toString(nTime) +".json";
		
	}
	
	PrintWriter pw = new PrintWriter(jsonFileName); 
    
	  
    // BufferedReader object for file1.txt 
    BufferedReader br1 = new BufferedReader(new FileReader(file1)); 
    BufferedReader br2 = new BufferedReader(new FileReader(file2)); 
      
      
    String line1 = br1.readLine(); 
    String line2 = br2.readLine(); 
      
    // loop to copy lines of  
    // file1.txt and file2.txt  
    // to  file3.txt alternatively
    pw.print("{\"nodes\":");
    mergeString+= "{\"nodes\":";
    while (line1 != null) 
    { 
        if(line1 != null) 
        { 
            pw.println(line1); 
            mergeString+=line1;
            line1 = br1.readLine(); 
        }  
    } 
    pw.print(",\n" + 
    		"\"links\": ");
    
    mergeString+= ",\n" + 
    		"\"links\": ";
    while (line2 != null) 
    { 
        if(line2 != null) 
        { 
            pw.println(line2); 
            mergeString+= line2;
            line2 = br2.readLine(); 
        }  
    } 
    pw.print("}");
    mergeString+="}";
    
    pw.flush(); 
      
    // closing resources 
    br1.close(); 
    br2.close(); 
    pw.close(); 
    
    return mergeString;
    //System.out.println("Merged link.json and node.json alternatively into file3.json"); 

}


	
	public static ArrayList<Edge> constructEdgeArray(ArrayList<Edge> edgeList,ArangoDatabase db,String id){
		
		ArrayList<Edge> EdgeArrayReturn = new ArrayList<Edge>();
		System.out.println("edge size construct array:"+edgeList.size());
		for(Edge iEdge : edgeList){
			Edge auxEdge = new Edge();
			String from = iEdge.getFrom();
			String to = iEdge.getTo();
			String numberCall = iEdge.getNumberCalls();
			

			// ------ FROM ----------
			
			String query = "FOR service IN services"+id +" \n" + 
					"    FILTER service._key == \""+from+"\"\n" + 
					"    RETURN service";
			
			//System.out.println("Query Serviço:"+ query);
			try {
				ArangoCursor<BaseDocument> cursor = db.query(query,BaseDocument.class);
				cursor.forEachRemaining(aDocument -> {
					String fromLabel = (String) aDocument.getAttribute("label");
					auxEdge.setFrom(fromLabel);
				});
				
			}catch (Exception e) {
				// TODO: handle exception
			}
			
			
			// ------ TO ----------
			String query2 = "FOR service IN services"+id+" \n" + 
					"    FILTER service._key == \""+to+"\"\n" + 
					"    RETURN service";
			
			
			
			//System.out.println("Query Edge:"+ query2);
			try {

				ArangoCursor<BaseDocument> cursor2 = db.query(query2,BaseDocument.class);
				cursor2.forEachRemaining(aDocument -> {
					String toLabel = (String) aDocument.getAttribute("label");	
					auxEdge.setTo(toLabel);
				});
				auxEdge.setNumberCalls(iEdge.getNumberCalls());
				EdgeArrayReturn.add(auxEdge);
			}catch (Exception e) {
				// TODO: handle exception
			}
		}	
		return EdgeArrayReturn;
		
		
	}
	
	
	public static ArrayList<Edge> getEdges(ArangoDatabase db,String id){
		
		ArrayList<Edge> edgesPar = new ArrayList<Edge>();
		ArrayList<Edge> edgeList = new ArrayList<Edge>();
		//String query = "For v In services Return v.label";
		String collectionName = "calls"+""+id;
		ArangoCursor<BaseDocument> cursor = db.query("For v In " + collectionName +" Return v",BaseDocument.class);
		cursor.forEachRemaining(aDocument -> {
			String from = (String) aDocument.getAttribute("_from");
			String to = (String) aDocument.getAttribute("_to");
			String numberCalls = (String) aDocument.getAttribute("numberCalls");
			
			String[] fromSplit = from.split("/");
			String fromId = fromSplit[1];
			String[] toSplit = to.split("/");
			edgesPar.add(new Edge(fromId, toSplit[1],numberCalls));
			
			
			
			
			//Edge edge = new Edge(from, to, numberCalls);
			//edgeList.add(edge);
		    //System.out.println("Key: " + aDocument.getAttribute("numberCalls"));
	    
		  });
		
		//System.out.println("---------edgePar:"+edgesPar);
		    	
		
		
		
		
		
		/*for(Edge edge : edgeList) {
			System.out.println(edge.toString());
		}*/
		return edgesPar;
	}
	 
public static ArrayList<node> transformServiceToNodeInstances(ArrayList<Service> serviceList)
{
ArrayList<node> nodeList = new ArrayList<node>();
for(Service iService:serviceList) {
	node auxNode = new node(iService.getLabel(),iService.getInstances(),0);
	nodeList.add(auxNode);
}
return nodeList;

}


      	 
public static ArrayList<node> transformServiceToNode(ArrayList<Service> serviceList)
{
	ArrayList<node> nodeList = new ArrayList<node>();
	for(Service iService:serviceList) {
		node auxNode = new node(iService.getLabel());
		nodeList.add(auxNode);
	}
	return nodeList;
	
}

public static ArrayList<link> transformEdgeToLink(ArrayList<Edge> Edgelist)
{
	ArrayList<link> linkList = new ArrayList<link>();
	for(Edge iEdge:Edgelist) {
		link auxLink = new link(iEdge.getFrom(), iEdge.getTo(), iEdge.getNumberCalls());
		linkList.add(auxLink);
	}
	return linkList;
}


public static String nodeToJson(ArrayList<node> nodeList,String fileName) throws IOException {  
     GsonBuilder builder = new GsonBuilder(); 
     builder.setPrettyPrinting(); 
     
     Gson gson = builder.create(); 
 
     String json = gson.toJson(nodeList);
     //System.out.println(json);
     try (FileWriter file = new FileWriter("node.json")) {
			file.write(json);
			//System.out.println("Successfully Copied JSON Object to File...");
			//System.out.println("\nJSON Object: " + json);
	   }
	
	return null;
	
	
}


public static String linkToJson(ArrayList<link> linkList,String fileName) throws IOException {  
	
     GsonBuilder builder = new GsonBuilder(); 
     builder.setPrettyPrinting(); 
     
     Gson gson = builder.create(); 
 
     String json = gson.toJson(linkList);
     //System.out.println(json);
     try (FileWriter file = new FileWriter(fileName)) {
			file.write(json);
			//System.out.println("Successfully Copied JSON Object to File...");
			//System.out.println("\nJSON Object: " + json);
	   }
	
	return null;
	
	
}

	

}
