package server.user;

import java.net.Socket;

public class UserClient {
	
	private Socket ClientSocket;
	
	public UserClient(Socket s)
	{
		ClientSocket = s;
	}
	
}
