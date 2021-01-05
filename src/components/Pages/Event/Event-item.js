import React from "react";
import NewsImageGallery from "./Event-image-gallery";

const eventItem = (props) => {
  const eventItem = props.location.state.eventItem;
  console.log(evenItem);
  return (
    <div>
      <div>
        <h3>{eventItem.titleA}</h3>
        {eventItem.contentA}
      </div>
      <NewsImageGallery />
    </div>
  );
};

export default eventItem;
