import React, { useState, useEffect } from "react";
import { axios } from "../../../Axios/Axios";
import { Tab, Tabs } from "react-bootstrap";
import GeneralIndicatorContent from "./GeneralIndicatorContent";
// import AsyncSelect from 'react-select/async';
import Select from "react-select";
import MainIndicatorData from "./MainIndicatorData";

const GeneralIndicatorTabs = () => {
  const [focusedGeneralIndicator, setFocusedGeneralIndicator] = useState([]);
  // const [mainIndicators, setMainIndicators] = useState([]);
  const [mainIndicatorData, setMainIndicatorData] = useState({});
  const [mainIndicatorsOptions, setMainIndicatorsOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});

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
      console.log(response.data);
      setMainIndicatorData(response.data); // set MainIndicatorData data to state
      setSelectedValue(obj);
    }
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
    }
  };

  const tabs = () => {
    if (!noFocusedGeneralIndicator) {
      return (
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
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {tabs()}
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
      {mainIndicatorData.AvgPrice !== 0 ? (
        <MainIndicatorData mainIndicatorData={mainIndicatorData} />
      ) : null}
    </>
  );
};

export default GeneralIndicatorTabs;
