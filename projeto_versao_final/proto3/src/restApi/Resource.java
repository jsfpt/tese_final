package restApi;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/world")
public class Resource {

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public example get() {
		System.out.println("Debug");
		return new example("fine");
	}
}
