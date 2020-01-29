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




class Config{
	// Number of iterations
	// Interval time between each one
	// Initial time
	private int iterations;
	long initialDate;  // time from 1970
	long dateInterval; // segundos 
	ArrayList<String> dates;
	
	
	
	public Config(ArrayList<String> dates) {
		super();
		this.dates = dates;
	}
	
	
	public ArrayList<String> getDates() {
		return dates;
	}


	public void setDates(ArrayList<String> dates) {
		this.dates = dates;
	}


	public int getIterations() {
		return iterations;
	}
	public void setIterations(int iterations) {
		this.iterations = iterations;
	}
	public long getInitialDate() {
		return initialDate;
	}
	public void setInitialDate(long initialDate) {
		this.initialDate = initialDate;
	}
	public long getDateInterval() {
		return dateInterval;
	}
	public void setDateInterval(int dateInterval) {
		this.dateInterval = dateInterval;
	}
	public Config(int iterations, long initialDate, long dateInterval) {
		super();
		this.iterations = iterations;
		this.initialDate = initialDate;
		this.dateInterval = dateInterval;
	}
	
	
	
}

class node{
	
	private String name;
	private ArrayList<Service> instances;
	private long date;

	public node(String name) {
		super();
		this.name = name;
	}
	
	

	public node(String name, ArrayList<Service> instances, long date) {
		super();
		this.name = name;
		this.instances = instances;
		this.date = date;
	}




	public long getDate() {
		return date;
	}



	public void setDate(long date) {
		this.date = date;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}



	public ArrayList<Service> getInstances() {
		return instances;
	}



	public void setInstances(ArrayList<Service> instances) {
		this.instances = instances;
	}



	@Override
	public String toString() {
		return "node [name=" + name + ", instances=" + instances + "]";
	}
	
	
	
		 
}

