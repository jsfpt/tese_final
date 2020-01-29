import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

@Path("/requestHandler")
public class recieveRequestSendServer {
	

	@GET
	@Produces("application/json")
	public String convertCtoF(@QueryParam("request") String request) throws IOException {
		Socket clientSocket;
	    PrintWriter out;
	    BufferedReader in;
	    String ip = "127.0.0.1";
	    int port = 2000;
	    //String request = "init";
	    try {
	    	clientSocket = new Socket(ip, port);
    	  out = new PrintWriter(clientSocket.getOutputStream(), true);
          in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
     
          out.println(request);
          System.out.println("Antes do loop de receber");
          String result = receiveResponse();
          clientSocket.close();
          System.out.println("End of request");
          return result;
	    }catch (Exception e) {
			// TODO: handle exception
	    	System.out.println(e);
		}
	  
        //String resp = in.readLine();
        //System.out.println(resp);
        /*while ((resp = in.readLine()) != null) {
        	System.out.println(resp);
             return resp;   
        }*/
        /*
        resp = in.readLine();
        return resp;/
        /*
        in.close();
        out.close();
        clientSocket.close();
    	*/
	    return "error";
        
	   	
	}
	
	public String receiveResponse() throws IOException {
		System.out.println("waiting for response...");

		ServerSocket serverSocket;
		Socket clientSocket;
		PrintWriter out;
		BufferedReader in;
		int port = 2002;

		serverSocket = new ServerSocket(port);
        clientSocket = serverSocket.accept();
   
        in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        out = new PrintWriter(clientSocket.getOutputStream(), true);
        
        //String input = in.readLine();
        String input;
        while ((input = in.readLine()) != null) {
        	clientSocket.close();
            serverSocket.close();
    		System.out.println("Crunchify: send to JS:"+input);
            System.out.println("returning while...");
        	return input;
        }
        System.out.println("returning...");
        clientSocket.close();
        serverSocket.close();
		
        return "error";
	}
	
	

}
