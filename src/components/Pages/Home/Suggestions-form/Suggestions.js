import React from "react";

import { useRouteMatch } from "react-router-dom";

import { Col, Container, Row } from "react-bootstrap";

import HeadBar from "../../../UI/HeadBar";
import SuggestionsForm from "./Suggestions-form";

// import "./Outlet.css";

const Suggestions = () => {
  let { url } = useRouteMatch();
  return (
    <Container fluid className={url === "/" ? "px-0" : ""}>
      <Row className="justify-content-center py-5">
        {url === "/" ? (
          <Col xs={12} className="mb-2">
            <h6 style={{ color: "var(--main-green)" }}>
              <span style={{ borderBottom: "2px solid var(--main-green)" }}>
                اﻗﺘﺮاﺣﺎت و ﺷﻜﺎوى
              </span>
            </h6>
          </Col>
        ) : null}

        <Container className="py-5">
          <Row>
            <Col sm={12}>
              <SuggestionsForm />
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Suggestions;
