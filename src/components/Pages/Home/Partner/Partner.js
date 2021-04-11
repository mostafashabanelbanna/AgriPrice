import React, { useEffect, useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import { axios } from "../../../Axios/Axios";
import { paths } from "../../../Paths/Pathes";

import "./Partner.css";

const Partner = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: true,
    slidesToScroll: 1,
    dots: true,
    appendDots: (dots) => (
      <div
        style={{
          // backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px", textAlign: "center" }}> {dots} </ul>
      </div>
    ),
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 500,
    rtl: true,
  };
  const [partners, setPartners] = useState([]);
  const noPartners = !partners || (partners && partners.length === 0); //check if no partners

  const getPartners = async () => {
    //fetch news data
    const response = await axios
      .get("/home/Partner")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setPartners(response.data); // set partners data to state
    }
  };

  useEffect(() => {
    getPartners();
  }, []);

  return (
    <div
      className="justify-content-center pt-3 px-3 mb-3"
      style={{
        backgroundColor: "var(--secondary-gray)",
      }}
    >
      <div>
        <h6 style={{ color: "var(--main-green)" }}>
          <span style={{ borderBottom: "2px solid var(--main-green)" }}>
            شركاؤنا
          </span>
        </h6>
      </div>

      <div className="carrousel_wrapper partner px-0">
        <Slider {...settings}>
          {!noPartners &&
            partners.map((partnerItem, idx) => {
              return (
                <div
                  key={idx}
                  className="px-2 d-flex flex-column align-items-center"
                >
                  <Link
                    to="/"
                    className="d-flex flex-column justify-content-center align-items-center "
                  >
                    <div className="carrousel_image">
                      <img
                        src={`${paths.PartnerPhotos}${partnerItem.id}/${partnerItem.logo}`}
                        className="img-fluid"
                        alt={`${partnerItem.logo}`}
                      />
                    </div>
                    <div className="carrousel_caption zoom_on_hover">
                      <div className="text-center">{partnerItem.nameA}</div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Partner;
