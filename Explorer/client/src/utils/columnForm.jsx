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
        title: 'Gas',
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
        title: 'Block Height',
        dataIndex: 'blockHeight',
        key: 'blockHeight',
    },
    {
        title: 'Gas',
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