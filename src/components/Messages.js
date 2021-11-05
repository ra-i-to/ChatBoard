import React, { useContext, Component, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firestore.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./Messages.css";
import Header from "./Header";
import MainBody from "./MainBody";
import Avatar from "@material-ui/core/Avatar";
import Feed from "./Feed";
import SendIcon from "@material-ui/icons/Send";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

function Messages(props) {
  const { user } = useContext(AuthContext);

  const [dmUsers, setDmUsers] = useState([]);
  const [dmUsersInfo, setDmUsersInfo] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setDmUsers(doc.data().dmUsers);
          db.collection("users")
            .where("uid", "in", doc.data().dmUsers)
            .onSnapshot((snapshot) =>
              setDmUsersInfo(snapshot.docs.map((doc) => doc.data()))
            );
        }
      })
      .then(function () {});
  }, []);

  return (
    <div className="messages">
      <Header userId={user.uid} />
      <MainBody>
        <Typography className="text-head" variant="h2" gutterBottom>
          Messages
        </Typography>
        <div className="messages-area">
          {dmUsersInfo.map((data) => (
            <Link to={"/chat/" + data.uid}>
              <Paper className="user-plate">
                <div className="user-name">{data.userName}</div>
              </Paper>
            </Link>
          ))}
        </div>
      </MainBody>
    </div>
  );
}

export default Messages;
