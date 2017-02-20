package server.data;

import server.network.ServerNetwork;

public class ServerState {

	private static ServerState State;
	private ServerNetwork Network;

	static public ServerState GetState()
	{
		if(State == null)
		{
			State = new ServerState();
		}
		return State;
	}
	
	public void SetNetwork(ServerNetwork Network)
	{
		this.Network = Network;
	}
	
}
