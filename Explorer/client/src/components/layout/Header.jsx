import { Layout, Row, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../src/style/theme';

const { Header: _Header } = Layout;

function HeaderComponent() {

  return (
    <Row justify="center" align="middle" style={{ marginTop: 20, marginBottom: 2 }}>
      <Col span={24}>
        <Header>
          <Wrapper>
            <Image src={process.env.PUBLIC_URL + "/assets/Logo2.png"} alt="main image" preview={false} />
            <div style={{width : "100%", marginLeft : "50%"}}>
              <Link to="/" >
                <span style={{ fontSize: 20 , marginRight : 20}}>Home</span>
              </Link>
              <Link to="/blocks" >
                <span style={{ fontSize: 20 , marginRight : 20 }}>Blocks</span>
              </Link>
              <Link to="/txs" >
                <span style={{ fontSize: 20 , marginRight : 20 }}>Transactions</span>
              </Link>
              <Link to="/contracts" >
                <span style={{ fontSize: 20 , marginRight : 20 }}>Contracts</span>
              </Link>
              <Link to="/addresses" >
                <span style={{ fontSize: 20 , marginRight : 20 }}>Addresses</span>
              </Link>
            </div>
          </Wrapper>
        </Header>
      </Col>
    </Row>
  );
}

const Header = styled(_Header)`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&display=swap');
  font-family: 'Aboreto', cursive;
  background-color: ${theme.white};
  color: ${theme.black};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1px;
  height: 100px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  a:link,
  a:visited,
  a:active,
  a:hover {
    text-decoration: #decfac wavy underline;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: right;
  justify-content: flex-start;
  cursor: pointer;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
  border: 5px solid transparent;
`;

export default HeaderComponent;