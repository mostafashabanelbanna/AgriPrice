import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NavDropdown from "react-bootstrap/NavDropdown";

import siteLogo from "../../assets/images/logo@2x.png";
import idscLogo from "../../assets/images/idsc.png";

import "./Header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [Parent,setParent] = useState('');
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = (parent) => {
    setParent(parent);
    setClick(false);
  }

  return (
    <>
      <Container fluid className="panner">
        <Row className="align-items-center justify-content-between px-5 row">
          <div></div>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={siteLogo} style={{ height: "100px" }} alt="siteLogo" />
          </Link>

          <img src={idscLogo} style={{ height: "100px" }} alt="siteLogo" />
        </Row>
      </Container>

      <nav className="navbar">
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
                onClick={() => closeMobileMenu('')}
              >
                الرئيسية
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about-us"
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu('')}
              >
                من نحن
              </NavLink>
            </li>
            <li className="nav-item">
              <NavDropdown
                className="nav-links"
                title={<span>الأسعار المحلية</span>}
              >
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something</NavDropdown.Item>
                <NavDropdown.Item>Separated link</NavDropdown.Item>
              </NavDropdown>
            </li>
            <li className="nav-item">
              <NavLink
                to="/GlobalPrice"
                exact
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu('')}
              >
                الأسعار العالمية
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/PortsMarkets"
                exact
                activeClassName="active"
                className="nav-links"
                onClick={() => closeMobileMenu('')}
              >
                أسواق ومنافذ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavDropdown
                className={Parent == "MediaCorner" ? "active nav-links" : "nav-links"}
                title={<span> المركز الإعلامي</span>}
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <NavLink
                  to="/news-list"
                  activeClassName="active"
                  className="nav-links"
                  onClick={() => closeMobileMenu('MediaCorner')}
                >
                  الأخبار
                </NavLink>
                <NavLink
                  to="/events-list"
                  className="nav-links"
                  activeClassName="active"
                  onClick={() => closeMobileMenu('MediaCorner')}
                >
                  فعاليات
                </NavLink>
                <NavLink
                  to="/document-library-list"
                  activeClassName="active"
                  exact
                  className="nav-links"
                  onClick={() => closeMobileMenu('MediaCorner')}
                >
                  الإصدارات
                </NavLink>
              </NavDropdown>
            </li>
            <li className="nav-item"></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
