package classes;

public class link {
	private String source;
	private String target;
	private String count;
	// list  of http codes
	// list of number of requests for each http code
	// list of mean request time for each http code
	
	public link(String source, String target, String count) {
		super();
		this.source = source;
		this.target = target;
		this.count = count;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getTarget() {
		return target;
	}
	public void setTarget(String target) {
		this.target = target;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}


}
