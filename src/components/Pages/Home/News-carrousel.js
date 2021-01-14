import React from "react";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "../../slick-carousel/Arrows";
import "./News-carrousel.css";

import slide_one from "../../../assets/images/stock.jpg";

const NewsCarrousel = () => {
  const settings = {
    className: "center",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    infinite: true,
    // autoplay: true,
    centerPadding: "400px",
    slidesToShow: 1,
    speed: 500,
    rtl: true,
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
          centerPadding: "0px",
        },
      },
    ],
  };
  return (
    <div className="carrousel_wrapper news px-0">
      <Slider {...settings}>
        <div className="px-2">
          <div
            className="carrousel_image"
            style={{
              background: `url(${slide_one})`,
            }}
          ></div>
          <div className="carrousel_caption d-flex justify-content-between flex-row-reverse">
            <div>
              <h2>عنوان الخبر</h2>
              <p>عنوان داخلي</p>
            </div>
            <div>الاحد ٢ نوفمبر 2021</div>
          </div>
        </div>
        <div className="px-2">
          <div
            className="carrousel_image"
            style={{
              background: `url(${slide_one})`,
            }}
          ></div>
          <div className="carrousel_caption d-flex justify-content-between flex-row-reverse">
            <div>
              <h2>عنوان الخبر</h2>
              <p>عنوان داخلي</p>
            </div>
            <div>الاحد ٢ نوفمبر 2021</div>
          </div>
        </div>
        <div className="px-2">
          <div
            className="carrousel_image"
            style={{
              background: `url(${slide_one})`,
            }}
          ></div>
          <div className="carrousel_caption d-flex justify-content-between flex-row-reverse">
            <div>
              <h2>عنوان الخبر</h2>
              <p>عنوان داخلي</p>
            </div>
            <div>الاحد ٢ نوفمبر 2021</div>
          </div>
        </div>
        <div className="px-2">
          <div
            className="carrousel_image"
            style={{
              background: `url(${slide_one})`,
            }}
          ></div>
          <div className="carrousel_caption d-flex justify-content-between flex-row-reverse">
            <div>
              <h2>عنوان الخبر</h2>
              <p>عنوان داخلي</p>
            </div>
            <div>الاحد ٢ نوفمبر 2021</div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default NewsCarrousel;
