import React, { useState, useEffect, useCallback } from "react";
import Card from "../card/card";
import InputResult from "../input/inputResult";
import axios from "axios";

const Coinbase = () => {
  const [coinbaseArr, setCoinbaseArr] = useState([]);

  const onChangeValue = (e, index, value) => {
    const copyBlockArr = [...coinbaseArr];
    copyBlockArr[index][value] = e.target.value;
    //getBlock(index);
  };

  // on click button mine
  const mineBlock = useCallback(
    (indexBlock) => {
      axios
        .post("http://localhost:3030/blockchain/mine", {
          newBlock: {
            numBlock: indexBlock,
            data: coinbaseArr[indexBlock].data,
            nonce: coinbaseArr[indexBlock].nonce,
            index: coinbaseArr[indexBlock].index,
          },
        })
        .then((res) => {
          const newCoinbaseArr = res.data.blockchain.map((block, index) => {
            block.background = block.isMine;
            return block;
          });

          setCoinbaseArr(newCoinbaseArr);
        });
    },
    [coinbaseArr]
  );

  const inputResult = (index) => (
    <div>
      <div class="row flex-nowrap">
        <label
          htmlFor={index + "precedingHash"}
          className={null}
          class="col-md-3"
        >
          prev:
        </label>
        <InputResult
          result={coinbaseArr[index].precedingHash}
          keyElement={index + "precedingHash"}
        />
      </div>
      <div class="row flex-nowrap">
        <label htmlFor={index + "hash"} className={null} class="col-md-3">
          Hash:
        </label>
        <InputResult
          result={coinbaseArr[index].hash}
          keyElement={index + "hash"}
        />
      </div>
    </div>
  );

  const createInput = (index, keyValue, type) => (
    <div class="row flex-nowrap">
      <label htmlFor={index + keyValue} className={null} class="col-md-4">
        {keyValue.substring(0, 1).toUpperCase() + keyValue.substring(1)}:
      </label>
      <input
        type={type}
        id={index + keyValue}
        name={keyValue}
        value={coinbaseArr[index][keyValue]}
        onChange={(e) => onChangeValue(e, index, keyValue)}
        key={index + keyValue}
        className={null}
      />
    </div>
  );

  const divInput = (index) => (
    <div>
      {createInput(index, "index", "number")}
      {createInput(index, "nonce", "number")}
      {createInput(index, "data", "text")}
    </div>
  );

  return (
    <div>
      {coinbaseArr.map((block, index) => (
        <Card
          hiddenButton={false}
          title=""
          result={inputResult(index)}
          childern={divInput(index)}
          callApi={() => mineBlock(index)}
          color={block.background}
          key={index}
        ></Card>
      ))}
    </div>
  );
};

export default Coinbase;
