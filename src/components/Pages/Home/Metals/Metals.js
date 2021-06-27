import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import OnePieaceSkeleton from "../../../LoadingSkeleton/OnePieace";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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
      .get("/PricesData/GetGoldsExchange")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setMetals(response.data); // set metals data to state
    }
  };

  useEffect(() => {
    getMetals();
  }, []);

  console.log(metals);

  return (
    <div
      className="justify-content-center p-3 mb-2"
      style={{
        backgroundColor: "var(--secondary-gray)",
      }}
    >
      <div className="d-flex justify-content-between align-items-end">
        <h6 style={{ color: "var(--main-green)" }}>
          <span style={{ borderBottom: "2px solid var(--main-green)" }}>
            أسعار الذهب
          </span>
        </h6>
        {!noMetals && (
          <span style={{ color: "rgb(144, 144, 144)" }}>
            {moment(metals[0].insertionDate).locale("ar").format("LL")}
          </span>
        )}
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
          <table className="w-100">
            <thead>
              <tr>
                <th className="text-center p-1">السلعة</th>
                <th className="text-center p-1">شراء</th>
                <th className="text-center p-1">بيع</th>
                <th className="text-center p-1">الاتجاه</th>
              </tr>
            </thead>

            {metals.map((Item, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <span className="p-1">{Item.name}</span>
                  </td>
                  <td>
                    <span className="p-1 d-flex flex-column jusify-content-center align-items-center">
                      {Item.buyRate}{" "}
                    </span>
                  </td>
                  <td>
                    <span className="p-1 d-flex flex-column jusify-content-center align-items-center">
                      {Item.sellRate}{" "}
                    </span>
                  </td>
                  <td>
                    {Item.buyRateDially >= 0 ? (
                      <ArrowUpwardIcon className="text-success"></ArrowUpwardIcon>
                    ) : (
                      <ArrowDownwardIcon className="text-danger"></ArrowDownwardIcon>
                    )}{" "}
                    <span>{Item.buyRateDially}</span>
                  </td>
                </tr>
              );
            })}
          </table>
        )}
        {noMetals && <OnePieaceSkeleton />}
      </div>
    </div>
  );
};

export default Metals;
