import React, { useEffect, useState, Component} from 'react';
import 'antd/dist/antd.min.css';
import Router from './router/Router';
import { Layout } from 'antd';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { theme } from './style/theme';
// import Neon, { wallet, rpc } from "@cityofzion/neon-js";

// const url = process.env.REACT_APP_PRIVATE_RPC_URL;
// const rpcClient = Neon.create.rpcClient(url);

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
          gap: "80px",
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