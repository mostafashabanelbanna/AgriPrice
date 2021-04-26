import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

// import parse from "html-react-parser";
// import striptags from "striptags";
// import TextTruncate from "react-text-truncate";
import * as moment from "moment";
import "moment/locale/ar";

import { axios } from "../../../Axios/Axios";
import { paths } from "../../../Paths/Pathes";
import OnePieaceSkeleton from "../../../LoadingSkeleton/OnePieace";

const Currency = () => {
  const [curr, setcurr] = useState([]);
  const noCurr = !curr || (curr && curr.length === 0); //check if no metals

  const getCurrency = async () => {
    //fetch metals data
    const response = await axios
      .get("/PricesData/GetCurrencyExchange")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setcurr(response.data); // set metals data to state
    }
  };

  useEffect(() => {
    getCurrency();
  }, []);

  return (
    <div
      className="justify-content-center p-3 mb-2"
      style={{
        backgroundColor: "var(--secondary-gray)",
      }}
    >
      <div>
        <h6 style={{ color: "var(--main-green)" }}>
          <span style={{ borderBottom: "2px solid var(--main-green)" }}>
            أسعار العملات
          </span>
        </h6>
      </div>
      <div
        className="m-2 "
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "rgb(179 179 179 / 36%) 4px 4px 4px 0px",
        }}
      >
        {!noCurr && (
          <div className="border-bottom px-3 py-1 d-flex justify-content-between">
            <span> من </span>
            <span> إلى </span>
            <span> السعر</span>
          </div>
        )}
        {!noCurr &&
          curr.map((Item, idx) => {
            return (
              <div
                key={idx}
                className="px-3 py-1 d-flex justify-content-between"
              >
                <span>{Item.from}</span>
                <span>{Item.to}</span>
                <span>{Item.value}</span>
              </div>
            );
          })}
        {noCurr && <OnePieaceSkeleton />}
      </div>
    </div>
  );
};

export default Currency;
