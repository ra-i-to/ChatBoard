import React, { useState } from "react";
import { db } from "../firestore.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./Setting.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Setting({ user }) {
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const errorHandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };

  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [userProfile, setUserProfile] = useState("");

  const email = user.email;
  const uid = user.uid;
  db.collection("users")
    .doc(user.uid)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setUserName(doc.data()["userName"]);
        setUserIcon(doc.data()["userIconUrl"]);
        setUserProfile(doc.data()["userProfile"]);
      } else {
        userName = "*** ERROR ***";
        userIcon = "*** ERROR ***";
      }
    });

  const [userNameText, setUserNameText] = useState("");
  const [userIconUrl, setUserIconUrl] = useState("");
  const [userProfileText, setUserProfileText] = useState("");

  const updateProfile = (event) => {
    const ref = db.collection("users").doc(user.uid);
    return ref
      .update({
        userName: userNameText,
      })
      .then(function () {
        setUserNameText("");
        setOpen(true);
      })
      .catch(function (error) {
        setErrorOpen(true);
      });
  };

  const updateUserIcon = (event) => {
    const ref = db.collection("users").doc(user.uid);
    return ref
      .update({
        userIconUrl: userIconUrl,
      })
      .then(function () {
        setUserIconUrl("");
        setOpen(true);
      })
      .catch(function (error) {
        setErrorOpen(true);
      });
  };

  const updateUserProfile = (event) => {
    const ref = db.collection("users").doc(user.uid);
    return ref
      .update({
        userProfile: userProfileText,
      })
      .then(function () {
        setUserProfileText("");
        setOpen(true);
      })
      .catch(function (error) {
        setErrorOpen(true);
      });
  };

  return (
    <div className="setting">
      <Typography className="text-head" variant="h2" gutterBottom>
        Setting
      </Typography>
      <Container maxWidth="sm">
        <Typography className="text-head" variant="h3" gutterBottom>
          User Name
        </Typography>
        <p>{userName}</p>
        <br />
        <br />
        <Typography className="text-head" variant="h3" gutterBottom>
          Profile
        </Typography>
        <p>{userProfile}</p>
        <br />
        <br />
        <Typography className="text-head" variant="h3" gutterBottom>
          User Icon Url
        </Typography>
        <p>{userIcon}</p>
        <br />
        <br />
        <Typography className="text-head" variant="h3" gutterBottom>
          Email
        </Typography>
        <p>{email}</p>
        <br />
        <br />
        <div className="input-flex-area">
          <TextField
            type="text"
            onChange={(e) => setUserNameText(e.target.value)}
            value={userNameText}
            id="standard-basic"
            label="User Name"
          />
          <Button variant="contained" onClick={() => updateProfile()}>
            Save
          </Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Successful!
            </Alert>
          </Snackbar>
          <Snackbar
            open={errorOpen}
            autoHideDuration={3000}
            onClose={errorHandleClose}
          >
            <Alert severity="error">Failed!</Alert>
          </Snackbar>
        </div>

        <div className="input-flex-area">
          <TextField
            type="text"
            onChange={(e) => setUserProfileText(e.target.value)}
            value={userProfileText}
            id="standard-basic"
            label="User Profile"
          />
          <Button variant="contained" onClick={() => updateUserProfile()}>
            Save
          </Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Successful!
            </Alert>
          </Snackbar>
          <Snackbar
            open={errorOpen}
            autoHideDuration={3000}
            onClose={errorHandleClose}
          >
            <Alert severity="error">Failed!</Alert>
          </Snackbar>
        </div>

        <div className="input-flex-area">
          <TextField
            type="text"
            onChange={(e) => setUserIconUrl(e.target.value)}
            value={userIconUrl}
            id="standard-basic"
            label="User Icon URL"
          />
          <Button variant="contained" onClick={() => updateUserIcon()}>
            Save
          </Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Successful!
            </Alert>
          </Snackbar>
          <Snackbar
            open={errorOpen}
            autoHideDuration={3000}
            onClose={errorHandleClose}
          >
            <Alert severity="error">Failed!</Alert>
          </Snackbar>
        </div>
      </Container>
    </div>
  );
}

export default Setting;
