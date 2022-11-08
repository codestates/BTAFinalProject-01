import React, { useState, useEffect } from 'react'
import { Table } from "antd";
import * as blockAPI from '../../APIs/blockAPI';
import * as time from '../../utils/handleTime';
import * as col from '../../utils/columnForm';

function BlockList() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const res = await blockAPI.getPageBlockList(0);
        if (res.length > 0) {
            const res2 = res.map((el,idx) => {
                return ({
                    key : idx,
                    index: el.index,
                    hash: el.hash,
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
                Blocks
            </h2>
            <Table 
                dataSource={data} 
                columns={col.blockListColumns} 
                pagination={false} 
            />;
        </div>
    )
}

export default BlockList;