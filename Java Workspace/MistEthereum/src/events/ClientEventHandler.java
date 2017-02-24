package events;

import java.io.IOException;
import java.io.ObjectOutputStream;

import client.data.ClientState;

public class ClientEventHandler extends EventHandler{

	@Override
	public void NetworkMessage(String[] Message) {
		// TODO Auto-generated method stub
		
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
	
	public void ButtonMessage(String Message) {
		String[] s = new String[1];
		s[0] = Message;
		try {
			ObjectOutputStream output = ClientState.GetState().GetNetwork().GetOutput();
			output.writeObject(s);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
