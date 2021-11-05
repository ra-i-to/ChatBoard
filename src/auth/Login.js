import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Header from "../components/Header";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();

  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };
  return (
    <div className="login">
      <Header />
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography className="text-head" variant="h2" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <label>
              <TextField
                type="text"
                id="standard-basic"
                label="Email"
                name="email"
              />
            </label>
            <br />
            <label>
              <TextField
                type="password"
                id="standard-basic"
                label="Password"
                name="password"
              />
            </label>
            <br />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
          <Link to="/signup">Sign up</Link>
        </Paper>
      </Grid>
    </div>
  );
};

export default withRouter(Login);
