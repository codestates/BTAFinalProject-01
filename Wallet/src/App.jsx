import React, { useEffect, useState } from "react";
import "./App.css";
import * as ReactDOM from "react-dom";
import { Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import Content from "./pages/Content";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Account from "./components/Account";
import TokenList from "./components/TokenList";
import Setting from "./components/Setting";
import Transfer from "./components/Transfer";
import MyAccount from "./components/MyAccount";
import ShowMnemonic from "./components/ShowMnemonic";

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
      <Route path="/myaccount" element={<MyAccount />} />
      <Route path="/showmnemonic" element={<ShowMnemonic />} />
		</Routes>
	);
};

export default App;
