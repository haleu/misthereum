package events;

import java.io.IOException;
import java.io.ObjectOutputStream;

import client.data.ClientState;

public class ClientEventHandler extends EventHandler{

	@Override
	public void NetworkMessage(String[] Message) {
		// TODO Auto-generated method stub
		
	}
	
	public void ButtonMessage(String Message) {
		String[] s = new String[1];
		s[0] = Message;
		try {
			ObjectOutputStream output = new ObjectOutputStream(ClientState.GetState().GetNetwork().GetSocket().getOutputStream());
			output.writeObject(s);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
