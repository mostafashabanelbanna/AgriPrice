import React, { useState } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Button } from "react-bootstrap";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);
  //   position: fixed;
  //   width: 100%;
  //   left: 50%;
  //   bottom: 40px;
  //   height: 20px;
  //   font-size: 3rem;
  //   z-index: 1;
  //   cursor: pointer;
  //   color: green;
  return (
    <div
      style={{
        position: "fixed",
        width: "40px",
        height: "40px",
        left: "5%",
        bottom: "40px",
        fontSize: "3rem",
        zIndex: "1",
        cursor: " pointer",
        backgroundColor: "transparent",
        color: "green",
        display: visible ? "block" : "none",
      }}
    >
      <Button
        onClick={scrollToTop}
        variant="outline-success d-flex justify-content-center align-items-center"
        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      >
        <ArrowUpwardIcon />
      </Button>
    </div>
  );
};

export default ScrollButton;
