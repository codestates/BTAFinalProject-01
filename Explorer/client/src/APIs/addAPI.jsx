import Neon, { rpc } from "@cityofzion/neon-js";
import axios from "axios";
const apiURL = process.env.REACT_APP_RESTFUL_API;
const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);

export const getAddBalance = async (address) => {
    return await axios.get(apiURL + `balance/${address}`)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }).then((res)=>{return res.data});
}

export const getTransfer17 = async (address) => {
    return await axios.get(apiURL + `transfer_history/${address}`)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }).then((res)=>{return res.data});
}

export const getAddList = async () => {
    return await axios.get(apiURL + "addresses")
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }).then((res)=>{return res.data.items});
}