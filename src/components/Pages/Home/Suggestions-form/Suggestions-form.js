import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { axios } from "../../../Axios/Axios";

const SuggestionsForm = () => {
  // RegEx for phone number validation
  // const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  // Schema for yup
  const validationSchema = yup.object({
    Name: yup.string("أدخل الأسم").required("أدخل الأسم"),
    Email: yup
      .string("أدخل البريد الإلكتروني")
      .email("بريد إلكتروني غير صالح")
      .required("أدخل البريد الإلكتروني"),
    PhoneNumber: yup.string("أدخل رقم الهاتف").required("أدخل رقم الهاتف"),
    Subject: yup
      .string("أدخل الموضوع")
      .min(8, "الموضوع يجب ان يتكون من 8 حروف على الأقل")
      .required("أدخل الموضوع"),
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
        const response = await axios
        .post("/ContactUs", values)
        .catch((err) => console.log("Error", err)); //handle errors;
      if (response) {
        alert("لقد تم الأرسال بنجاح");
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          style={{ width: "100%" }}
          className="px-2 my-2"
          variant="outlined"
          id="Name"
          name="Name"
          label="الاسم"
          value={formik.values.Name}
          onChange={formik.handleChange}
          error={formik.touched.Name && Boolean(formik.errors.Name)}
          helperText={formik.touched.Name && formik.errors.Name}
        />
        <TextField
          style={{ width: "100%" }}
          className="px-2 my-2"
          variant="outlined"
          id="Email"
          name="Email"
          label="البريد الإلكتروني"
          type="Email"
          value={formik.values.Email}
          onChange={formik.handleChange}
          error={formik.touched.Email && Boolean(formik.errors.Email)}
          helperText={formik.touched.Email && formik.errors.Email}
        />

        <TextField
          style={{ width: "100%" }}
          className="px-2 my-2"
          variant="outlined"
          id="PhoneNumber"
          name="PhoneNumber"
          label="رقم الهاتف"
          type="PhoneNumber"
          value={formik.values.PhoneNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)
          }
          helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
        />

        <TextField
          style={{ width: "100%" }}
          className="px-2 my-2"
          variant="outlined"
          name="ContactTypeId"
          id="ContactTypeId"
          select
          label="الموضوع"
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
          className="px-2 my-2"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          id="Subject"
          name="Subject"
          label="الرسالة"
          type="Subject"
          value={formik.values.Subject}
          onChange={formik.handleChange}
          error={formik.touched.Subject && Boolean(formik.errors.Subject)}
          helperText={formik.touched.Subject && formik.errors.Subject}
        />
        <div className="px-2 my-2 d-flex justify-content-end">
          <Button
            className="px-4 "
            variant="outlined"
            color="secondary"
            type="submit"
            // style={{ color: "#fff", backgroundColor: "var(--main-green)" }}
          >
            إرسال
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SuggestionsForm;
