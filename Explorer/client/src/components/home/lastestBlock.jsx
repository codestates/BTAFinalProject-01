import React from 'react'
import { Table } from "antd";

const dataSource = [
    {
        key: '1',
        index: 10230,
        txs: '0 txns',
        size: '100 Bytes',
        time: '18 seconds ago',
    },
    {
        key: '2',
        index: 10229,
        txs: '0 txns',
        size: '100 Bytes',
        time: '18 seconds ago',
    },
    {
        key: '3',
        index: 10228,
        txs: '2 txns',
        size: '100 Bytes',
        time: '18 seconds ago',
    },
    {
        key: '4',
        index: 10227,
        txs: '0 txns',
        size: '100 Bytes',
        time: '18 seconds ago',
    },
    {
        key: '5',
        index: 10226,
        txs: '3 txns',
        size: '100 Bytes',
        time: '18 seconds ago',
    },
  ];
  
  const columns = [
    {
        title: 'Index',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'Txs Count',
        dataIndex: 'txs',
        key: 'txs',
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
  ];
  

function LastestBlock() {
    return (
        <div className="site-card-wrapper">
            <h2>
                Lastest Blocks
            </h2>
            <Table dataSource={dataSource} columns={columns} pagination={false} />;
        </div>
    )
}

export default LastestBlock;