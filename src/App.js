import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header_Footer/Header";

import Home from "./components/Pages/Home/Home";
import AboutUs from "./components/Pages/About-us/About-us";
import NewsList from "./components/Pages/News/News-list";
import newsItem from "./components/Pages/News/News-item";
import EventsList from "./components/Pages/Event/Event-list";

import "./App.css";
import { Container } from "react-bootstrap";
import Footer from "./components/Header_Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container fluid className="my-3">
          <Switch>
            <Route path="/news-list/:NewsId" exact component={newsItem} />
            <Route path="/about-us" exact component={AboutUs} />
            <Route path="/events-list" exact component={EventsList} />
            <Route path="/news-list" exact component={NewsList} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
