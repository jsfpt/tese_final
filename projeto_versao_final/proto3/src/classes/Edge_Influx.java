package classes;

import java.util.ArrayList;

public class Edge_Influx {
	String from;
	String target;
	ArrayList<httpInfo_influx> httpCodesList;
	
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getTarget() {
		return target;
	}
	public void setTarget(String target) {
		this.target = target;
	}
	public ArrayList<httpInfo_influx> getHttpCodesList() {
		return httpCodesList;
	}
	public void setHttpCodesList(ArrayList<httpInfo_influx> httpCodesList) {
		this.httpCodesList = httpCodesList;
	}
	
	public Edge_Influx(String from, String target, ArrayList<httpInfo_influx> httpCodesList) {
		super();
		this.from = from;
		this.target = target;
		this.httpCodesList = httpCodesList;
	}
	
	public Edge_Influx() {
		super();
		// TODO Auto-generated constructor stub
	}

	public void print() {
		System.out.println("\n\n---------------------------\n");
		System.out.println("From:"+this.from+"\nTo:"+this.target);
		System.out.println("Http codes:");
		for(int i=0;i<this.httpCodesList.size();i++) {
			httpInfo_influx httpCode = httpCodesList.get(i);
			System.out.println("code:"+ httpCode.getCode()+ "\nNumber:"+httpCode.getNumberRequests()+"\nAverageTime:"+httpCode.getMeanTime());
		}
	}
	
	
}

