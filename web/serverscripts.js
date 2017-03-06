var myDevices, devicesContract;
var ws;
var contractAddress = '0xc6d161aB3589225468296f8F0D092e3783094284';
var contractABI	= [ { "constant": true, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPolicyReadWrite", "outputs": [ { "name": "Read", "type": "bool", "value": false }, { "name": "Write", "type": "bool", "value": false }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" }, { "name": "Read", "type": "bool" }, { "name": "Write", "type": "bool" } ], "name": "SetPolicyReadWrite", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "GetDeviceByIndex", "outputs": [ { "name": "Name", "type": "string", "value": "" }, { "name": "ID", "type": "uint256", "value": "0" }, { "name": "owner", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "GetDeviceListLength", "outputs": [ { "name": "l", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" }, { "name": "Read", "type": "bool" }, { "name": "Write", "type": "bool" } ], "name": "AddPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "DeviceList", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPoliciesListLength", "outputs": [ { "name": "l", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" }, { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPolicyByIndex", "outputs": [ { "name": "person", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "Read", "type": "bool", "value": false }, { "name": "Write", "type": "bool", "value": false }, { "name": "Success", "type": "bool", "value": false }, { "name": "l", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Name", "type": "bytes32" } ], "name": "AddDevice", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "string" } ], "name": "LinkAccount", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "Owner", "outputs": [ { "name": "", "type": "address", "value": "0xa45d59b32510907d0ba3d7ced0a40274e7a9bfaa" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" } ], "name": "RemovePolicy", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "setpolicyreadwrite", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "addpolicy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "removepolicy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "adddevice", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "key", "type": "string" }, { "indexed": false, "name": "user", "type": "address" } ], "name": "linkaccount", "type": "event" } ];


function init(){
		if(typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
			// If there's a web3 library loaded, then make your own web3
			web3 = new Web3(web3.currentProvider);
		} else if (typeof Web3 !== 'undefined') {
			// If there isn't then set a provider
			web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		} else if(typeof web3 == 'undefined' && typeof Web3 == 'undefined') {
			var message = document.getElementById("message");
			message.style.display = "block";
			return;
		}
		// set up socket to our server
		WebSocketTest();
		// Load the contract
		web3.eth.getCode(contractAddress);
		devicesContract = web3.eth.contract(contractABI);
		myDevices = devicesContract.at(contractAddress);

		//UI init
		document.getElementById("status").innerHTML = "contract loaded";
		document.getElementById("account").innerHTML = web3.eth.accounts[0];

		//Initialize event listeners
		linkAccountEventHandler();
	}

	function checkPolicy(index, address){
		return myDevices.GetPolicyReadWrite(address, index);
	}

	function getDeviceList(address){
		var deviceList = [];
		var length = myDevices.GetDeviceListLength();
		for (var i=0; i<length; i++){
			var result = myDevices.GetDeviceByIndex(i);
			if (result[3]){ //success
				var name = result[0];
				var id = result[1]
				var owner = result[2];
				if (owner == address) {deviceList.push({id: id, name: name});}
			}
		}
		return deviceList;
		
	}
	function linkAccountEventHandler(){
		var linkaccountEvent = myDevices.linkaccount();
		linkaccountEvent.watch(function(err, result) {
			if (err) {
				console.log(err)
				return;
			}
			else{
				$.post(
					'LinkAddress.php',
					{
						accKey : result.args.key,
						accAddress : result.args.user
					},
					function(_result){
						document.getElementById("status").innerHTML = _result;
				});
				//linkaccountEvent.stopWatching();
			}
		})
	}
	function WebSocketTest(){
        	if ("WebSocket" in window){
		    	// Let us open a web socket
		    	ws = new WebSocket("ws://130.240.5.111:8080");
			console.log("connection to server open");
				
			ws.onopen = function(){
				// Web Socket is connected, send data using send()
				ws.send("hello server, this is miner");
				console.log("message sent");
			};
			
			ws.onmessage = function (evt) { 
				console.log("Recieved message: "+evt.data);
				var message = evt.data.split(",");	//message structure IS [operation, secondary operation, args...., data....]
				var op = message[0];

				if (op == "Set Data"){		//Set Data: [Set Data, <secondary operation>, address, device, data]
					address = message[2];
					device = message[3];
					var result = checkPolicy(device, address);	//returns (bool Read,bool Write, bool Success)
					var write = result[1];
					ws.send(message+","+write);
					console.log("Sent message: "+message+","+write);
				}
				if (op == "Get Data"){		//Get Data: [Get Data, <secondary operation>, address, device, data]
					address = message[2];
					device = message[3];
					var result = checkPolicy(device, address);	//returns (bool Read,bool Write, bool Success)
					var read = result[0];
					ws.send(message+","+read);
					console.log("Sent message: "+message+","+read);
				}
				if (op == "Get Devices"){	//Get Devices: [Get Devices, address, data]
					address = message[1];
					var length = myDevices.GetDeviceListLength();
					for (var i=0; i<length; i++){
						var result = myDevices.GetDeviceByIndex(i);
						if (result[3]){ //success
							var name = result[0];
							var id = result[1]
							var owner = result[2];
							if (owner == address){
								var devicedata = id+"-"+name;
								ws.send(message+","+devicedata);
								console.log("Sent message: "+message+","+devicedata);
							}
							else{
								//returns (address person, bool Read, bool Write, bool Success, uint l) 
								var l = myDevices.GetPoliciesListLength(i);
								for (var j=0; j<l;j++){
									var policy = myDevices.GetPolicyByIndex(j, i);
									if (policy[0] == address){
										var devicedata = id+"-"+name;
										ws.send(message+","+devicedata);
										console.log("Sent message: "+message+","+devicedata);
									}
								}
							}
						}
					}
				}
				if (op == "Login"){	//login: [Login, username, password, address]
					var username = message[1];
					var password = message[2];
					var address;
					/*
					* check login with database, return address (ethereum address)
					*/
					$.post(
						'GetAddress.php',
						{
							accName : username,
							accPassword : password
						},
						function(_address){
							address = _address;
							document.getElementById("status").innerHTML = "Address: "+_address;
							ws.send(op+","+username+","+password+","+address);
							console.log("Sent message: "+op+","+username+","+password+","+address);
					});
				}

			};
			
			ws.onclose = function(){ 
				// websocket is closed.
				console.log("Connection closed");
			};
		}
            
		else{
			// The browser doesn't support WebSocket
			alert("WebSocket NOT supported by your Browser!");
		}
	}
