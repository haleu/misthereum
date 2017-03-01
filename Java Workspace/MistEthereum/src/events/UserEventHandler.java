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
		String[] split = Message.split(",");
		
		if(split[0].equals("Device"))
		{
			String[] s = new String[4];
			s[0] = "Device";
			s[1] = "null";
			s[2] = "null";
			s[3] = "null";
			ClientState.GetState().SetEventHandler(new DeviceEventHandler());
			SendToServer(s);
		}else if(split[0].equals("Get Temp"))
		{
			GetTemp(Message);
		}else if(split[0].equals("Login"))
		{
			Login(split);
		}
	}
	
	private void Login(String[] Message)
	{
		String[] s = new String[4];
		s[0] = Message[0];
		s[1] = Message[1];
		s[2] = Message[2];
		s[3] = "null";
		SendToServer(s);
	}
	
	private void GetTemp(String Message)
	{
		String[] split = Message.split(",");
		String[] s = new String[5];
		
		s[0] = "Get Data";	// Data
		s[1] = "Get Temp"; // Operation
		s[2] = "null";	// User
		s[3] = split[1];	// Device
		s[4] = "null";	// Data
		
		SendToServer(s);
	}

}
