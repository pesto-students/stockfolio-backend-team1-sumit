import React from "react";
import { Container, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ButtonAppBar from "../../components/Navbar/index.js";
import "./index.css";
import easyuse from "../../Assets/easyuse.gif";
import understand from "../../Assets/1.svg";
import professional from "../../Assets/2.svg";
import customise from "../../Assets/3.svg";
import Newsfetch from "../../components/News/index.js";
import kite from "../../Assets/kite.png";
import hdfc from "../../Assets/hdfc.png";
import icici from "../../Assets/icici.png";
import kotak from "../../Assets/kotak.png";
import upstox from "../../Assets/upstox.png";
import angelbroking from "../../Assets/angelbroking.png";
import Footer from "../../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDiscoverStockfolio = () => {
    navigate("/discover");
  };

  const startInvesting = () => {
    navigate("/SignUp");
  };

  return (
    <>
      <ButtonAppBar />
      <div className="bg">
        <Container className="home__head__container">
          <h1 className="invest_h1">
            Invest in ideas <br />
            with Stockfolio
          </h1>

          <p className="Intro__info-footer">
            Build your diversified long-term portfolio of
            <br />
            stocks &amp; ETFs
          </p>

          <div>
            <Button onClick={handleDiscoverStockfolio} variant="contained">
              Discover Stockfolio
            </Button>
          </div>
        </Container>
      </div>

      <Container className="home__body__container">
        <Grid container spacing={2}>
          <Grid container item xs={6} direction="column">
            <Grid item>
              <h2>A stockfolio is a basket of stocks that reflects an idea</h2>
              <p>
                stockfolio are portfolios of stocks or ETFs, that track a theme,
                strategy or objective
              </p>
              <img className="gif" src={easyuse} alt="display gif" />
            </Grid>
          </Grid>

          <Grid container item xs={6} direction="column">
            <Grid container spacing={2}>
              <Grid container item xs={6} direction="column">
                <Grid item>
                  <img
                    className="understandimg"
                    src={understand}
                    alt="understand img"
                  />
                </Grid>
                <Grid item>
                  <img
                    className="professionalimg"
                    src={professional}
                    alt="professional img"
                  />
                </Grid>
                <Grid item>
                  <img
                    className="customiseimg"
                    src={customise}
                    alt="customise img"
                  />
                </Grid>
              </Grid>

              <Grid container item xs={6} direction="column">
                <Grid item>
                  <h3>Simple to understand</h3>
                  <p>
                    stockfolio are modern investing products based on simple
                    ideas you can understand.
                  </p>
                </Grid>
                <Grid item>
                  <h3>Managed by professionals</h3>
                  <p>
                    stockfolio are created by India’s leading finance experts &
                    backed by solid research.
                  </p>
                </Grid>
                <Grid item>
                  <h3>Designed for you</h3>
                  <p>
                    stockfolio are fully customizable. Auto Edited list
                    constituents any time.
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <div className="pattern">
        <div className="patternPromo">
          <h2>Start your Investment Journey with Stockfolio</h2>
          <p>invest in trending ideas</p>
          <Button
            className="startinvestbutton"
            variant="contained"
            color="success"
            onClick={startInvesting}
          >
            Start Investing
          </Button>
        </div>
      </div>

      <div className="BrokerBlock">
        <div className="BrokerView">
          <h2 className="BrandsTitle">
            "We provide India's"
            <br></br>
            "Most trusted financial brands information"
          </h2>
          <p className="BrabdSubTitle">
            When you invest in smallcases, stocks you buy are held in your
            existing demat account. Get started with your trading account
          </p>

          <div className="BrandImgs">
            <img className="hdfcimg" src={hdfc} alt="hdfc img" />
            <img className="kiteimg" src={kite} alt="kite img" />
            <img className="upstoximg" src={upstox} alt="upstox img" />
            <img className="iciciimg" src={icici} alt="icici img" />
            <img
              className="angelbrokingimg"
              src={angelbroking}
              alt="angelbroking img"
            />
            <img className="kotakimg" src={kotak} alt="kotak img" />
          </div>
        </div>
      </div>

      <Container className="NewsSlider">
        <p>stockfolio News</p>
        <h2 className="NewsTitle">
          See what's Happening in the world of stocks
        </h2>
        <Newsfetch />
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
