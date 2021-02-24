import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Col, Container, Row } from "react-bootstrap";

import RetailPrices from "./Retail-prices";
import WholesalePrices from "./Wholesale-prices";

const LocalPrices = () => {
  const [value, setValue] = React.useState("retail");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container fluid>
      <Row
        className="justify-content-center border-bottom py-5"
        style={{ backgroundColor: "var(--main-gray)" }}
      >
        <Col>
          <RadioGroup
            className="mb-4"
            aria-label="market"
            name="market"
            value={value}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel
              value="retail"
              control={<Radio style={{ color: "var(--main-green)" }} />}
              label="اسواق التجزئة"
            />
            <FormControlLabel
              value="wholesale"
              control={<Radio style={{ color: "var(--main-green)" }} />}
              label="اسواق الجملة"
            />
          </RadioGroup>
          {value === "retail" ? <RetailPrices /> : <WholesalePrices />}
        </Col>
      </Row>
    </Container>
  );
};

export default LocalPrices;
