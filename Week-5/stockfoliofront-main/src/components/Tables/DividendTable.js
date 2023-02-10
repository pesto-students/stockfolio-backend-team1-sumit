import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title/Title.js";

export default function StockTable() {
  const content = useSelector((state) => state.DividentList);
  const dispatch = useDispatch();

  function getData() {
    return (dispatch) => {
      fetch("/dividentcatalogue")
        .then((res) => res.json())
        .then((json) => {
          let result = JSON.parse(JSON.stringify(json));
          dispatch({
            type: "DividentList_DATA",
            data: result,
          });
        });
    };
  }

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <React.Fragment>
      {content.data && (
        <>
          <Title>Stocks List</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>stock</TableCell>
                <TableCell>cagr%</TableCell>
                <TableCell>volatality%</TableCell>
                <TableCell>peratio</TableCell>
                <TableCell>currentprice</TableCell>
                <TableCell>dividentrate</TableCell>
                <TableCell align="right">status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>{row.cagr}</TableCell>
                  <TableCell>{row.volatality}</TableCell>
                  <TableCell>{row.peratio}</TableCell>
                  <TableCell>{row.currentprice}</TableCell>
                  <TableCell>{row.dividentrate}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </React.Fragment>
  );
}
