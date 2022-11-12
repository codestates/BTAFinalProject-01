import axios from 'axios';

export const getLastestInfo = async () => {
    return await axios.get('http://218.145.108.222:5005/stats')
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}

/**
export const getLatestBlock = async () => {
    return await rpcClient.getBlockCount();
}

export const getLatestTx = async () => {
    return await rpcClient.getBestBlockHash().then(async (res) => {
        return await rpcClient.getBlock(res, true).then(a sync (res) => {
            return await rpcClient.getTransactionHeight(res.tx[res.tx.length - 1].txid).then((res) => {
                return (res);
            });
        })
    })
}

export const getLatestTx = async () => {
    return await rpcClient.getBlock(1979, true).then(async (res) => {
        console.log(res);
        return await rpcClient.getRawTransaction(res.tx[res.tx.length - 1].hash,true).then((res) => {
            console.log(22,res);
            return (1);
        });
    })
}

export const getLatestAdd = async () => {
    let query = new rpc.Query({
        "jsonrpc": "2.0",
        "method": "listaddress",
        "params": [],
        "id": 1
    });

    const res = await rpcClient.execute(query);
    console.log(1,res);

    return await rpcClient.execute(query);
}
**/
