import React from "react";

import style from "./row.module.css";

const Row = (props) => {
  const descriptionData = ["$", "from", "->"];
  const coinbaseDataDescription = ["$", "->"];
  const blockchainFinalDescription = ["$", "From", "->", "Seq", "Sig:"];
  let descrption;

  const isVerify = props.isVerify;
  const indexBlock = props.indexBlock;
  const indexRow = props.indexRow;

  const changeInput = (e, indexData, indexRow) => {
    const newValue = e.target.value;
    props.onchange(indexBlock, indexData, newValue, indexRow);
  };

  if (props.data.length === 2) {
    descrption = coinbaseDataDescription;
  } else if (props.data.length === 3) {
    descrption = descriptionData;
  } else {
    descrption = blockchainFinalDescription;
  }

  const rowHtml = descrption.map((description, index) => (
    <div class="flex-inline" key={index} className={style.space}>
      <label htmlFor={index + description} className={style.labelGray}>
        {description}
      </label>
      <input
        type="text"
        className={`${style.inputData} ${
          isVerify === false && index === 4 ? style.redColor : style.blackColor
        }`}
        key={index + description}
        name={index + description}
        value={props.data[index]}
        onChange={(e) => changeInput(e, index, indexRow)}
      />
    </div>
  ));

  return (
    <div className={style.marginInput} class="row flex-nowrap col-md-20">
      {rowHtml}
    </div>
  );
};

export default Row;
