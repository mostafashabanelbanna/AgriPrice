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
import redArrow from "../../../../assets/images/redArrow.png"
import GreenArrow from "../../../../assets/images/GreenArrow.png"

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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
            أسعار الصرف
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
        {!noCurr &&
        (
          <table className="w-100">
            <thead>
              <tr>
                <th className="text-center p-1">العملة</th>
                <th className="text-center p-1">شراء</th>
                <th className="text-center p-1">بيع</th>
              </tr>
            </thead>

          {curr.map((Item, idx) => {
            return (
                <tr key={idx}>
                  <td>
                   <span className="p-1">{Item.name}</span>
                  </td>
                  <td >
                   <span className="p-1 d-flex flex-column jusify-content-center align-items-center">{Item.buyRate} {Item.buyRateDially >= 0 ? <ArrowUpwardIcon className="text-success"></ArrowUpwardIcon> : <ArrowDownwardIcon className="text-danger"></ArrowDownwardIcon>}  <span>{Item.buyRateDially}</span>  </span>
                  </td>
                  <td>
                  <span className="p-1 d-flex flex-column jusify-content-center align-items-center">{Item.sellRate}  {Item.sellRateDially >= 0 ? <ArrowUpwardIcon className="text-success"></ArrowUpwardIcon> : <ArrowDownwardIcon className="text-danger"></ArrowDownwardIcon>}  <span>{Item.sellRateDially}</span> </span>
                  </td>
                </tr>
            );
          })}
        </table>)}
        {noCurr && <OnePieaceSkeleton />}
      </div>
    </div>
  );
};

export default Currency;
