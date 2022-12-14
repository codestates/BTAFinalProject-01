import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Col, Row } from "antd";
import { useLocation, Link } from 'react-router-dom';
import * as txAPI from '../../APIs/txAPI';
import * as handleTime from '../../utils/handleTime';

function TxInfo() {
    const location = useLocation();
    const txid = location.pathname.split("/").pop();
    const [data, setData] = useState({});
    const [witnesses, setWitnesses] = useState([]);
    const [signers, setSigners] = useState([]);

    const getData = async () => {
        const res = await txAPI.getTxInfo(txid);
        setData(res.data);
        setWitnesses(res.data.witnesses);
        setSigners(res.data.signers);
    };

    const {hash, block_index, size, sender, netfee, sysfee, version, nonce} = data;

    useEffect(() => {
        getData();
    }, [witnesses, signers]);

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
            <Descriptions.Item label="Tx hash" span={3}>
                {hash}
            </Descriptions.Item>
            <Descriptions.Item label="Block Height" span={3}>
                {block_index ? block_index : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Version" span={3}>
                {typeof(version) === "number" ? version : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Size" span={3}>
                {size ? `${size} bytes` : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Sender" span={3}>
                {sender ? sender : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Network Fee" span={3}>
                {netfee ? netfee : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="System Fee" span={3}>
                {sysfee ? sysfee : "undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="nonce" span={3}>
                {nonce ? nonce : "undefined"}
            </Descriptions.Item>
        </Descriptions>
        <h2>Signers</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Account" bordered={false}>
                {signers.length ? (signers[0].account) : "no data"}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Scopes" bordered={false}>
                {signers.length ? (signers[0].scopes) : "no data"}
            </Card>
          </Col>
        </Row>
        <h2>Witness</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Invocation Script" bordered={false}>
                {witnesses.length ? multiLine(witnesses[0].invocation) : "no script"}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Verification Script" bordered={false}>
                {witnesses.length ? multiLine(witnesses[0].verification) : "no script"}
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default TxInfo;