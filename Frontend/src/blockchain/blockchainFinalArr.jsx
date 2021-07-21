import React from "react";
import BlockchainFinal from "./blockchainFinal";
import style from "./block.module.css";

const BlockchainFinalArr = () => {
  const indexArrBlock = ["A", "B", "C"];
  return (
    <div>
      {indexArrBlock.map((value, index) => (
        <div key={index + 1}>
          <div className={style.subTitle}>Peer {value}</div>
          <BlockchainFinal indexBlockchain={index} key={value} />
        </div>
      ))}
    </div>
  );
};

export default BlockchainFinalArr;
