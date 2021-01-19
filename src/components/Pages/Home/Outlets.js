import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import { SampleNextArrow, SamplePrevArrow } from "../../slick-carousel/Arrows";

import HeadBar from "../../UI/HeadBar";
import slide_one from "../../../assets/images/png/Mask_Group_14.png";
import slide_two from "../../../assets/images/png/NSPO.png";

import "./Outlet.css";

const Outlets = () => {
  const settings = {
    className: "center",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    infinite: true,
    // autoplay: true,
    slidesToScroll: 3,

    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Row
      className="justify-content-center py-5"
      style={{ backgroundColor: "var(--main-green)" }}
    >
      <Col xs={12}>
        <HeadBar>منافذ و اسواق</HeadBar>
      </Col>
      <Container className="py-5">
        <Row>
          <Col className="carrousel_wrapper outlets px-0">
            <Slider {...settings}>
              <div className="px-2 d-flex flex-column align-items-center">
                <div className="carrousel_image align-items-center carrousel_image d-flex justify-content-center">
                  <img src={slide_one} alt="1" />
                </div>
                <div className="carrousel_caption">
                  <div className="text-center">
                    الفرع الرئيسي القاهرة /عين شمس
                  </div>
                  <div className="text-center p-3">
                    <Link style={{ textDecoration: "underline" }}>المزيد</Link>
                  </div>
                </div>
              </div>

              <div className="px-2 d-flex flex-column align-items-center">
                <div className="carrousel_image align-items-center carrousel_image d-flex justify-content-center">
                  <img src={slide_two} className="img-fluid" alt="2" />
                </div>
                <div className="carrousel_caption">
                  <div className="text-center">
                    الفرع الرئيسي القاهرة /عين شمس
                  </div>
                  <div className="text-center p-3">
                    <Link style={{ textDecoration: "underline" }}>المزيد</Link>
                  </div>
                </div>
              </div>

              <div className="px-2 d-flex flex-column align-items-center">
                <div className="carrousel_image align-items-center carrousel_image d-flex justify-content-center">
                  <img src={slide_one} alt="11" />
                </div>
                <div className="carrousel_caption">
                  <div className="text-center">
                    الفرع الرئيسي القاهرة /عين شمس
                  </div>
                  <div className="text-center p-3">
                    <Link style={{ textDecoration: "underline" }}>المزيد</Link>
                  </div>
                </div>
              </div>

              <div className="px-2 d-flex flex-column align-items-center">
                <div className="carrousel_image align-items-center carrousel_image d-flex justify-content-center">
                  <img src={slide_two} className="img-fluid" alt="22" />
                </div>
                <div className="carrousel_caption">
                  <div className="text-center">
                    الفرع الرئيسي القاهرة /عين شمس
                  </div>
                  <div className="text-center p-3">
                    <Link style={{ textDecoration: "underline" }}>المزيد</Link>
                  </div>
                </div>
              </div>
            </Slider>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default Outlets;
