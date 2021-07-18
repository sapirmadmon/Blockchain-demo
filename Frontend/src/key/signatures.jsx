import React, { useState, useEffect, useCallback } from "react";
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
  const [isVerfiy, setIsVerify] = useState(true);
  const [havecolor, setHavecolor] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3030/signature/initSignature").then((res) => {
      setPrivateKey(res.data.prKey);
      setPublicKey(res.data.puKey);
    });
  }, []);

  const onSign = useCallback(() => {
    axios
      .post("http://localhost:3030/signature/sign", {
        message: message,
        prKey: privateKey,
      })
      .then((res) => {
        setPublicKey(res.data.puKey);
        setSign(res.data.signature);
      });
  }, [message, privateKey]);

  const verify = useCallback(() => {
    setHavecolor(true);
    axios
      .post("http://localhost:3030/signature/verify", {
        message: message,
        puKey: publicKey,
        signature: sign,
      })
      .then((res) => {
        setPublicKey(res.data.puKey);
        setMessage(res.data.message);
        setIsVerify(res.data.ifVerify);
        setSign(res.data.signature);
      });
  }, [message, publicKey, sign]);

  const onChangePK = (e) => {
    setPrivateKey(e.target.value);
    setHavecolor(false);
  };

  const onChangePublicKey = (e) => {
    setPublicKey(e.target.value);
    setHavecolor(false);
  };

  const onChangeMeassage = (e) => {
    setMessage(e.target.value);
    setHavecolor(false);
  };

  const onChangeSign = (e) => {
    setSign(e.target.value);
    setHavecolor(false);
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
        color={isVerfiy}
        childern={divInput2}
        result={inputSign}
        haveColor={havecolor}
        title="Signatures - Verify"
      />
    </div>
  );
};

export default Signatures;
