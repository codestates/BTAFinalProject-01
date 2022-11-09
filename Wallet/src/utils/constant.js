// // @flow
// import React from 'react'
// import { SessionTypes } from '@walletconnect/types'

// export const DEFAULT_WALLET = {
//     name: 'userWallet',
//     version: '1.0',
//     scrypt: {
//       cost: 16384,
//       blockSize: 8,
//       parallel: 8,
//       size: 64,
//     },
//     accounts: [],
//     extra: null,
//   }
  
//   export const N3_DEFAULT_WALLET = {
//     name: 'n3UserWallet',
//     chain: 'neo3',
//     version: '1.0',
//     scrypt: {
//       cost: 16384,
//       blockSize: 8,
//       parallel: 8,
//       size: 64,
//     },
//     accounts: [],
//     extra: null,
//   }
  
//   export const DEFAULT_CURRENCY_CODE = 'usd'
  

// export const DEFAULT_CHAIN = 'neo3:testnet'
// export const DEFAULT_NETWORKS = {
//   'neo3:testnet': { url: 'https://testnet1.neo.coz.io:443', name: 'Testnet' },
//   'neo3:mainnet': { url: 'http://seed1.neo.org:10332', name: 'Mainnet' },
//   'neo3:private': { url: null, name: 'Private Network' },
// }
// export const DEFAULT_BLOCKCHAINS = ['neo3']
// export const DEFAULT_NAMESPACES: SessionTypes.Namespaces = {
//   [DEFAULT_BLOCKCHAINS[0]]: {
//     accounts: [], // will be overridden
//     methods: [...DEFAULT_METHODS],
//     events: [],
//   },
// }

import {default as Neon} from "@cityofzion/neon-js";
const acct = Neon.create.account("NKuyBkoGdZZSLyPbJEetheRhMjeznFZszf");
