import Neon, { rpc } from "@cityofzion/neon-js";

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);

export const getLatestBlock = async () => {
	return await rpcClient.getBlockCount();
}

export const getLatestTx = async () => {
    return await rpcClient.getBestBlockHash().then( async(res) => {
        return await rpcClient.getBlock(res, true).then( async(res) => {
            return await rpcClient.getTransactionHeight(res.tx[res.tx.length-1].txid).then((res)=>{
                return (res)
            });
        })
    })
}

export const getLatestAdd = async () => {
    let query = Neon.create.query({ 
        "jsonrpc": "2.0",
        "method": "listaddress",
        "params": [],
        "id": 1
    });

	return await rpcClient.execute(query).then((res) => {return (res);});
}
