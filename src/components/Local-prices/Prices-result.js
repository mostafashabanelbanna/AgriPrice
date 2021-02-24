import React from "react";
import { Table } from "react-bootstrap";

const PricesResult = (props) => {
  return (
    <Table responsive bordered>
      <thead
        style={{
          backgroundColor: "var(--main-green",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <tr>
          <th rowSpan="2" className="text-center">
            النوع
          </th>
          <th rowSpan="2" className="text-center">
            الوحدة
          </th>
          <th colSpan="2" className="text-center">
            متوسط اسعار التجزئة في المحافظات
          </th>
        </tr>
        <tr>
          <th className="text-center">ادنى سعر</th>
          <th className="text-center"> أعلى سعر</th>
        </tr>
      </thead>
      <tbody>
        {props.resultData.map((item) => (
          <tr key={item.subindicatorId}>
            <td className="text-center">{item.subindictorName}</td>
            <td className="text-center">kg</td>
            <td className="text-center">{item.minValue}</td>
            <td className="text-center">{item.maxValue}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PricesResult;
