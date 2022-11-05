import { rpc } from "@cityofzion/neon-core";

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = new rpc.RPCClient(url);

export const getLatestBlock = async () => {
	return await rpcClient.getBlockCount();
}

