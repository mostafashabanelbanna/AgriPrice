import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "react-bootstrap";
import { axios } from "../Axios/Axios";

import "./LocalPrices.css";
import { SampleNextArrow, SamplePrevArrow } from "../slick-carousel/Arrows";
import GeneralIndicatorTabs from "./General-indicator-tabs";
import Breadcrumb from "../UI/Bread-crumb/Breadcrumb";
import { saveCurrentGeneralIndicator } from "../../store/actions/CurrentGeneralIndicator";
import { connect } from "react-redux";

const LocalPrices = (props) => {
  const [generalIndicators, setGeneralIndicators] = useState([]);
  const [generalIndicatorData, setGeneralIndicatorData] = useState();
  const [currentGeneralIndicator, setCurrentGeneralIndicator] = useState();

  const noGeneralIndicators =
    !generalIndicators || (generalIndicators && generalIndicators.length === 0); //check if no news

  //get indicatorId from show more btn in home page
  //let indicatorId = parseInt(props.location.state.indicatorId);

  const getGeneralIndicators = async () => {
    //fetch generalIndicators data
    const response = await axios
      .get("/PricesData/GetGeneralIndicators")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setGeneralIndicators(response.data); // set generalIndicators data to state
      if (props.location.state == null) {
        if (props.StateRes.LocGeneralIndicator.CuurentGeneralIndicator) {
          getGeneralIndicatorData(
            props.StateRes.LocGeneralIndicator.CuurentGeneralIndicator
          ); // set GeneralIndicatorData on component mount
          setCurrentGeneralIndicator(
            props.StateRes.LocGeneralIndicator.CuurentGeneralIndicator
          );
        } else {
          getGeneralIndicatorData(response.data[0].id); // set GeneralIndicatorData on component mount
          setCurrentGeneralIndicator(response.data[0].id);
        }
      } else {
        getGeneralIndicatorData(parseInt(props.location.state.indicatorId)); // set GeneralIndicatorData on component mount
        setCurrentGeneralIndicator(props.location.state.indicatorId);
      }
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
    props.saveCurrentGeneralIndicator(id);
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
  const crumbs = [
    { text: "الرئيسية", path: "/" },
    { text: "الأسعار المحلية", path: "/local-prices" },
    { text: "المجموعات السلعية", path: "/local-prices" },
  ];

  return (
    <>
      <Container>
        <Breadcrumb crumbs={crumbs} />
        <Row className="mt-4">
          <Col xs={12}>
            <h5 style={{ color: "var(--main-green)" }}>المجموعات السلعية</h5>
          </Col>
        </Row>
      </Container>
      <Container fluid className="my-2 local-prices">
        <Row>
          <Col xs={12} className="my-4 d-flex">
            <Row className="justify-content-center">
              {/* <Slider {...settings}> */}
              {!noGeneralIndicators &&
                generalIndicators.map((Item, idx) => {
                  return (
                    <Col className="my-1" lg={2} sm={3} key={Item.id}>
                      <div
                        className={`p-2 lable ${
                          Item.id === currentGeneralIndicator ? "active" : ""
                        }`}
                        onClick={() => handleGeneralIndicatorSelect(Item.id)}
                      >
                        <h6 className="text-center my-1">{Item.nameA}</h6>
                      </div>
                    </Col>
                  );
                })}
              {/* </Slider> */}
            </Row>
          </Col>
          <Col xs={12}>
            <GeneralIndicatorTabs generalIndicatorData={generalIndicatorData} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    StateRes: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCurrentGeneralIndicator: (res) => {
      dispatch(saveCurrentGeneralIndicator(res));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalPrices);
