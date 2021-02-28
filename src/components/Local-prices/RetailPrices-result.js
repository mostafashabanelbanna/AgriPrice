import React, {useState,useEffect} from "react";
import { Table } from "react-bootstrap";
import * as moment from "moment";

const RetailPricesResult = (props) => {

  useEffect(() => {
    //console.log(props.GovId)
  }, []);
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
          <th rowSpan="2" className="text-center">
            العملة
          </th>
          {
            props.GovId == 0 &&   <th colSpan="2" className="text-center"> أسعار السلع على مستوى الجمهورية  </th>
          }
          {
            props.GovId != 0 &&   <th colSpan="2" className="text-center"> أسعار السلع فى المحافظات </th>
          }
        
          <th rowSpan="2" className="text-center">التاريخ </th>
        </tr>
        <tr>
          <th className="text-center">ادنى سعر</th>
          <th className="text-center"> أعلى سعر</th>
        </tr>
      </thead>
      <tbody>
        {props.resultData.map((item,idx) => (
          <tr key={idx}>
            <td className="text-center">{item.subindictorName}</td>
            <td className="text-center">{item.unit}</td>
            <td className="text-center">{item.currency}</td>
            <td className="text-center">{item.minValue}</td>
            <td className="text-center">{item.maxValue}</td>
            <td className="text-center">{ moment(item.insertionDate).format("LL")}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RetailPricesResult;
