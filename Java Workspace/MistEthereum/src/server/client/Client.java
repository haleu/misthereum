package server.client;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;

import events.DeviceEventHandler;
import events.EventHandler;
import events.UserEventHandler;

public class Client extends Thread{
	
	private Socket ClientSocket;
	private ObjectOutputStream Output;
	private ObjectInputStream Input;
	private boolean Connected = false;
	private EventHandler EventHandler = null;
	
	public Client(Socket s)
	{
		ClientSocket = s;

		try {
			Output = new ObjectOutputStream(ClientSocket.getOutputStream());
		} catch (IOException e) {
			System.out.println("Could not get output Stream");
		}
		
		Connected = true;
		start();
	}
	
	public void SetEventHandler(EventHandler e)
	{
		EventHandler = e;
	}
	
	public EventHandler GetEventHandler()
	{
		return EventHandler;
	}
	
	public ObjectOutputStream GetOutput()
	{
		return Output;
	}
	
	public void run()
	{
		while(true)
		{
			while(Input == null){
				try{
	    			Input = new ObjectInputStream(ClientSocket.getInputStream());
	    		}catch(IOException e){
	    			System.out.println("Could not get input stream for " + ClientSocket.toString());
	    		}
				try {
					Thread.sleep(16);
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}
			} 
			while(Connected)
			{			
				try {
					String[] s = (String[])Input.readObject();
					if(EventHandler == null)
					{
						if(s[0].equals("User"))
						{
							SetEventHandler(new UserEventHandler(this));
							System.out.println("User event handler created");
						}else if(s[0].equals("Device"))
						{
							SetEventHandler(new DeviceEventHandler(this));
							System.out.println("Device event handler created");
						}
					}else{
						EventHandler.NetworkMessage(s);
					}
					
				} catch (IOException | ClassNotFoundException e) {
					e.printStackTrace();
					try {
						Thread.sleep(16);
					} catch (InterruptedException e1) {
						e1.printStackTrace();
					}			
				}
			}
			try {
				Thread.sleep(16);
			} catch (InterruptedException e1) {
				e1.printStackTrace();
			}
		}
	}
	
}
