package server.user;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;

public class UserClient extends Thread{
	
	private Socket ClientSocket;
	private ObjectOutputStream Output;
	private ObjectInputStream Input;
	private boolean Connected = false;
	
	public UserClient(Socket s)
	{
		ClientSocket = s;

		try {
			Output = new ObjectOutputStream(ClientSocket.getOutputStream());
		} catch (IOException e) {
			System.out.println("Could not get output Stream");
		}
		
		Connected = true;
		start();
	}
	
	public void run()
	{
		while(true)
		{
			while(Connected)
			{
				while(Input == null){
					try{
		    			Input = new ObjectInputStream(ClientSocket.getInputStream());
		    		}catch(IOException e){
		    			System.out.println("Could not get input stream for " + ClientSocket.toString());
		    		}
					try {
						Thread.sleep(16);
					} catch (InterruptedException e1) {
						e1.printStackTrace();
					}
				} 
				
				try {
					String[] s = (String[])Input.readObject();
					System.out.println(s[0]);
				} catch (IOException | ClassNotFoundException e) {
					try {
						Thread.sleep(16);
					} catch (InterruptedException e1) {
						e1.printStackTrace();
					}
				}
				
			}
			try {
				Thread.sleep(16);
			} catch (InterruptedException e1) {
				e1.printStackTrace();
			}
		}
	}
	
}
