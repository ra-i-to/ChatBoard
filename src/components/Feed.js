import React, { useState, useEffect } from "react";
import { db } from "../firestore.js";
import Tweet from "./Tweet";
import FlipMove from "react-flip-move";

function Feed({ roomType, userId }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (userId) {
      db.collection("tweets")
        .where("userId", "==", userId)
        .orderBy("postTime", "desc")
        .onSnapshot((snapshot) =>
          setTweets(snapshot.docs.map((doc) => doc.data()))
        );
    } else {
      db.collection("tweets")
        .where("type", "==", roomType)
        .orderBy("postTime", "desc")
        .onSnapshot((snapshot) =>
          setTweets(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);
  return (
    <div className="feed">
      <div className="posts">
        <FlipMove>
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.postTime}
              userId={tweet.userId}
              text={tweet.text}
              postTime={tweet.postTime}
              favoriteUsers={tweet.favoriteUsersId}
            />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default Feed;
