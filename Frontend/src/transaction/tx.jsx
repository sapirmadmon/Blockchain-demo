import React, { useState, useEffect, useCallback } from "react";
import Card from "../card/card";
import InputResult from "../input/inputResult";
import axios from "axios";
import ListRow from "../rowTransaction/listRow.jsx";

const TX = (props) => {
  const [txArr, setTxArr] = useState([]);
  const indexBlockchain = props.indexBlockchain;
  const url = props.URLInit;

  useEffect(() => {
    let arrOfBlock;
    axios
      .get("http://localhost:3030/blockchain/" + url, {
        params: {
          indexBlockchain: indexBlockchain,
        },
      })
      .then((res) => {
        arrOfBlock = res.data.blockchain.reduce((prev, current) => {
          current.background = current.isMine;
          return [...prev, current];
        }, []);
        setTxArr(arrOfBlock);
      });
  }, []);

  // on change data or block or nonce
  const getBlock = useCallback(
    (indexBlock) => {
      axios
        .post("http://localhost:3030/blockchain/getBlockchain", {
          newBlock: {
            numBlock: indexBlock,
            data: txArr[indexBlock].data,
            nonce: txArr[indexBlock].nonce,
            index: txArr[indexBlock].index,
          },
          indexBlockchain: indexBlockchain,
        })
        .then((res) => {
          const blockchain = res.data.blockchain.map((block, index) => {
            block.background = block.isMine;
            return block;
          });
          setTxArr(blockchain);
        });
    },
    [txArr]
  );

  // on click button mine
  const mineBlock = useCallback(
    (indexBlock) => {
      axios
        .post("http://localhost:3030/blockchain/mine", {
          newBlock: {
            numBlock: indexBlock,
            data: txArr[indexBlock].data,
            nonce: txArr[indexBlock].nonce,
            index: txArr[indexBlock].index,
            indexBlockchain: indexBlockchain,
          },
        })
        .then((res) => {
          const newBlockArr = res.data.blockchain.map((block, index) => {
            block.background = block.isMine;
            return block;
          });

          setTxArr(newBlockArr);
        });
    },
    [txArr]
  );

  const onChangeValue = (e, index, value) => {
    const copytxArr = [...txArr];
    copytxArr[index][value] = e.target.value;
    setTxArr(copytxArr);
    getBlock(index);
  };

  const onChangedata = (index, indexData, newValue, indexArr) => {
    const copytxArr = [...txArr];
    copytxArr[index].data[indexArr][indexData] = newValue;
    setTxArr(copytxArr);
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
          result={txArr[index].precedingHash}
          keyElement={index + "precedingHash"}
        />
      </div>
      <div class="row flex-nowrap">
        <label htmlFor={index + "hash"} className={null} class="col-md-3">
          Hash:
        </label>
        <InputResult result={txArr[index].hash} keyElement={index + "hash"} />
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
        value={txArr[index][keyValue]}
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
      Tx:
      <ListRow
        data={txArr[index].data}
        key={index}
        indexBlock={index}
        onchange={onChangedata}
      />
    </div>
  );

  return (
    <div class="col-md-25 row flex-nowrap">
      {txArr.map((block, index) => (
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

export default TX;
