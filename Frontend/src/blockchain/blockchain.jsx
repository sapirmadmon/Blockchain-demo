import style from "./block.module.css";
import React, { useState, useEffect } from "react";
import Card from "../card/card";
import InputResult from "../input/inputResult";
import axios from "axios";

const Blockchain = () => {
  const [blockArr, setBlockArr] = useState([]);
  const [background, SetBackground] = useState(true);
  const [ifMine, setIfMine] = useState(false);

  //init block
  useEffect(() => {
    let arrOfBlock;
    axios
      .get("http://localhost:3030/blockchain/blockchain/initBlockchain")
      .then((res) => {
        arrOfBlock = res.data.blockchain.reduce(
          (prev, current) => [...prev, current],
          []
        );
        setBlockArr(arrOfBlock);
      });
  }, []);

  const mineBlock = (index) => {
    SetBackground(true);
  };

  const onChangeValue = (e, index, value) => {
    setIfMine(!ifMine);
    const copyBlockArr = [...blockArr];
    copyBlockArr[index][value] = e.target.value;
    setBlockArr(copyBlockArr);
    SetBackground(false);
  };

  const inputResult = (index) => (
    <div>
      <label htmlFor="precedingHash" className={style.marginInput}>
        prev:
      </label>
      <InputResult
        result={blockArr[index].precedingHash}
        keyElement={index + "prev"}
      />

      <label htmlFor="hash" className={style.marginInput}>
        Hash:
      </label>
      <InputResult result={blockArr[index].hash} keyElement={index + "hash"} />
    </div>
  );

  const inputTextBlock = (index) => (
    <div>
      <label htmlFor="block" className={style.marginInput}>
        Block:
      </label>
      <input
        type="number"
        id={index + "block"}
        name="block"
        value={blockArr[index].index}
        onChange={(e) => onChangeValue(e, index, "index")}
        key={index + "block"}
        className={style.inputData}
      />
    </div>
  );

  const inputTextNonce = (index) => (
    <div>
      <label htmlFor="nonce" className={style.marginInput}>
        Nonce:
      </label>
      <input
        type="text"
        id={index + "nonce"}
        name="nonce"
        value={blockArr[index].nonce}
        onChange={(e) => onChangeValue(e, index, "nonce")}
        key={index + "nonce"}
        className={style.inputData}
      />
    </div>
  );

  const inputTextData = (index) => (
    <div>
      <label htmlFor="dataHash" className={style.marginInput}>
        Data:
      </label>
      <input
        type="text"
        id={index + "dataHash"}
        name="dataHash"
        value={blockArr[index].dataHash}
        onChange={(e) => onChangeValue(e, index, "dataHash")}
        key={index + "dataHash"}
        className={style.inputData}
      />
    </div>
  );

  const divInput = (index) => (
    <div>
      {inputTextBlock(index)}
      {inputTextNonce(index)}
      {inputTextData(index)}
    </div>
  );

  const cards = (
    <div>
      {blockArr.map((block, index) => (
        <div>
          <div>
            <Card
              hiddenButton={false}
              title=""
              result={inputResult(index)}
              childern={divInput(index)}
              callApi={() => mineBlock(index)}
              color={block.background}
              key={index}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return <div>{cards}</div>;
};

export default Blockchain;
