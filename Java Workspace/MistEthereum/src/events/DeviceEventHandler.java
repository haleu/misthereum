package events;

import java.util.Random;

import server.client.Client;

public class DeviceEventHandler extends UserEventHandler{

	public DeviceEventHandler() {
	}

	@Override
	public void NetworkMessage(String[] Message) {
		if(Message[0].equals("Get Temp"))
		{
			GetTemp(Message);
		}
		
	}
	
	int temp = 0;
	
	private void GetTemp(String[] Message)
	{
		Message[1] = "Give Temp";
		Message[4] = Integer.toString(temp);
		temp++;
		SendToServer(Message);
	}

}
