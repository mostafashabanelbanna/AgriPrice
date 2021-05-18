import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Select from "react-select";

import { axios } from "../../Axios/Axios";
import MainIndicatorData from "../../Pages/Home/Focus-general-indicator/MainIndicatorData";

import MainIndicatorBox from "./MainIndicatorBox";
import PricesChangesRatio from "./PricesChangesRatio";
import ProducingGovernorates from "./ProducingGovernorates";
import Chart from "./Chart";
import "./MainIndicatorDetails.css";
import SubIndicatorDetails from "./SubIndicatorDetails";
import Breadcrumb from "../../UI/Bread-crumb/Breadcrumb";

const MainIndicatorDetails = (props) => {
  //get mainIndicator id from url
  //const mainIndicatorItemId = parseInt(props.match.params.indicatorId);

  const [mainIndicatorItem, setMainIndicatorItem] = useState({});
  const [mainIndicatorData, setMainIndicatorData] = useState({});
  const [producingGovernorates, setProducingGovernorates] = useState();
  const [subIndicatorDetails, setSubIndicatorDetails] = useState([]);
  const [mainIndicatorOptions, setMainIndicatorOptions] = useState([]);
  const [mainIndicatorItemId, setMainIndicatorItemId] = useState(
    parseInt(props.match.params.indicatorId)
  );
  const [mainIndicatorChart, setMainIndicatorChart] = useState([]);

  const getMainIndicator = async () => {
    //fetch MainIndicator data
    const response = await axios
      .get(
        `/PricesData/GetMainIndicatorDetails?MainIndicatorId=${mainIndicatorItemId}&classification=${props.location.state.classification}`
      )
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

  const GetMainIndicatorChart = async () => {
    const response = await axios
      .get(`/PricesData/GetMainIndicatorDetailsChart/${mainIndicatorItemId}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setMainIndicatorChart(response.data); // set SubIndicatorDetails data to state
    }
  };

  useEffect(() => {
    getMainIndicator();
    getMainIndicatorData();
    getProducingGovernorates();
    getSubIndicatorDetails();
    getMainIndicatorOptions();
    GetMainIndicatorChart();
  }, [mainIndicatorItemId]);

  const HandleMainIndicatorchange = (obj) => {
    setMainIndicatorItemId(obj.value);
  };

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const getMainIndicatorOptions = async () => {
    const response = await axios
      .get(`/PricesData/GetMainIndicatorsPerGeneralIndicator`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      const temp_mainIndicatorsOptions = [];
      response.data.map((item) => {
        var Temp_Options = [];
        for (var i = 0; i < item.mainIndicators.length; i++) {
          Temp_Options.push({
            value: item.mainIndicators[i].id,
            label: item.mainIndicators[i].name,
          });
        }
        temp_mainIndicatorsOptions.push({
          label: item.generalIndicator,
          options: Temp_Options,
        });

        setMainIndicatorOptions(temp_mainIndicatorsOptions); // set MainIndicatorOptions  to state
      });
    }
  };
  // props.location.state.source
  // let path = props.location.state.source
  //   ? { text: "", path: "" }
  //   : { text: "المجموعات السلعية", path: "/local-prices" };
  const crumbs = [
    { text: "الرئيسية", path: "/" },
    { text: "الأسعار المحلية", path: `/local-prices/${mainIndicatorItemId}` },
    { text: "المجموعات السلعية", path: "/local-prices" },
    // path,
    { text: "بحث السلع", path: `/local-prices/${mainIndicatorItemId}` },
  ];

  return (
    <Container>
      <Breadcrumb crumbs={crumbs} />
      <Row className="my-4">
        <Row className="mt-4">
          <Col xs={12}>
            <h5 style={{ color: "var(--main-green)" }}>المجموعات السلعية</h5>
          </Col>
        </Row>
        <Col xs={12}>
          <Select
            className="selectMainIndicatorsOption"
            // defaultValue={colourOptions[1]}
            options={mainIndicatorOptions}
            formatGroupLabel={formatGroupLabel}
            onChange={(event) => HandleMainIndicatorchange(event)}
            placeholder={mainIndicatorItem.mainIndicator}
          />
        </Col>
      </Row>
      <MainIndicatorBox
        mainIndicatorItem={mainIndicatorItem}
        mainIndicatorItemId={mainIndicatorItemId}
      />
      <Row>
        <Col lg={9}>
          <PricesChangesRatio mainIndicatorItem={mainIndicatorItem} />
          {mainIndicatorData.AvgPrice !== 0 ? (
            <MainIndicatorData
              DetailsPage={true}
              mainIndicatorData={mainIndicatorData}
            />
          ) : null}

          <Chart mainIndicatorChart={mainIndicatorChart} />
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
