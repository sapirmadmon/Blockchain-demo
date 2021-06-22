import style from "./hash.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/card";
import InputResult from "../input/inputResult";

const Hasa = () => {
  const [dataHash, setDataHash] = useState("");
  const [hash, setHash] = useState("");

  //after render to DOM
  useEffect(() => {
    axios
      .post("http://localhost:3030/hash", { data: dataHash })
      .then((res) => setHash(res.data));
  }, [dataHash]);

  const onChangeHash = (e) => {
    setDataHash(e.target.value);
  };

  const inputText = (
    <div>
      <label htmlFor="dataHash" className={style.marginInput}>
        Data:
      </label>
      <input
        type="text"
        id="dataHash"
        name="dataHash"
        value={dataHash}
        onChange={onChangeHash}
        key="dataHash"
        className={style.inputData}
      />
    </div>
  );

  const inputResult = (
    <div>
      <label htmlFor="hash" className={style.marginInput}>
        Hash:
      </label>
      <InputResult result={hash} />
    </div>
  );

  return (
    <div>
      <Card
        hiddenButton={true}
        title="SHA256 Hash"
        childern={inputText}
        result={inputResult}
        color={true}
      />
    </div>
  );
};

export default Hasa;
