import React, { useState, useEffect } from 'react'
import { Table } from "antd";
import * as txAPI from '../../APIs/txAPI';
import * as time from '../../utils/handleTime';
import * as col from '../../utils/columnForm';

function LastestTx() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const res = await txAPI.get5TxList();
        setData(res.data.transactions.slice(0,5));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="site-card-wrapper">
            <h2>
                Lastest Transactions
            </h2>
            <Table 
                dataSource={data.map((el) => {el.time = time.Unix_timestamp(el.time); return el})} 
                columns={col.lastedTxColumns} 
                pagination={false} 
            />;
        </div>
    )
}

export default LastestTx;
