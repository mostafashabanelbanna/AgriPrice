import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import NavDropdown from "react-bootstrap/NavDropdown";

import siteLogo from "../../assets/images/header_footer/logo_banner.png";

import "./Header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const [showAboutUs, setAboutUs] = useState(false);
  const [showMediaCorner, setMediaCorner] = useState(false);
  const [Parent, setParent] = useState("");

  const showAboutusDropdown = (e) => {
    setAboutUs(!showAboutUs);
  };
  const hideAboutusDropdown = (e) => {
    setAboutUs(false);
  };

  const showMediaCornerDropdown = (e) => {
    setMediaCorner(!showMediaCorner);
  };
  const hideMediaCornerDropdown = (e) => {
    setMediaCorner(false);
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = (parent) => {
    setParent(parent);
    setClick(false);
  };

  return (
    <>
      <nav className="navbar panner justify-content-between px-md-5 px-2">
        <NavLink
          to="/"
          exact
          activeClassName="active"
          className="nav-links"
          onClick={() => closeMobileMenu("")}
        >
          <img src={siteLogo} style={{ height: "60px" }} alt="siteLogo" />
        </NavLink>
        <div className="navbar-container">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                exact
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu("")}
              >
                الرئيسية
              </NavLink>
            </li>
            <li className="nav-item">
              <NavDropdown
                className={
                  Parent === "about" ? "active nav-links" : "nav-links"
                }
                title={<span> من نحن</span>}
                show={showAboutUs}
                onMouseEnter={showAboutusDropdown}
                onMouseLeave={hideAboutusDropdown}
              >
                <NavLink
                  to="/about-us"
                  activeClassName="active"
                  className="nav-links"
                  onClick={() => closeMobileMenu("about")}
                >
                  عن الموقع
                </NavLink>
                <NavLink
                  to="/suggestions"
                  className="nav-links"
                  activeClassName="active"
                  onClick={() => closeMobileMenu("about")}
                >
                  إتصل بنا
                </NavLink>
              </NavDropdown>
            </li>
            <li className="nav-item">
              <NavLink
                to="/local-prices"
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu("")}
              >
                الأسعار المحلية
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Global-prices"
                exact
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu("")}
              >
                الأسعار العالمية
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Ports"
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu("")}
              >
                المنافذ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavDropdown
                className={
                  Parent === "MediaCorner" ? "active nav-links" : "nav-links"
                }
                title={<span> المركز الإعلامي</span>}
                show={showMediaCorner}
                onMouseEnter={showMediaCornerDropdown}
                onMouseLeave={hideMediaCornerDropdown}
              >
                <NavLink
                  to="/news-list"
                  activeClassName="active"
                  className="nav-links"
                  onClick={() => closeMobileMenu("MediaCorner")}
                >
                  الأخبار
                </NavLink>
                {/* <NavLink
                  to="/events-list"
                  className="nav-links"
                  activeClassName="active"
                  onClick={() => closeMobileMenu("MediaCorner")}
                >
                  فعاليات
                </NavLink> */}
                <NavLink
                  to="/document-library-list"
                  activeClassName="active"
                  exact
                  className="nav-links"
                  onClick={() => closeMobileMenu("MediaCorner")}
                >
                  الإصدارات
                </NavLink>
              </NavDropdown>
            </li>
            {/* <li className="nav-item">
              <NavLink
                to="/suggestions"
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu("")}
              >
                إﻗﺘﺮاﺣﺎت و ﺷﻜﺎوى
              </NavLink>
            </li> */}
          </ul>
        </div>
        {/* login */}
        <div></div>
      </nav>
    </>
  );
};

export default Header;
