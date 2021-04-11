import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import HeadBar from "../../../UI/HeadBar";

import { axios } from "../../../Axios/Axios";
import { paths } from "../../../Paths/Pathes";

const RelatedWebsite = () => {
  const [relatedWebsites, setRelatedWebsites] = useState([]);
  const noRelatedWebsites =
    !relatedWebsites || (relatedWebsites && relatedWebsites.length === 0); //check if no RelatedWebsites

  const getRelatedWebsites = async () => {
    //fetch news data
    const response = await axios
      .get("/home/RelatedWebSite")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setRelatedWebsites(response.data); // set RelatedWebsites data to state
    }
  };

  useEffect(() => {
    getRelatedWebsites();
  }, []);

  return (
    <div
      className="border-right  justify-content-center pt-3 px-3 pb-5"
      style={{
        borderWidth: "3px",
      }}
    >
      <div>
        <h6 style={{ color: "var(--main-green)" }}>
          <span style={{ borderBottom: "2px solid var(--main-green)" }}>
            مواقع ذات صلة
          </span>
        </h6>
      </div>
      <div>
        {!noRelatedWebsites &&
          relatedWebsites.map((relatedWebsitesItem, idx) => {
            return (
              <Col key={idx} className="p-2">
                <a href={relatedWebsitesItem.url} target="_blank">
                  <Row className="align-items-center">
                    <Col xs={4}>
                      <div
                        className="d-flex  justify-content-center align-items-center "
                        style={{
                          height: "100px",
                          backgroundSize: "cover",
                          backgroundColor: "#fff",
                          borderBottom: "2px solid var(--main-green)",
                        }}
                      >
                        <img
                          src={`${paths.RelatedWebsitePhotos}${relatedWebsitesItem.id}/${relatedWebsitesItem.logo}`}
                          className="img-fluid"
                          alt={`${relatedWebsitesItem.logo}`}
                        />
                      </div>
                    </Col>
                    <Col
                      xs={8}
                      className="p-2 "
                      // style={{ fontSize: ".9rem" }}
                    >
                      <p className="text-center">{relatedWebsitesItem.nameA}</p>
                    </Col>
                  </Row>
                </a>
              </Col>
            );
          })}
      </div>
    </div>
  );
};

export default RelatedWebsite;
