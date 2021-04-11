import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { axios } from "../../../Axios/Axios";
import defualtPro from "../../../../assets/images//product.png";

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
                      src={!portsPricesItem.photo ? defualtPro : null}
                    />
                  </div>
                  <div className="py-2">{portsPricesItem.indicatorName}</div>
                  <div className="py-2">
                    أقل سعر
                    <span
                      className="mr-2"
                      style={{ color: "var(--main-green)" }}
                    >
                      {portsPricesItem.minPrice}
                    </span>
                  </div>
                  <div className="py-2">{portsPricesItem.portEntityName}</div>
                </Col>
              );
            })}
        </Row>
      </Col>
    </Row>
  );
};

export default PortsPrices;
