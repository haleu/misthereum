var myDevices, devicesContract;
var ws;
var contractAddress = '0xBCfaF41fEebB74Adf0ece53eEb96da36e98940ee';
var contractABI	= [ { "constant": true, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPolicyReadWrite", "outputs": [ { "name": "Read", "type": "bool", "value": false }, { "name": "Write", "type": "bool", "value": false }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" }, { "name": "Read", "type": "bool" }, { "name": "Write", "type": "bool" } ], "name": "SetPolicyReadWrite", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Name", "type": "bytes32" }, { "name": "ID", "type": "uint256" }, { "name": "Signature", "type": "address" } ], "name": "AddTransaction", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "x", "type": "uint256" } ], "name": "GetTransaction", "outputs": [ { "name": "name", "type": "string", "value": "" }, { "name": "id", "type": "uint256", "value": "0" }, { "name": "sig", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "GetTransactionLength", "outputs": [ { "name": "i", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "Transactions", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "GetDeviceByIndex", "outputs": [ { "name": "Name", "type": "string", "value": "" }, { "name": "ID", "type": "uint256", "value": "0" }, { "name": "owner", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "GetDeviceListLength", "outputs": [ { "name": "l", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" }, { "name": "Read", "type": "bool" }, { "name": "Write", "type": "bool" } ], "name": "AddPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "DeviceList", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" }, { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPolicyByIndex", "outputs": [ { "name": "person", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "Read", "type": "bool", "value": false }, { "name": "Write", "type": "bool", "value": false }, { "name": "Success", "type": "bool", "value": false }, { "name": "l", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Name", "type": "bytes32" } ], "name": "AddDevice", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "Owner", "outputs": [ { "name": "", "type": "address", "value": "0xa45d59b32510907d0ba3d7ced0a40274e7a9bfaa" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" } ], "name": "RemovePolicy", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "setpolicyreadwrite", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "addpolicy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "removepolicy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "adddevice", "type": "event" } ];


function init(){

		//UI init
		outputDeviceList();

	}

	function addDevice(){
		/*var name = document.getElementById("deviceName").value;
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
				//document.getElementById("devicelist").innerHTML = outputDeviceList();
				outputDeviceList();
				addDevEvent.stopWatching();
			}
		})*/
	}

	function setPolicy(address, index, read, write){
		//
	}

	function removePolicy(address, index){
		//
	}
	
	function checkPolicy(index, address){
		//return myDevices.GetPolicyReadWrite(address, index);
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

	function outputDeviceList(){
		var deviceList = [];
		var length = 3;
		var output = "";
		if (length > 0){
			deviceList.push({id: 0, name: "device1"});
			deviceList.push({id: 1, name: "device2"});
			deviceList.push({id: 2, name: "device3"});
			for (var i=0; i<deviceList.length; i++){
				//create div for each device
				var newDevice = document.createElement("li");
				newDevice.id = "device-"+i;
				newDevice.className = "device";
				newDevice.setAttribute('data-name', deviceList[i].name);
				newDevice.setAttribute('data-id', deviceList[i].id);
				newDevice.innerHTML = "<div class='info'><p class='name'>Device: "+deviceList[i].name+"</p><p class='id'>Id: "+deviceList[i].id+"</p></div><div class='input-group'><input type='text' class='form-control' placeholder='Name'><span class='input-group-btn'><button class='btn btn-default' type='button'>Add Policy</button></span></div>";
				document.getElementById("devicelist").appendChild(newDevice);
				
				var newDeviceSelect = document.createElement("li");
				newDeviceSelect.id = "select-device-"+i;
				newDeviceSelect.classname = "select-device";
				newDeviceSelect.setAttribute('target-device-id', "device-"+i);
				newDeviceSelect.innerHTML = "<a href='#'>Device: "+deviceList[i].name+"  |  Id: "+deviceList[i].id+"</a>";
				newDeviceSelect.addEventListener("click", function(){
					var targetId = this.getAttribute('target-device-id');
					var hideDevices = document.getElementsByClassName("device")
					for(var l=0;l<hideDevices.length;l++) {
						hideDevices[l].style.display = "none";
					}
					document.getElementById(targetId).style.display = 'block';
				});
				document.getElementById("selectdevice").appendChild(newDeviceSelect);
				
				//create div for each policy
				var policyContainer = document.createElement("div");
				policyContainer.id =newDevice.id+"-policyContainer";
				newDevice.appendChild(policyContainer);
				var policyListLength = 2;
				for (var j=0; j<policyListLength; j++){
					if (j == 0){policy = ["0xa45d59b32510907d0ba3d7ced0a40274e7a9bfbb", true, false, true];}
					if (j == 1){policy = ["0xa45d59b32510907d0ba3d7ced0a40274e7a9bfcc", false, true, true];}
					var newPolicy = document.createElement("div");
					if (policy[3]){ //success
						newPolicy.id = newDevice.id+"-policy-"+j;
						newPolicy.className = "policy";
						newPolicy.setAttribute('data-address', policy[0]);
						newPolicy.setAttribute('data-read',policy[1]);
						newPolicy.setAttribute('data-write',policy[2]);
						newPolicy.setAttribute('data-deviceindex', i);
						newPolicy.innerHTML = "<div class='info'><p class='address'>Address: "+policy[0]+"</p></div>";
						/*
						* Add checkboxes for read/write and update button/remove policy button
						*/
						var policyEdit = document.createElement("div");
						policyEdit.className = "policyedit";
						
						var readBox = document.createElement("input");
						readBox.type = "checkbox";
						readBox.id = newPolicy.id+"-readbox";
						if (policy[1]){ readBox.checked = true; }
						
						var readP = document.createElement("label");
						readP.innerHTML = "Read: ";
                        readP.appendChild(readBox);

						var writeBox = document.createElement("input");
						writeBox.type = "checkbox";
						writeBox.id = newPolicy.id+"-writebox";
						if (policy[2]){ writeBox.checked = true; }

						var writeP = document.createElement("label");
						writeP.innerHTML = "Write: ";
                        writeP.appendChild(writeBox);

						var updateBtn = document.createElement("input");
						updateBtn.type = "button";
						updateBtn.id = newPolicy.id+"-ubtn";
						updateBtn.value = "update";

						var removeBtn = document.createElement("input");
						removeBtn.type = "button";
						removeBtn.id = newPolicy.id+"-rbtn";
						removeBtn.value = "remove";			
						
						policyContainer.appendChild(newPolicy);
						newPolicy.appendChild(policyEdit);
						policyEdit.appendChild(readP);
						//policyEdit.appendChild(readBox);
						policyEdit.appendChild(writeP);
						//policyEdit.appendChild(writeBox);
						policyEdit.appendChild(updateBtn);
						policyEdit.appendChild(removeBtn);
						document.getElementById(newPolicy.id+"-ubtn").addEventListener("click", function() {
							var parent = this.parentNode.parentNode;
							var address = parent.getAttribute("data-address");
							var index = parent.getAttribute("data-deviceindex");
							var read = false;
							var write = false;
							if (document.getElementById(parent.id+"-readbox").checked){
								read = true;
							}
							if (document.getElementById(parent.id+"-writebox").checked){
								write = true;
							}
							setPolicy(address, index, read, write);
						});
						document.getElementById(newPolicy.id+"-rbtn").addEventListener("click", function() {
							var parent = this.parentNode.parentNode;
							var address = parent.getAttribute("data-address");
							var index = parent.getAttribute("data-deviceindex");
							removePolicy(address, index);
						});
					}
				}
				
			}
		}
	}  