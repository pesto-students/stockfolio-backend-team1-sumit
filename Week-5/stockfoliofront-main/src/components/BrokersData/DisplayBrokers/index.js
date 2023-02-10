import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BrokerCharges from "../data/BrokerCharges.json";
import "./index.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BrokerDataTable() {
  return (
    <>
      <div className="BrokerContent">
        <div className="TableHeading">
          <div className="TableDescription">
            <h2>All you need to build your research business</h2>
            <p>
              Business-in-a-box solution with all functionalities for you to
              start, run and grow your curated portfolio business.
            </p>
          </div>
        </div>
        <TableContainer component={Paper} className="Table">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>name</StyledTableCell>
                <StyledTableCell align="right">brokerage</StyledTableCell>
                <StyledTableCell align="right">demat_AMC</StyledTableCell>
                <StyledTableCell align="right">active_clients</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BrokerCharges.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.brokerage}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.demat_AMC}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.active_clients}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
