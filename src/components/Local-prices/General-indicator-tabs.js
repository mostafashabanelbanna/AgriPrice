import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Row, Col, Table } from "react-bootstrap";
import GeneralIndicatorContent from "./General-indicator-content";
import PulseLoader from "react-spinners/PulseLoader";

const GeneralIndicatorTabs = (props) => {
  let ArrgeneralIndicatorData = [];
  for (const property in props.generalIndicatorData) {
    ArrgeneralIndicatorData.push({
      [property]: props.generalIndicatorData[property],
    });
  }

  return (
    <Container>
      <Tabs className="mt-4 flex-md-row flex-column">
        {ArrgeneralIndicatorData.length > 0 && ArrgeneralIndicatorData.map((generalIndicatorDataItem, idx) => {
          if (
            generalIndicatorDataItem[Object.keys(generalIndicatorDataItem)[0]]
              .length !== 0
          ) {
            return (
              <Tab
                key={idx}
                // defaultValue
                eventKey={idx}
                title={
                  Object.keys(generalIndicatorDataItem)[0] === "retail"
                    ? "أسعار التجزئة"
                    : Object.keys(generalIndicatorDataItem)[0] === "wholesale"
                    ? "سوق الجملة"
                    : Object.keys(generalIndicatorDataItem)[0] === "port"
                    ? "أسعار المنافذ"
                    : Object.keys(generalIndicatorDataItem)[0] === "field"
                    ? "أسعار الحقول"
                    : Object.keys(generalIndicatorDataItem)[0] ===
                      "international"
                    ? "الأسعار العالمية"
                    : ""
                }
                className="py-2 border"
                style={{
                  backgroundColor: "var(--secondary-gray)",
                }}
              >
                <GeneralIndicatorContent
                  generalIndicatorDataItem={
                    generalIndicatorDataItem[
                      Object.keys(generalIndicatorDataItem)[0]
                    ]
                  }
                />
              </Tab>
            );
          }
        })}
        {ArrgeneralIndicatorData.length <=0 && 
         <div className="w-100 d-flex justify-content-center m-5">
          <PulseLoader loading={true} color="#0D924C" margin="5" />
         </div>
        }
      </Tabs>
    </Container>
  );
};

export default GeneralIndicatorTabs;
