import Neon, { wallet } from "@cityofzion/neon-js";
// import Seed from "mnemonic-seed-js";
const ethers = require('ethers');
const url = process.env.REACT_APP_PRIVATE_RPC_URL;
// const rpcClient = Neon.create.rpcClient(url);

// import Account from "../components/Account";
// var bip39 = require('bip39')

export const createWallet = async (password) => {
    
    // const mnemonicCode = wallet.mnemonic.phrase;
    const privateKey = wallet.generatePrivateKey();
    const WIF = new wallet.Account(privateKey).WIF;
    const nep2Key = await wallet.encrypt(WIF, password);
    const userWallet = Neon.create.wallet();
    const userAccount = new wallet.Account(privateKey);
    userWallet.addAccount(userAccount);
    return {'nep2Key': nep2Key,
            'address': userAccount.label,
            'privateKey': privateKey
            };
    // return new Promise ((result) => 
    // {result({'nep2Key': nep2Key,
    // 'address': userAccount.label,
    // 'mnemonic': mnemonicCode})}
    // );
}
