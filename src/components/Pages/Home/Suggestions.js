import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import HeadBar from "../../UI/HeadBar";
import SuggestionsForm from "./Suggestions-form/Suggestions-form";

import formImg from "../../../assets/images/png/desktop-computer.png";
import "./Outlet.css";

const Suggestions = () => {
  return (
    <Row className="justify-content-center py-5">
      <Col xs={12}>
        <HeadBar>اﻗﺘﺮاﺣﺎت و ﺷﻜﺎوى</HeadBar>
      </Col>
      <Container className="py-5">
        <Row>
          <Col md={6}>
            <SuggestionsForm />
          </Col>
          <Col className="text-left" md={6}>
            <img src={formImg} />
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default Suggestions;
