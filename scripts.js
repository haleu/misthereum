var myDevices, devicesContract;
var contractAddress = '0xdB943902dbFcc3f8cBAfc3d3E7Ab02Ccda633ED4';
var contractABI	= [ { "constant": true, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPolicyReadWrite", "outputs": [ { "name": "Read", "type": "bool", "value": false }, { "name": "Write", "type": "bool", "value": false }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" }, { "name": "Read", "type": "bool" }, { "name": "Write", "type": "bool" } ], "name": "SetPolicyReadWrite", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Name", "type": "bytes32" }, { "name": "ID", "type": "uint256" }, { "name": "Signature", "type": "address" } ], "name": "AddTransaction", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "x", "type": "uint256" } ], "name": "GetTransaction", "outputs": [ { "name": "name", "type": "string", "value": "" }, { "name": "id", "type": "uint256", "value": "0" }, { "name": "sig", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "GetTransactionLength", "outputs": [ { "name": "i", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "Transactions", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "GetDeviceListLength", "outputs": [ { "name": "l", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" } ], "name": "AddPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "DeviceList", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Name", "type": "bytes32" } ], "name": "AddDevice", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "GetNameByIndex", "outputs": [ { "name": "Name", "type": "string", "value": "" }, { "name": "ID", "type": "uint256", "value": "0" }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "Owner", "outputs": [ { "name": "", "type": "address", "value": "0x60c87da8b0e2cc76c881244975027ba99689068a" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" } ], "name": "RemovePolicy", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" } ], "name": "setpolicyreadwrite", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Succes", "type": "bool" } ], "name": "addpolicy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" } ], "name": "removepolicy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" } ], "name": "adddevice", "type": "event" } ];


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
		document.getElementById("setPolicy-btn").addEventListener("click", setPolicy);
		document.getElementById("addDevice-btn").addEventListener("click", addDevice);
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
			if (result.args.Success){
				document.getElementById("mining-status").innerHTML = "mining complete";
				document.getElementById("devicelist").innerHTML = outputDeviceList();
				addDevEvent.stopWatching() 
			}
		})
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
		myDevices.SetPolicyReadWrite(address, index, read, write, {from: web3.eth.accounts[0]});
		document.getElementById("mining-status").innerHTML = "waiting for new block...";
	}

	function getDeviceList(){
		var deviceList = [];
		var success = true;
		var i = 0;
		while (success){
			var result = myDevices.GetNameByIndex(i);
			if (result[2]){
				var name = result[0];
				var id = result[1]
				deviceList.push({id: id, name: name});
				i++;
			}
			else{
				success = false;
				return deviceList;
			}
		}
		
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