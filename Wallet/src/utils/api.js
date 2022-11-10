import { rpc, sc, u } from "@cityofzion/neon-core";

const url = "http://218.145.108.222:30333/";

const rpcClient = new rpc.RPCClient(url);


const crypto = require('crypto');
export const hashed = (data) => {
  return crypto.createHmac('sha256', process.env.REACT_APP_HMAC_HASH_SALT ).update(data).digest('hex');
};