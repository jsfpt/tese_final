package arangoManager;

import java.util.ArrayList;

import classes.Service;
import classes.node;

public class arrayOperations {
	public static void printServiceArray(ArrayList<Service> serviceArray) {
		System.out.println("print Service Array");
		for(Service serviceIterate : serviceArray) {
			System.out.println(serviceIterate);
			System.out.println(serviceIterate.toString());
		}
		/*
		for(int i=0;i<serviceArray.size();i++) {
			Service serviceIterated = serviceArray.get(i);
			System.out.println("Name:"+ serviceIterated.getLabel()+"  " +serviceIterated.getServiceName());
		}*/
	}
	
	public static void printNodeArray(ArrayList<node>nodeList){
		for(int i=0;i<nodeList.size();i++) {
			System.out.println(nodeList.get(i).toString());
		}
	}
}
