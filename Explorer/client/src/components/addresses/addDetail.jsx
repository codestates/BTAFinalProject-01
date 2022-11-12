import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Col, Row, Table } from "antd";
import { useLocation, Link } from 'react-router-dom';
import * as addAPI from '../../APIs/addAPI';
import * as handleTime from '../../utils/handleTime';
import * as handleAdd from '../../utils/handleAdd';
import * as col from '../../utils/columnForm';


function AddInfo() {
    const location = useLocation();
    const address = location.pathname.split("/").pop();
    const [data, setData] = useState([]);
    const [received, setReceived] = useState([]);
    const [sent, setSent] = useState([]);

    const fillTransfer = (list) => {
        const result = list.map((el,idx) => {
            return ({
                key : idx,
                txid: el.txhash,
                transferaddress: el.transferaddress ? el.transferaddress : "undefined",
                blockindex: el.blockindex,
                tokenType: el.assethash.slice(0,5) == "0xd2a" ? "Gas" : "Neo",
                amount: el.amount,
                time: handleTime.Unix_timestamp(el.timestamp),
            });
        });
        return result;
    }

    const getData = async () => {

        let obj = {
            address: address, 
            gas: 0, 
            neo: 0, 
            lastupdatedblock:0, 
            script_hash: handleAdd.getScriptHashFromAddress(address)
        };

        const result = await addAPI.getAddBalance(address);
        obj.gas = handleAdd.parseBalance(result,"0xd2a");
        obj.neo = handleAdd.parseBalance(result,"0xef4");
        obj.lastupdatedblock = handleAdd.getLastBlock(result);
        setData(obj)
        
        const res = await addAPI.getTransfer17(address);
        if (res.received.length > 0) {
            const received2 = fillTransfer(res.received);
            setReceived(received2);
        }
        if (res.sent.length > 0) {
            const sent2 = fillTransfer(res.sent);
            setSent(sent2);
        }
    };

    const {lastupdatedblock, neo, gas} = data;

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="site-card-wrapper">
        <h2>Overveiw</h2>
        <Descriptions titl="" bordered>
            <Descriptions.Item label="Address" span={3}>
                {address}
            </Descriptions.Item>
            <Descriptions.Item label="Last updated block" span={3}>
                {lastupdatedblock ? lastupdatedblock : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Type" span={3}>
                {"normal"}
            </Descriptions.Item>
            <Descriptions.Item label="Neo balance" span={3}>
                {neo}
            </Descriptions.Item>
            <Descriptions.Item label="Gas balance" span={3}>
                {gas}
            </Descriptions.Item>
            <Descriptions.Item label="Sended txs" span={3}>
                {sent.length}
            </Descriptions.Item>
        </Descriptions>
        <h2>NEP17 Transfers</h2>
        <h3>Received</h3>
        <Table 
                dataSource={received} 
                columns={col.nep17ListColumns} 
        />
        <h3>Sent</h3>
        <Table 
                dataSource={sent} 
                columns={col.nep17ListColumns} 
        />
      </div>
    )
}


export default AddInfo;