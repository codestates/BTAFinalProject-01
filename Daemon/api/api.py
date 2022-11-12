from flask import Blueprint
from flask import jsonify
from bson import json_util
from db import transaction_db, blockchain_db, address_db, trans_db
from chain import convert_txid
import json

api = Blueprint('api', __name__)


def db2json(db_obj):
    return json.loads(json.dumps(db_obj, indent=4, default=json_util.default))


def info_block_list(block):
    out = {"blocktime": "",
           "hash": block["hash"],
           "index": block["index"],
           "size": block["size"],
           "time": block["time"],
           "txCount": len(block["tx"])}
    return out


def info_transaction_list(transaction):
    out = {
        "txid": transaction["hash"],
        "block": transaction["block_index"],
        "size": transaction["size"],
        "gas": transaction["sysfee"]+transaction["netfee"],
    }
    return out


def get_db_height():
    return [x for x in blockchain_db.find().sort("index", -1).limit(1)][0]["index"]


def get_address_txs(address):
    query = address_db.find_one({"address": address})
    if query:
        return query["txs"]
    else:
        transactions = {convert_txid(t['txid']): t for t in transaction_db.find({"$or": [
            {"vout": {"$elemMatch": {"address": address}}},
            {"vin_verbose": {"$elemMatch": {"address": address}}}
        ]})}
        address_db.update_one({"address": address}, {
                              "$set": {"txs": transactions}}, upsert=True)
        return transactions


# 현재 서버 버전
@api.route("/stats")
def version():
    height = get_db_height()
    transactions = transaction_db.count_documents({})
    addresses = address_db.count_documents({})
    trans = trans_db.count_documents({})

    return jsonify({"transactions": transactions, "addresses": addresses, "assets": 2,  "transfers": trans, "height": height})


# [Block] 리스트
@api.route("/blocks/<page>")
def get_blocklist(page=1):
    page = int(page)
    limit = 15
    offset = (page - 1) * limit

    totalCount = blockchain_db.count_documents({})

    blocks = blockchain_db.find().sort("index", -1).limit(limit).skip(offset)
    blocks = [info_block_list(x) for x in blocks]

    blocks = {"items": blocks, "totalCount": totalCount}
    blocks = db2json(blocks)
    return jsonify(blocks)

# [Block] 상세


@api.route("/block/<block_hash>")
def block_info(block_hash):
    block = blockchain_db.find_one({"hash": block_hash})
    result = jsonify(**db2json(block))
    return result

# [TRANSACTION] getPageTxList(pagenum) return 해당 page에 대한 10개의 tx list (list)


@api.route("/transactions/<page>")
def getPageTxList(page):
    page = int(page)
    limit = 15
    offset = (page - 1) * limit

    totalCount = transaction_db.count_documents({})

    transactions = transaction_db.find().sort(
        "block_index", -1).limit(limit).skip(offset)
    transactions = [info_transaction_list(x) for x in transactions]

    transactions = {"items": transactions, "totalCount": totalCount}
    transactions = db2json(transactions)
    return jsonify(transactions)

# [TRANSACTION] 트랜잭션 이력


@api.route("/transaction/<transaction_hash>")
def getTxInfo(transaction_hash):
    block = transaction_db.find_one({"hash": transaction_hash})
    result = jsonify(**db2json(block))
    return result


@api.route("/address_stats​/<address>")
def getAddInfo(address):
    with open('data_block_detail.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)

# [Address] balance


@api.route("/addresses")
def getAllAddresses():

    totalCount = address_db.count_documents({})

    addresses = address_db.find().sort("address", -1)

    address = []
    for x in enumerate(addresses):
        address.append(x[1]["address"])

    addresses = {"items": address, "totalCount": totalCount}
    addresses = db2json(addresses)
    return jsonify(addresses)


@api.route("/balance/<address>")
def getAddBalanceInfo(address):
    result = address_db.find_one({"address": address})
    result = result["balance"] if result else {}
    result = jsonify(db2json(result))
    return result


# getTransfer17(address) return 해당 address의 getNEP17Tranfer결과 (json)
@api.route("/transfer_history/<address>")
def getTransferHistoryInfo(address):
    result = trans_db.find_one({"address": address})
    result = jsonify(db2json(result))
    return result
