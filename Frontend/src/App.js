import "./App.module.css";
import React from "react";
import Navbar from "./router/Navbar";
import Block from "./blockchain/block.jsx";
import Blockchain from "./blockchain/blockchain.jsx";
import DistributedBlockchain from "./blockchain/distributedBlockchain.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Token from "./transaction/token.jsx";
import Coinbase from "./transaction/coinbase";
import Hash from "./hash/hash";
import Keys from "./key/keys.jsx";
import Signatures from "./key/signatures";
import Transaction from "./key/transaction";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
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
            <Token />
          </Route>
          <Route path="/coinbase">
            <Coinbase />
          </Route>
          <Route path="/Keys">
            <Keys />
          </Route>
          <Route path="/Signatures">
            <Signatures />
          </Route>
          <Route path="/Transaction">
            <Transaction />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
