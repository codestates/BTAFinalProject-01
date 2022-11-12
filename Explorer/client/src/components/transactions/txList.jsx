import React, { useState, useEffect } from 'react'
import { Table, Button } from "antd";
import * as txAPI from '../../APIs/txAPI';
import * as time from '../../utils/handleTime';
import * as col from '../../utils/columnForm';

function TxList() {
    const [data, setData] = useState(0);
    const [pagenum, setPagenum] = useState(1);
    const pageInc = () => { setPagenum(pagenum + 1); }
    const pageDec = () => { if (pagenum > 1) {setPagenum(pagenum -1);} }
    const getData = async () => {
        const res = await txAPI.getPageTxList(pagenum);
        setData(res.data.items);
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