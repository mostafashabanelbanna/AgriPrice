import React from "react";
import ImageGallery from "../../UI/Image-gallary";

const eventItem = (props) => {
  const eventItem = props.location.state.eventItem;
  return (
    <div>
      <div>
        <h3>{eventItem.titleA}</h3>
        {eventItem.contentA}
      </div>
      <ImageGallery objectname="Event" objectid={eventItem.id} />
    </div>
  );
};

export default eventItem;
