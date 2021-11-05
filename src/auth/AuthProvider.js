import React, { useEffect, useState } from "react";
import { app } from "../firebase.js";
import { db } from "../firestore.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password, history) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const signup = async (email, password, history) => {
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
      db.collection("users").doc(app.auth().currentUser.uid).set({
        uid: app.auth().currentUser.uid,
        userName: "No Name" /*app.auth().currentUser.displayName*/,
        userIconUrl: "test" /*app.auth().currentUser.userIconUrl*/,
      });
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  const user = app.auth().currentUser;

  return (
    <AuthContext.Provider
      value={{
        login: login,
        signup: signup,
        user: user,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
