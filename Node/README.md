

<h1>neo3-privatenet-docker setup</h1>


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
* `neo-client1`  블록 높이 조회:

```
curl http://127.0.0.1:10332 -d '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}'
```

*  `neo-consensus` openwallet 지갑 리스트:

```
curl http://127.0.0.1:40332 -d '{"jsonrpc":"2.0","method":"listaddress","params":[],"id":1}'
```

* `neo-consensus` 노드 `NKvR5WeczCQMcVWQD9aaMqegfEoCBXGWpW` NEP-17 잔고 조회

```
curl http://127.0.0.1:40332 -d '{"jsonrpc":"2.0","method":"getnep17balances","params":["NKvR5WeczCQMcVWQD9aaMqegfEoCBXGWpW"],"id":1}'
```

## INFO
3개의 노드(Consensus,Client1,Client2)로 구성됨

* **Consensus**
  * Address: `NM7Aky765FG8NhhwtxjXRx7jEL1cnw7PBP`
    * PrivKey: `84180ac9d6eb6fba207ea4ef9d2200102d1ebeb4b9c07e2c6a738a42742e27a5`
    * NEP-2 encrypted: `6PYM7jHL4GmS8Aw2iEFpuaHTCUKjhT4mwVqdoozGU6sUE25BjV4ePXDdLz`
    * WIF: `L1eV34wPoj9weqhGijdDLtVQzUpWGHszXXpdU9dPuh2nRFFzFa7E`
  * MultiSig Address (from the account above, 1/1): `NXXazKH39yNFWWZF5MJ8tEN98VYHwzn7g3`
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

* ** 지갑주소: `neo`

# 참조 (아래)
AxLabs/neo3-privatenet-docker