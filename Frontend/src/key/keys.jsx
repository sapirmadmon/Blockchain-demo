import React, { useState, useEffect } from "react";
import CardPart2 from "./../card/cardPart2.js";
import axios from "axios";
import InputResult from "../input/inputResult.js";
import style from "./keys.module.css";

const Keys = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    random();
  }, []);

  const onChangeHash = (e) => {
    setPrivateKey(e.target.value);
    axios
      .post("http://localhost:3030/keys/publicKey", { prKey: privateKey })
      .then((res) => {
        setPublicKey(res.data.puKey);
      });
  };

  const random = () => {
    axios.get("http://localhost:3030/keys/initKeys").then((res) => {
      setPrivateKey(res.data.prKey);
      setPublicKey(res.data.puKey);
    });
  };

  const inputText = (
    <div>
      <label htmlFor="privateKey" className={style.marginInput}>
        Private Key:
      </label>
      <input
        type="text"
        id="privateKey"
        name="privateKey"
        value={privateKey}
        onChange={onChangeHash}
        className={style.inputData}
      />
      <button onClick={random}>Random</button>
    </div>
  );

  const inputResult = (
    <div>
      <label htmlFor="hash" className={style.marginInput}>
        Public Key:
      </label>
      <InputResult result={publicKey} />
    </div>
  );

  return (
    <div>
      <CardPart2
        childern={inputText}
        result={inputResult}
        title="Public / Private Key Pairs"
      />
    </div>
  );
};

export default Keys;
