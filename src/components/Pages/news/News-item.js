import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

import * as moment from "moment";
import "moment/locale/ar";
import TodayIcon from "@material-ui/icons/Today";
import ShareIcon from "@material-ui/icons/Share";

import { Container, Row, Col } from "react-bootstrap";

import { axios } from "../../Axios/Axios";
import CustomSlider from "../../UI/Custom-slider";
import { paths } from "../../Paths/Pathes";
import "./News-item.css";

const NewsItem = (props) => {
  //get data from Link state
  const newsItemLinkState = props.location.state
    ? props.location.state.newsItem
    : undefined;

  //get news item id from url
  const newsItemId = parseInt(props.match.params.NewsId);
  //
  // const [news, setNews] = useState([]);
  const [newsItem, setNewsItem] = useState({});

  const getNews = async () => {
    //fetch news data
    const response = await axios
      .get("/news")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      response.data.map((newsItem) => {
        if (newsItem.id === newsItemId) {
          setNewsItem(newsItem);
        }
      });
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      {newsItemLinkState ? (
        <Container className="mt-4">
          <Row>
            <Col>
              <h4 className="my-4" style={{ color: "var(--main-green)" }}>
                {newsItemLinkState.titleA}
              </h4>
              <h3 className="my-4">{newsItemLinkState.titleE}</h3>
              <div className="carrousel_wrapper news-item-slider px-0">
                <CustomSlider
                  objectname={"News"}
                  objectid={newsItemLinkState.id}
                  mainPhoto={`${paths.NewsPhotos}${newsItemLinkState.id}/${newsItemLinkState.photoA}`}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-between my-3">
              <div>
                <TodayIcon />
                <strong className="mx-2" style={{ color: "var(--main-green)" }}>
                  {moment(newsItemLinkState.publishDate)
                    .locale("ar")
                    .format("LL")}
                </strong>
              </div>
              <div>
                <ShareIcon />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="my-3">{parse(newsItemLinkState.contentA)}</Col>
          </Row>
        </Container>
      ) : (
        <Container className="mt-4">
          <Row>
            <Col>
              <h4 className="my-4" style={{ color: "var(--main-green)" }}>
                {newsItem.titleA}
              </h4>
              <h3 className="my-4">{newsItem.titleE}</h3>

              <div className="carrousel_wrapper news-item-slider px-0">
                <CustomSlider
                  objectname={"News"}
                  objectid={newsItemId}
                  mainPhoto={`${paths.NewsPhotos}${newsItem.id}/${newsItem.photoA}`}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-between my-3">
              <div>
                <TodayIcon />
                <strong className="mx-2" style={{ color: "var(--main-green)" }}>
                  {newsItem.publishDate}
                </strong>
              </div>
              <div>
                <ShareIcon />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="my-3">
              <p>{newsItem.contentA}</p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default NewsItem;
