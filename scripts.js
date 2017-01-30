var myDevices, devicesContract;
var contractAddress = '0x8EC5b861DDf9f2ABa5425767dC8D29613426B4b1';
var contractABI	= [ { "constant": true, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPolicyReadWrite", "outputs": [ { "name": "Read", "type": "bool", "value": false }, { "name": "Write", "type": "bool", "value": false }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" }, { "name": "Read", "type": "bool" }, { "name": "Write", "type": "bool" } ], "name": "SetPolicyReadWrite", "outputs": [ { "name": "Success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Name", "type": "bytes32" }, { "name": "ID", "type": "uint256" }, { "name": "Signature", "type": "address" } ], "name": "AddTransaction", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "x", "type": "uint256" } ], "name": "GetTransaction", "outputs": [ { "name": "name", "type": "string" }, { "name": "id", "type": "uint256" }, { "name": "sig", "type": "address" }, { "name": "Success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "GetTransactionLength", "outputs": [ { "name": "i", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "Transactions", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" } ], "name": "AddPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "DeviceList", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Name", "type": "bytes32" } ], "name": "AddDevice", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "GetNameByIndex", "outputs": [ { "name": "Name", "type": "string" }, { "name": "Success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "Owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" } ];


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
		web3.eth.getCode(contractAddress);
		// Load the contract
		devicesContract = web3.eth.contract(contractABI);
		myDevices = devicesContract.at(contractAddress);
		document.getElementById("status").innerHTML = "contract loaded";
		document.getElementById("checkPolicy-btn").addEventListener("click", checkPolicy);
		document.getElementById("addDevice-btn").addEventListener("click", addDevice);
		document.getElementById("devicelist").innerHTML = outputDeviceList();
	}

	function addDevice(){
		var name = document.getElementById("deviceName").value;
		console.log(name);
		myDevices.AddDevice(name, {from: web3.eth.accounts[0]});
		console.log("made it");
		document.getElementById("status").innerHTML = "waiting for new block...";
	}

	function checkPolicy(){
		var ReadAccess;
		var WriteAccess;
		var Success;
		var index = document.getElementById("deviceIndex").value;
		var address = document.getElementById("addressPerson").value;
		var result = myDevices.GetPolicyReadWrite(address, index);
		Success = result[2];
		ReadAccess = result[0];
		WriteAccess = result[1];
		if (Success){
			document.getElementById("status").innerHTML = "read: "+ReadAccess+"<br>write: "+WriteAccess;
		}
		else{
			document.getElementById("status").innerHTML = "no access";
		}
	}

	function getDeviceList(){
		var deviceList = [];
		var success = true;
		var i = 0;
		while (success){
			var result = myDevices.GetNameByIndex(i);
			if (result[1]){
				var name = result[0];
				deviceList.push({index: i, name: name});
				i++;
			}
			else{
				success = false;
				return deviceList;
			}
		}
		
	}

	function outputDeviceList(){
		document.getElementById("devicelist").innerHTML = "empty";
		var deviceList = [];
		deviceList = getDeviceList();
		var output = "";
		for (var i=0; i<deviceList.length; i++){
			output += "<br>"+deviceList[i].index+" - "+deviceList[i].name;
		}
		document.getElementById("devicelist").innerHTML = "didnt crash";
		return output;
	}