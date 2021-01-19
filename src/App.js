import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <>
          <Switch>
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
          </Switch>
        </>
        <Footer />
      </Router>
    </>
  );
}

export default App;
