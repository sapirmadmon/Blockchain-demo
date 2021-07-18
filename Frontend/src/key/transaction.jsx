import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import CardPart2 from "./../card/cardPart2.js";
import axios from "axios";
import InputResult from "../input/inputResult.js";
import style from "./keys.module.css";
import ListRow from "../rowTransaction/listRow.jsx";

const Transaction = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [data, setData] = useState();
  const [sign, setSign] = useState("");
  const [isVerfiy, setIsVerify] = useState(true);
  const [havecolor, setHavecolor] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3030/transaction/initTransaction")
      .then((res) => {
        console.log(res);
        setPrivateKey(res.data.prKey);
        setPublicKey(res.data.puKey);
        setData([res.data.message]);
      });
  }, []);

  const onSign = useCallback(() => {
    const copyArr = [...data];
    axios
      .post("http://localhost:3030/transaction/sign", {
        message: data[0],
        prKey: privateKey,
      })
      .then((res) => {
        setSign(res.data.signature);
        copyArr[0][1] = res.data.puKey;
        setData(copyArr);
      });

    setHavecolor(false);
  }, [data, privateKey]);

  const verify = useCallback(() => {
    const copyArr = [...data];
    axios
      .post("http://localhost:3030/transaction/verify", {
        message: data[0],
        puKey: data[0][1],
        signature: sign,
      })
      .then((res) => {
        setSign(res.data.signature);
        copyArr[0][1] = res.data.puKey;
        setIsVerify(res.data.ifVerify);
        setData(copyArr);
      });
    setHavecolor(true);
  }, [data, sign]);

  const onChangePK = (e) => {
    setPrivateKey(e.target.value);

    axios
      .post("http://localhost:3030/transaction/getPublicKey", {
        prKey: privateKey,
      })
      .then((res) => (data[0][1] = res.data.puKey));

    setHavecolor(false);
  };

  const onChangeData = (index = null, indexData, newValue, indexArr) => {
    const copytxArr = [...data];
    copytxArr[indexArr][indexData] = newValue;
    setData(copytxArr);
    setHavecolor(false);
  };

  const onChangeSign = (e) => {
    setHavecolor(false);
    setSign(e.target.value);
  };

  const inputMessage = (
    <div className={style.marginInputLeft}>
      Message:
      <br />
      <br />
      <ListRow
        data={data}
        key={"index"}
        indexBlock={0}
        onchange={onChangeData}
      />
      <br />
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
      {inputSign}
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
        title="Transaction - Sign"
      />
      <CardPart2
        key="2"
        color={isVerfiy}
        childern={divInput2}
        result={null}
        haveColor={havecolor}
        title="Transaction - Verify"
      />
    </div>
  );
};

export default Transaction;
