import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

import * as moment from "moment";
import "moment/locale/ar";

import ReactPaginate from "react-paginate";

import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PulseLoader from "react-spinners/PulseLoader";

import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";

import { Button } from "@material-ui/core";

const NewsList = () => {
  const [news, setNews] = useState([]);
  let [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 9;
  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(news.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  ////////////////

  const noNews = !news || (news && news.length === 0); //check if no news

  const getNews = async () => {
    //fetch news data
    const response = await axios
      .get("/news")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setLoading(!loading);
      setNews(response.data); // set news data to state
    }
    setLoading(!loading);
  };

  useEffect(() => {
    getNews();
  }, []);

  let { url } = useRouteMatch();
  let firstItem;
  let secondItem;
  let thirdItem;
  const firstRow = () => {
    return (
      <>
        <Col lg={6} className="my-3">
          {firstItem}
        </Col>

        <Col lg={6} className="my-3">
          {secondItem}
          {thirdItem}
        </Col>
      </>
    );
  };

  let counter;

  return (
    <Container>
      <Row>
        {!noNews &&
          news.slice(offset, offset + PER_PAGE).map((newsItem, idx) => {
            counter = idx;
            if (idx === 0) {
              firstItem = (
                <Link
                  className="h-100 p-2 zoom_image_on_hover"
                  // pass news item data throw props
                  to={{
                    pathname: `${url}/${newsItem.id}`,
                    state: {
                      newsItem,
                    },
                  }}
                >
                  <div className="mt-3 h-100 d-flex flex-column justify-content-between">
                    <div
                      style={{
                        height: "300px",
                      }}
                    >
                      <div
                        className="zoomed_img"
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${paths.NewsPhotos}${newsItem.id}/${newsItem.photoA})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></div>
                    </div>
                    <div className="h-100 d-flex flex-column justify-content-between">
                      <div>
                        <h4>{newsItem.titleA}</h4>
                      </div>
                      <div className="d-flex  justify-content-between">
                        <p>
                          {moment(newsItem.publishDate)
                            .locale("ar")
                            .format("LL")}
                        </p>
                        <Button
                          className="px-4 "
                          variant="outlined"
                          color="secondary"
                          type="submit"
                        >
                          إقرأ المزيد
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
            if (idx === 1) {
              secondItem = (
                <Link
                  className="h-50 p-2  zoom_image_on_hover"
                  // pass news item data throw props
                  to={{
                    pathname: `${url}/${newsItem.id}`,
                    state: {
                      newsItem,
                    },
                  }}
                >
                  <div className="h-50 d-flex  justify-content-between">
                    <div
                      style={{
                        width: "40%",
                      }}
                    >
                      <div
                        className="zoomed_img"
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${paths.NewsPhotos}${newsItem.id}/${newsItem.photoA})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></div>
                    </div>

                    <div
                      style={{
                        width: "60%",
                      }}
                      className="px-3 h-100 d-flex flex-column justify-content-between"
                    >
                      <div>
                        <h4>{newsItem.titleA}</h4>
                      </div>
                      <div className="d-flex  justify-content-between">
                        <p>
                          {moment(newsItem.publishDate)
                            .locale("ar")
                            .format("LL")}
                        </p>
                        <Button
                          className="px-4 "
                          variant="outlined"
                          color="secondary"
                          type="submit"
                        >
                          إقرأ المزيد
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }

            if (idx === 2) {
              thirdItem = (
                <Link
                  className="h-50 p-2 zoom_image_on_hover"
                  // pass news item data throw props
                  to={{
                    pathname: `${url}/${newsItem.id}`,
                    state: {
                      newsItem,
                    },
                  }}
                >
                  <div className="h-50 d-flex  justify-content-between">
                    <div
                      style={{
                        width: "40%",
                      }}
                    >
                      <div
                        className="zoomed_img"
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${paths.NewsPhotos}${newsItem.id}/${newsItem.photoA})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></div>
                    </div>

                    <div
                      style={{
                        width: "60%",
                      }}
                      className="px-3 h-100 d-flex flex-column justify-content-between"
                    >
                      <div>
                        <h4>{newsItem.titleA}</h4>
                      </div>
                      <div className="d-flex  justify-content-between">
                        <p>
                          {moment(newsItem.publishDate)
                            .locale("ar")
                            .format("LL")}
                        </p>
                        <Button
                          className="px-4 "
                          variant="outlined"
                          color="secondary"
                          type="submit"
                        >
                          إقرأ المزيد
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <>
                {idx === 2 && currentPage === 0 ? (
                  firstRow()
                ) : counter > 2 || currentPage > 0 || news.length < 3 ? (
                  <Col lg={6} className="my-3">
                    <Link
                      className="h-100 p-2 zoom_image_on_hover"
                      // pass news item data throw props
                      to={{
                        pathname: `${url}/${newsItem.id}`,
                        state: {
                          newsItem,
                        },
                      }}
                    >
                      <div className="h-100 d-flex flex-column justify-content-between">
                        <div
                          style={{
                            height: "200px",
                          }}
                        >
                          <div
                            className="zoomed_img"
                            style={{
                              width: "100%",
                              height: "100%",
                              backgroundImage: `url(${paths.NewsPhotos}${newsItem.id}/${newsItem.photoA})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          ></div>
                        </div>
                        <div className="mt-3 h-100 d-flex flex-column justify-content-between">
                          <div>
                            <h4>{newsItem.titleA}</h4>
                          </div>
                          <div className="d-flex  justify-content-between">
                            <p>
                              {moment(newsItem.publishDate)
                                .locale("ar")
                                .format("LL")}
                            </p>
                            <Button
                              className="px-4 "
                              variant="outlined"
                              color="secondary"
                              type="submit"
                            >
                              إقرأ المزيد
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ) : null}
              </>
            );
          })}
      </Row>

      {!noNews && (
        <Col xs={12}>
          <ReactPaginate
            previousLabel={"→ السابق"}
            nextLabel={"التالى ←"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </Col>
      )}
      {loading === true && noNews ? (
        <div className="w-100 d-flex justify-content-center m-5">
          <PulseLoader loading={loading} color="#0D924C" margin="5" />
        </div>
      ) : null}
      {loading === false && noNews ? (
        <h2 className="w-100 text-center p-4"> لا توجد أخبار</h2>
      ) : null}
    </Container>
  );
};

export default NewsList;
