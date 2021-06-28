import React from "react";
import Blockchain from "./blockchain";

const distributedBlockchain = () => {
  const numDistributed = 3;
  const route = "blockchain/distributed/initBlockchain";

  return (
    <div>
      <Blockchain indexBlockchain={1} route1={route} />
    </div>
  );
};

export default distributedBlockchain;
