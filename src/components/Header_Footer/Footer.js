import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

import siteLogo from "../../assets/images/logo@2x.png";
import idscLogo from "../../assets/images/idsc.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="">
      <Container fluid>
        <Row className="p-4" style={{ backgroundColor: "var(--main-gray)" }}>
          <Col lg={3} className="d-flex">
            <Link to="/" className="navbar-logo">
              <img src={siteLogo} style={{ height: "150px" }} alt="siteLogo" />
            </Link>
          </Col>
          <Col lg={6}>
            <Row>
              <Col xs={4} className="d-flex flex-column  align-items-center">
                <Link className="my-2" to="/about-us">
                  عن الموقع
                </Link>
                <Link className="my-2" to="/">
                  خريطة الأسعار
                </Link>
                <Link className="my-2" to="/suggestions">
                  تواصل معنا
                </Link>
              </Col>
              <Col xs={4} className="d-flex flex-column  align-items-center">
                <Link className="my-2" to="/news-list">
                  الاخبار
                </Link>
                <Link className="my-2" to="/events-list">
                  الفاعليات
                </Link>
                <Link className="my-2" to="/document-library-list">
                  اصدارات بحثية
                </Link>
              </Col>
              <Col xs={4} className="d-flex flex-column  align-items-center">
                <Link className="my-2" to="/Ports">
                 المنافذ
                </Link>
                <Link className="my-2" to="/">
                  مواقع ذات صلة
                </Link>
                <Link className="my-2" to="/">
                  الشركاء
                </Link>
              </Col>
            </Row>
          </Col>
          <Col lg={3}>
            <img src={idscLogo} style={{ height: "150px" }} alt="siteLogo" />
          </Col>
        </Row>
        <Row>
          <Col className="text-white d-flex justify-content-center p-3">
            جميع الحقوق محفوظة -مركز المعلومات و دعم اتخاذ القرار ٢٠٢١
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
