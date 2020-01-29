package arangoManager;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import classes.Edge;
import classes.Service;
import classes.edgeInfoByTimeStamp;
import classes.link;
import classes.node;

public class JsonFunctions {
	

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
	public static String edgeListToJson(ArrayList<Edge> edgeList) throws IOException {
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

	public static String nodeListToJson(ArrayList<node> nodeList,String fileName) throws IOException {  
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

	public static String mergeJsonFiles(String file1, String file2,long nTime) throws IOException
	{
		String returnString ="";
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
		returnString+="{\"nodes\":";
		while (line1 != null) 
		{ 
			if(line1 != null) 
			{ 
				pw.println(line1); 
				returnString+= line1;
				line1 = br1.readLine(); 
			}  
		} 
		pw.print(",\n" + 
				"\"links\": ");
		returnString+= "," + 
				"\"links\": ";
		while (line2 != null) 
		{ 
			if(line2 != null) 
			{ 
				pw.println(line2); 
				returnString+=line2;
				line2 = br2.readLine(); 
			}  
		} 
		pw.print("}");
		returnString+="}";

		pw.flush(); 

		// closing resources 
		br1.close(); 
		br2.close(); 
		pw.close(); 
		return returnString;
		//System.out.println("Merged link.json and node.json alternatively into file3.json"); 

	}
	
	
	public static String edgesInfoTimeStampToJson(edgeInfoByTimeStamp newEdgeInfoTimeStamp) throws IOException {
		
		GsonBuilder builder = new GsonBuilder(); 
		builder.setPrettyPrinting(); 

		Gson gson = builder.create(); 

		String json = gson.toJson(newEdgeInfoTimeStamp);
		//System.out.println(json);
		try (FileWriter file = new FileWriter("edgeInflux.json")) {
			file.write(json);
			//System.out.println("Successfully Copied JSON Object to File...");
			//System.out.println("\nJSON Object: " + json);
		}
		return json;
	}
	


}

