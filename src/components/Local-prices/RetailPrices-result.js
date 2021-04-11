import React, { useState, useEffect } from "react";
//import { Table } from "react-bootstrap";
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
import { Link } from "react-router-dom";

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

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const RetailPricesResult = (props) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.resultData.length - page * rowsPerPage);

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
  return (
    <TableContainer component={Paper}>
      <Table
        className={
          (classes.table, "table table-bordered table-responsive local_prices")
        }
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
            <TableCell rowSpan={2} className="text-center">
              {" "}
              النوع{" "}
            </TableCell>
            <TableCell rowSpan={2} className="text-center">
              {" "}
              الوحدة{" "}
            </TableCell>
            <TableCell rowSpan={2} className="text-center">
              {" "}
              العملة{" "}
            </TableCell>
            {props.GovId == 0 && (
              <TableCell colSpan={2} className="text-center">
                {" "}
                أسعار السلع على مستوى الجمهورية{" "}
              </TableCell>
            )}
            {props.GovId != 0 && (
              <TableCell colSpan={2} className="text-center">
                {" "}
                أسعار السلع فى المحافظات{" "}
              </TableCell>
            )}
            <TableCell rowSpan={2} className="text-center">
              {" "}
              التاريخ{" "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center"> أدنى سعر </TableCell>
            <TableCell className="text-center"> أعلى سعر </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(props.resultData)} */}
          {(rowsPerPage > 0
            ? props.resultData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : props.resultData
          ).map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-center">
                <Link
                  to={{
                    pathname: `/local-prices/SubIndicatorInfo/${item.subindicatorId}`,
                    state: {
                      id: item.subindicatorId,
                    },
                  }}
                >
                  {item.subindictorName}
                </Link>
              </TableCell>
              <TableCell className="text-center">{item.unit}</TableCell>
              <TableCell className="text-center">{item.currency}</TableCell>
              <TableCell className="text-center">
                {item.minValue}{" "}
                {props.GovId == 0 && (
                  <div className="text-center my-2">
                    <span className="MaxVal GovVal">{item.govMin}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-center">
                {item.maxValue}{" "}
                {props.GovId == 0 && (
                  <div className="text-center my-2">
                    <span className="MinVal GovVal">{item.govMax}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-center">
                {moment(item.insertionDate).format("LL")}
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
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={props.resultData.length}
              rowsPerPage={rowsPerPage}
              page={page}
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

export default RetailPricesResult;
