import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Blocks from '../pages/Blocks';
import BlockDetail from '../pages/BlockDetail';
import Txs from '../pages/Txs';
import TxDetail from '../pages/TxDetail';
import Contracts from '../pages/Contracts';
import ContractDetail from '../pages/ContractDetail';
import Addresses from '../pages/Addresses';
import AddressDetail from '../pages/AddressDetail';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blocks" element={<Blocks />} />
      <Route path="/blocks/:content_id" element={<BlockDetail />} />
      <Route path="/txs" element={<Txs />} />
      <Route path="/txs/:content_id" element={<TxDetail />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/contracts/:content_id" element={<ContractDetail />} />
      <Route path="/addresses" element={<Addresses />} />
      <Route path="/addresses/:content_id" element={<AddressDetail />} />
    </Routes>
  );
}