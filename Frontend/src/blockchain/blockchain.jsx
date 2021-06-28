import style from "./block.module.css";
import React, { useState, useEffect, useCallback } from "react";
import Card from "../card/card";
import InputResult from "../input/inputResult";
import axios from "axios";

const Blockchain = (props) => {
  const [blockArr, setBlockArr] = useState([]);
  const indexBlockchain =
    props.indexBlockchain !== undefined ? props.indexBlockchain : 0;
  const routeInit =
    props.route !== undefined ? props.route1 : "blockchain/initBlockchain";
  const [ifMine, setIfMine] = useState(false);
  console.log(props.route1);
  //init block
  useEffect(() => {
    let arrOfBlock;
    axios.get("http://localhost:3030/" + routeInit).then((res) => {
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
        indexBlockchain: indexBlockchain,
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

  const mineBlock = useCallback(
    (indexBlock) => {
      if (blockArr[indexBlock].background) {
        return;
      }
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
            if (index === indexBlock) {
              block.background = true;
            } else if (index > indexBlock) {
              block.background = false;
            } else {
              block.background = blockArr[index].background;
            }
            return block;
          });

          setBlockArr(netBlockArr);
        });
    },
    [blockArr]
  );

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
      <p>
        <label htmlFor="hash" className={style.marginInput}>
          Hash:
        </label>
        <InputResult
          result={blockArr[index].hash}
          keyElement={index + "hash"}
        />
      </p>
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

  const inputTextBlock = (index) => (
    <div class="row flex-nowrap">
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
    <div class="row flex-nowrap">
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
    <div class="row flex-nowrap">
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
