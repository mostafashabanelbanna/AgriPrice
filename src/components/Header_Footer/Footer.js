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
          <Col lg={4} className="d-flex">
            <Link to="/" className="navbar-logo">
              <img
                className="img-fluid"
                src={siteLogo}
                style={{ height: "120px" }}
                alt="siteLogo"
              />
            </Link>
          </Col>
          <Col lg={6}>
            <Row>
              <Col xs={2} className="d-flex flex-column  align-items-center">
                <div>
                  <strong>من نحن</strong>
                </div>
                <Link className="my-2 text-center" to="/about-us">
                  عن الموقع
                </Link>
                <Link className="my-2 text-center" to="/suggestions">
                  إتصل بنا
                </Link>
              </Col>
              <Col xs={4} className="d-flex flex-column  align-items-center">
                <div>
                  <strong>الأسعار المحلية</strong>
                </div>
                <Link className="my-2 text-center" to="/local-prices">
                  المجموعات السلعية
                </Link>
                <Link
                  className="my-2 text-center"
                  to={{
                    pathname: `/local-prices/1`,
                    state: {
                      classification: "retail",
                    },
                  }}
                >
                  بحث السلعة
                </Link>
              </Col>
              <Col xs={3} className="d-flex flex-column  align-items-center">
                <Link className="my-2 text-center" to="/Global-prices">
                  الأسعار العالمية
                </Link>
                <Link className="my-2 text-center" to="/Ports">
                  المنافذ
                </Link>
              </Col>
              <Col xs={3} className="d-flex flex-column  align-items-center">
                <div>
                  <strong> المركز الإعلامي</strong>
                </div>
                <Link className="my-2 text-center" to="/news-list">
                  الأخبار
                </Link>
                <Link className="my-2 text-center" to="/document-library-list">
                  الإصدارات
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
