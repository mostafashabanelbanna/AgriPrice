import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { axios } from "../../../Axios/Axios";

import swal from "sweetalert";
import "./Suggestions-form.css";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SuggestionsForm = () => {
  const validationSchema = yup.object({
    Name: yup.string("أدخل الأسم").required("أدخل الأسم"),
    Email: yup
      .string("أدخل البريد الإلكتروني")
      .email("بريد إلكتروني غير صالح")
      .required("أدخل البريد الإلكتروني"),
    PhoneNumber: yup
      .string("أدخل رقم الهاتف")
      .required("أدخل رقم الهاتف")
      .matches(phoneRegExp, "رقم الهاتف صحيح"),
    SubjectTitle: yup
      .string("أدخل عنوان الموضوع")
      .required("أدخل عنوان الموضوع"),
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
  let contactForm;
  const resetContactForm = () => {
    contactForm.reset();
    // console.log("here");
  };
  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      PhoneNumber: "",
      Subject: "",
      SubjectTitle: "",
      ContactTypeId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await axios
        .post("/ContactUs", values)
        .catch((err) => console.log("Error", err)); //handle errors;
      if (response) {
        // alert("لقد تم الأرسال بنجاح");
        swal({
          title: "",
          text: "تم الإرسال بنجاح, شكرًا لتواصلكم معنا",
          icon: "success",
          button: "موافق",
        });
        formik.values.Name = "";
        formik.values.Email = "";
        formik.values.PhoneNumber = "";
        formik.values.Subject = "";
        formik.values.SubjectTitle = "";
        formik.values.ContactTypeId = "";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
  });

  return (
    <div>
      <form ref={(el) => (contactForm = el)} onSubmit={formik.handleSubmit}>
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
          label="تصنيف الرسالة"
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
          style={{ width: "100%" }}
          className="px-2 my-2"
          variant="outlined"
          id="SubjectTitle"
          name="SubjectTitle"
          label="عنوان الرسالة"
          type="name"
          value={formik.values.SubjectTitle}
          onChange={formik.handleChange}
          error={
            formik.touched.SubjectTitle && Boolean(formik.errors.SubjectTitle)
          }
          helperText={formik.touched.SubjectTitle && formik.errors.SubjectTitle}
        />

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
          >
            إرسال
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SuggestionsForm;
