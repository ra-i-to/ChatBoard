import React, { useContext, Component, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firestore.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./Chat.css";
import Header from "./Header";
import MainBody from "./MainBody";
import Avatar from "@material-ui/core/Avatar";
import Feed from "./Feed";
import SendIcon from "@material-ui/icons/Send";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

function Chat(props) {
  const { user } = useContext(AuthContext);

  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [senderIcon, setSenderIcon] = useState("");
  const [receiverIcon, setReceiverIcon] = useState("");
  const [messages, setMessages] = useState([]);

  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    console.log("sender id: " + user.uid);
    console.log("receiver id: " + props.match.params.id);
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setSenderName(doc.data()["userName"]);
          setSenderIcon(doc.data()["userIconUrl"]);
        }
      });

    db.collection("users")
      .doc(props.match.params.id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setReceiverName(doc.data()["userName"]);
          setReceiverIcon(doc.data()["userIconUrl"]);
        }
      });
    db.collection("messages")
      .where("joinId", "in", [
        user.uid + ">>" + props.match.params.id,
        props.match.params.id + ">>" + user.uid,
      ])
      .orderBy("postTime", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  function timeFormatConv(postTime) {
    var d = new Date(postTime * 1000);
    var year = d.getFullYear() - 1969;
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    var time =
      year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  const sendMessage = (e) => {
    e.preventDefault();

    if (messageText.length !== 0 && messageText !== null) {
      const date = new Date();
      db.collection("messages").add({
        message: messageText,
        postTime: date,
        senderId: user.uid,
        receiverId: props.match.params.id,
        joinId: user.uid + ">>" + props.match.params.id,
      });

      db.collection("users")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            if (doc.data().dmUsers != null) {
              if (doc.data().dmUsers.indexOf(props.match.params.id) == -1) {
                let users = doc.data().dmUsers;

                users.push(props.match.params.id);
                db.collection("users").doc(user.uid).update({
                  dmUsers: users,
                });
              }
            } else {
              db.collection("users")
                .doc(user.uid)
                .update({
                  dmUsers: [props.match.params.id],
                });
            }
          }
        });

      db.collection("users")
        .doc(props.match.params.id)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            if (doc.data().dmUsers != null) {
              if (doc.data().dmUsers.indexOf(user.uid) == -1) {
                let users = doc.data().dmUsers;
                users.push(user.uid);
                db.collection("users").doc(props.match.params.id).update({
                  dmUsers: users,
                });
              }
            } else {
              db.collection("users")
                .doc(props.match.params.id)
                .update({
                  dmUsers: [user.uid],
                });
            }
          }
        });

      setMessageText("");
    }
  };

  return (
    <div className="chat">
      <Header userId={user.uid} />
      <MainBody>
        <Typography className="text-head" variant="h2" gutterBottom>
          {receiverName}
        </Typography>
        <div className="chat-area">
          <div className="chat-messages-area">
            {messages.map((message) => (
              <div
                className={
                  user.uid == message.senderId
                    ? "sender-message"
                    : "receiver-message"
                }
              >
                <div className="radius-area">
                  <span>{message.message}</span>
                </div>
                <div className="post-time">
                  {timeFormatConv(message.postTime)}
                </div>
              </div>
            ))}
          </div>
          <div className="chat-send-area">
            <TextField
              id="standard-text"
              label="メッセージを入力"
              className="chat-send-message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              className="chat-send-button"
              onClick={sendMessage}
            >
              <SendIcon />
            </Button>
          </div>
        </div>
      </MainBody>
    </div>
  );
}

export default Chat;
