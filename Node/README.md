
<div align="center" style="margin-top: 50pt; margin-bottom: 50px;">  
<h1>neo3-privatenet-docker</h1>
<p align="center" style="margin-top: 30pt;">  
</p>

## Highlights

* NEO3 PrivateNet (최신)
* NEO  Plugin 포함 


## Requirements
- Docker and docker-compose

## 실행
```
git clone --recurse-submodules https://github.com/AxLabs/neo3-privatenet-docker.git
cd neo3-privatenet-docker
docker-compose up
```

## JSON-RPC 테스트
* `neo-client1` 노드 가장 높은 블록 조회:

```
curl http://127.0.0.1:10332 -d '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}'
```

*  `neo-consensus` 노드  지갑 주소 호출:

```
curl http://127.0.0.1:40332 -d '{"jsonrpc":"2.0","method":"listaddress","params":[],"id":1}'
```

* `neo-consensus` 노드 `NKvR5WeczCQMcVWQD9aaMqegfEoCBXGWpW` 계정의 모든 NEP-17 잔고 조회

```
curl http://127.0.0.1:40332 -d '{"jsonrpc":"2.0","method":"getnep17balances","params":["NKvR5WeczCQMcVWQD9aaMqegfEoCBXGWpW"],"id":1}'
```

## INFO
도커파일은 아래 3개의 노드로 구성됨
- Consensus node
- Client1 node
- Client2 node

* **Consensus**
  * Address: `NM7Aky765FG8NhhwtxjXRx7jEL1cnw7PBP`
    * PrivKey: `84180ac9d6eb6fba207ea4ef9d2200102d1ebeb4b9c07e2c6a738a42742e27a5`
    * NEP-2 encrypted: `6PYM7jHL4GmS8Aw2iEFpuaHTCUKjhT4mwVqdoozGU6sUE25BjV4ePXDdLz`
    * WIF: `L1eV34wPoj9weqhGijdDLtVQzUpWGHszXXpdU9dPuh2nRFFzFa7E`
  * MultiSig Address (from the account above, 1/1): `NXXazKH39yNFWWZF5MJ8tEN98VYHwzn7g3`
    * Script: `110c21033a4d051b04b7fc0230d2b1aaedfd5a84be279a5361a7358db665ad7857787f1b11419ed0dc3a`  
  * JSON-RPC: `localhost:40332`
* **Client1**
  * Address: `NV1Q1dTdvzPbThPbSFz7zudTmsmgnCwX6c`    
    * PrivKey: `beae38739915555a75a9281a5928b10ebc265f9c881aa21e963610a6c606a3dc`    
    * WIF: `L3cNMQUSrvUrHx1MzacwHiUeCWzqK2MLt5fPvJj9mz6L2rzYZpok`
  * JSON-RPC: `localhost:10332`
* **Client2**
  * Address: `NhJX9eCbkKtgDrh1S4xMTRaHUGbZ5Be7uU`    
    * PubKey: `037279f3a507817251534181116cb38ef30468b25074827db34cbbc6adc8873932`
    * PrivKey: `7d82c818dcc23f9312527b36c4959e5976f5df7a3dec7e1bbb24a45d64d131c1`    
    * WIF: `L1RgqMJEBjdXcuYCMYB6m7viQ9zjkNPjZPAKhhBoXxEsygNXENBb`
  * JSON-RPC: `localhost:20332`

* **Wallet passphrase**: `neo`

# 참조 (아래)
AxLabs/neo3-privatenet-docker를 참고 하였습니다.



