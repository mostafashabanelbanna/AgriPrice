import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { axios } from "../../../Axios/Axios";
import defualtPro from "../../../../assets/images//product.png";
import { paths } from "../../../Paths/Pathes";
import FourPieacesHorizontalSkeleton from "../../../LoadingSkeleton/FourPieacesHorizontal";
import * as moment from "moment";
import "moment/locale/ar";

const PortsPrices = () => {
  const [portsPrices, setPortsPrices] = useState([]);
  const noPortsPrices =
    !portsPrices || (portsPrices && portsPrices.length === 0); //check if no portsPrices

  const getPortsPrices = async () => {
    //fetch news data
    const response = await axios
      .get("/PricesData/GetPortData")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setPortsPrices(response.data); // set portsPrices data to state
    }
  };

  useEffect(() => {
    getPortsPrices();
  }, []);

  let { url } = useRouteMatch();
  return (
    <Row className="px-3 my-4">
      <Col xs={12} className="mb-2">
        <h6 style={{ color: "var(--main-green)" }}>
          <span style={{ borderBottom: "2px solid var(--main-green)" }}>
            تعرف على أقل الأسعار فى المنافذ
          </span>
        </h6>
      </Col>
      <Col
        xs={12}
        style={{ border: "1px solid var(--main-green)", borderRadius: "8px" }}
      >
        <Row className="p-3">
          {!noPortsPrices &&
            portsPrices.slice(0, 4).map((portsPricesItem, idx) => {
              return (
                <Col
                  key={idx}
                  sm={3}
                  className="p-2 d-flex flex-column justify-content-center align-items-center"
                  style={{
                    backgroundColor: "#fff",
                    borderRight: `${
                      idx > 0 ? "4px solid var(--secondary-gray)" : ""
                    }`,
                  }}
                >
                  <div style={{ width: "120px" }}>
                    <img
                      className="img-fluid"
                      style={{ height: "120px" }}
                      src={
                        !portsPricesItem.photo
                          ? defualtPro
                          : paths.MainIndicatorPhot +
                            portsPricesItem.mainIndicatorId +
                            "/" +
                            portsPricesItem.photo
                      }
                    />
                  </div>
                  <div className="py-2 text-center">
                    {portsPricesItem.indicatorName}
                  </div>
                  <div className="py-2 text-center">
                    أقل سعر
                    <span
                      className="mr-2  text-center"
                      style={{ color: "var(--main-green)" }}
                    >
                      {portsPricesItem.minPrice} {portsPricesItem.currency !="" && portsPricesItem.unit != "" && <span>{portsPricesItem.currency} / {portsPricesItem.unit}</span>}
                    </span>
                  </div>
                  <div className="py-2  text-center">
                    {portsPricesItem.portEntityName}
                  </div>
                  <div class="align-self-lg-end text-left text-muted">
                    {moment(portsPricesItem.insertionDate)
                      .locale("ar")
                      .format("LL")}
                  </div>
                </Col>
              );
            })}
          {noPortsPrices && (
            <Col md={12}>
              <FourPieacesHorizontalSkeleton />
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default PortsPrices;
