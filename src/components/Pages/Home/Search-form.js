import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Col, Container, Row } from "react-bootstrap";

import { axios } from "../../Axios/Axios";

import icommodityGroup from "../../../assets/images/png/product.png";
import wheatBag from "../../../assets/images/png/Wheat Bag.png";
import flag from "../../../assets/images/png/flag.png";

const SearchForm = () => {
  //
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Schema for yup
  const validationSchema = yup.object({
    // ContactTypeId: yup.number.required("ContactType is required"),
    commodityGroup: yup
      .string("أختر المجموعة السلعية")
      .required("أختر المجموعة السلعية "),
    commodity: yup.string("أختر السلعة").required("أختر السلعة"),
    city: yup.string("أختر المدينة").required("أختر المدينة"),
  });

  //   const [commodityGroup, setCommodityGroup] = useState([]);

  //   const getCommodityGroup = async () => {
  //     //fetch ContactTypes data
  //     const response = await axios
  //       .get("/commodityGroup")
  //       .catch((err) => console.log("Error", err)); //handle errors
  //     if (response && response.data) {
  //         getCommodityGroup(response.data); // set commodityGroup data to state
  //     }
  //   };

  //   useEffect(() => {
  //     getCommodityGroup();
  //   }, []);
  const formik = useFormik({
    initialValues: {
      commodityGroup: "",
      commodity: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const response = await axios
        // .post("/ContactUs", values)
        .catch((err) => console.log("Error", err)); //handle errors;
      if (response) {
        alert("sucess!");
        console.log(response);
      }
    },
  });

  const [value, setValue] = React.useState("retail");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Row
      className="justify-content-center border-bottom py-5"
      style={{ backgroundColor: "var(--main-gray)" }}
    >
      {console.log(value)}
      <Container className="py-5">
        <Row>
          <Col>
            <form onSubmit={formik.handleSubmit}>
              <RadioGroup
                className="mb-4"
                aria-label="market"
                name="market"
                value={value}
                onChange={handleRadioChange}
                row
              >
                <FormControlLabel
                  value="retail"
                  control={<Radio style={{ color: "var(--main-green)" }} />}
                  label="اسواق التجزئة"
                />
                <FormControlLabel
                  value="wholesale"
                  control={<Radio style={{ color: "var(--main-green)" }} />}
                  label="اسواق الجملة"
                />
              </RadioGroup>
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
                    name="ContactTypeId"
                    id="المجموعة السلعية"
                    select
                    label="المجموعة السلعية"
                    value={formik.values.ContactTypeId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.ContactTypeId &&
                      Boolean(formik.errors.ContactTypeId)
                    }
                    helperText={
                      formik.touched.ContactTypeId &&
                      formik.errors.ContactTypeId
                    }
                  >
                    {/* {contactType.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                        {option.name}
                        </MenuItem>
                    ))} */}
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
                    name="ContactTypeId"
                    id="السلعة"
                    select
                    label="السلعة"
                    value={formik.values.ContactTypeId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.ContactTypeId &&
                      Boolean(formik.errors.ContactTypeId)
                    }
                    helperText={
                      formik.touched.ContactTypeId &&
                      formik.errors.ContactTypeId
                    }
                  >
                    {/* {contactType.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                        {option.name}
                        </MenuItem>
                    ))} */}
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
                    name="ContactTypeId"
                    id="المحافظة"
                    select
                    label="المحافظة"
                    value={formik.values.ContactTypeId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.ContactTypeId &&
                      Boolean(formik.errors.ContactTypeId)
                    }
                    helperText={
                      formik.touched.ContactTypeId &&
                      formik.errors.ContactTypeId
                    }
                  >
                    {/* {contactType.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                        {option.name}
                        </MenuItem>
                    ))} */}
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
                    إرسال
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default SearchForm;
