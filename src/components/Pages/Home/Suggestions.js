import React from "react";

import { useRouteMatch } from "react-router-dom";

import { Col, Container, Row } from "react-bootstrap";

import HeadBar from "../../UI/HeadBar";
import SuggestionsForm from "./Suggestions-form/Suggestions-form";

import formImg from "../../../assets/images/png/desktop-computer.png";
import "./Outlet.css";

const Suggestions = () => {
  let { url } = useRouteMatch();
  return (
    <Container fluid className={url === "/" ? "px-0" : ""}>
      <Row className="justify-content-center py-5">
        {url === "/" ? (
          <Col xs={12}>
            <HeadBar>اﻗﺘﺮاﺣﺎت و ﺷﻜﺎوى</HeadBar>
          </Col>
        ) : null}

        <Container className="py-5">
          <Row>
            <Col md={6}>
              <SuggestionsForm />
            </Col>
            <Col className="text-left" md={6}>
              <img src={formImg} alt="form_img" />
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Suggestions;
