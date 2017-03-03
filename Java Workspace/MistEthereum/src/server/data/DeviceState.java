package server.data;

public class DeviceState extends ClientState{

	private static int DeviceID = 23223;
	public int ID = 0;
	
	public DeviceState()
	{
		ID = DeviceID;
		DeviceID++;
	}
	
}
