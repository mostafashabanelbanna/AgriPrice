import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axios } from "../../../Axios/Axios";
import defualtPro from "../../../../assets/images//product.png";
import { paths } from "../../../Paths/Pathes";
import FourPieacesHorizontalSkeleton from "../../../LoadingSkeleton/FourPieacesHorizontal";
import * as moment from "moment";
import "moment/locale/ar";

const GlobalPrices = () => {
  const [globalPrices, setGlobalPrices] = useState([]);
  const noGlobalPrices =
    !globalPrices || (globalPrices && globalPrices.length === 0); //check if no GlobalPrices

  const getGlobalPrices = async () => {
    //fetch news data
    const response = await axios
      .get("/PricesData/GetInternationalData")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setGlobalPrices(response.data); // set GlobalPrices data to state
    }
  };

  useEffect(() => {
    getGlobalPrices();
  }, []);
  return (
    <Row className="px-3 my-4">
      <Col xs={12} className="mb-2">
        <h6 style={{ color: "var(--main-green)" }}>
          <span style={{ borderBottom: "2px solid var(--main-green)" }}>
            السلع العالمية
          </span>
        </h6>
      </Col>
      {!noGlobalPrices &&
        globalPrices.slice(0, 4).map((globalPricesItem, idx) => {
          return (
            <Col key={idx} md={3} sm={6}>
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
                    <span className="ml-1 ">{globalPricesItem.avgPrice}</span>
                    دولار
                  </div>
                </div>

                <div style={{ width: "120px" }}>
                  <img
                    className="img-fluid"
                    style={{ height: "120px" }}
                    src={
                      !globalPricesItem.photo
                        ? defualtPro
                        : paths.MainIndicatorPhot +
                          globalPricesItem.mainIndicatorId +
                          "/" +
                          globalPricesItem.photo
                    }
                  />
                </div>
                <div className="py-2 text-center">
                  {globalPricesItem.indicatorName}
                </div>
                <div class="align-self-lg-end text-left text-muted mt-1">
                  {moment(globalPricesItem.insertionDate)
                    .locale("ar")
                    .format("LL")}
                </div>
              </div>
            </Col>
          );
        })}

      {noGlobalPrices && (
        <Col md={12}>
          <FourPieacesHorizontalSkeleton />
        </Col>
      )}
      {!noGlobalPrices && (
        <Col xs={12} className="mb-2">
          <Link
            className="my-4 d-flex align-items-center justify-content-end"
            to={{
              pathname: `/Global-prices`,
            }}
          >
            <span
              style={{ color: "rgb(255, 50, 50)", textDecoration: "underline" }}
            >
              إستعراض المزيد
            </span>
          </Link>
        </Col>
      )}
    </Row>
  );
};

export default GlobalPrices;
