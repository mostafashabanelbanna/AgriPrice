import React from "react";
import Card from "react-bootstrap/Card";

import "./Custom-card.css";

const CustomCard = (props) => {
  return (
    <Card style={{ width: "20rem" }} className="h-100">
      <Card.Img variant="top" src="./images/idsc_logo.png" />
      <Card.Body>
        <Card.Title>{props.CardTitle}</Card.Title>
        <Card.Text>{props.CardText}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
