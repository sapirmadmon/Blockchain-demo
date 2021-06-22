import style from "./block.module.css";
import React, { useState, useEffect } from "react";
import Card from "../card/card";
import InputResult from "../input/inputResult";
import axios from "axios";

const Blockchain = () => {
  const [blockArr, setBlockArr] = useState([]);
  const [ifMine, setIfMine] = useState(false);

  //init block
  useEffect(() => {
    let arrOfBlock;
    axios.get("http://localhost:3030/blockchain/initBlockchain").then((res) => {
      arrOfBlock = res.data.blockchain.reduce((prev, current) => {
        current.background = true;
        return [...prev, current];
      }, []);
      setBlockArr(arrOfBlock);
    });
  }, []);

  // on change data or block or nonce
  useEffect(() => {
    const indexBlock = blockArr.findIndex(
      (block) => block.background === false
    );
    if (indexBlock === -1) return;
    axios
      .post("http://localhost:3030/blockchain/getBlockchain", {
        newBlock: {
          numBlock: indexBlock,
          data: blockArr[indexBlock].data,
          nonce: blockArr[indexBlock].nonce,
          index: blockArr[indexBlock].index,
        },
      })
      .then((res) => {
        const blockchain = res.data.blockchain.map((block, index) => {
          if (index >= indexBlock) {
            block.background = false;
          } else {
            block.background = true;
          }
          return block;
        });
        setBlockArr(blockchain);
      });
  }, [ifMine]);

  const mineBlock = (indexBlock) => {
    axios
      .post("http://localhost:3030/blockchain/mine", {
        newBlock: {
          numBlock: indexBlock,
          data: blockArr[indexBlock].data,
          nonce: blockArr[indexBlock].nonce,
          index: blockArr[indexBlock].index,
        },
      })
      .then((res) => {
        const netBlockArr = res.data.blockchain.map((block, index) => {
          if (index > indexBlock) {
            block.background = false;
          } else {
            block.background = true;
          }
          return block;
        });

        setBlockArr(netBlockArr);
      });
  };

  const onChangeValue = (e, index, value) => {
    setIfMine(!ifMine);
    const copyBlockArr = [...blockArr];
    copyBlockArr[index][value] = e.target.value;
    copyBlockArr[index].background = false;
    setBlockArr(copyBlockArr);
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
        value={blockArr[index].data}
        onChange={(e) => onChangeValue(e, index, "data")}
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
        <Card
          hiddenButton={false}
          title=""
          result={inputResult(index)}
          childern={divInput(index)}
          callApi={() => mineBlock(index)}
          color={block.background}
          key={index}
        />
      ))}
    </div>
  );

  return <div>{cards}</div>;
};

export default Blockchain;
