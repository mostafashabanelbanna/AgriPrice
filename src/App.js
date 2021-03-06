import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import { HashRouter } from "react-router-dom";

import Header from "./components/Header_Footer/Header";
import Footer from "./components/Header_Footer/Footer";

import Home from "./components/Pages/Home/Home";
import AboutUs from "./components/Pages/About-us/About-us";
import NewsList from "./components/Pages/news/News-list";
import EventsList from "./components/Pages/Event/Event-list";
import DocumentLibraryList from "./components/Pages/Document-library/Document-library-list";
import newsItem from "./components/Pages/news/News-item";
import eventItem from "./components/Pages/Event/Event-item";
import DocumentLibraryItem from "./components/Pages/Document-library/Document-library-item";
import portItem from "./components/Pages/Port/Port-item";
import Ports from "./components/Pages/Port/Port-list";

import "./App.css";
import Suggestions from "./components/Pages/Home/Suggestions-form/Suggestions";
import Outlets from "./components/Pages/Home/Outllets/Outlets";
import Aside from "./components/Header_Footer/Aside";
import LocalPrices from "./components/Local-prices/Local-prices";
import GlobalPrices from "./components/Global-prices/GlobalPrices";
import SubIndicatorInfo from "./components/Local-prices/SubIndicatorInfo";
import MainIndicatorDetails from "./components/Local-prices/MainIndicatorDetails/MainIndicatorDetails";
import ConatctUs from "./components/Pages/Home/Contact-us/ContactUs";
import SuggestionsContact from "./components/Pages/Suggestions_Contact/Suggestions_Contact";
import ScrollButton from "./components/UI/ScrollButton/ScrollButton";
import Auth from "./components/Pages/Auth/Auth";

function App() {
  return (
    <>
      <Router>
        <Header />
        <>
          <Switch>
            <Route exact path="/*.aspx">
              <Redirect to="/" />
            </Route>
            <Route path="/global-prices" exact component={GlobalPrices} />
            <Route
              path="/local-prices/:indicatorId"
              exact
              component={MainIndicatorDetails}
            />
            <Route path="/local-prices" exact component={LocalPrices} />
            <Route
              path="/local-prices/:gov/:government"
              exact
              component={LocalPrices}
            />
            <Route
              path="/local-prices/SubIndicatorInfo/:Id"
              exact
              component={SubIndicatorInfo}
            />
            <Route
              path="/document-library-list/:DocumentLibraryId"
              exact
              component={DocumentLibraryItem}
            />
            <Route
              path="/Ports/:PortId/:GovId/:PortEntityId/:PortTypeId"
              exact
              component={portItem}
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
            <Route path="/Ports" exact component={Ports} />
            {/* <Route path="/Ports" exact component={Outlets} /> */}
            <Route path="/suggestions" exact component={SuggestionsContact} />
            <Route path="/auth" exact component={Auth} />
            <Route />
          </Switch>
        </>
        <Footer />
        <ScrollButton />
      </Router>
    </>
  );
}

export default App;
