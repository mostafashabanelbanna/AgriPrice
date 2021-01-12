import React from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";

import "./News-carrousel.css";

import slide_one from "../../../assets/images/stock.jpg";

const NewsCarrousel = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    // autoplay: true,
    centerPadding: "400px",
    slidesToShow: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "60px",
        },
      },
    ],
  };
  return (
    <Container fluid className="carrousel_wrapper">
      <Slider {...settings}>
        <div className="px-2">
          <div
            className="carrousel_image"
            style={{
              background: `url(${slide_one})`,
            }}
          ></div>
          <div>
            <h2>عنوان الخبر</h2>
            <p>عنوان داخلي</p>
          </div>
        </div>
        <div className="px-2">
          <div
            className="carrousel_image"
            style={{
              background: `url(${slide_one})`,
            }}
          ></div>
        </div>

        <div className="px-2">
          <div
            className="carrousel_image"
            style={{
              background: `url(${slide_one})`,
            }}
          ></div>
        </div>

        <div className="px-2">
          <div
            className="carrousel_image"
            style={{
              background: `url(${slide_one})`,
            }}
          ></div>
        </div>
      </Slider>
    </Container>
  );
};

export default NewsCarrousel;
