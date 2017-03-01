package events;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import server.client.Client;
import server.data.DeviceState;
import server.data.ServerState;
import server.data.UserState;

import org.eclipse.jetty.websocket.api.WebSocketListener;

/*
 * Får tillbaka ett message från miner efter clienteventhandler har skickat till miner. onWebSocketText() tar emot message från miner.
 */

public class MinerEventHandler implements WebSocketListener{
	
	private static Session Miner = null;
	
	public static Session GetMiner()
	{
		return Miner;
	}
	
	public void SendToMiner(String Message)
	{
		if(Miner != null)
		{		
			try {
				Miner.getRemote().sendString(Message);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public void onWebSocketClose(int arg0, String arg1) {
		// TODO Auto-generated method stub
		System.out.println("Close: statusCode=" + arg0 + ", reason=" + arg1);
	}

	@Override
	public void onWebSocketConnect(Session arg0) {
		// TODO Auto-generated method stub
		System.out.println("Connect: " + arg0.getRemoteAddress().getAddress());
        try {
            arg0.getRemote().sendString("Hello Webbrowser");
            Miner = arg0;
        } catch (IOException e) {
            e.printStackTrace();
        }
	}

	@Override
	public void onWebSocketError(Throwable arg0) {
		// TODO Auto-generated method stub
		System.out.println("Error: " + arg0.getMessage());
	}

	@Override
	public void onWebSocketBinary(byte[] arg0, int arg1, int arg2) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onWebSocketText(String arg0) {
		// TODO Auto-generated method stub
		String[] s = arg0.split(",");
		if(s[0].equals("Login"))
		{
			Login(s);
		}
		else if(s[0].equals("Get Temp"))
		{
			GetTemp(s);
		}
	}
	
	private void GetTemp(String[] s)
	{
		for(Client c : ServerState.GetState().GetClients())
			{
				if(c.GetState() instanceof DeviceState)
				{
					if(((DeviceState)c.GetState()).ID == Integer.parseInt(s[2]))
					{
						((ClientEventHandler)c.GetEventHandler()).SendToClient(c, s);
						break;
					}
				}
			}
	}
	
	private void Login(String[] s)
	{
		ArrayList<Client> clients = ServerState.GetState().GetClients();
		
		for(Client c: clients)
		{
			if(c.GetState() instanceof UserState)
			{
				UserState state = (UserState)c.GetState();
				
				if(state.Username.equals(s[1]) && state.Password.equals(s[2]))
				{
					state.Address = s[3];
				}
			}
		}
	}

}
