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
	
	private void GetTemp(String[] Message)
	{
		Random rand = new Random();
		Message[0] = "Give Temp";
		Message[3] = Integer.toString(rand.nextInt());
		SendToServer(Message);
	}

}
