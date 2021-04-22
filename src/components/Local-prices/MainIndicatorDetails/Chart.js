import React from "react";
import { Col, Row } from "react-bootstrap";
import { LineChart, Line,ResponsiveContainer,XAxis,YAxis,Tooltip,Legend,CartesianGrid,Label } from 'recharts';

const Chart = (probs)=>{
    return(
        <>
            {probs.mainIndicatorChart.length > 0 &&
              <ResponsiveContainer width="100%" height="30%">
                <LineChart data={probs.mainIndicatorChart}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" >
                      <Label value="متوسط أسعار السلع" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis label={{ value: 'متوسط السعر (بالجنية)', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip />
                    <Legend verticalAlign="top" height={36}/>
                    <Line type="monotone" dataKey="retailvalue" stroke="#ff0000" name="التجزئة" />
                    <Line type="monotone" dataKey="portValue" stroke="#087c16" name="المنافذ" />
                    <Line type="monotone" dataKey="wholesaleValue" stroke="#000000" name="الجملة" />
                    <Line type="monotone" dataKey="fieldValue" stroke="#1325ef" name="الحقول والمزارع" />

                </LineChart>
            </ResponsiveContainer>
            
          }
          </>
    );
}

export default Chart;