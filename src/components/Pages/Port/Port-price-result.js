import React, { useEffect, useState } from "react";
import * as moment from "moment";

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

const PortsIndicatorContent = (props) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      props.PortsIndicatorData.items.length - page * rowsPerPage
    );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    //console.log(props.GovId)
  }, []);
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
  return (
    <TableContainer component={Paper}>
      <Table
        className={(classes.table, "table  table-responsive")}
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
            ? props.PortsIndicatorData.items.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : props.PortsIndicatorData.items
          ).map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-center" style={{ lineHeight: "2" }}>
                <span className="mb-5">
                  {item.mainIndicator} / {item.currency}
                </span>
                <br />
                <span style={{ color: "rgb(144, 144, 144)" }}>
                  {moment(item.insertionDate).format("LL")}
                </span>
              </TableCell>
              <TableCell className="text-center d-flex justify-content-center align-items-center border-bottom-0">
                <span>
                  {item.avgPrice} / {item.unit}
                </span>
              </TableCell>
              <TableCell className="text-center" style={{ lineHeight: "2" }}>
                {" "}
                {item.lastValRate > 0 ? (
                  <span style={{ color: "#FF3232" }}>
                    +{item.lastValRate}
                    <br />
                    {item.lastValRatePercentage} %
                  </span>
                ) : (
                  <span style={{ color: "var(--main-green)" }}>
                    {item.lastValRate}
                    <br />
                    {item.lastValRatePercentage} %
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
                      {moment(item.minPriceWithInYearDate)
                        .locale("ar")
                        .format("LL")}
                    </div>
                    {/* {item.minWithinYearDate} */}
                  </div>
                  <div>
                    <div className="text-left" style={{ color: "#FF3232" }}>
                      {item.maxPriceWithinYear}
                    </div>
                    <div style={{ color: "#909090" }}>
                      {moment(item.maxPriceWithInYearDate)
                        .locale("ar")
                        .format("LL")}
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
              count={props.PortsIndicatorData.items.length}
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

export default PortsIndicatorContent;
