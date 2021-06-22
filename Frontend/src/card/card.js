import React from "react";
import { Card, Button } from "react-bootstrap";
import style from "./card.module.css";

const CardHOC = (props) => {
    let hidden = false;
    if (props.hiddenButton === undefined || props.hiddenButton) {
        hidden = true;
    }

    const background = props.color ? style.backGround : style.errorBackround;

    return ( <
        Card border = { props.background }
        className = { `${style.cardSpace} ${background}` } >
        <
        Card.Body >
        <
        Card.Title className = { style.title } > { props.title } < /Card.Title>{" "} <
        div className = { style.spaceDiv } > { props.childern } < /div>{" "} <
        div className = { `${style.spaceDiv}  ${style.result}` } > { " " } { props.result } { " " } <
        /div>{" "} <
        /Card.Body>{" "} <
        Card.Footer >
        <
        Button variant = "primary"
        className = { style.buttonMine }
        hidden = { props.hiddenButton && hidden }
        onClick = { props.callApi } >
        Mine { " " } <
        /Button>{" "} <
        /Card.Footer>{" "} <
        /Card>
    );
};

export default CardHOC;