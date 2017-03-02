package client.data;

import java.util.Observable;

import javax.swing.DefaultListModel;
import javax.swing.JList;

import client.network.ClientNetwork;
import events.UserEventHandler;
import events.EventHandler;

public class ClientState extends Observable{
	
	private static ClientState State;
	private ClientNetwork Network;
	private EventHandler EventHandler;
	
	private DefaultListModel<String> DeviceModel = null;

	public ClientState()
	{
		EventHandler = new UserEventHandler();
	}
	
	public void SetDeviceModel(DefaultListModel<String> DeviceModel)
	{
		this.DeviceModel = DeviceModel;
	}
	
	public DefaultListModel<String> GetDeviceModel()
	{
		return DeviceModel;
	}
	
	public EventHandler GetEventHandler()
	{
		return EventHandler;
	}
	
	public void SetEventHandler(EventHandler e)
	{
		EventHandler = e;
	}
	
	static public ClientState GetState()
	{
		if(State == null)
		{
			State = new ClientState();
		}
		return State;
	}
	
	public void SetNetwork(ClientNetwork Network)
	{
		this.Network = Network;
	}
	
	public ClientNetwork GetNetwork()
	{
		if(Network != null)
		{
			return Network;
		}else
		{
			return null;
		}
	}
	
}
