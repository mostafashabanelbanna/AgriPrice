import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";
import TodayIcon from "@material-ui/icons/Today";

import * as moment from "moment";

import "moment/locale/ar";

const DocumentLibraryItem = (props) => {
  //get data from Link state
  const documentLibraryItemLinkState = props.location.state
    ? props.location.state.documentLibraryItem
    : undefined;

  //get news item id from url
  const documentLibraryItemId = parseInt(props.match.params.DocumentLibraryId);
  //
  const [documentLibraryItem, setDocumentLibraryItem] = useState({});

  const getDocumentLibraryItem = async () => {
    //fetch news data
    const response = await axios
      .get("/DocumentLibrary")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      response.data.map((item) => {
        if (item.id === documentLibraryItemId) {
          setDocumentLibraryItem(item);
        }
      });
    }
  };

  useEffect(() => {
    getDocumentLibraryItem();
  }, []);

  return (
    <Container className="my-4">
      {documentLibraryItemLinkState ? (
        <div>
          <div className="border-bottom d-flex justify-content-between py-3 mb-2">
            <h3 style={{ color: "var(--main-green)" }}>
              {documentLibraryItemLinkState.titleA}
            </h3>
            <div>
              <TodayIcon />
              <strong className="mx-2" style={{ color: "var(--main-green)" }}>
                {moment(documentLibraryItem.publishDate)
                  .locale("ar")
                  .format("LL")}
              </strong>
            </div>
          </div>

          <iframe
            style={{
              borderRadius: "10px",
            }}
            frameborder="0"
            src={`${paths.DocumentLibrarAttachment}${documentLibraryItemLinkState.id}/${documentLibraryItemLinkState.attachmentA}`}
            width="100%"
            height="800px"
          ></iframe>
        </div>
      ) : (
        <div>
          <div>{documentLibraryItem.titleA}</div>
          <iframe
            frameborder="0"
            src={`${paths.DocumentLibrarAttachment}${documentLibraryItem.id}/${documentLibraryItem.attachmentA}`}
            width="100%"
            height="800px"
          ></iframe>
        </div>
      )}
    </Container>
  );
};

export default DocumentLibraryItem;
