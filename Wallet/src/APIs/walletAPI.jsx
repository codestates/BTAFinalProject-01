import Neon, { sc, tx, wallet, CONST } from "@cityofzion/neon-js";
import Axios from "axios";

const ethers = require("ethers");
var CryptoJS = require("crypto-js");

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);

export const decryptValue = async (encryptedValue, password) => {
	const decryptedValue = await CryptoJS.AES.decrypt(encryptedValue, password);
	return decryptedValue.toString(CryptoJS.enc.Utf8);
};

// Get privateKey from mnemonic
export const getPrivateKeyFromMnemonic = (mnemonicCode) => {
	const mnemonicWallet = ethers.utils.HDNode.fromMnemonic(mnemonicCode);
	const privateKey = mnemonicWallet.privateKey.substring(2);
	return privateKey;
};

export const restoreAccount = async (encryptedAccount, mnemonicCode, newPassword) => {
	const privateKey = getPrivateKeyFromMnemonic(mnemonicCode);
	return {
		address: encryptedAccount.address,
		publicKey: encryptedAccount.publicKey,
		privateKey: await CryptoJS.AES.encrypt(privateKey, newPassword),
		scriptHash: encryptedAccount.scriptHash,
	};
};

export const Login = async (encryptedAccount, password) => {
	return {
		address: encryptedAccount.address,
		publicKey: encryptedAccount.publicKey,
		privateKey: await decryptValue(encryptedAccount.privateKey, password),
		scriptHash: encryptedAccount.scriptHash,
	};
};

export const createWallet = async (password) => {
	const mnemonicCode = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
	const privateKey = getPrivateKeyFromMnemonic(mnemonicCode);
	const userAccount = new wallet.Account(privateKey);
	return [
		{
			address: userAccount.address,
			publicKey: userAccount.publicKey,
			privateKey: await CryptoJS.AES.encrypt(privateKey, password),
			scriptHash: userAccount.scriptHash,
		},
		mnemonicCode,
	];
};

export const checkBalance = async (address) => {
	let res = await Axios.post(url, {
		jsonrpc: "2.0",
		method: "getnep17balances",
		params: [address],
		id: 1,
	});
	return res;
};

export const transfer = async (userAccount, toAddress, tokenHash, tokenAmount) => {
	const networkMagic = Number(process.env.REACT_APP_NETWORK_MAGIC);
	const systemFee = process.env.REACT_APP_SYSTEM_FEE;
	const networkFee = process.env.REACT_APP_NETWORK_FEE;
	const heightIncrease = Number(process.env.REACT_APP_TRANSFER_HEIGHT_INCREASE);
	// 추가 될 부분 Select Token : NEO / GAS

	const script = sc.createScript({
		scriptHash: tokenHash,
		operation: "transfer",
		args: [sc.ContractParam.hash160(userAccount.address), sc.ContractParam.hash160(toAddress), sc.ContractParam.integer(tokenAmount), sc.ContractParam.any()],
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
	console.log("tx hash:", result);

	const getTx = await rpcClient.getRawTransaction(result, true);
	console.log("tx Info:", getTx);

	const getTx2 = await rpcClient.getRawTransaction(result, true);
	console.log("tx Info2:", getTx2);

	const res1 = await rpcClient.getNep17Balances(userAccount.address);
	console.log(1, res1);

	const res2 = await rpcClient.getNep17Balances(toAddress);
	console.log(2, res2);

	return true;
};
