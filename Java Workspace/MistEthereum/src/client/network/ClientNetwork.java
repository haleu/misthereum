package client.network;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.Observable;

public class ClientNetwork extends Observable implements Runnable{
	

	private boolean Connected = false;
	private Socket ClientSocket;
	private ObjectOutputStream Out;
	private ObjectInputStream In;
	
	public void Connect(String ip, int portNum){
		if(!Connected){
			try
			{
				ClientSocket = new Socket(ip,portNum);
				Connected = true;
			}
			catch(Exception e)
			{
				System.out.println(e);
			}
		}
	}
	
	public void Disconnect(){
		try{
			Out.reset();
			Out.writeObject("disconnect");
			Out.flush();
			Connected = false;
			In.close();
			In = null;
			Out.close();
			Out = null;
			ClientSocket.close();	
			ClientSocket = null;
			setChanged();
			notifyObservers();
		}catch(IOException e){
			System.out.println("Could not disconnect socket " + ClientSocket + " ...");
			e.printStackTrace();
			Connected = true;
		}
	}
	
	public boolean IsConnected()
	{
		return Connected;
	}
	
	public Socket GetSocket()
	{
		return ClientSocket;
	}
	
	public void run() {
		while(true){
			while (Connected) { // keep running
		    	if(Out == null){
		    		try{
				    	Out = new ObjectOutputStream(ClientSocket.getOutputStream());
				    	System.out.println("Output stream in client created");
				    	System.out.println(ClientSocket + " has connected");
				    }catch(IOException e){
				    	System.out.println("Could not get output stream from " + ClientSocket.toString());
				    }
		    	}		
	        	if(In == null){
	        		try{
	        	    	In = new ObjectInputStream(ClientSocket.getInputStream());
	        	    	System.out.println("input stream for client created");
	        	    }catch(IOException e){
	        	    	System.out.println("Could not get input stream from " + ClientSocket.toString());
	        	    }
	        	}
	        	if(In != null){
//	        		try {
//	        			
//							setChanged();
//							notifyObservers();
//	        			}
//	        		catch (IOException | ClassNotFoundException e) {
//							System.out.println("couldn't read from server");				
//							try {
//								Thread.sleep(16);
//							} catch (InterruptedException e1) {
//								e1.printStackTrace();
//								
//							}
//					}
	        	}
		    }
		    try {
				Thread.sleep(16);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}   
	}

}
