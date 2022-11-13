# Blockchain Sync DB & REST API 

## Highlights

* clock.py (Neo Private Network 15초마다 동기화)
* app.py (Blockchain Rest API )

## Requirements

* Docker and docker-compose 


## 실행

* docker-compose up -d (몽고DB , port : 27017)
* python api/clock.py  
* python api/app.py   (port : 5005)


## REST API 테스트

* http://127.0.0.1:5005/stats
* http://127.0.0.1:5005/blocks/1  
* http://127.0.0.1:5005/block/0xb11de8aec11e506fda7743c360006923615149acfd19dfbb1ce1d8c7545f9456
* http://127.0.0.1:5005/transactions/1
* http://127.0.0.1:5005/transaction/a5020fb33253a180757d347670ddb0703f6cfe6eabcdfd23ad5e7be0bad2d090
* http://127.0.0.1:5005/balance/NM7Aky765FG8NhhwtxjXRx7jEL1cnw7PBP
* http://127.0.0.1:5005/transfer_history/NM7Aky765FG8NhhwtxjXRx7jEL1cnw7PBP
* http://127.0.0.1:5005/addresses
