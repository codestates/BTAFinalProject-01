import React from 'react';
import styled from 'styled-components';
import { theme } from '../../src/style/theme';
import Overview from '../../src/components/home/overview';
import LatestBlock from '../../src/components/home/lastestBlock';
import LatestTx from '../../src/components/home/lastestTx';
import { Col, Row } from "antd";

function Home() {
  return (
    <div style={{marginLeft : "25%"}}>
      <h2>Search</h2>
      <Overview />
      <Row gutter={16}>
        <Col span={9}>
          <LatestBlock />
          <div style={{textAlign: "right", marginRight: "20px"}}>
            <a href="http://localhost:3000/blocks">{"See More"}</a>
          </div>
        </Col>
        <Col span={9}>
        <LatestTx />
          <div style={{textAlign: "right", marginRight: "20px"}}>
            <a href="http://localhost:3000/Txs">{"See More"}</a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Home;