import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FlagIcon from "@material-ui/icons/Flag";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import icommodityGroup from "../../../assets/images/png/product.png";
import wheatBag from "../../../assets/images/png/Wheat Bag.png";
import flag from "../../../assets/images/png/flag.png";
import { MenuItem } from "@material-ui/core";
import PortPricesResult from "./Port-price-result";
import PulseLoader from "react-spinners/PulseLoader";

import { axios } from "../../Axios/Axios";

const PortItem = (props) => {
  //get data from Link state
  const portItemLinkState = props.location.state
    ? props.location.state.PortItem
    : undefined;
  //get news item id from url
  const portItemId = parseInt(props.match.params.PortId);

  //   //get port item id from url
  //   const portItemId = parseInt(props.match.params.portId);
  //   //
  //   const [portItem, setPortItem] = useState({});

  //   const getPorts = async () => {
  //     let url = `/Ports/PortEntity`;
  //     //fetch news data
  //     const response = await axios
  //       .get(url)
  //       .catch((err) => console.log("Error", err)); //handle errors
  //     if (response && response.data) {
  //       response.data.map((portItem) => {
  //         if (portItem.id === portItemId) {
  //           setPortItem(portItem);
  //         }
  //       });
  //     }
  //   };

  //   useEffect(() => {
  //     getPorts();
  //   }, []);
  //   console.log(portItem);

  /////Port Prices

  const [genralIndicators, setGenralIndicators] = useState([]);
  const [SubIndicatorId, setSubIndicator] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  let [loading, setLoading] = useState(false);
  const [fetched, setFeched] = useState(true);

  const noSearchResult =
    !searchResult || (searchResult && searchResult.length === 0); //check if no searchResult

  const getPopulate = async () => {
    const response = await axios
      .get("/home/PopulateDropDowns")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setGenralIndicators(response.data.genralIndicators);
    }
  };

  const getSubindicator = async (id) => {
    const response = await axios
      .get(`/home/SubIndicator/${id}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setSubIndicator(response.data);
      console.log(response.data);
    }
  };

  const getAllPrices = async () => {
    setLoading(true);
    setSearchResult([]);
    const response = await axios
      .post(
        "/prices/port",
        JSON.stringify(
          {
            Id: portItemId,
            GeneralIndicatorId: 0,
            SubIndicatorId: 0,
          },
          null,
          2
        )
      )
      .catch((err) => console.log("Error", err)); //handle errors;
    if (response) {
      // alert("sucess!");
      console.log(response);
      setLoading(false);
      setSearchResult(response.data);
      if (response.data.length > 0) {
        setFeched(true);
      } else {
        setFeched(false);
      }
    }
  };

  useEffect(() => {
    getPopulate();
  }, [searchResult]);

  useEffect(() => {
    getAllPrices();
  }, []);

  const handleGenralIndicatorsChange = (e) => {
    getSubindicator(e.target.value);
  };

  // Schema for yup
  const validationSchema = yup.object({
    // GeneralIndicatorId: yup.mixed().notOneOf([0], "أختر المجموعة السلعية"),
  });

  const formik = useFormik({
    initialValues: {
      Id: portItemId,
      GeneralIndicatorId: 0,
      SubIndicatorId: 0,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      setLoading(true);
      setSearchResult([]);

      const response = await axios
        .post("/prices/port", JSON.stringify(values, null, 2))
        .catch((err) => console.log("Error", err)); //handle errors;
      if (response) {
        // alert("sucess!");
        console.log(response);
        setLoading(false);
        setSearchResult(response.data);
        if (response.data.length > 0) {
          setFeched(true);
        } else {
          setFeched(false);
        }
        //console.log(response);
      }
    },
  });

  return (
    <Container fluid>
      {/* {console.log(portItemId)} */}
      <Row
        className="justify-content-center border-bottom py-5"
        style={{ backgroundColor: "var(--main-gray)" }}
      >
        <Col>
          <h3 style={{ color: "var(--main-green)" }}>
            {portItemLinkState.nameA}
          </h3>
          <p>
            <FlagIcon style={{ fontSize: 30, color: "#80B741" }} />
            {portItemLinkState.governorateName}
          </p>
          <div style={{ paddingRight: 30 }}>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col className="px-0">
                  <img
                    className="p-1"
                    src={icommodityGroup}
                    alt="icon_1"
                    style={{
                      borderRadius: "6px",
                      boxShadow: "10px 10px 5px 0px rgba(179, 179, 179, 0.36)",
                    }}
                  />

                  <TextField
                    style={{ width: "200px" }}
                    className="px-2 my-2"
                    variant="outlined"
                    name="GeneralIndicatorId"
                    id="المجموعة السلعية"
                    select
                    label="المجموعة السلعية"
                    value={formik.values.GeneralIndicatorId}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleGenralIndicatorsChange(e);
                    }}
                    error={
                      formik.touched.GeneralIndicatorId &&
                      Boolean(formik.errors.GeneralIndicatorId)
                    }
                    helperText={
                      formik.touched.GeneralIndicatorId &&
                      formik.errors.GeneralIndicatorId
                    }
                  >
                    <MenuItem value={0}>المجموعة السلعية</MenuItem>
                    {genralIndicators.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>
                <Col className="px-0">
                  <img
                    className="p-1"
                    src={wheatBag}
                    alt="icon_1"
                    style={{
                      borderRadius: "6px",
                      boxShadow: "10px 10px 5px 0px rgba(179, 179, 179, 0.36)",
                    }}
                  />
                  <TextField
                    style={{ width: "200px" }}
                    className="px-2 my-2"
                    variant="outlined"
                    name="SubIndicatorId"
                    id="السلعة"
                    select
                    label="السلعة"
                    value={formik.values.SubIndicatorId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.SubIndicatorId &&
                      Boolean(formik.errors.SubIndicatorId)
                    }
                    helperText={
                      formik.touched.SubIndicatorId &&
                      formik.errors.SubIndicatorId
                    }
                  >
                    <MenuItem value={0}>السلعة</MenuItem>
                    {SubIndicatorId.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>

                <Col>
                  <Button
                    className="p-3 my-2 "
                    size="large"
                    variant="contained"
                    type="submit"
                    style={{
                      color: "#fff",
                      backgroundColor: "var(--main-green)",
                      width: "200px",
                    }}
                  >
                    بحث
                  </Button>
                </Col>
              </Row>
            </form>
            {!noSearchResult && <PortPricesResult resultData={searchResult} />}
            {loading === true && noSearchResult ? (
              <div className="w-100 d-flex justify-content-center m-5">
                <PulseLoader loading={loading} color="#0D924C" margin="5" />
              </div>
            ) : null}
            {!fetched && loading == false && (
              <h2 className="w-100 text-center p-4"> لا توجد نتائج</h2>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PortItem;
