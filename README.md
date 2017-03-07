"# misthereum" 


## Running a geth node

Initialize the blockchain with a genesis file:

    geth --datadir <dir> init CustomGenesis.json

Start the geth node:

    geth --datadir <dir> --rpc --rpcport "8000" --rpccorsdomain "*" --port "30303" --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --rpcapi "db,eth,net,web3" --autodag --networkid 1902 --nat "any" console

or run in "dev" mode:

    geth --datadir <dir> --dev

## Deploying the contract
[Contract tutorial](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

We are using the Ethereum wallet(which is included in Mist) to deploy contracts.

After deploying the contact, update scripts.js and serverscripts.js with the contract address.

    var contractAddress = '<address>';
    
The ethereum node must be running in order to use the web UI. Make sure your browser supports web3. We use [Mist](https://github.com/ethereum/mist).

## Server & Client
Refer to the [server documentation](https://github.com/jimabr/misthereum/blob/master/Java%20Workspace/MistEthereum/README.md)

## Connecting Database
Setup the database connection in the ConnectDatabase.php file.

    $hostname = "hostname";
    $username = "username";
    $password = "password";
    $dbname = "databasename";
