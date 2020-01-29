package arangoManager;

import java.util.*;
import java.util.Arrays;
import java.util.List;
import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import org.influxdb.*;
import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.annotation.Measurement;

import org.influxdb.annotation.*;
import org.influxdb.dto.BatchPoints;
import org.influxdb.dto.Point;
import org.influxdb.dto.Pong;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.influxdb.impl.InfluxDBResultMapper;

import classes.edgeInfoByTimeStamp;
import classes.httpInfo_influx;
import classes.*;


public class Crud_influx {
	
	String dbName;
	
	
	
	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public Crud_influx() {
		super();
	}


	private InfluxDB influxDB;

	
	@SuppressWarnings("deprecation")
	
	public InfluxDB initDbInflux(String dbName) {
		System.out.println("debug1");
		try {
			this.influxDB = InfluxDBFactory.connect("http://localhost:8086");
			System.out.println("debug2");
			
		}catch (Exception e) {
			System.out.println(e);
		}
		
		Pong response = this.influxDB.ping();
		if (response.getVersion().equalsIgnoreCase("unknown")) {
		    System.out.println("Error pinging server.");
		    return null;
		} 
		
		try {
			//influxDB.createDatabase("baeldung");
			influxDB.createDatabase(dbName);
			
			influxDB.createRetentionPolicy(
			  "defaultPolicy", dbName, "30d", 1, true);
		}catch (Exception e) {
			System.out.println(e);
		}
		return this.influxDB;
	
	}
	
	public static void addEdgeListInflux(edgeInfoByTimeStamp edgeInfoToAdd,String dbName, InfluxDB influxDB) throws IOException{
		Long timeStamp = edgeInfoToAdd.getTimestamp();
		String edgeInfoJson = JsonFunctions.edgesInfoTimeStampToJson(edgeInfoToAdd);
		//System.out.println("time:"+timeStamp+"\nString:\n"+edgeInfoJson);
		BatchPoints batchPoints = BatchPoints
		
				  .database(dbName)
				  .retentionPolicy("defaultPolicy")
				  .build();
		
		Point point = Point.measurement("memory")
				  .time(timeStamp, TimeUnit.SECONDS)
				  .addField("edgeInfo", edgeInfoJson)
				  .build();
		
		batchPoints.point(point);
		influxDB.write(batchPoints);
	}
	
	public static String getEdgeInfoPointByTimeStamp(long timeStamp,InfluxDB influxDB) {
		//000000000´
		// TODO:
		// put return 
		String queryTimeStamp = "Select * from memory  WHERE time = "+ timeStamp+"000000000";
		String queryNormal = "Select * from memory";
		//System.out.println(queryTimeStamp);
		QueryResult queryResult = influxDB.query(new Query(queryTimeStamp, "baeldung"));
		
				 
				InfluxDBResultMapper resultMapper = new InfluxDBResultMapper();
				
				List<edgeInfoPojo> memoryPointList = resultMapper
				  .toPOJO(queryResult, edgeInfoPojo.class);
				Instant edgeInfoTime = memoryPointList.get(0).getTimeStamp();
				//System.out.println(edgeInfoTime);
				//System.out.println("resultado query:");
				//System.out.println(memoryPointList.get(0).getEdgeInfoJson());
				return memoryPointList.get(0).getEdgeInfoJson();
	}
	
	/*
	public void insertListInstances(ArrayList<Instance_influx> listInstances, long timeStamp,String dbName)
	{
		BatchPoints batchPoints = BatchPoints
				  .database(this.dbName)
				  .retentionPolicy("defaultPolicy")
				  .build();
		
	}
	
	
	public Point insertInstanceInflux(Instance_influx instance, long timeStamp) {
		return null;
		
		
	}*/
	
}
