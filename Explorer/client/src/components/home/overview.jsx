import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from "antd";
import * as homeAPI from '../../APIs/homeAPI';

function Overview() {
    const [data, setData] = useState(0);

    const getData = async () => {
        const res = await homeAPI.getLastestInfo();
        setData(res.data);
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
                {data.height ? data.height : 0}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Transactions" bordered={false}>
                {data.transactions ? data.transactions : 0}
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{textAlign: "center", marginLeft : "15%", marginBottom : "1%"}}>
          <Col span={6}>
            <Card title="Total Contracts" bordered={false}>
                {data.contracts ? data.contracts : 0}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Addresses" bordered={false}>
                {data.addresses ? data.addresses : 0}
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default Overview;