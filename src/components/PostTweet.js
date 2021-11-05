import React, { useState } from "react";
import { db } from "../firestore.js";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function PostTweet({ user, roomType }) {
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
  const [tweetMessage, setTweetMessage] = useState("");
  const sendTweet = (e) => {
    e.preventDefault();
    if (tweetMessage.length !== 0 && tweetMessage !== null) {
      const date = new Date();
      db.collection("tweets").add({
        text: tweetMessage,
        userId: user.uid,
        postTime: date,
        favoriteUsersId: [],
        type: roomType,
      });
      setTweetMessage("");
      setOpen(true);
    } else {
      setErrorOpen(true);
    }
  };
  return (
    <div className="post-tweet">
      <Container maxWidth="sm">
        <div className="input-flex-area">
          <TextField
            type="text"
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            id="standard-basic"
            label="Tweet message"
          />

          <Button
            onClick={sendTweet}
            type="submit"
            variant="contained"
            color="primary"
          >
            Tweet
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
            <Alert severity="error">Faild!</Alert>
          </Snackbar>
        </div>
      </Container>
    </div>
  );
}

export default PostTweet;
