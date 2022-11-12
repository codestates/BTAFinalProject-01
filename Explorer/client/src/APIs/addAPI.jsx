import Neon, { rpc } from "@cityofzion/neon-js";

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);

export const getAddInfo = async (address) => {
    const res = {

    };
    return res;
}

export const getTransfer17 = async (address) => {
    const res = {

    };
    return res;
}

export const getTxByAdd = async (address) => {

}

export const getAddList = async () => {
    let result = [];
    let query = Neon.create.query({ 
        "jsonrpc": "2.0",
        "method": "listaddress",
        "params": [],
        "id": 1
    });

    return await rpcClient.execute(query).then(async(res) => {
        for (let el of res) {
            let query2 = Neon.create.query({ 
                "jsonrpc": "2.0",
                "method": "getaccountstate",
                "params": [el.address],
                "id": 1
            });
            await rpcClient.execute(query2).then((res) => {
                    res.address=el.address;
                    result.push(res);
                });
        }
        return result;
    })
}