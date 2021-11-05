import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto 12px",
    maxWidth: 800,
  },
}));

function MainBody(props) {
  const classes = useStyles();

  const { user } = useContext(AuthContext);
  return (
    <div className="main-body">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {/* <Setting user={user} /> */}
          {props.children}
        </Paper>
      </Grid>
    </div>
  );
}

export default MainBody;
