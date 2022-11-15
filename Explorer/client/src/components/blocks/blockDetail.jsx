import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Col, Row } from "antd";
import { useLocation, Link } from 'react-router-dom';
import * as blockAPI from '../../APIs/blockAPI';
import * as handleTime from '../../utils/handleTime';

function BlockInfo() {
    const location = useLocation();
    const blockNum = Number(location.pathname.split("/").pop());
    const [b_info, setB_info] = useState(0);
    const [tx, setTx] = useState([]);
    

    const getBlock = async () => {
        const res = await blockAPI.getBlockInfo(blockNum);
        setB_info(res);
        console.log(res);
        setTx(res.tx);
    };

    const {time, size, hash, witnesses} = b_info;

    useEffect(() => {
        getBlock();
    }, []);

    const multiLine = (str) => {
        let result = "";
        for (let i=0; i < str.length; i++) {
            result += str[i];
            if (i != 0 && i%45 == 0) {
                result += "\n";
            }
        }
        return result
    };

    return (
        <div className="site-card-wrapper">
        <h2>Overveiw</h2>
        <Descriptions titl="" bordered>
            <Descriptions.Item label="Index" span={3}>
                {blockNum}
            </Descriptions.Item>
            <Descriptions.Item label="Time" span={3}>
                {time ?  handleTime.Unix_timestamp(time) : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Size" span={3}>
                {size ? `${size} bytes` : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="BlockHash" span={3}>
                {hash ? hash : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Txs Count" span={3}>
                {tx ? tx.length : "undefined"}
            </Descriptions.Item>
        </Descriptions>
        <h2>Witness</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Invocation Script" bordered={false}>
                {witnesses ? multiLine(witnesses[0].invocation) : "undefined"}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Verification Script" bordered={false}>
                {witnesses ? multiLine(witnesses[0].verification) : "undefined"}
            </Card>
          </Col>
        </Row>
        <h2>Transactions</h2>
        <Row gutter={16}>
            <Card title="Transaction ID list" bordered={false}>
                {tx.length > 0 ?  
                    tx.map((el) => { 
                        let txid = el.hash.slice(2,);
                        return (<div>
                            <a href={`http://localhost:3000/txs/${txid}`}>{txid}</a>
                        </div>)
                            
                    }) : "no txs"}
            </Card>
        </Row>
      </div>
    )
}

export default BlockInfo;