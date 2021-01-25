import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import HeadBar from "../../UI/HeadBar";

import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";

import "./Partner.css";

const Partner = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: true,
    slidesToScroll: 1,

    centerPadding: "0px",
    slidesToShow: 4,
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
    <Row
      className="justify-content-center py-5"
      style={{
        background: "rgb(13, 146, 76)",
        background:
          "linear-gradient( 0deg,rgba(13, 146, 76, 1) 0%, rgba(84, 166, 70, 1) 100%)",
      }}
    >
      <Col xs={12}>
        <HeadBar>شركاؤنا</HeadBar>
      </Col>
      <Container className="py-5">
        <Row>
          <Col className="carrousel_wrapper partner px-0">
            <Slider {...settings}>
              {!noPartners &&
                partners.map((partnerItem, idx) => {
                  return (
                    <div
                      key={idx}
                      className="px-2 d-flex flex-column align-items-center"
                    >
                      <Link className="d-flex flex-column justify-content-center align-items-center ">
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
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default Partner;
