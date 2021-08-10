import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { axios } from "../../Axios/Axios";

import swal from "sweetalert";
import { Col, Container, Row } from "react-bootstrap";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const Registeration = () => {
  const validationSchema = yup.object({
    FirstName: yup.string("أدخل الاسم الأول").required("أدخل الاسم الأول"),
    LastName: yup.string("أدخل الاسم الأخير").required("أدخل الاسم الأخير"),
    Email: yup
      .string("أدخل البريد الإلكتروني")
      .email("بريد إلكتروني غير صالح")
      .required("أدخل البريد الإلكتروني"),
    PhoneNumber: yup
      .string("أدخل رقم الهاتف")
      .required("أدخل رقم الهاتف")
      .matches(phoneRegExp, "رقم الهاتف صحيح"),
    Password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        // "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        "استخدام 8 أحرف أو أكثر باستعمال مزيج من الأحرف والأحرف الكبيرة  والأرقام والرموز"
      ),
    ConfirmPassword: yup
      .string()
      .required("يجب تأكيد كلمة المرور")
      .when("Password", {
        is: (Password) => (Password && Password.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref("Password")],
            "لا تتطابق كلمتا المرور اللتان تم إدخالهما. يُرجى إعادة المحاولة."
          ),
      }),
  });

  let contactForm;
  const resetContactForm = () => {
    contactForm.reset();
    console.log("here");
  };
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Password: "",
      ConfirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await axios
        .post("/Identity/Register", values)
        .catch((err) => console.log("Error", err)); //handle errors;
      if (response) {
        swal({
          title: "",
          text: "تم الإرسال بنجاح, شكرًا لتواصلكم معنا",
          icon: "success",
          button: "موافق",
        });
        formik.values.FirstName = "";
        formik.values.LastName = "";
        formik.values.Email = "";
        formik.values.Password = "";
        formik.values.PhoneNumber = "";
        console.log("registeration done!");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
  });

  return (
    <form ref={(el) => (contactForm = el)} onSubmit={formik.handleSubmit}>
      <TextField
        style={{ width: "100%" }}
        className="px-2 my-2"
        id="FirstName"
        name="FirstName"
        label="الاسم الأول"
        value={formik.values.FirstName}
        onChange={formik.handleChange}
        error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
        helperText={formik.touched.FirstName && formik.errors.FirstName}
      />
      <TextField
        style={{ width: "100%" }}
        className="px-2 my-2"
        id="LastName"
        name="LastName"
        label="الاسم الأخير"
        value={formik.values.LastName}
        onChange={formik.handleChange}
        error={formik.touched.LastName && Boolean(formik.errors.LastName)}
        helperText={formik.touched.LastName && formik.errors.LastName}
      />

      <TextField
        style={{ width: "100%" }}
        className="px-2 my-2"
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
        id="PhoneNumber"
        name="PhoneNumber"
        label="رقم الهاتف"
        type="PhoneNumber"
        value={formik.values.PhoneNumber}
        onChange={formik.handleChange}
        error={formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)}
        helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
      />
      <TextField
        style={{ width: "100%" }}
        className="px-2 my-2"
        id="Password"
        name="Password"
        label="كلمة المرور"
        type="password"
        value={formik.values.Password}
        onChange={formik.handleChange}
        error={formik.touched.Password && Boolean(formik.errors.Password)}
        helperText={formik.touched.Password && formik.errors.Password}
      />
      <TextField
        style={{ width: "100%" }}
        className="px-2 my-2"
        id="ConfirmPassword"
        name="ConfirmPassword"
        label="تأكيد كلمة المرور"
        type="password"
        value={formik.values.ConfirmPassword}
        onChange={formik.handleChange}
        error={
          formik.touched.ConfirmPassword &&
          Boolean(formik.errors.ConfirmPassword)
        }
        helperText={
          formik.touched.ConfirmPassword && formik.errors.ConfirmPassword
        }
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
  );
};
export default Registeration;
