import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { store } from "../../App.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
//import { useState } from "react";

import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ButtonAppBar(props) {
  const navigate = useNavigate();

  const { token, setToken } = useContext(store);
  const [openProfile, setOpenProfile] = React.useState(false);

  const handleProfileClose = () => {
    setOpenProfile(false);
  };

  const handleLogo = () => {
    navigate("/");
  };

  const handleLoginBtn = () => {
    navigate("/Signin");
  };

  const handleSignupBtn = () => {
    navigate("/SignUp");
  };

  const handlehomeBtn = () => {
    navigate("/discover");
  };

  const handleProfileBtn = () => {
    setOpenProfile(true);
  };

  const handlewatchlistBtn = () => {
    navigate("/watchlist");
  };

  const handleInvestmentsBtn = () => {};

  const drawerWidth = 240;

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleAccount = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/discover");
  };

  const handleChangePassword = () => {};

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        style={{
          display: "block",
        }}
      >
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <Avatar
            alt="logo"
            src="https://api.logo.com/api/v2/images?format=webp&logo=logo_ee064ed8-ed27-49b4-ae6c-e00e028abca8&width=2000&height=1500&quality=100&margins=500&fit=contain&u=1665659629"
            onClick={handleLogo}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stockfolio
          </Typography>

          <div
            style={{
              display: "flex",
            }}
          >
            {!token ? (
              <>
                <Button onClick={handleSignupBtn} color="inherit" font="bold">
                  Sign Up
                </Button>

                <Button onClick={handleLoginBtn} color="inherit">
                  Login
                </Button>

                <Button color="inherit">Agent</Button>
              </>
            ) : (
              <>
                <Button onClick={handlehomeBtn} color="inherit" font="bold">
                  Home
                </Button>
                <Button
                  onClick={handlewatchlistBtn}
                  color="inherit"
                  font="bold"
                >
                  Watchlist
                </Button>

                <Button onClick={handleInvestmentsBtn} color="inherit">
                  Investments
                </Button>

                <Button
                  color="inherit"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleAccount}
                >
                  Account
                </Button>
                <Menu
                  id="basic-menu"
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  anchorEl={null}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleProfileBtn}>profile</MenuItem>
                  <BootstrapDialog
                    onClose={handleProfileClose}
                    aria-labelledby="customized-dialog-title"
                    open={openProfile}
                  >
                    <BootstrapDialogTitle
                      id="customized-dialog-title"
                      onClose={handleProfileClose}
                    >
                      Profile Details
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                      <List
                        sx={style}
                        component="nav"
                        aria-label="mailbox folders"
                      >
                        <ListItem>
                          <p>Account Holder: </p>
                          <ListItemText primary={token.data.name} />
                        </ListItem>
                        <Divider />
                        <ListItem divider>
                          <p>Registered EmailID: </p>
                          <ListItemText primary={token.data.email_id} />
                        </ListItem>
                        <ListItem>
                          <p>Contact Number: </p>
                          <ListItemText primary={token.data.phone_no} />
                        </ListItem>
                        <Divider light />
                      </List>
                    </DialogContent>
                  </BootstrapDialog>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
