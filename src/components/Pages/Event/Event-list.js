import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CustomCard from "../../UI/Custom-card";
import { axios } from "../../Axios/Axios";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(events.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  ////////////////

  const noEvents = !events || (events && events.length === 0); //check if no Events

  const getEvents = async () => {
    //fetch Events data
    const response = await axios
      .get("/news")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setEvents(response.data); // set Events data to state
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  let { url } = useRouteMatch();

  return (
    <>
      <Row>
        {!noEvents &&
          events.slice(offset, offset + PER_PAGE).map((eventItem, idx) => {
            return (
              <Col xs={12} md={6} lg={3} key={idx} className="p-3">
                <Link
                  // pass Events item data throw props
                  to={{
                    pathname: `${url}/${eventItem.id}`,
                    state: {
                      eventItem,
                    },
                  }}
                >
                  <CustomCard
                    CardTitle={eventItem.titleA}
                    CardText={eventItem.createDate}
                  />
                </Link>
              </Col>
            );
          })}

        {noEvents && <h2 className="text-center p-4"> لا توجد أخبار</h2>}
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

export default EventsList;
