import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import { connect } from "react-redux";

import { axios } from "../../Axios/Axios";

import { saveLoginData } from "../../../store/actions/Auth";
import { useHistory } from "react-router";

const Login = (props) => {
  const [isAuthUser, setIsAuthUser] = useState(false);
  const history = useHistory();
  const validationSchema = yup.object({
    Email: yup
      .string("أدخل البريد الإلكتروني")
      .email("بريد إلكتروني غير صالح")
      .required("أدخل البريد الإلكتروني"),
    Password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        // "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        "استخدام 8 أحرف أو أكثر باستعمال مزيج من الأحرف والأحرف الكبيرة  والأرقام والرموز"
      ),
  });

  let loginForm;

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await axios
        .post(`/Identity/Login`, values)
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            swal({
              title: "",
              text: "بيانات الدخول غير صحيحة",
              icon: "error",
              button: "موافق",
            });
            formik.values.Password = "";
          }
        }); //handle errors
      if (response && response.data) {
        if (response.data.status === 200) {
          props.saveLoginDataObj(response.data.result);
          localStorage.setItem("token", response.data.token);
          setIsAuthUser(true);
          history.push("/");
        }
      }
    },
  });

  return (
    <form ref={(el) => (loginForm = el)} onSubmit={formik.handleSubmit}>
      {/* {console.log(props)} */}
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
        id="Password"
        name="Password"
        label="كلمة المرور"
        type="password"
        value={formik.values.Password}
        onChange={formik.handleChange}
        error={formik.touched.Password && Boolean(formik.errors.Password)}
        helperText={formik.touched.Password && formik.errors.Password}
      />

      <div className="px-2 my-2 d-flex justify-content-end">
        <Button
          className="px-4 "
          variant="outlined"
          color="secondary"
          type="submit"
        >
          دخول
        </Button>
      </div>
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.login.CuurentLoginData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLoginDataObj: (res) => {
      dispatch(saveLoginData(res));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
