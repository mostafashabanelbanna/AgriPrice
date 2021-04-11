import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import DocsTab from "./Docs-tab";

import NewsTab from "./News-tab";

const NewsDocsTabs = () => {
  return (
    <Tabs
      className="mt-4"
      defaultActiveKey="news"
      id="uncontrolled-tab-example"
    >
      <Tab
        eventKey="news"
        title="الأخبار"
        className="py-2 border"
        style={{
          backgroundColor: "var(--secondary-gray)",
        }}
      >
        <NewsTab />
      </Tab>
      <Tab
        eventKey="document-library"
        title="الإصدارات"
        className="py-2 border"
        style={{
          backgroundColor: "var(--secondary-gray)",
        }}
      >
        <DocsTab />
      </Tab>
    </Tabs>
  );
};

export default NewsDocsTabs;
