import React, {useState, useEffect} from "react";
import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";
import parse from "html-react-parser";
import { Container, Row, Col } from "react-bootstrap";

const AboutUs = () => {
  const [aboutUs,setAboutUs] = useState(null);
  const getAbouUs = async () => {
    //fetch news data
    const response = await axios
      .get("/Home/AboutUs/1")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setAboutUs(response.data);
    }
  };
  useEffect(() => {
    getAbouUs();
  }, []);

  return(
    <>
    {aboutUs!= null && (
      <>
        <div className="carrousel_wrapper news-item-slider px-0">
          <div className="text-center mt-2">
            <img src={`${paths.AboutUs}${aboutUs.id}/${aboutUs.photoA}`} style={{width:1000, height:400}} className="img-fluid" alt="" />
          </div>
        </div>
        <div className="mr-4 ml-4 mt-4">
          {parse(aboutUs.contentA)}
        </div>
      </>
    )}
    </>
  )
};

export default AboutUs;
