<<<<<<< HEAD
package events;

import java.io.IOException;
import java.io.ObjectOutputStream;

import org.eclipse.jetty.websocket.api.Session;

import server.client.Client;
import server.data.ServerState;
import server.network.MinerNetwork;

/* 
 * tar emot ett message från clienten och hämtar address och skickar vidare till miner via sendToMiner().
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
	
	// Här hanteras messages från client
	
	@Override
	public void NetworkMessage(String[] Message) {
		if(Message[0].equals("Get Temp"))
		{
			Client c = ServerState.GetState().GetClients().get(1);
			SendToClient(c, Message);
		}
		else if(Message[0].equals("Give Temp"))
		{
			Client c = ServerState.GetState().GetClients().get(0);
			SendToClient(c, Message);
		}
		else if(Message[0].equals("Get Devicelist"))
		{
			
		}
	}
	
}
=======
package events;

import java.io.IOException;
import java.io.ObjectOutputStream;

import org.eclipse.jetty.websocket.api.Session;

import server.client.Client;
import server.data.*;
import server.network.MinerNetwork;

/* 
 * tar emot ett message från clienten och hämtar address och skickar vidare till miner via sendToMiner().
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
	
	// Här hanteras messages från client
	
	@Override
	public void NetworkMessage(String[] Message) {
		if(Message[0].equals("Get Temp"))
		{
			Client c = ServerState.GetState().GetClients().get(1);
			SendToClient(c, Message);
		}
		else if(Message[0].equals("Give Temp"))
		{
			Client c = ServerState.GetState().GetClients().get(0);
			SendToClient(c, Message);
		}else if(Message[0].equals("Device"))
		{
			Owner.SetState(new DeviceState());
		}
	}
	
}
>>>>>>> 454a0a38391147a390ebf16426b1d970ecbbe242
