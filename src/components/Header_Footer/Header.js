import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Header.css";

const Header = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <Container fluid="lg">
        <Row className="justify-content-center align-items-center">
          <img
            src="./images/idsc_logo.png"
            style={{ height: "100px" }}
            alt="idsc_logo"
          />
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <h1 className="pr-5 text-dark">الأسعار المحلية والعالمية</h1>
          </Link>
        </Row>
      </Container>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                الرئيسية
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about-us"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                من نحن
              </Link>
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
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                الأسعار العالمية
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                أسواق ومنافذ
              </Link>
            </li>
            <li className="nav-item">
              <NavDropdown
                className="nav-links"
                title={<span> المركز الإعلامي</span>}
              >
                <Link
                  to="/news-list"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  الأخبار
                </Link>
                <Link
                  to="/events-list"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  فعاليات
                </Link>
                <Link
                  to="/document-library-list"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  الإصدارات
                </Link>
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
