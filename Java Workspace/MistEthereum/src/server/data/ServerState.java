package server.data;

import java.util.ArrayList;

import server.client.Client;
import server.network.MinerNetwork;
import server.network.ServerNetwork;

public class ServerState {

	private static ServerState State = null;
	private MinerNetwork Miner;
	private ServerNetwork Network;
	private ArrayList<Client> Users = new ArrayList<Client>();

	static public ServerState GetState()
	{
		if(State == null)
		{
			State = new ServerState();
		}
		return State;
	}
	
	public void SetMiner(MinerNetwork Miner)
	{
		this.Miner = Miner;
	}
	
	public MinerNetwork GetMiner()
	{
		return Miner;
	}
	
	public void SetNetwork(ServerNetwork Network)
	{
		this.Network = Network;
	}
	
	public ServerNetwork GetNetwork()
	{
		return Network;
	}
	
	public void AddUser(Client uc)
	{
		Users.add(uc);
	}
	
}
