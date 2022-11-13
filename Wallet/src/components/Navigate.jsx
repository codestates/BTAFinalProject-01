import React from "react";
import * as ReactDOM from "react-dom";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const Navigate = () => {
  return (
	<>
		<Navbar />
		<Outlet />
	</>);
};

export default Navigate;