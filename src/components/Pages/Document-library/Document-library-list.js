import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import ReactPaginate from "react-paginate";
import parse from "html-react-parser";

import * as moment from "moment";

import "moment/locale/ar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PulseLoader from "react-spinners/PulseLoader";

import TodayIcon from "@material-ui/icons/Today";
import DescriptionIcon from "@material-ui/icons/Description";

import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";

import mainBg from "../../../assets/images/png/panner.png";

const DocumentLibraryList = () => {
  const [documentLibrary, setDocumentLibrary] = useState([]);
  let [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(documentLibrary.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  ////////////////

  const noDocumentLibrary =
    !documentLibrary || (documentLibrary && documentLibrary.length === 0); //check if no Events

  const getDocumentLibrary = async () => {
    //fetch Events data
    const response = await axios
      .get("/DocumentLibrary")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setLoading(!loading);
      setDocumentLibrary(response.data); // set Events data to state
    }
    setLoading(!loading);
  };

  useEffect(() => {
    getDocumentLibrary();
  }, []);
  let { url } = useRouteMatch();
  return (
    <Container
      fluid
      style={
        !noDocumentLibrary
          ? {
              backgroundImage: `url(${mainBg})`,
              backgroundPosition: "right top",
              backgroundSize: "cover",
            }
          : {}
      }
    >
      <Container>
        <Row>
          {!noDocumentLibrary &&
            documentLibrary
              .slice(offset, offset + PER_PAGE)
              .map((documentLibraryItem, idx) => {
                return (
                  <Col
                    sm={12}
                    key={idx}
                    className="p-3 m-3 border"
                    style={{ backgroundColor: "#fff", borderRadius: "8px" }}
                  >
                    <Link
                      className="h-100 p-2 zoom_image_on_hover"
                      // pass news item data throw props
                      to={{
                        pathname: `${url}/${documentLibraryItem.id}`,
                        state: {
                          documentLibraryItem,
                        },
                      }}
                    >
                      <Row className="h-100">
                        <Col xs={4} className="h-100">
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
                                backgroundImage: `url(${paths.DocumentLibraryPhotos}${documentLibraryItem.id}/${documentLibraryItem.photoA})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                          </div>
                        </Col>
                        <Col className="d-flex flex-column justify-content-between  h-100">
                          <div>
                            <h3 style={{ color: "var(--main-green)" }}>
                              {documentLibraryItem.titleA}
                            </h3>
                            <h4>{documentLibraryItem.titleE}</h4>
                            <p>{parse(documentLibraryItem.contentA)}</p>
                          </div>
                          <div className="border-top d-flex justify-content-between py-3">
                            <div>
                              <TodayIcon />
                              <strong
                                className="mx-2"
                                style={{ color: "var(--main-green)" }}
                              >
                                {moment(documentLibraryItem.publishDate)
                                  .locale("ar")
                                  .format("LL")}
                              </strong>
                            </div>{" "}
                            <span
                              href={`${paths.DocumentLibrarAttachment}${documentLibraryItem.id}/${documentLibraryItem.attachmentA}`}
                              target="_blank"
                              rel="noreferrer"
                              download
                            >
                              <DescriptionIcon />
                              <strong
                                className="mx-2"
                                style={{ color: "var(--main-green)" }}
                              >
                                إستعراض ملف مرفق
                              </strong>
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </Link>
                  </Col>
                );
              })}
          {!noDocumentLibrary && (
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

          {loading === true && noDocumentLibrary ? (
            <div className="w-100 d-flex justify-content-center m-5">
              <PulseLoader loading={loading} color="#0D924C" margin="5" />
            </div>
          ) : null}
          {loading === false && noDocumentLibrary ? (
            <h2 className="w-100 text-center p-4"> لا توجد إصدارات</h2>
          ) : null}
        </Row>
      </Container>
    </Container>
  );
};

export default DocumentLibraryList;
