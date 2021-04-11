import React from "react";
import RoomIcon from "@material-ui/icons/Room";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import MailIcon from "@material-ui/icons/Mail";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";

const ConatctUs = () => {
  return (
    <div
      className="border-right  justify-content-center pt-3 px-3"
      style={{
        borderWidth: "3px",
      }}
    >
      <div>
        <h6 style={{ color: "var(--main-green)" }}>
          <span style={{ borderBottom: "2px solid var(--main-green)" }}>
            تواصل معنا
          </span>
        </h6>
      </div>
      <div>
        <div className="p-3 d-flex jusify-content-center align-items-center">
          <RoomIcon fontSize="large" className="mx-3" />
          <span>
            1 ش مجلس الشعب - قصر العينى - القاهرة - مصر
            <br />
            ص.ب: 191 مجلس الشعب
            <br />
            رقم بريدى: 11582
          </span>
        </div>
        <div className="p-3 d-flex jusify-content-center align-items-center">
          <PhoneEnabledIcon fontSize="large" className="mx-3" />
          <span>202-2792-9292+</span>
        </div>
        <div className="p-3 d-flex jusify-content-center align-items-center">
          <LocalPrintshopIcon fontSize="large" className="mx-3" />
          <span>202-2792-9222+</span>
        </div>
        <div className="p-3 d-flex jusify-content-center align-items-center">
          <MailIcon fontSize="large" className="mx-3" />
          <span>prices@idsc.net.eg</span>
        </div>
      </div>
    </div>
  );
};

export default ConatctUs;
