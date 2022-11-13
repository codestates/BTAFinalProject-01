import React, { useEffect, useState } from "react";
import "./App.css";
import * as ReactDOM from "react-dom";
import { Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import Content from "./pages/Content";
import Login from "./pages/Login";
import Create from "./pages/Create";
import CreateMultiSig from "./pages/CreateMultiSig";
import Account from "./components/Account";
import TokenList from "./components/TokenList";
import Setting from "./components/Setting";
import Transfer from "./components/Transfer";
import MultiSigTransfer from "./components/MultiSigTransfer";
import MyAccount from "./components/MyAccount";
import ShowMnemonic from "./components/ShowMnemonic";
import InitAccount from "./components/InitAccount";
import SignTransaction from "./components/SignTransaction";
import FindMnemonic from "./components/FindMnemonic";

const App = () => {
	return (
		<Routes>
			<Route path="/*" element={<Home />} />
			<Route path="/content" element={<Content />} />
			<Route path="/login" element={<Login />} />
			<Route path="/create" element={<Create />} />
			<Route path="/account" element={<Account />} />
			<Route path="/tokenlist" element={<TokenList />} />
			<Route path="/setting" element={<Setting />} />
			<Route path="/transfer" element={<Transfer />} />
			<Route path="/multisigtransfer" element={<MultiSigTransfer />} />
			<Route path="/myaccount" element={<MyAccount />} />
			<Route path="/showmnemonic" element={<ShowMnemonic />} />
			<Route path="/initaccount" element={<InitAccount />} />
			<Route path="/signtransaction" element={<SignTransaction />} />
			<Route path="/findmnemonic" element={<FindMnemonic />} />
			<Route path="/createmultisig" element={<CreateMultiSig />} />
		</Routes>
	);
};

export default App;
