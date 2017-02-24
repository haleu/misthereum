package events;

import server.client.Client;

public class UserEventHandler extends EventHandler{

	private Client Owner = null;

	public UserEventHandler(Client c)
	{
		Owner = c;
	}
	
	public Client GetOwner()
	{
		return Owner;
	}
	
	@Override
	public void NetworkMessage(String[] Message) {
		// TODO Auto-generated method stub
		
	}
	
}
