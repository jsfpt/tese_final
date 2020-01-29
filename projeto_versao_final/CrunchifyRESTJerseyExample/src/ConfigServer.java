import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
 
@Path("/config")
public class ConfigServer {
	
	int requests = 0;
	
	
	@GET
	@Produces("application/json")
	public String convertCtoF() throws IOException {
		File fileProtoFolder = new File("/home/joel/Desktop/prototipo/proto3/config.json");
		  String finalString = "";
		  BufferedReader br = new BufferedReader(new FileReader(fileProtoFolder)); 
		  String st; 
		  while ((st = br.readLine()) != null) {
			  finalString+=st;
			  //System.out.println(st); 
			  st = "";
		  } 
		return finalString;
	}
	
	
}

