import { wallet } from "@cityofzion/neon-js";
const ethers = require('ethers');

export const createWallet = async (password) => {

    const mnemonicCode = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32));
    const mnemonicWallet = ethers.utils.HDNode.fromMnemonic(mnemonicCode, password);
    const privateKey = mnemonicWallet.privateKey.substring(2);
    const WIF = new wallet.Account(privateKey).WIF;
    const nep2Key = await wallet.encrypt(WIF, password);
    const userAccount = new wallet.Account(privateKey);
    
    // const userWallet = Neon.create.wallet();
    // const userAccount = new wallet.Account(privateKey);
    // userWallet.addAccount(userAccount);

    return {'nep2Key': nep2Key,
            'address': userAccount.label,
            'mnemonic': mnemonicCode
            };
}