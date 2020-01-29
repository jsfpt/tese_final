package arangoManager;

import java.util.ArrayList;

import classes.Edge;
import classes.Service;
import classes.link;
import classes.node;

public class ClassesTransform {
	


	public static ArrayList<node> transformServiceToNodeInstances(ArrayList<Service> serviceList)
	{
		ArrayList<node> nodeList = new ArrayList<node>();
		for(Service iService:serviceList) {
			node auxNode = new node(iService.getLabel(),0,iService.getServiceName());
			nodeList.add(auxNode);
		}
		return nodeList;

	}



	public static ArrayList<node> transformServiceToNode(ArrayList<Service> serviceList)
	{
		ArrayList<node> nodeList = new ArrayList<node>();
		for(Service iService:serviceList) {
			node auxNode = new node(iService.getLabel());
			nodeList.add(auxNode);
		}
		return nodeList;

	}

	public static ArrayList<link> transformEdgeToLink(ArrayList<Edge> Edgelist)
	{
		ArrayList<link> linkList = new ArrayList<link>();
		for(Edge iEdge:Edgelist) {
			link auxLink = new link(iEdge.getFrom(), iEdge.getTo(), iEdge.getNumberCalls());
			linkList.add(auxLink);
		}
		return linkList;
	}



}
