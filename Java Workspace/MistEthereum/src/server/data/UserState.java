package server.data;

public class UserState extends ClientState{

	private static int UserID = 0;
	public int ID = 0;
	
	public String Address = "null";
	public String Username;
	public String Password;
	
	public UserState()
	{
		ID = UserID;
		UserID++;
	}
	
}
