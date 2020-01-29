package classes;

import java.util.ArrayList;

public class edgeInfoByTimeStamp {
	
	long timestamp;
	ArrayList<Edge_Influx> edge_influx_list;
	
	
	public edgeInfoByTimeStamp(long timestamp, ArrayList<Edge_Influx> edge_influx_list) {
		super();
		this.timestamp = timestamp;
		this.edge_influx_list = edge_influx_list;
	}


	public long getTimestamp() {
		return timestamp;
	}


	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}


	public ArrayList<Edge_Influx> getEdge_influx_list() {
		return edge_influx_list;
	}


	public void setEdge_influx_list(ArrayList<Edge_Influx> edge_influx_list) {
		this.edge_influx_list = edge_influx_list;
	}


	public edgeInfoByTimeStamp() {
		super();
		// TODO Auto-generated constructor stub
	}


}
