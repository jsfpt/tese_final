package classes;

import com.arangodb.entity.DocumentField;
import com.arangodb.entity.DocumentField.Type;

public class Edge {
	@DocumentField(Type.ID)
	private String id;

	@DocumentField(Type.KEY)
	private String key;

	@DocumentField(Type.REV)
	private String revision;

	@DocumentField(Type.FROM)
	private String from;

	@DocumentField(Type.TO)
	private String to;

	private String numberCalls;



	public Edge() {
		super();
	}

	public Edge(String from, String to, String numberCalls) {
		super();
		this.from = from;
		this.to = to;
		this.numberCalls = numberCalls;
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

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getNumberCalls() {
		return numberCalls;
	}

	public void setNumberCalls(String numberCalls) {
		this.numberCalls = numberCalls;
	}

	@Override
	public String toString() {
		return "Edge [id=" + id + ", key=" + key + ", revision=" + revision + ", from=" + from + ", to=" + to
				+ ", numberCalls=" + numberCalls + "]";
	}




}
