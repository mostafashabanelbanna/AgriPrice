import React from "react";
import DocumentLibraryImageGallery from "./Document-library-image-gallery";

const DocumentLibraryItem = (props) => {
  const documentLibraryItem = props.location.state.eventItem;
  return (
    <div>
      <div>
        <h3>{documentLibraryItem.titleA}</h3>
        {documentLibraryItem.contentA}
      </div>
      <DocumentLibraryImageGallery />
    </div>
  );
};

export default DocumentLibraryItem;
