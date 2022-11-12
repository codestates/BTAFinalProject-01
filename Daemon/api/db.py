from pymongo import MongoClient

MONGOURL = '127.0.0.1:27017'
MONGOAPP = 'neo'
MONGOURL = "mongodb://{}/{}".format(MONGOURL, MONGOAPP)

client = MongoClient(MONGOURL)

db = client[MONGOAPP]

transaction_db = db['transactions']
blockchain_db = db['blockchain']
meta_db = db['meta']
logs_db = db['logs']
address_db = db['addresses']
trans_db = db['transfer']
