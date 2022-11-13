import { CONST, rpc, sc, wallet, tx, u } from "@cityofzion/neon-core";
import axios from "axios";
import base58 from "bs58";

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = new rpc.RPCClient(url);

const networkMagic = Number(process.env.REACT_APP_NETWORK_MAGIC);
const systemFee = process.env.REACT_APP_SYSTEM_FEE;
const networkFee = process.env.REACT_APP_NETWORK_FEE;
const heightIncrease = Number(process.env.REACT_APP_TRANSFER_HEIGHT_INCREASE);

export const createMultiSig = (siningNum, pubKeyList) => {
    const multiSig = wallet.Account.createMultiSig(siningNum, pubKeyList);
    return multiSig.address;
}


const getScriptHashFromAddress = (address) => {
    const hash = u.ab2hexstring(base58.decode(address));
    return hash;
}

//아래 함수의 인풋값 예시, 실제로는 UI에서 받은값을 주시면 됩니다.
// tokenHash : CONST.NATIVE_CONTRACT_HASH.NeoToken; //전송할 토큰이 Gas면 CONST.NATIVE_CONTRACT_HASH.GasToken
// multiSigAccount : privatekey를 포함한 Account class

export const mkMultiSigTx = async(tokenHash, tokenAmount, multiSigAccount, toAddress, privateKey) => {
    const script = sc.createScript({
        scriptHash: tokenHash,
        operation: "transfer",
        args: [
        sc.ContractParam.hash160(multiSigAccount.address),
        sc.ContractParam.hash160(toAddress),
        sc.ContractParam.integer(tokenAmount),
        sc.ContractParam.any(),
        ],
    });
    
    const currentHeight = await rpcClient.getBlockCount(multiSigAccount.address);
    
    const newTx = new tx.Transaction({
      signers: [
        {
          account: getScriptHashFromAddress(),
          scopes: tx.WitnessScope.CalledByEntry,
        },
      ],
      validUntilBlock: currentHeight + heightIncrease,
      systemFee: systemFee,
      networkFee: networkFee,
      script,
    })
    .sign(privateKey, networkMagic, 1024);
    
    const result = base58.encode(u.hexstring2ab(newTx.serialize()));
    return result;
    // 해당 result값이 메시지에 포함되어 가야함.
}

// encoding된 Tx를 decode 하고 Transaction class로 복원하여 sign하고 다시 encoding하여 return
export const signMultiSigTx = (encodedTx, privateKey) => {
    const decodedTx = u.ab2hexstring(base58.decode(encodedTx));
    const newTx = tx.Transaction.deserialize(decodedTx);
    const signedTx = newTx.sign(privateKey, networkMagic, 1024);
    const result = base58.encode(u.hexstring2ab(signedTx.serialize()));
    return result;
}

export const sendMultiSigTx = async(encodedTx) => {
    const decodedTx = u.ab2hexstring(base58.decode(encodedTx));
    const newTx = tx.Transaction.deserialize(decodedTx);
    const result = await rpcClient.sendRawTransaction(newTx);
    return result;
}

export const sendMSG = async (url, content) => {
    const res = await axios.post(url, {content: content});
    return res;
}
