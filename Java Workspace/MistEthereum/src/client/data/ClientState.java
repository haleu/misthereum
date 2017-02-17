package client.data;

import java.util.Observable;

import client.network.ClientNetwork;

public class ClientState extends Observable{
	
	private static ClientState State;
	private ClientNetwork Network;

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
	
}
