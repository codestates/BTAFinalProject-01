import { u } from "@cityofzion/neon-core";
import base58 from "bs58";

export const parseBalance = (list, assetId) => {
    if (list.length === 0) {return 0}
    else {
        for (let el of list) {
            if (el.assethash.slice(0,5) == assetId) {return el.amount;}
        }
    }
    return 0;
};

export const getLastBlock = (list) => {
    if (list.length === 0) {return 0}
    else {
        let result = list[0].lastupdatedblock;
        if (list.length > 1) {
            if (result < list[0].lastupdatedblock) {result = list[0].lastupdatedblock;}
        }
        return result
    }
};

export const getScriptHashFromAddress = (address) => {
    const hash = u.ab2hexstring(base58.decode(address));
    return hash;
};

