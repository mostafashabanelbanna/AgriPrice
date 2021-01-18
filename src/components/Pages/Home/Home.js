import React from "react";
import { Container } from "react-bootstrap";

import NewsCarrousel from "./News-carrousel";
import Outlets from "./Outlets";
import SiteServices from "./SiteServices";

const Home = () => {
  return (
    <>
      <Container fluid>
        <NewsCarrousel />
        <SiteServices />
        <Outlets />
      </Container>
    </>
  );
};

export default Home;
