import React from "react";
import ImageGallery from "../../UI/Image-gallary";

const newsItem = (props) => {
  const newsItem = props.location.state.newsItem;
  console.log(newsItem);
  return (
    <div>
      <div>
        <h3>{newsItem.titleA}</h3>
        {newsItem.contentA}
      </div>
      <ImageGallery objectname="News" objectId={newsItem.id} />
    </div>
  );
};

export default newsItem;
