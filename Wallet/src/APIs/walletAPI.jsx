import Neon, { sc, tx, wallet, CONST } from "@cityofzion/neon-js";
import Axios from "axios";

const ethers = require('ethers');

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);


export const createWallet = async (password) => {

    const mnemonicCode = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
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
            'WIF': userAccount.WIF,
            'privateKey': privateKey,
            'publicKey': userAccount.publicKey,
            'scriptHash': userAccount.scriptHash
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


export const transfer = async (userAccount, toAddress, tokenAmount) => {
    const networkMagic = Number(process.env.REACT_APP_NETWORK_MAGIC);
    const systemFee = process.env.REACT_APP_SYSTEM_FEE;
    const networkFee = process.env.REACT_APP_NETWORK_FEE;
    const heightIncrease = Number(process.env.REACT_APP_TRANSFER_HEIGHT_INCREASE);

    const script = sc.createScript({
        scriptHash: CONST.NATIVE_CONTRACT_HASH.GasToken,
        operation: "transfer",
        args: [
        sc.ContractParam.hash160(userAccount.address),
        sc.ContractParam.hash160(toAddress),
        sc.ContractParam.integer(tokenAmount),
        sc.ContractParam.any(),
        ],
    });


    const currentHeight = await rpcClient.getBlockCount();

    const myTx = new tx.Transaction({
        signers: [
            {
                account: userAccount.scriptHash,
                scopes: tx.WitnessScope.CalledByEntry,
            },
        ],
        validUntilBlock: currentHeight + heightIncrease,
        systemFee: systemFee,
        networkFee: networkFee,
        script,
    }).sign(userAccount, networkMagic, 1024);


    const result = await rpcClient.sendRawTransaction(myTx);
    console.log("tx hash:",result);

    const getTx = await rpcClient.getRawTransaction(result,true);
    console.log("tx Info:", getTx);

    const getTx2 = await rpcClient.getRawTransaction(result,true);
    console.log("tx Info2:", getTx2);

    const res1 = await rpcClient.getNep17Balances(userAccount.address);
    console.log(1, res1);

    const res2 = await rpcClient.getNep17Balances(toAddress);
    console.log(2, res2);
    
    return true;
}