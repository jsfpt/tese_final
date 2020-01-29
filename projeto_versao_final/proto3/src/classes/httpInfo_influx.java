package classes;

public class httpInfo_influx {
	String code; // ex: 201 Created
	int numberRequests;
	int meanTime;
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public int getNumberRequests() {
		return numberRequests;
	}
	public void setNumberRequests(int numberRequests) {
		this.numberRequests = numberRequests;
	}
	public int getMeanTime() {
		return meanTime;
	}
	public void setMeanTime(int meanTime) {
		this.meanTime = meanTime;
	}
	public httpInfo_influx() {
		super();
		// TODO Auto-generated constructor stub
	}
	public httpInfo_influx(String code, int numberRequests, int meanTime) {
		super();
		this.code = code;
		this.numberRequests = numberRequests;
		this.meanTime = meanTime;
	}

	
	
		
}
