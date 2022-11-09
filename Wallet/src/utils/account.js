import Neon, { wallet, CONST, rpc } from "@cityofzion/neon-js";
import axios from 'axios';

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);

// const privateKey = Neon.create.privateKey();
// const WIF = Neon.get.WIFFromPrivateKey(privateKey);
// const nep2Key = await Neon.encrypt(privateKey, "myPassword");
// const decryptedKey = await Neon.decrypt(nep2Key, "myPassword");
// WIF === decryptedKey; // true

// const privateKey = wallet.generatePrivateKey();
// const WIF = new wallet.Account(privateKey).WIF;
// const nep2Key = await wallet.encrypt(WIF, "myPassword");
// const decryptedKey = await wallet.decrypt(nep2Key, "myPassword");
// WIF === decryptedKey; // true


const account = Neon.create.account(privateKey);
const alternative = new wallet.Account(privateKey);

// Neon.is.address(string, CONST.DEFAULT_ADDRESS_VERSION);
// wallet.isAddress(string, CONST.DEFAULT_ADDRESS_VERSION);

