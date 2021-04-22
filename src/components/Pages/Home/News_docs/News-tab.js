import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

// import parse from "html-react-parser";
// import striptags from "striptags";
// import TextTruncate from "react-text-truncate";
import * as moment from "moment";
import "moment/locale/ar";

import { axios } from "../../../Axios/Axios";
import { paths } from "../../../Paths/Pathes";
import ThreePieacesHorizontalSkeleton from '../../../LoadingSkeleton/ThreePieacesHorizontal'

const NewsTab = () => {
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
    <Row className="px-2">
      {!noNews &&
        news.slice(0, 3).map((newsItem, idx) => {
          return (
            <Col key={idx} md={4}>
              <Link
                key={idx}
                className="h-100"
                // pass news item data throw props
                to={{
                  pathname: `${url}news-list/${newsItem.id}`,
                  state: {
                    newsItem,
                  },
                }}
              >
                <div className="p-2" style={{ backgroundColor: "#fff" }}>
                  <div
                    style={{
                      height: "220px",
                      backgroundImage: `url(${paths.NewsPhotos}${newsItem.id}/${newsItem.photoA})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="m-3">
                    <h5
                      style={{
                        direction: "rtl",
                      }}
                      className="text-justify"
                    >
                      {newsItem.titleA}
                    </h5>
                    <div
                      style={{
                        borderBottom: "4px solid var(--main-green)",
                      }}
                      className="my-3"
                    ></div>
                    <div>
                      {moment(newsItem.publishDate).locale("ar").format("LL")}
                    </div>
                    {/* <div>
                  {console.log(striptags(newsItem.contentA))}
                  <TextTruncate
                    line={5}
                    element="p"
                    truncateText="…"
                    text={`${striptags(newsItem.contentA)}`}
                    textTruncateChild={<a href="#">Read on</a>}
                  />
                </div> */}
                  </div>
                </div>
              </Link>
            </Col>
          );
        })}
        {noNews && <Col md={12}><ThreePieacesHorizontalSkeleton/></Col>}
    </Row>
  );
};

export default NewsTab;
