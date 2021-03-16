import React from "react";
import {useState,useEffect} from 'react'
import { Col, Container, Row } from "react-bootstrap";
import  "./LocalPrices.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CategoryIcon from "@material-ui/icons/Category";
import imagePath from "../../assets/images/png/Path937.png";
import imagePath1 from "../../assets/images/png/Path942.png";
import icommodityGroup from "../../assets/images/png/product.png";
import { axios } from "../Axios/Axios";
import * as moment from "moment";
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,Legend ,ResponsiveContainer} from 'recharts';


const SubIndicatorInfo =(props) =>{
    const [SubIndicatorInformation,setSubIndicatorInformation] = useState({});

    const GetSubIndicator = async () => {
        //fetch Events data
        const url = `/Prices/GetSubIndicatorInfo/${props.match.params.Id}`;
        const response = await axios
        .get(url)
        .catch((err) => console.log("Error", err)); //handle errors
        if (response && response.data) {
            console.log(response.data);
            setSubIndicatorInformation(response.data);
        }
    };

    useEffect(() => {
        GetSubIndicator();
    }, []);
    
    return(
        <>
        { SubIndicatorInformation.subIndicatorName != "" &&
            <>
                <Row style={{ marginTop:20, padding:10, margin:0}}>
                    <Col md={6}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 text-center">
                                        <ShoppingCartIcon style={{ fontSize: 30, color: "#80B741" }} />
                                        <p>المجموعة السلعية : <span> {SubIndicatorInformation.generalIndicatorName} </span></p>
                                        <p>السلعة : <span>{SubIndicatorInformation.subIndicatorName}</span></p>
                                        <p>الوحدة : <span>{SubIndicatorInformation.unitName}</span></p>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <p className="text-center">متوسط البيع فى المحافظات</p>
                                        <h3 className="text-center">{SubIndicatorInformation.avgPrice}</h3>
                                        <p className="text-center">{SubIndicatorInformation.currencyName} / {SubIndicatorInformation.unitName}</p>
                                        <div className="text-center my-2 MinVal GovVal">
                                            <span> أقل سعر {SubIndicatorInformation.minPrice} </span><span>{SubIndicatorInformation.minGovs}</span>
                                        </div>
                                        <div className="text-center my-2 MaxVal GovVal">
                                            <span> أعلى سعر {SubIndicatorInformation.minPrice} </span><span>{SubIndicatorInformation.minGovs}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="card" >
                            <div className="card-body" style={{ padding:0, paddingTop:10}}>
                                <p className="text-center">أسواق الجملة</p>
                                <h2 className="text-center"> {SubIndicatorInformation.wholesaleAvg == 0 ? "لا يوجد" : SubIndicatorInformation.wholesaleAvg} </h2>
                                <p className="text-center"> {SubIndicatorInformation.wholeSaleCurrency} {SubIndicatorInformation.wholesaleAvg != 0 ? "/" :""} {SubIndicatorInformation.wholeSaleUnit}</p>

                                <div>
                                    <img src={imagePath} style={{ width:"100%"}}/>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="card">
                            <div className="card-body" style={{ padding:0, paddingTop:10}}>
                                <p className="text-center">المنافذ</p>
                                <h2 className="text-center"> {SubIndicatorInformation.portAvg == 0 ? "لا يوجد" : SubIndicatorInformation.portAvg} </h2>
                                <p className="text-center">{ SubIndicatorInformation.portCurrency} {SubIndicatorInformation.portAvg != 0 ? "/" :""} {SubIndicatorInformation.portUnit}</p>

                                <div>
                                    <img src={imagePath1} style={{ width:"100%"}}/>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop:20, padding:10, margin:0}}>
                    <Col md={3} style={{ textAlign: "-webkit-center"}}>
                        <div className="text-center"  style={{
                                borderRadius: "6px",
                                boxShadow: "10px 10px 5px 0px rgba(179, 179, 179, 0.36)",
                                color: "#80B741",
                                padding: 12,
                                width:"20%",
                                marginTop:10,
                                marginBottom:10
                            }}>
                           <img src={icommodityGroup}/>
                        </div>
                        <div>
                            <p className="text-center">الوحدة : <span>{SubIndicatorInformation.unitName}</span></p>
                            <p className="text-center">المصدر : متوسط أسعار المحافظات</p>
                        </div>
                    </Col>
                    <Col md={9}>
                        <table className="table table-bordered">
                            <thead  style={{ backgroundColor:"#54A646" ,color:"#FFF" }}>
                                <tr className="text-center">
                                    <th>التاريخ</th>
                                    <th>أدنى سعر </th>
                                    <th>أعلى سعر</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SubIndicatorInformation.weekDatas && SubIndicatorInformation.weekDatas.map((item, idx) =>(
                                    <tr>
                                        <td className="text-center"> {moment(item.insertionDate).format("LL")}</td>
                                        <td className="text-center">
                                            {item.minPrice}
                                            <div className="text-center my-2">
                                                <span className="MinVal GovVal">{item.minGovs}</span>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            {item.maxPrice}
                                            <div className="text-center my-2">
                                                <span className="MaxVal GovVal">{item.maxGovs}</span>
                                            </div>
                                        </td>
                                    </tr> 
                                ))}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row style={{ marginTop:20, padding:10, margin:0}}>
                    <Col md={12}>
                        {
                            SubIndicatorInformation.governoratesData && 
                            <ResponsiveContainer width="100%" height={400}>
                                 <LineChart data={SubIndicatorInformation.governoratesData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="govNameA" />
                                    <YAxis name="السعر" />
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={36}/>
                                    <Line type="monotone" dataKey="avg" name="متوسط السعر" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                           
                        }
                    
                    </Col>
                    
                </Row>
            </>
            }
        </>

    )
}

export default SubIndicatorInfo;