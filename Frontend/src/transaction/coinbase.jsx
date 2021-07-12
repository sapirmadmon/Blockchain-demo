import React from "react";
import style from "./../blockchain/block.module.css";
import TX from "./tx";

const Coinbase = () => {
  const indexArrCoinbase = ["A", "B", "C"];
  const urlCoinbaseInit = "initBlockchainCoinbase";

  return (
    <div>
      <div></div>
      {indexArrCoinbase.map((value, index) => (
        <div key={index + 1}>
          <div className={style.subTitle}>Peer {value}</div>
          <TX indexBlockchain={index} key={value} URLInit={urlCoinbaseInit} />
        </div>
      ))}
    </div>
  );
};

export default Coinbase;
