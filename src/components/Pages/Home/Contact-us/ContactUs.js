import React from "react";
import RoomIcon from "@material-ui/icons/Room";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import MailIcon from "@material-ui/icons/Mail";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import { useRouteMatch } from "react-router-dom";

const ConatctUs = () => {
  let { url } = useRouteMatch();
  return (
    <div
      className="border-right  justify-content-center pt-3 px-3"
      style={{
        borderWidth: "3px",
      }}
    >
      {url === "/" ? (
        <div>
          <h6 style={{ color: "var(--main-green)" }}>
            <span style={{ borderBottom: "2px solid var(--main-green)" }}>
              تواصل معنا
            </span>
          </h6>
        </div>
      ) : null}
      <div>
        <div className="p-3 d-flex jusify-content-center">
          <RoomIcon fontSize="meduim" className="mx-3" />
          <span>1 ش مجلس الشعب - قصر العينى - القاهرة - مصر</span>
        </div>
        <div className="p-3 d-flex jusify-content-center align-items-center">
          <PhoneEnabledIcon fontSize="meduim" className="mx-3" />
          <span>202-2792-9292+</span>
        </div>
        <div className="p-3 d-flex jusify-content-center align-items-center">
          <LocalPrintshopIcon fontSize="meduim" className="mx-3" />
          <span>202-2792-9222+</span>
        </div>
        <div className="p-3 d-flex jusify-content-center align-items-center">
          <MailIcon fontSize="meduim" className="mx-3" />
          <span>prices@idsc.net.eg</span>
        </div>
      </div>
    </div>
  );
};

export default ConatctUs;
