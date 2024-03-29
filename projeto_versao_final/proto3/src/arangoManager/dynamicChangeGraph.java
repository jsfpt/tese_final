package arangoManager;

import java.lang.annotation.Target;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.ExecutionException;

import javax.sql.rowset.serial.SerialArray;

import com.arangodb.ArangoCollection;
import com.arangodb.ArangoCursor;
import com.arangodb.ArangoDBException;
import com.arangodb.ArangoDatabase;
import com.arangodb.entity.BaseDocument;

import classes.Edge;
import classes.Service;

public class dynamicChangeGraph {
	

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
				//System.out.println("adding a new link");
				added = true;
				Random r = new Random();
				int low = 0;
				int high = keys.size()-1;
				int indexTargetService = r.nextInt(high-low) + low;
				String targetKey = keys.get(indexTargetService);  // we have the 2 keys necessary to create a link	
				if(!targetKey.equals(CurrentKey)) {
					String finalKeySource = "services"+id+"/" + CurrentKey;
					String finalkeyTarget = "services"+id+"/"+  targetKey;
					crud_arango.saveEdge(db,new Edge(finalKeySource, finalkeyTarget, CurrentKey+""+targetKey),id,"calls"+id,"services"+id);

				}
			}

		}
		return added;

	}

		
	public ArrayList<Service> createGraph(int numberServicesLow, int numberServicesHigh,long date) {
		ArrayList<Service> serviceArray = new ArrayList<Service>();
		ArrayList<Edge> edgeArray = new ArrayList<Edge>();
		
		
		Random r = new Random();
		
		int midlePoint = numberServicesLow+ ((numberServicesHigh-numberServicesLow)/2);
		int numberInstances = (int) ((r.nextGaussian() * (numberServicesHigh - numberServicesLow)/2) + midlePoint);
		int numberServices = numberInstances/3;
		
		for(int i=0;i<numberInstances;i++) {
			
			//------------------------------------------ create a service 	---------------------------------------------------------
			String serviceName = "instance"+ Integer.toString(i);
			Service newService = createServiceAndInstances(serviceName,date,numberServices);
			serviceArray.add(newService);
		}
		return serviceArray;
		
	}
	
	public Service createServiceAndInstances(String instanceName,long date,int numberServices) {
		Random r = new Random();
		
		ArrayList<Service> instances = new ArrayList<Service>();
		/*int numberInstancesGauss = (int) ((r.nextGaussian() * numberInstances/2) + numberInstances);*/
		
		// ----------------------------------------- Add his instances ----------------------------------------------------------
		/*for(int j=0;j<numberInstancesGauss;j++) {
			String instanceName = "Instance" + Integer.toString(j);
			Service instance = new Service(instanceName,instanceName);
			instances.add(instance);
		}*/
		
		String serviceName = "service"+getRandomNumber(0, numberServices);
		return  new Service(instanceName, instanceName,date,serviceName);
		
	}
	
	
	public int getRandomNumber(int low, int high) {
		Random r = new Random();
		int result = r.nextInt(high-low) + low;
		return result;
	}
	
	
	public ArrayList<Edge> addEdgesToGraph(ArrayList<Service> serviceArray, double probLink, int numberServices){
		Random r = new Random();
		ArrayList<Edge> edgeArray = new ArrayList<Edge>();
		int low = 00;
		int high = numberServices;
		for(Service currentService: serviceArray) 
		{
			int numberEdges = 0;
			for(Service serviceTo: serviceArray) 
			{
				double numProb = Math.random();
				if(numProb < probLink && !serviceTo.equals(currentService))
				{
					numberEdges++;
					// ----------------------------------------- add Link  -----------------------------------------
					int serviceLinkIndex = r.nextInt(high-low) + low;
					Service serviceLink = serviceArray.get(serviceLinkIndex);
					int numberCalls = r.nextInt(20);
					Edge newEdge = new Edge(currentService.getLabel(), serviceLink.getLabel(),Integer.toString(numberCalls));
					edgeArray.add(newEdge);
				}
			}
			//System.out.println("Added Edges:"+numberEdges+"/"+numberServices);
		}
		
		return edgeArray;
	}
	
	public void addServicesToDb(ArangoDatabase db,ArrayList<Service> serviceArray) {
		// must create a new service with the above function
		int numberServices = serviceArray.size();
		String name = "service"+ Integer.toString(numberServices);
		
		// to add edges to the service its necessary to get the key of the services where the edge hits
		// then just create a edge whit the function used before like:
		// saveEdge(db,new Edge(serviceFrom, serviceTo, listNodes.get(i)+listNodes.get(i+1)));
		
				    
	}
	
	public boolean removeEdges(ArangoDatabase db, double probRemoveLink,String collectionId) {
		
		ArrayList<String> keys = new ArrayList<String>();
		ArrayList<Service> serviceList = new ArrayList<Service>();
		//String query = "For v In services Return v.label";
		String callsName = "calls"+collectionId;
		String servicesName = "services-"+collectionId;
		ArangoCollection collection = db.collection(servicesName);
		
		ArangoCursor<BaseDocument> cursor = db.query("For v In "+callsName+" Return v",BaseDocument.class);
		cursor.forEachRemaining(aDocument -> {
			String key = (String) aDocument.getId();
			keys.add(key);	
			//System.out.println(key);
			
			//System.out.println("Key: " + aDocument.getAttribute("label"));
	    
		  });
		//System.out.println("number edges:"+keys.size());
		int removed = 0;
		for(int i=0;i<keys.size();i++) {
			if(Math.random()<probRemoveLink) {  // Remove Edge
				//System.out.println("Removing edge");
				removed++;
				removeEdgeByKey(db,keys.get(i),collectionId);
			}
		}
		if(removed!=0) {
			return true;
		}
		System.out.println("Edges Removed:"+removed);
		return false;
		//System.out.println("Removed:"+removed);
		
	}
	
	public void removeEdgeByKey(ArangoDatabase db,String key,String collectionId) {
		String collectionName = "calls"+collectionId;
		String query = "for u in "+collectionName+"\n" + 
				"filter u._key == \""+key+"\"\n" + 
				"remove { _key: u._key } in "+collectionName+"\n";
		//System.out.println(query);
		ArangoCursor<BaseDocument> cursor = db.query("for u in "+collectionName+"\n" + 
				"filter u._id == \""+key+"\"\n" + 
				"remove { _key: u._key } in "+collectionName+"\n" + 
				"",BaseDocument.class);
		
		
	}
	
	
	public boolean removeService(ArangoDatabase db, double probRemoveLink,String collectionId) {
		boolean removed = false;
		String collectionName = "services"+collectionId;
		ArangoCursor<BaseDocument> cursor = db.query("For v In "+collectionName+" Return v",BaseDocument.class);
		ArrayList<String> keys = new ArrayList<String>();
		cursor.forEachRemaining(aDocument -> {
			String key = (String) aDocument.getKey();	
			//key = "services/"+key;
			keys.add(key);
			
		  });
		for(String CurrentKey : keys) {
			if(Math.random()<probRemoveLink) { // remove service and correspondent edges
				
				// ----------------------- remove service from db  ----------------------- 
				try{
					ArangoCursor<BaseDocument> cursor2 = db.query("for u in "+collectionName+"\n" + 
				
						"filter u._key == \""+CurrentKey+"\"\n" + 
						"remove { _key: u._key } in services\n" + 
						"",BaseDocument.class);
					
					removed = true;
				}catch (Exception e) {
					removed = false;
				}
				
				try {
					// -----------------------  list of all the edges where the key exists ----------------------- 
					String callsCollectionName = "calls"+collectionId;
					ArangoCursor<BaseDocument> cursor3 = db.query("for u in "+callsCollectionName+"\n" + 
							"filter u._from == \""+"services"+collectionId+"/"+CurrentKey+"\"\n" + 
							"filter u._to s== \""+"services"+collectionId+"/"+CurrentKey+"\"\n" +
							"remove { _key: u._key } in services-"+collectionId+"\n" + 
							"",BaseDocument.class);
					
			
					
				} catch (Exception e) {
					// TODO: handle exception
				}
						//  ----------------------- remove the edges of the list above  ----------------------- 	
			}
		}
		
		return removed;
	}
	
			 
}
