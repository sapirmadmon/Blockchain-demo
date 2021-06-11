import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./router/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  //const [apiData, setApiData] = useState([]);
  //const [cityNames, setCityNames] = useState([]);

  const callAPI = () => {
    axios
      .get("http://localhost:3030/getAll")
      .then((res) => {})
      .catch((error) => console.log(error));
  };
  //after render to DOM
  useEffect(() => {
    callAPI();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar listCityName={[]} />
        <Switch>
          <Route path="/somePage">some page</Route>
          <Route path="/">hello world</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
