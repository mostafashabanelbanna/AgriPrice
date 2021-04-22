import React from "react";
import { Row, Col, Table, OverlayTrigger, Tooltip } from "react-bootstrap";

import { Link } from "react-router-dom";

import * as moment from "moment";
import "moment/locale/ar";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import "./focusedGeneralIndicator.css";

const GeneralIndicatorContent = (props) => {
  const pricePercentageNow = (
    minPriceWithinYear,
    maxPriceWithinYear,
    avgPrice
  ) => {
    return (
      ((avgPrice - minPriceWithinYear) /
        (maxPriceWithinYear - minPriceWithinYear)) *
      100
    );
  };
  return (
    <Row className="px-2">
      <Col xs={12}>
        <Table className="text-center bg-white" responsive>
          <thead>
            <tr>
              <th style={{ color: "black !important" }}>البيان</th>
              <th className="text-center">متوسط السعر</th>
              <th className="text-center">قيمة التغير</th>
              <th className="text-center">التغير على مدار عام</th>
            </tr>
          </thead>
          <tbody>
            {props.focusedGeneralIndicatorData.indicatorPrices
              .slice(0, 4)
              .map((item, idx) => (
                <tr key={idx} style={{ lineHeight: 2 }}>
                  <td>
                    <Link
                      className="h-100 d-flex flex-column align-items-center justify-content-center"
                      to={{
                        pathname: `/local-prices/${item.indicatorId}`,
                        state: {
                          item: item,
                        },
                      }}
                    >
                      <span>
                        {item.indictorName} / {item.unit}
                      </span>
                      <br />
                      <span style={{ color: "#909090" }}>
                        {moment(item.insertionDate).locale("ar").format("LL")}
                        {/* {item.insertionDate} */}
                      </span>
                    </Link>
                  </td>
                  <td className="text-center d-flex justify-content-center align-items-center">
                    <span>
                      {item.avgPrice} {item.currency}
                    </span>
                    <div className="p-2">
                      <OverlayTrigger
                        placement={"top"}
                        overlay={
                          <Tooltip>
                            <strong>{item.minSubIndicatorName}</strong>
                          </Tooltip>
                        }
                      >
                        <div
                          className="border-bottom"
                          style={{ color: "var(--main-green)" }}
                        >
                          <ArrowDropDownIcon />
                          أدنى
                          <span className="mr-2" style={{ color: "#909090" }}>
                            {item.minSubIndicatorPrice} {item.currency}
                          </span>
                        </div>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement={"bottom"}
                        overlay={
                          <Tooltip>
                            <strong>{item.maxSubIndicatorName}</strong>
                          </Tooltip>
                        }
                      >
                        <div style={{ color: "#FF3232" }}>
                          <ArrowDropUpIcon />
                          أعلى
                          <span n className="mr-2" style={{ color: "#909090" }}>
                            {item.maxSubIndicatorPrice} {item.currency}
                          </span>
                        </div>
                      </OverlayTrigger>
                    </div>
                  </td>
                  <td className="text-center">
                    {item.changeRateDaialy > 0 ? (
                      <span style={{ color: "#FF3232" }}>
                        +{item.changeRateDaialy}
                        <br />
                        {item.changeRatePercentDaialy} %
                      </span>
                    ) : (
                      <span style={{ color: "var(--main-green)" }}>
                        {item.changeRateDaialy}
                        <br />
                        {item.changeRatePercentDaialy} %
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-between">
                      <div style={{ color: "var(--main-green)" }}>أقل سعر</div>
                      <div style={{ color: "#909090" }}>52 إسبوع</div>
                      <div style={{ color: "#FF3232" }}>أعلى سعر</div>
                    </div>
                    <div
                      style={{
                        height: "16px",
                        border: "1px solid black",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          height: "15px",
                          borderLeft: `${
                            pricePercentageNow(
                              item.minPriceWithinYear,
                              item.maxPriceWithinYear,
                              item.avgPrice
                            ) > 50
                              ? " 4px solid #FF3232"
                              : " 4px solid var(--main-green)"
                          }`,
                          position: "absolute",
                          right: `${pricePercentageNow(
                            item.minPriceWithinYear,
                            item.maxPriceWithinYear,
                            item.avgPrice
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <div style={{ color: "var(--main-green)" }}>
                          {item.minPriceWithinYear}
                        </div>
                        <div style={{ color: "#909090" }}>
                          {moment(item.minWithinYearDate)
                            .locale("ar")
                            .format("LL")}
                        </div>
                        {/* {item.minWithinYearDate} */}
                      </div>
                      <div>
                        <div className="text-left" style={{ color: "#FF3232" }}>
                          {item.maxPriceWithinYear}
                        </div>
                        <div style={{ color: "#909090" }}>
                          {moment(item.maxWithinYearDate)
                            .locale("ar")
                            .format("LL")}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default GeneralIndicatorContent;
