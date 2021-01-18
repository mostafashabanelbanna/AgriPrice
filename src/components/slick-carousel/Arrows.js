import React from "react";

export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        color: "#000",
        height: "80px",
        width: "80px",
        borderRadius: "50%",
        background: "var(--main-gray)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "30%",
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3E%3C/svg%3E")`,
        boxShadow: "0px 0px 3px 5px rgba(255,255,255, 0.9)",
      }}
      onClick={onClick}
    />
  );
};

export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        zIndex: 1,
        display: "block",
        color: "#000",
        height: "80px",
        width: "80px",
        borderRadius: "50%",
        background: "var(--main-gray)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "30%",
        boxShadow: "0px 0px 3px 5px rgba(255,255,255, 0.9)",
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3E%3C/svg%3E")`,
      }}
      onClick={onClick}
    />
  );
};
