import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import HeadBar from "../../UI/HeadBar";

import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";

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
    <Row
      className="justify-content-center py-5"
      style={{
        background: "#54A646",
      }}
    >
      <Col xs={12}>
        <HeadBar>شركاؤنا</HeadBar>
      </Col>
      <Container className="py-5">
        <Row>
          {!noRelatedWebsites &&
            relatedWebsites.map((relatedWebsitesItem, idx) => {
              return (
                <Col xs={4} key={idx} className="p-2">
                  <a href={relatedWebsitesItem.url} target="_blank">
                    <Row className="align-items-center ">
                      <Col xs={4}>
                        <div
                          className="d-flex  justify-content-center align-items-center "
                          style={{
                            height: "100px",
                            backgroundSize: "cover",
                            backgroundColor: "#fff",
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
                        className="p-2 text-white"
                        style={{ fontSize: ".9rem" }}
                      >
                        <p>{relatedWebsitesItem.nameA}</p>
                        <p>{relatedWebsitesItem.url}</p>
                      </Col>
                    </Row>
                  </a>
                </Col>
              );
            })}
        </Row>
      </Container>
    </Row>
  );
};

export default RelatedWebsite;
