import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { axios } from "../../Axios/Axios";

const ContactUs = () => {
  // RegEx for phone number validation
  // const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  // Schema for yup
  const validationSchema = yup.object({
    // ContactTypeId: yup.number.required("ContactType is required"),
    Name: yup.string("Enter your name").required("name is required"),
    Email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    PhoneNumber: yup
      .string("Enter your phone number")
      .required("phone number is required"),
    Subject: yup
      .string("Enter subject")
      .min(8, "subject should be of minimum 8 characters length")
      .required("subject is required"),
  });

  const [contactType, setContactType] = useState([]);

  const getContactType = async () => {
    //fetch ContactTypes data
    const response = await axios
      .get("/ContactUs/ContactType")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setContactType(response.data); // set ContactTypes data to state
    }
  };

  useEffect(() => {
    getContactType();
  }, []);
  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      PhoneNumber: "",
      Subject: "",
      ContactTypeId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const response = await axios
        .post("/ContactUs", values)
        .catch((err) => console.log("Error", err)); //handle errors;
      if (response) {
        alert("sucess!");
        console.log(response);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="ContactTypeId"
          id="ContactTypeId"
          select
          label="ContactTypeId"
          value={formik.values.ContactTypeId}
          onChange={formik.handleChange}
          error={
            formik.touched.ContactTypeId && Boolean(formik.errors.ContactTypeId)
          }
          helperText={
            formik.touched.ContactTypeId && formik.errors.ContactTypeId
          }
        >
          {contactType.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          id="Name"
          name="Name"
          label="الاسم"
          value={formik.values.Name}
          onChange={formik.handleChange}
          error={formik.touched.Name && Boolean(formik.errors.Name)}
          helperText={formik.touched.Name && formik.errors.Name}
        />
        <TextField
          fullWidth
          id="PhoneNumber"
          name="PhoneNumber"
          label="PhoneNumber"
          type="PhoneNumber"
          value={formik.values.PhoneNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)
          }
          helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
        />
        <TextField
          fullWidth
          id="Email"
          name="Email"
          label="Email"
          type="Email"
          value={formik.values.Email}
          onChange={formik.handleChange}
          error={formik.touched.Email && Boolean(formik.errors.Email)}
          helperText={formik.touched.Email && formik.errors.Email}
        />
        <TextField
          fullWidth
          id="Subject"
          name="Subject"
          label="Subject"
          type="Subject"
          value={formik.values.Subject}
          onChange={formik.handleChange}
          error={formik.touched.Subject && Boolean(formik.errors.Subject)}
          helperText={formik.touched.Subject && formik.errors.Subject}
        />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactUs;
