package classes;

import java.util.ArrayList;


// add serviceName

public class node{

	private String name;
	private long date;
	private String serviceName;

	public node(String name) {
		super();
		this.name = name;
	}



	public node(String name,long date) {
		super();
		this.name = name;
		this.date = date;
	}

	


	public node(String name, long date, String serviceName) {
		super();
		this.name = name;
		this.date = date;
		this.serviceName = serviceName;
	}

	


	public String getServiceName() {
		return serviceName;
	}



	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}



	public long getDate() {
		return date;
	}



	public void setDate(long date) {
		this.date = date;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}



	@Override
	public String toString() {
		return "node [name=" + name + ", date=" + date + ", serviceName=" + serviceName + "]";
	}






}
