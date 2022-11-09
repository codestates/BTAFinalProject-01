import Neon, { rpc, wallet } from "@cityofzion/neon-js";
import Seed from "mnemonic-seed-js";


// import Account from "../components/Account";
// var bip39 = require('bip39')

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);


export const createWallet = (data) => {
    const password = data.get("password");

    const seed = Seed.new(password);
    const mnemonicCode = seed.mnemonic.toString();
    const privateKey = seed.privatekey.toString('hex');

    const userWallet = new wallet.Wallet();
    const userAccount = new wallet.Account(privateKey);
    userWallet.addAccount(userAccount);
    
    return {'privateKey': userAccount.privateKey,
            'address': userAccount.label,
            'mnemonic': mnemonicCode};
}
