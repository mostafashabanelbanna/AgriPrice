import React, { useEffect, useState } from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import * as moment from "moment";
import "moment/locale/ar";

import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";

const News = () => {
  const [news, setNews] = useState([]);
  const noNews = !news || (news && news.length === 0); //check if no news

  const getNews = async () => {
    //fetch news data
    const response = await axios
      .get("/News/FocusNews")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setNews(response.data); // set news data to state
    }
  };

  useEffect(() => {
    getNews();
  }, []);
  let { url } = useRouteMatch();
  return (
    <Tabs
      className="my-4"
      defaultActiveKey="news"
      id="uncontrolled-tab-example"
    >
      {console.log(news)}
      <Tab eventKey="news" title="الأخبار">
        Betwixt mine eye and heart a league is took, And each doth good turns
        now unto the other: When that mine eye is famish'd for a look, Or heart
        in love with sighs himself doth smother, With my love's picture then my
        eye doth feast, And to the painted banquet bids my heart; Another time
        mine eye is my heart's guest, And in his thoughts of love doth share a
        part: So, either by thy picture or my love, Thy self away, art present
        still with me;
      </Tab>
      <Tab eventKey="document-library" title="الإصدارات">
        Betwixt mine eye and heart a league is took, And each doth good turns
        now unto the other: When that mine eye is famish'd for a look, Or heart
        in love with sighs himself doth smother, With my love's picture then my
        eye doth feast, And to the painted banquet bids my heart; Another time
        mine eye is my heart's guest, And in his thoughts of love doth share a
        part: So, either by thy picture or my love, Thy self away, art present
        still with me;
      </Tab>
    </Tabs>
  );
};

export default News;
