package events;

import java.io.IOException;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.eclipse.jetty.websocket.api.WebSocketListener;

public class MinerEventHandler implements WebSocketListener{
	
	Session Miner = null;
	
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
		System.out.println("Message: " + arg0);
	}

}
