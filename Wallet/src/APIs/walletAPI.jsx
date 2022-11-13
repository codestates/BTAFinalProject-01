import Neon, { sc, tx, wallet, CONST } from "@cityofzion/neon-js";
import Axios from "axios";

const ethers = require('ethers');
var CryptoJS = require("crypto-js");

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);

// This function is to decrypt encrypted value
export const decryptValue = async (encryptedValue, password) => {
    const decryptedValue = await CryptoJS.AES.decrypt(encryptedValue, password);
    return decryptedValue.toString(CryptoJS.enc.Utf8);
}

// Get privateKey using mnemonic
export const getPrivateKeyFromMnemonic = (mnemonicCode) => {
    const mnemonicWallet = ethers.utils.HDNode.fromMnemonic(mnemonicCode);
    const privateKey = mnemonicWallet.privateKey.substring(2);
    return privateKey;
}

// 1. Get private key using mnemonic code
// 2. Encrypt the private key using a new password
export const restoreAccount = async(encryptedAccount, mnemonicCode, newPassword) => {
    const privateKey = getPrivateKeyFromMnemonic(mnemonicCode);
    return {
        "address": encryptedAccount.address,
        "publicKey": encryptedAccount.publicKey,
        "privateKey": await CryptoJS.AES.encrypt(privateKey, newPassword),
        "scriptHash": encryptedAccount.scriptHash
    };
}

// Decrypt the encrypted private key using password
export const Login = async(encryptedAccount, password) => {
    return {
        "address": encryptedAccount.address,
        "publicKey": encryptedAccount.publicKey,
        "privateKey": await decryptValue(encryptedAccount.privateKey, password),
        "scriptHash": encryptedAccount.scriptHash
    }
}

// 1. Generate mnemonic code.
// 2. Get private key using the mnemonic key.
//    This is deterministic; you will always get the same private key with the same mnemonic code. 
// 3. Encrypt the private key.
export const createWallet = async (password) => {
    const mnemonicCode = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
    const privateKey = getPrivateKeyFromMnemonic(mnemonicCode);
    const userAccount = new wallet.Account(privateKey);
    return {
        "address": userAccount.address,
        "publicKey": userAccount.publicKey,
        "privateKey": await CryptoJS.AES.encrypt(privateKey, password),
        "scriptHash": userAccount.scriptHash,
        "mnemonic": mnemonicCode
    };
}

// RPC POST request to check balance of the given address
export const checkBalance = async (address) => {
    let res = await Axios.post(url, {
      jsonrpc: "2.0",
      method: "getnep17balances",
      params: [address],
      id: 1,
    });
    return res
}

// userAccount must be decrypted before transfering token to another address.
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