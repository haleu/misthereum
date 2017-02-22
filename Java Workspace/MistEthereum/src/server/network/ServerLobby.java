package server.network;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

import server.client.Client;
import server.data.ServerState;

public class ServerLobby implements Runnable{

	ServerSocket HostSocket;
	
	public ServerLobby(ServerSocket ss)
	{
		HostSocket = ss;
	}

	public void run() {
		System.out.println("Starting lobby");

	    while (true) {
	    	Socket socket = null;
	        	if(HostSocket != null){
	        		try{
	        			System.out.println("Waiting for client ...");
		        		socket = HostSocket.accept();    		     	
		        		ServerState.GetState().AddUser(new Client(socket));
		        		
		        	}catch(IOException e){
		        		System.out.println("A client couldn't connect");
		        	}
	        		System.out.println("Client connected \n Socket: " + socket);
	        	}
	    }
	}
	
}
