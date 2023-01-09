import React from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
//import Button from "@mui/material/Button";
import "./index.css";
import ItBlock from "../ItBlock";
import DividendBlock from "../DividendBlock";

const BlockCard = () => {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={18}>
          <Paper className="block1-promote" variant="outlined">
            <div className="block1-it-container">
              <p className="text-14 card-title">
                It's a good day to start investing
              </p>
              <h2 className="make-first-invest-text text-18">
                Start to make your first investment
              </h2>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <ItBlock />
        </Grid>
        <Grid item xs={6}>
          <DividendBlock />
        </Grid>
      </Grid>
    </>
  );
};

export default BlockCard;
