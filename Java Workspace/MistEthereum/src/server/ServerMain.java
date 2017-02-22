package server;

import java.net.InetAddress;
import java.net.ServerSocket;
import java.util.Scanner;

import server.data.ServerState;
import server.network.*;

public class ServerMain {
	
	
	
	public static void main(String[] args)
	{
		ServerNetwork sn = new ServerNetwork();
		ServerState.GetState().SetNetwork(sn);
		
		Scanner in = new Scanner(System.in);
		
		sn.SetPortNumber(in.nextInt());
		sn.init();
		System.out.println("Server created \n Server: " + sn.GetServerSocket());
		
		ServerLobby sl = new ServerLobby(sn.GetServerSocket());
		
		Thread lobby = new Thread(sl);
		
		lobby.start();
		
		MinerNetwork mn = new MinerNetwork();
		
	}
	
}
