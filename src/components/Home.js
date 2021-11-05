import React, { useContext } from "react";
import Header from "./Header";
import { AuthContext } from "../auth/AuthProvider";
import MainBody from "./MainBody";
import Twitter from "./Twitter";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="home">
      <Header userId={user.uid} />
      <MainBody>
        <Twitter user={user} />
      </MainBody>
    </div>
  );
}

export default Home;
