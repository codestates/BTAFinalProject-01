import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from "antd";
import * as homeAPI from '../../APIs/homeAPI';

function Overview() {
    const stats = {addresses:1,contracts:2};
    const { addresses, contracts, transactions } = stats
    const [height, setHeight] = useState(0);
    const [txheight, setTxHeight] = useState(0);
    const [addnum, setAddNum] = useState(0);

    const getData = async () => {
        const res = await homeAPI.getLatestBlock();
        setHeight(res);
        const res2 = await homeAPI.getLatestTx();
        setTxHeight(res2);
        const res3 = await homeAPI.getLatestAdd();
        console.log(res3);
        setAddNum(res3.length);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="site-card-wrapper">
        <h2>Overveiw</h2>
        <Row gutter={16} style={{textAlign: "center", marginLeft : "15%", marginBottom : "1%"}}>
          <Col span={6}>
            <Card title="Total Blocks" bordered={false}>
                {height ? height : 0}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Transactions" bordered={false}>
                {txheight ? txheight : 0}
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{textAlign: "center", marginLeft : "15%", marginBottom : "1%"}}>
          <Col span={6}>
            <Card title="Total Contracts" bordered={false}>
                {contracts ? contracts : 0}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Addresses" bordered={false}>
                {addnum ? addnum : 0}
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default Overview;