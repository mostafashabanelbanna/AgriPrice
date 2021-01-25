import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

import * as moment from "moment";
import "moment/locale/ar";

import TodayIcon from "@material-ui/icons/Today";
import ShareIcon from "@material-ui/icons/Share";

import { Container, Row, Col } from "react-bootstrap";

import { axios } from "../../Axios/Axios";
import CustomSlider from "../../UI/Custom-slider";
import "../news/News-item.css";
const EventItem = (props) => {
  // const eventItem = props.location.state.eventItem;

  //get data from Link state
  const eventItemLinkState = props.location.state
    ? props.location.state.eventItem
    : undefined;

  //get news item id from url
  const eventItemId = parseInt(props.match.params.EventId);
  //
  // const [news, setNews] = useState([]);
  const [eventItem, setEventItem] = useState({});

  const getEvents = async () => {
    //fetch Events data
    const response = await axios
      .get("/event")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      response.data.map((eventItem) => {
        if (eventItem.id === eventItemId) {
          setEventItem(eventItem);
        }
      });
    }
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      {eventItemLinkState ? (
        <Container className="mt-4">
          <Row>
            <Col>
              <h4 className="my-4" style={{ color: "var(--main-green)" }}>
                {eventItemLinkState.titleA}
              </h4>
              <h3 className="my-4">{eventItemLinkState.titleE}</h3>

              <div className="carrousel_wrapper news-item-slider px-0">
                <CustomSlider
                  objectname={"Event"}
                  objectid={eventItemLinkState.id}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-between my-3">
              <div>
                <TodayIcon />
                <strong className="mx-2" style={{ color: "var(--main-green)" }}>
                  {moment(eventItemLinkState.publishDate)
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
            <Col className="my-3">{parse(eventItemLinkState.contentA)}</Col>
          </Row>
        </Container>
      ) : (
        <Container className="mt-4">
          <Row>
            <Col>
              <h4 className="my-4" style={{ color: "var(--main-green)" }}>
                {eventItem.titleA}
              </h4>
              <h3 className="my-4">{eventItem.titleE}</h3>

              <div className="carrousel_wrapper news-item-slider px-0">
                <CustomSlider objectname={"Event"} objectid={eventItemId} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-between my-3">
              <div>
                <TodayIcon />
                <strong className="mx-2" style={{ color: "var(--main-green)" }}>
                  {eventItem.publishDate}
                </strong>
              </div>
              <div>
                <ShareIcon />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="my-3">{eventItem.contentA}</Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default EventItem;
