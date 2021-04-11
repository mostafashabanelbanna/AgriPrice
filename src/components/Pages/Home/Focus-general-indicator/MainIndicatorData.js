import React from "react";
import { Row, Col } from "react-bootstrap";

const MainIndicatorData = (props) => {
  return (
    <Row className="justify-content-center">
      {props.mainIndicatorData.fieldAvgPrice !== 0 ? (
        <Col md={4} sm={6} className="p-1">
          <div className="border " style={{ borderRadius: "10px" }}>
            <div
              className="p-2  d-flex flex-column justify-content-center align-items-center"
              style={{
                borderBottom: "1px solid var(--main-green)",
                color: "var(--main-green)",
              }}
            >
              سعر الحقول
            </div>
            <div className="p-3 d-flex flex-column ">
              <div className="d-flex justify-content-between ">
                <span>متوسط السعر</span>

                <div>
                  <span className="ml-1">
                    {" "}
                    {props.mainIndicatorData.fieldAvgPrice}
                  </span>
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة باليوم السابق</span>
                <div>
                  {props.mainIndicatorData.fieldComYest > 0 ? (
                    <span style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.fieldComYest}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.fieldComYest}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة بالإسبوع السابق</span>

                <div>
                  {props.mainIndicatorData.fieldComWeek > 0 ? (
                    <span style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.fieldComWeek}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.fieldComWeek}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة بالعام السابق</span>

                <div>
                  {props.mainIndicatorData.fieldComYear > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.fieldComYear}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.fieldComYear}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
            </div>
          </div>
        </Col>
      ) : null}
      {/* Whole Prices */}
      {props.mainIndicatorData.wholeAvgPrice !== 0 ? (
        <Col md={4} sm={6} className="p-1">
          <div className="border " style={{ borderRadius: "10px" }}>
            <div
              className="p-2  d-flex flex-column justify-content-center align-items-center"
              style={{
                borderBottom: "1px solid var(--main-green)",
                color: "var(--main-green)",
              }}
            >
              سوق الجملة
            </div>
            <div className="p-3 d-flex flex-column ">
              <div className="d-flex justify-content-between ">
                <span>متوسط السعر</span>

                <div>
                  <span className="ml-1">
                    {" "}
                    {props.mainIndicatorData.wholeAvgPrice}
                  </span>
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة باليوم السابق</span>
                <div>
                  {props.mainIndicatorData.wholeComYest > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.wholeComYest}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.wholeComYest}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة بالإسبوع السابق</span>

                <div>
                  {props.mainIndicatorData.wholeComWeek > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.wholeComWeek}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.wholeComWeek}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة بالعام السابق</span>

                <div>
                  {props.mainIndicatorData.wholeComYear > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.wholeComYear}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.wholeComYear}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
            </div>
          </div>
        </Col>
      ) : null}
      {/* Ports Prices */}
      {props.mainIndicatorData.portAvgPrice !== 0 ? (
        <Col md={4} sm={6} className="p-1">
          <div className="border " style={{ borderRadius: "10px" }}>
            <div
              className="p-2  d-flex flex-column justify-content-center align-items-center"
              style={{
                borderBottom: "1px solid var(--main-green)",
                color: "var(--main-green)",
              }}
            >
              أسعار المنافذ
            </div>
            <div className="p-3 d-flex flex-column ">
              <div className="d-flex justify-content-between ">
                <span>متوسط السعر</span>

                <div>
                  <span className="ml-1">
                    {" "}
                    {props.mainIndicatorData.portAvgPrice}
                  </span>
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة باليوم السابق</span>
                <div>
                  {props.mainIndicatorData.portComYest > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.portComYest}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.portComYest}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة بالإسبوع السابق</span>

                <div>
                  {props.mainIndicatorData.portComWeek > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.portComWeek}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.portComWeek}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة بالعام السابق</span>

                <div>
                  {props.mainIndicatorData.portComYear > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.portComYear}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.portComYear}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
            </div>
          </div>
        </Col>
      ) : null}
      {/* Retail Prices */}
      {props.mainIndicatorData.retailAvgPrice !== 0 ? (
        <Col md={4} sm={6} className="p-1">
          <div className="border " style={{ borderRadius: "10px" }}>
            <div
              className="p-2  d-flex flex-column justify-content-center align-items-center"
              style={{
                borderBottom: "1px solid var(--main-green)",
                color: "var(--main-green)",
              }}
            >
              أسعار التجزئة
            </div>
            <div className="p-3 d-flex flex-column ">
              <div className="d-flex justify-content-between ">
                <span>متوسط السعر</span>

                <div>
                  <span className="ml-1">
                    {" "}
                    {props.mainIndicatorData.retailAvgPrice}
                  </span>
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة باليوم السابق</span>
                <div>
                  {props.mainIndicatorData.retailComYest > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.retailComYest}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.retailComYest}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة بالإسبوع السابق</span>

                <div>
                  {props.mainIndicatorData.retailComWeek > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.retailComWeek}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.retailComWeek}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة بالعام السابق</span>

                <div>
                  {props.mainIndicatorData.retailComYear > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.retailComYear}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.retailComYear}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
            </div>
          </div>
        </Col>
      ) : null}

      {/* Global Prices */}
      {props.mainIndicatorData.intAvgPrice !== 0 ? (
        <Col md={4} sm={6} className="p-1">
          <div className="border " style={{ borderRadius: "10px" }}>
            <div
              className="p-2  d-flex flex-column justify-content-center align-items-center"
              style={{
                borderBottom: "1px solid var(--main-green)",
                color: "var(--main-green)",
              }}
            >
              الأسعار العالمية
            </div>
            <div className="p-3 d-flex flex-column ">
              <div className="d-flex justify-content-between ">
                <span>متوسط السعر</span>

                <div>
                  <span className="ml-1">
                    {props.mainIndicatorData.intAvgPrice}
                  </span>
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة باليوم السابق</span>
                <div>
                  {props.mainIndicatorData.intComYest > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.intComYest}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.intComYest}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span className="ml-1">مقارنة بالإسبوع السابق</span>

                <div>
                  {props.mainIndicatorData.intComWeek > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.retailComWeek}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.intComWeek}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <span>مقارنة بالعام السابق</span>

                <div>
                  {props.mainIndicatorData.intComYear > 0 ? (
                    <span className="ml-1" style={{ color: "#FF3232" }}>
                      +{props.mainIndicatorData.retailComYear}
                    </span>
                  ) : (
                    <span
                      className="ml-1"
                      style={{ color: "var(--main-green)" }}
                    >
                      {props.mainIndicatorData.intComYear}
                    </span>
                  )}
                  جنيه
                </div>
              </div>
            </div>
          </div>
        </Col>
      ) : null}
    </Row>
  );
};

export default MainIndicatorData;
