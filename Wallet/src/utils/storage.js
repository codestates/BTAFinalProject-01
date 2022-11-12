
// // password 저장
// export function setPassword (myPassword) {
//   const password = myPassword;
//   chrome.storage.local.set({ password: myPassword });
//   console.log('set pw')
// }
// chrome.storage.sync.set({"passwordHash": passwordHash.toString()});
// // publickey 저장

// // privatekey 저장

// // wallet account 저장

// // login 상태 저장

// import Neon, { rpc } from "@cityofzion/neon-js";
// import { rpc, sc, u } from "@cityofzion/neon-core";
// // const client = Neon.create.rpcClient(process.env.REACT_APP_PRIVATE_RPC_URL);
// // const alternative = new rpc.RPCClient(process.env.REACT_APP_PRIVATE_RPC_URL);
// // const res = client.getBlockCount();
// // console.log(res)
// const url = process.env.REACT_APP_PRIVATE_RPC_URL;
// const rpcClient = new rpc.RPCClient(url);
// const privateKey = "";
// const address = "NX3TCZ28zTppd53or2wQBjC5xXAXDyeLGP"
// const facadePromise = Neon.api.NetworkFacade.fromConfig({
//   node: url,
// });