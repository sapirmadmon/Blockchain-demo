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
        arrOfBlock = res.data.blockchain.reduce(
          (prev, current, currentIndex) => {
            current.background = current.isMine;
            current.coinbase = current.data[0];
            if (currentIndex === 0) {
              current.data = [];
              return [...prev, current];
            }
            let dataField = current.data.slice(1);
            current.isVerifiy = dataField.map((dataRow) => dataRow[2]);

            dataField = dataField.map((dataRow) => {
              return [...dataRow[0], dataRow[1]];
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
    (indexBlock, indexTx) => {
      let arrOfBlock;
      const data = blockArr[indexBlock].data.map((arr, index) => [
        [arr.slice(0, 3)],
        arr[4],
        blockArr[indexBlock].isVerifiy[index],
      ]);
      axios
        .post("http://localhost:3030/blockchain2/getBlockchain", ,{
          newBlock: {
            numBlock: indexBlock,
            data: [blockArr[indexBlock].coinbase, ...data],
            nonce: blockArr[indexBlock].nonce,
            index: blockArr[indexBlock].index,
          },
          indexBlockchain: indexBlockchain,
          indexTx: indexTX
        })
        .then((res) => {
          console.log(res.data.blockchain);
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
            data: [
              ...blockArr[indexBlock].coinbase,
              ...blockArr[indexBlock].data,
            ],
            nonce: blockArr[indexBlock].nonce,
            index: blockArr[indexBlock].index,
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
    getBlock(index, null);
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
    getBlock(index, indexArr + 1);
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
      {blockArr[index].data.length && (
        <ListRow
          data={blockArr[index].data}
          key={index}
          indexBlock={index}
          onchange={onChangedata}
        />
      )}
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
