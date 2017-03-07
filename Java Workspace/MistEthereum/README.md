## How to run server and User/Device

Start ServerMain and input a port number, then save the IP address.

Start ClientMain and connect using the IP and Port from the server.

Om the Webserver side, connect to the same IP and Port.

The different commands can be viewed in the EventHandlers classes.


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
