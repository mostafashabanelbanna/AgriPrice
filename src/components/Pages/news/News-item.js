import React from "react";
import ImageGallery from "../../UI/Image-gallary";
import parse from 'html-react-parser';

const newsItem = (props) => {
  const newsItem = props.location.state.newsItem;
  return (
    <div>
      <div>
        <h3>{newsItem.titleA}</h3>
        {parse(newsItem.contentA)}
      </div>
      <ImageGallery objectname="News" objectId={newsItem.id} />
    </div>
  );
};

export default newsItem;
