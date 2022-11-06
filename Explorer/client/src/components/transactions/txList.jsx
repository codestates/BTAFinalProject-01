import React, { useState, useEffect } from 'react'
import { Table, Button } from "antd";
import * as txAPI from '../../APIs/txAPI';
import * as time from '../../utils/handleTime';
import * as col from '../../utils/columnForm';

function TxList() {
    const [data, setData] = useState([]);
    const [pagenum, setPagenum] = useState(1);
    const pageInc = () => { setPagenum(pagenum + 1); }
    const pageDec = () => { if (pagenum > 1) {setPagenum(pagenum -1);} }
    const getData = async () => {
        const res = await txAPI.getPageTxList(pagenum-1);
        if (res.length > 0) {
            const res2 = res.map((el,idx) => {
                return ({
                    key : idx,
                    txid: el.txid,
                    blockHeight: el.blockHeight,
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
    }, [pagenum]);

    return (
        <div className="site-card-wrapper">
            <h2>
                Transactions
            </h2>
            <Table 
                dataSource={data} 
                columns={col.txListColumns} 
                pagination={false}
            />
            <div style={{textAlign:"center"}}>
                <Button onClick={pageDec}>{"<"}</Button>
                <Button>{pagenum}</Button>
                <Button onClick={pageInc} >{">"}</Button>
            </div>
        </div>
    )
}

export default TxList;