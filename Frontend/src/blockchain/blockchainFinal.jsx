import style from "./block.module.css";
import React, { useState, useEffect, useCallback } from "react";
import Card from "../card/card";
import InputResult from "../input/inputResult";
import axios from "axios";
import ListRow from "../rowTransaction/listRow";
import Row from "../rowTransaction/row";

const BlockchainFinal = (props) => {
  const [blockArr, setBlockArr] = useState([]);
  const indexBlockchain =
    props.indexBlockchain !== undefined ? props.indexBlockchain : 0;

  //init block
  useEffect(() => {
    let arrOfBlock;
    axios
      .get("http://localhost:3030/blockchain2/initBlockchain", {
        params: {
          indexBlockchain: indexBlockchain,
        },
      })
      .then((res) => {
        console.log("res11", res);
        arrOfBlock = res.data.blockchain.reduce(
          (prev, current, currentIndex) => {
            current.background = current.isMine;
            current.coinbase = current.data[0];
            if (currentIndex === 0) {
              current.data = [];
              return [...prev, current];
            }
            let dataField = current.data.slice(1);
            dataField = dataField.map((dataRow) => {
              return [...dataRow.message, dataRow.seq, dataRow.signature];
            });
            current.data = dataField;
            return [...prev, current];
          },
          []
        );
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

  // on click button mine
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
    blockArr[index][value] = e.target.value;
    getBlock(index);
  };

  const inputResult = (index) => (
    <div>
      <div class="row flex-nowrap">
        <label
          htmlFor={index + "precedingHash"}
          className={style.marginInput}
          class="col-md-3"
        >
          prev:
        </label>
        <InputResult
          result={blockArr[index].precedingHash}
          keyElement={index + "precedingHash"}
        />
      </div>
      <div class="row flex-nowrap">
        <label
          htmlFor={index + "hash"}
          className={style.marginInput}
          class="col-md-3"
        >
          Hash:
        </label>
        <InputResult
          result={blockArr[index].hash}
          keyElement={index + "hash"}
        />
      </div>
    </div>
  );

  const createInput = (index, keyValue, type) => (
    <div class="row flex-nowrap">
      <label
        htmlFor={index + keyValue}
        className={style.marginInput}
        class="col-md-4"
      >
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

  const onChangedata = (index, indexData, newValue, indexArr) => {
    const copyArr = [...blockArr];
    copyArr[index].data[indexArr][indexData] = newValue;
    setBlockArr(copyArr);
    getBlock(index);
  };

  const divInput = (index) => (
    <div>
      {createInput(index, "index", "number")}
      {createInput(index, "nonce", "number")}
      <br></br>
      coinbase
      <Row data={blockArr[index].coinbase} indexBlock={index} indexRow={null} />
      <br></br>
      Tx:
      <ListRow
        data={blockArr[index].data}
        key={index}
        indexBlock={index}
        onchange={onChangedata}
      />
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

export default BlockchainFinal;
