## Installing Jetty

Download the latest version of Jetty. You should then have a single .jar file.
In eclipse:
Window->Preferences->Java->Installed JREs-> Select jre and press edit-> Add External JARs-> "Your Jetty.jar location"

Jetty download: http://repo1.maven.org/maven2/org/eclipse/jetty/aggregate/jetty-all/9.0.4.v20130625/jetty-all-9.0.4.v20130625.jar

## How to run server and User/Device

* Start ServerMain and input a port number, then save the IP address.

* Start ClientMain and connect using the IP and Port from the server.

* Om the Webserver side, connect to the same IP and Port.

* The different commands can be viewed in the EventHandlers classes.


## Login as a user, and sending commands

Command to send login

    login,username,password

Register as a device:

    Device,id

To send a command to a specific device, write:

    Get Devices
  
as a User and then select a device from the list.

To test the device and policy from the miner, use the command:

    Get Temp

## Command list

| Command    | Description |
|:----------:|-------------|
| **`Login`**,Username,Password | Sends a command to the server with Username and Password as parameters. The server will in turn send it to the Miner which will check what address the User has. It will then send a response to the server to set the address to the specific User. When policy checks will be called, the address that a User has on the Server will be sent for the check.|
| **`Get Devices`** | Gets a device list from the blockchain. It's not guaranteed that the device is connected to the server. |
| **`Device`**,id | Tells the server that the client is a device with a specific ID|
| **`Get Temp`** | Using the selected device on the list, this command will send a data request to the device.|
