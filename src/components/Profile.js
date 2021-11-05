import React, { useContext, Component, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firestore.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./Profile.css";
import Header from "./Header";
import MainBody from "./MainBody";
import Avatar from "@material-ui/core/Avatar";
import Feed from "./Feed";
import SendIcon from "@material-ui/icons/Send";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";

function Profile(props) {
  const { user } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [userIcon, setUserIcon] = useState("");

  db.collection("users")
    .doc(props.match.params.id)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setUserName(doc.data()["userName"]);
        setUserProfile(doc.data()["userProfile"]);
        setUserIcon(doc.data()["userIconUrl"]);
      }
    });

  return (
    <div className="profile">
      <Header userId={user.uid} />
      <MainBody>
        <Typography className="text-head" variant="h2" gutterBottom>
          Profile
        </Typography>
        <div className="profile-area">
          {(() => {
            if (user.uid == props.match.params.id) {
              return (
                <Link to={"/settings/"}>
                  <Button
                    variant="contained"
                    color="default"
                    className="edit-profile-button"
                    endIcon={<CreateIcon />}
                  >
                    {" "}
                    Edit Profile{" "}
                  </Button>
                </Link>
              );
            } else {
              return (
                <Link to={"/chat/" + props.match.params.id}>
                  <Button
                    variant="contained"
                    color="default"
                    className="dm-button"
                    endIcon={<SendIcon />}
                  >
                    {" "}
                    DM{" "}
                  </Button>
                </Link>
              );
            }
          })()}
          <Avatar src={userIcon} className="user-icon"></Avatar>
          <div className="user-name">{userName}</div>
          <div className="user-profile">{userProfile}</div>
        </div>
        <div className="feed-area">
          <Feed roomType="global" userId={props.match.params.id} />
        </div>
      </MainBody>
    </div>
  );
}

export default Profile;
