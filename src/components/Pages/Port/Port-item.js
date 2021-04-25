import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";

import { useRouteMatch } from "react-router-dom";

import Const from "../../../assets/images/Const.png";
import Move from "../../../assets/images/Move.png";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import PortPricesResult from "./Port-price-result";

import { axios } from "../../Axios/Axios";

import { Tab, Tabs } from "react-bootstrap";
import Breadcrumb from "../../UI/Bread-crumb/Breadcrumb";

const PortItem = (props) => {
  const [PricesResult, setPricesResult] = useState([]);
  let [loading, setLoading] = useState(true);

  const GetPrices = async () => {
    var url = `Ports/GetPortDataForEachGeneralIndicator/${props.location.state.PortItem.id}`;
    setLoading(true);
    const response = await axios
      .get(url)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setLoading(false);
      setPricesResult(response.data);
    }
  };

  useEffect(() => {
    GetPrices();
  }, []);

  let { url } = useRouteMatch();
  //get news item id from url
  const portId = parseInt(props.match.params.PortId);

  const crumbs = [
    { text: "الرئيسية", path: "/" },
    { text: "المنافذ", path: `/Ports` },
    { text: "أسعار التجزئة داخل المنفذ", path: `/Ports/${portId}` },
  ];

  return (
    <Container>
      <Breadcrumb crumbs={crumbs} />
      <div className="row mt-4">
        <div className="col-md-12">
          <h3 style={{ color: "#4A9559" }}>متوسط أسعار السلع داخل المنفذ</h3>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 d-flex">
          <img
            src={props.location.state.PortItem.portTypeId == 3 ? Const : Move}
          />
          <div style={{ marginRight: 20 }}>
            <h5 style={{ fontWeight: "bold" }}>
              {props.location.state.PortItem.portEntityName}
            </h5>
            <p style={{ color: "#818181" }}>
              {props.location.state.PortItem.portTypeName}
            </p>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="d-flex">
            <LocationOnIcon style={{ fontSize: 30, color: "#7BB185" }} />
            <span style={{ color: "#818181" }}>
              {props.location.state.PortItem.nameA}
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {PricesResult.length > 0 && (
            <Tabs className="mt-4 flex-md-row flex-column" id="PortsData">
              {PricesResult.map((Item, idx) => {
                return (
                  <Tab
                    key={idx}
                    defaultValue
                    eventKey={Item.generalIndicatorId}
                    title={Item.generalIndicator}
                    className="py-2 border"
                    style={{
                      backgroundColor: "var(--secondary-gray)",
                    }}
                  >
                    <PortPricesResult PortsIndicatorData={Item} />
                  </Tab>
                );
              })}
            </Tabs>
          )}
          {loading === true && PricesResult.length <= 0 && (
            <div className="w-100 d-flex justify-content-center m-5">
              <PulseLoader loading={loading} color="#0D924C" margin="5" />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PortItem;
