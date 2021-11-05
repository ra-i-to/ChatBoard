import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import MainBody from "./MainBody";
import { db } from "../firestore.js";
import TextField from "@material-ui/core/TextField";
import "./RoomEdit.css";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RoomEdit(props) {
  const { user } = useContext(AuthContext);

  const [roomInfo, setRoomInfo] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomTag, setRoomTag] = useState("");

  useEffect(() => {
    db.collection("rooms")
      .doc(props.match.params.id)
      .get()
      .then(function (doc) {
        setRoomInfo(doc.data());
        console.log(doc.data());
        setRoomName(doc.data().name);
        setRoomTag(doc.data().tag);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  const sendRoomEdit = (e) => {
    if (roomName.length !== 0) {
      db.collection("rooms")
        .doc(props.match.params.id)
        .update({
          name: roomName,
          tag: roomTag,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });

      // setOpen(true);
    } else {
      // setErrorOpen(true);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const roomDelete = () => {
    db.collection("rooms")
      .doc(props.match.params.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      })
      .then(function () {
        window.history.pushState(null, "", "/");
        window.history.go(0);
      });
  };

  return (
    <div className="room-edit">
      <Header userId={user.uid} />
      <MainBody>
        <Typography className="text-head" variant="h2" gutterBottom>
          Create Room
        </Typography>
        <div className="room-edit-area">
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
            className="room-edit-button"
            endIcon={<SaveIcon />}
            onClick={sendRoomEdit}
          >
            Save
          </Button>
          <br />
          <Button
            variant="contained"
            color="secondary"
            className="room-delete-button"
            startIcon={<DeleteIcon />}
            onClick={handleClickOpen}
          >
            Delete
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                ルーム「{roomName}」を削除します。
                <br />
                本当によろしいですか？
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                No
              </Button>
              <Button onClick={roomDelete} color="secondary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </MainBody>
    </div>
  );
}

export default RoomEdit;
