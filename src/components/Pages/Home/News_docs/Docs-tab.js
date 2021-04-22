import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

// import parse from "html-react-parser";
// import striptags from "striptags";
// import TextTruncate from "react-text-truncate";
import DescriptionIcon from "@material-ui/icons/Description";
import * as moment from "moment";
import "moment/locale/ar";

import { axios } from "../../../Axios/Axios";
import { paths } from "../../../Paths/Pathes";
import ThreePieacesHorizontalSkeleton from '../../../LoadingSkeleton/ThreePieacesHorizontal'

const DocsTab = () => {
  const [documentLibrary, setDocumentLibrary] = useState([]);
  let [loading, setLoading] = useState(true);

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

  return (
    <Row className="px-2">
      {!noDocumentLibrary &&
        documentLibrary.slice(0, 3).map((documentLibraryItem, idx) => {
          return (
            <Col md={4} key={idx}>
              <div className="p-2" style={{ backgroundColor: "#fff" }}>
                <div
                  style={{
                    height: "220px",
                    backgroundImage: `url(${paths.DocumentLibraryPhotos}${documentLibraryItem.id}/${documentLibraryItem.photoA})`,
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
                    {documentLibraryItem.titleA}
                  </h5>
                  <div
                    style={{
                      borderBottom: "4px solid var(--main-green)",
                    }}
                    className="my-3"
                  ></div>
                  <div>
                    {moment(documentLibraryItem.publishDate)
                      .locale("ar")
                      .format("LL")}
                  </div>
                  <a
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
                      تحميل ملف مرفق
                    </strong>
                  </a>
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
              </div>{" "}
            </Col>
          );
        })}
        {noDocumentLibrary && <Col md={12}><ThreePieacesHorizontalSkeleton/></Col>}
    </Row>
  );
};

export default DocsTab;
