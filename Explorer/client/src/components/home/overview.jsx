import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from "antd";
import * as homeAPI from '../../APIs/homeAPI';

function Overview() {
    const stats = {addresses:1,contracts:2,transactions:4};
    const { addresses, contracts, transactions } = stats
    const [height, setHeight] = useState(0);

    const getBlock = async () => {
        const res = await homeAPI.getLatestBlock();
        setHeight(res);
    };

    useEffect(() => {
        getBlock();
    }, []);

    return (
        <div className="site-card-wrapper">
        <h2>Overveiw</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total Blocks" bordered={false}>
                {height ? height : 0}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Transactions" bordered={false}>
                {transactions ? transactions : 0}
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total Contracts" bordered={false}>
                {contracts ? contracts : 0}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Addresses" bordered={false}>
                {addresses ? addresses : 0}
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default Overview;