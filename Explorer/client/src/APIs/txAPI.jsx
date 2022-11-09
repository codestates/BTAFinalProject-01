import Neon, { rpc } from "@cityofzion/neon-js";

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);


export const getTxInfo = async (txid) => {
    let query = Neon.create.query({ 
        "jsonrpc": "2.0",
        "method": "getrawtransaction",
        "params": [txid, true],
        "id": 1
    });

	return await rpcClient.execute(query);
	// return await rpcClient.getRawTransaction(txid,true);
}

export const getTxBlockNum = async (blockHash) => {
	return await rpcClient.getBlock(blockHash,true).then((res) => {
        return (res.index);
    });
}

export const get5TxList = async () => {
    let result = [];
    return await rpcClient.getBlockCount().then(async(res) => {
        if (typeof(res) === "number") {
            for (let i = res-1; i > res-6; i--) {
                if (result.length >= 5) {break}
                await rpcClient.getBlock(i,true).then((res) => {
                    for (let el of res.tx){
                        if (result.length >= 5) {break}
                        el.time = res.time;
                        el.blockHeight = i;
                        result.push(el);
                    }
                });
            }
        }
        return result;
    });
}

export const getPageTxList = async (pagenum) => {
    let result = [];
    return await rpcClient.getBlockCount().then(async(res) => {
        if (typeof(res) === "number") {
            const start = res - 1 - 10*(pagenum);
            const end = start - 10;
            for (let i=start; i > end; i--) {
                if (result.length >= 20) {break}
                await rpcClient.getBlock(i,true).then((res) => {
                    for (let el of res.tx) {
                        if (result.length >= 20) {break}
                        el.time = res.time;
                        el.blockHeight = i;
                        result.push(el);
                    }
                });
            }
        }
        return result;
    });
}