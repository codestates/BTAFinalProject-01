import requests
import os
from db import db as blockchain_db


#nodeAPI = os.environ.get('NODEAPI', 'http://127.0.0.0:30333')
nodeAPI = os.environ.get('NODEAPI', 'http://218.145.108.222:30333')

appName = os.environ.get('neo')
net = os.environ.get('NET', 'PrivNet')


def convert_txid(txid):
    if len(txid) == 66:
        return txid[2:]
    else:
        return txid


# RPC 호출 헬퍼
def rpcRequest(method, params, nodeAPI=nodeAPI):
    return requests.post(nodeAPI, json={"jsonrpc": "2.0", "method": method, "params": params, "id": 0}, timeout=5).json()

# RPC 블록정보 호출


def getBlock(index, nodeAPI=nodeAPI):
    return rpcRequest("getblock", [index, 1], nodeAPI)


# 최신 블록 저장
def storeLatestBlockInDB():
    nodeAPI = get_highest_node()
    print("updating latest block with {}".format(nodeAPI))
    currBlock = getBlockCount(nodeAPI=nodeAPI)["result"]
    print("current block {}".format(currBlock))
    # # height - 1 = current block
    storeBlockInDB(currBlock-1, nodeAPI)


# 블록의 높이
def getBlockCount(nodeAPI=False):
    if nodeAPI == False:
        nodeAPI = get_highest_node()
    return rpcRequest("getblockcount", [], nodeAPI)


# 데이터의 베이스에 블록과 트랜잭션정보를 등록함
def storeBlockInDB(block_index, nodeAPI=False):
    if not nodeAPI:
        nodeAPI = get_highest_node()
    print("using {}".format(nodeAPI))
    data = getBlock(block_index, nodeAPI=nodeAPI)
    block_data = data["result"]

    success, total_sys, total_net = storeBlockTransactions(block_data)

    if success:
        lastBlock = blockchain_db['blockchain'].find_one(
            {"index": block_data["index"]-1})
        print(lastBlock)
        # if lastBlock and 'sysfee' in lastBlock and 'netfee' in lastBlock:
        #     block_data['sysfee'] = lastBlock['sysfee'] + total_sys
        #     block_data['netfee'] = lastBlock['netfee'] + total_net
        # blockchain_db['blockchain'].update_one({"index": block_data["index"]}, {
        #                                        "$set": block_data}, upsert=True)
        return True
    return False


# 블록에 있는 모든 트랜잭션을 저장
# 트랜잭션이 이미 있는 경우 업데이트
def storeBlockTransactions(block):
    transactions = block['tx']
    out = []
    total_sys = 0.0
    total_net = 0.0
    for t in transactions:
        t['hash'] = convert_txid(t['hash'])
        t['block_index'] = block["index"]
        t['sysfee'] = float(t['sysfee'])
        t['netfee'] = float(t['netfee'])
        total_sys += t['sysfee']
        total_net += t['netfee']

        balance = rpcRequest("getnep17balances", [t['sender']], nodeAPI)
        transfer = rpcRequest("getnep17transfers", [t['sender']], nodeAPI)

        blockchain_db['transactions'].update_one(
            {"hash": t["hash"]}, {"$set": t}, upsert=True)
        blockchain_db['addresses'].update_one(
            {"address": t["sender"]}, {"$set": balance["result"]}, upsert=True)
        blockchain_db['transfer'].update_one({"address": t["sender"]}, {
                                             "$set": transfer["result"]}, upsert=True)

    return True, total_sys, total_net


# 노드중 가장 높은 블록의 노드를 선택함
# 편의상 컨센서스 노드를 고정해서 사용함
def get_highest_node():
    return nodeAPI
