import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import OnePieaceSkeleton from "../../../LoadingSkeleton/OnePieace";

// import parse from "html-react-parser";
// import striptags from "striptags";
// import TextTruncate from "react-text-truncate";
import * as moment from "moment";
import "moment/locale/ar";

import { axios } from "../../../Axios/Axios";
import { paths } from "../../../Paths/Pathes";

const Metals = () => {
  const [metals, setMetals] = useState([]);
  const noMetals = !metals || (metals && metals.length === 0); //check if no metals

  const getMetals = async () => {
    //fetch metals data
    const response = await axios
      .get("/PricesData/Get_PreciousMetals")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setMetals(response.data); // set metals data to state
    }
  };

  useEffect(() => {
    getMetals();
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
            أسعار المعادن
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
        {!noMetals && (
          <div className="border-bottom px-3 py-1 d-flex justify-content-between">
            <span>المعدن</span>
            <span>عيار</span>
            <span>السعر</span>
          </div>
        )}
        {!noMetals &&
          metals.map((Item, idx) => {
            return (
              <div className="px-3 py-1 d-flex justify-content-between">
                <span>{Item.mainIndicatorName}</span>
                <span>{Item.unit}</span>
                <span>{Item.avgPrice}</span>
              </div>
            );
          })}
        {noMetals && <OnePieaceSkeleton />}
      </div>
    </div>
  );
};

export default Metals;
