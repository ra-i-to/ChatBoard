import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import MainBody from "./MainBody";
import { db } from "../firestore.js";
import TextField from "@material-ui/core/TextField";
import "./CreateRoom.css";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";

function CreateRoom(props) {
  const { user } = useContext(AuthContext);

  const [roomName, setRoomName] = useState("");
  const [roomTag, setRoomTag] = useState("");

  const sendCreateRoom = (e) => {
    if (roomName.length !== 0) {
      const date = new Date();
      let un = "";
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log(doc.data().userName);
            un = doc.data().userName;
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        })
        .then(function () {
          db.collection("rooms").add({
            name: roomName,
            tag: roomTag,
            author: un,
            userId: user.uid,
            postTime: date,
          });
        })
        .then(function () {
          db.collection("rooms")
            .where("postTime", "==", date)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                window.history.pushState(null, "", "/room/" + doc.id);
                window.history.go(0);
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        });

      setRoomName("");
      setRoomTag("");
    } else {
    }
  };

  return (
    <div className="create-room">
      <Header userId={user.uid} />
      <MainBody>
        <Typography className="text-head" variant="h2" gutterBottom>
          Create Room
        </Typography>
        <div className="create-room-area">
          <Typography className="text-head" variant="h3" gutterBottom>
            Room Name
          </Typography>
          <TextField
            type="text"
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            id="standard-basic"
            label="ルーム名"
          />
          <br />
          <br />
          <br />
          <br />
          <Typography className="text-head" variant="h3" gutterBottom>
            Tag
          </Typography>
          <TextField
            type="text"
            onChange={(e) => setRoomTag(e.target.value)}
            value={roomTag}
            id="standard-basic"
            label="タグ（スペース区切りで入力）"
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            className="create-room-button"
            endIcon={<CreateIcon />}
            onClick={sendCreateRoom}
          >
            Create Room
          </Button>
        </div>
      </MainBody>
    </div>
  );
}

export default CreateRoom;
