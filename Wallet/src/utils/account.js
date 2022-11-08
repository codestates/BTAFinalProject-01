import Neon, { wallet, CONST, rpc } from "@cityofzion/neon-js";
import axios from 'axios';

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);

const account = Neon.create.account(privateKey);
const alternative = new wallet.Account(privateKey);

// Neon.is.address(string, CONST.DEFAULT_ADDRESS_VERSION);
// wallet.isAddress(string, CONST.DEFAULT_ADDRESS_VERSION);