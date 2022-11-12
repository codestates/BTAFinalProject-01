import { CONST, rpc, sc, wallet, tx, u } from "@cityofzion/neon-core";
import base58 from "bs58";

//아래 함수의 인풋값 예시, 실제로는 UI에서 받은값을 주시면 됩니다.
// const tokenHash = CONST.NATIVE_CONTRACT_HASH.NeoToken; //전송할 토큰이 Gas면 CONST.NATIVE_CONTRACT_HASH.GasToken
// const tokenAmount = 200;
// const fromAdress = ""; //멀티시그 address
// const toAddress = "";
// const decryptAccount = ; // 평문으로 decrypt된 나의 Account class

const getScriptHashFromAddress = (address) => {
    const hash = u.ab2hexstring(base58.decode(address));
    return hash;
}

export const createMultiSig = async(tokenHash, tokenAmount, fromAdress, toAddress, decryptAccount) => {
    const script = sc.createScript({
        scriptHash: tokenHash,
        operation: "transfer",
        args: [
        sc.ContractParam.hash160(fromAdress),
        sc.ContractParam.hash160(toAddress),
        sc.ContractParam.integer(tokenAmount),
        sc.ContractParam.any(),
        ],
    });
    
    const currentHeight = await rpcClient.getBlockCount(fromAdress);
    
    const newTx = new tx.Transaction({
      signers: [
        {
          account: getScriptHashFromAddress(),
          scopes: tx.WitnessScope.CalledByEntry,
        },
      ],
      validUntilBlock: currentHeight + 10,
      systemFee: "1000001",
      networkFee: "1000001",
      script,
    })
    .sign(decryptAccount, networkMagic, 1024);
    
    const result = base58.encode(u.hexstring2ab(newTx.serialize()));
    return result;
    // 해당 result값이 메시지에 포함되어 가야함.
}
