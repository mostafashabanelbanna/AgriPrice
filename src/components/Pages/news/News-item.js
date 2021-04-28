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
import Breadcrumb from "../../UI/Bread-crumb/Breadcrumb";

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
  const crumbs = [
    { text: "الرئيسية", path: "/" },
    { text: "الأخبار", path: `/news-list` },
    { text: "تفاصيل الخبر", path: `/news-list/${newsItemId}` },
  ];
  return (
    <>
      {newsItemLinkState ? (
        <Container className="">
          <Breadcrumb crumbs={crumbs} />
          <Row>
            <Col>
              {/* <h3 className="my-4">{newsItemLinkState.titleE}</h3> */}
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
            <Col className="mb-3">
              <div
                style={{
                  backgroundColor: "#f7f7f7",
                  borderRight: "12px solid var(--main-green)",
                }}
                className="p-4"
              >
                <h4 className="my-4" style={{ color: "var(--main-green)" }}>
                  {newsItemLinkState.titleA}
                </h4>
                <div>
                  <TodayIcon />
                  <strong
                    className="mx-2"
                    style={{ color: "var(--main-green)" }}
                  >
                    {moment(newsItemLinkState.publishDate)
                      .locale("ar")
                      .format("LL")}
                  </strong>
                </div>
                <div className="p-4 news_content" style={{ fontSize: "2rem" }}>
                  {parse(newsItemLinkState.contentA)}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="">
          <Breadcrumb crumbs={crumbs} />
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
            <Col className="mb-3">
              <div
                style={{
                  backgroundColor: "#f7f7f7",
                  borderRight: "12px solid var(--main-green)",
                }}
                className="p-4"
              >
                <h4 className="my-4" style={{ color: "var(--main-green)" }}>
                  {newsItem.titleA}
                </h4>
                <div>
                  <TodayIcon />
                  <strong
                    className="mx-2"
                    style={{ color: "var(--main-green)" }}
                  >
                    {moment(newsItem.publishDate).locale("ar").format("LL")}
                  </strong>
                </div>
                <div className="p-4 news_content" style={{ fontSize: "2rem" }}>
                  {console.log(newsItem.contentA)}
                  {parse(String(newsItem.contentA))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default NewsItem;
