import React, { useState, useEffect } from "react";
import { axios } from "../../../Axios/Axios";
import { Tab, Tabs } from "react-bootstrap";
import GeneralIndicatorContent from "./GeneralIndicatorContent";
// import AsyncSelect from 'react-select/async';
import Select from "react-select";
import MainIndicatorData from "./MainIndicatorData";
import { Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import FocusedGeneralIndicatorSkeleton from "../../../LoadingSkeleton/FocusedGeneralIndicator";
import ThreePieacesHorizontalSkeleton from "../../../LoadingSkeleton/ThreePieacesHorizontal";

const GeneralIndicatorTabs = () => {
  const [focusedGeneralIndicator, setFocusedGeneralIndicator] = useState([]);
  // const [mainIndicators, setMainIndicators] = useState([]);
  const [mainIndicatorData, setMainIndicatorData] = useState({});
  const [mainIndicatorsOptions, setMainIndicatorsOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});
  const [generalIndicatorId, setGeneralIndicatorId] = useState(1);

  const noFocusedGeneralIndicator =
    !focusedGeneralIndicator ||
    (focusedGeneralIndicator && focusedGeneralIndicator.length === 0); //check if no news

  const getFocusedGeneralIndicator = async () => {
    //fetch FocusedGeneralIndicator data
    const response = await axios
      .get("/PricesData/GetFocusedGeneralIndicatorWithData")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setFocusedGeneralIndicator(response.data); // set FocusedGeneralIndicator data to state
      if (response.data.length > 0)
        getMainIndicators(response.data[0].generalIndicatorId);
    }
  };
  const getMainIndicators = async (id) => {
    const response = await axios
      .get(`/PricesData/GetMainIndicators/${id}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      // setMainIndicators(response.data); // set MainIndicators data to state

      const temp_mainIndicatorsOptions = [];
      response.data.map((item) =>
        temp_mainIndicatorsOptions.push({
          value: item.id,
          label: item.nameA,
        })
      );
      setMainIndicatorsOptions(temp_mainIndicatorsOptions);
      getMainIndicatorData(temp_mainIndicatorsOptions[0]);
      setSelectedValue(temp_mainIndicatorsOptions[0]);
    }
  };

  const getMainIndicatorData = async (obj) => {
    const response = await axios
      .get(`/PricesData/GetMainIndicatorData/${obj.value}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setMainIndicatorData(response.data); // set MainIndicatorData data to state
      setSelectedValue(obj);
    }
  };

  const getGeneralIndicatorId = (id) => {
    setGeneralIndicatorId(id);
  };

  useEffect(() => {
    getFocusedGeneralIndicator();
  }, []);

  const handleTabSelect = async (id) => {
    const response = await axios
      .get(`/PricesData/GetMainIndicators/${id}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      // setMainIndicators(response.data); // set MainIndicators data to state
      getMainIndicators(id);
      getGeneralIndicatorId(id);
    }
  };

  const tabs = () => {
    if (!noFocusedGeneralIndicator) {
      return (
        <>
          <Tabs
            className="mt-4 flex-md-row flex-column"
            id="focusedGeneralIndicator"
            onSelect={(eventKey) => handleTabSelect(eventKey)}
          >
            {focusedGeneralIndicator.map((focusedGeneralIndicatorItem, idx) => {
              return (
                <Tab
                  key={idx}
                  defaultValue
                  eventKey={focusedGeneralIndicatorItem.generalIndicatorId}
                  title={focusedGeneralIndicatorItem.generalIndicatorname}
                  className="py-2 border"
                  style={{
                    backgroundColor: "var(--secondary-gray)",
                  }}
                >
                  <GeneralIndicatorContent
                    focusedGeneralIndicatorData={focusedGeneralIndicatorItem}
                  />
                </Tab>
              );
            })}
          </Tabs>
          {console.log(generalIndicatorId)}
          <Col
            xs={12}
            className="mb-2 my-3 d-flex align-items-center justify-content-between"
          >
            <Link
              to={{
                pathname: `/local-prices`,
              }}
            >
              <span
                style={{
                  color: "var(--main-green)",
                  textDecoration: "underline",
                }}
              >
                إستعراض المزيد من المجموعات السلعية
              </span>
            </Link>
            <Link
              // className="my-3 d-flex align-items-center justify-content-end"
              to={{
                pathname: `/local-prices`,
                state: {
                  indicatorId: generalIndicatorId,
                },
              }}
            >
              <span
                style={{
                  color: "rgb(255, 50, 50)",
                  textDecoration: "underline",
                }}
              >
                إستعراض المزيد من السلع
              </span>
            </Link>
          </Col>
        </>
      );
    } else {
      return <FocusedGeneralIndicatorSkeleton />;
    }
  };

  return (
    <>
      {tabs()}
      {!noFocusedGeneralIndicator && (
        <div className="d-flex justify-content-center">
          <Select
            className="selectMainIndicatorsOption my-4"
            classNamePrefix="select"
            defaultValue={selectedValue.value}
            value={selectedValue.value}
            isDisabled={false}
            isLoading={false}
            isClearable={true}
            isRtl={false}
            isSearchable={true}
            options={mainIndicatorsOptions}
            placeholder={selectedValue.label}
            onChange={(event) => getMainIndicatorData(event)}
          />
        </div>
      )}
      {!noFocusedGeneralIndicator && mainIndicatorData.AvgPrice !== 0 ? (
        <MainIndicatorData mainIndicatorData={mainIndicatorData} />
      ) : null}
      {noFocusedGeneralIndicator && <ThreePieacesHorizontalSkeleton />}
    </>
  );
};

export default GeneralIndicatorTabs;
