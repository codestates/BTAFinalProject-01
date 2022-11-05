import React, { useEffect, useState } from "react";
import "./App.css";
import * as ReactDOM from 'react-dom';
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Content from "./pages/Content";
import Login from "./pages/Login";

const App = () => {
  useEffect(() => {
    const { component, props } = getCurrent();
    console.log(
      component
        ? `There is a component on the stack! ${component} with ${props}`
        : `The current stack is empty so Router's direct children will be rendered`
    );
    const components = getComponentStack();
    console.log(`The stack has ${components.length} components on the stack`);
});

  return (
    <Router>
       {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/content" element={<Content />} />
            <Route path="/login" element={<Login />} />
        </Routes> */}
      <Navbar />
      <Home />
      {/* <Login />
      <Content /> */}
    </Router>
  );
};

export default App;
