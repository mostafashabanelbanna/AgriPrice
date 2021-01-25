import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import parse from "html-react-parser";

import * as moment from "moment";
import "moment/locale/ar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TodayIcon from "@material-ui/icons/Today";
import DescriptionIcon from "@material-ui/icons/Description";
import MenuItem from "@material-ui/core/MenuItem"

import { axios } from "../../Axios/Axios";
import { paths } from "../../Paths/Pathes";

import TextField from "@material-ui/core/TextField";

import * as yup from "yup";

import { useFormik } from "formik";

import mainBg from "../../../assets/images/png/panner.png";
import flag from "../../../assets/images/png/flag.png";

import FlagIcon from '@material-ui/icons/Flag';
import CategoryIcon from '@material-ui/icons/Category';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const PortList = (Props) => {
  const [Ports, setPorts] = useState([]);
  const [Governorate,setGovernorate] = useState([]);
  const [portType,setPortType] = useState([]);
  const [governorateSelectedVal, setGovernorateSelectedVal] = useState(0);
  const [portTypeSelectedVal, setportTypeSelectedVal] = useState(0);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(Ports.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  ////////////////

  const noPorts =
    !Ports || (Ports && Ports.length === 0); //check if no Ports

  const getPorts = async () => {
    let url =  `Ports/Port?PortEntityId=${Props.location.state.EntityId}&GovId=${governorateSelectedVal}&PortTypeId=${portTypeSelectedVal}`;
    //fetch Ports data
    const response = await axios
      .get(url)
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setPorts(response.data); // set Events data to state
    }
  };

  const GetGovernorate = async ()=>{
    const response = await axios
    .get("Home/Governorate")
    .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
        setGovernorate(response.data);
    }
  }

  const GetPortType = async ()=>{
    const response = await axios
    .get("Ports/PortType")
    .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
        setPortType(response.data);
    }
  }

  const GovHandleChanges = async (event) =>{
    await  setGovernorateSelectedVal(event.target.value);
     getPorts();
     
  }

  const PortTypeHandleChanges = async (event) =>{
     setportTypeSelectedVal(event.target.value);
     await getPorts();
  }

  useEffect(() => {
    getPorts();
    GetGovernorate();
    GetPortType();

  }, [Ports]);

  return (
    <Container
      fluid
      style={
        !noPorts
          ? {
              backgroundImage: `url(${mainBg})`,
              backgroundPosition: "right top",
              backgroundSize: "cover",
            }
          : {}
      }
    >
    <Container>
        <Row className="mt-4 ">
            <Col md={6} className="align-items-center col-md-6 d-flex px-0">
                <span  style={{
                            borderRadius: "6px",
                            boxShadow: "10px 10px 5px 0px rgba(179, 179, 179, 0.36)",
                            color:"#80B741",
                            padding:12
                            
                        }}>
                    <FlagIcon style={{  fontSize:30}}/>
                </span>
              
                <TextField
                    style={{ width: "200px" }}
                    className="px-2 my-2"
                    variant="outlined"
                    name="GovernorateId"
                    select
                    label="المحافظة"
                    value={governorateSelectedVal}
                    onChange={GovHandleChanges}
                >
                    <MenuItem  value={0}>المحافظة</MenuItem>
                    {Governorate.map((item,idx)=> {
                        return(
                            <MenuItem key={idx} value={item.id}>{item.nameA}</MenuItem>
                        );
                    })}
                </TextField>
            </Col>

            <Col md={6} className="align-items-center col-md-6 d-flex px-0">
                <span  style={{
                            borderRadius: "6px",
                            boxShadow: "10px 10px 5px 0px rgba(179, 179, 179, 0.36)",
                            color:"#80B741",
                            padding:12
                            
                        }}>
                    <CategoryIcon style={{  fontSize:30}}/>
                </span>

                <TextField
                    style={{ width: "200px" }}
                    className="px-2 my-2"
                    variant="outlined"
                    name="PortTypeId"
                    value={portTypeSelectedVal}
                    select
                    label="نوع المنفذ"
                    onChange={PortTypeHandleChanges}
                >
                    <MenuItem  value={0}>نوع المنفذ</MenuItem>
                    {portType.map((item,idx)=> {
                        return(
                            <MenuItem key={idx} value={item.id}>{item.nameA}</MenuItem>
                        );
                    })}
                </TextField>
            </Col>
        </Row>

        <Row>
          {!noPorts &&
            Ports
              .slice(offset, offset + PER_PAGE)
              .map((PortItem, idx) => {
                return (
                  <Col
                    key={idx}
                    className="p-3 m-3 border"
                    style={{ backgroundColor: "#fff", borderRadius: "8px" }}
                    md={12}
                  >
                    <Row>
                      <Col md={3} className="h-100">
                        <img
                          src={`${paths.OutletPhotos}${Props.location.state.EntityId}/${Props.location.state.Entitylogo}`}
                          className="p-0"
                          alt=""
                          style={{ width:200, height:200}}
                        />
                      </Col>
                      <Col md={9} className="d-flex flex-column justify-content-between  h-100">
                        <div>
                          <h3 style={{ color: "var(--main-green)" }}>
                            {PortItem.nameA}
                          </h3>
                          <p> <FlagIcon style={{ fontSize:30, color:"#80B741"}}/> {PortItem.governorateName} </p>
                          <p> <LocationOnIcon style={{ fontSize:30, color:"#80B741"}}/> {PortItem.address} </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
          {!noPorts && (
            <Col xs={12}>
              <ReactPaginate
                previousLabel={"→ السابق"}
                nextLabel={"التالى ←"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            </Col>
          )}
          {noPorts && (
            <h2 className="text-center p-4"> لا توجد منافذ</h2>
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default PortList;
