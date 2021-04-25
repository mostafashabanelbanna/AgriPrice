import React, { useState, useEffect } from "react";
import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";
import parse from "html-react-parser";
import { Container, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Home from "../Home/Home";

import Breadcrumb from "../../UI/Bread-crumb/Breadcrumb";

const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState(null);
  const getAbouUs = async () => {
    //fetch news data
    const response = await axios
      .get("/Home/AboutUs/1")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setAboutUs(response.data);
    }
  };
  useEffect(() => {
    getAbouUs();
  }, []);
  const crumbs = [
    { text: "الرئيسية", path: "/" },
    { text: "من نحن", path: "/about-us" },
    { text: "عن الموقع", path: "/about-us" },
  ];

  return (
    <Container>
      <Breadcrumb crumbs={crumbs} />

      <div
        className="my-3"
        style={{ color: "var(--main-green)", fontSize: "1.2rem" }}
      >
        عن الموقع
      </div>
      {aboutUs != null && (
        <>
          <Row>
            <Col>
              <img
                src={`${paths.AboutUs}${aboutUs.id}/${aboutUs.photoA}`}
                style={{ width: 1000, height: 400 }}
                className="img-fluid"
                alt=""
              />
            </Col>
          </Row>
          <div
            style={{
              backgroundColor: "#f7f7f7",
              borderRight: "12px solid var(--main-green)",
            }}
            className="p-4"
          >
            <div className="p-4">{parse(aboutUs.contentA)}</div>
          </div>
        </>
      )}
    </Container>
  );
};

export default AboutUs;
