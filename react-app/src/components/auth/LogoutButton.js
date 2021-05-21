import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

import { Unload } from "../../store/friendsfeed";
import { UnloadFollows } from "../../store/following";

const LogoutButton = () => {
  let history = useHistory();

  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(Unload());
    dispatch(UnloadFollows());
    history.push("/");
  };

  return (
    <button className="logout_button" onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
