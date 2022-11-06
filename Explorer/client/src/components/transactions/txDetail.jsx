import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Col, Row } from "antd";
import { useLocation, Link } from 'react-router-dom';
import * as txAPI from '../../APIs/txAPI';
import * as handleTime from '../../utils/handleTime';

function TxInfo() {
    const location = useLocation();
    const txNum = location.pathname.split("/").pop();
    const [tx_info, setTx_info] = useState(0);
    let scripts = [];

    const getData = async () => {
        const res = await txAPI.getTxInfo(txNum);
        res.blockHeight = await txAPI.getTxBlockNum(res.blockhash);
        setTx_info(res);
        scripts = res.scripts;
    };

    const {txid, blocktime, blockHeight, size, version, blockhash,
         net_fee, sys_fee, type } = tx_info;
    useEffect(() => {
        getData();
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
            <Descriptions.Item label="Tx ID" span={3}>
                {txid}
            </Descriptions.Item>
            <Descriptions.Item label="Block Time" span={3}>
                {blocktime ?  handleTime.Unix_timestamp(blocktime) : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Block Height" span={3}>
                {blockHeight ? blockHeight : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Version" span={3}>
                {version ? version : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Size" span={3}>
                {size ? `${size} bytes` : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Block Hash" span={3}>
                {blockhash ? blockhash : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Net Fee" span={3}>
                {net_fee ? net_fee : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Sys Fee" span={3}>
                {sys_fee ? sys_fee : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Type" span={3}>
                {type ? type : "undefined"}
            </Descriptions.Item>
        </Descriptions>
        <h2>Witness</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Invocation Script" bordered={false}>
                {scripts.length ? multiLine(scripts[0].invocation) : "no script"}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Verification Script" bordered={false}>
                {scripts.length ? multiLine(scripts[0].verification) : "no script"}
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default TxInfo;