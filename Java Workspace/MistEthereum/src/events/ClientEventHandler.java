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
		if(session == null)
		{
			String[] ms = new String[3];
			ms[0] = "Operation error";
			ms[1] = "Miner is not connected to the server, please contact support";
			ms[2] = "";
			SendToClient(Owner, ms);
			return;
		}
		try {
			session.getRemote().sendString(Message);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	// H�r hanteras messages fr�n client
	
	@Override
	public void NetworkMessage(String[] Message) {
		if(Message[0].equals("Get Data") || Message[0].equals("Set Data"))
		{
			ForwardData(Message);
		}
		else if(Message[0].equals("Give Data"))
		{
			GiveData(Message);
		}
		else if(Message[0].equals("Device"))
		{
			Owner.SetState(new DeviceState());
		}
		else if(Message[0].equals("Login"))
		{
			Login(Message);
		}
		else if(Message[0].equals("Get Devices"))
		{
			GetDevices(Message);
		}
	}
	
	private void ForwardData(String[] s)
	{
		s[2] = ((UserState)Owner.GetState()).Address;
		if(s[2].equals("null"))
		{
			return;
		}
		
		for(Client c : ServerState.GetState().GetClients())
		{
			if(c.GetState() instanceof DeviceState)
			{
				if(((DeviceState)c.GetState()).ID == Integer.parseInt(s[3]))
				{
					String mm = s[0] + "," + s[1] + "," + s[2] + "," + s[3] + "," + s[4];
					SendToMiner(mm);
					return;
				}
			}
		}
		
		String[] ms = new String[3];
		ms[0] = "Operation error";
		ms[1] = "Device not connected: " + s[3];
		
		SendToClient(Owner, ms);
		
	}
	
	private void GiveData(String[] s)
	{
		for(Client c : ServerState.GetState().GetClients())
		{
			if(c.GetState() instanceof UserState)
			{
				if(((UserState)c.GetState()).Address.equals(s[2]))
				{
					SendToClient(c, s);
					break;
				}
			}
		}
	}
	
	private void GetDevices(String[] s)
	{
		s[1] = ((UserState)Owner.GetState()).Address;
		String mm = s[0] + "," + s[1];
		SendToMiner(mm);
	}
	
	private void Login(String[] Message)
	{
		((UserState)Owner.GetState()).Username= Message[1];
		((UserState)Owner.GetState()).Password = Message[2];
		String mm = Message[0] + "," + Message[1] + "," + Message[2] + "," + Message[3];
		SendToMiner(mm);
	}
	
}
