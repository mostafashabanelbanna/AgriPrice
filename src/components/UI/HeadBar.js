import React from "react";
import { Col, Row } from "react-bootstrap";
import "./HeadBar.css";

const HeadBar = (props) => {
  return (
    <Row className="bar_container py-3">
      <Col>
        <h5 className="text-center">{props.children}</h5>
      </Col>
    </Row>
  );
};

export default HeadBar;
