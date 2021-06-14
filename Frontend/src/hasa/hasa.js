import style from "./hasa.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Hasa = () => {
  const [dataHash, setDataHash] = useState("");
  const [hash, setHash] = useState("");

  //after render to DOM
  useEffect(() => {
    axios
      .post("http://localhost:3030/blockchain/hash", { data: dataHash })
      .then((res) => setHash(res.data));
  }, [dataHash]);

  const onChangeHash = (e) => {
    setDataHash(e.target.value);
  };

  return (
    <div className={style.title}>
      <h1>SHA256 Hash</h1>
      <div>
        <input
          type="text"
          id=""
          name=""
          value={dataHash}
          onChange={onChangeHash}
        />
        <div>{hash}</div>
        {/*<button onClick={addData}>send</button>*/}
      </div>
    </div>
  );
};

export default Hasa;
