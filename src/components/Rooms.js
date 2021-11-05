import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { db } from "../firestore.js";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import "./Rooms.css";

function Rooms() {
  const { user } = useContext(AuthContext);

  const [roomsInfo, setRoomsInfo] = useState([]);

  const [rooms, setRooms] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    db.collection("rooms")
      .orderBy("postTime", "desc")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          roomsInfo.push({ id: doc.id, data: doc.data() });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      })
      .then(function () {
        setRoomsInfo(roomsInfo);
        setRooms(roomsInfo);
      });
  }, []);

  function searchRoom() {
    console.log(searchText);

    setSearchText("");
  }

  return (
    <div className="rooms">
      <Typography className="text-head" variant="h2" gutterBottom>
        Room List
      </Typography>
      <Link to={"/create-room/"}>
        <Button
          variant="contained"
          color="primary"
          className="create-room-button"
          endIcon={<CreateIcon />}
        >
          Create Room
        </Button>
      </Link>
      <div className="block">
        {/* <TextField
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          id="standard-basic"
          label="ルーム名・タグ"
        />
        <Button
          variant="contained"
          onClick={() => searchRoom()}
          startIcon={<SearchIcon />}
        >
          Search
        </Button> */}
      </div>

      <div className="room-list">
        {rooms.map((room) => (
          <div className="room-area">
            <Link to={"/room/" + room.id}>
              <Paper className="room">
                <div className="room-name">{room.data.name}</div>
                <div className="room-author">作成者:{room.data.author}</div>
              </Paper>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
