package arangoManager;

import java.util.ArrayList;
import java.util.Collection;
import java.util.concurrent.ExecutionException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.arangodb.ArangoCursor;
import com.arangodb.ArangoDBException;
import com.arangodb.ArangoDatabase;
import com.arangodb.entity.BaseDocument;
import com.arangodb.entity.CollectionEntity;
import com.arangodb.entity.EdgeDefinition;

import classes.Edge;
import classes.Service;

public class crud_arango {

	public crud_arango() {
		super();
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



	// must add the graph name
	// find out how
	public static ArrayList<Service> getAllNodesAndInstancesDB(ArangoDatabase  db,String id) {

		System.out.println("Get Nodes and Edges from arango");
		ArrayList<Service> serviceList = new ArrayList<Service>();
		//String query = "For v In services Return v.label";
		String collectionName = "services"+""+id;
		try {
			ArangoCursor<BaseDocument> cursor = db.query("For v In "  + collectionName +" Return v",BaseDocument.class);
			cursor.forEachRemaining(aDocument -> {
				String label = (String) aDocument.getAttribute("label");	
				try {
					String serviceName = aDocument.getAttribute("serviceName").toString();
					System.out.println("Service Name:"+serviceName);
					Service service = new Service(label,label,0,serviceName);
					serviceList.add(service);
				}catch (Exception e) {
					// TODO: handle exception
					Service service = new Service(label,label);
					serviceList.add(service);

				}

				//System.out.println("Key: " + aDocument.getAttribute("label"));

			});
		}catch (Exception e) {
			// TODO: handle exception
		}
		
		return serviceList;

	}
	

	public static void saveEdge(ArangoDatabase db,final Edge edge,String graphName,String collectionName,String servicesName)
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

	
	public static String createVertex(ArangoDatabase db,final Service service,String graphName,String collectionName)
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



	public static ArrayList<Edge> getEdgesFromDB(ArangoDatabase db,String id){

		ArrayList<Edge> edgesPar = new ArrayList<Edge>();
		//String query = "For v In services Return v.label";
		try {
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


			
		}catch (Exception e) {
			// TODO: handle exception
		}
				//System.out.println("---------edgePar:"+edgesPar);






		/*for(Edge edge : edgeList) {
			System.out.println(edge.toString());
		}*/
		return edgesPar;
	}
	
	public static ArrayList<Edge> constructEdgeArrayBySourceAndTarget(ArrayList<Edge> edgeList,ArangoDatabase db,String id){

		ArrayList<Edge> EdgeArrayReturn = new ArrayList<Edge>();
		//System.out.println("edge size construct array:"+edgeList.size());
		for(Edge iEdge : edgeList){
			Edge auxEdge = new Edge();
			String from = iEdge.getFrom();
			String to = iEdge.getTo();
			
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
	
	

	public static void addServicesEdgesToDb(ArangoDatabase db, ArrayList<Service> serviceArray, ArrayList<Edge> edgeLink,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {
		//sSaves graph into the DB identified by a id (date)
		System.out.println("Adding services to DB");
		ArrayList<ArrayList<String>> servicesStrings = new ArrayList<ArrayList<String>>();
		//graphName = "date:"+graphName;
		initGraphAndCollections(db,graphName,"calls"+id,"services"+id);


		for(Service currentService: serviceArray) {
			//System.out.println("iteration for 1");
			System.out.println(currentService.toString());
			ArrayList<String> stringsServiceCode = new ArrayList<String>();
			String serviceString = crud_arango.createVertex(db, currentService,graphName,"services"+id);
			stringsServiceCode.add(currentService.getLabel());  // 0 position: name of the service
			stringsServiceCode.add(serviceString);				// 1 position: string referring to the db
			servicesStrings.add(stringsServiceCode);
		}


		//System.out.println("edge link size:" +edgeLink.size());
		for(Edge currentEdge :edgeLink) {
			//System.out.println("iteration for 2");
			String from = findOperationsArrays.findServiceInArray(currentEdge.getFrom(), servicesStrings);
			String to = findOperationsArrays.findServiceInArray(currentEdge.getTo(), servicesStrings);
			if((!from.equals("Error")) && (!to.equals("Error"))) {
				//System.out.println("Save Edge:\n\t"+from+";"+to);
				crud_arango.saveEdge(db, new Edge(from,to,currentEdge.getNumberCalls()),graphName,"calls"+id,"services"+id);

			}
		}




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
			//System.out.println("Collection not found, creating new one..");
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









}
