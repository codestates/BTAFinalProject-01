from pymongo import MongoClient
from pymongo.errors import ConnectionFailure


MONGOURL = '192.168.14.2:27017'
MONGOAPP = 'neo'
MONGOURL = "mongodb://{}/{}".format(MONGOURL, MONGOAPP)

client = MongoClient(MONGOURL)

db = client[MONGOAPP]

try:
    print("#################")
    print("DB connected")
except ConnectionFailure:
    print("#################")
    print("Server connect fail")


transaction_db = db['transactions']
blockchain_db = db['blockchain']
meta_db = db['meta']
logs_db = db['logs']
address_db = db['addresses']
trans_db = db['transfer']
