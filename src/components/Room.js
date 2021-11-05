import React, { useContext, Component, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Header from "./Header";
import MainBody from "./MainBody";
import { db } from "../firestore.js";
import PostTweet from "./PostTweet";
import Feed from "./Feed";
import "./Room.css";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";

function Room(props) {
  const { user } = useContext(AuthContext);
  const [roomInfo, setRoomInfo] = useState([]);

  useEffect(() => {
    db.collection("rooms")
      .doc(props.match.params.id)
      .get()
      .then(function (doc) {
        setRoomInfo(doc.data());
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);
  function pageTransition() {
    if (roomInfo.userId == user.uid) {
      window.history.pushState(null, "", "/room-edit/" + props.match.params.id);
      window.history.go(0);
    }
  }

  return (
    <div className="room">
      <Header />
      <MainBody>
        <Typography className="text-head" variant="h2" gutterBottom>
          {roomInfo.name}
        </Typography>
        {(() => {
          if (roomInfo.userId == user.uid) {
            return (
              <Button
                variant="contained"
                color="default"
                className="edit-button"
                endIcon={<CreateIcon />}
                onClick={pageTransition}
              >
                {" "}
                Edit{" "}
              </Button>
            );
          } else {
            return "";
          }
        })()}
        <PostTweet user={user} roomType={props.match.params.id} />
        <Feed roomType={props.match.params.id} />
      </MainBody>
    </div>
  );
}

export default Room;
