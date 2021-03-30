import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

import { Col, Container, Row } from "react-bootstrap";

import { useFormik } from "formik";
import * as yup from "yup";

import { axios } from "../Axios/Axios";

import icommodityGroup from "../../assets/images/png/product.png";
import wheatBag from "../../assets/images/png/Wheat Bag.png";
import flag from "../../assets/images/png/flag.png";
import { MenuItem } from "@material-ui/core";
import RetailPricesResult from "./RetailPrices-result";
import PulseLoader from "react-spinners/PulseLoader";
import { saveSearchRes } from "../../store/actions/locSearchRes";

const RetailPrices = (props) => {
  const [genralIndicators, setGenralIndicators] = useState([]);
  const [governorates, setGovernorate] = useState([]);
  const [subIndicator, setSubIndicator] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [SelectedGov, setSelectedGov] = useState(0);
  let [loading, setLoading] = useState(false);
  const [fetched, setFeched] = useState(true);

  const searchData = props.savedSearchRes.LocSearchRes.searchData;

  const noSearchResult = !searchData || (searchData && searchData.length === 0); //check if no searchResult

  const getPopulate = async () => {
    const response = await axios
      .get("/home/PopulateDropDowns")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setGenralIndicators(response.data.genralIndicators);
      setGovernorate(response.data.governorates);
    }
  };

  const getSubindicator = async (id) => {
    const response = await axios
      .get(`/home/SubIndicator/${id}`)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setSubIndicator(response.data);
    }
  };

  useEffect(() => {
    //getPopulate();
    props.saveRes(searchResult);
  }, [searchResult]);

  useEffect(() => {
    getPopulate();
    console.log(props.savedSearchRes.LocSearchRes.searchData);
    setSearchResult(props.savedSearchRes.LocSearchRes.searchData);
  }, []);

  const handleGenralIndicatorsChange = (e) => {
    getSubindicator(e.target.value);
  };

  // Schema for yup
  const validationSchema = yup.object({
    GeneralIndicatorId: yup.mixed().notOneOf([0], "أختر المجموعة السلعية"),
  });

  const formik = useFormik({
    initialValues: {
      GeneralIndicatorId: 0,
      GovernorateId: 0,
      subIndicatorId: 0,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      //alert(JSON.stringify(values, null, 2));
      setSelectedGov(values.GovernorateId);
      setLoading(true);
      setSearchResult([]);
      props.saveRes(searchResult);

      const response = await axios
        .post("/Prices/Retail", JSON.stringify(values, null, 2))
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
      {console.log(props)}
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
              name="subIndicatorId"
              id="السلعة"
              select
              label="السلعة"
              value={formik.values.subIndicatorId}
              onChange={formik.handleChange}
              error={
                formik.touched.subIndicator &&
                Boolean(formik.errors.subIndicator)
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
              name="GovernorateId"
              id="المحافظة"
              select
              label="المحافظة"
              value={formik.values.GovernorateId}
              onChange={formik.handleChange}
              error={
                formik.touched.governorates &&
                Boolean(formik.errors.governorates)
              }
              helperText={
                formik.touched.governorates && formik.errors.governorates
              }
            >
              <MenuItem value={0}>المحافظة</MenuItem>
              {governorates.map((option) => (
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
      {!noSearchResult && (
        <RetailPricesResult GovId={SelectedGov} resultData={searchData} />
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

const mapStateToProps = (state) => {
  return {
    savedSearchRes: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveRes: (res) => {
      dispatch(saveSearchRes(res));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RetailPrices);
