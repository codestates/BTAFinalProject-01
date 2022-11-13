from chain import storeLatestBlockInDB, getBlockCount, blockchain_db, storeBlockInDB,  get_highest_node
from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()


# 5초 마다 최신블록을 호출
@sched.scheduled_job('interval', seconds=5, max_instances=3)
def pollNode():
    storeLatestBlockInDB()


#스케쥴러 시작
sched.start()
