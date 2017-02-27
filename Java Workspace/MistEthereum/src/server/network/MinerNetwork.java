package server.network;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

import events.MinerEventHandler;

public class MinerNetwork implements Runnable{

//	public static void main(String[] args) throws Exception {
//        Server server = new Server(8080);
//        WebSocketHandler wsHandler = new WebSocketHandler() {
//            @Override
//            public void configure(WebSocketServletFactory factory) {
//                factory.register(MinerEventHandler.class);
//            }
//        };
//        server.setHandler(wsHandler);
//        server.start();
//        server.join();
//    }
	public void StartMinerNetwork()
	{
		Server server = new Server(8080);
        WebSocketHandler wsHandler = new WebSocketHandler() {
            @Override
            public void configure(WebSocketServletFactory factory) {
                factory.register(MinerEventHandler.class);
            }
        };
        server.setHandler(wsHandler);
        try {
			server.start();
			server.join();
		} catch (Exception e) {
			e.printStackTrace();
		}    
	}

	@Override
	public void run() {
		StartMinerNetwork();
		
	}
	
}
