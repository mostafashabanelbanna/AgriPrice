import React from "react";
import { Link, NavLink } from "react-router-dom";

const Breadcrumb = (props) => {
  const isLast = (index) => {
    return index === props.crumbs.length - 1;
  };
  return (
    <nav>
      <ol className="breadcrumb">
        {props.crumbs.map((crumb, index) => {
          const current = isLast(index) ? "current" : "";
          const disabled = isLast(index) ? false : true;
          return (
            <li key={index} className="breadcrumb-item">
              <NavLink
                disabled={disabled}
                to={crumb.path}
                className={`${current}`}
              >
                {crumb.text}
              </NavLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
