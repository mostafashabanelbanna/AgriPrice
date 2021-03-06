import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import NavDropdown from "react-bootstrap/NavDropdown";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";

import { saveLoginData } from "../../store/actions/Auth";

import siteLogo from "../../assets/images/header_footer/logo_banner.png";

import { useHistory } from "react-router";

import "./Header.css";

const Header = (props) => {
  const history = useHistory();
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

  const logOut = () => {
    props.saveLoginDataObj({});
    localStorage.removeItem("token");
    history.push("/auth");
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
                ????????????????
              </NavLink>
            </li>
            <li className="nav-item">
              <NavDropdown
                className={
                  Parent === "about" ? "active nav-links" : "nav-links"
                }
                title={<span>???? ??????</span>}
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
                  ???? ????????????
                </NavLink>
                <NavLink
                  to="/suggestions"
                  className="nav-links"
                  activeClassName="active"
                  onClick={() => closeMobileMenu("about")}
                >
                  ???????? ??????
                </NavLink>
              </NavDropdown>
            </li>
            <li className="nav-item">
              <NavDropdown
                className={
                  Parent === "local-prices" ? "active nav-links" : "nav-links"
                }
                title={<span>?????????????? ??????????????</span>}
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
                  ?????????????????? ??????????????
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
                  ?????? ????????????
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
                ?????????????? ????????????????
              </NavLink>
            </li>
            <li className="nav-item">
              {/* <NavLink
                to="/Ports"
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu("")}
              >
                ??????????????
              </NavLink> */}
              <NavDropdown
                className={
                  Parent === "ports" ? "active nav-links" : "nav-links"
                }
                title={<span>??????????????</span>}
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
                  ?????? ??????????????
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
                  ?????? ?????? ??????????????
                </NavLink>
              </NavDropdown>
            </li>
            <li className="nav-item">
              <NavDropdown
                className={
                  Parent === "MediaCorner" ? "active nav-links" : "nav-links"
                }
                title={<span> ???????????? ????????????????</span>}
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
                  ??????????????
                </NavLink>
                {/* <NavLink
                  to="/events-list"
                  className="nav-links"
                  activeClassName="active"
                  onClick={() => closeMobileMenu("MediaCorner")}
                >
                  ??????????????
                </NavLink> */}
                <NavLink
                  to="/document-library-list"
                  activeClassName="active"
                  exact
                  className="nav-links"
                  onClick={() => closeMobileMenu("MediaCorner")}
                >
                  ??????????????????
                </NavLink>
              </NavDropdown>
            </li>
          </ul>

          {/* <div
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "10px",
              position: "absolute",
              left: "0",
              top: "0",
            }}
          >
            ???? ????????????
          </div> */}
        </div>
        <div></div>
        {/* <div>
          {props.loggedInUser && "username" in props.loggedInUser ? (
            <ul
              style={{ marginBottom: 0, marginTop: "2rem" }}
              className={click ? "nav-menu active" : "nav-menu"}
            >
              <li className="nav-item">
                <span
                  className="d-flex justify-content-center align-items-center"
                  style={{ padding: "0.5rem 1rem" }}
                >
                  ???????????? {props.loggedInUser.username}
                </span>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/"
                  exact
                  activeClassName=""
                  className="nav-links"
                  onClick={() => {
                    logOut();
                  }}
                >
                  ?????????? ????????
                </NavLink>
              </li>
            </ul>
          ) : (
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
                  ?????????? ????????
                </NavLink>
              </li>
            </ul>
          )}
        </div> */}
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.login.CuurentLoginData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLoginDataObj: (res) => {
      dispatch(saveLoginData(res));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
