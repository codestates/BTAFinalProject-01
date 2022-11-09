import React from 'react';
import styled from 'styled-components';
import { theme } from '../../src/style/theme';
import TxList from '../components/transactions/txList';

function Txs() {
  return (
    <div>
      <TxList />
    </div>
  );
}


export default Txs;