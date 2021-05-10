import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";

import { useRouteMatch } from "react-router-dom";

import Const from "../../../assets/images/Const.png";
import Move from "../../../assets/images/Move.png";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import PortPricesResult from "./Port-price-result";

import { axios } from "../../Axios/Axios";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { Tab, Tabs } from "react-bootstrap";
import Breadcrumb from "../../UI/Bread-crumb/Breadcrumb";

const PortItem = (props) => {
  const [PricesResult, setPricesResult] = useState([]);
  let [loading, setLoading] = useState(true);
  const [Ports, setPorts] = useState([]);
  const [Port, setPort] = useState({});
  const [Governorate, setGovernorate] = useState([]);
  const [PortType, setPortType] = useState([]);
  const [PortEntity, setPortEntity] = useState([]);
  const [SelectedGovernorate, setSelectedGovernorate] = useState(
    props.match.params.GovId
  );
  const [SelectedPortType, setSelectedPortType] = useState(
    props.match.params.PortTypeId
  );
  const [SelectedPortEntity, setSelectedPortEntity] = useState(
    props.match.params.PortEntityId
  );
  const [SelectedPort, setSelectedPort] = useState(props.match.params.PortId);
  const getPorts = async () => {
    var portsURL = `Ports/Port?PortEntityId=${SelectedPortEntity}&GovId=${SelectedGovernorate}&PortTypeId=${SelectedPortType}`;
    //setLoading(true);
    //fetch Ports data
    const response = await axios
      .get(portsURL)
      .catch((err) => console.log("Error", err)); //handle errors

    //setLoading(false);
    if (response && response.data) {
      setPorts(response.data);
    }
  };
  const GetPort = async () => {
    const response = await axios
      .get(`Ports/${SelectedPort}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      console.log(response.data);
      setPort(response.data[0]);
    }
  };
  const GetGovernorates = async () => {
    const response = await axios
      .get("Home/Governorate")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setGovernorate(response.data);
    }
  };

  const GetPortEntities = async () => {
    const response = await axios
      .get("Ports/PortEntity")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setPortEntity(response.data);
    }
  };

  const GetPortTypes = async () => {
    const response = await axios
      .get("Ports/PortType")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setPortType(response.data);
    }
  };

  const GovHandleChanges = (event) => {
    setSelectedGovernorate(event.target.value);
  };

  const PortTypeHandleChanges = (event) => {
    setSelectedPortType(event.target.value);
  };

  const PortEntityHandleChanges = (event) => {
    setSelectedPortEntity(event.target.value);
  };
  const PortHandleChanges = (event) => {
    setSelectedPort(event.target.value);
  };

  useEffect(() => {
    GetGovernorates();
    GetPortEntities();
    GetPortTypes();
    getPorts();
  }, []);

  useEffect(() => {
    getPorts();
  }, [SelectedGovernorate, SelectedPortEntity, SelectedPortType]);

  useEffect(() => {
    GetPrices();
    GetPort();
  }, [SelectedPort]);

  const GetPrices = async () => {
    setPricesResult([]);
    var url = `Ports/GetPortDataForEachGeneralIndicator/${SelectedPort}`;
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
    GetPort();
  }, []);

  let { url } = useRouteMatch();
  //get news item id from url
  const portId = parseInt(props.match.params.PortId);

  const crumbs = [
    { text: "الرئيسية", path: "/" },
    { text: "المنافذ", path: `/Ports` },
    { text: "بحث المنافذ", path: `/Ports` },
    { text: "  بحث سلع المنافذ", path: `/Ports/${portId}` },
  ];

  return (
    <Container>
      <Breadcrumb crumbs={crumbs} />
      <div className="row mt-4">
        <div className="col-md-12">
          <h3 style={{ color: "#4A9559" }}> بحث سلع المنافذ</h3>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-3">
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
        </div>
        <div className="col-md-3">
          <TextField
            style={{ width: "100%" }}
            className="px-2 my-2"
            variant="outlined"
            name="GovernorateId"
            select
            label="نوع المنفذ"
            value={SelectedPortType}
            onChange={PortTypeHandleChanges}
          >
            <MenuItem value={0}>نوع المنفذ</MenuItem>
            {PortType.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item.id}>
                  {item.nameA}
                </MenuItem>
              );
            })}
          </TextField>
        </div>
        <div className="col-md-3">
          <TextField
            style={{ width: "100%" }}
            className="px-2 my-2"
            variant="outlined"
            name="GovernorateId"
            select
            label="أختار جهة المنفذ"
            value={SelectedPortEntity}
            onChange={PortEntityHandleChanges}
          >
            <MenuItem value={0}>جهة المنفذ</MenuItem>
            {PortEntity.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item.id}>
                  {item.nameA}
                </MenuItem>
              );
            })}
          </TextField>
        </div>
        <div className="col-md-3">
          <TextField
            style={{ width: "100%" }}
            className="px-2 my-2"
            variant="outlined"
            name="portId"
            select
            label="أختار المنفذ"
            value={SelectedPort}
            onChange={PortHandleChanges}
          >
            <MenuItem value={0}>المنفذ</MenuItem>
            {Ports.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item.id}>
                  {item.nameA}
                </MenuItem>
              );
            })}
          </TextField>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 d-flex">
          <img src={Port.portTypeId == 3 ? Const : Move} />
          <div style={{ marginRight: 20 }}>
            <h5 style={{ fontWeight: "bold" }}>{Port.portEntityName}</h5>
            <p style={{ color: "#818181" }}>{Port.portTypeName}</p>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="d-flex">
            <LocationOnIcon style={{ fontSize: 30, color: "#7BB185" }} />
            <span style={{ color: "#818181" }}>{Port.nameA}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {!loading && PricesResult.length > 0 && (
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
