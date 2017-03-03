package server.client;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.ArrayList;

import events.DeviceEventHandler;
import events.EventHandler;
import server.data.ClientState;
import server.data.ServerState;
import server.data.UserState;
import events.ClientEventHandler;

public class Client extends Thread{
	
	private Socket ClientSocket;
	private ObjectOutputStream Output;
	private ObjectInputStream Input;
	private boolean Connected = false;
	private ClientEventHandler EventHandler = null;
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
	
	public void SetEventHandler(ClientEventHandler e)
	{
		EventHandler = e;
	}
	
	public ClientEventHandler GetEventHandler()
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
	
	public void Disconnect()
	{
		Connected = false;
		ClientSocket = null;
		State = null;
		Output = null;
		Input = null;
		ArrayList<Client> cl = ServerState.GetState().GetClients();
		for(int i = 0; i < cl.size(); i++)
		{
			if(cl.get(i) == this)
			{
				cl.remove(i);
			}
		}
	}
	
	public void run()
	{
		while(Connected)
		{
			int i = 0;
			while(Input == null){
				
				try{
	    			Input = new ObjectInputStream(ClientSocket.getInputStream());
	    		}catch(IOException e){
	    			if(i > 4)
	    			{
	    				System.out.println("Client timed out. Disconnecting");
	    				Disconnect();
	    				break;
	    			}
	    			System.out.println("Could not get input stream for " + ClientSocket.toString());
	    			i++;
	    			try {
						Thread.sleep(5000);
					} catch (InterruptedException e1) {
						e1.printStackTrace();
					}
	    		}
			} 
			if(!Connected) break;
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
				Input = null;
				try {
					Thread.sleep(16);
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}			
			}
			try {
				Thread.sleep(16);
			} catch (InterruptedException e1) {
				e1.printStackTrace();
			}
		}
		Disconnect();
	}
	
}
