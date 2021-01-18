import React from "react";
import { Container } from "react-bootstrap";

import NewsCarrousel from "./News-carrousel";
import Outlets from "./Outlets";
import SiteServices from "./SiteServices";
import Suggestions from "./Suggestions";

const Home = () => {
  return (
    <>
      <Container fluid>
        <NewsCarrousel />
        <SiteServices />
        <Outlets />
        <Suggestions />
      </Container>
    </>
  );
};

export default Home;
