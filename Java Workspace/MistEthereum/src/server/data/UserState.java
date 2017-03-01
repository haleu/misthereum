package server.data;

public class UserState extends ClientState{

	private static int UserID = 0;
	public int ID = 0;
	
	public String Address = "0xa45d59b32510907d0ba3d7ced0a40274e7a9bfaa";
	public String Username;
	public String Password;
	
	public UserState()
	{
		ID = UserID;
		UserID++;
	}
	
}
