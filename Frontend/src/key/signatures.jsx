import React, { useState, useEffect } from "react";
import CardPart2 from "./../card/cardPart2.js";
import axios from "axios";
import InputResult from "../input/inputResult.js";
import style from "./keys.module.css";
import { Button } from "react-bootstrap";

const Signatures = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    random();
  }, []);

  const onChangePrivateKey = (e) => {
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

  const sign = () => {};

  const verify = () => {};

  const inputMessage = (
    <div>
      <label htmlFor="message" className={style.marginInput}>
        Message:
      </label>
      <br />
      <input
        type="text"
        id="message"
        name="message"
        value={privateKey}
        onChange={onChangePrivateKey}
        className={style.inputData}
      />
    </div>
  );

  const inputText = (
    <div>
      <label htmlFor="privateKey" className={style.marginInput}>
        Private Key:
      </label>
      <br />
      <input
        type="text"
        id="privateKey"
        name="privateKey"
        value={privateKey}
        onChange={onChangePrivateKey}
        className={style.inputData}
      />
    </div>
  );

  const inputResult = (
    <div>
      <label htmlFor="message" className={style.marginInput}>
        Message Signature:
      </label>
      <br />
      <InputResult result={message} />
    </div>
  );

  const divInput1 = (
    <div>
      {inputText}
      {inputMessage}
      <br />
      <Button class="btn btn-primary btn-block w-75" onClick={() => sign()}>
        Sign
      </Button>
    </div>
  );
  const divInput2 = (
    <div>
      {inputText}
      {inputMessage}
      <br />
      <Button class="btn btn-primary btn-block w-75" onClick={() => verify()}>
        Verfiy
      </Button>
    </div>
  );

  return (
    <div>
      <CardPart2 childern={divInput1} result={inputResult} title="Signatures" />
      <CardPart2 childern={divInput2} result={inputResult} title="Signatures" />
    </div>
  );
};

export default Signatures;
