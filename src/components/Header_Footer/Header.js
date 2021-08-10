import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import NavDropdown from "react-bootstrap/NavDropdown";

// import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import CloseIcon from "@material-ui/icons/Close";

import siteLogo from "../../assets/images/header_footer/logo_banner.png";

import "./Header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const [showAboutUs, setAboutUs] = useState(false);
  const [showMediaCorner, setMediaCorner] = useState(false);
  const [showLocal, setLocal] = useState(false);
  const [showPorts, setPorts] = useState(false);
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
  const showLocalDropdown = (e) => {
    setLocal(!showLocal);
  };
  const hideLocalDropdown = (e) => {
    setLocal(false);
  };
  const showPortsDropdown = (e) => {
    setPorts(!showPorts);
  };
  const hidePortsDropdown = (e) => {
    setPorts(false);
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = (parent) => {
    setParent(parent);
    setClick(false);
  };

  return (
    <>
      <nav className="navbar panner justify-content-between px-2">
        <NavLink
          to="/"
          exact
          activeClassName="active"
          className="nav-links py-1"
          onClick={() => closeMobileMenu("")}
        >
          <img src={siteLogo} style={{ height: "80px" }} alt="siteLogo" />
        </NavLink>
        <div className="navbar-container">
          <div className="menu-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"} /> */}
            {click ? (
              <CloseIcon fontSize="large" />
            ) : (
              <MenuOpenIcon fontSize="large" />
            )}
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
                title={<span>من نحن</span>}
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
              <NavDropdown
                className={
                  Parent === "local-prices" ? "active nav-links" : "nav-links"
                }
                title={<span>الأسعار المحلية</span>}
                show={showLocal}
                onMouseEnter={showLocalDropdown}
                onMouseLeave={hideLocalDropdown}
              >
                <NavLink
                  to="/local-prices"
                  activeClassName="active"
                  className="nav-links"
                  onClick={() => closeMobileMenu("local-prices")}
                >
                  المجموعات السلعية
                </NavLink>
                <NavLink
                  // to="/local-prices/1"
                  to={{
                    pathname: `/local-prices/1`,
                    state: {
                      classification: "retail",
                    },
                  }}
                  className="nav-links"
                  activeClassName="active"
                  onClick={() => closeMobileMenu("local-prices")}
                >
                  بحث السلعة
                </NavLink>
              </NavDropdown>
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
              {/* <NavLink
                to="/Ports"
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu("")}
              >
                المنافذ
              </NavLink> */}
              <NavDropdown
                className={
                  Parent === "ports" ? "active nav-links" : "nav-links"
                }
                title={<span>المنافذ</span>}
                show={showPorts}
                onMouseEnter={showPortsDropdown}
                onMouseLeave={hidePortsDropdown}
              >
                <NavLink
                  to="/Ports"
                  activeClassName="active"
                  className="nav-links"
                  onClick={() => closeMobileMenu("ports")}
                >
                  بحث المنافذ
                </NavLink>
                <NavLink
                  // to="/local-prices/1"
                  to={{
                    pathname: `/Ports/2/0/0/0`,
                    // state: {
                    //   classification: "retail",
                    // },
                  }}
                  className="nav-links"
                  activeClassName="active"
                  onClick={() => closeMobileMenu("local-prices")}
                >
                  بحث سلع المنافذ
                </NavLink>
              </NavDropdown>
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
          </ul>
          <div
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "10px",
              position: "absolute",
              left: "0",
              top: "0",
            }}
          >
            بث تجريبي
          </div>
        </div>
        <div>
          <ul
            style={{ marginBottom: 0, marginTop: "2rem" }}
            className={click ? "nav-menu active" : "nav-menu"}
          >
            <li className="nav-item">
              <NavLink
                to="/auth"
                exact
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu("")}
              >
                إنشاء حساب جديد
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
