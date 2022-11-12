import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Col, Row, Table } from "antd";
import { useLocation, Link } from 'react-router-dom';
import * as addAPI from '../../APIs/addAPI';
import * as handleTime from '../../utils/handleTime';
import * as col from '../../utils/columnForm';


function AddInfo2() {
    const location = useLocation();
    const address = Number(location.pathname.split("/").pop());
    const [add_info, setAdd_info] = useState(0);
    const [received, setReceived] = useState([]);
    const [sent, setSent] = useState([]);
    const [txs, setTxs] = useState([]);

    const fillTransfer = (list) => {
        const result = list.map((el,idx) => {
            return ({
                key : idx,
                txid: el.txhash,
                blockHeight: el.blockHeight,
                gas: `${Number(el.net_fee) + Number(el.sys_fee)} gas`,
                size: `${el.size} bytes`,
                time: handleTime.Unix_timestamp(el.time),
            });
        });
        return result;
    }

    const getData = async () => {
        const res1 = await addAPI.getAddInfo(address);
        setAdd_info(res1);
        const res2 = await addAPI.getTxByAdd(address);
        if (res2.length > 0) {
            const res3 = res2.map((el,idx) => {
                return ({
                    key : idx,
                    txid: el.txhash,
                    blockHeight: el.blockHeight,
                    gas: `${Number(el.net_fee) + Number(el.sys_fee)} gas`,
                    size: `${el.size} bytes`,
                    time: handleTime.Unix_timestamp(el.time),
                });
            });
            setTxs(res3);
        }
        const res4 = await addAPI.getTransfer17(address);
        if (res4.received.length > 0) {
            const received2 = fillTransfer(res4.received);
            setReceived(received2);
        }
        if (res4.sent.length > 0) {
            const sent2 = fillTransfer(res4.sent);
            setSent(sent2);
        }
    };

    const {created_time, lastTx_time, type, neo, gas} = add_info;

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
            <Descriptions.Item label="Created time" span={3}>
                {created_time ?  handleTime.Unix_timestamp(created_time) : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Last transaction time" span={3}>
                {lastTx_time ? lastTx_time : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Type" span={3}>
                {type ? type : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Neo balance" span={3}>
                {neo}
            </Descriptions.Item>
            <Descriptions.Item label="Gas balance" span={3}>
                {gas}
            </Descriptions.Item>
            <Descriptions.Item label="Txs" span={3}>
                {txs.length}
            </Descriptions.Item>
        </Descriptions>
        <h2>Sended Txs</h2>
        <Table 
                dataSource={txs} 
                columns={col.txListColumns} 
                pagination={false}
        />
        <h2>NEP17 Transfers</h2>
        <h3>Received</h3>
        <Table 
                dataSource={received} 
                columns={col.nep17ListColumns} 
                pagination={false}
        />
        <h3>Sent</h3>
        <Table 
                dataSource={sent} 
                columns={col.nep17ListColumns} 
                pagination={false}
        />
      </div>
    )
}

function AddInfo() {return <div></div>};

export default AddInfo;