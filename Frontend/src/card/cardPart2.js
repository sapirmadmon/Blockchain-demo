import React from "react";
import { Card } from "react-bootstrap";
import style from "./card.module.css";
const CardPart2 = (props) => {
  return (
    <Card border={props.background} className={style.cardSpace} class="">
      <Card.Body class="col-md-20">
        <Card.Title className={style.title}>{props.title}</Card.Title>
        <div className={style.spaceDiv}>{props.childern}</div>
        <div className={style.spaceDiv}>{props.result}</div>
      </Card.Body>
    </Card>
  );
};

export default CardPart2;
