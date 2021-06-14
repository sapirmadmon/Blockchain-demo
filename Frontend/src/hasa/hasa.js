import style from "./hasa.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Hasa() {
  const [dataHash, setDataHash] = useState("");
  const [hash, setHash] = useState("");

  const callAPI = () => {
    axios
      .post("http://localhost:3030/blockchain/hash")
      .then((res) => setHash(res))
      .catch((error) => console.log(error));
  };
  //after render to DOM
  useEffect(() => {
    callAPI();
  }, [dataHash]);

  const onChangeHash = (e) => {
    setDataHash(e.target.value);
  };

  return (
    <div>
      <h1 className={style.title}>SHA256 Hash</h1>
      <div>
        <input
          type="text"
          id="hash"
          name="hash"
          value={hash}
          onChange={onChangeHash}
        />
        <div>hash</div>
      </div>
    </div>
  );
}

export default Hasa;
