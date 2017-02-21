package server.data;

import java.util.ArrayList;

import server.network.ServerNetwork;
import server.user.UserClient;

public class ServerState {

	private static ServerState State;
	private ServerNetwork Network;
	private ArrayList<UserClient> Users = new ArrayList<UserClient>();

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
	
	public void AddUser(UserClient uc)
	{
		Users.add(uc);
	}
	
}
