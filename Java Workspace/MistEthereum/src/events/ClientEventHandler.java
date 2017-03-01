package events;

import java.io.IOException;
import java.io.ObjectOutputStream;

import org.eclipse.jetty.websocket.api.Session;

import server.client.Client;
import server.data.*;
import server.network.MinerNetwork;

/* 
 * tar emot ett message fr�n clienten och h�mtar address och skickar vidare till miner via sendToMiner().
 */

public class ClientEventHandler extends EventHandler{

	private Client Owner = null;

	public ClientEventHandler(Client c)
	{
		Owner = c;
	}
	
	public Client GetOwner()
	{
		return Owner;
	}
	
	public void SendToClient(Client c, String[] Message)
	{
		ObjectOutputStream output = c.GetOutput();
		try {
			output.writeObject(Message);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void SendToMiner(String Message)
	{
		Session session = MinerEventHandler.GetMiner();
		try {
			session.getRemote().sendString(Message);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	// H�r hanteras messages fr�n client
	
	@Override
	public void NetworkMessage(String[] Message) {
		if(Message[0].equals("Get Temp"))
		{
			GetTemp(Message);
		}
		else if(Message[0].equals("Give Temp"))
		{
			GiveTemp(Message);
		}
		else if(Message[0].equals("Device"))
		{
			Owner.SetState(new DeviceState());
		}
		else if(Message[0].equals("Login"))
		{
			Login(Message);
		}
	}
	
	private void Login(String[] Message)
	{
		((UserState)Owner.GetState()).Password = Message[1];
		((UserState)Owner.GetState()).Username = Message[2];
		String mm = Message[0] + "," + Message[1] + "," + Message[2] + "," + Message[3];
		SendToMiner(mm);
	}
	
	private void GetTemp(String[] Message)
	{
		for(Client c : ServerState.GetState().GetClients())
		{
			if(c.GetState() instanceof DeviceState)
			{
				if(((DeviceState)c.GetState()).ID == Integer.parseInt(Message[2]))
				{
					Message[1] = Integer.toString(((UserState)Owner.GetState()).ID);
					SendToClient(c, Message);
					break;
				}
			}
		}
	}
	
	private void GiveTemp(String[] Message)
	{
		for(Client c : ServerState.GetState().GetClients())
		{
			if(c.GetState() instanceof UserState)
			{
				if(((UserState)c.GetState()).ID == Integer.parseInt(Message[1]))
				{
					SendToClient(c, Message);
					break;
				}
			}
		}
	}
	
}
