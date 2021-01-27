import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

import * as moment from "moment";
import "moment/locale/ar";

import ReactPaginate from "react-paginate";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PulseLoader from "react-spinners/PulseLoader";

import CustomCard from "../../UI/Custom-card";
import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";

import mainBg from "../../../assets/images/png/panner.png";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  let [loading, setLoading] = useState(true);

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
      .get("/event")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setLoading(!loading);
      setEvents(response.data); // set Events data to state
    }
    setLoading(!loading);
  };

  useEffect(() => {
    getEvents();
  }, []);

  let { url } = useRouteMatch();

  return (
    <Container
      fluid
      style={
        !noEvents
          ? {
              backgroundImage: `url(${mainBg})`,
              backgroundPosition: "right top",
              backgroundSize: "cover",
            }
          : {}
      }
    >
      <Row>
        {!noEvents &&
          events.slice(offset, offset + PER_PAGE).map((eventItem, idx) => {
            return (
              <>
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
                      CardText={moment(eventItem.publishDate)
                        .locale("ar")
                        .format("LL")}
                      CardImg={`${paths.EventPhotos}${eventItem.id}/${eventItem.photoA}`}
                    />
                  </Link>
                </Col>
              </>
            );
          })}
        {!noEvents && (
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
        {loading === true && noEvents ? (
          <div className="w-100 d-flex justify-content-center m-5">
            <PulseLoader loading={loading} color="#0D924C" margin="5" />
          </div>
        ) : null}
        {loading === false && noEvents ? (
          <h2 className="w-100 text-center p-4"> لا توجد فعاليات</h2>
        ) : null}
      </Row>
    </Container>
  );
};

export default EventsList;
