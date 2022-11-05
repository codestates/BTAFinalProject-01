import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Col, Row } from "antd";
import { useLocation, Link } from 'react-router-dom';
import * as blockAPI from '../../APIs/blockAPI';
import * as handleTime from '../../utils/handleTime';

function BlockInfo() {
    const location = useLocation();
    const blockNum = Number(location.pathname.split("/").pop());
    const [b_info, setB_info] = useState(0);

    const getBlock = async () => {
        const res = await blockAPI.getBlockInfo(blockNum);
        console.log("res",res);
        setB_info(res);
    };

    const {time, size, hash, tx, script } = b_info;

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
                {script ? multiLine(script.invocation) : "undefined"}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Verification Script" bordered={false}>
                {script ? multiLine(script.verification) : "undefined"}
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default BlockInfo;