import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Link, useRouteMatch } from "react-router-dom";

import ReactPaginate from "react-paginate";

import PulseLoader from "react-spinners/PulseLoader";

import { SampleNextArrow, SamplePrevArrow } from "../../slick-carousel/Arrows";

import HeadBar from "../../UI/HeadBar";
import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";

import mainBg from "../../../assets/images/png/panner.png";

import "./Outlet.css";

const Outlets = () => {
  const settings = {
    className: "center",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    infinite: true,
    // autoplay: true,
    slidesToScroll: 1,

    centerPadding: "0px",
    slidesToShow: 4,
    speed: 500,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [outlets, setOutlets] = useState([]);
  const noOutlets = !outlets || (outlets && outlets.length === 0); //check if no news
  let [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 6;
  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(outlets.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  ////////////////

  const getOutlets = async () => {
    //fetch news data
    const response = await axios
      .get("/Ports/PortEntity")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setOutlets(response.data); // set news data to state
    }
  };

  useEffect(() => {
    getOutlets();
  }, []);
  let { url } = useRouteMatch();

  return (
    <>
      {url === "/" ? (
        <Row
          className="justify-content-center py-5"
          style={{
            background: "rgb(13, 146, 76)",
            background:
              "linear-gradient( 0deg,rgba(13, 146, 76, 1) 0%, rgba(84, 166, 70, 1) 100%)",
          }}
        >
          <Col xs={12}>
            <HeadBar>منافذ</HeadBar>
          </Col>
          <Container className="py-5">
            <Row>
              <Col className="carrousel_wrapper outlets px-0">
                <Slider {...settings}>
                  {!noOutlets &&
                    outlets.map((outletItem, idx) => {
                      return (
                        <div
                          key={idx}
                          className="px-2 d-flex flex-column align-items-center"
                        >
                          <Link
                            className="d-flex flex-column justify-content-center align-items-center "
                            to={{
                              pathname: "/Ports/PortEntity",
                              state: {
                                EntityId: outletItem.id,
                                Entitylogo: outletItem.logo,
                              },
                            }}
                          >
                            <div className="carrousel_image">
                              <img
                                src={`${paths.OutletPhotos}${outletItem.id}/${outletItem.logo}`}
                                className="img-fluid"
                                alt={`${outletItem.logo}`}
                              />
                            </div>
                            <div className="carrousel_caption zoom_on_hover">
                              <div className="text-center">
                                {outletItem.nameA}
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </Slider>
              </Col>
            </Row>
          </Container>
        </Row>
      ) : (
        <Container
          fluid
          style={
            !noOutlets
              ? {
                  backgroundImage: `url(${mainBg})`,
                  backgroundPosition: "right top",
                  backgroundSize: "cover",
                }
              : {}
          }
        >
          <Row>
            {!noOutlets &&
              outlets
                .slice(offset, offset + PER_PAGE)
                .map((outletItem, idx) => {
                  return (
                    <Col
                      xs={12}
                      md={6}
                      lg={4}
                      key={idx}
                      className="p-5 outlets"
                    >
                      <Link
                        className="h-100 d-flex flex-column align-items-center justify-content-center"
                        // pass news item data throw props
                        to={{
                          pathname: "/Ports/PortEntity",
                          state: {
                            EntityId: outletItem.id,
                            Entitylogo: outletItem.logo,
                          },
                        }}
                      >
                        <div
                          className="carrousel_image"
                          style={{ border: "5px solid var(--main-green)" }}
                        >
                          <img
                            src={`${paths.OutletPhotos}${outletItem.id}/${outletItem.logo}`}
                            className="img-fluid"
                            alt={`${outletItem.logo}`}
                          />
                        </div>
                        <div className="carrousel_caption zoom_on_hover">
                          <div className="text-center text-dark">
                            {outletItem.nameA}
                          </div>
                        </div>
                      </Link>
                    </Col>
                  );
                })}
            {!noOutlets && (
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
            {loading === true && noOutlets ? (
              <div className="w-100 d-flex justify-content-center m-5">
                <PulseLoader loading={loading} color="#0D924C" margin="5" />
              </div>
            ) : null}
            {loading === false && noOutlets ? (
              <h2 className="w-100 text-center p-4"> لا توجد أخبار</h2>
            ) : null}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Outlets;
