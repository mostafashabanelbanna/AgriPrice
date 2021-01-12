import React from "react";

const DocumentLibraryItem = (props) => {
  const documentLibraryItem = props.location.state.eventItem;
  return (
    <div>
      <div>
        <h3>{documentLibraryItem.titleA}</h3>
        {documentLibraryItem.contentA}
      </div>
    </div>
  );
};

export default DocumentLibraryItem;
