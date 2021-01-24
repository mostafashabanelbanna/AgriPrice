import React from "react";
import { Container } from "react-bootstrap";

import NewsCarrousel from "./News-carrousel";
import Outlets from "./Outlets";
import SearchForm from "./Search-form";
import SiteServices from "./SiteServices";
import Suggestions from "./Suggestions";

const Home = () => {
  return (
    <>
      <Container fluid>
        <NewsCarrousel />
        <SearchForm />
        <SiteServices />
        <Outlets />
        <Suggestions />
      </Container>
    </>
  );
};

export default Home;
