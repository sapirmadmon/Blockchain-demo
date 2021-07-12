import React from "react";
import style from "./../blockchain/block.module.css";
import TX from "./tx";

const Token = () => {
  const indexArrToken = ["A", "B", "C"];
  const urlTokenInit = "initBlockchainToken";
  return (
    <div>
      <div></div>
      {indexArrToken.map((value, index) => (
        <div key={index + 1}>
          <div className={style.subTitle}>Peer {value}</div>
          <TX indexBlockchain={index} key={value} URLInit={urlTokenInit} />
        </div>
      ))}
    </div>
  );
};

export default Token;
