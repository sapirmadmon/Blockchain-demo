import React from "react";
import Blockchain from "./blockchain";
import style from "./block.module.css";

const distributedBlockchain = () => {
  const indexArrBlock = ["A", "B", "C"];
  return (
    <div>
      <div></div>
      {indexArrBlock.map((value, index) => (
        <div key={index + 1}>
          <div className={style.subTitle}>Peer {value}</div>
          <Blockchain indexBlockchain={index + 1} key={value} />
        </div>
      ))}
    </div>
  );
};

export default distributedBlockchain;
