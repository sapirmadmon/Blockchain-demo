import React from "react";

import style from "./row.module.css";

const Row = (props) => {
  const descriptionData = props.descriptionData;
  const indexBlock = props.indexBlock;
  const indexRow = props.indexRow;

  const changeInput = (e, indexData, indexRow) => {
    const newValue = e.target.value;
    props.onchange(indexBlock, indexData, newValue, indexRow);
  };

  const rowHtml = descriptionData.map((description, index) => (
    <div class="flex" key={index}>
      <label htmlFor={index + description} className={style.labelGray}>
        {description}
      </label>
      <input
        type="text"
        className={style.inputData}
        key={index + description}
        name={index + description}
        value={props.data[index]}
        onChange={(e) => changeInput(e, index, indexRow)}
      />
    </div>
  ));

  return (
    <div className={style.marginInput} class="row flex-nowrap col-md-25">
      {rowHtml}
    </div>
  );
};

export default Row;
