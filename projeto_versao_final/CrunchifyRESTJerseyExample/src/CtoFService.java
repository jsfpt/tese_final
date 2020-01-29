import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

import javax.ws.*;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

@Path("/ctofservice")
public class CtoFService {

	int iterations = 0;
	@GET
	@Produces("application/json")
	public String convertCtoF(@QueryParam("iteration") String iteration) throws IOException {
		int requests = 0;
		System.out.println(iteration);


		
		
		// read iterations from file
		File file = 
				new File("/home/joel/Desktop/prototipo/proto3/iterations.json"); 
		Scanner sc = new Scanner(file); 
		String line = "1";
		while (sc.hasNextLine()) {
			line = sc.nextLine();
			line = line.replaceAll("[^\\d.]", "");
		}
		iterations = Integer.parseInt(line);
		



		if(requests<=iterations) {
			//System.out.println("Request:"+requests+"Iterations:"+iterations);
			//String fileName = "file"+ Integer.toString(requests); 
			String fileName = "file"+ iteration;
			System.out.println("Getting file:"+fileName);
			File fileProtoFolder = new File("/home/joel/Desktop/prototipo/proto3/"+fileName+".json");
			String finalString = "";
			BufferedReader br = new BufferedReader(new FileReader(fileProtoFolder)); 
			String st; 
			while ((st = br.readLine()) != null) {
				finalString+=st;
				//System.out.println(st); 
				st = "";
			} 
			requests+=1;

			return finalString;

		}
		else {
			return "Error";
		}
		

	}





}
