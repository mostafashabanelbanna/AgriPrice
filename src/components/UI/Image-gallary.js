import React, { useState, useEffect } from "react";
import Gallery from "react-grid-gallery";
import { axios } from "../Axios/Axios";
import { paths } from "../Paths/Pathes";

const ImageGallery = (Props) => {
  const [Images, setImgaes] = useState([]);
  const [noImages, setNoImgaes] = useState({});
  const IMAGES = [];
  const GetImages = async () => {
    var url =
      "PhotoLibrary/GetPhotos?objectName=" +
      Props.objectname +
      "&objectId=" +
      Props.objectid;

    var response = await axios
      .get(url)
      .catch((err) => console.log("Error", err)); //handle errors

    if (response && response.data) {
      console.log(response.data);
      response.data.forEach((element) => {
        var obj = {
          src:
            paths.PhotoLibraryAlbumPhoto +
            element.photoLibraryAlbumID +
            "/" +
            element.photo,
          thumbnail:
            paths.PhotoLibraryAlbumPhoto +
            element.photoLibraryAlbumID +
            "/" +
            element.photo,
          thumbnailWidth: 320,
          thumbnailHeight: 174,
          caption: element.photoCaptionA,
        };
        IMAGES.push(obj);
      });
      console.log(IMAGES);
      setImgaes(IMAGES); // set Images data to state
      setNoImgaes(false);
    } else {
      setNoImgaes(true);
    }
  };
  useEffect(() => {
    GetImages();
  }, []);

  return (
    <>
      {noImages && <div></div>}
      {!noImages && (
        <Gallery
          images={Images}
          backdropClosesModal={true}
          imageCountSeparator="من"
        />
      )}
    </>
  );
};

export default ImageGallery;
