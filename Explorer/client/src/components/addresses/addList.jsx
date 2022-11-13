import React, { useState, useEffect } from 'react'
import { Table, Button } from "antd";
import * as addAPI from '../../APIs/addAPI';
import * as handleAdd from '../../utils/handleAdd';
import * as col from '../../utils/columnForm';

function AddList() {
    const [data, setData] = useState([]);

    let addresses = [];

    const getData = async () => {
        const res = await addAPI.getAddList();
        await res.forEach( async (add) => {
            let obj = {
                address: add, 
                gas: 0, 
                neo: 0, 
                lastupdatedblock:0, 
                script_hash: handleAdd.getScriptHashFromAddress(add)
            };
            const result = await addAPI.getAddBalance(add);
            obj.gas = handleAdd.parseBalance(result,"0xd2a");
            obj.neo = handleAdd.parseBalance(result,"0xef4");
            obj.lastupdatedblock = handleAdd.getLastBlock(result);
            addresses.push(obj);
            setData(addresses)
        })
        
    };

    useEffect(() => {
        getData();
    }, []);

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
        </div>
    )
}

export default AddList;