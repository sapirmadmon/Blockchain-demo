import React from "react";

import style from "./row.module.css";

const Row = (props) => {
  const descriptionData = props.descriptionData;
  const index = props.index;

  const changeInput = (e, indexData) => {
    const newValue = e.target.value;
    props.onchange(index, indexData, newValue);
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
        onChange={(e) => changeInput(e, index)}
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
