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
		document.getElementById("linkBtn").addEventListener("click", function() {
			var key = document.getElementById("linkKey").value;
			linkAccount(key);
		});
		document.getElementById("status").innerHTML = "contract loaded";
	}


	function linkAccount(key){
		myDevices.LinkAccount(key, {from: web3.eth.accounts[0]});
		document.getElementById("mining-status").innerHTML = "waiting for new block...";
		var linkaccountEvent = myDevices.linkaccount();
		linkaccountEvent.watch(function(err, result) {
			if (err) {
				console.log(err)
				return;
			}
			else{
				document.getElementById("status").innerHTML = "account linked";
				document.getElementById("mining-status").innerHTML = "mining complete";
				linkaccountEvent.stopWatching();
			}
		})
	}
