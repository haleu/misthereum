package events;

import java.io.IOException;
import java.io.ObjectOutputStream;

import client.data.ClientState;
import server.data.ServerState;

public class UserEventHandler extends EventHandler{

	@Override
	public void NetworkMessage(String[] Message) {
		if(Message[0].equals("Give Temp"))
		{
			System.out.println("Temperature of device: " + Message[2] + " is: " + Message[3]);
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
			String[] s = new String[4];
			s[0] = "Device";
			s[1] = "null";
			s[2] = "null";
			s[3] = "null";
			ClientState.GetState().SetEventHandler(new DeviceEventHandler());
			SendToServer(s);
		}else if(Message.equals("Get Temp"))
		{
			String[] s = new String[4];
			s[0] = "Get Temp"; // Operation
			s[1] = "null";	// User
			s[2] = "0";	// Device
			s[3] = "null";	// Data
			SendToServer(s);
		}
	}

}
