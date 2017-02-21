var myDevices, devicesContract;
var contractAddress = '0x451f0955E08Fc76328e68Baf09d39870D44dceb2';
var contractABI	= [ { "constant": true, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPolicyReadWrite", "outputs": [ { "name": "Read", "type": "bool", "value": false }, { "name": "Write", "type": "bool", "value": false }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" }, { "name": "Read", "type": "bool" }, { "name": "Write", "type": "bool" } ], "name": "SetPolicyReadWrite", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Name", "type": "bytes32" }, { "name": "ID", "type": "uint256" }, { "name": "Signature", "type": "address" } ], "name": "AddTransaction", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "x", "type": "uint256" } ], "name": "GetTransaction", "outputs": [ { "name": "name", "type": "string", "value": "" }, { "name": "id", "type": "uint256", "value": "0" }, { "name": "sig", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "GetTransactionLength", "outputs": [ { "name": "i", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "Transactions", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "GetDeviceListLength", "outputs": [ { "name": "l", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" }, { "name": "Read", "type": "bool" }, { "name": "Write", "type": "bool" } ], "name": "AddPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "DeviceList", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Name", "type": "bytes32" } ], "name": "AddDevice", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "GetNameByIndex", "outputs": [ { "name": "Name", "type": "string", "value": "" }, { "name": "ID", "type": "uint256", "value": "0" }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "Owner", "outputs": [ { "name": "", "type": "address", "value": "0xa45d59b32510907d0ba3d7ced0a40274e7a9bfaa" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" } ], "name": "RemovePolicy", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "setpolicyreadwrite", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "addpolicy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "removepolicy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "adddevice", "type": "event" } ];


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
		//var connection = new WebSocket('ws://130.240.154.211:27015');
		// Load the contract
		web3.eth.getCode(contractAddress);
		devicesContract = web3.eth.contract(contractABI);
		myDevices = devicesContract.at(contractAddress);

		//UI init
		document.getElementById("status").innerHTML = "contract loaded";
		document.getElementById("checkPolicy-btn").addEventListener("click", outputPolicyCheck);
		document.getElementById("setPolicy-btn").addEventListener("click", setPolicy);
		document.getElementById("addDevice-btn").addEventListener("click", addDevice);
		document.getElementById("removePolicy-btn").addEventListener("click", removePolicy);
		document.getElementById("devicelist").innerHTML = outputDeviceList();
		document.getElementById("account").innerHTML = web3.eth.accounts[0];
	}

	function addDevice(){
		var name = document.getElementById("deviceName").value;
		myDevices.AddDevice(name, {from: web3.eth.accounts[0]});
		document.getElementById("mining-status").innerHTML = "waiting for new block...";
		var addDevEvent = myDevices.adddevice({_from: web3.eth.accounts[0]});
		addDevEvent.watch(function(err, result) {
			if (err) {
				console.log(err)
				return;
			}
			console.log(result.args.Success)
			if (result.args._from == web3.eth.accounts[0]){
				if (result.args.Success){
					document.getElementById("status").innerHTML = "device added";
				}
				else{
					document.getElementById("status").innerHTML = "failed";
				}
				document.getElementById("mining-status").innerHTML = "mining complete";
				document.getElementById("devicelist").innerHTML = outputDeviceList();
				addDevEvent.stopWatching();
			}
		})
	}

	function setPolicy(){
		var address = document.getElementById("addressPerson-set").value;
		var index = document.getElementById("deviceIndex-set").value;
		var read = false;
		var write = false;
		if (document.getElementById("read-checkbox").checked){
			read = true;
		}
		if (document.getElementById("write-checkbox").checked){
			write = true;
		}

		var policyCheck = myDevices.GetPolicyReadWrite(address, index);
		var policyExists = policyCheck[2];
		var policyEvent;
		if (policyExists){
			myDevices.SetPolicyReadWrite(address, index, read, write, {from: web3.eth.accounts[0]});
			policyEvent = myDevices.setpolicyreadwrite({_from: web3.eth.accounts[0]});
		}
		else{
			myDevices.AddPolicy(index, address, read, write, {from: web3.eth.accounts[0]});
			policyEvent = myDevices.addpolicy({_from: web3.eth.accounts[0]});
		}
		document.getElementById("mining-status").innerHTML = "waiting for new block...";
		policyEvent.watch(function(err, result) {
			if (err) {
				console.log(err)
				return;
			}
			console.log(result.args.Success)
			if (result.args._from == web3.eth.accounts[0]){
				if (result.args.Success){
					document.getElementById("status").innerHTML = "policy updated";
				}
				else{
					document.getElementById("status").innerHTML = "failed";
				}
				document.getElementById("mining-status").innerHTML = "mining complete";
				policyEvent.stopWatching();
			}
		})
	}

	function removePolicy(){
		var index = document.getElementById("deviceIndex-PolRem").value;
		var address = document.getElementById("addressPerson-PolRem").value;
		var policyCheck = myDevices.GetPolicyReadWrite(address, index);
		var policyExists = policyCheck[2];
		var removeEvent;
		if (policyExists){
			myDevices.RemovePolicy(index, address, {from: web3.eth.accounts[0]});
			removeEvent = myDevices.removepolicy({_from: web3.eth.accounts[0]});
			document.getElementById("status").innerHTML = "policy set to be deleted";
		}
		else{
			document.getElementById("status").innerHTML = "policy not found";
			return;
		}
		document.getElementById("mining-status").innerHTML = "waiting for new block...";
		removeEvent.watch(function(err, result) {
			if (err) {
				console.log(err)
				return;
			}
			console.log(result.args.Success)
			if (result.args._from == web3.eth.accounts[0]){
				if (result.args.Success){
					document.getElementById("status").innerHTML = "policy removed";
				}
				else{
					document.getElementById("status").innerHTML = "failed";
				}
				document.getElementById("mining-status").innerHTML = "mining complete";
				removeEvent.stopWatching();
			}
		})
	}
	
	function checkPolicy(index, address){
		return myDevices.GetPolicyReadWrite(address, index);
	}

	function getDeviceList(){
		var deviceList = [];
		var length = myDevices.GetDeviceListLength();
		for (var i=0; i<length; i++){
			var result = myDevices.GetNameByIndex(i);
			if (result[2]){
				var name = result[0];
				var id = result[1]
				deviceList.push({id: id, name: name});
			}
		}
		return deviceList;
		
	}

	function outputDeviceList(){
		var deviceList = [];
		var length = myDevices.GetDeviceListLength();
		var output = "";
		if (length > 0){
			deviceList = getDeviceList();
			for (var i=0; i<deviceList.length; i++){
				output += "<br>"+deviceList[i].id+" - "+deviceList[i].name;
			}
		}
		return output;
	}
	function outputPolicyCheck(){
		var index = document.getElementById("deviceIndex").value;
		var address = document.getElementById("addressPerson").value;
		var result = checkPolicy(index, address);
		/*
		Success = result[2];
		ReadAccess = result[0];
		WriteAccess = result[1];
		*/
		if (result[2]){
			document.getElementById("status").innerHTML = "read: "+result[0]+"<br>write: "+result[1];
		}
		else{
			document.getElementById("status").innerHTML = "no access";
		}
	}