import React from 'react'
import { Table } from "antd";
const dataSource = [
    {
        key: '1',
        txId: '0x10230',
        gas: '0.0123 gas',
        size: '100 Bytes',
        time: '18 seconds ago',
    },
    {
        key: '2',
        txId: '0x10230',
        gas: '0.0123 gas',
        size: '100 Bytes',
        time: '18 seconds ago',
    },
    {
        key: '3',
        txId: '0x10230',
        gas: '0.0123 gas',
        size: '100 Bytes',
        time: '18 seconds ago',
    },
    {
        key: '4',
        txId: '0x10230',
        gas: '0.0123 gas',
        size: '100 Bytes',
        time: '18 seconds ago',
    },
    {
        key: '5',
        txId: '0x10230',
        gas: '0.0123 gas',
        size: '100 Bytes',
        time: '18 seconds ago',
    },
  ];
  
  const columns = [
    {
        title: 'Tx ID',
        dataIndex: 'txId',
        key: 'txId',
    },
    {
        title: 'Gas Consumed',
        dataIndex: 'gas',
        key: 'gas',
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
  

function LastestTx() {
    return (
        <div className="site-card-wrapper">
            <h2>
                Lastest Transactions
            </h2>
            <Table dataSource={dataSource} columns={columns} pagination={false} />;
        </div>
    )
}


export default LastestTx;