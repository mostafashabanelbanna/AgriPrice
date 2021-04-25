import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import "./Footer.css";

import siteLogo from "../../assets/images/header_footer/logo_footer.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer style={{ backgroundColor: "var(--main-gray)" }}>
      <Container>
        <Row className="p-4">
          {/* <Col lg={2}>
            <img
              className="img-fluid"
              src={siteLogo}
              style={{ height: "150px" }}
              alt="siteLogo"
            />
          </Col> */}
          <Col lg={5} className="d-flex">
            <Link to="/" className="navbar-logo">
              <img
                className="img-fluid"
                src={siteLogo}
                style={{ height: "120px" }}
                alt="siteLogo"
              />
            </Link>
          </Col>
          <Col lg={5}>
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
          <Col
            lg={2}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <a href="#" className="my-2">
              <FacebookIcon fontSize="large" style={{ color: "#707070" }} />
            </a>
            <a href="#" className="my-2">
              <InstagramIcon fontSize="large" style={{ color: "#707070" }} />
            </a>
          </Col>
        </Row>
      </Container>
      <Container fluid style={{ backgroundColor: "#d6d6d6" }}>
        <Row>
          <Col className="d-flex justify-content-center p-3">
            جميع الحقوق محفوظة -مركز المعلومات و دعم اتخاذ القرار ٢٠٢١
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
