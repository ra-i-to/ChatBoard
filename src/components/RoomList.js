import React, { useContext } from "react";
import Header from "./Header";
import { AuthContext } from "../auth/AuthProvider";
import MainBody from "./MainBody";
import Rooms from "./Rooms";

function RoomList() {
  const { user } = useContext(AuthContext);
  return (
    <div className="room-list">
      <Header userId={user.uid} />
      <MainBody>
        <Rooms user={user} />
      </MainBody>
    </div>
  );
}

export default RoomList;
