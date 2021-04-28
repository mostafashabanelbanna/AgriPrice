import React from "react";
import { Col, Row } from "react-bootstrap";
import defualtPro from "../../../assets/images/product.png";
import { paths } from "../../Paths/Pathes";
import * as moment from "moment";
import "moment/locale/ar";

const MainIndicatorBox = (props) => {
  return (
    <Row className="border">
      <Col className="my-4" lg={3} sm={6}>
        <div>
          <div className="p-3 d-flex justify-content-center align-items-center ">
            <div style={{ width: "100px" }}>
              <img
                className="img-fluid"
                src={
                  props.mainIndicatorItem.photo !== ""
                    ? paths.MainIndicatorPhot +
                      props.mainIndicatorItemId +
                      "/" +
                      props.mainIndicatorItem.photo
                    : defualtPro
                }
              />
            </div>
          </div>
          <div className="pb-2 text-center">
            <span style={{ color: "var(--main-green)" }}>المجموعة السلعية</span>
            <span className="pr-1">
              {props.mainIndicatorItem.generalIndicator}
            </span>
          </div>
          <div className="pb-2">
            <div className="d-flex justify-content-around">
              <span style={{ color: "var(--main-green)" }}>السلعة</span>
              <span className="pr-1">
                {props.mainIndicatorItem.mainIndicator}
              </span>
            </div>
          </div>
          {props.mainIndicatorItem.unit != "" && (
            <div className="pb-2">
              <div className="d-flex justify-content-around">
                <span style={{ color: "var(--main-green)" }}>الوحدة</span>
                <span className="pr-1">{props.mainIndicatorItem.unit}</span>
              </div>
            </div>
          )}
        </div>
        <div class="align-self-lg-end text-center text-muted">
          {moment(props.mainIndicatorItem.insertionDate)
            .locale("ar")
            .format("LL")}
        </div>
      </Col>
      <Col
        className="border-right  my-4 d-flex flex-column justify-content-center align-items-center"
        lg={3}
        sm={6}
      >
        <div className="m-3 ">
          <div className="text-center mb-3">متوسط سعر السلعة</div>
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{
                backgroundColor: "#f7f7f7",
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>
                {props.mainIndicatorItem.avgPrice}
              </span>
              <span style={{ fontSize: "1.2rem" }}>
                {props.mainIndicatorItem.currency}
              </span>
            </div>
          </div>
        </div>
      </Col>
      <Col className="border-right my-4 " lg={3} sm={6}>
        <div className="m-3  ">
          <div className="text-center mb-3">أدنى سعر للسلعة</div>
          <div
            className="p-2 mb-3 d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: "rgb(230 244 237)",
              borderRadius: "10px",
            }}
          >
            <span style={{ color: "var(--main-green)" }}>
              {props.mainIndicatorItem.minSubInicator}
            </span>
            <span>
              <span style={{ color: "var(--main-green)" }}>
                {props.mainIndicatorItem.minSubInicatorPrice}{" "}
              </span>
              {props.mainIndicatorItem.currency}{" "}
              {props.mainIndicatorItem.unit != "" && <span>/</span>}{" "}
              {props.mainIndicatorItem.unit}
            </span>
          </div>
          <div className="text-center mb-3">أعلى سعر للسلعة</div>
          <div
            className="p-2 d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: "rgb(252 235 236)",
              borderRadius: "10px",
            }}
          >
            <span style={{ color: "rgb(255, 50, 50)" }}>
              {props.mainIndicatorItem.maxSubInicator}
            </span>
            <span>
              <span style={{ color: "rgb(255, 50, 50)" }}>
                {" "}
                {props.mainIndicatorItem.maxSubInicatorPrice}{" "}
              </span>
              {props.mainIndicatorItem.currency}{" "}
              {props.mainIndicatorItem.unit != "" && <span>/</span>}{" "}
              {props.mainIndicatorItem.unit}
            </span>
          </div>
        </div>
      </Col>
      {props.mainIndicatorItem.internationalAvg !== 0 ? (
        <Col
          className="border-right  my-4 d-flex flex-column justify-content-center align-items-center"
          lg={3}
          sm={6}
        >
          <div className="m-3 ">
            <div className="text-center mb-3">متوسط سعر العالمي</div>
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#f7f7f7",
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                  boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
                }}
              >
                <span style={{ fontSize: "1.4rem" }}>
                  {props.mainIndicatorItem.internationalAvg}
                </span>
                <span style={{ fontSize: "1.2rem" }}>
                  {props.mainIndicatorItem.currency}
                </span>
              </div>
            </div>
          </div>
        </Col>
      ) : null}
    </Row>
  );
};
export default MainIndicatorBox;
