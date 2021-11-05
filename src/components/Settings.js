import React, { useContext } from "react";
import Header from "./Header";
import { AuthContext } from "../auth/AuthProvider";
import MainBody from "./MainBody";
import Setting from "./Setting";

function Settings() {
  const { user } = useContext(AuthContext);
  return (
    <div className="settings">
      <Header userId={user.uid} />
      <MainBody>
        <Setting user={user} />
      </MainBody>
    </div>
  );
}

export default Settings;
