import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const theme = createTheme();

export default function SignUp() {
  const initialValues = { username: "", phone: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const navigate = useNavigate();
  let name, value;
  const errors = {};

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const fetchApi = async () => {
    const { username, phone, email, password } = formValues;
    await fetch("/userSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: `${username}`,
        phone: `${phone}`,
        email: `${email}`,
        password: `${password}`,
      }),
    })
      .then((data) => {
        if (data.ok) {
          navigate("/Signin");
        } else {
          setAlertContent("Email already exists!");
          setAlert(true);
          //throw new Error("Email already exists!");
        }
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with fetch operation: ",
          error.message
        );
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    //setIsSubmit(true);
    fetchApi();
  };

  const signinLink = () => {
    navigate("/Signin");
  };

  const homeLink = () => {
    navigate("/discover");
  };

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const alphabets = /^[A-Za-z]+$/;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (!values.username.match(alphabets)) {
      errors.username = "Enter Valid User Name!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.phone) {
      errors.phone = "phone is required!";
    } else if (values.phone.length !== 10) {
      errors.phone = "This is not a valid phone number!";
    } else if (values.phone.match(alphabets)) {
      errors.phone = "This is not a valid phone number!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };

  return (
    <ThemeProvider theme={theme}>
      {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                  helperText={formErrors.username}
                  value={formValues.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="family-name"
                  helperText={formErrors.phone}
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  helperText={formErrors.email}
                  value={formValues.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={formErrors.password}
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item style={{ paddingRight: "38%" }}>
                <Link href="#" variant="body2" onClick={homeLink}>
                  {"Back"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={signinLink}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
