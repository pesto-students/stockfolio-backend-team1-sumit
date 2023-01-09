import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { store } from "../../App.js";

export default function Watchlist() {
  const content = useSelector((state) => state.WATCHLIST);
  const dispatch = useDispatch();
  const { token } = useContext(store);

  function getData() {
    return (dispatch) => {
      const payload = {
        method: "POST",
        body: JSON.stringify({ name: token.data.name }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      fetch("/getWatchlist", payload)
        .then((res) => res.json())
        .then((json) => {
          let result = JSON.parse(JSON.stringify(json));
          dispatch({
            type: "WATCHLIST_DATA",
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
      {content.data.map((item, index) => (
        <>
          <Typography component="p" variant="h6">
            {item.data}
          </Typography>
        </>
      ))}
    </React.Fragment>
  );
}
