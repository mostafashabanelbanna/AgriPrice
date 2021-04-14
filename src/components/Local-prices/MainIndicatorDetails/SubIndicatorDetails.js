import React from "react";
import { Row, Col } from "react-bootstrap";

const SubIndicatorDetails = (props) => {
  return (
    <Row className="my-4">
      <Col xs={12} className="mb-2">
        <h6 style={{ color: "var(--main-green)" }}>
          <span style={{ borderBottom: "2px solid var(--main-green)" }}>
            الفئات السلعية
          </span>
        </h6>
      </Col>
      <Col>
        {props.subIndicatorDetails.map((item, idx) => {
          return (
            <div
              key={idx}
              className="border my-2"
              style={{
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <div
                className="p-2  d-flex flex-column justify-content-center align-items-center"
                style={{
                  color: "var(--main-green)",
                }}
              >
                {item.subIndicator}
              </div>
              <div className="p-3 d-flex flex-column ">
                <div className="d-flex justify-content-between ">
                  <span>متوسط السعر</span>
                  <div>
                    <span className="ml-1">{item.avgPrice}</span>
                    جنيه
                  </div>
                </div>
                <div className="d-flex justify-content-between ">
                  <span>مقارنة باليوم السابق</span>
                  <div>
                    {item.yesterdayAvgRate > 0 ? (
                      <span style={{ color: "#FF3232" }}>
                        +{item.yesterdayAvgRate}
                      </span>
                    ) : (
                      <span
                        className="ml-1"
                        style={{ color: "var(--main-green)" }}
                      >
                        {item.yesterdayAvgRate}
                      </span>
                    )}
                    جنيه
                  </div>
                </div>
                <div className="d-flex justify-content-between ">
                  <span>مقارنة بالإسبوع السابق</span>

                  <div>
                    {item.sameDayLastWeekAvgRate > 0 ? (
                      <span style={{ color: "#FF3232" }}>
                        +{item.sameDayLastWeekAvgRate}
                      </span>
                    ) : (
                      <span
                        className="ml-1"
                        style={{ color: "var(--main-green)" }}
                      >
                        {item.sameDayLastWeekAvgRate}
                      </span>
                    )}
                    جنيه
                  </div>
                </div>
                <div className="d-flex justify-content-between ">
                  <span>مقارنة بالشهر السابق</span>

                  <div>
                    {item.sameDayLastMonthAvgRate > 0 ? (
                      <span style={{ color: "#FF3232" }}>
                        +{item.sameDayLastMonthAvgRate}
                      </span>
                    ) : (
                      <span
                        className="ml-1"
                        style={{ color: "var(--main-green)" }}
                      >
                        {item.sameDayLastMonthAvgRate}
                      </span>
                    )}
                    جنيه
                  </div>
                </div>
                <div className="d-flex justify-content-between ">
                  <span>مقارنة بالعام السابق</span>

                  <div>
                    {item.sameDayLastYearAvgRate > 0 ? (
                      <span className="ml-1" style={{ color: "#FF3232" }}>
                        +{item.sameDayLastYearAvgRate}
                      </span>
                    ) : (
                      <span
                        className="ml-1"
                        style={{ color: "var(--main-green)" }}
                      >
                        {item.sameDayLastYearAvgRate}
                      </span>
                    )}
                    جنيه
                  </div>
                </div>
                <Row
                  className="m-1 p-1"
                  style={{ backgroundColor: "rgb(247 247 247)" }}
                >
                  <Col>
                    <div className="text-center">أدنى سعر</div>
                    <div
                      className="p-2"
                      style={{
                        backgroundColor: "rgb(230 244 237)",
                        color: "var(--main-green)",
                        borderRadius: "6px",
                        margin: "2px",
                      }}
                    >
                      <div
                        className="text-center"
                        style={{ fontSize: "1.4rem" }}
                      >
                        {item.minPrice}
                      </div>
                      <div
                        className="text-center"
                        style={{ fontSize: "1.1rem" }}
                      >
                        {item.minGovernorates}
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="text-center">أعلى سعر</div>
                    <div
                      className="p-2"
                      style={{
                        backgroundColor: "rgb(252 235 236)",
                        color: "rgb(255, 50, 50)",
                        borderRadius: "6px",
                        margin: "2px",
                      }}
                    >
                      <div
                        className="text-center"
                        style={{ fontSize: "1.4rem" }}
                      >
                        {item.maxPrice}
                      </div>
                      <div
                        className="text-center"
                        style={{ fontSize: "1.1rem" }}
                      >
                        {item.maxGovernorates}
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-1">
                  السعر بال{item.currency} لكل {item.unit}
                </div>
              </div>
            </div>
          );
        })}
      </Col>
    </Row>
  );
};

export default SubIndicatorDetails;
