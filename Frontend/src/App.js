import "./App.module.css";
import React from "react";
import Navbar from "./router/Navbar";
import Block from "./blockchain/block.jsx";
import Blockchain from "./blockchain/blockchain.jsx";
import DistributedBlockchain from "./blockchain/distributedBlockchain.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tokens from "./tokens/tokens.jsx";
import Coinbase from "./coinbase/coinbase.jsx";
import Hash from "./hash/hash";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/somePage">some page 1</Route>
          <Route path="/block">
            <Block></Block>
          </Route>
          <Route path="/hash">
            <Hash></Hash>
          </Route>
          <Route path="/blockchain">
            <Blockchain></Blockchain>
          </Route>
          <Route path="/distributed">
            <DistributedBlockchain />
          </Route>
          <Route path="/tokens">
            <Tokens />
          </Route>
          <Route path="/counbase">
            <Coinbase />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
