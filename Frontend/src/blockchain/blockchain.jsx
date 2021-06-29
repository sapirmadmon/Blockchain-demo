import style from "./block.module.css";
import React, { useState, useEffect, useCallback } from "react";
import Card from "../card/card";
import InputResult from "../input/inputResult";
import axios from "axios";

const Blockchain = (props) => {
  const [blockArr, setBlockArr] = useState([]);
  const indexBlockchain =
    props.indexBlockchain !== undefined ? props.indexBlockchain : 0;

  //init block
  useEffect(() => {
    let arrOfBlock;
    axios
      .get("http://localhost:3030/blockchain/initBlockchain", {
        params: {
          indexBlockchain: indexBlockchain,
        },
      })
      .then((res) => {
        arrOfBlock = res.data.blockchain.reduce((prev, current) => {
          current.background = current.isMine;
          return [...prev, current];
        }, []);
        setBlockArr(arrOfBlock);
      });
  }, []);

  // on change data or block or nonce
  const getBlock = useCallback(
    (indexBlock) => {
      axios
        .post("http://localhost:3030/blockchain/getBlockchain", {
          newBlock: {
            numBlock: indexBlock,
            data: blockArr[indexBlock].data,
            nonce: blockArr[indexBlock].nonce,
            index: blockArr[indexBlock].index,
          },
          indexBlockchain: indexBlockchain,
        })
        .then((res) => {
          const blockchain = res.data.blockchain.map((block, index) => {
            block.background = block.isMine;
            return block;
          });
          setBlockArr(blockchain);
        });
    },
    [blockArr]
  );

  const mineBlock = useCallback(
    (indexBlock) => {
      axios
        .post("http://localhost:3030/blockchain/mine", {
          newBlock: {
            numBlock: indexBlock,
            data: blockArr[indexBlock].data,
            nonce: blockArr[indexBlock].nonce,
            index: blockArr[indexBlock].index,
            indexBlockchain: indexBlockchain,
          },
          indexBlockchain: indexBlockchain,
        })
        .then((res) => {
          const netBlockArr = res.data.blockchain.map((block, index) => {
            block.background = block.isMine;
            return block;
          });

          setBlockArr(netBlockArr);
        });
    },
    [blockArr]
  );

  const onChangeValue = (e, index, value) => {
    const copyBlockArr = [...blockArr];
    copyBlockArr[index][value] = e.target.value;
    getBlock(index);
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

  const createInput = (index, keyValue, type) => (
    <div class="row flex-nowrap">
      <label htmlFor={index + keyValue} className={style.marginInput}>
        {keyValue.substring(0, 1).toUpperCase() + keyValue.substring(1)}:
      </label>
      <input
        type={type}
        id={index + keyValue}
        name={keyValue}
        value={blockArr[index][keyValue]}
        onChange={(e) => onChangeValue(e, index, keyValue)}
        key={index + keyValue}
        className={style.inputData}
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

  const cards = (
    <div class="row flex-nowrap">
      {blockArr.map((block, index) => (
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

  return <div>{cards}</div>;
};

export default Blockchain;
