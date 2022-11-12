import Neon, { wallet } from "@cityofzion/neon-js";
import Axios from "axios";

const ethers = require('ethers');

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);

console.log(url);

export const createWallet = async (password) => {

    const mnemonicCode = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32));
    const mnemonicWallet = ethers.utils.HDNode.fromMnemonic(mnemonicCode, password);
    const privateKey = mnemonicWallet.privateKey.substring(2);
    const userAccount = new wallet.Account(privateKey);
    const nep2Key = await wallet.encrypt(userAccount.WIF, password);
    console.log(userAccount);
    // const userWallet = Neon.create.wallet();
    // const userAccount = new wallet.Account(privateKey);
    // userWallet.addAccount(userAccount);

    return {'nep2Key': nep2Key,
            'address': userAccount.label,
            'mnemonic': mnemonicCode,
            'publicKey': userAccount.publicKey
            };
}


// export const checkBalance = async (nep2Key) => {
//     const res = await rpcClient.getNep17Balances(nep2Key);
//     console.log(2, res);
//     return res;
// }

export const checkBalance = async (address) => {
    let res = await Axios.post(url, {
      jsonrpc: "2.0",
      method: "getnep17balances",
      params: [address],
      id: 1,
    });
    return res
}
