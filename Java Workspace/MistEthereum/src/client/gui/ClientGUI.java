package client.gui;

import java.util.Observable;
import java.util.Observer;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JTextField;

import client.data.ClientState;
import client.network.ClientNetwork;

public class ClientGUI implements Observer{

	private ClientNetwork Network;
	private ClientState State;
	
	private final JButton ConnectButton = new JButton("Connect IP");
	private final JButton DisconnectButton = new JButton("Disconnect");
	private final JButton CommandButton = new JButton("Send");
	private JLabel MessageLabel = new JLabel("Welcome");
	private JTextField URLText = new JTextField("127.0.0.1");
	private JTextField PortText = new JTextField("Port");
	private JTextField CommandText = new JTextField("Input Command");
	
	public ClientGUI(ClientNetwork Network, ClientState State)
	{
		this.Network = Network;
		this.State = State;
	}


	public void update(Observable arg0, Object arg1) {
		
	}
	
}
