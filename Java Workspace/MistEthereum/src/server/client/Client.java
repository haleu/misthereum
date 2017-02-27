package server.client;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;

import events.DeviceEventHandler;
import events.EventHandler;
import server.data.ClientState;
import server.data.UserState;
import events.ClientEventHandler;

public class Client extends Thread{
	
	private Socket ClientSocket;
	private ObjectOutputStream Output;
	private ObjectInputStream Input;
	private boolean Connected = false;
	private EventHandler EventHandler = null;
	private ClientState State = null;
	
	public ClientState GetState()
	{
		return State;
	}
	
	public void SetState(ClientState cs)
	{
		State = cs;
	}
	
	public Client(Socket s)
	{
		ClientSocket = s;
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
		if(Output == null)
		{
			try {
				Output = new ObjectOutputStream(ClientSocket.getOutputStream());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
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
						SetEventHandler(new ClientEventHandler(this));
					}
					if(State == null){
						SetState(new UserState());
					}
					EventHandler.NetworkMessage(s);
					
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
