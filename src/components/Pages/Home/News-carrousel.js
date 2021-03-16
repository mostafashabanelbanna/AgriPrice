import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import * as moment from "moment";
import "moment/locale/ar";

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
  let { url } = useRouteMatch();
  return (
    <div className="carrousel_wrapper news px-0">
      <Slider {...settings}>
        {!noNews &&
          news.map((newsItem, idx) => {
            return (
              <Link
                key={idx}
                className="h-100"
                // pass news item data throw props
                to={{
                  pathname: `${url}news-list/${newsItem.id}`,
                  state: {
                    newsItem,
                  },
                }}
              >
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
                      <div className="col-md-2 d-flex align-items-end">
                        {moment(newsItem.publishDate).locale("ar").format("LL")}
                      </div>

                      <div className="col-md-10">
                        <h4
                          style={{ direction: "rtl" }}
                          className="text-truncate"
                        >
                          {newsItem.titleA}
                        </h4>
                        <p>{newsItem.titleE}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </Slider>
    </div>
  );
};

export default NewsCarrousel;
