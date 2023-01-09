import * as React from "react";
import Taxes from "../data/Taxes.json";
import "./index.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

export default function TaxesData() {
  return (
    <>
      <div className="TaxesContent">
        <div className="TaxesHeading">
          <div className="TaxesDescription">
            <h2>All you need to build your research business</h2>
            <p>
              Business-in-a-box solution with all functionalities for you to
              start, run and grow your curated portfolio business.
            </p>
          </div>
        </div>

        <div style={{ display: "grid" }}>
          {Taxes.map((row) => (
            <Accordion key={row.name}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{row.Type}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ textAlign: "left" }}>
                <Divider />
                <Typography>{row.equity_delivery}</Typography>
                <Divider />
                <Typography>{row.equity_intraday}</Typography>
                <Divider />
                <Typography>{row.equity_fo}</Typography>
                <Divider />
                <Typography>{row.currency_fo}</Typography>
                <Divider />
                <Typography>{row.commodity}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}
