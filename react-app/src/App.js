import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/Navbars/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import LeftNavBar from "./components/Navbars/LeftNavBar";
import Videos from "./components/Videos/Videos";
import ProfilePage from "./components/profilepage/ProfilePage";
import Modal from "./components/Modal/modal";
import Modal2 from "./components/Modal/modal2";
import PrivateMessages from "./components/PrivateMessages/PrivateMessages";
import UsersProfile from "./components/UsersProfile/UsersProfile";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Modal />
      <Modal2 />
      <LeftNavBar />
      <NavBar />
      <Switch>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Videos />
        </Route>
        <ProtectedRoute path="/myprofile/:user_id" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/user/profile/:user_id" exact={true}>
          <UsersProfile />
        </Route>
        <ProtectedRoute path="/privatemessages" exact={true}>
          <PrivateMessages />
        </ProtectedRoute>
        <ProtectedRoute path="/privatemessages/:receiver_id" exact={true}>
          <PrivateMessages />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
