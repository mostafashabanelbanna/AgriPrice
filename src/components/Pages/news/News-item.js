import React from "react";

const newsItem = (props) => {
  const newsItem = props.location.state.newsItem;
  // console.log(newsItem);
  return (
    <div>
      <div>
        <h3>{newsItem.titleA}</h3>
        {newsItem.contentA}
      </div>
    </div>
  );
};

export default newsItem;
