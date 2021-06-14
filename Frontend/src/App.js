import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "./router/Navbar";
import Block from "./blockchain/block";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hasa from "./hasa/hasa";

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
          <Route path="/somePage">some page 1</Route>
          <Route path="/block">
            <Block></Block>
          </Route>
          <Route path="/hash">
            <Hasa></Hasa>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
