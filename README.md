"# misthereum" 


## Running a geth node

Initialize the blockchain with a genesis file:

    geth --datadir <dir> init CustomGenesis.json

Start the geth node:

    geth --datadir <dir> --rpc --rpcport "8000" --rpccorsdomain "*" --port "30303" --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --rpcapi "db,eth,net,web3" --autodag --networkid 1902 --nat "any" console
