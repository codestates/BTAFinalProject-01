from chain import storeLatestBlockInDB, getBlockCount, blockchain_db, storeBlockInDB,  get_highest_node
from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()

# 5초 마다 최신 블록을 읽어 옮


@sched.scheduled_job('interval', seconds=5, max_instances=3)
def pollNode():
    storeLatestBlockInDB()

# @sched.scheduled_job('interval', seconds=30, max_instances=3)
# def syncBlockchain():
#     nodeAPI = get_highest_node()
#     currBlock = getBlockCount(nodeAPI)["result"]
#     lastTrustedBlock = blockchain_db["meta"].find_one(
#         {"name": "lastTrustedBlock"})["value"]
#     laterBlocks = set([block["index"] for block in blockchain_db["blockchain"].find(
#         {"index": {"$gt": lastTrustedBlock}})])
#     hash_set = {x: x for x in laterBlocks}
#     newLastTrusted = lastTrustedBlock
#     stopTrust = False
#     for i in range(lastTrustedBlock+1, currBlock):
#         if not i in hash_set:
#             print("repairing {}".format(i))
#             stopTrust = True
#         if not stopTrust:
#             newLastTrusted = i
#     print("newLastTrusted", newLastTrusted)
#     blockchain_db['meta'].update_one({"name": "lastTrustedBlock"}, {
#                                      "$set": {"value": newLastTrusted}}, upsert=True)
#     print("done")


sched.start()
