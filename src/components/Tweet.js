import React, { forwardRef, useState, useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";
import "./Tweet.css";
import { db } from "../firestore.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";

import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const Tweet = forwardRef(({ userId, text, postTime, favoriteUsers }, ref) => {
  const classes = useStyles();

  var d = new Date(postTime * 1000);
  var year = d.getFullYear() - 1969;
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  var min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  var sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  const time =
    year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [favoriteBool, setFavoriteBool] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(favoriteUsers.length);

  db.collection("users")
    .doc(userId)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setUserName(doc.data()["userName"]);
        setUserIcon(doc.data()["userIconUrl"]);
      }
    });

  useEffect(() => {
    db.collection("tweets")
      .where("postTime", "==", postTime)
      .get()
      .then(function (querySnapshot) {
        if (favoriteUsers.indexOf(user.uid) !== -1) {
          setFavoriteBool(true);
        } else {
          setFavoriteBool(false);
        }
      });
  }, []);

  useEffect(() => {
    setFavoriteCount(favoriteUsers.length);
  }, [favoriteUsers]);

  const { user } = useContext(AuthContext);

  const favoriteAction = (e) => {
    setFavoriteBool(!favoriteBool);
    if (!favoriteBool) {
      setFavoriteCount(favoriteCount + 1);
    } else {
      if (favoriteCount !== 0) {
        setFavoriteCount(favoriteCount - 1);
      }
    }
    db.collection("tweets")
      .where("postTime", "==", postTime)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (favoriteUsers.indexOf(user.uid) === -1) {
            favoriteUsers.push(user.uid);
            db.collection("tweets").doc(doc.id).update({
              favoriteUsersId: favoriteUsers,
            });
          } else {
            var result = favoriteUsers.filter(function (i) {
              return i !== user.uid;
            });
            db.collection("tweets").doc(doc.id).update({
              favoriteUsersId: result,
            });
          }
        });
      });
  };

  return (
    <div className="tweet">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Link to={"/profile/" + userId}>
              <Avatar className={classes.avatar} src={userIcon}></Avatar>
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={userName}
          subheader={time}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon
              onClick={favoriteAction}
              className={favoriteBool ? "favorite-true" : "favorite-false"}
            />
          </IconButton>
          <div className="favorite-count">{favoriteCount}</div>
        </CardActions>
      </Card>
    </div>
  );
});

export default Tweet;
