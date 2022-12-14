import React, { useState, useEffect } from 'react'
import { Table, Button } from "antd";
import * as blockAPI from '../../APIs/blockAPI';
import * as time from '../../utils/handleTime';
import * as col from '../../utils/columnForm';

function BlockList() {
    const [data, setData] = useState([]);
    const [pagenum, setPagenum] = useState(1);
    const pageInc = () => { setPagenum(pagenum + 1); }
    const pageDec = () => { if (pagenum > 1) {setPagenum(pagenum -1);} }

    const getData = async () => {
        const res = await blockAPI.getPageBlockList(pagenum);
        setData(res.data.items.map(el => {
            el.time = time.Unix_timestamp(el.time); 
            return el;
        }));
    };

    useEffect(() => {
        getData();
    }, [pagenum]);

    return (
        <div className="site-card-wrapper">
            <h2>
                Blocks
            </h2>
            <Table 
                dataSource={data} 
                columns={col.blockListColumns} 
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

export default BlockList;