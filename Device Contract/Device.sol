pragma solidity ^0.4.0;

contract mortal {
    /* Define variable owner of the type address*/
    address public Owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { Owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == Owner) selfdestruct(Owner); }
}

contract MyDevices is mortal
{

    Device[] public DeviceList;
    uint ID = 0;
    Transaction[] public Transactions;

    function MyDevices() public
    {
    }
    
    function GetNameByIndex(uint i) constant returns(string Name, uint ID, bool Success)
    {
        if(i < DeviceList.length)
        {
            Success = true;
            Name = Bytes32ToString(DeviceList[i].GetName());
            ID = DeviceList[i].GetID();
        }else
        {
            Success = false;
        }
    }

    function GetDeviceListLength() constant returns(uint l)
    {
        l = DeviceList.length;
    }
    
    function GetPolicyReadWrite(address Person, uint DeviceIndex) constant returns (bool Read,bool Write, bool Success)
    {
        Read = false;
        Write = false;
        Success = false;
        
        if(Owner != msg.sender) throw;
        
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
    
    event setpolicyreadwrite(bool Success);

    function SetPolicyReadWrite(address Person, uint DeviceIndex, bool Read, bool Write)
    {
        Policy p;
        bool b;

        if(Owner != msg.sender) throw;
        
        (p,b) = DeviceList[DeviceIndex].GetPolicy(msg.sender);

        if(b == true)
        {
            p.SetRead(Read);
            p.SetWrite(Write);
        }

        setpolicyreadwrite(b);
    }
    
    event addpolicy(bool Success);

    function AddPolicy(uint DeviceIndex, address Person, bool Read, bool Write)
    {
        if(Owner != msg.sender) throw;
        DeviceList[DeviceIndex].AddPolicy(Person);
        addpolicy(true);
        SetPolicyReadWrite(Person, DeviceIndex, Read, Write);
    }
    
    event removepolicy(bool Success);

    // Might work.
    function RemovePolicy(uint DeviceIndex, address Person)
    {
        if(Owner != msg.sender) throw;
        bool b = DeviceList[DeviceIndex].RemovePolicy(Person);
        removepolicy(b);
    }

    event adddevice(bool Success);

    function AddDevice(bytes32 Name)
    {
        if(Owner != msg.sender) throw;
        DeviceList.push(new Device(Name, ID));
        ID++;
        adddevice(true);
    }

    function AddTransaction(bytes32 Name, uint ID, address Signature)
    {
        Transactions.push(new Transaction(Name, ID, Signature));
    }

    function GetTransaction(uint x) constant returns (string name, uint id, address sig, bool Success)
    {
        bytes32 n;
        if(x < Transactions.length)
        {
            (n, id, sig) = Transactions[x].GetTransaction();
            name = Bytes32ToString(n);
        }else
        {
            Success = false;
        }
    }

    function GetTransactionLength() constant returns (uint i)
    {
        i = Transactions.length;
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

    function GetTransaction()constant returns (bytes32 name, uint id, address sig)
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

    function RemovePolicy(address Person) returns (bool b)
    {
        b = false;
        for(uint i = 0; i < Policies.length; i++)
        {
            if(Person == Policies[i].GetPerson())
            {
                Policies[i] = Policies[Policies.length-1];
                Policies.length--;
                b = true;
            }
        }
    }
    
    function SetName(bytes32 name)
    {
        Name = name;
    }
    
    function GetName() constant returns (bytes32)
    {
        return Name;
    }
    
    function SetID(uint id)
    {
        ID = id;
    }
    
    function GetID() constant returns (uint)
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

    function CanRead () constant returns (bool)
    {
        return Read;
    }
    function CanWrite () constant returns (bool)
    {
        return Write;
    }
}
