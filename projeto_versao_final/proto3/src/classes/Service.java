package classes;

import java.util.ArrayList;

import com.arangodb.entity.DocumentField;
import com.arangodb.entity.DocumentField.Type;

public class Service {
	@DocumentField(Type.ID)
	private String id;

	@DocumentField(Type.KEY)
	private String key;

	@DocumentField(Type.REV)
	private String revision;

	private String label;

	private String instanceString;

	private String serviceName;
	
	private long date;





	public String getInstanceString() {
		return instanceString;
	}

	public void setInstanceString(String instanceString) {
		this.instanceString = instanceString;
	}

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}

	public Service(String id, String label, String instanceString) {
		super();
		this.id = id;
		this.label = label;
		this.instanceString = instanceString;
	}

	public Service(String id, String label,long date) {
		super();
		this.id = id;
		this.label = label;
		this.date = date;
	}
	
	public Service(String id, String label,long date,String serviceName) {
		super();
		this.id = id;
		this.label = label;
		this.date = date;
		this.serviceName = serviceName;
	}
	
	

	public Service(String id, String label) {
		super();
		this.id = id;
		this.label = label;
	}

	public Service() {
		// TODO Auto-generated constructor stub
	}



	
	
	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getRevision() {
		return revision;
	}

	public void setRevision(String revision) {
		this.revision = revision;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	@Override
	public String toString() {
		return "Service [id=" + id + ", label=" + label + ", serviceName=" + serviceName + "]";
	}


	


}

