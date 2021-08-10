import React, { useState, useEffect } from "react";
import * as moment from "moment";

import { Link, useRouteMatch } from "react-router-dom";

import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { TableHead } from "@material-ui/core";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import TextField from "@material-ui/core/TextField";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const GeneralIndicatorContent = (props) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [filterData, setFilterData] = useState(props.generalIndicatorDataItem);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filterData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {}, []);
  const pricePercentageNow = (
    minPriceWithinYear,
    maxPriceWithinYear,
    avgPrice
  ) => {
    return (
      ((avgPrice - minPriceWithinYear) /
        (maxPriceWithinYear - minPriceWithinYear)) *
      100
    );
  };
  let { url } = useRouteMatch();

  // Search
  const handleSearch = (event) => {
    setFilterValue(event.target.value);

    const data = props.generalIndicatorDataItem;
    let filteredData = [];
    filteredData = data.filter((e) => {
      let mathesItems = Object.values(e);
      let retVal = true;
      mathesItems.forEach((e) => {
        const regex = new RegExp(event.target.value, "gi");
        if (typeof e == "string") retVal = e.match(regex);
      });
      return retVal;
    });
    setFilterData(filteredData);
    // this.setState({filterData: filteredDatas, searchValue: event.target.value})
  };
  useEffect(() => {
    setFilterValue("");
    setFilterData(props.generalIndicatorDataItem);
  }, props.generalIndicatorDataItem);
  // Search

  return (
    <TableContainer component={Paper}>
      <form
        className="d-flex justify-content-end px-3 my-2"
        noValidate
        autoComplete="off"
      >
        <TextField
          value={filterValue}
          style={{ width: "300px" }}
          onChange={handleSearch}
          id="outlined-basic"
          label="بحث"
          variant="outlined"
        />
      </form>
      <Table
        className={(classes.table, "table table-responsive")}
        aria-label="custom pagination table"
      >
        <TableHead
          style={{
            backgroundColor: "var(--main-green",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <TableRow>
            <TableCell className="text-center"> البيان </TableCell>
            <TableCell className="text-center "> متوسط السعر </TableCell>
            <TableCell className="text-center"> قيمة التغير </TableCell>
            <TableCell className="text-center"> التغير على مدار عام</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? filterData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : filterData
          ).map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-center" style={{ lineHeight: "2" }}>
                <Link
                  className="h-100 d-flex flex-column align-items-center justify-content-center"
                  // pass news item data throw props
                  to={{
                    pathname: `/local-prices/${item.indicatorId}`,
                    state: {
                      item: item,
                      classification: props.classification,
                      source: true,
                    },
                  }}
                >
                  <span className="">
                    {item.indictorName} / {item.unit}
                  </span>
                  <br />
                  <span style={{ color: "rgb(144, 144, 144)" }}>
                    {moment(item.insertionDate).format("LL")}
                  </span>
                </Link>
              </TableCell>
              <TableCell className="text-center d-flex justify-content-center align-items-center border-bottom-0">
                <span>
                  {item.avgPrice} {item.currency}
                </span>
                <div className="p-2">
                  <OverlayTrigger
                    placement={"top"}
                    overlay={
                      <Tooltip>
                        <strong>{item.minSubIndicatorName}</strong>
                      </Tooltip>
                    }
                  >
                    <div
                      className="border-bottom"
                      style={{ color: "var(--main-green)" }}
                    >
                      <ArrowDropDownIcon />
                      أدنى
                      <span className="mr-2" style={{ color: "#909090" }}>
                        {item.minSubIndicatorPrice} {item.currency}
                      </span>
                    </div>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                      <Tooltip>
                        <strong>{item.maxSubIndicatorName}</strong>
                      </Tooltip>
                    }
                  >
                    <div style={{ color: "#FF3232" }}>
                      <ArrowDropUpIcon />
                      أعلى
                      <span n className="mr-2" style={{ color: "#909090" }}>
                        {item.maxSubIndicatorPrice} {item.currency}
                      </span>
                    </div>
                  </OverlayTrigger>
                </div>
              </TableCell>
              <TableCell className="text-center" style={{ lineHeight: "2" }}>
                {" "}
                {item.changeRateDaialy > 0 ? (
                  <span style={{ color: "#FF3232" }}>
                    +{item.changeRateDaialy}
                    <br />
                    {item.changeRatePercentDaialy} %
                  </span>
                ) : (
                  <span style={{ color: "var(--main-green)" }}>
                    {item.changeRateDaialy}
                    <br />
                    {item.changeRatePercentDaialy} %
                  </span>
                )}
              </TableCell>
              <TableCell className="text-center">
                <div className="d-flex justify-content-between">
                  <div style={{ color: "var(--main-green)" }}>أقل سعر</div>
                  <div style={{ color: "#909090" }}>52 إسبوع</div>
                  <div style={{ color: "#FF3232" }}>أعلى سعر</div>
                </div>
                <div
                  style={{
                    height: "16px",
                    border: "1px solid black",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      height: "15px",
                      borderLeft: `${
                        pricePercentageNow(
                          item.minPriceWithinYear,
                          item.maxPriceWithinYear,
                          item.avgPrice
                        ) > 50
                          ? " 4px solid #FF3232"
                          : " 4px solid var(--main-green)"
                      }`,
                      position: "absolute",
                      right: `${pricePercentageNow(
                        item.minPriceWithinYear,
                        item.maxPriceWithinYear,
                        item.avgPrice
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <div style={{ color: "var(--main-green)" }}>
                      {item.minPriceWithinYear}
                    </div>
                    <div style={{ color: "#909090" }}>
                      {moment(item.minWithinYearDate).locale("ar").format("LL")}
                    </div>
                    {/* {item.minWithinYearDate} */}
                  </div>
                  <div>
                    <div className="text-left" style={{ color: "#FF3232" }}>
                      {item.maxPriceWithinYear}
                    </div>
                    <div style={{ color: "#909090" }}>
                      {moment(item.maxWithinYearDate).locale("ar").format("LL")}
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "الكل", value: -1 }]}
              count={filterData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelDisplayedRows={({ from, to, count }) =>
                `${to}-${from} من ${count !== -1 ? count : `أكثر من  ${to}`}`
              }
              labelRowsPerPage="عدد السلع فى الصفحة"
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default GeneralIndicatorContent;
