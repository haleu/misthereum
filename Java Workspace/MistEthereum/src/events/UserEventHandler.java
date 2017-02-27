package events;

import java.io.IOException;
import java.io.ObjectOutputStream;

import client.data.ClientState;
import server.data.ServerState;

public class UserEventHandler extends EventHandler{

	@Override
	public void NetworkMessage(String[] Message) {
		if(Message[0].equals("Get Temp"))
		{
			System.out.println("Get temp!");
			Message[0] = "Give Temp";
			SendToServer(Message);
		}else if(Message[0].equals("Give Temp"))
		{
			System.out.println("Got Temp");
		}
	}
	
	public void SendToServer(String[] Message)
	{
		ObjectOutputStream output = ClientState.GetState().GetNetwork().GetOutput();
		try {
			output.writeObject(Message);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/*
	 * This can be changed
	 */
	public void ButtonMessage(String Message) {
		if(Message.equals("Device"))
		{
			String[] s = new String[0];
			s[0] = "Device";
			ClientState.GetState().SetEventHandler(new DeviceEventHandler());
			SendToServer(s);
		}else if(Message.equals("Get Temp"))
		{
			String[] s = new String[1];
			s[0] = "Get Temp";
			SendToServer(s);
		}
	}

}
