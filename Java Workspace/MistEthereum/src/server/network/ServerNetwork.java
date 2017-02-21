package server.network;

import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.UnknownHostException;

public class ServerNetwork {
	
	private ServerSocket HostSocket;
    private InetAddress HostAddress;
    private int PortNum = 0;
    
    public ServerNetwork()
    {
    }
    
    public void init()
    {
    	try
		{
			HostAddress = InetAddress.getLocalHost();
			System.out.println(HostAddress.toString());
		}
		catch(UnknownHostException e)
		{
			System.out.println("Could not get the host address.");
			return;
		}
		try{
			HostSocket = new ServerSocket(PortNum, 0, HostAddress);
		}catch(IOException e){
			System.out.println("Could not open server socket");
			return;
		}
    }
    
    public void SetServerSocket(ServerSocket s)
    {
    	HostSocket = s;
    }
    
    public void SetHostAddress(InetAddress ha)
    {
    	HostAddress = ha;
    }
    
    public void SetPortNumber(int pn)
    {
    	PortNum = pn;
    }
    
    public ServerSocket GetServerSocket()
    {
    	return HostSocket;
    }
    
    public InetAddress GetHostAddress()
    {
    	return HostAddress;
    }
    
    public int GetPortNumber()
    {
    	return PortNum;
    }

}
