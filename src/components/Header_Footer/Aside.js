import React, { useState } from "react";
import { Link } from "react-router-dom";

import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DraftsIcon from "@material-ui/icons/Drafts";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";

import "./Aside.css";

const Aside = () => {
  const [isHovered, setIsHoverd] = useState(false);

  const handleHover = () => {
    setIsHoverd(!isHovered);
  };
  return (
    <div
      className={`aside_container d-flex flex-column ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className="p-2" style={{ color: "var(--main-green)" }}>
        <Link to="/">
          <AccountBalanceIcon fontSize="large" color="inherit" />
        </Link>
      </div>
      <div className="p-2" style={{ color: "var(--main-green)" }}>
        <Link to="/">
          <LocalOfferIcon fontSize="large" color="inherit" />
        </Link>
      </div>
      <div className="p-2" style={{ color: "var(--main-green)" }}>
        <Link to="/">
          <DraftsIcon fontSize="large" color="inherit" />
        </Link>
      </div>
      <div className="p-2">
        <Link to="/">
          <FacebookIcon fontSize="large" color="primary" />
        </Link>
      </div>
      <div className="p-2" style={{ color: "#0e76a8" }}>
        <Link to="/">
          <LinkedInIcon fontSize="large" color="inherit" />
        </Link>
      </div>
      <div className="p-2" style={{ color: " #00acee" }}>
        <Link to="/">
          <TwitterIcon fontSize="large" color="inherit" />
        </Link>
      </div>
    </div>
  );
};

export default Aside;
