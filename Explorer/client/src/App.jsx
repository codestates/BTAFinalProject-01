import React, { useEffect, useState, Component} from 'react';
import 'antd/dist/antd.min.css';
import Router from './router/Router';
import { Layout } from 'antd';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { theme } from './style/theme';
import Neon, { rpc } from "@cityofzion/neon-js";

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const rpcClient = Neon.create.rpcClient(url);
// const rpcClient = new rpc.RPCClient(url);


const getBlock = async () => {
	return await rpcClient.getBlock(3).then(async (res) => {console.log(res)});
}
getBlock();

const test = async () => {
	return await rpcClient.getBlockHash(2).then(async (res) => {console.log(res)});
}
test();

const test2 = async () => {
  return await rpcClient.getConnectionCount(4).then(async (res) => {console.log(res)});
}
test2();

let query = Neon.create.query({ 
  "jsonrpc": "2.0",
  "method": "getblock",
  "params": [3, true],
  "id": 1
});


const test3 = async () => {
  return await rpcClient.execute(query).then(async (res) => {console.log(res)});
}
test3();


const { Content } = Layout;

function App() {

  return (
    <div className="App">
      <Layout
        className="layout"
        style={{
          height: '100%',
          background: `linear-gradient(${theme.white}, ${theme.sky_blue} )`,
          color: `${theme.beige}`,
          gap: "1000px",
        }}
      >
        <Header/>
        <Content
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${theme.space_9}`,
          }}
          className="site-layout-content"
        >
          <Router />
        </Content>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;