import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Col, Container, Row } from "react-bootstrap";

import { useFormik } from "formik";
import * as yup from "yup";

import { axios } from "../Axios/Axios";

import icommodityGroup from "../../assets/images/png/product.png";
import wheatBag from "../../assets/images/png/Wheat Bag.png";
import flag from "../../assets/images/png/flag.png";
import { MenuItem } from "@material-ui/core";
import GlobalPricesResult from "./Global-Prices-result";
import PulseLoader from "react-spinners/PulseLoader";

// import "./LocalPrices.css";

const GlobalPrices = () => {
  const [genralIndicators, setGenralIndicators] = useState([]);
  const [exchange, setExchange] = useState([]);
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

  const getExchange = async (id) => {
    const response = await axios
      .get(`/home/Exchanges`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setExchange(response.data);
    }
  };

  useEffect(() => {
    getPopulate();
  }, [searchResult]);

  const handleGenralIndicatorsChange = (e) => {
    getExchange(e.target.value);
  };

  // Schema for yup
  const validationSchema = yup.object({
    GeneralIndicatorId: yup.mixed().notOneOf([0], "أختر المجموعة السلعية"),
  });

  const formik = useFormik({
    initialValues: {
      GeneralIndicatorId: 0,
      ExchangeId: 0,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(JSON.stringify(values, null, 2));
      setLoading(true);
      setSearchResult([]);

      const response = await axios
        .post("/Prices/International", JSON.stringify(values, null, 2))
        .catch((err) => console.log("Error", err)); //handle errors;
      if (response) {
        alert("sucess!");
        setLoading(false);
        setSearchResult(response.data);
        if (response.data.length > 0) {
          setFeched(true);
        } else {
          setFeched(false);
        }
        console.log(response);
      }
    },
  });
  return (
    <Container fluid>
      <Row
        className="justify-content-center border-bottom py-5"
        style={{ backgroundColor: "var(--main-gray)" }}
      >
        <Col>
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
                  name="ExchangeId"
                  id="البورصة"
                  select
                  label="البورصة"
                  value={formik.values.ExchangeId}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.exchange && Boolean(formik.errors.exchange)
                  }
                  helperText={formik.touched.Exchange && formik.errors.exchange}
                >
                  <MenuItem value={0}>البورصة</MenuItem>
                  {exchange.map((option) => (
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
              <Col></Col>
            </Row>
          </form>
        </Col>
      </Row>
      {!noSearchResult && <GlobalPricesResult resultData={searchResult} />}
      {loading === true && noSearchResult ? (
        <div className="w-100 d-flex justify-content-center m-5">
          <PulseLoader loading={loading} color="#0D924C" margin="5" />
        </div>
      ) : null}
      {!fetched && loading == false && (
        <h2 className="w-100 text-center p-4"> لا توجد نتائج</h2>
      )}
    </Container>
  );
};

export default GlobalPrices;
