package client.gui;

import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.Observable;
import java.util.Observer;

import javax.swing.BoxLayout;
import javax.swing.DefaultListModel;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextField;

import client.data.ClientState;
import client.network.ClientNetwork;
import events.UserEventHandler;

public class ClientGUI implements Observer{

	private ClientNetwork Network;
	private ClientState State;
	
	private final JButton ConnectButton = new JButton("Connect IP");
	private final JButton DisconnectButton = new JButton("Disconnect");
	private final JButton CommandButton = new JButton("Send");
	private JLabel MessageLabel = new JLabel("Welcome");
	private JTextField IPText = new JTextField("130.240.92.168");
	private JTextField PortText = new JTextField("1234");
	private JTextField CommandText = new JTextField("Input Command");
	private DefaultListModel<String> DeviceModel = new DefaultListModel<String>();
	private JList<String> Devices = new JList<String>();
	private JLabel IPLabel = new JLabel("IP");
	private JLabel PortLabel = new JLabel("Port");
	
	public ClientGUI(ClientNetwork Network, ClientState State)
	{
		this.Network = Network;
		this.State = State;
		
		ConnectButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Network.Connect(IPText.getText(), Integer.parseInt(PortText.getText()));
			}
		});
		DisconnectButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Network.Disconnect();
			}
		});
		CommandButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
					String s;
					s = CommandText.getText();
					
					String DeviceID = Devices.getSelectedValue();
					if(DeviceID != null)
					{
						String[] t1 = DeviceID.split(" ");
						t1 = t1[1].split("-");
						DeviceID = t1[0];
					}
					((UserEventHandler)State.GetEventHandler()).ButtonMessage(s + "," + DeviceID);;
			}
		});
		
		State.SetDeviceModel(DeviceModel);
		Devices.setModel(DeviceModel);
		
		JFrame frame = new JFrame("User");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		
		JPanel panel1 = new JPanel();
		JPanel panel2 = new JPanel();
		JPanel panel3 = new JPanel();
		JPanel panel4 = new JPanel();
		JPanel panel5 = new JPanel();
		
		panel1.add(ConnectButton);
		panel1.add(DisconnectButton);
		
		Devices.setVisibleRowCount(5);
		Devices.setFixedCellWidth(350);
		Devices.setFixedCellHeight(20);
		
		panel2.add(new JScrollPane(Devices));
		
		JLabel l = new JLabel("IP : Port Number");
		  
		Dimension d1 = new Dimension(250, 20);
		Dimension d2 = new Dimension(100, 20);
		
		IPText.setPreferredSize(d1);
		PortText.setPreferredSize(d2);
		CommandText.setPreferredSize(d1);
		
		panel3.add(IPLabel);
		panel3.add(IPText);
		panel4.add(PortLabel);
		panel4.add(PortText);
		
		panel5.add(CommandText);
		panel5.add(CommandButton);
		
		BoxLayout boxLayout = new BoxLayout(frame.getContentPane(), BoxLayout.PAGE_AXIS);
		frame.setLayout(boxLayout);
		
		frame.add(panel2);
		frame.add(panel1);
		frame.add(panel3);
		frame.add(panel4);
		frame.add(panel5);
		
		frame.pack();
		
		frame.setVisible(true);
		
		
	}


	public void update(Observable arg0, Object arg1) {
		
	}
	
}
