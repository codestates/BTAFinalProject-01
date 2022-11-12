export const lastedBlockColumns = [
    {
        title: 'Index',
        dataIndex: 'index',
        key: 'index',
        render : text => <a href={`http://localhost:3000/blocks/${text}`}>{text}</a>
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

export const lastedTxColumns = [
    {
        title: 'Tx ID',
        dataIndex: 'txid',
        key: 'txid',
        render : text => <a href = {`http://localhost:3000/txs/${text}`}>
                            {`${text.slice(0,6)}..`}
                        </a>
    },
    {
        title: 'Block',
        dataIndex: 'block',
        key: 'block',
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

  export const blockListColumns = [
    {
        title: 'Index',
        dataIndex: 'index',
        key: 'index',
        render : text => <a href={`http://localhost:3000/blocks/${text}`}>{text}</a>
    },
    {
        title: 'Block Hash',
        dataIndex: 'hash',
        key: 'hash',
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

export const txListColumns = [
    {
        title: 'Tx ID',
        dataIndex: 'txid',
        key: 'txid',
        render : text => <a href = {`http://localhost:3000/txs/${text}`}>
                            {text}
                        </a>
    },
    {
        title: 'Block',
        dataIndex: 'block',
        key: 'block',
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

  export const addListColumns = [
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render : text => <a href={`http://localhost:3000/addresses/${text}`}>
                            {text}
                        </a>
    },
    {
        title: 'Script Hash',
        dataIndex: 'script_hash',
        key: 'script_hash',
    },
    {
        title: 'Created time',
        dataIndex: 'created_time',
        key: 'created_time',
    },
    {
        title: 'Neo',
        dataIndex: 'neo',
        key: 'neo',
    },
    {
        title: 'Gas',
        dataIndex: 'gas',
        key: 'gas',
    },
  ];

export const nep17ListColumns = [
    {
        title: 'Tx hash',
        dataIndex: 'txhash',
        key: 'txhash',
        render : text => <a href={`http://localhost:3000/txs/${text}`}>
                            {text}
                        </a>
    },
    {
        title: 'Transfer address',
        dataIndex: 'transferAddress',
        key: 'transferAddress',
        render : text => <a href={`http://localhost:3000/addresses/${text}`}>
                            {text}
                        </a>
    },
    {
        title: 'Token name',
        dataIndex: 'tokemName',
        key: 'tokemName',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Block index',
        dataIndex: 'blockindex',
        key: 'blockindex',
    },
  ];