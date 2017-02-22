package client.data;

import java.util.Observable;

import client.network.ClientNetwork;
import events.ClientEventHandler;
import events.EventHandler;

public class ClientState extends Observable{
	
	private static ClientState State;
	private ClientNetwork Network;
	private EventHandler EventHandler;

	public ClientState()
	{
		EventHandler = new ClientEventHandler();
	}
	
	public EventHandler GetEventHandler()
	{
		return EventHandler;
	}
	
	public void SetEventHandler(EventHandler e)
	{
		EventHandler = e;
	}
	
	static public ClientState GetState()
	{
		if(State == null)
		{
			State = new ClientState();
		}
		return State;
	}
	
	public void SetNetwork(ClientNetwork Network)
	{
		this.Network = Network;
	}
	
	public ClientNetwork GetNetwork()
	{
		if(Network != null)
		{
			return Network;
		}else
		{
			return null;
		}
	}
	
}
