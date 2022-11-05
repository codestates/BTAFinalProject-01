import React from 'react';
import styled from 'styled-components';
import { theme } from '../../src/style/theme';
import Overview from '../../src/components/home/overview';
import LatestBlock from '../../src/components/home/lastestBlock';
import LatestTx from '../../src/components/home/lastestTx';
import { Col, Row } from "antd";

function Home() {
  return (
    <div>
      <h2>Search</h2>
      <Overview />
      <Row gutter={16}>
        <Col span={8}>
         <LatestBlock />
        </Col>
        <Col span={8}>
        <LatestTx />
        </Col>
      </Row>
    </div>
  )
}

export default Home;