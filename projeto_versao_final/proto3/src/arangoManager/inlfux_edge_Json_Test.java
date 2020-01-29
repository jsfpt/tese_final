package arangoManager;

import java.io.BufferedReader;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

import org.influxdb.InfluxDB;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import classes.Edge_Influx;
import classes.edgeInfoByTimeStamp;
import classes.httpInfo_influx;
import classes.link;


public class inlfux_edge_Json_Test {

	public static edgeInfoByTimeStamp  testEdgeInfluxSerialize() throws IOException {
		ArrayList<String> httpCodes = new ArrayList<String>();
		httpCodes.add("202 Accepted");
		httpCodes.add("203 Non-authoritative Information");
		httpCodes.add("204 No Content");
		httpCodes.add("205 Reset Content");
		httpCodes.add("206 Partial Content");
		httpCodes.add("207 Multi-Status");
		ArrayList<Edge_Influx> edge_influx_list = new ArrayList<Edge_Influx>();
		for(int i =0;i<10;i++) {
			ArrayList<httpInfo_influx> listHttps = new ArrayList<httpInfo_influx>();
			for(int j=0;j<3;j++) {
				httpInfo_influx httpClass = new httpInfo_influx(httpCodes.get(j),j*10,j*3);
				listHttps.add(httpClass);
			}
			Edge_Influx newEdge = new Edge_Influx("from","test",listHttps);
			edge_influx_list.add(newEdge);
		}
		
		edgeInfoByTimeStamp newEdgeInfoTimeStamp = new edgeInfoByTimeStamp(System.currentTimeMillis()/1000,edge_influx_list);
		System.out.println(System.currentTimeMillis()/1000);
		return newEdgeInfoTimeStamp;
		//Crud_influx.addEdgeListInflux(newEdgeInfoTimeStamp,dbName,influxdb);
		
		/*GsonBuilder builder = new GsonBuilder(); 
		builder.setPrettyPrinting(); 

		Gson gson = builder.create(); 

		String json = gson.toJson(newEdgeInfoTimeStamp);
		//System.out.println(json);
		try (FileWriter file = new FileWriter("edgeInflux.json")) {
			file.write(json);
			//System.out.println("Successfully Copied JSON Object to File...");
			//System.out.println("\nJSON Object: " + json);
		}*/
		
	
	}
	
	public void createHttpCodeInfoToEdge(String from, String target,ArrayList<String> httpList,int numberHttpCodes,int meanNumberRequests, int meanRequestTimes){
		
	}
	
	public ArrayList<String> getHttpListFromFile(){
		ArrayList<String> httpList = new ArrayList<String>();
		BufferedReader reader;
		try {
			reader = new BufferedReader(new FileReader("list_http_codes.txt"));
			String line = reader.readLine();
			while (line != null) {
				//System.out.println(line);
				httpList.add(line);
				// read next line
				line = reader.readLine();
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return httpList;
		
	}
	public int randomTwoNumbers(int low,int high) {
		Random r = new Random();
		int result = r.nextInt(high-low) + low;
		return result;
	}
}
