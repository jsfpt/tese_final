package arangoManager;

import java.util.ArrayList;

public class findOperationsArrays {
	public static String findServiceInArray(String id,ArrayList<ArrayList<String>> serviceArray) {
		//System.out.println("find func");
		int size = serviceArray.size();
		for(int i=0;i<size;i++) {
			if(serviceArray.get(i).get(0).equals(id)) {
				//System.out.println("found service String");
				return serviceArray.get(i).get(1);
			}
		}
		return "Error";

	}

	

}
