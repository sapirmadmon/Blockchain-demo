import style from "./block.module.css";
import React, { useState } from "react";

function Block() {
  const [dataHash, setDataHash] = useState("");
  return (
    <div>
      <h1 className={style.title}>SHA256 Hash</h1>
      some block here
    </div>
  );
}

export default Block;
