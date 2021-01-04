import React from "react";
import NewsImageGallery from "./NewsImageGallery";

const newsItem = (props) => {
  const newsItem = props.location.state.newsItem;
  console.log(newsItem);
  return (
    <div>
      <div>
        <h3>{newsItem.titleA}</h3>
        {newsItem.contentA}
      </div>
      <NewsImageGallery />
    </div>
  );
};

export default newsItem;
