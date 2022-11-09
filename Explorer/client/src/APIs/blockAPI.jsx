import Neon, { rpc } from "@cityofzion/neon-js";

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);


export const getBlockInfo = async (blocknum) => {
    // let query = Neon.create.query({ 
    //     "jsonrpc": "2.0",
    //     "method": "getblock",
    //     "params": [blocknum, true],
    //     "id": 1
    // });

	// return await rpcClient.execute(query);
    return await rpcClient.getBlock(blocknum,true);
}

export const get5BlockList = async () => {
    let result = [];
    return await rpcClient.getBlockCount().then(async(res) => {
        if (typeof(res) === "number") {
            for (let i=res-1; i > res-6; i--) {
                await rpcClient.getBlock(i,true).then((res) => {
                    result.push(res);
                });
            }
        }
        return result;
    });
}

export const getPageBlockList = async (pagenum) => {
    let result = [];
    return await rpcClient.getBlockCount().then(async(res) => {
        if (typeof(res) === "number") {
            const start = res - 1 - 10*(pagenum);
            const end = start - 10;
            for (let i=start; i > end; i--) {
                await rpcClient.getBlock(i,true).then((res) => {
                    result.push(res);
                });
            }
        }
        return result;
    });
}