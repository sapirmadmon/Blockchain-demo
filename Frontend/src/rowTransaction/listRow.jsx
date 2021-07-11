import React from "react";
import Row from "./row.jsx";

const ListRow = (props) => {
  const descriptionData = props.descriptionData;
  //index of block
  const indexBlock = props.indexBlock;
  console.log(props.indexArr, props.data);
  return (
    <div>
      {props.data &&
        props.data.map((dataRow, index) => (
          <Row
            descriptionData={descriptionData}
            data={dataRow}
            onchange={props.onchange}
            indexRow={index}
            indexBlock={indexBlock}
            key={index}
          />
        ))}
    </div>
  );
};

export default ListRow;
