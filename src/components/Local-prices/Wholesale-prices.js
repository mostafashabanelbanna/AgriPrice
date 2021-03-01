import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Col, Container, Row } from "react-bootstrap";

import { useFormik } from "formik";
import * as yup from "yup";

import { axios } from "../Axios/Axios";
import PulseLoader from "react-spinners/PulseLoader";

import icommodityGroup from "../../assets/images/png/product.png";
import wheatBag from "../../assets/images/png/Wheat Bag.png";
import flag from "../../assets/images/png/flag.png";
import { MenuItem } from "@material-ui/core";
import WholesalePricesResult from "./WholesalePrices-Result";

const WholesalePrices = () => {
  const [genralIndicators, setGenralIndicators] = useState([]);
  const [Market, setMarket] = useState([]);
  const [subIndicator, setSubIndicator] = useState([]);
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
      setMarket(response.data.wholesaleMarket);
    }
  };

  const getSubindicator = async (id) => {
    //setLoading(!loading);
    const response = await axios
      .get(`/home/SubIndicator/${id}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      //setLoading(!loading);
      setSubIndicator(response.data);
    }
  };

  useEffect(() => {
    getPopulate();
  }, []);

  const handleGenralIndicatorsChange = (e) => {
    getSubindicator(e.target.value);
  };

  const validationSchema = yup.object({
    GeneralIndicatorId: yup.mixed().notOneOf([0], "أختر المجموعة السلعية"),
    MarketId: yup.mixed().notOneOf([0], "أختر السوق "),
  });

  const formik = useFormik({
    initialValues: {
      GeneralIndicatorId: 0,
      SubIndicatorId: 0,
      MarketId: 0,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      setSearchResult([]);
      //alert(JSON.stringify(values, null, 2));
      const response = await axios
        .post("/Prices/Wholesale", JSON.stringify(values, null, 2))
        .catch((err) => console.log("Error", err)); //handle errors;
      if (response) {
        //alert("sucess!");
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
                formik.touched.SubIndicator &&
                Boolean(formik.errors.SubIndicator)
              }
              helperText={
                formik.touched.subIndicator && formik.errors.subIndicator
              }
            >
              <MenuItem value={0}>السلعة</MenuItem>
              {subIndicator.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Col>
          <Col className="px-0">
            <img
              className="p-1"
              src={flag}
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
              name="MarketId"
              id="Market"
              select
              label="السوق"
              value={formik.values.MarketId}
              onChange={formik.handleChange}
              error={formik.touched.MarketId && Boolean(formik.errors.MarketId)}
              helperText={formik.touched.MarketId && formik.errors.MarketId}
            >
              <MenuItem value={0}>السوق</MenuItem>
              {Market.map((option) => (
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
      {!noSearchResult && fetched && (
        <WholesalePricesResult resultData={searchResult} />
      )}
      {loading === true && noSearchResult ? (
        <div className="w-100 d-flex justify-content-center m-5">
          <PulseLoader loading={loading} color="#0D924C" margin="5" />
        </div>
      ) : null}
      {!fetched && loading == false && (
        <h2 className="w-100 text-center p-4"> لا توجد نتائج</h2>
      )}
    </div>
  );
};

export default WholesalePrices;
