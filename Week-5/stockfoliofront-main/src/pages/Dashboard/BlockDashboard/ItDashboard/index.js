import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Chart from "../../../../components/Charts/itChart.js";
import ItCard from "../../../../components/Deposits/ItCard";
import StockTable from "../../../../components/Tables/ItTable.js";
import ButtonAppBar from "../../../../components/Navbar/index.js";
import Paper from "@mui/material/Paper";
import "./index.css";
import ItAsset from "../../../../Assets/SCET_0005.png";
import DividendBlock from "../../../../components/Blocks/DividendBlock";
//import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const mdTheme = createTheme();

function DashboardContent() {
  const content = useSelector((state) => state.IT);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  function getData() {
    return (dispatch) => {
      const payload = {
        method: "POST",
        body: JSON.stringify({ blockName: "itcatalogue" }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      fetch("/blockEstimate", payload)
        .then((res) => res.json())
        .then((json) => {
          let result = JSON.parse(JSON.stringify(json));
          dispatch({
            type: "ITBLOCK_DATA",
            data: result.result,
          });
        });
    };
  }

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <ButtonAppBar position="absolute" />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <div className="BlockOutline">
                <Grid container spacing={10}>
                  <Grid item xs={6}>
                    <div className="block-details">
                      <div style={{ paddingTop: "8%", paddingLeft: "10%" }}>
                        <img className="block-img" src={ItAsset} alt="itimg" />
                      </div>
                      <div className="side-description">
                        <h1>IT Tracker</h1>
                        <p className="blockText-description">
                          Companies to efficiently track and invest in the IT
                          sector
                        </p>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div className="It-values">
                      {content.data.map((item, index) => (
                        <Grid container spacing={1} key={index}>
                          <Grid item xs={7}>
                            <div className="cagrposition">
                              <p className="statbox__cagr">3Ycagr</p>
                              <p className="statbox__per">{item.cagr}%</p>
                            </div>
                          </Grid>

                          <Grid item xs={4}>
                            <div className="statbox__vol">
                              <p>Low volatality</p>
                              <p>{item.volatality}%</p>
                            </div>
                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </div>

              <br></br>

              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <ItCard />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <StockTable />
                  </Paper>
                </Grid>
              </Grid>
              <div className="bottom-content">
                <h2>People Also Viewed</h2>
                <DividendBlock />
              </div>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default function ItDashboard() {
  return <DashboardContent />;
}
