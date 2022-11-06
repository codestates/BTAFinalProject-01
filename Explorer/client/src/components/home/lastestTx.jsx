import React, { useState, useEffect } from 'react'
import { Table } from "antd";
import * as txAPI from '../../APIs/txAPI';
import * as time from '../../utils/handleTime';
import * as col from '../../utils/columnForm';

function LastestTx() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const res = await txAPI.get5TxList();
        if (res.length > 0) {
            const res2 = res.map((el,idx) => {
                return ({
                    key : idx,
                    txid: el.txid,
                    gas: `${Number(el.net_fee) + Number(el.sys_fee)} gas`,
                    size: `${el.size} bytes`,
                    time: time.Unix_timestamp(el.time),
                });
            });
            setData(res2);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="site-card-wrapper">
            <h2>
                Lastest Transactions
            </h2>
            <Table dataSource={data} columns={col.lastedTxColumns} pagination={false} />;
        </div>
    )
}

export default LastestTx;
