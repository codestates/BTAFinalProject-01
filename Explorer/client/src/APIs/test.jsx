import { CONST, rpc, sc, wallet, tx, u } from "@cityofzion/neon-core";
import base58 from "bs58";

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = new rpc.RPCClient(url);

const sendToAdd = async (acct) => {
    let query = new rpc.Query({ 
        "jsonrpc": "2.0",
        "id": 1,
        "method": "sendtoaddress",
        "params": [CONST.NATIVE_CONTRACT_HASH.NeoToken, acct.address, 3000],
    });
	const r1 = await rpcClient.execute(query);
    console.log(r1);

    query = new rpc.Query({ 
        "jsonrpc": "2.0",
        "id": 1,
        "method": "sendtoaddress",                                     
        "params": [CONST.NATIVE_CONTRACT_HASH.GasToken, acct.address, 500000000],
    });
	const r2 = await rpcClient.execute(query);
    console.log(r2);

    await sleep(20000);

    const balance = await rpcClient.getNep17Balances(acct.address);
    console.log(balance);
}


export const restoreTx = async () => {
    // const neo = "ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5";  
    // const gas = "d2a4cff31913016155e38e474a2c06d08be276cf";
    
    const privateKey1 = wallet.generatePrivateKey();
    const privateKey2 = wallet.generatePrivateKey();
    const privateKey3 = wallet.generatePrivateKey();

    const account1 = new wallet.Account(privateKey1);
    const account2 = new wallet.Account(privateKey2);
    const account3 = new wallet.Account(privateKey3);

    const multisigAcct = wallet.Account.createMultiSig(2, [
        account1.publicKey,
        account2.publicKey,
        account3.publicKey,
    ]);

    console.log("\n\n--- Multi-sig ---");
    console.log(multisigAcct);

    const networkMagic = 5195086;
    const tokenAmount = 200;

    const script = sc.createScript({
        scriptHash: CONST.NATIVE_CONTRACT_HASH.NeoToken,
        operation: "transfer",
        args: [
        sc.ContractParam.hash160(multisigAcct.address),
        sc.ContractParam.hash160(account1.address),
        sc.ContractParam.integer(tokenAmount),
        sc.ContractParam.any(),
        ],
    });

    await sendToAdd(multisigAcct);

    const currentHeight = await rpcClient.getBlockCount();

    const newTx = new tx.Transaction({
      signers: [
        {
          account: multisigAcct.scriptHash,
          scopes: tx.WitnessScope.CalledByEntry,
        },
      ],
      validUntilBlock: currentHeight + 10,
      systemFee: "100000001",
      networkFee: "100000001",
      script,
    });

    const x1 = newTx.serialize();
    console.log(x1);

    const rebuild1 = tx.Transaction.deserialize(x1);
    const myTx2 = rebuild1.sign(account3, networkMagic, 1024);
    const x2 = myTx2.serialize();
    console.log(x2);

    const rebuild2 = tx.Transaction.deserialize(x2);
    const myTx3 = rebuild2.sign(account1, networkMagic, 1024)
    const x3 = myTx3.serialize();
    console.log(x3);

    const myTx = tx.Transaction.deserialize(x3);
    console.log(myTx);
      
    const multisigWitness = tx.Witness.buildMultiSig(
        myTx.serialize(false),
        myTx.witnesses,
        multisigAcct
    );

    // Replace the single witnesses with the combined witness.
    myTx.witnesses = [multisigWitness];

    const result = await rpcClient.sendRawTransaction(myTx);
    console.log("tx hash:",result);

    const getTx = await rpcClient.getRawTransaction(result,true);
    console.log("tx Info:", getTx);

    await sleep(30000);

    const getTx2 = await rpcClient.getRawTransaction(result,true);
    console.log("tx Info2:", getTx2);

    const res1 = await rpcClient.getNep17Balances(multisigAcct.address);
    console.log(1, res1);

    const res2 = await rpcClient.getNep17Balances(account1.address);
    console.log(2, res2);

    const res3 = await rpcClient.getNep17Transfers(multisigAcct.address);
    console.log(3, res3);
    const res4 = await rpcClient.getNep17Transfers(account1.address);
    console.log(4, res4);

}

export const transfer = async () => {
    const privateKey1 = wallet.generatePrivateKey();
    const privateKey2 = wallet.generatePrivateKey();

    const account1 = new wallet.Account(privateKey1);
    const account2 = new wallet.Account(privateKey2);

    const networkMagic = 5195086;
    const tokenAmount = 200;

    const script = sc.createScript({
        scriptHash: CONST.NATIVE_CONTRACT_HASH.NeoToken,
        operation: "transfer",
        args: [
        sc.ContractParam.hash160(account1.address),
        sc.ContractParam.hash160(account2.address),
        sc.ContractParam.integer(tokenAmount),
        sc.ContractParam.any(),
        ],
    });


    await sendToAdd(account1);

    const currentHeight = await rpcClient.getBlockCount();

    const myTx = new tx.Transaction({
    signers: [
        {
        account: account1.scriptHash,
        scopes: tx.WitnessScope.CalledByEntry,
        },
    ],
    validUntilBlock: currentHeight + 10,
    systemFee: "100000001",
    networkFee: "100000001",
    script,
    })
    .sign(account1, networkMagic, 1024);


    const result = await rpcClient.sendRawTransaction(myTx);
    console.log("tx hash:",result);

    const getTx = await rpcClient.getRawTransaction(result,true);
    console.log("tx Info:", getTx);

    await sleep(30000);

    const getTx2 = await rpcClient.getRawTransaction(result,true);
    console.log("tx Info2:", getTx2);

    const res1 = await rpcClient.getNep17Balances(account1.address);
    console.log(1, res1);

    const res2 = await rpcClient.getNep17Balances(account2.address);
    console.log(2, res2);
}

export const encodedTx = async () => {
    const privateKey1 = wallet.generatePrivateKey();
    const privateKey2 = wallet.generatePrivateKey();

    const account1 = new wallet.Account(privateKey1);
    const account2 = new wallet.Account(privateKey2);

    const tokenAmount = 200;

    const script = sc.createScript({
        scriptHash: CONST.NATIVE_CONTRACT_HASH.NeoToken,
        operation: "transfer",
        args: [
        sc.ContractParam.hash160(account1.address),
        sc.ContractParam.hash160(account2.address),
        sc.ContractParam.integer(tokenAmount),
        sc.ContractParam.any(),
        ],
    });


    const currentHeight = await rpcClient.getBlockCount();

    const newTx = new tx.Transaction({
      signers: [
        {
          account: account1.scriptHash,
          scopes: tx.WitnessScope.CalledByEntry,
        },
      ],
      validUntilBlock: currentHeight + 10,
      systemFee: "1000001",
      networkFee: "1000001",
      script,
    });

    const x1 = newTx.serialize();
    console.log(x1);
    const x2 = base58.encode(u.hexstring2ab(x1));
    // console.log(x2);
    // const x3 = u.ab2hexstring(base58.decode(x2));
    // console.log(tx.Transaction.deserialize(x3));

}