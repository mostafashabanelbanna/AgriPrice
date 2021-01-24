import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeadBar from "../../UI/HeadBar";
import { Link } from "react-router-dom";

import "./SiteServices.css";

import mainBg from "../../../assets/images/png/panner.png";
import shopping from "../../../assets/images/png/sign · ecommerce · shopping · tag · sale.png";
import location from "../../../assets/images/png/location.png";
import ratio from "../../../assets/images/png/ratio.png";

const SiteServices = () => {
  return (
    <Row
      className="justify-content-center"
      style={{
        backgroundImage: `url(${mainBg})`,
        backgroundPosition: "right top",
        backgroundSize: "cover",
      }}
    >
      <Col xs={12}>
        <HeadBar>خدمات الموقع</HeadBar>
      </Col>
      <Container className="my-5">
        <Row>
          <Col sm={4}>
            <Link
              className="align-items-center d-flex flex-column justify-content-center zoom_on_hover"
              to="/about-us"
            >
              <div className="services_icon">
                <img src={shopping} alt="icon" />
              </div>
              <div className="services_txt">
                تعرف على اسعار المنتجات الزراعية محليا و عالميا
              </div>
            </Link>
          </Col>
          <Col sm={4}>
            <Link
              className="align-items-center d-flex flex-column justify-content-center zoom_on_hover"
              to="/about-us"
            >
              <div className="services_icon">
                <img src={location} alt="icon" />
              </div>
              <div className="services_txt">
                تعرف على منافذ البيع و أسعار المنتجات فيها
              </div>
            </Link>
          </Col>
          <Col sm={4}>
            <Link
              className="align-items-center d-flex flex-column justify-content-center zoom_on_hover"
              to="/about-us"
            >
              <div className="services_icon">
                <img src={ratio} alt="icon" />
              </div>
              <div className="services_txt">
                ﻗﺎرن اﻻﺳﻌﺎر و ﺗﻌﺮف ﻋﻠﻰ ﻣﺘﻐﻴﺮات اﻟﺴﻮق
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default SiteServices;
