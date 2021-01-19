import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import parse from "html-react-parser";

// import ImageGallery from "../../UI/Image-gallary";
import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";
import { SampleNextArrow, SamplePrevArrow } from "../../slick-carousel/Arrows";

const NewsItem = (props) => {
  //get data from Link state
  const newsItemLinkState = props.location.state
    ? props.location.state.newsItem
    : undefined;

  //get news item id from url
  const newsItemId = props.match.params.NewsId;
  //
  // const [news, setNews] = useState([]);
  const [newsItem, setNewsItem] = useState({});

  const getNews = async () => {
    //fetch news data
    const response = await axios
      .get("/news")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      // setNews(response.data); // set news data to state
      response.data.map((newsItem) => {
        if (newsItem.id == newsItemId) {
          setNewsItem(newsItem);
        }
      });
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  //

  return (
    <>
      {newsItemLinkState ? (
        <div>
          <h3>{newsItemLinkState.titleA}</h3>
          {parse(newsItemLinkState.contentA)}
        </div>
      ) : (
        <div>
          <h3>{newsItem.titleA}</h3>
          {newsItem.contentA}
        </div>
      )}
    </>
  );
};

export default NewsItem;
