import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import parse from "html-react-parser";

import * as moment from "moment";
import "moment/locale/ar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TodayIcon from "@material-ui/icons/Today";
import DescriptionIcon from "@material-ui/icons/Description";

import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";

import mainBg from "../../../assets/images/png/panner.png";

const DocumentLibraryList = () => {
  const [documentLibrary, setDocumentLibrary] = useState([]);

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
      setDocumentLibrary(response.data); // set Events data to state
    }
  };

  useEffect(() => {
    getDocumentLibrary();
  }, []);

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
                    className="p-3 m-3 border"
                    style={{ backgroundColor: "#fff", borderRadius: "8px" }}
                  >
                    <Row>
                      <Col xs={4} className="h-100">
                        <img
                          src={`${paths.DocumentLibraryPhotos}${documentLibraryItem.id}/${documentLibraryItem.photoA}`}
                          className="img-fluid img-thumbnail p-0"
                        />
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
                          </div>
                          <div>
                            <DescriptionIcon />
                            <strong
                              className="mx-2"
                              style={{ color: "var(--main-green)" }}
                            >
                              تحميل ملف مرفق
                            </strong>
                          </div>
                        </div>
                      </Col>
                    </Row>
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
          {noDocumentLibrary && (
            <h2 className="text-center p-4"> لا توجد نشرات</h2>
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default DocumentLibraryList;
