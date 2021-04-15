import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "react-bootstrap";
import { axios } from "../Axios/Axios";

import "./LocalPrices.css";
import { SampleNextArrow, SamplePrevArrow } from "../slick-carousel/Arrows";
import GeneralIndicatorTabs from "./General-indicator-tabs";

const LocalPrices = (props) => {
  const [generalIndicators, setGeneralIndicators] = useState([]);
  const [generalIndicatorData, setGeneralIndicatorData] = useState();
  const [currentGeneralIndicator, setCurrentGeneralIndicator] = useState();

  const noGeneralIndicators =
    !generalIndicators || (generalIndicators && generalIndicators.length === 0); //check if no news

  //get indicatorId from show more btn in home page
  // let indicatorId = parseInt(props.location.state.indicatorId);

  const getGeneralIndicators = async () => {
    //fetch generalIndicators data
    const response = await axios
      .get("/PricesData/GetGeneralIndicators")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setGeneralIndicators(response.data); // set generalIndicators data to state
      getGeneralIndicatorData(response.data[0].id); // set GeneralIndicatorData on component mount
    }
  };

  const getGeneralIndicatorData = async (id) => {
    const response = await axios
      .get(`/PricesData/GetGeneralIndicatorAllData/${id}`)
      .catch((err) => console.log("Error", err)); //handle errors;
    if (response && response.data) {
      setGeneralIndicatorData(response.data); // set FocusedGeneralIndicator data to state
      setCurrentGeneralIndicator(id);
    }
  };
  const handleGeneralIndicatorSelect = (id) => {
    getGeneralIndicatorData(id); // set GeneralIndicatorData on select lable
    setCurrentGeneralIndicator(id);
  };

  useEffect(() => {
    getGeneralIndicators();
  }, []);

  // Slider Settings
  const settings = {
    className: "center",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
    <Container fluid className="my-4 local-prices">
      <Row>
        <Col xs={12}>
          <h5 style={{ color: "var(--main-green)" }}>المجموعات السلعية</h5>
        </Col>
        <Col xs={12} className="my-4">
          <Slider {...settings}>
            {!noGeneralIndicators &&
              generalIndicators.map((Item, idx) => {
                return (
                  <div key={Item.id}>
                    <div
                      className={`p-2 mx-2 lable ${
                        Item.id === currentGeneralIndicator ? "active" : ""
                      }`}
                      onClick={() => handleGeneralIndicatorSelect(Item.id)}
                    >
                      <h6 className="text-center my-1">{Item.nameA}</h6>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </Col>
        <Col xs={12}>
          <GeneralIndicatorTabs generalIndicatorData={generalIndicatorData} />
        </Col>
      </Row>
    </Container>
  );
};

export default LocalPrices;
