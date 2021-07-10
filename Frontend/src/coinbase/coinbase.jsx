import React, { useState, useEffect, useCallback } from "react";
import Card from "../card/card";
import InputResult from "../input/inputResult";
import axios from "axios";
import Row from "../rowTransaction/row.jsx";

const Coinbase = () => {
  const [coinbaseArr, setCoinbaseArr] = useState([]);

  useEffect(() => {
    let arrOfBlock;
    axios
      .get("http://localhost:3030/blockchain/initBlockchain", {
        params: {
          indexBlockchain: 0,
        },
      })
      .then((res) => {
        arrOfBlock = res.data.blockchain.reduce((prev, current) => {
          current.background = current.isMine;
          current.data = [1, 2, 3];
          return [...prev, current];
        }, []);
        setCoinbaseArr(arrOfBlock);
      });
  }, []);

  // on change data or block or nonce
  const getBlock = useCallback(
    (indexBlock) => {
      axios
        .post("http://localhost:3030/blockchain/getBlockchain", {
          newBlock: {
            numBlock: indexBlock,
            data: coinbaseArr[indexBlock].data,
            nonce: coinbaseArr[indexBlock].nonce,
            index: coinbaseArr[indexBlock].index,
          },
          indexBlockchain: 0,
        })
        .then((res) => {
          const blockchain = res.data.blockchain.map((block, index) => {
            block.background = block.isMine;
            return block;
          });
          setCoinbaseArr(blockchain);
        });
    },
    [coinbaseArr]
  );

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
            indexBlockchain: 0,
          },
          indexBlockchain: 0,
        })
        .then((res) => {
          const newBlockArr = res.data.blockchain.map((block, index) => {
            block.background = block.isMine;
            return block;
          });

          setCoinbaseArr(newBlockArr);
        });
    },
    [coinbaseArr]
  );

  const onChangeValue = (e, index, value) => {
    const copyCoinbaseArr = [...coinbaseArr];
    console.log(e.target.value);
    copyCoinbaseArr[index][value] = e.target.value;
    setCoinbaseArr(copyCoinbaseArr);
    getBlock(index);
  };

  const onChangedata = (index, indexData, newValue) => {
    const copyCoinbaseArr = [...coinbaseArr];
    console.log(newValue);
    copyCoinbaseArr[index].data[indexData] = newValue;
    setCoinbaseArr(copyCoinbaseArr);
    getBlock(index);
  };

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
      <Row
        data={coinbaseArr[index].data}
        descriptionData={["$", "from", "->"]}
        key={index}
        index={index}
        onchange={onChangedata}
      />
    </div>
  );

  return (
    <div class="col-md-25 row flex-nowrap">
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
