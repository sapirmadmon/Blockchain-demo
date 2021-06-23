import React from "react";
import Blockchain from "./blockchain";

const distributedBlockchain = () => {
  const numDistributed = 3;

  return (
    <div>
      <Blockchain key={1}></Blockchain>
      <Blockchain key={2}></Blockchain>
      <Blockchain key={3}></Blockchain>
    </div>
  );
};

export default distributedBlockchain;
