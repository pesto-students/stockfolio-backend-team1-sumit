import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import "./index.css";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//import Alert from "@mui/material/Alert";

class UserEstimation extends Component {
  state = {
    response: "",
    stock: "",
    buyPrice: "",
    date: "",
    quantity: "",
    cagr: "",
    analysis: "",
    volatality: "",
    isLoading: false,
    open: false,
    formErrors: "",
    alert: false,
    alertContent: "",
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res.express }))
      .catch((err) => {
        console.log(err);
      });
  }

  callApi = async () => {
    const response = await fetch("/estimate");
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const formValues = {
      stock: this.state.stock,
      buyPrice: this.state.buyPrice,
      date: this.state.date,
      quantity: this.state.quantity,
    };

    this.setState({ formErrors: this.validate(formValues) });

    this.setState({ isLoading: true });
    const response = await fetch("/estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: this.state.stock,
        buyPrice: this.state.buyPrice,
        date: this.state.date,
        quantity: this.state.quantity,
      }),
    });
    if (response.ok) {
      const body = await response.json();
      this.setState({ cagr: body.cagr });
      this.setState({ analysis: body.analysis });
      this.setState({ volatality: body.volatality });
      this.setState({ prediction: body.prediction });
      this.setState({ isLoading: false });
      this.setState({ open: true });
    } else {
      this.setState({ setAlertContent: "check Details and try again!" });
      this.setState({ alert: true });
      this.setState({ isLoading: false });
    }
    this.setState({ alert: false });
    this.setState({ isLoading: false });
  };

  /*handleClickOpen = () => {
    this.handleSubmit();
    this.setState({ open: true });
  };*/

  handleClose = () => {
    this.setState({ open: false });
  };

  validate(values) {
    const errors = {};
    const alphabets = /^[A-Za-z]+$/;
    const datePattern =
      "(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))";

    if (!values.stock) {
      errors.stock = "stock is required!";
    } else if (!values.stock.match(alphabets)) {
      errors.stock = "This is not a valid stock symbol!";
    } else {
      errors.stock = null;
    }
    if (!values.buyPrice) {
      errors.buyPrice = "buyPrice is required";
    } else if (values.buyPrice.match(alphabets)) {
      errors.buyPrice = "invalid price format";
    }
    if (!values.date) {
      errors.date = "date is required";
    } else if (!values.date.match(datePattern)) {
      errors.date = "invalid date format";
    }
    if (!values.quantity) {
      errors.quantity = "quantity is required";
    } else if (values.quantity.match(alphabets)) {
      errors.quantity = "invalid quantity format";
    }

    return errors;
  }

  render() {
    return (
      <>
        <div className="userEstimation">
          <div className="FormHeading">
            <div className="FormTitle">
              <h2>Stockfolio special</h2>
            </div>
            <div className="FormDescription">
              <h2>All you need to build your research business</h2>
              <p>
                Business-in-a-box solution with all functionalities for you to
                start, run and grow your curated portfolio business.
              </p>
            </div>
          </div>

          <p>{this.state.response}</p>
          <Paper elevation={2} className="Elivatedpaper">
            <Paper variant="outline" className="Outlinepaper">
              <form onSubmit={this.handleSubmit}>
                <div className="FormFields">
                  <TextField
                    id="outlined-textarea"
                    label="stock symbol"
                    multiline
                    type="text"
                    autoFocus
                    value={this.state.stock}
                    helperText={this.state.formErrors.stock}
                    required
                    onChange={(e) =>
                      this.setState({ stock: e.target.value.toUpperCase() })
                    }
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Invested Amount"
                    multiline
                    type="text"
                    value={this.state.buyPrice}
                    helperText={this.state.formErrors.buyPrice}
                    required
                    onChange={(e) =>
                      this.setState({ buyPrice: e.target.value })
                    }
                  />
                  <TextField
                    id="outlined-textarea"
                    label="YYYY-MM-DD"
                    multiline
                    type="text"
                    placeholder="YYYY-MM-DD"
                    required
                    helperText={this.state.formErrors.date}
                    title="Enter a date in this format YYYY-MM-DD"
                    value={this.state.date}
                    onChange={(e) => this.setState({ date: e.target.value })}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Quantity"
                    multiline
                    type="text"
                    value={this.state.quantity}
                    helperText={this.state.formErrors.quantity}
                    required
                    onChange={(e) =>
                      this.setState({ quantity: e.target.value })
                    }
                  />
                </div>
                <br></br>
                <Divider textAlign="left">
                  <Button
                    variant="outlined"
                    onClick={this.handleSubmit}
                    disableElevation
                    type="submit"
                  >
                    Estimate
                  </Button>
                </Divider>
                <br></br>
              </form>
              {this.state.isLoading ? (
                <div>Wait while we estimating your investment ...</div>
              ) : (
                <div className="ResponseDisplay">
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Your Investment Estimation"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>CAGR: {this.state.cagr}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography>
                              volatality: {this.state.volatality}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography>
                              DayHigh: {this.state.analysis.DayHigh}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography>
                              DayLow: {this.state.analysis.DayLow}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography>
                              mHigh: {this.state.analysis.mHigh}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography>
                              mlow: {this.state.analysis.mlow}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          ></AccordionSummary>
                        </Accordion>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
            </Paper>
          </Paper>
        </div>
      </>
    );
  }
}

export default UserEstimation;
