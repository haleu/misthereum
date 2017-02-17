package client;

import client.data.ClientState;
import client.gui.ClientGUI;
import client.network.ClientNetwork;

public class MainClient {

	public static void main(String[] args)
	{
		ClientNetwork cn = new ClientNetwork();
		ClientState cs = ClientState.GetState();
		cs.SetNetwork(cn);
		ClientGUI cgui = new ClientGUI(cn, cs);
	}
}