class link {
	private String source;
	private String target;
	private String count;
	public link(String source, String target, String count) {
		super();
		this.source = source;
		this.target = target;
		this.count = count;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getTarget() {
		return target;
	}
	public void setTarget(String target) {
		this.target = target;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	
	
}

class Service {
	@DocumentField(Type.ID)
	private String id;

	@DocumentField(Type.KEY)
	private String key;

	@DocumentField(Type.REV)
	private String revision;

	private String label;
	
	private ArrayList<Service> instances;
	
	private String instanceString;
	
	private long date;
	
	
	
	
	
	public String getInstanceString() {
		return instanceString;
	}

	public void setInstanceString(String instanceString) {
		this.instanceString = instanceString;
	}

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}

	public Service(String id, String label, String instanceString) {
		super();
		this.id = id;
		this.label = label;
		this.instanceString = instanceString;
	}

	public Service(String id, String label,ArrayList<Service> instances,long date) {
		super();
		this.id = id;
		this.label = label;
		this.instances = instances;
		this.date = date;
	}

	public Service(String id, String label) {
		super();
		this.id = id;
		this.label = label;
	}

	public Service() {
		// TODO Auto-generated constructor stub
	}
	
	

	public ArrayList<Service> getInstances() {
		return instances;
	}

	public void setInstances(ArrayList<Service> instances) {
		this.instances = instances;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getRevision() {
		return revision;
	}

	public void setRevision(String revision) {
		this.revision = revision;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	@Override
	public String toString() {
		return "Service [id=" + id + ", key=" + key + ", revision=" + revision + ", label=" + label + ", instances="
				+ instances.size() + ", instanceString=" + instanceString + "]";
	}
	
	

}



class Edge {
	@DocumentField(Type.ID)
	private String id;

	@DocumentField(Type.KEY)
	private String key;

	@DocumentField(Type.REV)
	private String revision;

	@DocumentField(Type.FROM)
	private String from;

	@DocumentField(Type.TO)
	private String to;
	
	private String numberCalls;

	
	
	public Edge() {
		super();
	}

	public Edge(String from, String to, String numberCalls) {
		super();
		this.from = from;
		this.to = to;
		this.numberCalls = numberCalls;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getRevision() {
		return revision;
	}

	public void setRevision(String revision) {
		this.revision = revision;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getNumberCalls() {
		return numberCalls;
	}

	public void setNumberCalls(String numberCalls) {
		this.numberCalls = numberCalls;
	}

	@Override
	public String toString() {
		return "Edge [id=" + id + ", key=" + key + ", revision=" + revision + ", from=" + from + ", to=" + to
				+ ", numberCalls=" + numberCalls + "]";
	}	

}

@Path("/initDataBase")
public class mainProject {
	


	public static ArrayList<node> nodeList = new ArrayList<node>();
	public static ArrayList<link> linkList = new ArrayList<link>();
	
	
	public static 	String dbName = "mydb";
	
	
	@GET
	@Produces("application/json")
	public static String init(String args[])
			throws ArangoDBException, InterruptedException, ExecutionException, IOException {
		
		
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
		
		
		
		
		cleanDataBase(arango);
		
		
		
		Long currentDate = System.currentTimeMillis()/1000;
		Long timeInterval = (long) 1 *60; //1 min
		Long endTime = currentDate + 10* timeInterval;
		
		
		ArrayList<String> dates =  constructGraphInitTimeEndTime(arango,currentDate, endTime, timeInterval);
		configsJSONFile(dates);
		System.out.println("----------------- DONE ----------------- ");
		return "done";
	}	



	
	private static void saveEdge(ArangoDatabase db,final Edge edge,String graphName,String collectionName,String servicesName)
			throws ArangoDBException, InterruptedException, ExecutionException {
		
		// check if collection exists
		// if not
		// create the collection
		
		//String newGraphName = "date:"+collectionName.split("")[1];
		String newGraphName = graphName;
		Collection<CollectionEntity> collections = db.getCollections();
		boolean found = false;
		for(CollectionEntity collectionIterate : collections) {
			if(collectionIterate.getName().equals(collectionName)) {
				//System.out.println("edge collection "+collectionName+" found");
				found = true;
			}
		}
		if(found == true) {
			try {			
				db.graph(newGraphName).edgeCollection(collectionName).insertEdge(edge);	
				return;
			}catch (Exception e) {
				
			}
		}
		
		if(found == false) {
			//System.out.println("Collection not found, creating new one..");
			final Collection<EdgeDefinition> edgeDefinitions = new ArrayList<EdgeDefinition>();
			final EdgeDefinition edgeDefinition = new EdgeDefinition().collection(collectionName).from(servicesName).to(servicesName);
			edgeDefinitions.add(edgeDefinition);
			try {
				db.createGraph(newGraphName, edgeDefinitions, null);

			} catch (final Exception ex) {
				System.out.println("Error, creating the graph..");
				System.out.println(ex);
			}
			
		}
		//System.out.println("graph name:"+newGraphName);
		
		
	}
	
	private static void initGraphAndCollections(ArangoDatabase db,String graphName,String collectionName,String servicesName)
			throws ArangoDBException, InterruptedException, ExecutionException {
		
		// check if collection exists
		// if not
		// create the collection
		
		String newGraphName = graphName;
		Collection<CollectionEntity> collections = db.getCollections();
		boolean found = false;
		for(CollectionEntity collectionIterate : collections) {
			if(collectionIterate.getName().equals(collectionName)) {
				System.out.println("edge collection found");
				found = true;
			}
		}
		
		
		if(found == false) {
			System.out.println("Collection not found, creating new one..");
			final Collection<EdgeDefinition> edgeDefinitions = new ArrayList<EdgeDefinition>();
			final EdgeDefinition edgeDefinition = new EdgeDefinition().collection(collectionName).from(servicesName).to(servicesName);
			edgeDefinitions.add(edgeDefinition);
			try {
				db.createGraph(newGraphName, edgeDefinitions, null);

			} catch (final Exception ex) {
				System.out.println("Init Error, creating the graph..");
				System.out.println(ex);
			}
			
		}
		
		//return db.graph(graphName).vertexCollection(name)(collectionName).insertEdge(edge).getId();	
		
	}

	

	private static String createVertex(ArangoDatabase db,final Service service,String graphName,String collectionName)
			throws ArangoDBException, InterruptedException, ExecutionException {
		
		Collection<CollectionEntity> collections = db.getCollections();
		boolean found = false;
		for(CollectionEntity collectionIterate : collections) {
			if(collectionIterate.getName().equals(collectionName)) {
				found = true;
			}
		}
		if(found == false) {
			// create collection
			//System.out.println(collectionName);
			db.createCollection(collectionName);
		}
		return db.graph(graphName).vertexCollection(collectionName).insertVertex(service).getId();
	
	}
	
	public static ArrayList<ArrayList<String>> addServicesToArray(ArangoDatabase db,String links,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {
		String[] arraySpace = links.split(" ");
		ArrayList<String> listNodes = new ArrayList<String>();  // list with the services ordered, like 1,2,3,4, a link is the par 1,2 or 3,4
		int numberServices = 0;
		for(String aux : arraySpace) {
			String[] services = aux.split(",");
			//System.out.println(services[0]+";"+services[1]);
			
			// check if element already exists in the array
		       
			if(!listNodes.contains(services[0])) {
				numberServices++;
				listNodes.add(services[0]);
				
			}
			if(!listNodes.contains(services[1])) {
				numberServices++;
				listNodes.add(services[1]);
				
			}
		
			//add to the array
			
		}
		
		ArrayList<ArrayList<String>> serviceArray = new ArrayList<ArrayList<String>>();
		int i;
		for(i=0;i<listNodes.size();i++) {
			String serviceName = "service" + listNodes.get(i);
			//System.out.println(serviceName);
			Service serviceAux = new Service(serviceName,serviceName);
			final String stringCode= createVertex(db, serviceAux,graphName,"services"+""+id);
			ArrayList<String> arrrayNameCode= new ArrayList<String>();
			arrrayNameCode.add(listNodes.get(i));
			arrrayNameCode.add(stringCode);
			serviceArray.add(arrrayNameCode);
		}
		
		return serviceArray;
		
	}
	
	// ERRO so está a meter metade dos links
	
	public static void addExamplesArrayInstances(ArangoDatabase db,String links,String nodes,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {
		nodes = "1-1,2,3 2-1,2 3-1,2,3 4-1,2 5-1,2";
		links = "1,2 3,4 2,3 5,1 1,4";  // split services with comma, split links with a space ex: "1,2 3,4"
		ArrayList<ArrayList<String>> listServices = new ArrayList<ArrayList<String>>();  // arrraylist of 2 strings, first: name of the service, second: string from the creation of tghe vertex into the db
		listServices = addServices(db, links, nodes,graphName,id);
		addLinks(db, links, listServices,graphName,"services");
			
		
	}
	
	
	public static ArrayList<ArrayList<String>>  addServices(ArangoDatabase db,String links,String nodes,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {
		ArrayList<ArrayList<String>> listServices = new ArrayList<ArrayList<String>>();  // arrraylist of 2 strings, first: name of the service, second: string from the creation of tghe vertex into the db
		String[] splitNodes = nodes.split(" ");
		for(String aux : splitNodes) {
			String[] split = aux.split("");
			String name = split[0];
			String[] instances = split[1].split(",");
			ArrayList<Service> instancesList = new ArrayList<Service>();
			//System.out.println("Adding to the list:"+name+"\n\tInstnaces:");
			for(String instance : instances) {
				instancesList.add(new Service(instance,instance));
				//System.out.println("\tinstance:"+instance);
			}
			ArrayList<String> nameCodeDb = new ArrayList<String>();
			nameCodeDb.add(name);
			//System.out.println("instnaces"+instancesList);
			String serviceDb = createVertex(db,new Service(name,name,instancesList,0),graphName,"services"+""+id) ;
			nameCodeDb.add(serviceDb);
			listServices.add(nameCodeDb);
 		}
		return listServices;
		
	}
	
	
	public static void addLinks(ArangoDatabase db,String links,ArrayList<ArrayList<String>> listServices,String graphName,String vertexName) throws ArangoDBException, InterruptedException, ExecutionException {
		String[] arraySpace = links.split(" ");
		ArrayList<String> listNodes = new ArrayList<String>();  // list with the services ordered, like 1,2,3,4, a link is the par 1,2 or 3,4
		for(String aux : arraySpace) {
			String[] services = aux.split(",");				
			listNodes.add(services[0]);
			listNodes.add(services[1]);	
			//String[] servicesWithInstances1 = 
		}
		
		for(int i =0;i<listNodes.size();i++) {
			
			String serviceFrom = findServiceInArray(listNodes.get(i), listServices);
			String serviceTo = findServiceInArray(listNodes.get(i+1), listServices);
			if((!serviceFrom.equals("Error")) && (!serviceTo.equals("Error"))) {
				saveEdge(db,new Edge(serviceFrom, serviceTo, listNodes.get(i)+listNodes.get(i+1)),graphName,"calls",vertexName);
			}
			i++;
		}
		
	}
	
	public static void addExamplesArrays(ArangoDatabase db,String links,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {
		links = "1,2 3,4 5,6 7,6 4,3 7,1 7,8 8,9 8,10 8,11 10,12 13,5 5,12 ";  // split services with comma, split links with a space ex: "1,2 3,4"
		ArrayList<ArrayList<String>> serviceArray = addServicesToArray(db,links,graphName,id);
		//System.out.println("Service:"+serviceArray.get(0).get(0)+"String:"+serviceArray.get(0).get(1));
		String[] arraySpace = links.split(" ");
		ArrayList<String> listNodes = new ArrayList<String>();  // list with the services ordered, like 1,2,3,4, a link is the par 1,2 or 3,4
		for(String aux : arraySpace) {
			String[] services = aux.split(",");				
			listNodes.add(services[0]);
			listNodes.add(services[1]);	
		}
		
		for(int i =0;i<listNodes.size();i++) {
			
			String serviceFrom = findServiceInArray(listNodes.get(i), serviceArray);
			String serviceTo = findServiceInArray(listNodes.get(i+1), serviceArray);
			if((!serviceFrom.equals("Error")) && (!serviceTo.equals("Error"))) {
				saveEdge(db,new Edge(serviceFrom, serviceTo, listNodes.get(i)+listNodes.get(i+1)),graphName,"calls","services");
			}
			i++;
		}
		
		
		
	}
	
	public static String findServiceInArray(String id,ArrayList<ArrayList<String>> serviceArray) {
		//System.out.println("find func");
		int size = serviceArray.size();
		for(int i=0;i<size;i++) {
			if(serviceArray.get(i).get(0).equals(id)) {
				//System.out.println("found service String");
				return serviceArray.get(i).get(1);
			}
		}
		return "Error";
		
	}

	

	public static void cleanDataBase(ArangoDatabase db) 
	{
		/*FOR u IN calls
  REMOVE u IN calls
**/
		try {
			ArangoCursor<BaseDocument> cursor = db.query("FOR u IN calls\n" + 
					"  REMOVE u IN calls",BaseDocument.class);
			 /*FOR u IN services
	  REMOVE u IN services
	*/
			ArangoCursor<BaseDocument> cursor2 = db.query("FOR u IN services\n" + 
					"  REMOVE u IN services",BaseDocument.class);
		
		}catch (Exception e) {
			// TODO: handle exception
		}

			
		
	}

	
	// must add the graph name
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
	
	
	
	public static ArrayList<Service> getAllNodes(ArangoDatabase  db) {
		
		ArrayList<Service> serviceList = new ArrayList<Service>();
		//String query = "For v In services Return v.label";
		ArangoCollection collection = db.collection("services");
		
		ArangoCursor<BaseDocument> cursor = db.query("For v In services Return v",BaseDocument.class);
		cursor.forEachRemaining(aDocument -> {
			String label = (String) aDocument.getAttribute("label");
			Service service = new Service(label, label);
			serviceList.add(service);
		    //System.out.println("Key: " + aDocument.getAttribute("label"));
	    
		  });
		
		/*long size= cursor.count();
		for(long i = 0; i<size;i++) {
			
			//System.out.println(key);
			
			cursor.next();
		}*/
	
		return serviceList;
		
	}
	
	//colocar bem: mudar return para edge, descomentar duas linhas no fim
	
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
	
	
	
	public static String edgeToJson(ArrayList<Edge> edgeList) throws IOException {
		//String jsonString = "{\"name\":\"Mahesh\", \"age\":21}"; 
	      
	      GsonBuilder builder = new GsonBuilder(); 
	      builder.setPrettyPrinting(); 
	      
	      Gson gson = builder.create(); 
	      
	      //Student student = gson.fromJson(jsonString, Student.class); 
	      //System.out.println(student);    
	      
	      //jsonString = gson.toJson(student); 
	      
	      //System.out.println(jsonString); 
	      String json = gson.toJson(edgeList);
		//System.out.println(json);
		try (FileWriter file = new FileWriter("edges.json")) {
			file.write(json);
			//System.out.println("Successfully Copied JSON Object to File...");
			//System.out.println("\nJSON Object: " + json);
		}
		
		return null;
		
		
	}
	
	

	public static String serviceToJson(ArrayList<Service> serviceList) throws IOException {
		//String jsonString = "{\"name\":\"Mahesh\", \"age\":21}"; 
	      
	      GsonBuilder builder = new GsonBuilder(); 
	      builder.setPrettyPrinting(); 
	      
	      Gson gson = builder.create(); 
	      
	      //Student student = gson.fromJson(jsonString, Student.class); 
	      //System.out.println(student);    
	      
	      //jsonString = gson.toJson(student); 
	      
	      //System.out.println(jsonString); 
	      String json = gson.toJson(serviceList);
		//System.out.println(json);
		
		try (FileWriter file = new FileWriter("services.json")) {
			file.write(json);
			//System.out.println("Successfully Copied JSON Object to File...");
			//System.out.println("\nJSON Object: " + json);
		}
		
		
		return null;
		
		
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

public static void mergeJsonFiles(String file1, String file2,long nTime) throws IOException
{
	
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
    while (line1 != null) 
    { 
        if(line1 != null) 
        { 
            pw.println(line1); 
            line1 = br1.readLine(); 
        }  
    } 
    pw.print(",\n" + 
    		"\"links\": ");
    while (line2 != null) 
    { 
        if(line2 != null) 
        { 
            pw.println(line2); 
            line2 = br2.readLine(); 
        }  
    } 
    pw.print("}");
    
    pw.flush(); 
      
    // closing resources 
    br1.close(); 
    br2.close(); 
    pw.close(); 
      
    //System.out.println("Merged link.json and node.json alternatively into file3.json"); 

}

	public static void addServicesEdgesToDb(ArangoDatabase db, ArrayList<Service> serviceArray, ArrayList<Edge> edgeLink,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {
		//sSaves graph into the DB identified by a id (date)
		//System.out.println("Adding services to DB");
		ArrayList<ArrayList<String>> servicesStrings = new ArrayList<ArrayList<String>>();
		//graphName = "date:"+graphName;
		initGraphAndCollections(db,graphName,"calls"+id,"services"+id);

		
		for(Service currentService: serviceArray) {
			//System.out.println("iteration for 1");
			ArrayList<String> stringsServiceCode = new ArrayList<String>();
			String serviceString = createVertex(db, currentService,graphName,"services"+id);
			stringsServiceCode.add(currentService.getLabel());  // 0 position: name of the service
			stringsServiceCode.add(serviceString);				// 1 position: string referring to the db
			servicesStrings.add(stringsServiceCode);
		}

		
		System.out.println("edge link size:" +edgeLink.size());
		for(Edge currentEdge :edgeLink) {
			//System.out.println("iteration for 2");
			String from = findServiceInArray(currentEdge.getFrom(), servicesStrings);
			String to = findServiceInArray(currentEdge.getTo(), servicesStrings);
			if((!from.equals("Error")) && (!to.equals("Error"))) {
				//System.out.println("Save Edge:\n\t"+from+";"+to);
				saveEdge(db, new Edge(from,to,currentEdge.getNumberCalls()),graphName,"calls"+id,"services"+id);
			
			}
		}
		
		
		
		
	}
	
	public static boolean addServiceByProb(ArangoDatabase db,double probAddService,ArrayList<Service> serviceArray,int numberInstances,double probLink,long date,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {
		if(Math.random()<probAddService) {
			String serviceName = "service" + Integer.toString(serviceArray.size());
			
			//create service
			Random r = new Random();
			
			ArrayList<Service> instances = new ArrayList<Service>();
			int numberInstancesGauss = (int) ((r.nextGaussian() * numberInstances/2) + numberInstances);
			
			// ----------------------------------------- Add his instances ----------------------------------------------------------
			for(int j=0;j<numberInstancesGauss;j++) {
				String instanceName = "Instance" + Integer.toString(j);
				Service instance = new Service(instanceName,instanceName);
				instances.add(instance);
			}
			Service newService = new Service(serviceName, serviceName, instances,date);
			//public Service(String id, String label,ArrayList<Service> instances,long date) {
				
			final String serviceString = createVertex(db, newService,graphName,"services"+id); //services/624345
			addLinksToService_addServiceByProb(db, newService, serviceString, probLink,graphName,"calls"+id);
			//saveEdge(db,new Edge(s2, s3, "23"));
			// -------------------------------   Add EDGES	------------------------------
			// percorrer os serviços todos, se a prob for menor, ir buscar a key à db e criar o vertex
			return true;
		}
		return false;
		
	}
	
	public static void addLinksToService_addServiceByProb(ArangoDatabase db, Service newService, String serviceString,double probLink, String graphName,String id) {
		//ArrayList<String> keysServicesToLink = new ArrayList<String>();
		ArangoCursor<BaseDocument> cursor = db.query("For v In services Return v",BaseDocument.class);
		cursor.forEachRemaining(aDocument -> {
			String key = (String) aDocument.getKey();
			if(Math.random()<probLink) {
				try {
					saveEdge(db,new Edge(serviceString, "services/"+key, serviceString+""+key),graphName,id,"services"+id);
				} catch (ArangoDBException | InterruptedException | ExecutionException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			}		
		  });
		
	}
	
	
	public static String findStringCodeInArray(ArrayList<ArrayList<String>> servicesStrings,String serviceName) {
		
		int lenght = servicesStrings.size();
		for(int i=0;i<lenght;i++) {
			String currentName = servicesStrings.get(i).get(0);
			if(currentName.equals(serviceName)) {
				return servicesStrings.get(i).get(1);
			}
			
		}
		return null;
	}
	
public static boolean addLinkByAProbability(ArangoDatabase db, double probAddLink,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {
		// modify to get the edges from a defined collection
	
	
		// ------------------ Iterate all services and for each one there is a probability to add one link------
		// ------------------ The target of the link is a random service ---------------------------------------
		
		// get all services, store the keys in one array
		String collectionName = "services"+id;
		ArangoCursor<BaseDocument> cursor = db.query("For v In "+collectionName+" Return v",BaseDocument.class);
		ArrayList<String> keys = new ArrayList<String>();
		cursor.forEachRemaining(aDocument -> {
			String key = (String) aDocument.getKey();	
			keys.add(key);
		  });
		boolean added = false;
		for(String CurrentKey : keys) {  						  // iterate over the services keys 
			if(Math.random() < probAddLink) { 
				System.out.println("adding a new link");
				added = true;
				Random r = new Random();
				int low = 0;
				int high = keys.size()-1;
				int indexTargetService = r.nextInt(high-low) + low;
				String targetKey = keys.get(indexTargetService);  // we have the 2 keys necessary to create a link			
				String finalKeySource = "services"+id+"/" + CurrentKey;
				String finalkeyTarget = "services"+id+"/"+  targetKey;
				
				saveEdge(db,new Edge(finalKeySource, finalkeyTarget, CurrentKey+""+targetKey),id,"calls"+id,"services"+id);
			}
				
		}
		return added;
		
	}

	
	// define how many times the graph will be iterated
	// save each graph iteration in json files with a number to identify the iteration
	// to synchronize the front-end with the rest interface, send a json that describes how many times the graph is iterated

	public static void iterateGraphNTimes(ArangoDatabase arango, long initTime,long endTime, long timeInterval, String graphName) throws ArangoDBException, InterruptedException, ExecutionException, IOException {
		// initTime, endTime, timeInterval (all in seconds)
		
		String linkJsonFileName = "link.json";
		String nodeJsonFileName = "node.json";
		
		if(timeInterval == -1) {
			

			dynamicChangeGraph dynaGraph = new dynamicChangeGraph();
			//dynaGraph.removeEdges(arango,0.3,"");
			//dynaGraph.removeService(arango, 0.1,"");

			
			ArrayList<Service> serviceList = getAllNodesInstances(arango,"");			
			
			// --------------------- save graph to JSON ---------------------------------
			ArrayList<Edge> edgelist = getEdges(arango,"");
			ArrayList<Edge> finalEdgeList = new ArrayList<Edge>();
			//finalEdgeList = constructEdgeArray(edgelist, arango);
			//nodeList = transformServiceToNode(serviceList);
			nodeList = transformServiceToNodeInstances(serviceList);
			linkList = transformEdgeToLink(finalEdgeList);		
			nodeToJson(nodeList, nodeJsonFileName);
			linkToJson(linkList, linkJsonFileName);
			mergeJsonFiles(nodeJsonFileName, linkJsonFileName,-1);		
			
			
		}else {
			for(long i=initTime;i<endTime;i+=timeInterval) {
				
				// get the last graph by date
				
				
				// ----------------- Functions to modify the graph 
				

				dynamicChangeGraph dynaGraph = new dynamicChangeGraph();
				//dynaGraph.removeEdges(arango,0.3,Long.toString(i));
				//boolean removed = dynaGraph.removeService(arango, 0.1,Long.toString(i));

				
				ArrayList<Service> serviceList = getAllNodesInstances(arango,Long.toString(i));			
				
				// ---------------------- add a service by a prob ---------------------------
				//addServiceByProb(arango, 1, serviceList,6,0.1);                        // ERROR, THE NEW SERVICE LINKS ARE WRONGLY MADE
				// --------------------------------------------------------------------------
				
				
				// ---------------------- add a link by a prob ------------------------------
				//addLinkByAProbability(arango, 0.1,graphName,Long.toString(i));   // pass the collection last parameter
				// --------------------------------------------------------------------------
				
				
				// --------------------- save graph to JSON ---------------------------------
				serviceList = getAllNodesInstances(arango,Long.toString(i));			
				ArrayList<Edge> edgelist = getEdges(arango,Long.toString(i));
				ArrayList<Edge> finalEdgeList = new ArrayList<Edge>();
				//finalEdgeList = constructEdgeArray(edgelist, arango);
				
				// save finalEdgeList and serviceList to DB
				
				//nodeList = transformServiceToNode(serviceList);
				nodeList = transformServiceToNodeInstances(serviceList);
				linkList = transformEdgeToLink(finalEdgeList);		
				nodeToJson(nodeList, nodeJsonFileName);
				linkToJson(linkList, linkJsonFileName);
				mergeJsonFiles(nodeJsonFileName, linkJsonFileName,i);		
				
			}

			
		}
	}
	public static ArrayList<ArrayList<String>> getKeysByCollection(ArangoDatabase db,String id, double probEachService){
		ArrayList<ArrayList<String>> keysProb = new ArrayList<ArrayList<String>>();
		String collectionName = "services"+id;
		//System.out.println(collectionName);
		String query = "For v In "+collectionName+" Return v";
		//System.out.println(query);
		ArangoCursor<BaseDocument> cursor = db.query("For v In "+collectionName+" Return v",BaseDocument.class);
		ArrayList<String> keys = new ArrayList<String>();
		cursor.forEachRemaining(aDocument -> {
			ArrayList<String> keyProb = new ArrayList<String>();
			String key = (String) aDocument.getKey();	
			keyProb.add(key);
			if(Math.random()<probEachService) {
				keyProb.add("true");
			}
			else {
				keyProb.add("false");
			}
			keysProb.add(keyProb);
			keys.add(key);
		  });
		return keysProb;
		
	}
	 public static ArrayList<String> constructGraphInitTimeEndTime(ArangoDatabase db, long initTime,long endTime, long timeInterval) throws ArangoDBException, InterruptedException, ExecutionException, IOException {
		 // Function to init the graphs by time
		 // Construct a initial graph, by a set of probabilities and if one proprety of the graph changes, a instance of it will be created
		
		
			
		// first iteration
		String currentDateSeconds = Long.toString(System.currentTimeMillis()/1000);	
		dynamicChangeGraph dynaGraph = new dynamicChangeGraph();
		ArrayList<Service> serviceArray =  dynaGraph.createGraph(20, 30, 4,100);  // low high instances 
		ArrayList<Edge> edgeArray = dynaGraph.addEdgesToGraph(serviceArray, 0.05, serviceArray.size());
		addServicesEdgesToDb(db, serviceArray, edgeArray,Long.toString(initTime),Long.toString(initTime));  // graphName: currentDateSeconds
		
		System.out.println("Init Time:"+initTime+"\nEndTime:"+endTime+"\nTimeInterval:"+timeInterval+"Numero Interações:"+(endTime-initTime)/timeInterval);
		String lastGraphModified = Long.toString(initTime);
		ArrayList<String> datesIteration= new ArrayList<String>();
		System.out.println("First iteration:\n\tEdge added:"+serviceArray.size()+"\n\tEdges added:"+edgeArray.size());
		
		for(long i=initTime+timeInterval;i<endTime;i+=timeInterval) {
			
			
			//ArrayList<ArrayList<String>> keysProb = getKeysByCollection(db,lastGraphModified,0.1);
			
			
			// something is going to change
			// need to create the collections to the new iteration
			System.out.println("\n\n-----------------------New graph iteration----------------");
			ArrayList<Service> serviceList = getAllNodesInstances(db,lastGraphModified);	
			System.out.println("Size of the service list:"+serviceList.size());
			ArrayList<Edge> edgelist = getEdges(db,lastGraphModified);
			ArrayList<Edge> finalEdgeList = new ArrayList<Edge>();
			finalEdgeList = constructEdgeArray(edgelist, db,lastGraphModified);	
			System.out.println("Size of the edge list:"+finalEdgeList.size());
			addServicesEdgesToDb(db, serviceList, finalEdgeList,Long.toString(i),Long.toString(i));  
			
			
			
			
			
			//problema, é necessário saber se alguma coisa vai mudar na db
			// criar sempre uma nova iteração na db
			// se nada mudar, apagar as coleções
			
			
			
			
			// ----------------- Functions to modify the graph 
			

			dynamicChangeGraph dynaGraph1 = new dynamicChangeGraph();
			boolean removeEdge = dynaGraph1.removeEdges(db,0.1,Long.toString(i));  // esta a remover os edges todos de cada vez, probabilidade para cada um, tipo o de adicionar
			boolean removeService = dynaGraph1.removeService(db, 0.1,Long.toString(i));

			
			ArrayList<Service> serviceListBeforeModification = getAllNodesInstances(db,Long.toString(i));			
			
			// ---------------------- add a service by a prob ---------------------------
			boolean addedService = addServiceByProb(db, 0.5, serviceListBeforeModification,6,0.1,i,Long.toString(i),Long.toString(i));                        // ERROR, THE NEW SERVICE LINKS ARE WRONGLY MADE
			//addServiceByProb(ArangoDatabase db,double probAddService,ArrayList<Service> serviceArray,int numberInstances,double probLink,long date,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {
				
			// --------------------------------------------------------------------------	
			
			// ---------------------- add a link by a prob ------------------------------
			
			addLinkByAProbability(db, 0.1,Long.toString(i),Long.toString(i));   // pass the collection last parameter
			// --------------------------------------------------------------------------
			
			if((removeEdge == true) || (removeService == true) || (addedService == true)) {
				
				/*ArrayList<Service> serviceListAfterModification = getAllNodesInstances(db,Long.toString(i));
				ArrayList<Edge> edgelistAfterModifications = getEdges(db,Long.toString(i));
				ArrayList<Edge> finalEdgeListAfterModification = new ArrayList<Edge>();
				finalEdgeListAfterModification = constructEdgeArray(edgelistAfterModifications, db,Long.toString(i));
				System.out.println("edge list end:"+finalEdgeListAfterModification.size());
				addServicesEdgesToDb(db, serviceListAfterModification, finalEdgeListAfterModification,Long.toString(i),Long.toString(i));  // graphName: currentDateSeconds
				*/
				lastGraphModified = Long.toString(i);
				datesIteration.add(lastGraphModified);
			}
			
			
			
		}
		return datesIteration;
		

		 
	 }
	 
	 public static void changeLastGraph() {
		 
	 }
	
	
	public static void configsJSONFile(ArrayList<String> dates) throws IOException {
		// 5 intervals
		// initial date- current date
		// interval: 10 min
		
		long seconds = System.currentTimeMillis() / 1000l;

		int dateInterval = 10 *60; // segundos, 10 min
        Date curDate = new Date(java.time.Instant.now().getEpochSecond()*1000);
        
        //System.out.println(System.currentTimeMillis());

		SimpleDateFormat format = new SimpleDateFormat();
	    String DateToStr = format.format(curDate);
	    //System.out.println("Default pattern: " + DateToStr);
	 
 
        format = new SimpleDateFormat("dd-M-yyyy hh:mm:ss");
        DateToStr = format.format(curDate);
        //System.out.println("Current date:"+DateToStr);
        // int, String, int 
        //Config currentConfig = new Config(iterations, initDate, timeInterval);
        Config currentConfig = new Config(dates);
	    
    
	      GsonBuilder builder = new GsonBuilder(); 
	      builder.setPrettyPrinting(); 
	      
	      Gson gson = builder.create(); 
	 
	      String json = gson.toJson(currentConfig);
		//System.out.println(json);
		try (FileWriter file = new FileWriter("config.json")) {
			file.write(json);
		}
		
		/*try (FileWriter file = new FileWriter("iterations.json")) {
			file.write(Integer.toString(iterations));
		}*/
			
	}
	
	public static void requestForGraph(long initDate, long finalDate) {
		// if graph exits in db:
			// get graph and return
		
		// else:
			// get previous graph before date
			// iterate graph until reach requested date
				// save graphs
			// return the previous graph next to the date requested
		
	}
	
	public static void newGraphIteration(ArangoDatabase db, long initDate, long finalDate) {
		// dates in seconds from 1970
		// check the last graph on the DB, with it, its created a new iteration with related date
		// for each minimum time interval, is calculated the probability to something change, if so, the new iteration is created
			// and stored into the DB
		
		// Collection names:
		//		- Serices-12345
		//		- Dates-12345
		
		
		


	}

	
	
	
	
}
