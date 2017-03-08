var myDevices, devicesContract;
var ws;
var contractAddress = '0x2CF1435A7A1334F8081D4C9871060a83FacC8152';
var contractABI	= [ { "constant": true, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPolicyReadWrite", "outputs": [ { "name": "Read", "type": "bool", "value": false }, { "name": "Write", "type": "bool", "value": false }, { "name": "Success", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Person", "type": "address" }, { "name": "DeviceIndex", "type": "uint256" }, { "name": "Read", "type": "bool" }, { "name": "Write", "type": "bool" } ], "name": "SetPolicyReadWrite", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "GetDeviceByIndex", "outputs": [ { "name": "Name", "type": "string", "value": "temp 1" }, { "name": "ID", "type": "uint256", "value": "0" }, { "name": "owner", "type": "address", "value": "0x7e418a161152d55ee699c3f70f612b4879744ac2" }, { "name": "Success", "type": "bool", "value": true } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "GetDeviceListLength", "outputs": [ { "name": "l", "type": "uint256", "value": "4" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" }, { "name": "Read", "type": "bool" }, { "name": "Write", "type": "bool" } ], "name": "AddPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "DeviceList", "outputs": [ { "name": "", "type": "address", "value": "0x59e46847a23f4e9aa54b3a27116d11420f6a2518" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPoliciesListLength", "outputs": [ { "name": "l", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" }, { "name": "DeviceIndex", "type": "uint256" } ], "name": "GetPolicyByIndex", "outputs": [ { "name": "person", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "Read", "type": "bool", "value": false }, { "name": "Write", "type": "bool", "value": false }, { "name": "Success", "type": "bool", "value": false }, { "name": "l", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "Name", "type": "bytes32" } ], "name": "AddDevice", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "string" } ], "name": "LinkAccount", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "Owner", "outputs": [ { "name": "", "type": "address", "value": "0x7e418a161152d55ee699c3f70f612b4879744ac2" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "DeviceIndex", "type": "uint256" }, { "name": "Person", "type": "address" } ], "name": "RemovePolicy", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "setpolicyreadwrite", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "addpolicy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "removepolicy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Success", "type": "bool" }, { "indexed": false, "name": "_from", "type": "address" } ], "name": "adddevice", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "key", "type": "string" }, { "indexed": false, "name": "user", "type": "address" } ], "name": "linkaccount", "type": "event" } ];


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
		// Load the contract
		web3.eth.getCode(contractAddress);
		devicesContract = web3.eth.contract(contractABI);
		myDevices = devicesContract.at(contractAddress);

		//UI init
		document.getElementById("status").innerHTML = "contract loaded";
		document.getElementById("addDevice-btn").addEventListener("click", function() {
			var name = document.getElementById("device-name-input").value;
			addDevice(name);
		});
		outputDeviceList();
	}

	function addDevice(name){
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
		})
	}

	function setPolicy(address, index, read, write){
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
				outputDeviceList();
				policyEvent.stopWatching();
			}
		})
	}

	function removePolicy(address, index){
		var policyCheck = myDevices.GetPolicyReadWrite(address, index);
		var policyExists = policyCheck[2];
		console.log(address);
		console.log(index);
		console.log(policyExists);
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
				outputDeviceList();
				removeEvent.stopWatching();
			}
		})
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
	function outputDeviceList(){
		var deviceList = [];
		var length = myDevices.GetDeviceListLength();
		var output = "";
		document.getElementById("selectdevice").innerHTML="";
		if (length > 0){
			deviceList = getDeviceList(web3.eth.accounts[0]);
			for (var i=0; i<deviceList.length; i++){
				//create div for each device
				var newDevice = document.createElement("li");
				newDevice.id = "device-"+i;
				newDevice.className = "device";
				newDevice.setAttribute('data-name', deviceList[i].name);
				newDevice.setAttribute('data-id', deviceList[i].id);
				newDevice.innerHTML = "<div class='info'><p class='name'>Device: "+deviceList[i].name+"</p><p class='id'>Id: "+deviceList[i].id+"</p></div>";

				var policyAdd = document.createElement("div");
				policyAdd.className = "input-group";
				policyAdd.style = "width: 70%";

				var inputPolicy = document.createElement("input");
				inputPolicy.type = "text";
				inputPolicy.className = "form-control";
				inputPolicy.placeholder = "Address";
				inputPolicy.id = "inputPolicy"+deviceList[i].id;
				
				var inputSpan = document.createElement("span");
				inputSpan.className = "input-group-btn";
				inputSpan.style = "width:50px;font-size:12px";

				var readBox = document.createElement("input");
				readBox.type = "checkbox";
				readBox.id = inputPolicy.id+"-readbox";
						
				var readP = document.createElement("label");
				readP.innerHTML = "Read: ";
                        	readP.appendChild(readBox);

				var writeBox = document.createElement("input");
				writeBox.type = "checkbox";
				writeBox.id = inputPolicy.id+"-writebox";

				var writeP = document.createElement("label");
				writeP.innerHTML = "Write: ";
                        	writeP.appendChild(writeBox);

				var inputBtn = document.createElement("button");
				inputBtn.className = "btn btn-default";
				inputBtn.type = "button";
				inputBtn.innerHTML = "Add Policy";
				inputBtn.setAttribute('data-id', deviceList[i].id);

				document.getElementById("devicelist").appendChild(newDevice);
				newDevice.appendChild(policyAdd);
				policyAdd.appendChild(inputPolicy);
				policyAdd.appendChild(inputSpan);
				inputSpan.appendChild(writeP);
				inputSpan.appendChild(readP);
				inputSpan.appendChild(inputBtn);

				inputBtn.addEventListener("click", function(){
					var id = this.getAttribute('data-id');
					var inputbox = document.getElementById("inputPolicy"+id);
					var address = inputbox.value;
					var read = false;
					var write = false;
					if (document.getElementById("inputPolicy"+id+"-readbox").checked){
						read = true;
					}
					if (document.getElementById("inputPolicy"+id+"-writebox").checked){
						write = true;
					}
					console.log(address);
					console.log(id);
					setPolicy(address, id, read, write);
				});
				
				
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
				var policyListLength = myDevices.GetPoliciesListLength(deviceList[i].id);
				for (var j=0; j<policyListLength; j++){
					var policy = myDevices.GetPolicyByIndex(j, deviceList[i].id); //returns (address person, bool Read, bool Write, bool Success, uint l)
					var newPolicy = document.createElement("div");
					if (policy[3]){ //success
						newPolicy.id = newDevice.id+"-policy-"+j;
						newPolicy.className = "policy";
						newPolicy.setAttribute('data-address', policy[0]);
						newPolicy.setAttribute('data-read',policy[1]);
						newPolicy.setAttribute('data-write',policy[2]);
						newPolicy.setAttribute('data-deviceindex', deviceList[i].id);
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
