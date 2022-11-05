import Neon, { rpc } from "@cityofzion/neon-js";

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);


export const getBlockInfo = async (blocknum) => {
    let query = Neon.create.query({ 
        "jsonrpc": "2.0",
        "method": "getblock",
        "params": [blocknum, true],
        "id": 1
    });

	return await rpcClient.execute(query);
}

export const get5BlockList = async () => {
    let result = [];
    const result2 = await rpcClient.getBlockCount().then(async(res) => {
        if (typeof(res) === "number") {
            for (let i=res-1; i > res-6; i--) {
                console.log("res",res);
                let query = Neon.create.query({ 
                    "jsonrpc": "2.0",
                    "method": "getblock",
                    "params": [i, true],
                    "id": 1
                });
            
                await rpcClient.execute(query).then((res) => {
                    console.log(res);
                    result.push(res);
                });
            }
        }
        console.log(result);
        return result;
    });
    console.log(result2);
    return result2;
}

export const getPageBlockList = async (pagenum) => {
    let result = [];
    const result2 = await rpcClient.getBlockCount().then(async(res) => {
        if (typeof(res) === "number") {
            const start = res - 1 - 10*(pagenum);
            const end = start - 10;
            for (let i=start; i > end; i--) {
                console.log("res",res);
                let query = Neon.create.query({ 
                    "jsonrpc": "2.0",
                    "method": "getblock",
                    "params": [i, true],
                    "id": 1
                });
            
                await rpcClient.execute(query).then((res) => {
                    console.log(res);
                    result.push(res);
                });
            }
        }
        console.log(result);
        return result;
    });
    console.log(result2);
    return result2;
}