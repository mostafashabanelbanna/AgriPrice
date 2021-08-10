import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "react-bootstrap";
import { axios } from "../Axios/Axios";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import "./LocalPrices.css";
import { SampleNextArrow, SamplePrevArrow } from "../slick-carousel/Arrows";
import GeneralIndicatorTabs from "./General-indicator-tabs";
import Breadcrumb from "../UI/Bread-crumb/Breadcrumb";
import { saveCurrentGeneralIndicator } from "../../store/actions/CurrentGeneralIndicator";
import { connect } from "react-redux";

const LocalPrices = (props) => {
  const [Governorate, setGovernorate] = useState([]);
  const [SelectedGovernorate, setSelectedGovernorate] = useState();

  const [generalIndicators, setGeneralIndicators] = useState([]);
  const [generalIndicatorData, setGeneralIndicatorData] = useState();
  const [currentGeneralIndicator, setCurrentGeneralIndicator] = useState();

  const noGeneralIndicators =
    !generalIndicators || (generalIndicators && generalIndicators.length === 0); //check if no news

  //get indicatorId from show more btn in home page
  //let indicatorId = parseInt(props.location.state.indicatorId);
  const GetGovernorates = async () => {
    const response = await axios
      .get("Home/Governorate")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setGovernorate(response.data);
      console.log(response);
    }
  };
  const GovHandleChanges = (event) => {
    setSelectedGovernorate(event.target.value);
  };

  const getGeneralIndicators = async () => {
    //fetch generalIndicators data
    const response = await axios
      .get("/PricesData/GetLocalGeneralIndicators")
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
  const getGeneralIndicatorGovernorateData = async (id) => {
    var generalIndicatorURL = `pricesdata/GetGovernorateAllData?GeneralIndicatorId=${id}&GovernorateID=${SelectedGovernorate}`;
    console.log("getGeneralIndicatorGovernorateData", id);
    const response = await axios
      .get(generalIndicatorURL)
      .catch((err) => console.log("Error", err)); //handle errors;
    if (response && response.data) {
      console.log(response.data);
      setGeneralIndicatorData(response.data); // set FocusedGeneralIndicator data to state
      setCurrentGeneralIndicator(id);
    }
  };
  const handleGeneralIndicatorSelect = (id) => {
    getGeneralIndicatorData(id); // set GeneralIndicatorData on select lable
    getGeneralIndicatorGovernorateData(id);
    setCurrentGeneralIndicator(id);
    props.saveCurrentGeneralIndicator(id);
  };
  useEffect(() => {
    getGeneralIndicators();
    GetGovernorates();
  }, []);

  useEffect(() => {
    if (SelectedGovernorate !== 0) {
      getGeneralIndicatorGovernorateData(currentGeneralIndicator);
    } else {
      //
      getGeneralIndicators();
      //
    }
  }, [SelectedGovernorate]);

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
      {console.log(generalIndicatorData)}
      <Container>
        <Breadcrumb crumbs={crumbs} />
        <Row className="mt-4">
          <Col xs={12}>
            <h5 style={{ color: "var(--main-green)" }}>المجموعات السلعية</h5>
          </Col>
          <Col xs={12}>
            <TextField
              style={{ width: "100%" }}
              className="px-2 my-2"
              variant="outlined"
              name="GovernorateId"
              select
              label="المحافظة"
              value={SelectedGovernorate}
              onChange={GovHandleChanges}
            >
              <MenuItem value={0}>المحافظة</MenuItem>
              {Governorate.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item.id}>
                    {item.nameA}
                  </MenuItem>
                );
              })}
            </TextField>
          </Col>
        </Row>
      </Container>
      <Container className="my-2 local-prices">
        <Row className="justify-content-center">
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
