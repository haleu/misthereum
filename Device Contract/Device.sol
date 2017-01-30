pragma solidity ^0.4.0;

contract MyDevices
{

    Device[] public DeviceList;
    address public Owner;
    uint ID = 0;
    Transaction[] public Transactions;

    function MyDevices() public
    {
        Owner = msg.sender;
    }

    
    function GetNameByIndex(uint i) constant returns(string Name, bool Success)
    {
        if(i < DeviceList.length)
        {
            Success = true;
            Name = Bytes32ToString(DeviceList[i].GetName());
        }else
        {
            Success = false;
        }
    }
    
    function GetPolicyReadWrite(address Person, uint DeviceIndex) returns (bool Read,bool Write, bool Success)
    {
        Read = false;
        Write = false;
        Success = false;
        
        Person = msg.sender;
        
        Device d = DeviceList[DeviceIndex];
        Policy p;
        bool success;
        (p,success) = d.GetPolicy(Person);
        if(success == true)
        {
            Read = p.CanRead();
            Write = p.CanWrite();
            Success = true;
        }
    }
    
    function SetPolicyReadWrite(address Person, uint DeviceIndex, bool Read, bool Write) returns (bool Success)
    {
        Policy p;
        bool b;
        
        (p,b) = DeviceList[DeviceIndex].GetPolicy(msg.sender);
        Success = b;
        if(b == true)
        {
            p.SetRead(Read);
            p.SetWrite(Write);
        }
    }
    
    function AddPolicy(uint DeviceIndex, address Person)
    {
        DeviceList[DeviceIndex].AddPolicy(Person);
    }
    
    function AddDevice(bytes32 Name)
    {
        DeviceList.push(new Device(Name, ID));
        ID++;
    }

    function AddTransaction(bytes32 Name, uint ID, address Signature)
    {
        Transactions.push(new Transaction(Name, ID, Signature));
    }

    function GetTransaction(uint x) returns (bytes32 name, uint id, address sig, bool Success)
    {
        if(x < Transactions.length)
        {
            (name, id, sig) = Transactions[x].GetTransaction();
        }else
        {
            Success = false;
        }
    }
    
    function Bytes32ToString(bytes32 x) private constant returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
            for (uint j = 0; j < 32; j++) {
                byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
                if (char != 0) {
                    bytesString[charCount] = char;
                    charCount++;
                }
            }
        bytes memory bytesStringTrimmed = new bytes(charCount);
            for (j = 0; j < charCount; j++) {
                bytesStringTrimmed[j] = bytesString[j];
            }
        return string(bytesStringTrimmed);
    }
}

contract Transaction
{
    bytes32 DeviceName;
    uint DeviceID;
    address Signature;

    function Transaction(bytes32 name, uint id, address sig) public
    {
        DeviceName = name;
        DeviceID = id;
        Signature = sig;
    }

    function GetTransaction() returns (bytes32 name, uint id, address sig)
    {
        name = DeviceName;
        id = DeviceID;
        Signature = sig;
    }

}

contract Device
{
    bytes32 Name;
    uint ID;
    Policy[] Policies;

    function Device(bytes32 n, uint i) public
    {
        Name = n;
        ID = i;
    } 
    
    function GetPolicy(address Person) returns(Policy p, bool Success)
    {
        Success = true;
        p = Policies[0];
        for(uint i = 0; i < Policies.length; i++)
        {
            if(Person == Policies[i].GetPerson())
            {
                Success = true;
                p = Policies[i];
            }
        }
    }
    
    function AddPolicy(address Person)
    {
        Policies.push(new Policy(Person));
    }
    
    function SetName(bytes32 name)
    {
        Name = name;
    }
    
    function GetName() returns (bytes32)
    {
        return Name;
    }
    
    function SetID(uint id)
    {
        ID = id;
    }
    
    function GetID() returns (uint)
    {
        return ID;
    }
}

contract Policy
{
    bool Read = false;
    bool Write = false;
    address Person;

    function Policy (address p) public
    {
        Person = p;
    }
    
    function GetPerson() constant returns (address)
    {
        return Person;
    }
    
    function SetRead(bool b)
    {
        Read = b;
    }
    
    function SetWrite(bool b)
    {
        Write = b;
    }

    function CanRead () returns (bool)
    {
        return Read;
    }
    function CanWrite () returns (bool)
    {
        return Write;
    }
}