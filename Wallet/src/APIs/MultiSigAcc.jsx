import { wallet } from "@cityofzion/neon-core";

export const createMultiSig = (siningNum, pubKeyList) => {
    const multiSig = wallet.Account.createMultiSig(siningNum, pubKeyList);
    return multiSig.address;
}