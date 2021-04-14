import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Select from "react-select";

import { axios } from "../../Axios/Axios";
import MainIndicatorData from "../../Pages/Home/Focus-general-indicator/MainIndicatorData";

import MainIndicatorBox from "./MainIndicatorBox";
import PricesChangesRatio from "./PricesChangesRatio";
import ProducingGovernorates from "./ProducingGovernorates";

import "./MainIndicatorDetails.css";
import SubIndicatorDetails from "./SubIndicatorDetails";

const MainIndicatorDetails = (props) => {
  //get mainIndicator id from url
  const mainIndicatorItemId = parseInt(props.match.params.indicatorId);

  const [mainIndicatorItem, setMainIndicatorItem] = useState({});
  const [mainIndicatorData, setMainIndicatorData] = useState({});
  const [producingGovernorates, setProducingGovernorates] = useState();
  const [subIndicatorDetails, setSubIndicatorDetails] = useState([]);

  const getMainIndicator = async () => {
    //fetch MainIndicator data
    const response = await axios
      .get(`/PricesData/GetMainIndicatorDetails/${mainIndicatorItemId}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setMainIndicatorItem(response.data); // set MainIndicator data to state
    }
  };
  const getMainIndicatorData = async () => {
    const response = await axios
      .get(`/PricesData/GetMainIndicatorData/${mainIndicatorItemId}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setMainIndicatorData(response.data); // set MainIndicatorData data to state
    }
  };

  const getProducingGovernorates = async () => {
    const response = await axios
      .get(`/PricesData/GetProducingGovernorates/${mainIndicatorItemId}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setProducingGovernorates(response.data); // set setProducingGovernorates data to state
    }
  };
  const getSubIndicatorDetails = async () => {
    const response = await axios
      .get(
        `/PricesData/GetSubIndicatorDetailsForMainIndicator/${mainIndicatorItemId}`
      )
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setSubIndicatorDetails(response.data); // set SubIndicatorDetails data to state
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getMainIndicator();
    getMainIndicatorData();
    getProducingGovernorates();
    getSubIndicatorDetails();
  }, []);

  // const groupStyles = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // };
  // const groupBadgeStyles = {
  //   backgroundColor: "#EBECF0",
  //   borderRadius: "2em",
  //   color: "#172B4D",
  //   display: "inline-block",
  //   fontSize: 12,
  //   fontWeight: "normal",
  //   lineHeight: "1",
  //   minWidth: 1,
  //   padding: "0.16666666666667em 0.5em",
  //   textAlign: "center",
  // };

  // const formatGroupLabel = (data) => (
  //   <div style={groupStyles}>
  //     <span>{data.label}</span>
  //     <span style={groupBadgeStyles}>{data.options.length}</span>
  //   </div>
  // );

  return (
    <Container>
      {/* <Row className="my-4">
        <Col xs={12}>
          <Select
            className="selectMainIndicatorsOption"
            defaultValue={colourOptions[1]}
            options={groupedOptions}
            formatGroupLabel={formatGroupLabel}
          />
        </Col>
      </Row> */}
      <MainIndicatorBox mainIndicatorItem={mainIndicatorItem} />
      <Row>
        <Col lg={9}>
          <PricesChangesRatio mainIndicatorItem={mainIndicatorItem} />
          {mainIndicatorData.AvgPrice !== 0 ? (
            <MainIndicatorData mainIndicatorData={mainIndicatorData} />
          ) : null}
          <ProducingGovernorates
            mainIndicatorItem={mainIndicatorItem}
            producingGovernorates={producingGovernorates}
          />
        </Col>
        <Col lg={3} style={{ backgroundColor: "rgb(247 247 247)" }}>
          <SubIndicatorDetails subIndicatorDetails={subIndicatorDetails} />
          {}
        </Col>
      </Row>
    </Container>
  );
};

export default MainIndicatorDetails;
