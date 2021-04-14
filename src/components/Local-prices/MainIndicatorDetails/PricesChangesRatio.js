import React from "react";
import { Col, Row } from "react-bootstrap";

import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";

const PricesChangesRatio = (props) => {
  return (
    <Row className="my-4">
      <Col xs={12} className="mb-2">
        <h6 style={{ color: "var(--main-green)" }}>
          <span style={{ borderBottom: "2px solid var(--main-green)" }}>
            نسب التغير فى السعر
          </span>
        </h6>
      </Col>
      {props.mainIndicatorItem.yesterdayAvgRate !== 0 ? (
        <Col md={3} sm={6} className="p-1">
          {props.mainIndicatorItem.yesterdayAvgRate > 0 ? (
            <div
              className="border "
              style={{
                borderRadius: "10px",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <div
                className="p-2 "
                style={{
                  borderBottom: "1px solid var(--main-green)",
                  color: "rgb(255, 50, 50)",
                }}
              >
                <div className="p-2  d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%",
                      boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
                    }}
                  >
                    <CallMadeIcon fontSize="large" />
                  </div>
                </div>

                <div className="px-2 d-flex justify-content-between">
                  <span>+{props.mainIndicatorItem.yesterdayAvgRate}</span>
                  <span>
                    %{props.mainIndicatorItem.yesterdayAvgRatePercentage}
                  </span>
                </div>
              </div>

              <div className="p-2 text-center">بالنسبة لليوم السابق</div>
            </div>
          ) : (
            <div
              className="border "
              style={{
                borderRadius: "10px",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <div
                className="p-2 "
                style={{
                  borderBottom: "1px solid var(--main-green)",
                  color: "var(--main-green)",
                }}
              >
                <div className="p-2  d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%",
                      boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
                    }}
                  >
                    <CallReceivedIcon fontSize="large" />
                  </div>
                </div>

                <div className="px-2 d-flex justify-content-between">
                  <span>{props.mainIndicatorItem.yesterdayAvgRate}</span>
                  <span>
                    %{props.mainIndicatorItem.yesterdayAvgRatePercentage}
                  </span>
                </div>
              </div>

              <div className="p-2 text-center">بالنسبة لليوم السابق</div>
            </div>
          )}
        </Col>
      ) : null}
      {props.mainIndicatorItem.sameDayLastWeekAvgRate !== 0 ? (
        <Col md={3} sm={6} className="p-1">
          {props.mainIndicatorItem.sameDayLastWeekAvgRate > 0 ? (
            <div
              className="border "
              style={{
                borderRadius: "10px",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <div
                className="p-2 "
                style={{
                  borderBottom: "1px solid var(--main-green)",
                  color: "rgb(255, 50, 50)",
                }}
              >
                <div className="p-2  d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%",
                      boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
                    }}
                  >
                    <CallMadeIcon fontSize="large" />
                  </div>
                </div>

                <div className="px-2 d-flex justify-content-between">
                  <span>+{props.mainIndicatorItem.sameDayLastWeekAvgRate}</span>
                  <span>
                    %{props.mainIndicatorItem.sameDayLastWeekAvgRatePercentage}
                  </span>
                </div>
              </div>

              <div className="p-2 text-center">بالنسبة للإسبوع السابق</div>
            </div>
          ) : (
            <div
              className="border "
              style={{
                borderRadius: "10px",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <div
                className="p-2 "
                style={{
                  borderBottom: "1px solid var(--main-green)",
                  color: "var(--main-green)",
                }}
              >
                <div className="p-2  d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%",
                      boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
                    }}
                  >
                    <CallReceivedIcon fontSize="large" />
                  </div>
                </div>

                <div className="px-2 d-flex justify-content-between">
                  <span>{props.mainIndicatorItem.sameDayLastWeekAvgRate}</span>
                  <span>
                    %{props.mainIndicatorItem.sameDayLastWeekAvgRatePercentage}
                  </span>
                </div>
              </div>

              <div className="p-2 text-center">بالنسبة للإسبوع السابق</div>
            </div>
          )}
        </Col>
      ) : null}
      {props.mainIndicatorItem.sameDayLastMonthAvgRate !== 0 ? (
        <Col md={3} sm={6} className="p-1">
          {props.mainIndicatorItem.sameDayLastMonthAvgRate > 0 ? (
            <div
              className="border "
              style={{
                borderRadius: "10px",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <div
                className="p-2 "
                style={{
                  borderBottom: "1px solid var(--main-green)",
                  color: "rgb(255, 50, 50)",
                }}
              >
                <div className="p-2  d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%",
                      boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
                    }}
                  >
                    <CallMadeIcon fontSize="large" />
                  </div>
                </div>

                <div className="px-2 d-flex justify-content-between">
                  <span>
                    +{props.mainIndicatorItem.sameDayLastMonthAvgRate}
                  </span>
                  <span>
                    %{props.mainIndicatorItem.sameDayLastMonthAvgRatePercentage}
                  </span>
                </div>
              </div>

              <div className="p-2 text-center">بالنسبة للشهر السابق</div>
            </div>
          ) : (
            <div
              className="border "
              style={{
                borderRadius: "10px",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <div
                className="p-2 "
                style={{
                  borderBottom: "1px solid var(--main-green)",
                  color: "var(--main-green)",
                }}
              >
                <div className="p-2  d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%",
                      boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
                    }}
                  >
                    <CallReceivedIcon fontSize="large" />
                  </div>
                </div>

                <div className="px-2 d-flex justify-content-between">
                  <span>{props.mainIndicatorItem.sameDayLastMonthAvgRate}</span>
                  <span>
                    %{props.mainIndicatorItem.sameDayLastMonthAvgRatePercentage}
                  </span>
                </div>
              </div>

              <div className="p-2 text-center">بالنسبة للشهر السابق</div>
            </div>
          )}
        </Col>
      ) : null}
      {props.mainIndicatorItem.sameDayLastYearAvgRate !== 0 ? (
        <Col md={3} sm={6} className="p-1">
          {props.mainIndicatorItem.sameDayLastYearAvgRate > 0 ? (
            <div
              className="border "
              style={{
                borderRadius: "10px",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <div
                className="p-2 "
                style={{
                  borderBottom: "1px solid var(--main-green)",
                  color: "rgb(255, 50, 50)",
                }}
              >
                <div className="p-2  d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%",
                      boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
                    }}
                  >
                    <CallMadeIcon fontSize="large" />
                  </div>
                </div>

                <div className="px-2 d-flex justify-content-between">
                  <span>+{props.mainIndicatorItem.sameDayLastYearAvgRate}</span>
                  <span>
                    %{props.mainIndicatorItem.sameDayLastYearAvgRatePercentage}
                  </span>
                </div>
              </div>

              <div className="p-2 text-center">بالنسبة للعام السابق</div>
            </div>
          ) : (
            <div
              className="border "
              style={{
                borderRadius: "10px",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <div
                className="p-2 "
                style={{
                  borderBottom: "1px solid var(--main-green)",
                  color: "var(--main-green)",
                }}
              >
                <div className="p-2  d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%",
                      boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
                    }}
                  >
                    <CallReceivedIcon fontSize="large" />
                  </div>
                </div>

                <div className="px-2 d-flex justify-content-between">
                  <span>{props.mainIndicatorItem.sameDayLastYearAvgRate}</span>
                  <span>
                    %{props.mainIndicatorItem.sameDayLastYearAvgRatePercentage}
                  </span>
                </div>
              </div>

              <div className="p-2 text-center">بالنسبة للعام السابق</div>
            </div>
          )}
        </Col>
      ) : null}
    </Row>
  );
};

export default PricesChangesRatio;
