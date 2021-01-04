import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CustomCard from "../../UI/Custom-card";
import { axios } from "../../Axios/Axios";

const NewsList = () => {
  const [news, setNews] = useState([]);

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
      setNews(response.data); // set news data to state
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  let { url } = useRouteMatch();

  return (
    <>
      <Row>
        {!noNews &&
          news.slice(offset, offset + PER_PAGE).map((newsItem, idx) => {
            return (
              <Col xs={12} md={6} lg={3} key={idx} className="p-3">
                <Link
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
                    CardText={newsItem.createDate}
                  />
                </Link>
              </Col>
            );
          })}

        {noNews && <h2 className="text-center p-4"> لا توجد أخبار</h2>}
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
      </Row>
    </>
  );
};

export default NewsList;
