package client.network;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.Observable;

import client.data.ClientState;

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
	
	public ObjectOutputStream GetOutput()
	{
		if(Out == null && IsConnected())
		{
			try {
				Out = new ObjectOutputStream(ClientSocket.getOutputStream());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return Out;
	}
	
	public void Disconnect(){
		try{
			if(Out != null)
			{
				Out.reset();
				Out.writeObject("disconnect");
				Out.flush();
				Out.close();
				Out = null;
			}
			if(In != null)
			{
				In.close();
				In = null;
			}
			
			Connected = false;	
			if(ClientSocket != null)
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
	        	if(In == null && ClientSocket != null){
	        		try{
	        	    	In = new ObjectInputStream(ClientSocket.getInputStream());
	        	    	System.out.println("input stream for client created");
	        	    }catch(IOException e){
	        	    	if(ClientSocket == null) break;
	        	    	System.out.println("Could not get input stream from " + ClientSocket.toString());
	        	    	try {
	    					Thread.sleep(5000);
	    				} catch (InterruptedException e1) {
	    					e1.printStackTrace();
	    				}
	        	    }
	        	}
	        	if(In != null){
	        		try {
						String[] s = (String[])In.readObject();
						ClientState.GetState().GetEventHandler().NetworkMessage(s);
						setChanged();
						notifyObservers();
											
					} catch (IOException | ClassNotFoundException e) {
					}
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
