import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

import * as moment from "moment";
import "moment/locale/ar";

import ReactPaginate from "react-paginate";

import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CustomCard from "../../UI/Custom-card";
import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";

import mainBg from "../../../assets/images/png/panner.png";

import PulseLoader from "react-spinners/PulseLoader";

const NewsList = () => {
  const [news, setNews] = useState([]);
  let [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 5;
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
  return (
    <Container
      fluid
      style={
        !noNews
          ? {
              backgroundImage: `url(${mainBg})`,
              backgroundPosition: "right top",
              backgroundSize: "cover",
            }
          : {}
      }
    >
      <Row>
        {!noNews &&
          news.slice(offset, offset + PER_PAGE).map((newsItem, idx) => {
            return (
              <Col xs={12} md={6} lg={3} key={idx} className="p-2">
                <Link
                  className="h-100"
                  // pass news item data throw props
                  to={{
                    pathname: `${url}/${newsItem.id}`,
                    state: {
                      newsItem,
                    },
                  }}
                >
                  <CustomCard
                    CardTitle={newsItem.titleA}
                    CardText={moment(newsItem.publishDate)
                      .locale("ar")
                      .format("LL")}
                    CardImg={`${paths.NewsPhotos}${newsItem.id}/${newsItem.photoA}`}
                  />
                </Link>
              </Col>
            );
          })}
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

        {/* {noNews && <h2 className="text-center p-4"> لا توجد أخبار</h2>} */}
        {loading === true && noNews ? (
          <div className="w-100 d-flex justify-content-center m-5">
            <PulseLoader loading={loading} color="#0D924C" margin="5" />
          </div>
        ) : (
          <h2 className="w-100 text-center p-4"> لا توجد أخبار</h2>
        )}
      </Row>
    </Container>
  );
};

export default NewsList;
