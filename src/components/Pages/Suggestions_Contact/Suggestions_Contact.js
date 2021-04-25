import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import ConatctUs from "../Home/Contact-us/ContactUs";

import SuggestionsForm from "../Home/Suggestions-form/Suggestions-form";

// import "./Outlet.css";

const SuggestionsContact = () => {
  return (
    <Container>
      <Row className="justify-content-center ">
        <Container>
          <Row className="my-3">
            <h5 style={{ color: "var(--main-green)" }}>تواصل معنا</h5>
          </Row>
          <Row>
            <Col sm={9}>
              <SuggestionsForm />
            </Col>
            <Col className="px-0" sm={3} style={{ backgroundColor: "#f7f7f7" }}>
              <ConatctUs style={{ border: "none" }} />
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default SuggestionsContact;
