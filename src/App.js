import React from "react";
import "./App.css";
import Table from "./components/Table";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import  Login  from "./components/Login";
import { SignUp } from "./components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/table" component={Table} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
