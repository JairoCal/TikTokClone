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
import Modal from './components/Modal/index'

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
      <LeftNavBar />
      <NavBar />
      <Modal />
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
        <ProtectedRoute path="/myprofile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
