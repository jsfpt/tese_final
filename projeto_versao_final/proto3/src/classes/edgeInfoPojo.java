package classes;

import java.time.Instant;

import org.influxdb.annotation.Column;
import org.influxdb.annotation.Measurement;

@Measurement(name = "memory")
public class edgeInfoPojo {
	@Column(name = "time")
	private Instant timeStamp;
	
	@Column(name = "edgeInfo")
	private String edgeInfoJson;

	public Instant getTimeStamp() {
		return timeStamp;
	}

	
	public String getEdgeInfoJson() {
		return edgeInfoJson;
	}

	

}
