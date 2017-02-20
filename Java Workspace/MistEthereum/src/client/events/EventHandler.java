package client.events;

import java.util.ArrayList;

public class EventHandler {
	
	protected ArrayList<Event> Events = new ArrayList<Event>();

	public void AddEvent(Event e)
	{
		Events.add(e);
	}
}
