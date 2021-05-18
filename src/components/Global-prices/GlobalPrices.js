import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { axios } from "../Axios/Axios";
import defualtPro from "../../assets/images/product.png";
import PulseLoader from "react-spinners/PulseLoader";
import { paths } from "../Paths/Pathes";
import Breadcrumb from "../UI/Bread-crumb/Breadcrumb";
import * as moment from "moment";
import "moment/locale/ar";

const GlobalPrices = () => {
  const [globalPrices, setGlobalPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const noGlobalPrices =
    !globalPrices || (globalPrices && globalPrices.length === 0); //check if no GlobalPrices

  const getGlobalPrices = async () => {
    //fetch news data
    setLoading(true);
    const response = await axios
      .get("/PricesData/GetInnerInternationalData")
      .catch((err) => console.log("Error", err)); //handle errors
    setLoading(false);
    if (response && response.data) {
      setGlobalPrices(response.data); // set GlobalPrices data to state
    }
  };

  useEffect(() => {
    getGlobalPrices();
  }, []);
  const crumbs = [
    { text: "الرئيسية", path: "/" },
    { text: "الأسعار العالمية", path: `/Global-prices` },
  ];
  return (
    <Container>
      <Breadcrumb crumbs={crumbs} />
      <Row className="my-4">
        <Col xs={12}>
          <h5 style={{ color: "var(--main-green)" }}>الأسعار العالمية</h5>
        </Col>
      </Row>
      {!noGlobalPrices &&
        globalPrices.map((item, idx) => {
          return (
            <Row key={idx} className="px-3 my-4">
              <Col xs={12} className="mb-2">
                <h6 style={{ color: "var(--main-green)" }}>
                  <span style={{ borderBottom: "2px solid var(--main-green)" }}>
                    {item.generalIndicator}
                  </span>
                </h6>
              </Col>
              {item.internationalIndicatorsData.map((innerItem, idx) => {
                return (
                  <Col key={idx} className="px-0" md={2} sm={4} xs={6}>
                    <div
                      style={{
                        border: "1px solid var(--main-green)",
                        borderRadius: "8px",
                      }}
                      className="p-2 m-1 d-flex flex-column justify-content-center align-items-center"
                    >
                      <div
                        className="py-2 text-center"
                        style={{ color: "var(--main-green)" }}
                      >
                        متوسط السعر
                        <div className="py-2 text-center">
                          <span className="ml-1 ">{innerItem.avgPrice}</span>
                          دولار
                        </div>
                      </div>

                      <div style={{ width: "120px" }}>
                        <img
                          // className="img-fluid"
                          style={{ height: "120px", width: "100%" }}
                          src={
                            innerItem.photo == ""
                              ? defualtPro
                              : paths.MainIndicatorPhot +
                                innerItem.mainIndicatorId +
                                "/" +
                                innerItem.photo
                          }
                        />
                      </div>
                      <div className="py-2 text-center">
                        {innerItem.indicatorName}
                      </div>
                      <div class="align-self-lg-end text-left text-muted">
                        {moment(innerItem.insertionDate)
                          .locale("ar")
                          .format("LL")}
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      {loading === true && noGlobalPrices && (
        <div className="w-100 d-flex justify-content-center m-5">
          <PulseLoader loading={loading} color="#0D924C" margin="5" />
        </div>
      )}
      {loading === false && noGlobalPrices && (
        <h2 className="w-100 text-center p-4"> لا توجد مجموعات سلعية</h2>
      )}
    </Container>
  );
};

export default GlobalPrices;
