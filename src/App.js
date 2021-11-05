import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./components/Home";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";
import Settings from "./components/Settings";
import Room from "./components/Room";
import CreateRoom from "./components/CreateRoom";
import RoomEdit from "./components/RoomEdit";
import Profile from "./components/Profile";
import Messages from "./components/Messages";
import Chat from "./components/Chat";
import RoomList from "./components/RoomList";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div id="app">
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/room/:id" component={Room} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/create-room" component={CreateRoom} />
          <PrivateRoute exact path="/room-edit/:id" component={RoomEdit} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/messages" component={Messages} />
          <PrivateRoute exact path="/chat/:id" component={Chat} />
          <PrivateRoute exact path="/room-list" component={RoomList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
