import React from "react";
import { Col, Row } from "react-bootstrap";
import { governoratesLogos } from "./GovernoratesLogos";

const ProducingGovernorates = (props) => {
  const noProducingGovernorates =
    !props.producingGovernorates ||
    (props.producingGovernorates && props.producingGovernorates.length === 0);
  return (
    <>
      {!noProducingGovernorates ? (
        <Row className="justify-content-center mb-4 px-5">
          <Col xs={12} className="p-1">
            <div
              className="border"
              style={{
                borderRadius: "10px",
                boxShadow: "4px 4px 4px 0px rgb(179 179 179 / 36%)",
              }}
            >
              <div
                className="p-2  d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "var(--main-green)",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                  color: "#fff",
                }}
              >
                <h6 className="my-2">
                  المحافظات المنتجة لـ {props.mainIndicatorItem.mainIndicator}
                </h6>
              </div>
              <Row className="d-flex justify-content-center">
                {console.log(props.producingGovernorates)}
                {/* Here we will loop throw  producingGovernorates Array*/}
                {!noProducingGovernorates &&
                  props.producingGovernorates.map((item, idx) => {
                    return (
                      <Col
                        key={idx}
                        sm={3}
                        className="p-3 d-flex align-items-center flex-column justify-content-center"
                      >
                        <div style={{ width: "140px", textAlign: "center" }}>
                          {governoratesLogos.map((logo, idx) => {
                            return logo.text ===
                              item.governorate_E.toLowerCase() ? (
                              <img
                                className="img-fluid"
                                key={idx}
                                src={logo.image}
                              />
                            ) : null;
                          })}

                          <p className="text-center">{item.governorate_A}</p>
                          <p className="text-center">{item.governorate_E}</p>
                        </div>
                      </Col>
                    );
                  })}
              </Row>
            </div>
          </Col>
        </Row>
      ) : null}
    </>
  );
};

export default ProducingGovernorates;
