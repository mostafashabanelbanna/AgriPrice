import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import PulseLoader from "react-spinners/PulseLoader";

import { axios } from "../Axios/Axios";
import { paths } from "../Paths/Pathes";

import { SampleNextArrow, SamplePrevArrow } from "../slick-carousel/Arrows";

const CustomSlider = (Props) => {
  const [images, setImgaes] = useState([]);
  const [noImages, setNoImgaes] = useState({});
  let [loading, setLoading] = useState(true);

  //   const IMAGES = [];
  const GetImages = async () => {
    var url = `PhotoLibrary/GetPhotos?objectName=${Props.objectname}&objectId=${Props.objectid}`;

    var response = await axios
      .get(url)
      .catch((err) => console.log("Error", err)); //handle errors

    if (response && response.data) {
      setImgaes(response.data); // set Images data to state
      setNoImgaes(false);
    } else {
      setNoImgaes(true);
    }
  };
  useEffect(() => {
    GetImages();
  }, []);

  const settings = {
    className: "center",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    infinite: true,
    // autoplay: true,
    // centerPadding: "400px",
    slidesToShow: 1,
    speed: 500,
    rtl: true,
  };

  return (
    <>
      {images.length === 0 && (
        <div>
          <img src={Props.mainPhoto} className="img-fluid" alt="" />
        </div>
      )}
      <Slider {...settings}>
        {!noImages &&
          images.map((image, idx) => {
            return (
              <div key={idx}>
                <div
                  className="carrousel_image"
                  style={{
                    background: `url(${paths.PhotoLibraryAlbumPhoto}${image.photoLibraryAlbumID}/${image.photo})`,
                  }}
                ></div>
              </div>
            );
          })}
      </Slider>
    </>
  );
};

export default CustomSlider;
