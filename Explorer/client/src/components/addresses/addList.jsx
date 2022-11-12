import React, { useState, useEffect } from 'react'
import { Table, Button } from "antd";
import * as addAPI from '../../APIs/addAPI';
import * as time from '../../utils/handleTime';
import * as col from '../../utils/columnForm';

function AddList() {
    const [data, setData] = useState([]);
    const [pagenum, setPagenum] = useState(1);
    const pageInc = () => { setPagenum(pagenum + 1); };
    const pageDec = () => { if (pagenum > 1) {setPagenum(pagenum -1);} };

    const parseBalance = (list, assetId) => {
        if (list.length === 0) {return 0}
        else {
            for (let el of list) {
                if (el.asset.slice(0,5) == assetId) {return el.value;}
            }
        }
        return 0;
    };
    const getData = async () => {
        const res = await addAPI.getAddList();
        if (res.length > 0) {
            const res2 = res.map((el,idx) => {
                const neo = parseBalance(el.balances, "0xc56");
                const gas = parseBalance(el.balances, "0x602");
                return ({
                    key : idx,
                    address: el.address,
                    script_hash: el.script_hash,
                    created_time: el.created_time,
                    neo: neo,
                    gas: gas,
                });
            });
            setData(res2);
        };
    };

    useEffect(() => {
        getData();
    }, [pagenum]);

    return (
        <div className="site-card-wrapper">
            <h2>
                Addresses
            </h2>
            <Table 
                dataSource={data} 
                columns={col.addListColumns} 
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

export default AddList;