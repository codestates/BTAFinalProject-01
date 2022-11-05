import React, { useState, useEffect } from 'react'
import { Table } from "antd";
import * as blockAPI from '../../APIs/blockAPI';
import * as time from '../../utils/handleTime';
import * as col from '../../utils/columnForm';

function LastestBlock() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const res = await blockAPI.get5BlockList();
        if (res.length > 0) {
            const res2 = res.map((el,idx) => {
                return ({
                    key : idx,
                    index: el.index,
                    txs: `${el.tx.length} txs`,
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
                Lastest Blocks
            </h2>
            <Table dataSource={data} columns={col.lastedBlockColumns} pagination={false} />;
        </div>
    )
}

export default LastestBlock;