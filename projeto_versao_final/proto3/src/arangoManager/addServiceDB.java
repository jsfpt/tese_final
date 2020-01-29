package arangoManager;

import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.ExecutionException;

import com.arangodb.ArangoCursor;
import com.arangodb.ArangoDBException;
import com.arangodb.ArangoDatabase;
import com.arangodb.entity.BaseDocument;

import classes.Edge;
import classes.Service;

public class addServiceDB {

	// Add service To DB 
	public static boolean addServiceByProb(ArangoDatabase db,double probAddService,ArrayList<Service> serviceArray,int numberInstances,double probLink,long date,String graphName,String id) throws ArangoDBException, InterruptedException, ExecutionException {
		if(Math.random()<probAddService) {
			String instanceName = "service" + Integer.toString(serviceArray.size());

			//create service
			Random r = new Random();

			ArrayList<Service> instances = new ArrayList<Service>();
			int numberInstancesGauss = (int) ((r.nextGaussian() * numberInstances/2) + numberInstances);

			// ----------------------------------------- Add his instances ----------------------------------------------------------
			/*for(int j=0;j<numberInstancesGauss;j++) {
				String instanceName = "Instance" + Integer.toString(j);
				Service instance = new Service(instanceName,instanceName);
				instances.add(instance);
			}*/
			Service newService = new Service(instanceName, instanceName,date);
			//public Service(String id, String label,ArrayList<Service> instances,long date) {

			
			// add service to DB
			final String serviceString = crud_arango.createVertex(db, newService,graphName,"services"+id); //services/624345
			addLinksToService_addServiceByProb(db, newService, serviceString, probLink,id,"calls"+id,id);
			//saveEdge(db,new Edge(s2, s3, "23"));
			// -------------------------------   Add EDGES	------------------------------
			// percorrer os serviços todos, se a prob for menor, ir buscar a key à db e criar o vertex
			return true;
		}
		return false;

	}

	
	// add links to the service previous created
	
	public static void addLinksToService_addServiceByProb(ArangoDatabase db, Service newService, String serviceString,double probLink, String graphName,String id,String idQuery) {
		//ArrayList<String> keysServicesToLink = new ArrayList<String>();
		ArangoCursor<BaseDocument> cursor = db.query("For v In services" + idQuery + " Return v",BaseDocument.class);
		cursor.forEachRemaining(aDocument -> {
			String key = (String) aDocument.getKey();
			if(Math.random()<probLink) {
				try {
					crud_arango.saveEdge(db,new Edge(serviceString, "services/"+key, serviceString+""+key),graphName,id,"services"+id);
				} catch (ArangoDBException | InterruptedException | ExecutionException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}		
		});

	}



}
