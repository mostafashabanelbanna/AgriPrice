import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header_Footer/Header";
import Footer from "./components/Header_Footer/Footer";

import Home from "./components/Pages/Home/Home";
import AboutUs from "./components/Pages/About-us/About-us";
import NewsList from "./components/Pages/News/News-list";
import EventsList from "./components/Pages/Event/Event-list";
import DocumentLibraryList from "./components/Pages/Document-library/Document-library-list";
import newsItem from "./components/Pages/News/News-item";
import eventItem from "./components/Pages/Event/Event-item";
import DocumentLibraryItem from "./components/Pages/Document-library/Document-library-item";
import Ports from "./components/Pages/Port/Port-list";

import "./App.css";
import Suggestions from "./components/Pages/Home/Suggestions";
import Outlets from "./components/Pages/Home/Outlets";
import Aside from "./components/Header_Footer/Aside";
import LocalPrices from "./components/Local-prices/Local-prices";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Aside />
        <>
          <Switch>
            <Route path="/local-prices" exact component={LocalPrices} />
            <Route
              path="/document-library-list/:DocumentLibraryId"
              exact
              component={DocumentLibraryItem}
            />
            <Route path="/events-list/:EventId" exact component={eventItem} />
            <Route path="/news-list/:NewsId" exact component={newsItem} />
            <Route
              path="/document-library-list"
              exact
              component={DocumentLibraryList}
            />
            <Route path="/events-list" exact component={EventsList} />
            <Route path="/news-list" exact component={NewsList} />
            <Route path="/about-us" exact component={AboutUs} />
            <Route path="/" exact component={Home} />
            <Route path="/Ports/PortEntity" exact component={Ports} />
            <Route path="/Ports" exact component={Outlets} />
            <Route path="/suggestions" exact component={Suggestions} />
          </Switch>
        </>
        <Footer />
      </Router>
    </>
  );
}

export default App;
