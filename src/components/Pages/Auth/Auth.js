import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import authLogo from "../../../assets/images/auth.png";
import Registeration from "./Registeration";

import "./Auth.css";
import Login from "./Login";

const Auth = () => {
  return (
    <Container>
      <Row>
        <Col
          lg={6}
          className="d-flex justify-content-center align-items-center"
        >
          <img src={authLogo} />
        </Col>
        <Col lg={6}>
          <div className="p-4 border m-3" style={{ borderRadius: "8px" }}>
            <Tabs className="mt-4 justify-content-around auth_tabs">
              <Tab defaultValue eventKey={0} title="تسجيل دخول" className="p-5">
                <Login />
              </Tab>
              <Tab
                defaultValue
                eventKey={1}
                title="إنشاء حساب جديد"
                className="p-5"
              >
                <Registeration />
              </Tab>
            </Tabs>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
