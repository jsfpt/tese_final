package restApi;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class example {

	private Date current_time;
	 private String state;
	 
	 public example(String state) {
	 this.state = state;
	 this.current_time = new Date();
	 }

	 public Date getCurrent_time() {
	 return current_time;
	 }

	 public String getState() {
	 return state;
	 }
	 
	 
}
