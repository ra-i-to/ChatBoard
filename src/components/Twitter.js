import React from "react";
import Typography from "@material-ui/core/Typography";
import PostTweet from "./PostTweet";
import Feed from "./Feed";

function Twitter({ user }) {
  return (
    <div className="twitter">
      <Typography className="text-head" variant="h2" gutterBottom>
        Tweet
      </Typography>
      <PostTweet user={user} roomType="global" />
      <Feed roomType="global" />
    </div>
  );
}

export default Twitter;
