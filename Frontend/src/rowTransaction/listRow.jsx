import React from "react";
import Row from "./row.jsx";

const ListRow = (props) => {
  //index of block
  const indexBlock = props.indexBlock;
  return (
    <div>
      {props.data &&
        props.data.map((dataRow, index) => (
          <Row
            data={dataRow}
            onchange={props.onchange}
            indexRow={index}
            indexBlock={indexBlock}
            key={index}
            isVerify={props.isVerify ? props.isVerify[index] : null}
          />
        ))}
    </div>
  );
};

export default ListRow;
