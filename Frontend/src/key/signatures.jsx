import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CardPart2 from "./../card/cardPart2.js";
import axios from "axios";
import InputResult from "../input/inputResult.js";
import style from "./keys.module.css";

const Signatures = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [message, setMessage] = useState("");
  const [sign, setSign] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3030/signature/initSignature").then((res) => {
      setPrivateKey(res.data.prKey);
      setPublicKey(res.data.puKey);
    });
  }, []);

  const onSign = () => {};

  const verify = () => {};

  const onChangePK = (e) => {
    setPrivateKey(e.target.value);
  };

  const onChangePublicKey = (e) => {
    setPublicKey(e.target.value);
  };

  const onChangeMeassage = (e) => {
    setMessage(e.target.value);
  };

  const onChangeSign = (e) => {
    setSign(e.target.value);
  };

  const inputPublicKey = (
    <div>
      <label htmlFor="publicKey" className={style.marginInput}>
        Public Key:
      </label>
      <br />
      <input
        type="text"
        id="publicKey"
        name="publicKey"
        value={publicKey}
        onChange={onChangePublicKey}
        className={style.inputData}
      />
    </div>
  );

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
        value={message}
        onChange={onChangeMeassage}
        className={style.inputData}
      />
    </div>
  );

  const inputPK = (
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
        onChange={onChangePK}
        className={style.inputData}
      />
    </div>
  );

  const inputSign = (
    <div>
      <label htmlFor="inputSign" className={style.marginInput}>
        Signature:
      </label>
      <br />
      <input
        type="text"
        id="inputSign"
        name="inputSign"
        value={sign}
        onChange={onChangeSign}
        className={style.inputData}
      />
    </div>
  );

  const inputMessageSignature = (
    <div>
      <label htmlFor="sign" className={style.marginInput}>
        Message Signature:
      </label>
      <br />
      <InputResult result={sign} />
    </div>
  );

  const divInput1 = (
    <div>
      {inputMessage}
      {inputPK}
      <br />
      <Button class="btn btn-primary w-75" key="sign" onClick={() => onSign()}>
        Sign
      </Button>
    </div>
  );
  const divInput2 = (
    <div>
      {inputMessage}
      {inputPublicKey}
      <br />
      <Button
        class="btn btn-primary w-75"
        key="verify"
        onClick={() => verify()}
      >
        Verfiy
      </Button>
    </div>
  );

  return (
    <div class="row">
      <CardPart2
        key="1"
        childern={divInput1}
        result={inputMessageSignature}
        title="Signatures - Sign"
      />
      <CardPart2
        key="2"
        childern={divInput2}
        result={inputSign}
        title="Signatures - Verify"
      />
    </div>
  );
};

export default Signatures;
