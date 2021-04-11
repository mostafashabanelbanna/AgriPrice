import React from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";

import NewsCarrousel from "./News-carrousel";
import Outlets from "./Outllets/Outlets";
import Partner from "./Partner/Partner";
import RelatedWebsite from "./Related-website/RelatedWebsite";
import SearchForm from "./Search-form";
import SiteServices from "./SiteServices";
import Suggestions from "./Suggestions-form/Suggestions";

import "./Home.css";

import testImage from "../../../assets/images/stock.jpg";
import NewsDocsTabs from "./News_docs/News_docs-tabs";
import ConatctUs from "./Contact-us/ContactUs";
import GeneralIndicatorTabs from "./Focus-general-indicator/GeneralIndicatorTabs";
import PortsPrices from "./Ports-prices/PortsPrices";
import GlobalPrices from "./Global-prices/GlobalPrices";

const Home = () => {
  return (
    <>
      <Container>
        <Row>
          <Col lg={9}>
            <GeneralIndicatorTabs />
            <PortsPrices />
            <GlobalPrices />
            <NewsDocsTabs />
            <Suggestions />
          </Col>
          <Col lg={3}>
            <Container fluid className="pr-0">
              <div className="mt-5 mb-3">
                <img src={testImage} className="img-fluid" />
              </div>
              <Partner />
              <Outlets />
              <RelatedWebsite />
              <ConatctUs />
            </Container>
          </Col>
        </Row>
        {/* <NewsCarrousel />
        <SearchForm />
        <SiteServices />
        <Outlets />

        <RelatedWebsite /> */}
      </Container>
    </>
  );
};

export default Home;
