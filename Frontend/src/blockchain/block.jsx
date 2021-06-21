import style from "./block.module.css";
import React, { useState, useEffect } from "react";
import Card from "../card/card";
import InputResult from "../input/inputResult";
import axios from "axios";

const Block = () => {
  const [dataHash, setDataHash] = useState("");
  const [block, setBlock] = useState("");
  const [hash, setHash] = useState("");
  const [nonce, setNonce] = useState("");
  const [background, SetBackground] = useState(true);
  const [ifMine, setIfMine] = useState(false);

  //init block
  useEffect(() => {
    console.log({ data: dataHash, block: block, nonce: nonce, hash: hash });

    axios.get("http://localhost:3030/blockchain/initBlock").then((res) => {
      setBlock(res.data.index);
      setNonce(res.data.nonce);
      setHash(res.data.hash);
      setDataHash(res.data.data);
    });
    console.log({ data: dataHash, block: block, nonce: nonce, hash: hash });
  }, []);

  // on change data or block or nonce
  useEffect(() => {
    console.log({ data: dataHash, block: block, nonce: nonce, hash: hash });
    if (ifMine) {
      axios
        .post("http://localhost:3030/blockchain/block", {
          data: dataHash,
          index: block,
          nonce: nonce,
        })
        .then((res) => {
          setHash(res.data.hash);
        });
    }
    console.log({ data: dataHash, block: block, nonce: nonce, hash: hash });
  }, [ifMine]);

  const mineBlock = () => {
    SetBackground(true);
    console.log({ data: dataHash, block: block, nonce: nonce, hash: hash });

    axios
      .post("http://localhost:3030/blockchain/block/mine", {
        data: dataHash,
        index: block,
        nonce: nonce,
      })
      .then((res) => {
        setBlock(res.data.index);
        setNonce(res.data.nonce);
        setDataHash(res.data.data);
        setHash(res.data.hash);
      });
    console.log({ data: dataHash, block: block, nonce: nonce, hash: hash });
  };

  const onChangeHash = (e) => {
    setIfMine(!ifMine);
    setDataHash(e.target.value);
    SetBackground(false);
  };

  const onChangeNonce = (e) => {
    setIfMine(!ifMine);
    setNonce(e.target.value);
    SetBackground(false);
  };

  const onChangeBlock = (e) => {
    setIfMine(!ifMine);
    setBlock(e.target.value);
    SetBackground(false);
  };

  const inputResult = (
    <div>
      <label htmlFor="hash" className={style.marginInput}>
        Hash:
      </label>
      <InputResult result={hash} keyElement="hash" />
    </div>
  );

  const inputTextBlock = (
    <div>
      <label htmlFor="block" className={style.marginInput}>
        Block:
      </label>
      <input
        type="number"
        id="block"
        name="block"
        value={block}
        onChange={onChangeBlock}
        key="block"
        className={style.inputData}
      />
    </div>
  );

  const inputTextNonce = (
    <div>
      <label htmlFor="nonce" className={style.marginInput}>
        Nonce:
      </label>
      <input
        type="text"
        id="nonce"
        name="nonce"
        value={nonce}
        onChange={onChangeNonce}
        key="nonce"
        className={style.inputData}
      />
    </div>
  );

  const inputTextData = (
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

  const divInput = (
    <div>
      {inputTextBlock} {inputTextNonce} {inputTextData}
    </div>
  );

  return (
    <div>
      <Card
        hiddenButton={false}
        title="Block"
        result={inputResult}
        childern={divInput}
        callApi={() => mineBlock()}
        color={background}
      />
    </div>
  );
};

export default Block;
