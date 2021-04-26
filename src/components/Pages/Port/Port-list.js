import React, { useEffect, useState } from "react";

import { Link, useRouteMatch } from "react-router-dom";

import ReactPaginate from "react-paginate";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import MenuItem from "@material-ui/core/MenuItem";

import { axios } from "../../Axios/Axios";

import TextField from "@material-ui/core/TextField";

import Const from "../../../assets/images/Const.png";
import Move from "../../../assets/images/Move.png";

import PulseLoader from "react-spinners/PulseLoader";
import Button from "@material-ui/core/Button";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './Port.css'
import {savePortSearch} from '../../../store/actions/PortSearch';
import {connect} from "react-redux";


const PortList = (props) => {
  const [Ports, setPorts] = useState([]);
  const [Governorate, setGovernorate] = useState([]);
  const [PortType, setPortType] = useState([]);
  const [PortEntity, setPortEntity] = useState([]);
  const [SelectedGovernorate,setSelectedGovernorate]= useState(props.stateRes.PortSearch.CurPortSearch && props.stateRes.PortSearch.CurPortSearch.governorate ? props.stateRes.PortSearch.CurPortSearch.governorate: 0);
  const [SelectedPortType,setSelectedPortType]= useState(props.stateRes.PortSearch.CurPortSearch && props.stateRes.PortSearch.CurPortSearch.portType ? props.stateRes.PortSearch.CurPortSearch.portType :  0);
  const [SelectedPortEntity,setSelectedPortEntity]= useState(props.stateRes.PortSearch.CurPortSearch && props.stateRes.PortSearch.CurPortSearch.portEntity ? props.stateRes.PortSearch.CurPortSearch.portEntity : 0);

  let [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 9;
  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(Ports.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const getPorts = async () => {
    var portsURL = `Ports/Port?PortEntityId=${SelectedPortEntity}&GovId=${SelectedGovernorate}&PortTypeId=${SelectedPortType}`;
    setLoading(true);
    //fetch Ports data
    const response = await axios
      .get(portsURL)
      .catch((err) => console.log("Error", err)); //handle errors

    setLoading(false);
    if (response && response.data) {
      setPorts(response.data);
    }
  };
  const GetGovernorates = async()=> {
    const response = await axios
    .get("Home/Governorate")
    .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setGovernorate(response.data);
    }
  }

  const GetPortEntities = async()=> {
    const response = await axios
    .get("Ports/PortEntity")
    .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setPortEntity(response.data);
    }
  }

  const GetPortTypes = async()=> {
    const response = await axios
    .get("Ports/PortType")
    .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setPortType(response.data);
    }
  }

  const GovHandleChanges = (event) => {
    setSelectedGovernorate(event.target.value);
    props.savePortSearch({...props.stateRes.PortSearch.CurPortSearch,governorate:event.target.value})
  };

  const PortTypeHandleChanges = (event) => {
    setSelectedPortType(event.target.value);
    props.savePortSearch({...props.stateRes.PortSearch.CurPortSearch,portType:event.target.value})
  };

  const PortEntityHandleChanges = (event) => {
    setSelectedPortEntity(event.target.value);
    props.savePortSearch({...props.stateRes.PortSearch.CurPortSearch,portEntity:event.target.value})
  };

  useEffect(() => {
    console.log(props.stateRes);
    GetGovernorates();
    GetPortEntities();
    GetPortTypes();
    getPorts();
  }, []);

  useEffect(() => {
    getPorts();
  }, [SelectedGovernorate,SelectedPortEntity,SelectedPortType]);

  let { url } = useRouteMatch();

  return (
     <Container>
       <div className="row mt-4">
         <div className="col-md-12">
          <h3 style={{ color:"#4A9559"}}>المنافذ</h3>
         </div>
       </div>
       <div className="row mt-4">
         <div className="col-md-4">
           <TextField
              style={{ width: "100%" }}
              className="px-2 my-2"
              variant="outlined"
              name="GovernorateId"
              select
              label="المحافظة"
              value={SelectedGovernorate}
              onChange={GovHandleChanges}
            >
              <MenuItem value={0}>المحافظة</MenuItem>
              {Governorate.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item.id}>
                    {item.nameA}
                  </MenuItem>
                );
              })}
              </TextField>
         </div>
         <div className="col-md-4">
           <TextField
              style={{ width: "100%" }}
              className="px-2 my-2"
              variant="outlined"
              name="GovernorateId"
              select
              label="نوع المنفذ"
              value={SelectedPortType}
              onChange={PortTypeHandleChanges}
            >
              <MenuItem value={0}>نوع المنفذ</MenuItem>
              {PortType.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item.id}>
                    {item.nameA}
                  </MenuItem>
                );
              })}
              </TextField>
         </div>
         <div className="col-md-4">
           <TextField
              style={{ width: "100%" }}
              className="px-2 my-2"
              variant="outlined"
              name="GovernorateId"
              select
              label="أختار المنفذ"
              value={SelectedPortEntity}
              onChange={PortEntityHandleChanges}
            >
              <MenuItem value={0}>المنفذ</MenuItem>
              {PortEntity.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item.id}>
                    {item.nameA}
                  </MenuItem>
                );
              })}
              </TextField>
         </div>
       </div>
       {/* <div className="row">
        <div className="col-md-12 text-left">
            <Button
              className="px-4 "
              variant="outlined"
              color="secondary"
              type="submit"
            >
              بحث
            </Button>
          </div>
       </div> */}
       <hr/>
       <div className="row">
         {Ports.length > 0 && Ports.slice(offset, offset + PER_PAGE).map((PortItem, idx) =>{
           return (
              <div className="col-md-4 mb-2">
                <Link
                  to={{
                    pathname: `${url}/${PortItem.id}`,
                    state: {
                      PortItem,
                    },
                  }}
                  key={idx}>
                    <div className="PortCard">
                      <div className="row">
                        <div className="col-md-6">
                          <img src={PortItem.portTypeId == 3 ? Const: Move}
                          />
                          <h5 style={{ fontWeight:"bold"}}>{PortItem.portEntityName}</h5>
                          <p>{PortItem.portTypeName}</p>
                        </div>
                        <div className="col-md-6 d-flex">
                          <div className="d-flex">
                            <LocationOnIcon style={{ fontSize: 30, color:"#7BB185" }} />
                            <span>{PortItem.nameA}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
              </div>
           )
         })}
         {Ports.length > 0 && (
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
          {loading === true && Ports.length <= 0 && (
            <div className="w-100 d-flex justify-content-center m-5">
              <PulseLoader loading={loading} color="#0D924C" margin="5" />
            </div>
          )}
          {loading === false && Ports.length <= 0 && (
            <h2 className="w-100 text-center p-4"> لا توجد منافذ</h2>
          )}
       </div>

     </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    stateRes: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    savePortSearch: (res) => {
      dispatch(savePortSearch(res));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(PortList);
