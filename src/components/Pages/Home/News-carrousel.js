import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";
import { SampleNextArrow, SamplePrevArrow } from "../../slick-carousel/Arrows";
import "./News-carrousel.css";

const NewsCarrousel = () => {
  const settings = {
    className: "center",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    infinite: true,
    // autoplay: true,
    centerPadding: "400px",
    slidesToShow: 1,
    speed: 500,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "0px",
        },
      },
    ],
  };

  const [news, setNews] = useState([]);
  const noNews = !news || (news && news.length === 0); //check if no news

  const getNews = async () => {
    //fetch news data
    const response = await axios
      .get("/News/FocusNews")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setNews(response.data); // set news data to state
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="carrousel_wrapper news px-0">
      <Slider {...settings}>
        {!noNews &&
          news.map((newsItem, idx) => {
            console.log(newsItem);
            return (
              <div className="px-2">
                <div
                  className="carrousel_image"
                  style={{
                    // `${path.PhotoLibraryAlbumPhoto}{newsItem.}`
                    background: `url(${paths.NewsPhotos}${newsItem.id}/${newsItem.photoA})`,
                  }}
                ></div>
                <div className="carrousel_caption ">
                  <div className="row">
                    <div className="col-md-3">{newsItem.publishDate}</div>

                    <div className="col-md-9">
                      <h4>{newsItem.titleA}</h4>
                      <p>{newsItem.titleE}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default NewsCarrousel;
