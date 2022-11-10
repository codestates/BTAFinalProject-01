import Neon, { wallet } from "@cityofzion/neon-js";
import { encryptKeystore } from "@ethersproject/json-wallets";
import Seed from "mnemonic-seed-js";


// import Account from "../components/Account";
// var bip39 = require('bip39')

const url = process.env.REACT_APP_PRIVATE_RPC_URL;

export const createWallet = async (password) => {

    const seed = Seed.new(password);
    const mnemonicCode = seed.mnemonic.toString();
    const privateKey = seed.privatekey.toString('hex');
    const WIF = new wallet.Account(privateKey).WIF;
    const nep2Key = await wallet.encrypt(WIF, password);
    const userWallet = new wallet.Wallet();
    const userAccount = new wallet.Account(privateKey);
    userWallet.addAccount(userAccount);
    return {'nep2Key': nep2Key,
            'address': userAccount.label,
            'mnemonic': mnemonicCode};
}
