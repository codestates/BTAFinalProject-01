import React, { useEffect, useState } from "react";
import "./App.css";
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Content from "./pages/Content";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Account from "./components/Account";
import TokenList from "./components/TokenList";
import Setting from "./components/Setting";
import Transfer from "./components/Transfer";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/content" element={<Content />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/account" element={<Account />} />
            <Route path="/tokenlist" element={<TokenList />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/transfer" element={<Transfer />} />
         </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
